# CAREEROS AI - THE AI DECISION ENGINE & CAREER INTELLIGENCE BIBLE
## Master Intelligence Layer & Decision Architecture Specification (V1.0)
### Compiled by: Chief AI Architect & Principal Machine Learning Engineer

---

## CONSTITUTIONAL ADOPTION & SYSTEM GOVERNANCE
*This Master AI Decision Engine & Career Intelligence Bible establishes the architectural blueprint for the intelligence layer of CareerOS AI. Operating strictly under the non-negotiable CareerOS Constitution, CareerOS AI is engineered not as a generic LLM chat wrapper, but as a robust, stateful **Decision Intelligence Platform**. The platform is designed to increase the candidate's hiring probability through deterministic routing, stateful career memory, semantic intent extraction, and strict validation of generated outcomes. In accordance with Master Prompt 18, this document details the conceptual pipelines, state trees, and semantic data shapes without generating raw application code.*

---

## SECTION 1: GLOBAL AI THINKING PIPELINE & ARCHITECTURE

The platform's decision pipeline processes user actions through a series of logical stages, transforming raw inputs into structured, stateful recommendations.

```
       [Raw User Request / Interaction]
                      │
                      ▼
         ┌──────────────────────────┐
         │      Intent Engine       │ (Maps input to 1 of 17 semantic categories)
         └────────────┬─────────────┘
                      │
                      ▼
         ┌──────────────────────────┐
         │      Context Engine      │ (Retrieves minimal token-optimized user profile)
         └────────────┬─────────────┘
                      │
                      ▼
         ┌──────────────────────────┐
         │    Career Memory Sync    │ (Retrieves weak topics, style, and history)
         └────────────┬─────────────┘
                      │
                      ▼
         ┌──────────────────────────┐
         │      Role & Domain       │ (Identifies profession, stage, and benchmarks)
         └────────────┬─────────────┘
                      │
                      ▼
         ┌──────────────────────────┐
         │  Business & Safety Gates │ (Gating by tier, credit checks, safety filter)
         └────────────┬─────────────┘
                      │
                      ▼
         ┌──────────────────────────┐
         │     AI Gateway Model     │ (Dispatches to Claude 3.5 or GPT-4o-mini)
         └────────────┬─────────────┘
                      │
                      ▼
         ┌──────────────────────────┐
         │  Structural Validation   │ (Zod verification and format constraints)
         └────────────┬─────────────┘
                      │
                      ▼
         ┌──────────────────────────┐
         │    Explanation Engine    │ (Appends WHY, time, difficulty, and outcomes)
         └────────────┬─────────────┘
                      │
                      ├──────────────────────────┐
                      ▼                          ▼
         ┌──────────────────────────┐   ┌──────────────────────────┐
         │     Database Updates     │   │     Dashboard Streams    │
         │  (Save state, lock RLS)  │   │  (Active Checklist Sync) │
         └──────────────────────────┘   └──────────────────────────┘
```

---

## SECTION 2: THE SEMANTIC INTENT ENGINE

Every user action is routed through a semantic intent classifier. The Intent Engine maps inputs to one of 17 distinct categories, preventing generic conversation and enforcing goal-oriented system actions.

### 2.1 Intent Classification Matrix

| Intent Category | Primary Trigger Interaction | Target System Routing | Core Domain Target |
| :--- | :--- | :--- | :--- |
| **Question** | Conversational coach inquiry | `Career Coach Module` | Skill acquisition |
| **Learning** | Selecting resource cards / tutorials | `Learning Orchestrator` | Knowledge acquisition |
| **Revision** | Flagging a weak interview topic | `Adaptive Study Planner` | Knowledge retention |
| **Interview** | Launching mock simulation sessions | `Interview Engine` | Speech and communication |
| **Resume** | Uploading or editing CV bullets | `Resume Intelligence` | Profile optimization |
| **Career Planning** | Editing profile preferences / roles | `Career Assessment` | Career goals |
| **Application** | Moving a target company tracking card | `Application Tracker` | Application pipelines |
| **Portfolio** | Registering personal git repositories | `Project Engine` | Verified badges |
| **Skill Gap** | Launching diagnostic skill reviews | `Skill Gap Engine` | Skills comparison |
| **Project** | Initiating webhook code assessments | `Project Engine` | Portfolio verification |
| **Coding** | Running sandbox technical test cases | `Coding Practice Sandbox` | Technical problem-solving |
| **Communication** | Saving mic speech/audio recordings | `Communication Practice` | Speech analytics |
| **Networking** | Querying peer study cohorts | `Skill Exchange / Community` | Collaborative prep |
| **Salary** | Reviewing target offer packages | `Career Coach Module` | Offer negotiation |
| **Job Search** | Inspecting anonymous company searches | `Recruiter Gateway` | Direct sourcing |
| **Mentorship** | Requesting peer-to-peer reviews | `Community Workspace` | Peer-to-peer reviews |

---

## SECTION 3: THE CONTEXT ENGINE & CAREER MEMORY

To optimize response quality and keep token usage low, the system uses a dual-state context compilation strategy, retrieving only the context required for the active intent.

```
                  +-----------------------------------+
                  |           CAREER MEMORY           | (Permanent encrypted store)
                  |                                   |
                  |  - Goal Career Paths              |
                  |  - Verified Skill Strengths       |
                  |  - Highlighted Weaknesses         |
                  |  - Historical Mistakes (STAR/Code)|
                  |  - Communication Baseline Metrics |
                  +----------------─┬─────────────────+
                                    │
                                    ▼ (Token Optimizer)
                  +----------------─┴─────────────────+
                  |          CONTEXT ENGINE           |
                  |                                   |
                  |  Only extracts context matching   |
                  |  the active classification intent |
                  +----------------─┬─────────────────+
                                    │
                                    ▼
                     [AI Gateway Prompt Payload]
```

### 3.1 Context Selection Matrix

*   **For `RESUME` Intent:** Packages raw resume JSON, target job description, and the user's historical STAR revisions. (Omits communication transcripts and code sandbox execution logs).
*   **For `INTERVIEW` Intent:** Packages target company name, target role parameters, experience level, and previously identified weak topics. (Omits raw resume text and application tracking pipeline logs).
*   **For `LEARNING` Intent:** Packages identified skill gaps, target timeline, available study hours, and historical quiz scores. (Omits resume files and interview audio recordings).

---

## SECTION 4: THE TECHNICAL DECISION ENGINE

Every recommendation generated by CareerOS AI is structured with clear priority, estimated impact, and dependency tracking.

### 4.1 Decision Metadata Fields (Zod Enforced Schema)

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "DecisionRecommendationNode",
  "type": "object",
  "properties": {
    "recommendationId": { "type": "string", "format": "uuid" },
    "title": { "type": "string" },
    "category": { "type": "string" },
    "priority": {
      "type": "string",
      "enum": ["CRITICAL", "HIGH", "MEDIUM", "LOW"]
    },
    "reasoning": { "type": "string" },
    "expectedHiringImpactPercent": {
      "type": "number",
      "minimum": 0.1,
      "maximum": 15.0
    },
    "estimatedMinutesToComplete": { "type": "integer" },
    "difficultyLevel": {
      "type": "string",
      "enum": ["EASY", "MEDIUM", "HARD"]
    },
    "dependencyRecommendationId": { "type": "string", "format": "uuid" }
  },
  "required": [
    "recommendationId",
    "title",
    "category",
    "priority",
    "reasoning",
    "expectedHiringImpactPercent",
    "estimatedMinutesToComplete",
    "difficultyLevel"
  ]
}
```

#### Priority Definitions:
*   `CRITICAL:` Blocks core user progress (e.g., a critical formatting issue or lack of quantified metrics on their resume).
*   `HIGH:` Essential skill gaps or coding patterns frequently tested by target employers.
*   `MEDIUM:` Secondary learning milestones or minor profile enhancements.
*   `LOW:` Optional networking tasks or supplemental reading materials.

---

## SECTION 5: CAREER INTELLIGENCE PLATFORM (TREND ISOLATION)

The system enforces a clear separation between verified, estimated, and AI-generated trends to prevent hallucinations.

```
       [Platform Data Inputs]
                 │
                 ├─── Official API / Document Inputs  ──► [VERIFIED LAYER] (Strictly deterministic data)
                 │
                 ├─── Statistical Projection Inputs  ───► [ESTIMATED LAYER] (Calculated via algorithms)
                 │
                 └─── Language Model Completions ────────► [GENERATED LAYER] (Clearly labeled as AI guidance)
```

### 5.1 Data Segregation Model

1.  **Verified Layer:**
    *   *Sourced From:* Official framework documentation, company-published job profiles, or verified GitHub commit logs.
    *   *Rules:* Handled deterministically. Information cannot be altered by language models.
2.  **Estimated Layer:**
    *   *Sourced From:* Statistical algorithms and historical aggregates (e.g., estimated hiring readiness and roadmap completion rates).
    *   *Rules:* Labeled clearly in the interface as an estimate based on platform activity.
3.  **AI-Generated Layer:**
    *   *Sourced From:* Output generated by language models (e.g., customized study summaries and simulated follow-up questions).
    *   *Rules:* Sanitized to remove hallucinated trends and labeled with an AI warning banner.

---

## SECTION 6: ROLE & STAGE ALIGNMENT ENGINE

The Role Engine matches recommendations with the candidate's active stage in their target industry to ensure relevance.

```
                        +----------------------------+
                        |  Role & Domain Alignment   |
                        +--------------┬-------------+
                                       │
        ┌──────────────────────────────┼──────────────────────────────┐
        ▼                              ▼                              ▼
 [CAREER DOMAINS]               [EXPERIENCE TIERS]             [PREPARATION STAGE]
 - Technology (SE/AI)           - Intern / Associate           - Assessment & Goal Set
 - Healthcare (Clinical)        - Junior Professional          - Skill Acquisition
 - Law & Governance             - Mid-Level Expert             - Portfolio Verification
 - Business & Commerce          - Senior Executive             - Simulation & Practice
 - Creative & Media                                            - Live Sourcing / Matching
```

### 6.1 Preparation Stage Definitions:
1.  **Assessment Stage:** Focuses on resume analysis, establishing career goals, and identifying initial skill gaps.
2.  **Acquisition Stage:** Focuses on learning milestones, reviewing study materials, and completing practice quizzes.
3.  **Portfolio Verification:** Focuses on validating personal GitHub repositories, reviewing code quality, and earning skill badges.
4.  **Simulation Stage:** Focuses on interactive coding challenges, communication practice, and mock interviews.
5.  **Active Sourcing:** Focuses on tracking application statuses, preparing for active interviews, and evaluating offers.

---

## SECTION 7: LEARNING & RECOMMENDATION ENGINES

The Learning Engine filters and recommends study resources based on strict quality benchmarks.

```
                 +------------------------------------------+
                 |          Learning Resource Registry      |
                 +--------------------┬---------------------+
                                      │
         ┌────────────────────────────┼────────────────────────────┐
         ▼                            ▼                            ▼
  [OFFICIAL CORNERSTONES]     [VERIFIED MOCK SESSIONS]     [PORTFOLIO ASSIGNMENTS]
  - react.dev                 - Behavioral Templates       - Custom mini-apps
  - nextjs.org/docs           - System Design Layouts      - Code structure tests
  - MDN Web Docs              - Domain-Specific Cases      - SQL migrations challenges
```

### 7.1 Multi-Dimensional Planning Rules

The Recommendation Engine generates plans across multiple time scales to keep the candidate on track:
*   **Daily Plan:** Contains 3 prioritized checklist items (e.g., 1 technical practice quiz, 1 resume bullet review, and 1 communication practice task).
*   **Weekly Plan:** Focuses on a specific skill domain (e.g., Web Performance Optimization), culminating in a portfolio verification challenge.
*   **Monthly Plan:** Focuses on a key milestone (e.g., achieving 80% readiness on Frontend Development), culminating in a full mock interview evaluation.

---

## SECTION 8: THE EXPLANATION & ADAPTATION PIPELINES

Every recommendation includes a structured explanation detailing the "why" and "how" behind the task.

### 8.1 The Explanation Schema

*   **The Why:** Connects the task directly to hiring requirements (e.g., *"This technical pattern is tested in 84% of mid-level Frontend interviews."*).
*   **Expected Benefit:** Explains how the task improves the candidate's metrics (e.g., *"+4% increase in estimated hiring readiness score."*).
*   **Time Required:** A clear time estimate (e.g., *"45 Minutes"*).
*   **Difficulty:** Labeled clearly as EASY, MEDIUM, or HARD.
*   **Target Outcome:** The expected outcome of completing the task (e.g., *"A verified skill badge for state management."*).

---

### 8.2 The Adaptation Pipeline

The Adaptation Engine automatically updates plans and roadmaps in response to changes in candidate performance or goals.

```
  [Candidate Performance Change] ──► [Evaluation & Threshold Check] ──► [Adaptive Roadmap Update]
```

1.  **Struggling Candidates (Mock Interview Score < 50%):**
    *   *Action:* Automatically reduces task complexity on the next roadmap milestone, injecting foundational study units and peer-review tasks.
2.  **Exceling Candidates (Mock Interview Score >= 80%):**
    *   *Action:* Upgrades task difficulty (e.g., shifting Frontend practice from basic state management to advanced rendering optimizations).
3.  **Goal Re-alignment:**
    *   *Action:* If the user changes their target role, the system resets active roadmap milestones, recalculates skill gaps, and updates recommended learning tracks.

---

## SECTION 9: SAFETY, QUALITY & MONITORING

### 9.1 Safety Guardrails

The platform maintains trust with recruiters and candidates through strict safety guardrails:
*   **No Fictional Certifications:** The system never issues credentials for unverified achievements.
*   **Unbiased Sourcing:** Student profiles are presented anonymously to recruiters, focusing strictly on verified skills and project performance.
*   **Clearly Expressed Uncertainty:** If the AI is uncertain about a career prediction or market trend, it must present a standard disclaimer rather than generating placeholder metrics.

---

### 9.2 Quality & System Monitoring

To ensure the decision layer remains effective, key performance metrics are tracked continuously:
1.  **Recommendation Acceptance Rate:** Evaluates the percentage of recommended tasks accepted and completed by candidates (target: >75%).
2.  **Interview Improvement Curve:** Tracks the rate of performance improvement across successive mock interviews.
3.  **Resume Match Performance:** Compares initial ATS match rates with matches achieved after implementing platform suggestions (target: >85% average match score).
4.  **Overall Platform Satisfaction:** Measures candidate progress and outcomes to ensure the platform directly supports career advancement.

---

This AI Decision Engine & Career Intelligence Bible serves as the master logical architecture for CareerOS AI. Once approved, transactional intelligence systems can be deployed.
