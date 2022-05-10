import {Pathology, Warning, WarningLevel, WarningsRead} from "@recos-diet/domain";

export class MemoryWarningsRepository implements WarningsRead {

  constructor(private requirements: PathologyWarnings[]) {
  }

  nutritionistOpinionRequirement(pathology: Pathology): WarningLevel {
    const item = this.requirements.find(item => item.pathology === pathology);
    return parseRequirementLevel(item?.nutritionistOpinionRequirementLevel ?? 'none');
  }

  pathologyWarnings(pathology: Pathology): Warning[] {
    const item = this.requirements.find(item => item.pathology === pathology);
    return item?.warnings ?? [];
  }

}

const requirementLevels = new Map<string, WarningLevel>([
  ['medium', WarningLevel.MEDIUM],
  ['high', WarningLevel.HIGH]
]);

const parseRequirementLevel = function (s: string): WarningLevel {
  return requirementLevels.get(s) ?? WarningLevel.NONE;
};

export type RequirementLevel = 'medium' | 'high';

export interface PathologyWarnings {
  pathology: Pathology;
  nutritionistOpinionRequirementLevel?: RequirementLevel;
  warnings: Warning[];
}
