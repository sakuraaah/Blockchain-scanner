import { type FC, useMemo } from 'react';

import { Button } from 'antd';

import { useLocalStorage } from '@uidotdev/usehooks';

import { AppCard } from '@/ui/app-card';

import { CURRENT_STEP_STORAGE_KEY } from './constants';
import { handleAction } from './helpers';
import { Grid } from './styles';
import type { StepsProps } from './types';

export const Steps: FC<StepsProps> = ({
  name,
  title,
  steps,
  continueLabel = 'Continue',
  goBackLabel = 'Go back',
  submitAction,
  cancelAction,
}) => {
  const [currentStepNumber, setCurrentStepNumber] = useLocalStorage<number>(
    `${CURRENT_STEP_STORAGE_KEY}-${name}`,
    0
  );

  const currentStep = useMemo(
    () => steps[currentStepNumber] ?? null,
    [steps, currentStepNumber]
  );

  const increaseStep = () => setCurrentStepNumber((cur) => cur + 1);
  const decreaseStep = () => setCurrentStepNumber((cur) => cur - 1);

  const resetSteps = () => setCurrentStepNumber(0);

  return (
    <AppCard title={title} subtitle={currentStep?.title}>
      <Grid>
        {currentStep && currentStep.content}

        {currentStepNumber + 1 < steps.length && (
          <Button
            onClick={increaseStep}
            disabled={!currentStep.nextStepAllowed}
          >
            {continueLabel}
          </Button>
        )}

        {currentStepNumber > 0 && (
          <Button type={'dashed'} onClick={decreaseStep}>
            {goBackLabel}
          </Button>
        )}

        {submitAction && currentStepNumber + 1 === steps.length && (
          <Button
            type={'primary'}
            onClick={() => handleAction(resetSteps, submitAction)}
            disabled={!submitAction.actionAllowed}
          >
            {submitAction.label}
          </Button>
        )}

        {cancelAction && (
          <Button
            type={'primary'}
            danger
            onClick={() => handleAction(resetSteps, cancelAction)}
            disabled={!cancelAction.actionAllowed}
          >
            {cancelAction.label}
          </Button>
        )}
      </Grid>
    </AppCard>
  );
};
