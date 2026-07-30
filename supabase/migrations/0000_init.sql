-- CareerOS AI Schema Initialization
-- Generated for Supabase & Postgres 15+

CREATE TYPE user_role AS ENUM ('student', 'professional', 'college_admin', 'recruiter', 'super_admin');
CREATE TYPE job_application_status AS ENUM ('saved', 'applied', 'interviewing', 'offer', 'rejected');
CREATE TYPE difficulty_level AS ENUM ('beginner', 'intermediate', 'advanced');
CREATE TYPE assessment_status AS ENUM ('not_started', 'in_progress', 'completed');
CREATE TYPE mock_interview_status AS ENUM ('scheduled', 'in_progress', 'completed', 'evaluated');

-- 1. Profiles Table
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    role user_role DEFAULT 'student'::user_role NOT NULL,
    avatar_url TEXT,
    target_job_title TEXT,
    target_industry TEXT,
    experience_years INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can select their own profile" ON profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);

-- 2. User Skills Table
CREATE TABLE IF NOT EXISTS user_skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    skill_name TEXT NOT NULL,
    category TEXT NOT NULL,
    proficiency_level INT CHECK (proficiency_level >= 1 AND proficiency_level <= 5) NOT NULL,
    verified BOOLEAN DEFAULT FALSE NOT NULL,
    last_tested_at TIMESTAMP WITH TIME ZONE,
    UNIQUE (user_id, skill_name)
);

-- Enable RLS
ALTER TABLE user_skills ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can manage their own skills" ON user_skills
    FOR ALL USING (auth.uid() = user_id);

-- 3. Placement Readiness Scoring Table
CREATE TABLE IF NOT EXISTS placement_readiness (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE UNIQUE NOT NULL,
    overall_readiness_index INT CHECK (overall_readiness_index >= 0 AND overall_readiness_index <= 100) NOT NULL,
    resume_score INT CHECK (resume_score >= 0 AND resume_score <= 100) NOT NULL,
    coding_score INT CHECK (coding_score >= 0 AND coding_score <= 100) NOT NULL,
    interview_score INT CHECK (interview_score >= 0 AND interview_score <= 100) NOT NULL,
    assessment_score INT CHECK (assessment_score >= 0 AND assessment_score <= 100) NOT NULL,
    skills_percentile DECIMAL(5,2) DEFAULT 0 NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE placement_readiness ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own readiness scores" ON placement_readiness
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can edit readiness scores" ON placement_readiness
    FOR ALL USING (auth.uid() = user_id);

-- Indices for rapid queries
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_user_skills_user ON user_skills(user_id);
CREATE INDEX IF NOT EXISTS idx_placement_readiness_user ON placement_readiness(user_id);
