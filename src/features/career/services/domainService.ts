import { DbClient } from '@/shared/lib/db/config';

export interface CMSDomain {
  id: string;
  name: string;
  description: string;
}

export interface CMSDomainRole {
  id: string;
  domainId: string;
  name: string;
  experienceLevel: 'entry' | 'mid' | 'senior';
  requiredPrerequisites: string[];
}

export class DomainService {
  /**
   * Retrieves all registered career domains from database or returns local high-fidelity samples
   */
  public static async fetchAvailableDomains(): Promise<CMSDomain[]> {
    try {
      const records = await DbClient.query<CMSDomain>('cms_career_domains', 'select');
      if (records.length > 0) {
        return records;
      }

      // High-fidelity fallback seeds to prove domain-independent design (Section 10 of PRD)
      return [
        { id: 'dom-1', name: 'Technology', description: 'Software engineering, Cloud architecture, and Machine learning' },
        { id: 'dom-2', name: 'Healthcare', description: 'Clinical research, Nursing, and Healthcare administration' },
        { id: 'dom-3', name: 'Law & Governance', description: 'Corporate litigation, Patent advisory, and Intellectual property' },
        { id: 'dom-4', name: 'Business & Commerce', description: 'Corporate finance, Analytics, and Growth marketing' },
      ];
    } catch (error) {
      console.error('[DomainService] Failed to fetch career domains:', error);
      throw error;
    }
  }

  /**
   * Retrieves specific role options configured under a parent domain
   */
  public static async fetchRolesForDomain(domainId: string): Promise<CMSDomainRole[]> {
    try {
      const records = await DbClient.query<CMSDomainRole>('cms_domain_roles', 'select', null, { domainId });
      if (records.length > 0) {
        return records;
      }

      // Dynamic fallbacks based on input domain identifier
      if (domainId === 'dom-2') {
        return [
          { id: 'role-hc-1', domainId, name: 'Clinical Trial Specialist', experienceLevel: 'mid', requiredPrerequisites: ['GCP Certification', 'FDA Compliance'] },
          { id: 'role-hc-2', domainId, name: 'Registered Nurse', experienceLevel: 'entry', requiredPrerequisites: ['NCLEX-RN license', 'Patient Care'] },
        ];
      }

      if (domainId === 'dom-3') {
        return [
          { id: 'role-law-1', domainId, name: 'Intellectual Property Counsel', experienceLevel: 'senior', requiredPrerequisites: ['Bar Exam', 'Patent Law'] },
          { id: 'role-law-2', domainId, name: 'Corporate Compliance Auditor', experienceLevel: 'mid', requiredPrerequisites: ['Internal Auditing', 'SEC filings'] },
        ];
      }

      // Default Technology paths fallback
      return [
        { id: 'role-tech-1', domainId, name: 'Senior Frontend Engineer', experienceLevel: 'senior', requiredPrerequisites: ['React / Next.js', 'TypeScript'] },
        { id: 'role-tech-2', domainId, name: 'Backend Architect', experienceLevel: 'mid', requiredPrerequisites: ['Node.js', 'PostgreSQL'] },
      ];
    } catch (error) {
      console.error(`[DomainService] Failed to fetch roles for domain ${domainId}:`, error);
      throw error;
    }
  }

  /**
   * Dynamically swaps learning resource targets depending on the selected active domain category
   */
  public static generateDomainSpecificResources(domainName: string): { title: string; url: string; reason: string }[] {
    const normalized = domainName.toLowerCase();

    if (normalized.includes('healthcare')) {
      return [
        { title: 'PubMed Central Compliance Guides', url: 'https://ncbi.nlm.nih.gov/pmc', reason: 'Review verified FDA clinical trial and GCP parameters.' },
        { title: 'World Health Organization (WHO) Guidelines', url: 'https://who.int', reason: 'Adopt international healthcare and patient safety guidelines.' },
      ];
    }

    if (normalized.includes('law')) {
      return [
        { title: 'Legal Information Institute Patent database', url: 'https://law.cornell.edu', reason: 'Examine corporate IP and landmark patent litigation files.' },
        { title: 'SEC EDGAR Filings guide', url: 'https://sec.gov/edgar', reason: 'Master financial compliance and corporate filing audit standards.' },
      ];
    }

    if (normalized.includes('business')) {
      return [
        { title: 'IASB International Accounting Rules', url: 'https://ifrs.org', reason: 'Align with global GAAP and corporate auditing criteria.' },
        { title: 'HubSpot Inbound Marketing Guide', url: 'https://academy.hubspot.com', reason: 'Adopt industry-grade funnel optimization and CRM tactics.' },
      ];
    }

    // Technology Foundations
    return [
      { title: 'React Official Documentation', url: 'https://react.dev/learn', reason: 'Master render loops, state bounds, and lifecycle controls.' },
      { title: 'Next.js App Router guides', url: 'https://nextjs.org/docs', reason: 'Adopt industry-standard routing, server actions, and caching.' },
    ];
  }
}
