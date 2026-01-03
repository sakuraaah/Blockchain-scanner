import type { ReactNode } from 'react';

export type Action = {
  label: string;
  proceed: () => void;
  actionAllowed?: boolean;
  confirm?: boolean;
  confirmText?: string;
};

type Step = {
  content: ReactNode;
  nextStepAllowed?: boolean;
};

export type StepsProps = {
  name: string;
  steps: Step[];
  continueLabel?: string;
  goBackLabel?: string;
  submmitAction?: Action;
  cancelAction?: Action;
};
