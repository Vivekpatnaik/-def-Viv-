# CAREEROS AI - ENTERPRISE DATABASE IMPLEMENTATION
## Master Logical Database Schema & Constraints Specification (V3.0)
### Designed by: Principal Database Architect (Google Architecture Specialist)

---

## CONSTITUTIONAL ADOPTION & DATABASE ASSURANCE
*This database specification has been engineered from the ground up to support high availability, horizontal scaling, and complete multi-tenant tenant isolation for CareerOS AI. It is designed to scale dynamically from 100 to 1,000,000+ active users and support over 100 million transactions without structural refactoring. In strict accordance with the Master Prompt 08 constraints, this specification defines tables, columns, constraints, indices, security rules, and relations logically without generating raw SQL code, Prisma models, or Supabase migration files.*

---

## SECTION 1: MASTER ENTITY-RELATIONSHIP DIAGRAM (ERD)

### 1.1 Structural Relational Map
```
+--------------------------------------------------------------------------------------------------------------------+
|                                                  AUTHENTICATION                                                    |
|                                                                                                                    |
|   +-----------------------+              +-----------------------+              +-----------------------+          |
|   |         users         | 1 ------> 1  |   profiles_extended   | 1 ------> N  |      user_roles       |          |
|   |  - id (PK)            |              |  - id (PK/FK)         |              |  - id (PK)            |          |
|   |  - email              |              |  - full_name          |              |  - user_id (FK)       |          |
|   |  - pass_hash          |              |  - role_type          |              |  - role_id (FK)       |          |
|   +-----------┬-----------+              +-----------┬-----------+              +-----------------------+          |
|               │                                      │                                                             |
|               ├───────────────── 1:N ────────────────┼───────────────── 1:N ──────────────┐                        |
|               ▼                                      ▼                                    ▼                        |
|   +-----------------------+              +-----------------------+              +-----------------------+          |
|   |       sessions        |              |     oauth_accounts    |              |     login_history     |          |
|   |  - id (PK)            |              |  - id (PK)            |              |  - id (PK)            |          |
|   |  - user_id (FK)       |              |  - user_id (FK)       |              |  - user_id (FK)       |          |
|   |  - token_hash         |              |  - provider           |              |  - ip_address         |          |
|   +-----------------------+              +-----------------------+              +-----------------------+          |
+--------------------------------------------------------------------------------------------------------------------+
                                                       │
                                                       ▼ 1:N
+--------------------------------------------------------------------------------------------------------------------+
|                                                CAREER & ROADMAPS                                                   |
|                                                                                                                    |
|   +-----------------------+              +-----------------------+              +-----------------------+          |
|   |     career_goals      | 1 ------> N  |   career_assessments  | 1 ------> N  |   skill_gap_reports   |          |
|   |  - id (PK)            |              |  - id (PK)            |              |  - id (PK)            |          |
|   |  - user_id (FK)       |              |  - user_id (FK)       |              |  - user_id (FK)       |          |
|   |  - target_title       |              |  - overall_score      |              |  - target_role_id (FK)|          |
|   +-----------------------+              +-----------------------+              +-----------------------+          |
|                                                      │                                                             |
|                                                      ▼ 1:1                                                         |
|                                          +-----------------------+              +-----------------------+          |
|                                          |       roadmaps        | 1 ------> N  |   roadmap_progress    |          |
|                                          |  - id (PK)            |              |  - id (PK)            |          |
|                                          |  - user_id (FK)       |              |  - roadmap_id (FK)    |          |
|                                          |  - target_role_id (FK)|              |  - task_id (FK)       |          |
|                                          +-----------------------+              +-----------------------+          |
+--------------------------------------------------------------------------------------------------------------------+
                                                       │
                                                       ▼ 1:N
+--------------------------------------------------------------------------------------------------------------------+
|                                            RESUME, ATS, & PROJECTS                                                 |
|                                                                                                                    |
|   +-----------------------+              +-----------------------+              +-----------------------+          |
|   |        resumes        | 1 ------> N  |    resume_versions    | 1 ------> N  |      ats_reports      |          |
|   |  - id (PK)            |              |  - id (PK)            |              |  - id (PK)            |          |
|   |  - user_id (FK)       |              |  - resume_id (FK)     |              |  - resume_ver_id (FK) |          |
|   |  - raw_text           |              |  - file_path          |              |  - score              |          |
|   +-----------------------+              +-----------------------+              +-----------------------+          |
|               │                                                                                                    |
|               └──────────────────────────────── 1:N ────────────────────────────────┐                              |
|                                                                                     ▼                              |
|   +-----------------------+              +-----------------------+              +-----------------------+          |
|   |       projects        | 1 ------> N  |   project_progress    |              |   resume_suggestions  |          |
|   |  - id (PK)            |              |  - id (PK)            |              |  - id (PK)            |          |
|   |  - user_id (FK)       |              |  - project_id (FK)    |              |  - resume_ver_id (FK) |          |
|   |  - repo_url           |              |  - completed_steps    |              |  - original_text      |          |
|   +-----------------------+              +-----------------------+              +-----------------------+          |
+--------------------------------------------------------------------------------------------------------------------+
                                                       │
                                                       ▼ 1:N
+--------------------------------------------------------------------------------------------------------------------+
|                                           INTERVIEW & APPLICATIONS                                                 |
|                                                                                                                    |
|   +-----------------------+              +-----------------------+              +-----------------------+          |
|   |  interview_sessions   | 1 ------> N  |  interview_questions  | 1 ------> N  |   interview_answers   |          |
|   |  - id (PK)            |              |  - id (PK)            |              |  - id (PK)            |          |
|   |  - user_id (FK)       |              |  - session_id (FK)    |              |  - question_id (FK)   |          |
|   |  - status             |              |  - question_text      |              |  - transcript_text    |          |
|   +-----------┬-----------+              +-----------------------+              +-----------------------+          |
|               │                                                                                                    |
|               ├───────────────── 1:1 ────────────────┐                                                             |
|               ▼                                      ▼                                                             |
|   +-----------------------+              +-----------------------+              +-----------------------+          |
|   |   interview_reports   |              |  hiring_readiness     |              |     applications      |          |
|   |  - id (PK)            |              |  - id (PK)            |              |  - id (PK)            |          |
|   |  - session_id (FK)    |              |  - user_id (FK)       |              |  - user_id (FK)       |          |
|   |  - overall_score      |              |  - coding_score       |              |  - status (enum)      |          |
|   +-----------------------+              +-----------------------+              +-----------------------+          |
+--------------------------------------------------------------------------------------------------------------------+
                                                       │
                                                       ▼ 1:N
+--------------------------------------------------------------------------------------------------------------------+
|                                            COMMUNITY, PAYMENTS, & AI                                               |
|                                                                                                                    |
|   +-----------------------+              +-----------------------+              +-----------------------+          |
|   |         posts         | 1 ------> N  |       comments        |              |     subscriptions     |          |
|   |  - id (PK)            |              |  - id (PK)            |              |  - id (PK)            |          |
|   |  - user_id (FK)       |              |  - post_id (FK)       |              |  - user_id (FK)       |          |
|   |  - content            |              |  - user_id (FK)       |              |  - plan_id (FK)       |          |
|   +-----------------------+              +-----------------------+              +-----------------------+          |
|                                                                                                                    |
|   +-----------------------+              +-----------------------+              +-----------------------+          |
|   |    ai_conversations   | 1 ------> N  |      ai_requests      | 1 ------> 1  |     ai_responses      |          |
|   |  - id (PK)            |              |  - id (PK)            |              |  - id (PK)            |          |
|   |  - user_id (FK)       |              |  - conversation_id(FK)|              |  - request_id (FK)    |          |
|   |  - memory_context     |              |  - prompt_payload     |              |  - output_payload     |          |
|   +-----------------------+              +-----------------------+              +-----------------------+          |
+--------------------------------------------------------------------------------------------------------------------+
```

### 1.2 Referential Integrity Rules & Deletion Behaviours
1.  **Profiles and Users (1:1):** Mandatory cascade deletion (`ON DELETE CASCADE`). If a user deletes their authentication account, their candidate profile is permanently deleted.
2.  **Resumes and Resume Versions (1:N):** Cascade deletion (`ON DELETE CASCADE`). Deleting a master resume record cascade deletes all stored text and metadata versions.
3.  **Roadmaps and Users (1:N):** Restrict deletion (`ON DELETE RESTRICT`). Users cannot be purged until their active roadmap configurations are cleared or archived.
4.  **Applications and Users (1:N):** Soft delete model (`ON DELETE SET NULL` with audit logs) or hard logical retention for institutional legal audits.
5.  **Community Posts and Comments (1:N):** Deleting a post cascade deletes all underlying comments. Deleting a user does *not* cascade delete their posts; instead, posts are anonymized (`user_id` set to Null or a system placeholder UUID) to preserve community thread continuity.

---

## SECTION 2: PHYSICAL COLUMN SCHEMA DEFINITIONS

This section specifies the structural logical schemas for all database modules. Every table strictly enforces standard compliance:
*   `created_at` / `updated_at` / `deleted_at` are tracked for auditing.
*   Logical UUID v4 types are used for all IDs.
*   Normalized data types are prioritized.

---

### GROUP 1: AUTHENTICATION MODULE

#### 1. Users Table (`users`)
*   **Column definitions:**
    *   `id`: UUID v4 (Primary Key, unique, non-null)
    *   `email`: VARCHAR(255) (unique, indexed, lowercase, non-null)
    *   `password_hash`: VARCHAR(255) (non-null)
    *   `is_active`: BOOLEAN (default: true, non-null)
    *   `created_at`: TIMESTAMP WITH TIME ZONE (default: now(), non-null)
    *   `updated_at`: TIMESTAMP WITH TIME ZONE (default: now(), non-null)
    *   `deleted_at`: TIMESTAMP WITH TIME ZONE (nullable)

#### 2. Profiles Table (`profiles`)
*   **Column definitions:**
    *   `id`: UUID v4 (Primary Key, Foreign Key to `users.id` ON DELETE CASCADE)
    *   `full_name`: VARCHAR(255) (non-null)
    *   `avatar_url`: VARCHAR(2048) (nullable)
    *   `role_type`: VARCHAR(50) (enum limit: 'student', 'professional', 'college_admin', 'recruiter', 'super_admin', default: 'student', non-null)
    *   `created_at`: TIMESTAMP WITH TIME ZONE (default: now(), non-null)
    *   `updated_at`: TIMESTAMP WITH TIME ZONE (default: now(), non-null)

#### 3. Roles Table (`roles`)
*   **Column definitions:**
    *   `id`: UUID v4 (Primary Key)
    *   `name`: VARCHAR(50) (unique, indexed, non-null)
    *   `description`: TEXT (nullable)
    *   `created_at`: TIMESTAMP WITH TIME ZONE (default: now(), non-null)

#### 4. Permissions Table (`permissions`)
*   **Column definitions:**
    *   `id`: UUID v4 (Primary Key)
    *   `name`: VARCHAR(100) (unique, indexed, non-null)
    *   `description`: TEXT (nullable)
    *   `created_at`: TIMESTAMP WITH TIME ZONE (default: now(), non-null)

#### 5. User Roles Junction Table (`user_roles`)
*   **Column definitions:**
    *   `id`: UUID v4 (Primary Key)
    *   `user_id`: UUID v4 (Foreign Key to `users.id` ON DELETE CASCADE, non-null)
    *   `role_id`: UUID v4 (Foreign Key to `roles.id` ON DELETE CASCADE, non-null)
    *   *Constraints:* Unique constraint on composite `(user_id, role_id)`

#### 6. Sessions Table (`sessions`)
*   **Column definitions:**
    *   `id`: UUID v4 (Primary Key)
    *   `user_id`: UUID v4 (Foreign Key to `users.id` ON DELETE CASCADE, non-null)
    *   `session_token`: VARCHAR(255) (unique, non-null)
    *   `user_agent`: TEXT (nullable)
    *   `ip_address`: INET (nullable)
    *   `expires_at`: TIMESTAMP WITH TIME ZONE (non-null)
    *   `created_at`: TIMESTAMP WITH TIME ZONE (default: now(), non-null)

#### 7. OAuth Accounts Table (`oauth_accounts`)
*   **Column definitions:**
    *   `id`: UUID v4 (Primary Key)
    *   `user_id`: UUID v4 (Foreign Key to `users.id` ON DELETE CASCADE, non-null)
    *   `provider`: VARCHAR(50) (e.g., 'github', 'google', non-null)
    *   `provider_user_id`: VARCHAR(255) (non-null)
    *   `created_at`: TIMESTAMP WITH TIME ZONE (default: now(), non-null)
    *   *Constraints:* Unique constraint on composite `(provider, provider_user_id)`

#### 8. Login History Table (`login_history`)
*   **Column definitions:**
    *   `id`: UUID v4 (Primary Key)
    *   `user_id`: UUID v4 (Foreign Key to `users.id` ON DELETE CASCADE, non-null)
    *   `ip_address`: INET (non-null)
    *   `user_agent`: TEXT (nullable)
    *   `is_successful`: BOOLEAN (non-null)
    *   `failure_reason`: VARCHAR(255) (nullable)
    *   `created_at`: TIMESTAMP WITH TIME ZONE (default: now(), non-null)

---

### GROUP 2: CAREER MODULE

#### 9. Career Goals Table (`career_goals`)
*   **Column definitions:**
    *   `id`: UUID v4 (Primary Key)
    *   `user_id`: UUID v4 (Foreign Key to `profiles.id` ON DELETE CASCADE, non-null)
    *   `target_role`: VARCHAR(255) (non-null)
    *   `target_salary_min`: NUMERIC(12, 2) (nullable)
    *   `target_salary_max`: NUMERIC(12, 2) (nullable)
    *   `target_industry`: VARCHAR(255) (non-null)
    *   `is_achieved`: BOOLEAN (default: false, non-null)
    *   `created_at`: TIMESTAMP WITH TIME ZONE (default: now(), non-null)
    *   `updated_at`: TIMESTAMP WITH TIME ZONE (default: now(), non-null)

#### 10. Skills Master Table (`skills_master`)
*   **Column definitions:**
    *   `id`: UUID v4 (Primary Key)
    *   `name`: VARCHAR(255) (unique, indexed, non-null)
    *   `category`: VARCHAR(100) (indexed, non-null)
    *   `embedding`: VECTOR(1536) (nullable, pgvector representation for semantic operations)

#### 11. User Skills Table (`user_skills`)
*   **Column definitions:**
    *   `id`: UUID v4 (Primary Key)
    *   `user_id`: UUID v4 (Foreign Key to `profiles.id` ON DELETE CASCADE, non-null)
    *   `skill_id`: UUID v4 (Foreign Key to `skills_master.id` ON DELETE CASCADE, non-null)
    *   `proficiency_level`: INT (constraint: value BETWEEN 1 AND 5, non-null)
    *   `is_verified`: BOOLEAN (default: false, non-null)
    *   `last_tested_at`: TIMESTAMP WITH TIME ZONE (nullable)
    *   `created_at`: TIMESTAMP WITH TIME ZONE (default: now(), non-null)
    *   `updated_at`: TIMESTAMP WITH TIME ZONE (default: now(), non-null)
    *   *Constraints:* Unique constraint on composite `(user_id, skill_id)`

#### 12. Career Assessments Table (`career_assessments`)
*   **Column definitions:**
    *   `id`: UUID v4 (Primary Key)
    *   `user_id`: UUID v4 (Foreign Key to `profiles.id` ON DELETE CASCADE, non-null)
    *   `assessment_score_cognitive`: INT (nullable)
    *   `assessment_score_technical`: INT (nullable)
    *   `assessment_score_communication`: INT (nullable)
    *   `raw_ai_analysis`: JSONB (non-null, verified structural metadata)
    *   `status`: VARCHAR(50) (e.g., 'not_started', 'in_progress', 'completed', default: 'not_started', non-null)
    *   `created_at`: TIMESTAMP WITH TIME ZONE (default: now(), non-null)

#### 13. Skill Gap Reports Table (`skill_gap_reports`)
*   **Column definitions:**
    *   `id`: UUID v4 (Primary Key)
    *   `user_id`: UUID v4 (Foreign Key to `profiles.id` ON DELETE CASCADE, non-null)
    *   `target_role`: VARCHAR(255) (non-null)
    *   `gaps_identified`: JSONB (non-null, contains lists of priority missing skills and technical debt)
    *   `created_at`: TIMESTAMP WITH TIME ZONE (default: now(), non-null)

#### 14. Roadmaps Table (`roadmaps`)
*   **Column definitions:**
    *   `id`: UUID v4 (Primary Key)
    *   `user_id`: UUID v4 (Foreign Key to `profiles.id` ON DELETE CASCADE, non-null)
    *   `target_role`: VARCHAR(255) (non-null)
    *   `milestones`: JSONB (non-null, sequential nodes of curriculum)
    *   `is_active`: BOOLEAN (default: true, non-null)
    *   `progress_percentage`: INT (default: 0, non-null)
    *   `created_at`: TIMESTAMP WITH TIME ZONE (default: now(), non-null)
    *   `updated_at`: TIMESTAMP WITH TIME ZONE (default: now(), non-null)

#### 15. Roadmap Progress Table (`roadmap_progress`)
*   **Column definitions:**
    *   `id`: UUID v4 (Primary Key)
    *   `roadmap_id`: UUID v4 (Foreign Key to `roadmaps.id` ON DELETE CASCADE, non-null)
    *   `task_identifier`: VARCHAR(255) (non-null)
    *   `is_completed`: BOOLEAN (default: false, non-null)
    *   `completed_at`: TIMESTAMP WITH TIME ZONE (nullable)

---

### GROUP 3: RESUME MODULE

#### 16. Resumes Table (`resumes`)
*   **Column definitions:**
    *   `id`: UUID v4 (Primary Key)
    *   `user_id`: UUID v4 (Foreign Key to `profiles.id` ON DELETE CASCADE, non-null)
    *   `raw_text`: TEXT (non-null)
    *   `structured_json`: JSONB (non-null, STAR quantified attributes)
    *   `overall_score`: INT (constraint: value BETWEEN 0 AND 100, non-null)
    *   `created_at`: TIMESTAMP WITH TIME ZONE (default: now(), non-null)
    *   `updated_at`: TIMESTAMP WITH TIME ZONE (default: now(), non-null)

#### 17. Resume Versions Table (`resume_versions`)
*   **Column definitions:**
    *   `id`: UUID v4 (Primary Key)
    *   `resume_id`: UUID v4 (Foreign Key to `resumes.id` ON DELETE CASCADE, non-null)
    *   `version_number`: INT (non-null)
    *   `file_path`: VARCHAR(2048) (non-null)
    *   `raw_text`: TEXT (non-null)
    *   `created_at`: TIMESTAMP WITH TIME ZONE (default: now(), non-null)

#### 18. ATS Reports Table (`ats_reports`)
*   **Column definitions:**
    *   `id`: UUID v4 (Primary Key)
    *   `resume_version_id`: UUID v4 (Foreign Key to `resume_versions.id` ON DELETE CASCADE, non-null)
    *   `job_description_raw`: TEXT (non-null)
    *   `match_percentage`: INT (constraint: value BETWEEN 0 AND 100, non-null)
    *   `missing_keywords`: TEXT[] (non-null)
    *   `semantic_gap_analysis`: TEXT (non-null)
    *   `created_at`: TIMESTAMP WITH TIME ZONE (default: now(), non-null)

#### 19. Resume Suggestions Table (`resume_suggestions`)
*   **Column definitions:**
    *   `id`: UUID v4 (Primary Key)
    *   `resume_version_id`: UUID v4 (Foreign Key to `resume_versions.id` ON DELETE CASCADE, non-null)
    *   `original_text`: TEXT (non-null)
    *   `suggested_text`: TEXT (non-null)
    *   `reasoning`: TEXT (non-null)
    *   `is_applied`: BOOLEAN (default: false, non-null)
    *   `created_at`: TIMESTAMP WITH TIME ZONE (default: now(), non-null)

---

### GROUP 4: PROJECT MODULE

#### 20. Projects Table (`projects`)
*   **Column definitions:**
    *   `id`: UUID v4 (Primary Key)
    *   `user_id`: UUID v4 (Foreign Key to `profiles.id` ON DELETE CASCADE, non-null)
    *   `title`: VARCHAR(255) (non-null)
    *   `description`: TEXT (non-null)
    *   `github_url`: VARCHAR(2048) (nullable)
    *   `live_url`: VARCHAR(2048) (nullable)
    *   `is_verified`: BOOLEAN (default: false, non-null)
    *   `ai_validation_report`: JSONB (nullable, holds analysis from repository scanner)
    *   `created_at`: TIMESTAMP WITH TIME ZONE (default: now(), non-null)
    *   `updated_at`: TIMESTAMP WITH TIME ZONE (default: now(), non-null)

#### 21. Project Technologies Table (`project_technologies`)
*   **Column definitions:**
    *   `id`: UUID v4 (Primary Key)
    *   `project_id`: UUID v4 (Foreign Key to `projects.id` ON DELETE CASCADE, non-null)
    *   `skill_id`: UUID v4 (Foreign Key to `skills_master.id` ON DELETE CASCADE, non-null)
    *   *Constraints:* Unique constraint on composite `(project_id, skill_id)`

---

### GROUP 5: INTERVIEW MODULE

#### 22. Interview Sessions Table (`interview_sessions`)
*   **Column definitions:**
    *   `id`: UUID v4 (Primary Key)
    *   `user_id`: UUID v4 (Foreign Key to `profiles.id` ON DELETE CASCADE, non-null)
    *   `target_role`: VARCHAR(255) (non-null)
    *   `target_company`: VARCHAR(255) (nullable)
    *   `difficulty`: VARCHAR(50) (enum: 'beginner', 'intermediate', 'advanced', default: 'intermediate', non-null)
    *   `status`: VARCHAR(50) (enum: 'scheduled', 'in_progress', 'completed', 'evaluated', default: 'scheduled', non-null)
    *   `created_at`: TIMESTAMP WITH TIME ZONE (default: now(), non-null)
    *   `updated_at`: TIMESTAMP WITH TIME ZONE (default: now(), non-null)

#### 23. Interview Questions Table (`interview_questions`)
*   **Column definitions:**
    *   `id`: UUID v4 (Primary Key)
    *   `session_id`: UUID v4 (Foreign Key to `interview_sessions.id` ON DELETE CASCADE, non-null)
    *   `question_text`: TEXT (non-null)
    *   `question_type`: VARCHAR(50) (e.g., 'technical', 'behavioral', 'system_design', non-null)
    *   `ideal_answer_outline`: TEXT (nullable)
    *   `created_at`: TIMESTAMP WITH TIME ZONE (default: now(), non-null)

#### 24. Interview Answers Table (`interview_answers`)
*   **Column definitions:**
    *   `id`: UUID v4 (Primary Key)
    *   `question_id`: UUID v4 (Foreign Key to `interview_questions.id` ON DELETE CASCADE, non-null)
    *   `transcript_text`: TEXT (non-null)
    *   `audio_url`: VARCHAR(2048) (nullable)
    *   `response_duration_seconds`: INT (non-null)
    *   `created_at`: TIMESTAMP WITH TIME ZONE (default: now(), non-null)

#### 25. Interview Reports Table (`interview_reports`)
*   **Column definitions:**
    *   `id`: UUID v4 (Primary Key)
    *   `session_id`: UUID v4 (Foreign Key to `interview_sessions.id` ON DELETE CASCADE, unique, non-null)
    *   `overall_readiness_score`: INT (constraint: value BETWEEN 0 AND 100, non-null)
    *   `technical_score`: INT (constraint: value BETWEEN 0 AND 100, non-null)
    *   `communication_score`: INT (constraint: value BETWEEN 0 AND 100, non-null)
    *   `behavioral_score`: INT (constraint: value BETWEEN 0 AND 100, non-null)
    *   `detailed_feedback`: JSONB (non-null, holds structured list of gaps and model answers)
    *   `created_at`: TIMESTAMP WITH TIME ZONE (default: now(), non-null)

#### 26. Hiring Readiness Table (`hiring_readiness`)
*   **Column definitions:**
    *   `id`: UUID v4 (Primary Key)
    *   `user_id`: UUID v4 (Foreign Key to `profiles.id` ON DELETE CASCADE, unique, non-null)
    *   `overall_index`: INT (constraint: value BETWEEN 0 AND 100, non-null)
    *   `resume_score`: INT (constraint: value BETWEEN 0 AND 100, non-null)
    *   `coding_score`: INT (constraint: value BETWEEN 0 AND 100, non-null)
    *   `interview_score`: INT (constraint: value BETWEEN 0 AND 100, non-null)
    *   `assessment_score`: INT (constraint: value BETWEEN 0 AND 100, non-null)
    *   `skills_percentile`: DECIMAL(5, 2) (default: 0, non-null)
    *   `updated_at`: TIMESTAMP WITH TIME ZONE (default: now(), non-null)

---

### GROUP 6: APPLICATION MODULE

#### 27. Applications Table (`applications`)
*   **Column definitions:**
    *   `id`: UUID v4 (Primary Key)
    *   `user_id`: UUID v4 (Foreign Key to `profiles.id` ON DELETE CASCADE, non-null)
    *   `company_name`: VARCHAR(255) (non-null)
    *   `job_title`: VARCHAR(255) (non-null)
    *   `salary_range`: VARCHAR(100) (nullable)
    *   `job_description_raw`: TEXT (nullable)
    *   `status`: VARCHAR(50) (enum: 'saved', 'applied', 'interviewing', 'offer', 'rejected', default: 'saved', non-null)
    *   `next_action_date`: TIMESTAMP WITH TIME ZONE (nullable)
    *   `notes`: TEXT (nullable)
    *   `created_at`: TIMESTAMP WITH TIME ZONE (default: now(), non-null)
    *   `updated_at`: TIMESTAMP WITH TIME ZONE (default: now(), non-null)

---

### GROUP 7: COMMUNITY & EXCHANGE MODULE

#### 28. Posts Table (`posts`)
*   **Column definitions:**
    *   `id`: UUID v4 (Primary Key)
    *   `user_id`: UUID v4 (Foreign Key to `profiles.id` ON DELETE SET NULL, nullable)
    *   `title`: VARCHAR(255) (non-null)
    *   `content`: TEXT (non-null)
    *   `upvotes_count`: INT (default: 0, non-null)
    *   `created_at`: TIMESTAMP WITH TIME ZONE (default: now(), non-null)
    *   `updated_at`: TIMESTAMP WITH TIME ZONE (default: now(), non-null)
    *   `deleted_at`: TIMESTAMP WITH TIME ZONE (nullable)

#### 29. Comments Table (`comments`)
*   **Column definitions:**
    *   `id`: UUID v4 (Primary Key)
    *   `post_id`: UUID v4 (Foreign Key to `posts.id` ON DELETE CASCADE, non-null)
    *   `user_id`: UUID v4 (Foreign Key to `profiles.id` ON DELETE SET NULL, nullable)
    *   `content`: TEXT (non-null)
    *   `created_at`: TIMESTAMP WITH TIME ZONE (default: now(), non-null)

#### 30. Skill Exchange Requests Table (`skill_exchange_requests`)
*   **Column definitions:**
    *   `id`: UUID v4 (Primary Key)
    *   `sender_id`: UUID v4 (Foreign Key to `profiles.id` ON DELETE CASCADE, non-null)
    *   `offered_skill_id`: UUID v4 (Foreign Key to `skills_master.id` ON DELETE CASCADE, non-null)
    *   `requested_skill_id`: UUID v4 (Foreign Key to `skills_master.id` ON DELETE CASCADE, non-null)
    *   `status`: VARCHAR(50) (enum: 'pending', 'accepted', 'rejected', default: 'pending', non-null)
    *   `created_at`: TIMESTAMP WITH TIME ZONE (default: now(), non-null)

---

### GROUP 8: PAYMENT MODULE

#### 31. Plans Table (`plans`)
*   **Column definitions:**
    *   `id`: UUID v4 (Primary Key)
    *   `name`: VARCHAR(100) (non-null)
    *   `price_monthly`: NUMERIC(10, 2) (non-null)
    *   `price_yearly`: NUMERIC(10, 2) (non-null)
    *   `features_list`: JSONB (non-null)
    *   `is_active`: BOOLEAN (default: true, non-null)

#### 32. Subscriptions Table (`subscriptions`)
*   **Column definitions:**
    *   `id`: UUID v4 (Primary Key)
    *   `user_id`: UUID v4 (Foreign Key to `profiles.id` ON DELETE RESTRICT, non-null)
    *   `plan_id`: UUID v4 (Foreign Key to `plans.id` ON DELETE RESTRICT, non-null)
    *   `status`: VARCHAR(50) (e.g., 'active', 'canceled', 'past_due', default: 'active', non-null)
    *   `stripe_subscription_id`: VARCHAR(255) (unique, nullable)
    *   `current_period_start`: TIMESTAMP WITH TIME ZONE (non-null)
    *   `current_period_end`: TIMESTAMP WITH TIME ZONE (non-null)
    *   `created_at`: TIMESTAMP WITH TIME ZONE (default: now(), non-null)
    *   `updated_at`: TIMESTAMP WITH TIME ZONE (default: now(), non-null)

---

### GROUP 9: AUDIT MODULE

#### 33. Audit Logs Table (`audit_logs`)
*   **Column definitions:**
    *   `id`: UUID v4 (Primary Key)
    *   `user_id`: UUID v4 (Foreign Key to `profiles.id` ON DELETE SET NULL, nullable)
    *   `action`: VARCHAR(255) (non-null)
    *   `table_name`: VARCHAR(100) (non-null)
    *   `row_id`: UUID v4 (non-null)
    *   `old_data`: JSONB (nullable)
    *   `new_data`: JSONB (nullable)
    *   `ip_address`: INET (nullable)
    *   `user_agent`: TEXT (nullable)
    *   `created_at`: TIMESTAMP WITH TIME ZONE (default: now(), non-null)

---

### GROUP 10: AI LAYER TABLES

#### 34. AI Conversations Table (`ai_conversations`)
*   **Column definitions:**
    *   `id`: UUID v4 (Primary Key)
    *   `user_id`: UUID v4 (Foreign Key to `profiles.id` ON DELETE CASCADE, non-null)
    *   `session_context`: TEXT (nullable, holds summary context for session retention)
    *   `created_at`: TIMESTAMP WITH TIME ZONE (default: now(), non-null)
    *   `updated_at`: TIMESTAMP WITH TIME ZONE (default: now(), non-null)

#### 35. AI Requests Table (`ai_requests`)
*   **Column definitions:**
    *   `id`: UUID v4 (Primary Key)
    *   `conversation_id`: UUID v4 (Foreign Key to `ai_conversations.id` ON DELETE CASCADE, non-null)
    *   `provider`: VARCHAR(50) (e.g., 'openai', 'anthropic', 'google', non-null)
    *   `model`: VARCHAR(100) (non-null)
    *   `prompt_payload`: TEXT (non-null)
    *   `tokens_input`: INT (default: 0, non-null)
    *   `created_at`: TIMESTAMP WITH TIME ZONE (default: now(), non-null)

#### 36. AI Responses Table (`ai_responses`)
*   **Column definitions:**
    *   `id`: UUID v4 (Primary Key)
    *   `request_id`: UUID v4 (Foreign Key to `ai_requests.id` ON DELETE CASCADE, unique, non-null)
    *   `output_payload`: TEXT (non-null)
    *   `tokens_output`: INT (default: 0, non-null)
    *   `cost_usd`: NUMERIC(10, 6) (default: 0.0, non-null)
    *   `latency_ms`: INT (non-null)
    *   `created_at`: TIMESTAMP WITH TIME ZONE (default: now(), non-null)

---

## SECTION 3: PHYSICAL INDEXING STRATEGY

To maintain high query performance with over 100 million records, specific indices are mapped out logically:

1.  **Profiles Role Filter (Partial Index):**
    *   *Logical structure:* Index on `profiles(role_type)` WHERE `role_type = 'student'::user_role`
    *   *Purpose:* Optimizes student catalog queries for placement cells and recruiters.
2.  **Auth Lowercase Email Index (Unique Index):**
    *   *Logical structure:* Unique Index on `users(lower(email))`
    *   *Purpose:* Prevents registration duplicates and speeds up login queries.
3.  **Active Sessions Match (Composite Index):**
    *   *Logical structure:* Index on `sessions(user_id, session_token)`
    *   *Purpose:* Enhances API gateway session verification speeds.
4.  **Skills Vector Embedding Index (pgvector Index):**
    *   *Logical structure:* GIN Index using Cosine distance operator on `skills_master(embedding)`
    *   *Purpose:* Accelerates semantic matches for Skill Gap and ATS comparison engines.
5.  **Job Applications Tracker Pipeline (Composite Index):**
    *   *Logical structure:* Index on `applications(user_id, status)`
    *   *Purpose:* Optimizes user Kanban workspace loading speeds.
6.  **Soft Delete Filtering (Partial Index):**
    *   *Logical structure:* Index on `posts(id)` WHERE `deleted_at IS NULL`
    *   *Purpose:* Excludes archived forum content from the feed.

---

## SECTION 4: SUPABASE ROW-LEVEL SECURITY (RLS) POLICIES

To secure multi-tenant and candidate profiles, strict Row-Level Security (RLS) configurations are defined:

### 4.1 Candidate/B2C Policies
*   **Profiles Access:** Candidates can view and edit only their own profile details.
    *   *Condition:* `auth.uid() = id`
*   **Resume Data Access:** Users can perform SELECT, INSERT, UPDATE, or DELETE operations only on resumes matching their profile.
    *   *Condition:* `auth.uid() = user_id`
*   **Interview Audio/Evaluations:** Secure reads of transcripts and scores are restricted to the candidate.
    *   *Condition:* `EXISTS (SELECT 1 FROM interview_sessions WHERE interview_sessions.id = session_id AND interview_sessions.user_id = auth.uid())`

### 4.2 B2B Recruiter Policies
*   **Candidate Access:** Recruiters can read candidate profiles and verified badges only if the candidate's `overall_readiness_score` meets search thresholds.
    *   *Condition:* `EXISTS (SELECT 1 FROM profiles WHERE profiles.id = user_id AND profiles.role_type = 'student') AND EXISTS (SELECT 1 FROM users WHERE users.id = auth.uid() AND users.is_active = true)`
*   **Private Data Lock:** Recruiters are blocked from viewing raw text, files, and contact details unless a connection is established.

### 4.3 Institutional/College Policies
*   **Student Cohorts Read:** College admins can view aggregate and individual readiness reports only for students associated with their domain.
    *   *Condition:* `EXISTS (SELECT 1 FROM profiles AS admin_p WHERE admin_p.id = auth.uid() AND admin_p.role_type = 'college_admin') AND (split_part(profiles.email, '@', 2) = split_part(auth.jwt() ->> 'email', '@', 2))`

---

## SECTION 5: GLOBAL SEARCH & pgvector SEMANTIC ARCHITECTURE

For semantic matching and global search operations:

```
               [Search Query: "Node.js System Architect"]
                                   │
                                   ▼
                   [pgvector Distance Calculation]
                   - embedding <=> text-embedding-3
                                   │
            ┌──────────────────────┴──────────────────────┐
            ▼ (Cosine Similarity threshold >= 0.82)      ▼
   ┌───────────────────┐                        ┌───────────────────┐
   │  Skills Master    │                        │ Learning Resources│
   │  - id (PK)        │                        │  - id (PK)        │
   │  - name ("Node")  │                        │  - title ("Sys")  │
   └───────────────────┘                        └───────────────────┘
```

1.  **Skills Master Vector Storage:** The `skills_master.embedding` column stores 1536-dimensional vectors created using OpenAI's `text-embedding-3-small` or similar models.
2.  **Semantic Match Calculation:** The distance between the search embedding and the stored database vectors is calculated using Cosine Similarity (`<=>` operator in PostgreSQL).
3.  **Global Full-Text Search (FTS):** Search operations across non-vector tables (such as community posts or job companies) are managed using PostgreSQL `tsvector` columns with GIN indexes.

---

## SECTION 6: MIGRATION & RECONCILIATION BLUEPRINT

### 6.1 Migration Naming Conventions
```
/supabase/migrations/
├── 0001_initial_auth_and_profiles.sql
├── 0002_add_skills_and_pgvector.sql
├── 0003_create_resume_and_ats_tables.sql
└── 0004_implement_interview_and_evaluations.sql
```

### 6.2 Backward Compatibility & Zero-Downtime Rollback Strategies
1.  **Additive Migrations Only:** Modifying or deleting active production columns is prohibited. Old columns are deprecated gradually over several releases to prevent breaking live APIs.
2.  **Split-Phase Migration Strategy:**
    *   *Phase A:* Create new tables/columns and deploy the updated codebase to write to both old and new targets.
    *   *Phase B:* Run a background data migration script to sync old records.
    *   *Phase C:* Deploy a codebase update to read exclusively from the new schema, then safely remove the old targets.
3.  **Rollback Mechanics:** Every additive migration is paired with a corresponding rollback script (e.g., dropping newly added columns or tables) to ensure quick, zero-downtime recovery if issues arise during deployment.

---
This Enterprise Database Implementation Specification serves as the logical design and complete relational guide for CareerOS AI database engineering. Once approved, the physical schema can be deployed.
