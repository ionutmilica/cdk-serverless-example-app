import type { StackProps } from 'aws-cdk-lib';

export declare enum Env {
  DEV = 'dev',
  QA = 'qa',
  SBX = 'sbx',
  PRD = 'prd',
}

export type Environment = {
  account: string;
  region: string;
};

export type CommonProps = {
  project: string;
  currentRegion: string;
  currentEnv: string;
};

export type CommonStackProps = StackProps & CommonProps;

export function isNonProd(currentEnv: string): boolean {
  return !(currentEnv === Env.SBX || currentEnv === Env.PRD);
}
