# CAREEROS AI - UNIVERSAL CAREER DOMAIN ENGINE
## Master Logical Multi-Domain Architecture Specification (V1.0)
### Designed by: Principal Product Designer (Apple), Principal AI Architect, & Principal Database Architect

---

## CONSTITUTIONAL ADOPTION & ENGINE ASSURANCE
*This master specification outlines the logical architecture of the Universal Career Domain Engine for CareerOS AI. CareerOS is NOT a platform restricted to Computer Science. It is designed as an intelligent career operating system supporting every major career domain (Technology, Business, Commerce, Healthcare, Core Engineering, Law, Education, Government, Creative, Media, Hospitality, Entrepreneurship) without requiring structural codebase alterations. New professions, evaluation patterns, assessments, and learning resources are dynamically registered, configured, and scaled purely through the database and CMS. In strict accordance with the Master Prompt 16 guidelines, this document defines the logical entities, rule matrices, and workflows without generating frontend React or backend Next.js application code.*

---

## SECTION 1: MASTER UNIVERSAL CAREER DOMAIN FRAMEWORK

To support every major profession without code refactoring, CareerOS AI utilizes a dynamic, schema-driven framework. Core features (Assessment, Gaps, Project, and Interview engines) query the database configuration schema to adapt their behaviors to the active candidate domain.

```
       [Candidate Profile (e.g., Domain: Healthcare, Role: Clinical Trial Specialist)]
                                      │
                                      ▼
                        ┌───────────────────────────┐
                        │  Universal Domain Engine  │
                        └─────────────┬─────────────┘
                                      │
           ┌──────────────────────────┼──────────────────────────┐
           ▼                          ▼                          ▼
┌─────────────────────┐    ┌─────────────────────┐    ┌─────────────────────┐
│  Clinical Cases     │    │  GAAS/Audit Models  │    │  Marketing Funnels  │
│  (Healthcare Path)  │    │  (Commerce Path)    │    │   (Business Path)   │
└─────────────────────┘    └─────────────────────┘    └─────────────────────┘
```

---

## SECTION 2: DYNAMIC DATABASE CONFIGURATION (CMS DIRECTED)

The entire career ontology is stored inside fully normalized PostgreSQL tables. Adding a new profession (such as Aviation, Nutrition, or Fashion Design) requires only inserting data rows into these CMS tables.

### 2.1 The CMS Relational Schema Map

1.  **Career Domains Table (`cms_career_domains`):**
    *   *Columns:* `id` (UUID), `name` (e.g., 'healthcare', 'law', 'business'), `description` (TEXT), `is_active` (BOOLEAN).
2.  **Domain Roles Table (`cms_domain_roles`):**
    *   *Columns:* `id` (UUID), `domain_id` (FK to `cms_career_domains`), `name` (e.g., 'Registered Nurse', 'Corporate Auditor'), `experience_level` (enum: 'entry', 'mid', 'senior'), `responsibilities` (TEXT[]), `interview_pattern_id` (FK to templates), `created_at` (TIMESTAMP).
3.  **Role Skills Table (`cms_role_skills`):**
    *   *Columns:* `id` (UUID), `role_id` (FK to `cms_domain_roles`), `skill_name` (VARCHAR), `importance_tier` (enum: 'critical', 'high', 'medium', 'low'), `prerequisites` (TEXT[]), `average_learning_hours` (INT).
4.  **Role Tools Table (`cms_role_tools`):**
    *   *Columns:* `id` (UUID), `role_id` (FK to `cms_domain_roles`), `tool_name` (e.g., 'PubMed' for doctors, 'Figma' for designers, 'Excel' for finance), `proficiency_level_required` (INT).
5.  **Role Projects Table (`cms_role_projects`):**
    *   *Columns:* `id` (UUID), `role_id` (FK to `cms_domain_roles`), `project_title` (VARCHAR), `project_description` (TEXT), `deliverable_type` (enum: 'code', 'clinical_case', 'legal_brief', 'financial_model', 'lesson_plan', 'design_portfolio').

---

## SECTION 3: DOMAIN-SPECIFIC EVALUATION & PRACTICE PIPELINES

Every feature is designed to adapt its operational pipeline depending on the user's active domain, avoiding any default assumption that every user needs LeetCode, GitHub, or coding.

```
       [Selected Career Path]
                  │
         ┌────────┴────────┐
         ▼ (Tech Path)     ▼ (Healthcare Path)
┌──────────────────┐     ┌──────────────────┐
│  LeetCode / DSA  │     │  Clinical Case   │
│  Monaco Sandbox  │     │  Analysis Panel  │
└──────────────────┘     └──────────────────┘
```

### 3.1 Domain-Specific Assessment Engine Rules
*   **The Zero-Coding Rule:** Doctors, Lawyers, Nurses, Designers, and Finance specialists must never be presented with DSA, LeetCode, or code syntax challenges.
*   **Healthcare assessments:** Focus on clinical trial designs, diagnosis logs, drug safety, patient care protocols, and HIPAA/FDA compliance.
*   **Law assessments:** Focus on legal drafting, case analyses, land court litigation codes, contracts clauses, and compliance auditing.
*   **Creative assessments:** Focus on design, UX heuristics, Figma layout speed, graphic composition rules, typography hierarchies, and portfolio reviews.

---

### 3.2 Dynamic Project & Portfolio Engine Recommendations

The Project Engine recommends domain-appropriate deliverables based on the candidate's career track:

| Domain | Role Example | Recommended Project Topic | Required Deliverable Type |
| :--- | :--- | :--- | :--- |
| **Technology** | Backend Developer | High-Throughput Redis Cache | GitHub Public Code Repository |
| **Healthcare** | Clinical Specialist | FDA-compliant Clinical Protocol | Clinical Trial Case Study Write-up |
| **Law & Gov** | Patent Advisor | Intellectual Property Patent Draft | Legal Brief & Claims Analysis |
| **Business** | Growth Marketer | SaaS Inbound Funnel Campaign | Marketing Campaign Portfolio |
| **Commerce** | Financial Analyst | Leveraged Buyout Valuation Model | Excel Financial Model Spreadsheet |
| **Education** | STEM Professor | High-School Physics Syllabus | Structured Lesson Plan Curriculum |

---

### 3.3 Dynamic Interview & Follow-up Engine
*   **Behavioral & Scenario Adaptability:** Interview questions are tailored specifically to real-world domain scenarios (e.g., triage prioritization for nurses, audit variances for accountants, client management for consultants).
*   **Follow-up questions:** Dynamically drill down into domain-appropriate topics (e.g. if an accountant mentions cash flows, the system asks about working capital, GAAP compatibility, and tax depreciations).

---

## SECTION 4: PROFESSIONAL PLACEMENT READINESS METRICS

To calculate hiring readiness across different professions, the platform uses domain-specific weighting formulas, avoiding a single rigid scoring template for all users.

```
                  ┌──────────────────────────────────────────────┐
                  │          Readiness Index Engine              │
                  └──────┬────────────────────────────────┬──────┘
                         │                                │
           ┌─────────────┴─────────────┐    ┌─────────────┴─────────────┐
           ▼ (Healthcare Role Weighting)▼    ▼ (Creative Role Weighting) ▼
┌──────────────────────────────────────┐  ┌──────────────────────────────────────┐
│  - Clinical Assessments: 35%         │  │  - Figma Design Portfolio: 45%       │
│  - Oral Communications: 35%          │  │  - Oral Communications: 25%          │
│  - Clinical Gaps Metrics: 15%        │  │  - Design Layout Assessments: 15%    │
│  - Resume Score: 15%                 │  │  - Resume Score: 15%                 │
└──────────────────────────────────────┘  └──────────────────────────────────────┘
```

1.  **Healthcare Readiness Metric:** Weighting focuses heavily on Clinical Case Diagnostics (35%) and Communication Clarity (35%), with Portfolio and Resume tracking at 15% each.
2.  **Creative Readiness Metric:** Weighting focuses heavily on Portfolio reviews (45%) and communication clarity (25%), with UI/UX assessments at 15% and Resumes at 15%.
3.  **Law & Governance Readiness Metric:** Weighting focuses on Case Analysis drafting (40%), verbal argumentation (30%), and Compliance Assessments (15%).

---

## SECTION 5: AI PLATFORM COGNITIVE RULES

To prevent hallucination, bias, and generic recommendations, the centralized AI Gateway enforces the following rules across all multi-domain engines:
1.  **Strict Domain Isolation:** The AI must only retrieve context directly related to the candidate's active career domain (e.g., never using technology terms in healthcare interviews).
2.  **No Fact Fabrication:** The AI must never invent salary data, hiring trends, or company-specific hiring processes. If local data is unavailable, the AI must explicitly indicate uncertainty and refer the user to official sources.
3.  **No Generic Templates:** Learning resources recommended by the AI must map to official, high-quality reference targets (such as PubMed Central, the IRS, or the SEC EDGAR directory), avoiding fake or placeholder URLs.

---

This Universal Career Domain Engine specification serves as the core multi-profession design guide for CareerOS AI. Once approved, dynamic CMS schema integrations can proceed.
