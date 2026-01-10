import type { FC } from 'react';

import { Form, Input, InputNumber } from 'antd';

import { type FieldConfig, FieldType } from '../types';
import { FormListField } from './FormListField';
import { Grid } from './Grid';

type FormFieldProps = {
  field: FieldConfig;
  namePrefix?: (string | number)[];
};

export const FormField: FC<FormFieldProps> = ({ field, namePrefix }) => {
  if (field.type === FieldType.Grid) {
    return <Grid config={field} />;
  }

  if (field.type === FieldType.List) {
    return <FormListField field={field} />;
  }

  const name = namePrefix
    ? [
        ...namePrefix,
        ...(Array.isArray(field.name) ? field.name : [field.name]),
      ]
    : field.name;

  if (field.type === FieldType.Input) {
    return (
      <Form.Item
        name={name}
        label={field.label}
        rules={field.rules}
        {...field.itemProps}
      >
        <Input {...field.inputProps} />
      </Form.Item>
    );
  }

  if (field.type === FieldType.InputNumber) {
    return (
      <Form.Item
        name={name}
        label={field.label}
        rules={field.rules}
        {...field.itemProps}
      >
        <InputNumber style={{ width: '100%' }} {...field.numberProps} />
      </Form.Item>
    );
  }

  return <></>;
};
