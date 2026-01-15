import { type FC, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Table } from 'antd';

import { useQuery } from '@tanstack/react-query';

import { AppCard } from '@/ui/app-card';

import { getQueryConfig } from './api';
import { SCAN_ITEMS_BATCH, SCAN_TABLE_COLUMNS } from './constants';
import { getRowKey, mergeUnique } from './helpers';
import { Wrapper } from './styles';
import type { ScanListItem, ScanListRequestParams } from './types';

export const ScanList: FC = () => {
  const [requestData, setRequestData] = useState<ScanListRequestParams>({
    Top: SCAN_ITEMS_BATCH,
    Skip: 0,
  });
  const [dataSource, setDataSource] = useState<ScanListItem[]>([]);
  const [loadMoreButtonDisabled, setLoadMoreButtonDisabled] =
    useState<boolean>(false);

  const queryConfig = useMemo(() => getQueryConfig(requestData), [requestData]);

  const { data, isPending, isFetching } = useQuery(queryConfig);
  const navigate = useNavigate();

  const loadMore = () => {
    setRequestData((req) => ({
      ...req,
      Skip: req.Skip + SCAN_ITEMS_BATCH,
    }));
  };

  useEffect(() => {
    if (data) {
      setDataSource((ds) => mergeUnique(ds, data));

      if (!data.length || data.length < SCAN_ITEMS_BATCH) {
        setLoadMoreButtonDisabled(true);
      }
    }
  }, [data, setDataSource, setLoadMoreButtonDisabled]);

  return (
    <Wrapper>
      <AppCard
        title="Protocol list"
        subtitle={'list of all submitted pharmacy protocols and steps'}
      >
        <Table<ScanListItem>
          rowKey={(record) => getRowKey(record)}
          columns={SCAN_TABLE_COLUMNS}
          dataSource={dataSource}
          onRow={(record) => ({
            onClick: () => {
              setDataSource([]);
              navigate(`${record.palletCode}/${record.protocolType}`);
            },
            style: { cursor: 'pointer' },
          })}
          pagination={false}
          scroll={{ x: 'max-content' }}
          loading={isPending || isFetching}
        />

        <Button
          className="mt-[16px]"
          size="small"
          disabled={loadMoreButtonDisabled}
          onClick={loadMore}
        >
          Load more
        </Button>
      </AppCard>
    </Wrapper>
  );
};
