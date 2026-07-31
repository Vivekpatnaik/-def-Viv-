-- CareerOS AI Resume Intelligence Migration
-- Stage 06 — Production-Grade Resume Operating System

-- 1. Resumes Master Table
CREATE TABLE IF NOT EXISTS resumes_master (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles_extended(id) ON DELETE CASCADE NOT NULL,
    current_version INT DEFAULT 1 NOT NULL,
    overall_score INT CHECK (overall_score >= 0 AND overall_score <= 100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE resumes_master ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own master resumes" ON resumes_master
    FOR ALL USING (auth.uid() = user_id);

-- 2. Resume Versions Table (Enforces Version Control)
CREATE TABLE IF NOT EXISTS resume_version_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    resume_master_id UUID REFERENCES resumes_master(id) ON DELETE CASCADE NOT NULL,
    version_number INT NOT NULL,
    file_path VARCHAR(2048) NOT NULL,
    raw_text TEXT NOT NULL,
    structured_json JSONB NOT NULL, -- Holds parsed details (Name, Headline, Experience array, Skills, etc.)
    score_difference INT DEFAULT 0 NOT NULL, -- e.g., +5, -2, compared to previous version
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE (resume_master_id, version_number)
);

-- Enable RLS
ALTER TABLE resume_version_records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own resume version records" ON resume_version_records
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM resumes_master
            WHERE resumes_master.id = resume_version_records.resume_master_id
            AND resumes_master.user_id = auth.uid()
        )
    );

-- 3. ATS & Keyword Analysis Reports
CREATE TABLE IF NOT EXISTS resume_ats_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    resume_version_id UUID REFERENCES resume_version_records(id) ON DELETE CASCADE NOT NULL,
    job_description TEXT NOT NULL,
    overall_match_score INT CHECK (overall_match_score >= 0 AND overall_match_score <= 100) NOT NULL,
    formatting_score INT CHECK (formatting_score >= 0 AND formatting_score <= 100) NOT NULL,
    keyword_score INT CHECK (keyword_score >= 0 AND keyword_score <= 100) NOT NULL,
    readability_rating VARCHAR(50) NOT NULL,
    missing_sections TEXT[] NOT NULL,
    missing_keywords TEXT[] NOT NULL,
    grammar_issues_count INT DEFAULT 0 NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE resume_ats_reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own ATS reports" ON resume_ats_reports
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM resume_version_records
            JOIN resumes_master ON resumes_master.id = resume_version_records.resume_master_id
            WHERE resume_version_records.id = resume_ats_reports.resume_version_id
            AND resumes_master.user_id = auth.uid()
        )
    );

-- 4. Resume Suggestions (For STAR rewriting)
CREATE TABLE IF NOT EXISTS resume_star_suggestions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    resume_version_id UUID REFERENCES resume_version_records(id) ON DELETE CASCADE NOT NULL,
    original_text TEXT NOT NULL,
    suggested_text TEXT NOT NULL,
    reasoning TEXT NOT NULL,
    is_applied BOOLEAN DEFAULT FALSE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE resume_star_suggestions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own suggestions" ON resume_star_suggestions
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM resume_version_records
            JOIN resumes_master ON resumes_master.id = resume_version_records.resume_master_id
            WHERE resume_version_records.id = resume_star_suggestions.resume_version_id
            AND resumes_master.user_id = auth.uid()
        )
    );

-- Indices for rapid queries
CREATE INDEX IF NOT EXISTS idx_resumes_master_user ON resumes_master(user_id);
CREATE INDEX IF NOT EXISTS idx_resume_version_master ON resume_version_records(resume_master_id);
CREATE INDEX IF NOT EXISTS idx_resume_ats_version ON resume_ats_reports(resume_version_id);
CREATE INDEX IF NOT EXISTS idx_resume_star_version ON resume_star_suggestions(resume_version_id);
