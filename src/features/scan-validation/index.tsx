import { type FC, useMemo, useState } from 'react';

import { Button, Input } from 'antd';

import { useMutation } from '@tanstack/react-query';

import { AppCard } from '@/ui/app-card';

import { getMutationConfig } from './api';
import { Wrapper } from './styles';

const { TextArea } = Input;

export const ScanValidation: FC = () => {
  const [scanData, setScanData] = useState<string>('');

  const mutationConfig = useMemo(() => getMutationConfig(scanData), [scanData]);

  const { mutate } = useMutation(mutationConfig);

  return (
    <Wrapper>
      <AppCard
        title="Validate scan details"
        subtitle={'paste scan protocol details in the box below'}
      >
        <TextArea
          autoSize={{
            minRows: 6,
          }}
          value={scanData}
          onChange={(e) => setScanData(e.target.value)}
        />
        <Button
          type="primary"
          className="w-full mt-[16px]"
          onClick={() => mutate()}
        >
          Validate
        </Button>
      </AppCard>
    </Wrapper>
  );
};
