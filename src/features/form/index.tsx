import { Form as AntdForm, Button } from 'antd';

import { FormField } from './components/FormField';
import { RowActions, Title, Wrapper } from './styles';
import type { FormBuilderProps } from './types';

export const Form = <TValues extends object>({
  config,
  onSubmit,
  showActions = true,
  formProps,
}: FormBuilderProps<TValues>) => {
  const [form] = AntdForm.useForm<TValues>();

  return (
    <Wrapper>
      {config.title ? <Title>{config.title}</Title> : null}

      <AntdForm
        form={form}
        layout="vertical"
        initialValues={config.initialValues as TValues | undefined}
        onFinish={onSubmit}
        {...formProps}
      >
        {config.fields.map((field) => (
          <FormField key={field.key} field={field} />
        ))}

        {showActions ? (
          <RowActions>
            <Button type="primary" htmlType="submit">
              {config.submitText ?? 'Submit'}
            </Button>

            <Button onClick={() => form.resetFields()}>Reset</Button>
          </RowActions>
        ) : null}
      </AntdForm>
    </Wrapper>
  );
};
