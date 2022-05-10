export enum WarningLevel {
  NONE,
  MEDIUM,
  HIGH
}

export interface Warning {
  text: string;
  level: WarningLevel;
  sources: string[];
}
