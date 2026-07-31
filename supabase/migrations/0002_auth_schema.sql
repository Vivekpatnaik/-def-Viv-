-- CareerOS AI Authentication & User Management Migration
-- Stage 02 — Production-Grade Authorization

-- Enums and Types
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role_type') THEN
        CREATE TYPE user_role_type AS ENUM (
            'guest', 'free', 'starter', 'intermediate', 'premium',
            'college_admin', 'faculty', 'recruiter', 'platform_admin', 'super_admin'
        );
    END IF;
END $$;

-- 1. Roles and Permissions
CREATE TABLE IF NOT EXISTS roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name user_role_type UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS permissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Junction Table for Roles and Permissions (RBAC)
CREATE TABLE IF NOT EXISTS role_permissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    role_id UUID REFERENCES roles(id) ON DELETE CASCADE NOT NULL,
    permission_id UUID REFERENCES permissions(id) ON DELETE CASCADE NOT NULL,
    UNIQUE(role_id, permission_id)
);

-- 2. Extended Profiles Table with Multi-Tenancy support
CREATE TABLE IF NOT EXISTS profiles_extended (
    id UUID PRIMARY KEY, -- References auth.users(id)
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    country VARCHAR(100),
    role_type user_role_type DEFAULT 'free'::user_role_type NOT NULL,
    tenant_id VARCHAR(255), -- Maps to college domain or enterprise identifier
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE profiles_extended ENABLE ROW LEVEL SECURITY;

-- Profiles RLS Policies
CREATE POLICY "Profiles are readable by owner and administrative domains" ON profiles_extended
    FOR SELECT USING (
        auth.uid() = id
        OR (auth.jwt() ->> 'role' = 'super_admin')
        OR (auth.jwt() ->> 'role' = 'college_admin' AND tenant_id = (SELECT tenant_id FROM profiles_extended WHERE id = auth.uid()))
    );

CREATE POLICY "Profiles can only be edited by owner" ON profiles_extended
    FOR UPDATE USING (auth.uid() = id);

-- 3. Device Sessions (Advanced Tracking)
CREATE TABLE IF NOT EXISTS user_devices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles_extended(id) ON DELETE CASCADE NOT NULL,
    device_name VARCHAR(255) NOT NULL,
    browser_name VARCHAR(100),
    ip_address INET,
    country_code VARCHAR(10),
    last_active_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE user_devices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Devices are manageable by owner only" ON user_devices
    FOR ALL USING (auth.uid() = user_id);

-- 4. Audit Log Systems
CREATE TABLE IF NOT EXISTS auth_audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID,
    action VARCHAR(255) NOT NULL,
    metadata JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE auth_audit_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Audit logs are readable by administrative platforms only" ON auth_audit_logs
    FOR SELECT USING (auth.jwt() ->> 'role' = 'super_admin');

-- Triggers for Profile Synchronisation
-- Whenever a user signs up via Supabase auth, automatically sync profiles
CREATE OR REPLACE FUNCTION handle_new_user_sync()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles_extended (id, email, full_name, role_type, tenant_id)
    VALUES (
        new.id,
        new.email,
        coalesce(new.raw_user_meta_data->>'full_name', 'New Candidate'),
        'free'::user_role_type,
        split_part(new.email, '@', 2) -- Default multi-tenancy based on email domain
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger Activation
-- CREATE TRIGGER on_auth_user_created
--     AFTER INSERT ON auth.users
--     FOR EACH ROW EXECUTE FUNCTION handle_new_user_sync();
