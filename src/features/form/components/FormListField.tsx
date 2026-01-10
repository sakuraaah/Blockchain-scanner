import type { FC } from 'react';

import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form } from 'antd';

import { ListRow, ListRowTop, ListRows } from '../styles';
import type { ListFieldConfig } from '../types';
import { FormField } from './FormField';

export const FormListField: FC<{ field: ListFieldConfig }> = ({ field }) => {
  return (
    <Form.List name={field.name}>
      {(listFields, { add, remove }) => (
        <div>
          <ListRows>
            {listFields.map((lf) => (
              <ListRow key={lf.key}>
                <ListRowTop>
                  <div>{field.label}</div>
                  <Button
                    danger
                    size="small"
                    icon={<MinusOutlined />}
                    onClick={() => remove(lf.name)}
                  />
                </ListRowTop>

                {field.fields.map((child) => (
                  <FormField
                    key={`${field.key}-${lf.key}-${child.key}`}
                    field={child}
                    namePrefix={[lf.name]}
                  />
                ))}
              </ListRow>
            ))}
          </ListRows>

          <Button
            style={{ marginTop: 10 }}
            icon={<PlusOutlined />}
            onClick={() => add()}
            disabled={
              typeof field.max === 'number'
                ? listFields.length >= field.max
                : false
            }
          >
            {field.addText ?? 'Add'}
          </Button>
        </div>
      )}
    </Form.List>
  );
};
