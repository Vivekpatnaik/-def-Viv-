-- CareerOS AI Career Planning, Skill Gap, & Roadmap Engine Migration
-- Stage 08 — Production-Grade Career Planning System

-- 1. Detailed Career Profiles Table (User settings & preferences)
CREATE TABLE IF NOT EXISTS career_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles_extended(id) ON DELETE CASCADE UNIQUE NOT NULL,
    current_education VARCHAR(255),
    college_name VARCHAR(255),
    degree_major VARCHAR(255),
    programming_languages TEXT[] NOT NULL,
    frameworks TEXT[] NOT NULL,
    preferred_location VARCHAR(100),
    expected_salary VARCHAR(100),
    available_study_hours_weekly INT DEFAULT 10 NOT NULL,
    preferred_learning_style VARCHAR(50) DEFAULT 'visual' NOT NULL, -- 'visual', 'text', 'hands-on'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE career_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own career profiles" ON career_profiles
    FOR ALL USING (auth.uid() = user_id);

-- 2. Extended Roadmaps Table with duration selectors
CREATE TABLE IF NOT EXISTS roadmaps_extended (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles_extended(id) ON DELETE CASCADE NOT NULL,
    target_role VARCHAR(255) NOT NULL,
    duration_months INT DEFAULT 6 NOT NULL, -- 3, 6, or 12 months
    overall_progress_percent INT DEFAULT 0 CHECK (overall_progress_percent >= 0 AND overall_progress_percent <= 100) NOT NULL,
    milestones_json JSONB NOT NULL, -- Sequential list of custom milestones
    is_adapted_recently BOOLEAN DEFAULT FALSE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE roadmaps_extended ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own roadmaps_extended" ON roadmaps_extended
    FOR ALL USING (auth.uid() = user_id);

-- Indices for rapid queries
CREATE INDEX IF NOT EXISTS idx_career_profiles_user ON career_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_roadmaps_extended_user ON roadmaps_extended(user_id);
