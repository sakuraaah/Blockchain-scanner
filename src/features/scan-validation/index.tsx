import { type FC, useEffect, useMemo, useState } from 'react';

import { Alert, Button, Col, Input, Row, Space, message } from 'antd';

import { useMutation } from '@tanstack/react-query';

import { AppCard } from '@/ui/app-card';

import { getMutationConfig } from './api';
import { Wrapper } from './styles';
import type { InvalidPackage, InvalidPackageListProps } from './types';

const { TextArea } = Input;

const InvalidPackageList: FC<InvalidPackageListProps> = ({
  invalidPackages,
}) => (
  <Space vertical size={16} className="w-full">
    <Row>
      <Col span={24}>
        <Alert type="error" title="Invalid packages found" showIcon />
      </Col>
    </Row>

    {invalidPackages.map((pkg) => (
      <Row key={pkg.packageCode} gutter={[16, 8]}>
        <Col span={16}>
          <strong>package</strong>
          <div>{pkg.packageCode}</div>
        </Col>

        <Col span={8}>
          <strong>steps</strong>
          <div>[{pkg.stepNumber.join(', ')}]</div>
        </Col>
      </Row>
    ))}
  </Space>
);

export const ScanValidation: FC = () => {
  const [scanData, setScanData] = useState<string>('');
  const [invalidPackages, setInvalidPackages] = useState<InvalidPackage[]>([]);

  const mutationConfig = useMemo(() => getMutationConfig(scanData), [scanData]);

  const { data, isPending, mutate } = useMutation(mutationConfig);

  const clearErrors = () => {
    setInvalidPackages([]);
  };

  useEffect(() => {
    if (data) {
      if (data.isValid) {
        message.success('Data is valid');
        setInvalidPackages([]);

        return;
      } else {
        message.error('Submitted data is invalid. See details below');
        setInvalidPackages(data.invalidPackages);
      }
    }
  }, [data]);

  return (
    <Wrapper>
      <AppCard
        title="Validate scan details"
        subtitle={'paste scan protocol details in the box below'}
      >
        <Space vertical size={16} className="w-full">
          {invalidPackages.length > 0 && (
            <>
              <InvalidPackageList invalidPackages={invalidPackages} />

              <Button
                danger
                className="w-full"
                onClick={clearErrors}
                loading={isPending}
              >
                Clear errors
              </Button>
            </>
          )}

          <TextArea
            autoSize={{
              minRows: 6,
            }}
            value={scanData}
            onChange={(e) => setScanData(e.target.value)}
          />

          <Button
            type="primary"
            className="w-full"
            onClick={() => mutate()}
            loading={isPending}
          >
            Validate
          </Button>
        </Space>
      </AppCard>
    </Wrapper>
  );
};
