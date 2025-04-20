import { Col, Row } from 'antd';
import TagTable from '../components/TagTable';
import TagForm from '../components/TagForm';
import { useRef } from 'react';

export default function Tags() {
  const tableRef = useRef();
  return (
    <Row>
      <Col span={'7'}>
        <TagForm queryKeyFetchListTable={tableRef.current?.queryKey} />
      </Col>
      <Col span={'1'}></Col>
      <Col span={'16'}>
        <TagTable ref={tableRef} />
      </Col>
    </Row>
  );
}
