import recosEnterale from '../assets/recos-enterale.json';
import recosParenterale from '../assets/recos-parenterale.json';

const ALLOWED_KEYS = ['micronutriment', 'administrationTerms', 'clauses', 'excludedClauses', 'sources'];

interface Reco {
  [key: string]: unknown;
  clauses?: string[];
  excludedClauses?: string[];
}

interface RecosFile {
  sharedRecommendations: Reco[];
  pathologiesRecommendations: {pathology: string, recommendations: Reco[]}[];
}

const recosFiles: Record<string, RecosFile> = {
  'recos-enterale': recosEnterale,
  'recos-parenterale': recosParenterale
};

describe('recos data', () => {
  Object.entries(recosFiles).forEach(([name, file]) => {
    describe(name, () => {
      const allRecos: Reco[] = [
        ...file.sharedRecommendations,
        ...file.pathologiesRecommendations.flatMap(p => p.recommendations)
      ];

      it('should only use known recommendation keys', () => {
        const unknownKeys = allRecos.flatMap(reco => Object.keys(reco).filter(key => !ALLOWED_KEYS.includes(key)));
        expect(unknownKeys).toEqual([]);
      });

      it('should only exclude clauses that exist in the same file', () => {
        const knownClauses = new Set(allRecos.flatMap(reco => reco.clauses ?? []));
        const unknownExclusions = allRecos
          .flatMap(reco => reco.excludedClauses ?? [])
          .filter(clause => !knownClauses.has(clause));
        expect(unknownExclusions).toEqual([]);
      });
    });
  });
});
