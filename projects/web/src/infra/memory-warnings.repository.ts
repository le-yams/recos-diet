/*
 * Copyright (c) 2022. Yann D'Isanto
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {Pathology, Warning, WarningLevel, WarningsRead} from '@recos-diet/domain';

export class MemoryWarningsRepository implements WarningsRead {

  constructor(private requirements: ProductOrPathologiesWarnings[]) {
  }

  nutritionistOpinionRequirement(pathology: Pathology): WarningLevel {
    const item = this.requirements.find(item => item.pathology === pathology);
    return parseRequirementLevel(item?.nutritionistOpinionRequirementLevel ?? 'none');
  }

  pathologyWarnings(pathology: Pathology): Warning[] {
    const item = this.requirements.find(item => item.pathology === pathology);
    return this.getWarningsFromDTO(item);
  }

  productWarnings(product:string): Warning[] {
    const item = this.requirements.find(item => item.product === product);
    return this.getWarningsFromDTO(item);
  }

  getWarningsFromDTO(dto?: ProductOrPathologiesWarnings): Warning[]{
    if (!dto) {
      return []
    }
    return dto.warnings.map(w => {
      return {
        text: w.text,
        level: parseRequirementLevel(w.level),
        sources: w.sources
      } as Warning
    });
  }

}

const requirementLevels = new Map<string, WarningLevel>([
  ['medium', WarningLevel.MEDIUM],
  ['high', WarningLevel.HIGH]
]);

const parseRequirementLevel = function (s?: string): WarningLevel {
  if (!s) {
    return WarningLevel.NONE;
  }
  return requirementLevels.get(s) ?? WarningLevel.NONE;
};

export type RequirementLevel = 'medium' | 'high';

export interface ProductOrPathologiesWarnings {
  pathology?: Pathology;
  product?: string;
  nutritionistOpinionRequirementLevel?: RequirementLevel;
  warnings: WarningDTO[];
}

export interface WarningDTO {
  text: string;
  level?: string;
  sources: string[];
}
