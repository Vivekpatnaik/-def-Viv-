# CAREEROS AI - THE BUSINESS LOGIC BIBLE
## Master Business Rules, Algorithms, and Calculation Specifications (V1.0)
### Compiled by: Chief Product Officer & Principal Business Analyst

---

## CONSTITUTIONAL ADOPTION & STRATEGIC STATEMENT
*This Business Logic Bible serves as the single source of truth for all operational calculations, score generations, adaptive triggers, pricing limits, credit allocations, and governance parameters within CareerOS AI. Every business rule codified herein has been engineered strictly to maximize the candidate's **hiring probability**. Operating under the locked CareerOS Constitution, all formulas, decision trees, and thresholds are dynamic, context-aware, and configurable through the central CMS and Database to prevent hardcoded business assumptions. In strict accordance with the Master Prompt 17 constraints, this document defines rules logically without writing frontend React or backend Next.js application code.*

---

## SECTION 1: MASTER CALCULATIONS & WEIGHTING ENGINES

To maintain accuracy across different professions, CareerOS AI avoids static, one-size-fits-all scoring systems. Instead, weights are dynamically assigned depending on the candidate's active career domain (configured via the CMS).

### 1.1 Placement Readiness Score (PRS) Calculation
The overall Placement Readiness Percentile represents the candidate's progress toward becoming interview-ready.

$$\text{PRS} = \sum (\text{Component Score} \times \text{Domain Weight}) \times \text{Consistency Multiplier}$$

#### Domain Weighting Configuration Matrix (CMS Controlled)

| Active Career Domain | Resume Weight | Coding Weight | Oral Comm Weight | Portfolio/Case Weight | Assessment Weight |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Technology (SE/AI)** | `25%` | `25%` | `20%` | `15%` | `15%` |
| **Healthcare (Clinical)**| `15%` | `0%` | `35%` | `35%` | `15%` |
| **Law & Governance** | `20%` | `0%` | `30%` | `35%` | `15%` |
| **Business & Commerce** | `15%` | `0%` | `35%` | `35%` | `15%` |
| **Creative & Media** | `15%` | `0%` | `25%` | `45%` | `15%` |

#### Consistency Multiplier Matrix
*   *Multiplier Formula:* $M = 1.0 + (\text{Active Streak Days} \times 0.01)$ (capped at maximum $1.10$, representing a maximum 10% bonus for consistency).
*   *Stall Penalty:* If the candidate has been inactive for more than 7 consecutive days, a $0.95$ penalty multiplier is applied to their score, helping to motivate consistent preparation.

---

### 1.2 Estimated Hiring Readiness Index (HRI)
The Hiring Readiness Index estimates a candidate's compatibility with target recruiters, serving as a key benchmark before sharing their profile.

$$\text{HRI} = (\text{Resume ATS Score} \times 0.30) + (\text{Interview Evaluation} \times 0.40) + (\text{Project Code Quality} \times 0.20) + (\text{Active Applications Tracker Scale} \times 0.10)$$

*Note: The system never guarantees placement. The user interface must prominently label this metric as "Estimated Readiness" alongside a standard disclaimer.*

---

## SECTION 2: ADAPTIVE ROADMAP DECISION TREES

The Roadmap Engine automatically adjusts the candidate's study schedule based on their active performance data.

### 2.1 The Automated Roadmap Adaptation Decision Tree
```
  [Candidate Completes Mock Interview]
                   │
                   ├─────────── Score >= 80% ───────────> [Increase Difficulty Node]
                   │                                      - Upgrade next milestone: Easy -> Medium -> Hard
                   │                                      - Recommend advanced system design challenges
                   │
                   ├───── Score BETWEEN 50% and 79% ────> [Maintain Target Timeline]
                   │                                      - Standard schedule continues
                   │
                   └─────────── Score < 50% ────────────> [Trigger Adaptive Remediation]
                                                          - Automatically inject focused foundational lessons
                                                          - Set active milestone status to "Adapted"
                                                          - Add priority learning resources (official documentation)
```

### 2.2 Domain Skill-Gap Priority Matrix
Skill gaps are automatically prioritized based on their direct relevance to the target role's interview patterns:
1.  **Critical Priority:** Missing skills required for core technical or clinical evaluations (estimated study time: 10-20 hours).
2.  **High Priority:** Skills frequently mentioned in target company job descriptions (estimated study time: 8-15 hours).
3.  **Medium Priority:** Secondary skills that support main competencies (estimated study time: 5-10 hours).
4.  **Low Priority:** General industry knowledge or soft skills (estimated study time: 1-5 hours).

---

## SECTION 3: SUBSCRIPTION GATEWAY & CREDIT ALLOCATION

To maintain platform sustainability and manage compute costs, feature access is governed by subscription tiers.

```
                           ┌────────────────────────────┐
                           │    Subscription Gateway    │ (Stripe & Razorpay synced)
                           └─────────────┬──────────────┘
                                         │
         ┌───────────────────────────────┼──────────────────────────────┐
         ▼                               ▼                              ▼
    [FREE TIER]                     [STARTER]                      [PREMIUM]
    - 50 Credits/Month              - 500 Credits/Month            - Unlimited Core Features
    - 1 Resume Scan/Month           - 10 Resume Scans/Month        - Unlimited Resume Scans
    - 1 Mock Interview/Month        - 5 Mock Interviews/Month      - Unlimited Mock Interviews
    - Standard queues               - Standard queues              - Priority queues (Voice)
```

### 3.1 Tier Limits & AI Credits Table (CMS Configurable)

| Parameter / Feature Limits | Free Tier | Starter Tier | Intermediate Tier | Premium Tier |
| :--- | :--- | :--- | :--- | :--- |
| **Monthly Cost (USD)** | `$0.00` | `$19.00` | `$49.00` | `$99.00` |
| **Monthly Credit Allocation** | `50 Credits` | `500 Credits` | `1,500 Credits` | `Unlimited (FUP applies)` |
| **Resume Parsing Limits** | `1 Scan/Month` | `10 Scans/Month` | `30 Scans/Month` | `Unlimited` |
| **Mock Interview Limits** | `1 Session/Month`| `5 Sessions/Month` | `20 Sessions/Month` | `Unlimited` |
| **AI Coach Dialogue Limits** | `5 Messages/Day` | `50 Messages/Day` | `150 Messages/Day` | `Unlimited` |
| **Active Roadmaps Track** | `1 Roadmap` | `1 Roadmap` | `3 Roadmaps` | `Unlimited` |
| **Queue Priority Level** | `Standard` | `Standard` | `Priority` | `Instant Edge Dedicated` |

### 3.2 AI Credit Consumption Rates (Dynamic)
Every AI feature consumes credits to offset API operational costs:
*   *Resume parsing & STAR rewriting:* 15 credits.
*   *ATS matching comparison:* 10 credits.
*   *Next question generation (Interview):* 2 credits.
*   *Comprehensive interview evaluation:* 20 credits.
*   *Conversational career coach message:* 1 credit.

---

## SECTION 4: GAMIFICATION & STREAK MATH

To motivate learning, the platform uses gamification mechanics that are strictly designed to encourage consistent practice.

### 4.1 Experience Points (XP) & Levels Scale
XP is awarded based on completed tasks:
*   *Completing a daily milestone task:* +50 XP.
*   *Solving a coding problem or clinical case:* +100 XP.
*   *Completing a mock interview:* +300 XP.
*   *Accepting a STAR resume suggestion:* +20 XP.

#### Level Calculation Formula (CMS Configurable)

$$\text{Level} = \left\lfloor 1 + \sqrt{\frac{\text{Total XP}}{250}} \right\rfloor$$

| Level Target | Minimum XP Required | Level Title / Tier |
| :--- | :--- | :--- |
| **Level 1** | `0 XP` | Novice Candidate |
| **Level 2** | `250 XP` | Focused Learner |
| **Level 3** | `1,000 XP` | Skill Acquirer |
| **Level 4** | `2,250 XP` | Verified Explorer |
| **Level 5** | `4,000 XP` | Placement-Ready Professional |

### 4.2 Streak Math & Bonus Rules
*   **Daily Streak:** Incremented if the candidate completes at least one XP-awarding activity within a 24-hour window.
*   **Streak Freeze:** Premium subscribers receive 1 automated "Streak Freeze" card per month, preserving their active streak if they are inactive for a day.

---

## SECTION 5: REFERRALS & ANTI-FRAUD PARAMETERS

### 5.1 Reward Structure
*   **Referrer Reward:** +150 bonus credits when the referred user signs up and verifies their email.
*   **Referred User Reward:** +100 starting credits upon account creation.
*   **Subscription Bonus:** If a referred user upgrades to a paid plan, the referrer receives a 10% discount on their next billing cycle.

### 5.2 Anti-Fraud Rules
1.  **Strict Email verification:** Referral rewards are credited only after the referred user completes email verification.
2.  **IP Address Match Block:** If both accounts share the same IP address or device fingerprint during sign-up, the referral transaction is flagged for administrative audit, and rewards are temporarily withheld.

---

## SECTION 6: INSTITUTIONAL & ENTERPRISE PORTAL GOVERNANCE

### 6.1 College Admin Portal Rules
*   **Student Privacy Guard:** College admins and faculty can only view a student's portfolio achievements, completed roadmaps, and overall readiness percentiles.
*   **Private Data Masking:** Students' private contact details, individual chat transcripts with the AI Coach, and raw resume files are hidden unless explicitly shared by the student.

### 6.2 Recruiter Matching Rules
*   **Verified Candidate Searches:** Recruiters can search for candidates based on verified skills, projects, and readiness tiers.
*   **Unbiased Sourcing:** Student profiles are presented anonymously (masking name, gender, age, and university name) until the recruiter requests an interview and the candidate accepts, ensuring a fair, skills-first evaluation.

---

## SECTION 7: CENTRALIZED CMS SCHEMA MAPS

All operational metrics, score weights, limits, and thresholds are configurable through the CMS:

```
[CMS Configuration Workspace] ──► [PostgreSQL Metadata Tables] ──► [Active Application Engines]
```

### 7.1 CMS Tables

1.  **CMS Plan Configurations (`cms_plan_configs`):**
    *   *Columns:* `plan_id` (UUID), `cost_usd` (NUMERIC), `allocated_credits` (INT), `interview_limit` (INT).
2.  **CMS Score Weightings (`cms_score_weights`):**
    *   *Columns:* `domain_name` (VARCHAR), `resume_weight` (DECIMAL), `coding_weight` (DECIMAL), `interview_weight` (DECIMAL).
3.  **CMS Gamification Parameters (`cms_gamification_params`):**
    *   *Columns:* `level_base_xp` (INT), `daily_streak_bonus_percent` (DECIMAL).

---

This Business Logic Bible serves as the master business rules and logical framework for CareerOS AI. Once approved, the business logic and algorithms can be integrated.
