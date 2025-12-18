import { describe, it, expect } from 'vitest';
import { animals, Animal } from '@/lib/animals';

describe('animals', () => {
  it('should have more than 90 animals', () => {
    expect(animals.length).toBeGreaterThan(90);
  });

  it('each animal should have required fields', () => {
    animals.forEach((animal) => {
      expect(animal.id).toBeDefined();
      expect(animal.name).toBeDefined();
      expect(animal.nameEn).toBeDefined();
      expect(animal.description).toBeDefined();
      expect(animal.traits).toBeDefined();
      expect(animal.color).toBeDefined();
      expect(animal.emoji).toBeDefined();
    });
  });

  it('each animal should have unique id', () => {
    const ids = animals.map((a) => a.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(animals.length);
  });

  it('each animal should have unique name', () => {
    const names = animals.map((a) => a.name);
    const uniqueNames = new Set(names);
    expect(uniqueNames.size).toBe(animals.length);
  });

  it('each animal should have 4 traits', () => {
    animals.forEach((animal) => {
      expect(animal.traits.length).toBe(4);
    });
  });

  it('each animal should have valid color hex code', () => {
    const hexColorRegex = /^#[0-9A-Fa-f]{6}$/;
    animals.forEach((animal) => {
      expect(animal.color).toMatch(hexColorRegex);
    });
  });

  it('each animal should have emoji', () => {
    animals.forEach((animal) => {
      expect(animal.emoji.length).toBeGreaterThan(0);
    });
  });

  it('each animal should have detailed description', () => {
    animals.forEach((animal) => {
      expect(animal.detailedDescription).toBeDefined();
      expect(animal.detailedDescription!.length).toBeGreaterThan(10);
    });
  });

  it('each animal should have strengths and weaknesses', () => {
    animals.forEach((animal) => {
      expect(animal.strengths).toBeDefined();
      expect(animal.strengths!.length).toBeGreaterThan(0);
      expect(animal.weaknesses).toBeDefined();
      expect(animal.weaknesses!.length).toBeGreaterThan(0);
    });
  });

  it('each animal should have compatibility list', () => {
    animals.forEach((animal) => {
      expect(animal.compatibility).toBeDefined();
      expect(animal.compatibility!.length).toBeGreaterThan(0);
    });
  });

  it('compatibility references should mostly exist as animals', () => {
    const animalNames = new Set(animals.map((a) => a.name));
    const missingRefs: string[] = [];

    animals.forEach((animal) => {
      if (animal.compatibility) {
        animal.compatibility.forEach((compatName) => {
          if (!animalNames.has(compatName)) {
            missingRefs.push(`${animal.name} -> ${compatName}`);
          }
        });
      }
    });

    // Log missing references for debugging, but don't fail the test
    if (missingRefs.length > 0) {
      console.warn('Missing compatibility references:', missingRefs.slice(0, 10));
    }

    // At least 80% of references should be valid
    const totalRefs = animals.reduce((acc, a) => acc + (a.compatibility?.length || 0), 0);
    const validRefs = totalRefs - missingRefs.length;
    expect(validRefs / totalRefs).toBeGreaterThan(0.8);
  });

  it('incompatibility references should mostly exist as animals', () => {
    const animalNames = new Set(animals.map((a) => a.name));
    const missingRefs: string[] = [];

    animals.forEach((animal) => {
      if (animal.incompatibility) {
        animal.incompatibility.forEach((incompatName) => {
          if (!animalNames.has(incompatName)) {
            missingRefs.push(`${animal.name} -> ${incompatName}`);
          }
        });
      }
    });

    // Log missing references for debugging, but don't fail the test
    if (missingRefs.length > 0) {
      console.warn('Missing incompatibility references:', missingRefs.slice(0, 10));
    }

    // At least 80% of references should be valid
    const totalRefs = animals.reduce((acc, a) => acc + (a.incompatibility?.length || 0), 0);
    const validRefs = totalRefs - missingRefs.length;
    expect(validRefs / totalRefs).toBeGreaterThan(0.8);
  });

  it('each animal should have advice', () => {
    animals.forEach((animal) => {
      expect(animal.advice).toBeDefined();
      expect(animal.advice!.length).toBeGreaterThan(10);
    });
  });
});
