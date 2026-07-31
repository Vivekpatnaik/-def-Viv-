-- CareerOS AI Career Domain Engine Migration
-- Stage 08 — Configurable multi-domain, CMS-driven database architecture

-- 1. Master Career Domains Table (Tech, Business, Law, Healthcare, etc.)
CREATE TABLE IF NOT EXISTS cms_career_domains (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) UNIQUE NOT NULL, -- e.g., 'technology', 'healthcare', 'law', 'business'
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE cms_career_domains ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Everyone can read domains" ON cms_career_domains
    FOR SELECT USING (true);

-- 2. Domain Roles Table (e.g. Frontend, Corporate Lawyer, Nurse)
CREATE TABLE IF NOT EXISTS cms_domain_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    domain_id UUID REFERENCES cms_career_domains(id) ON DELETE CASCADE NOT NULL,
    name VARCHAR(255) NOT NULL, -- e.g., 'Corporate Attorney'
    experience_level VARCHAR(50) NOT NULL, -- 'entry', 'mid', 'senior'
    required_prerequisites TEXT[] NOT NULL, -- Minimum baseline requirements
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE (domain_id, name, experience_level)
);

-- Enable RLS
ALTER TABLE cms_domain_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Everyone can read domain roles" ON cms_domain_roles
    FOR SELECT USING (true);

-- 3. Dynamic Domain Skills Mapping (Zod & DB schemas)
CREATE TABLE IF NOT EXISTS cms_domain_skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    role_id UUID REFERENCES cms_domain_roles(id) ON DELETE CASCADE NOT NULL,
    skill_name VARCHAR(255) NOT NULL,
    importance_tier VARCHAR(50) DEFAULT 'medium' NOT NULL, -- 'critical', 'high', 'medium', 'low'
    estimated_hours INT DEFAULT 20 NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE cms_domain_skills ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Everyone can read domain skills" ON cms_domain_skills
    FOR SELECT USING (true);

-- Indices for rapid queries
CREATE INDEX IF NOT EXISTS idx_cms_career_domains_name ON cms_career_domains(name);
CREATE INDEX IF NOT EXISTS idx_cms_domain_roles_domain ON cms_domain_roles(domain_id);
CREATE INDEX IF NOT EXISTS idx_cms_domain_skills_role ON cms_domain_skills(role_id);
