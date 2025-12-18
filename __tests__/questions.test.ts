import { describe, it, expect } from 'vitest';
import { questions, calculateAnimalScore } from '@/lib/questions';

describe('questions', () => {
  it('should have 11 questions', () => {
    expect(questions.length).toBe(11);
  });

  it('each question should have 6 options', () => {
    questions.forEach((q) => {
      expect(q.options.length).toBe(6);
    });
  });

  it('each option should have traits array', () => {
    questions.forEach((q) => {
      q.options.forEach((opt) => {
        expect(Array.isArray(opt.traits)).toBe(true);
        expect(opt.traits.length).toBeGreaterThan(0);
      });
    });
  });

  it('each question should have unique id', () => {
    const ids = questions.map((q) => q.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(questions.length);
  });
});

describe('calculateAnimalScore', () => {
  it('should return scores for all animals', () => {
    const traits = ['calm', 'independent', 'peaceful'];
    const scores = calculateAnimalScore(traits);

    expect(Object.keys(scores).length).toBeGreaterThan(90);
  });

  it('should give higher score to animals with matching traits', () => {
    const traits = ['calm', 'independent', 'peaceful', 'calm', 'peaceful'];
    const scores = calculateAnimalScore(traits, 12345);

    // cat has traits: ['independent', 'calm', 'curious', 'free']
    // panda has traits: ['calm', 'easygoing', 'peaceful', 'gentle']
    // Both should have high scores with these traits
    expect(scores['cat']).toBeGreaterThan(0);
    expect(scores['panda']).toBeGreaterThan(0);
  });

  it('should return consistent results with same seed', () => {
    const traits = ['social', 'cheerful', 'energetic'];
    const seed = 42;

    const scores1 = calculateAnimalScore(traits, seed);
    const scores2 = calculateAnimalScore(traits, seed);

    expect(scores1).toEqual(scores2);
  });

  it('should return different results with different seeds', () => {
    const traits = ['social', 'cheerful', 'energetic'];

    const scores1 = calculateAnimalScore(traits, 1);
    const scores2 = calculateAnimalScore(traits, 2);

    // The base scores should be the same, but random bonus differs
    // So at least some scores should be different
    const allSame = Object.keys(scores1).every(
      (key) => scores1[key] === scores2[key]
    );
    expect(allSame).toBe(false);
  });

  it('should handle empty traits array', () => {
    const scores = calculateAnimalScore([]);

    Object.values(scores).forEach((score) => {
      // With no traits, only random bonus should apply
      expect(score).toBeGreaterThanOrEqual(0);
      expect(score).toBeLessThan(10);
    });
  });

  it('should give perfect match bonus when all 4 traits match', () => {
    // cat has traits: ['independent', 'calm', 'curious', 'free']
    const catTraits = ['independent', 'calm', 'curious', 'free'];
    const scores = calculateAnimalScore(catTraits, 12345);

    // Cat should have a high score due to perfect match
    expect(scores['cat']).toBeGreaterThan(100);
  });
});
