import type { ReactNode } from 'react';

export type Action = {
  label: string;
  proceed: () => void;
  actionAllowed?: boolean;
  confirm?: boolean;
  confirmText?: string;
};

type Step = {
  title?: string;
  content: ReactNode;
  nextStepAllowed?: boolean;
};

export type StepsProps = {
  name: string;
  title: string;
  steps: Step[];
  continueLabel?: string;
  goBackLabel?: string;
  submitAction?: Action;
  cancelAction?: Action;
};
