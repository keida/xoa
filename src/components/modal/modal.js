import React from 'react';
import { Modal, Input, Select, Spin } from 'antd';
import { connect } from 'react-redux';
import {
  createDo,
  deleteDo,
  editDo,
  completeDo,
  checkDo,
} from '../../store/actions/index';
const { Option } = Select;
const { TextArea } = Input;

const ModalBox = props => {
  const handleChange = (type, v) => {
    props.schedule[type] = v;
  };
  const handleChange1 = (type, e) => {
    props.schedule[type] = e.target.value;
  };
  const { loading } = props;
  return (
    <Modal
      title={props.isEdit ? 'Edit Schedule' : 'Add New Schedule'}
      visible={props.modalVisible}
      onOk={props.handleOk}
      onCancel={props.handleCancel}
      destroyOnClose
    >
      <Spin tip="Loading..." spinning={loading}>
        <div className="todo-form">
          <div className="form-control">
            <span className="label">Title:</span>
            <Input
              rules={[{ required: true, message: 'Please input your name' }]}
              placeholder="Please Type Your Title"
              className="todo-ipt"
              defaultValue={props.curSchedule.title}
              onChange={handleChange1.bind(this, 'title')}
            />
          </div>
          <div className="form-control">
            <span className="label">Starting Date:</span>
            <Input
              placeholder="Please Type Your Date"
              type="date"
              className="todo-ipt"
              defaultValue={props.curSchedule.startDate}
              onChange={handleChange1.bind(this, 'startDate')}
            />
          </div>
          <div className="form-control">
            <span className="label">Finishing Date:</span>
            <Input
              placeholder="Please Type Your Date"
              type="date"
              className="todo-ipt"
              defaultValue={props.curSchedule.finishDate}
              onChange={handleChange1.bind(this, 'finishDate')}
            />
          </div>
          <div className="form-control">
            <span className="label">Schedule Type:</span>
            <Select
              placeholder="Please Type Schedule Type"
              type="date"
              className="todo-select"
              defaultValue={props.curSchedule.type}
              onChange={handleChange.bind(this, 'type')}
            >
              <Option value="0">Daily</Option>
              <Option value="1">Weekly</Option>
              <Option value="2">Monthly</Option>
              <Option value="3">Quarterly</Option>
            </Select>
          </div>
          <div className="form-control">
            <span className="label">Description:</span>
            <TextArea
              maxLength="200"
              placeholder="Please Type Your Description"
              className="todo-ipt"
              defaultValue={props.curSchedule.description}
              onChange={handleChange1.bind(this, 'description')}
            />
          </div>
        </div>
      </Spin>
    </Modal>
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
export default connect(mapStateToProps, mapDispatchToProps)(ModalBox);
