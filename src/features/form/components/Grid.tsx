import type { FC } from 'react';

import { Col, Row } from 'antd';

import type { GridConfig } from '../types';
import { FormField } from './FormField';

export const Grid: FC<{ config: GridConfig }> = ({ config }) => {
  console.log(config);
  return (
    <Row gutter={config.gutter ?? 12}>
      {config.cols.map((col, idx) => (
        <Col key={`${config.key}-col-${idx}`} span={col.span ?? 24}>
          {col.fields.map((field) => (
            <FormField key={field.key} field={field} />
          ))}
        </Col>
      ))}
    </Row>
  );
};
