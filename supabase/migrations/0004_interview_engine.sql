-- CareerOS AI Adaptive Interview Engine Migration
-- Stage 07 — Production-Grade Interview Operating System

-- 1. Interview Sessions Master Table
CREATE TABLE IF NOT EXISTS interview_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles_extended(id) ON DELETE CASCADE NOT NULL,
    role_name VARCHAR(255) NOT NULL,
    company_name VARCHAR(255),
    experience_level VARCHAR(50) NOT NULL, -- e.g., 'entry', 'mid', 'senior'
    current_difficulty VARCHAR(50) DEFAULT 'medium' NOT NULL, -- 'easy', 'medium', 'hard'
    status VARCHAR(50) DEFAULT 'scheduled' NOT NULL, -- 'scheduled', 'in_progress', 'completed', 'evaluated'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE interview_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own interview sessions" ON interview_sessions
    FOR ALL USING (auth.uid() = user_id);

-- 2. Interview Questions Table (Saves generated prompts)
CREATE TABLE IF NOT EXISTS interview_questions_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID REFERENCES interview_sessions(id) ON DELETE CASCADE NOT NULL,
    question_text TEXT NOT NULL,
    question_type VARCHAR(50) NOT NULL, -- 'technical', 'behavioral', 'architecture', 'concept'
    difficulty_level VARCHAR(50) NOT NULL, -- 'easy', 'medium', 'hard'
    ideal_response_outline TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE interview_questions_records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own interview questions" ON interview_questions_records
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM interview_sessions
            WHERE interview_sessions.id = interview_questions_records.session_id
            AND interview_sessions.user_id = auth.uid()
        )
    );

-- 3. Interview Answers / Transcript Table
CREATE TABLE IF NOT EXISTS interview_answers_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question_id UUID REFERENCES interview_questions_records(id) ON DELETE CASCADE NOT NULL,
    transcript_text TEXT NOT NULL,
    audio_url VARCHAR(2048),
    latency_ms INT DEFAULT 0 NOT NULL,
    evaluated_score INT CHECK (evaluated_score >= 0 AND evaluated_score <= 100),
    feedback_text TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE interview_answers_records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own interview answers" ON interview_answers_records
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM interview_questions_records
            JOIN interview_sessions ON interview_sessions.id = interview_questions_records.session_id
            WHERE interview_questions_records.id = interview_answers_records.question_id
            AND interview_sessions.user_id = auth.uid()
        )
    );

-- 4. Deep Multi-Dimensional Interview Reports
CREATE TABLE IF NOT EXISTS interview_evaluation_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID REFERENCES interview_sessions(id) ON DELETE CASCADE UNIQUE NOT NULL,
    overall_score INT CHECK (overall_score >= 0 AND overall_score <= 100) NOT NULL,
    technical_score INT CHECK (technical_score >= 0 AND technical_score <= 100) NOT NULL,
    communication_score INT CHECK (communication_score >= 0 AND communication_score <= 100) NOT NULL,
    confidence_score INT CHECK (confidence_score >= 0 AND confidence_score <= 100) NOT NULL,
    problem_solving_score INT CHECK (problem_solving_score >= 0 AND problem_solving_score <= 100) NOT NULL,
    behavioral_score INT CHECK (behavioral_score >= 0 AND behavioral_score <= 100) NOT NULL,
    strengths TEXT[] NOT NULL,
    weaknesses TEXT[] NOT NULL,
    critical_mistakes TEXT[] NOT NULL,
    suggested_resources JSONB NOT NULL, -- Holds targeted study URLs
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE interview_evaluation_reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own evaluation reports" ON interview_evaluation_reports
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM interview_sessions
            WHERE interview_sessions.id = interview_evaluation_reports.session_id
            AND interview_sessions.user_id = auth.uid()
        )
    );

-- Indices for rapid queries
CREATE INDEX IF NOT EXISTS idx_interview_sessions_user ON interview_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_interview_questions_session ON interview_questions_records(session_id);
CREATE INDEX IF NOT EXISTS idx_interview_answers_question ON interview_answers_records(question_id);
CREATE INDEX IF NOT EXISTS idx_interview_eval_session ON interview_evaluation_reports(session_id);
