import React from 'react';
import { Layout, Card, Menu, Dropdown, Button, Spin, Empty, Progress, Badge } from 'antd';
import { connect } from 'react-redux';
import { PlusSquareFilled, DownOutlined } from '@ant-design/icons';
import {
  createDo,
  deleteDo,
  editDo,
  completeDo,
  checkDo,
} from '../../store/actions/index';
const FormContent = props => {
  const handleEdit = index => {
    props.handleEdit(index);
  };
  const handleDone = index => {
    props.handleDone(index);
  };
  const handleDelete = index => {
    props.handleDelete(index);
  };

  const data = {
    typeText: ['Daily', 'Weekly', 'Monthly', 'Quarterly'],
  };
  const { remindDos, loading, completeDos, failDos } = props;
  const { Content } = Layout;
  const hasComplete = completeDos.length,
    hasFail = failDos.length,
    totalComplete = hasComplete + hasFail,
    efficiency = (totalComplete ? (hasComplete / totalComplete) * 100 : 0).toFixed();
  const menu = i => {
    return (
      <Menu>
        <Menu.Item onClick={handleEdit.bind(this, i)}>Edit</Menu.Item>
        <Menu.Item onClick={handleDone.bind(this, i)}>Done</Menu.Item>
        <Menu.Item onClick={handleDelete.bind(this, i)}>Delete</Menu.Item>
      </Menu>
    );
  };
  return (
    <Content className="content">
      <Spin tip="Loading..." spinning={loading}>
        <div className="task-pane-wrap">
          {remindDos.map((item, i) => (
            <Card
              title={item.title}
              className="todo-card"
              extra={
                <Dropdown overlay={() => menu(i)} placement="bottomCenter" arrow>
                  <Button>
                    <DownOutlined />
                  </Button>
                </Dropdown>
              }
              key={i}
            >
              <div className="todo-desc">
                <p>{item.description}</p>
              </div>
              <div className="todo-status">
                <div>Starting Date: {item.startDate}</div>
                <div>Finishing Date: {item.finishDate}</div>
                <div className="todo-desc">{data.typeText[item.type || 0]}</div>
              </div>
            </Card>
          ))}
          <div className="add-todo-btn" onClick={props.showModal}>
            <PlusSquareFilled />
          </div>
        </div>
        <div className="task-status-list">
          <Card
            title="Implementation Efficiency"
            style={{ width: '100%', marginBottom: '16px' }}
          >
            <Progress percent={efficiency} status="active" />
          </Card>
          <Card title="Completed" style={{ width: '100%', marginBottom: '16px' }}>
            {hasComplete ? (
              completeDos.map((item, i) => (
                <div className="status-list-item" key={i}>
                  <Badge status="success" />
                  {item.title}
                </div>
              ))
            ) : (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                style={{ paddingTop: '20px', paddingBottom: '20px' }}
              />
            )}
          </Card>
          <Card title="Failed" style={{ width: '100%', marginBottom: '16px' }}>
            {hasFail ? (
              failDos.map((item, i) => (
                <div className="status-list-item" key={i}>
                  <Badge status="warning" />
                  {item.title}
                </div>
              ))
            ) : (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                style={{ paddingTop: '20px', paddingBottom: '20px' }}
              />
            )}
          </Card>
        </div>
      </Spin>
    </Content>
  );
};
const mapStateToProps = state => {
  let { remindDos, failDos, completeDos, loading, err, curCapacity } = state;
  return {
    remindDos,
    failDos,
    completeDos,
    loading,
    err,
    curCapacity,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    createDo(data, cb) {
      dispatch(createDo(data, cb));
    },
    deleteDo(data, cb) {
      dispatch(deleteDo(data, cb));
    },
    editDo(data, cb) {
      dispatch(editDo(data, cb));
    },
    completeDo(data, cb) {
      dispatch(completeDo(data, cb));
    },
    checkDo(data, cb) {
      dispatch(checkDo(data, cb));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(FormContent);
