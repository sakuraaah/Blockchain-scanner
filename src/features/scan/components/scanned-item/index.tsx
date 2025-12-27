import { Button } from 'antd';

import { Box, Pre, TopRow, ValueText } from './styles';
import type { ScannedItemProps } from './types';

const isPlainObject = (v: unknown): v is Record<string, unknown> => {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
};

export const ScannedItem = <T extends unknown>({
  value,
  onClear,
}: ScannedItemProps<T>) => {
  const isString = typeof value === 'string';
  const isJsonish = !isString && (Array.isArray(value) || isPlainObject(value));

  return (
    <Box>
      <TopRow>
        <ValueText>{isString ? value : 'scanned data'}</ValueText>

        <Button danger size="small" onClick={onClear}>
          Clear
        </Button>
      </TopRow>

      {isJsonish ? <Pre>{JSON.stringify(value, null, 2)}</Pre> : null}

      {!isString && !isJsonish ? <Pre>{String(value)}</Pre> : null}
    </Box>
  );
};
