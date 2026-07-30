# CAREEROS AI - AI ARCHITECTURE & INTELLIGENCE SYSTEM
## Master AI Platform Specification (V1.0)
### Designed by: Principal AI Architect

---

## CONSTITUTIONAL ADOPTION & AI PLATFORM ASSURANCE
*This master specification outlines the logical, enterprise-grade AI architecture for CareerOS AI. Operating strictly under the non-negotiable CareerOS Constitution, our platform treats AI not as an conversational chatbot, but as a suite of highly specialized, independent, and stateless computational engines. Every request routes through a secure, centralized Gateway that manages rate limiting, context assembly, multi-model execution, structured output validation, cost management, and audit tracking. In strict accordance with the Master Prompt 05 constraints, this specification defines the logical modules, prompt frameworks, memory stores, and optimization strategies without generating application code or raw prompt templates.*

---

## SECTION 1: CENTRALIZED AI GATEWAY ARCHITECTURE

To prevent direct API calls from the client-side presentation layer and ensure consistency, security, and cost tracking, all AI operations are routed through a centralized **AI Gateway**.

### 1.1 The Complete AI Gateway Request Flow
```
 [User Workspace Client]
            │
            ▼ (Secure JWT over HttpOnly Cookie)
   [Authentication Check]
            │
            ▼ (Zod Schema Validation)
    [API Rate Limiter] (Token Bucket via Redis, checking tier quotas)
            │
            ▼ (Semantic Cache Query)
   [Response Cache Lookup] ── (Hit) ──> [Return Cached Output]
            │ (Miss)
            ▼
   [Career Memory Engine] (Fetches current goals, skills, history context)
            │
            ▼
    [Context Builder] (Assembles relevant context, applies compression)
            │
            ▼
     [Prompt Loader] (Fetches version-controlled prompt template from DB)
            │
            ▼
   [Provider Selector] (Determines optimal model based on cost and capability)
            │
            ▼
     [AI Provider Call] (Sends request to Claude, OpenAI, Gemini, DeepSeek, etc.)
            │
            ▼
   [Output Validation] (Enforces Zod schema, safety rules, and business rules)
            │
      ┌─────┴──────────┐
      ▼ (Valid)        ▼ (Invalid)
[Business Rules Parse] [Graceful Error & Retry Pipeline]
      │
      ▼
[Database Transaction] (Persists transaction audit logs & token budgets)
      │
      ▼
 [Frontend Response] (Delivers verified, structured response payload)
```

---

## SECTION 2: THE 18 SPECIALIZED AI ENGINES

CareerOS AI is powered by 18 independent, single-responsibility engines. No engine may bypass the AI Gateway or perform tasks reserved for other engines.

```
                  ┌─────────────────────────────────────────┐
                  │               AI GATEWAY                │
                  └──────┬───────────────────────────┬──────┘
                         │                           │
          ┌──────────────┴──────────────┐   ┌────────┴─────────────┐
          ▼                             ▼   ▼                      ▼
┌──────────────────┐            ┌──────────────────┐       ┌──────────────────┐
│Resume Intel Engine│            │   ATS AI Engine  │       │Assessment Engine │
└──────────────────┘            └──────────────────┘       └──────────────────┘
┌──────────────────┐            ┌──────────────────┐       ┌──────────────────┐
│ Skill Gap Engine │            │Career Intel Engine│      │Roadmap AI Engine │
└──────────────────┘            └──────────────────┘       └──────────────────┘
┌──────────────────┐            ┌──────────────────┐       ┌──────────────────┐
│ Learning Orch Eng│            │Proj Recommend Eng│       │Coding Eval Engine│
└──────────────────┘            └──────────────────┘       └──────────────────┘
┌──────────────────┐            ┌──────────────────┐       ┌──────────────────┐
│ Comm Eval Engine │            │Mock Interview Eng│       │Interview Eval Eng│
└──────────────────┘            └──────────────────┘       └──────────────────┘
┌──────────────────┐            ┌──────────────────┐       ┌──────────────────┐
│ Placement Read Eng│            │Recommend AI Engine│      │Career Coach Eng  │
└──────────────────┘            └──────────────────┘       └──────────────────┘
┌──────────────────┐            ┌──────────────────┐       ┌──────────────────┐
│Career Memory Eng │            │ Analytics Engine │       │Notification Engine│
└──────────────────┘            └──────────────────┘       └──────────────────┘
```

### 2.1 Individual Engine Responsibilities

1.  **Resume Intelligence Engine:** Parses resumes, calculates starting professional scores, identifies formatting issues, and reformats descriptions using action verbs and the STAR methodology.
2.  **ATS Engine:** Simulates corporate Applicant Tracking Systems, checking resumes against target job descriptions to identify missing keywords, acronyms, and semantic alignment gaps.
3.  **Career Assessment Engine:** Evaluates candidate answers to diagnostic questions to identify baseline technical, cognitive, and communicative competencies.
4.  **Skill Gap Engine:** Compares a candidate's verified skills against target role profiles to map out specific areas of technical debt.
5.  **Career Intelligence Engine:** Researches and analyzes active industry hiring trends, required skill changes, technology standards, and regional salary ranges.
6.  **Roadmap Engine:** Dynamically schedules weekly preparation tasks based on a candidate's target role, starting skill gaps, and weekly hour commitments.
7.  **Learning Orchestration Engine:** Reviews, filters, and recommends targeted external learning references, tutorials, and materials based on a candidate's current roadmap goals.
8.  **Project Recommendation Engine:** Recommends relevant coding project topics to help candidates address specific skill gaps and build verified experience.
9.  **Coding Evaluation Engine:** Scans public git repositories to check code structures, formatting, test coverages, and architectural vulnerabilities.
10. **Communication Evaluation Engine:** Analyzes audio interview transcript recordings to evaluate delivery pace, filler word frequency, clarity, grammar, and vocabulary complexity.
11. **Interview Engine:** Orchestrates realistic mock interviews, adaptively updating question difficulty based on candidate technical responses.
12. **Interview Evaluation Engine:** Evaluates candidate interview transcripts against model answers, pointing out specific logic gaps and suggestions for improvement.
13. **Placement Readiness Engine:** Calculates the overall Job Readiness Percentile by aggregating scores across all completed platform modules.
14. **Recommendation Engine:** Evaluates active user performance parameters to recommend weekly goals, skills to focus on, and upcoming target interview topics.
15. **Career Coach Engine:** Provides conversational guidance to help candidates with job strategy, interview follow-ups, and salary negotiations.
16. **Career Memory Engine:** Manages and persists long-term candidate state history, context variables, and preferences.
17. **Analytics Engine:** Processes aggregate user activity to identify preparation bottlenecks and predict placement timelines.
18. **Notification Intelligence Engine:** Coordinates system updates and nudges (such as upcoming deadline alerts or recommended mock practice sessions).

---

## SECTION 3: THE CAREER MEMORY ENGINE & CONTEXT SYSTEM

### 3.1 Long-Term Context Retention Architecture
The **Career Memory Engine** manages long-term candidate state across the platform. Every specialized engine must query the Career Memory Engine before responding, ensuring the candidate's active state remains synchronized and contextually aware.

```
  [Platform Activity (Code, Mock, Resume)]
                     │
                     ▼
       ┌──────────────────────────┐
       │   Career Memory Engine   │
       └─────────────┬────────────┘
                     │
        ┌────────────┴────────────┐
        ▼                         ▼
┌──────────────┐          ┌──────────────┐
│  Cold State  │          │  Warm State  │ (Upstash Redis)
│ (Supabase)   │          │  - Active    │
│  - Metrics   │          │    Metrics   │
│  - Roadmap   │          │  - Context   │
│  - History   │          │    History   │
└──────────────┘          └──────────────┘
```

### 3.2 Dynamic Context Building & Compression Strategy
To prevent token waste and avoid context overflow (by exceeding LLM context windows), the Gateway utilizes a dynamic **Context Builder**:
1.  **Selective Fetching:** Only retrieves context attributes directly related to the current query.
2.  **Context Compaction:** Truncates older history records, replacing them with a concise summary compiled during earlier sessions.
3.  **Token Budget Limits:** Enforces strict limits on the size of context payloads (e.g., maximum 4,000 tokens for standard queries, and maximum 8,000 tokens for deep analyses).

---

## SECTION 4: SYSTEM-WIDE PROMPT MANAGEMENT

### 4.1 Prompt Isolation Principles
To maintain modularity and allow easy adjustments, all prompts are stored outside of application code, using a dedicated, version-controlled repository.

*   **Version Control:** Every prompt template contains a semantic version tag (e.g., `v1.2.0-resume-star-parser`).
*   **Categories & Tags:** Prompts are organized by target module and required model capabilities.
*   **Metadata Tracking:** Prompts track metrics like average execution cost, token counts, and output failure rates.
*   **Rollback Mechanism:** Allows administrators to roll back prompts to earlier versions instantly if regression issues are identified.

---

## SECTION 5: MULTILAYER OUTPUT VALIDATION PIPELINE

Every AI generation must pass through a strict validation pipeline before being stored or returned to the client-side presentation layer.

```
               [Raw Provider Generation]
                           │
                           ▼
               ┌───────────────────────┐
               │   Schema Validation   │ (Enforces Zod structural JSON layout)
               └───────────┬───────────┘
                           │
                           ▼
               ┌───────────────────────┐
               │  Business Rule Check  │ (Verifies scores are 0-100, logic rules)
               └───────────┬───────────┘
                           │
                           ▼
               ┌───────────────────────┐
               │  AI Safety & Truth    │ (Validates against hallucination & bias)
               └───────────┬───────────┘
                           │
            ┌──────────────┴──────────────┐
            ▼ (Pass)                      ▼ (Fail)
  [Persist & Respond]            [Self-Correction & Retry]
                                 - Maximum 2 retries
                                 - Fallback to lower-cost model
                                 - Return graceful error payload
```

---

## SECTION 6: PERFORMANCE & AI COST OPTIMIZATION

To optimize platform cost efficiency and maintain sub-second response latencies, the system implements a multi-tier optimization strategy:

1.  **Semantic Caching (Redis-Based):** Queries are semantically matched against previous requests. If a similar prompt was processed recently (with high cosine similarity, e.g., >= 0.95), the cached response is returned directly, avoiding an LLM call.
2.  **Response & Prompt Cache:** Uses built-in provider caching features (such as Anthropic's Prompt Caching) to reduce pricing for repetitive prefix contexts.
3.  **Automatic Model-Tier Routing:**
    *   *High-Reasoning Tasks (Claude 3.5 Sonnet / GPT-4o):* Used for complex tasks (like deep resume rewrites, code reviews, and mock interviews).
    *   *Low-Cost Tasks (GPT-4o-mini / Gemini Flash):* Used for standard tasks (like notifications, brief summaries, and taxonomy classifications).

---

## SECTION 7: CORE METRIC EVALUATION LOGIC

### 7.1 Interview Simulation & Dynamic Adaptivity
*   **Adaptation Mechanics:** Questions adapt dynamically based on candidate performance. If a candidate struggles with a coding question, the engine adjusts difficulty downwards to evaluate foundational skills; if they excel, it introduces advanced optimization prompts.
*   **Technical Verification:** Answers are evaluated against model solutions, logical structure rules, and key term requirements.

### 7.2 Communication & Voice Delivery Engine
*   **Grammar & Clarity:** Evaluates spelling errors, syntax complexity, and professional tone in transcripts.
*   **Delivery Pace:** Calculates speaking rate (Words Per Minute) from audio timestamps.
*   **Confidence Index:** Tracks pauses and filler words (e.g., "like", "uh", "um") to grade professional confidence.

### 7.3 Placement Readiness Calculations (Non-Static)
The Placement Readiness Engine calculates an overall Job Readiness Percentile by weighting performance across all platform modules:
*   *Formula Weighting:* Resume optimization (25%) + Coding evaluations (25%) + Adaptive mock interviews (30%) + Core skill gap assessments (20%).
*   *Market Adjustments:* Scores are adjusted dynamically based on active market hiring standards parsed by the Career Intelligence Engine.

---

## SECTION 8: AI SAFETY, UNCERTAINTY, & OBSERVABILITY

### 8.1 Fabrications & Hallucination Prevention
1.  **Salary & Trend Guardrails:** The platform is prohibited from generating exact salary projections or hiring trends unless they are backed by verified data from integrated databases (e.g., Bureau of Labor Statistics, active partners).
2.  **Uncertainty Signaling:** When certain trends are predicted using AI model logic rather than concrete facts, the output must display a clear, accessible uncertainty warning ("AI estimate based on industry trends; accuracy variation +/- 15%").

### 8.2 Observability & Performance Logging
Every transaction processed by the AI Gateway is logged inside the database for auditing and cost control:
*   *Tracked Metrics:* Model used, prompt version tag, execution latency (ms), input/output token counts, calculated transaction cost (USD), cache status (hit/miss), and validation failure flags.

---

This AI Architecture & Intelligence System specification serves as the core AI blueprint for CareerOS AI. Once approved, specialized model integrations can proceed.
