import { sites } from '../../lib/sites';

describe('sites data', () => {
  it('exports exactly 8 sites', () => {
    expect(sites).toHaveLength(8);
  });

  it('every site has name, desc, badge, and url', () => {
    for (const site of sites) {
      expect(typeof site.name).toBe('string');
      expect(typeof site.desc).toBe('string');
      expect(typeof site.badge).toBe('string');
      expect(typeof site.url).toBe('string');
    }
  });

  it('every url uses https', () => {
    for (const site of sites) {
      expect(site.url).toMatch(/^https:\/\//);
    }
  });

  it('every name is unique', () => {
    const names = sites.map(s => s.name);
    expect(new Set(names).size).toBe(names.length);
  });

  it('no field is empty', () => {
    for (const site of sites) {
      expect(site.name.trim()).not.toBe('');
      expect(site.desc.trim()).not.toBe('');
      expect(site.badge.trim()).not.toBe('');
      expect(site.url.trim()).not.toBe('');
    }
  });
});
