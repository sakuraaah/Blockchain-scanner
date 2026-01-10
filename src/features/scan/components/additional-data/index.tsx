import { type FC, useMemo } from 'react';

import { useLocalStorage } from '@uidotdev/usehooks';

import { Form } from '@/features/form';
import { type FieldConfig, FieldType } from '@/features/form/types';

import { ADDITIONAL_DATA_STORAGE_KEY } from './constants';
import type { AdditionalDataProps } from './types';

export const AdditionalData: FC<AdditionalDataProps> = ({ fields }) => {
  const [additionalData, setAdditionalData] = useLocalStorage<
    Record<string, unknown>
  >(ADDITIONAL_DATA_STORAGE_KEY, {});

  const wrappedFields: FieldConfig[] = useMemo(
    () => [
      {
        type: FieldType.Grid,
        key: 'grid',
        gutter: [16, 16],
        cols: fields.map((f) => ({
          span: 24,
          fields: [f],
        })),
      },
    ],
    [fields]
  );

  console.log(wrappedFields);

  return (
    <Form
      config={{
        initialValues: additionalData,
        fields: wrappedFields,
      }}
      showActions={false}
      formProps={{
        onValuesChange: (_changed, allValues) => {
          setAdditionalData(allValues);
        },
      }}
    />
  );
};
