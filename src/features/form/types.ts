import type { ReactNode } from 'react';

import type {
  FormItemProps,
  FormProps,
  InputNumberProps,
  InputProps,
} from 'antd';

export const FieldType = {
  Input: 'input',
  InputNumber: 'number',
  List: 'list',
  Grid: 'grid',
} as const;

export type FieldType = (typeof FieldType)[keyof typeof FieldType];

export type GridCol = {
  span?: number;
  fields: FieldConfig[];
};

export type GridConfig = {
  type: (typeof FieldType)['Grid'];
  key: string;
  gutter?: number | [number, number];
  cols: GridCol[];
};

export type InputFieldConfig = {
  type: (typeof FieldType)['Input'];
  key: string;
  name: FormItemProps['name'];
  label?: ReactNode;
  rules?: FormItemProps['rules'];
  itemProps?: Omit<FormItemProps, 'name' | 'label' | 'rules' | 'children'>;
  inputProps?: InputProps;
};

export type NumberFieldConfig = {
  type: (typeof FieldType)['InputNumber'];
  key: string;
  name: FormItemProps['name'];
  label?: ReactNode;
  rules?: FormItemProps['rules'];
  itemProps?: Omit<FormItemProps, 'name' | 'label' | 'rules' | 'children'>;
  numberProps?: InputNumberProps;
};

export type ListFieldConfig = {
  type: (typeof FieldType)['List'];
  key: string;
  name: string;
  label?: ReactNode;
  min?: number;
  max?: number;
  addText?: string;
  fields: FieldConfig[];
};

export type FieldConfig =
  | InputFieldConfig
  | NumberFieldConfig
  | ListFieldConfig
  | GridConfig;

export type FormConfig<TValues extends object = Record<string, unknown>> = {
  title?: ReactNode;
  submitText?: string;
  initialValues?: Partial<TValues>;
  fields: FieldConfig[];
};

export type FormBuilderProps<TValues extends object = Record<string, unknown>> =
  {
    config: FormConfig<TValues>;
    onSubmit?: (values: TValues) => void | Promise<void>;
    showActions?: boolean;
    formProps?: Omit<FormProps<TValues>, 'form' | 'onFinish' | 'initialValues'>;
  };
