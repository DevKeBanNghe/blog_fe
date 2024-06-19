import { useMemo, useRef, useState } from 'react';
import { Col, Row, Table } from 'antd';
import SearchBar from 'layouts/Header/SearchBar';
import Actions from './Actions';
import GlobalActions from './GlobalActions';

const CTTable = ({
  fixed = 'bottom',
  itemPerPage = 6,
  totalItems = 1,
  currentPage = 1,
  columns = [],
  rows = [],
  rowKey,
  actions = [{ type: 'delete' }, { type: 'copy' }, { type: 'edit' }, { type: 'view' }],
  handleSelected = () => {},
  onGlobalDelete = () => {},
  isSearch = true,
  globalActions = [],
  ...props
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const table_columns = useMemo(() => {
    if (columns.length === 0 || actions.length === 0) return columns;

    const column_action = {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      align: 'center',
      width: 30,
      render: (record) => {
        return (
          <Actions
            actions={actions}
            dataRecord={{ ...record, row_id: record[rowKey] }}
            onGlobalDelete={onGlobalDelete}
          />
        );
      },
    };

    return [...columns, column_action];
  }, [actions, columns]);

  const selectedRowsRef = useRef(new Map());
  const handleSelectedRows = (selectedRowKeys, rowsSelected) => {
    selectedRowKeys = [...selectedRowsRef.current.values()];
    setSelectedRowKeys(selectedRowKeys);
    handleSelected(selectedRowKeys, rowsSelected);
  };

  const handleClearAllChecked = () => {
    selectedRowsRef.current.clear();
    setSelectedRowKeys([]);
  };

  const table_rows = useMemo(() => rows.map((row) => ({ ...row, key: row[rowKey] })), [rowKey, rows]);

  const checkedGlobalButton = useMemo(() => {
    if (selectedRowKeys.length === 0) return [];
    return [
      {
        style: { background: '#fbdf00' },
        content: 'Clear all checked',
        onClick: handleClearAllChecked,
      },
      {
        danger: true,
        content: `Delete ${selectedRowKeys.length} items`,
        onClick: () => {
          onGlobalDelete(selectedRowKeys);
          handleClearAllChecked();
        },
      },
    ];
  }, [selectedRowKeys]);

  return (
    <>
      <Row style={{ marginBottom: '10px' }}>
        <Col span={16}>
          <GlobalActions actions={[...checkedGlobalButton, ...globalActions]} />
        </Col>
        <Col span={8}>{isSearch && <SearchBar />}</Col>
      </Row>

      <Table
        columns={table_columns}
        dataSource={table_rows}
        scroll={{
          x: 1000,
        }}
        pagination={{
          showSizeChanger: false,
          pageSize: itemPerPage,
          total: totalItems,
          current: currentPage,
        }}
        summary={() => <Table.Summary fixed={fixed}></Table.Summary>}
        rowSelection={{
          selectedRowKeys,
          onChange: (selectedRowKeys, rowsSelected) => {
            if (selectedRowKeys.length === 0) {
              for (const row of rows) {
                selectedRowsRef.current.delete(row[rowKey]);
              }
            }
            if (selectedRowKeys.length === rows.length) {
              for (const rowKey of selectedRowKeys) {
                selectedRowsRef.current.set(rowKey, rowKey);
              }
            }
            handleSelectedRows(selectedRowKeys, rowsSelected);
          },
          onSelect: (record, selected) => {
            selected
              ? selectedRowsRef.current.set(record[rowKey], record[rowKey])
              : selectedRowsRef.current.delete(record[rowKey]);
          },
          columnWidth: '3%',
        }}
        {...props}
      />
    </>
  );
};
export default CTTable;
