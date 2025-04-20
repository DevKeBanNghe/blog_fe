import ImageTable from '../components/ImageTable';
import { Col, Row } from 'antd';
import ImageForm from '../components/ImageForm';
import { useRef } from 'react';

export default function Images() {
  const tableRef = useRef();
  return (
    <Row>
      <Col span={'9'}>
        <ImageForm queryKeyFetchListTable={tableRef.current?.queryKey} />
      </Col>
      <Col span={'1'}></Col>
      <Col span={'14'}>
        <ImageTable ref={tableRef} />
      </Col>
    </Row>
  );
}
