import { PureComponent } from 'react';
import { connect } from 'dva';
import { Link } from 'umi';
import { Table, Pagination, Popconfirm, Button } from 'antd';
import { Page } from '@components';
import styles from './index.css';
import UserModal from './components/Modal';


class User extends PureComponent {
  render(){
    const columns = [
      {
        title: 'Trainer',
        dataIndex: 'name',
        render: text => <a>{text}</a>,
      },
      {
        title:'Date of class',
        dataIndex: 'date',
      },
      {
        title: 'Time ',
        dataIndex: 'time',
      },
    ];
    const data = [
      {
        key: '1',
        name: 'John Brown',
        date: 'Monday',
        time: '4pm',
      },
      {
        key: '2',
        name: 'Jim Green',
        date: 'Tuesday',
        time: '1pm',
      },
      {
        key: '3',
        name: 'Joe Black',
        date: 'Friday',
        time: '2pm',
      },
      {
        key: '4',
        name: 'JJ',
        date: 'Saturday',
        time: '2pm',
      },
      {
        key: '5',
        name: 'JIM',
        date: 'Sunday',
        time: '2pm',
      },
    ];
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'JJ', // Column configuration not to be checked
        name: record.name,
      }),
    };
  return (
    <Page loading={false}>
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} />,
    </Page>
  );
}

}

export default User;