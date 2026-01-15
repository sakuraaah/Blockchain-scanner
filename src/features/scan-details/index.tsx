import { type FC } from 'react';
import { useParams } from 'react-router-dom';

import {
  Button,
  Col,
  Descriptions,
  Row,
  Spin,
  Statistic,
  Table,
  Typography,
} from 'antd';

import { useQuery } from '@tanstack/react-query';

import { PHARMACY_PROTOCOL_MAP } from '@/features/scan/components/pharmacy-options/constants';
import { AppCard } from '@/ui/app-card';

import { getQueryConfig } from './api';
import { PACKAGE_COLUMNS, STEP_COLUMNS } from './constants';
import { copyToClipboard } from './helpers';
import { Wrapper } from './styles';

const { Text } = Typography;

export const ScanDetails: FC = () => {
  const { protocolType, palletCode } = useParams();

  const queryConfig = getQueryConfig({
    ProtocolType: Number(protocolType),
    PalletCode: palletCode,
  });

  const { data, isPending, isFetching } = useQuery(queryConfig);

  const packageCount = data?.packages?.length ?? 0;
  const stepCount =
    data?.packages?.reduce((sum, p) => sum + (p.steps?.length ?? 0), 0) ?? 0;

  return (
    <Wrapper>
      <Spin spinning={isPending || isFetching}>
        <AppCard
          title="Protocol Details"
          {...(data && {
            subtitle: `Protocol type: ${PHARMACY_PROTOCOL_MAP[data.protocolType]}`,
          })}
        >
          <div className="flex flex-col gap-[16px]">
            <Descriptions bordered size="small" column={1}>
              <Descriptions.Item label="CMO name">
                {data?.cmoName}
              </Descriptions.Item>
              <Descriptions.Item label="Pallet code">
                <Text code>{data?.palletCode}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="Possible protocol steps">
                {data?.possibleProtocolSteps}
              </Descriptions.Item>
            </Descriptions>

            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Statistic title="Packages" value={packageCount} />
              </Col>
              <Col span={12}>
                <Statistic title="Total steps" value={stepCount} />
              </Col>
            </Row>

            <Table
              rowKey="packageCode"
              columns={PACKAGE_COLUMNS}
              dataSource={data?.packages ?? []}
              pagination={false}
              scroll={{ x: 'max-content' }}
              expandable={{
                expandedRowRender: (pkg) => (
                  <Table
                    rowKey="stepNumber"
                    columns={STEP_COLUMNS}
                    dataSource={pkg.steps ?? []}
                    pagination={false}
                    scroll={{ x: 'max-content' }}
                    size="small"
                  />
                ),
                rowExpandable: (pkg) => (pkg.steps?.length ?? 0) > 0,
              }}
            />

            <Button
              type="primary"
              disabled={!data}
              onClick={() => copyToClipboard(data!)}
            >
              Copy to clipboard
            </Button>
          </div>
        </AppCard>
      </Spin>
    </Wrapper>
  );
};
