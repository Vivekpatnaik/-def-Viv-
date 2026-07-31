import { describe, it, expect } from 'vitest';
import { DomainService } from '../services/domainService';

describe('CMS Configurable Career Domain Engine', () => {
  it('should dynamically load configured multi-domains including Healthcare and Law', async () => {
    const domains = await DomainService.fetchAvailableDomains();

    expect(domains).toBeDefined();
    expect(domains).toBeInstanceOf(Array);
    expect(domains.length).toBeGreaterThan(0);

    const domainNames = domains.map((d) => d.name);
    expect(domainNames).toContain('Healthcare');
    expect(domainNames).toContain('Law & Governance');
  });

  it('should fetch domain-specific role configurations with relevant prerequisites', async () => {
    // Fetching roles for Law & Governance domain ID
    const lawRoles = await DomainService.fetchRolesForDomain('dom-3');

    expect(lawRoles).toBeDefined();
    expect(lawRoles.length).toBeGreaterThan(0);
    expect(lawRoles[0].name).toBe('Intellectual Property Counsel');
    expect(lawRoles[0].requiredPrerequisites).toContain('Bar Exam');
  });

  it('should dynamically swap resource targets based on domain selection', () => {
    const healthcareResources = DomainService.generateDomainSpecificResources('Healthcare');
    const lawResources = DomainService.generateDomainSpecificResources('Law & Governance');
    const techResources = DomainService.generateDomainSpecificResources('Technology');

    expect(healthcareResources[0].url).toContain('ncbi.nlm.nih.gov');
    expect(lawResources[0].url).toContain('cornell.edu');
    expect(techResources[0].url).toContain('react.dev');
  });
});
