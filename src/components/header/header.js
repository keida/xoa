import React from 'react';
import { Layout } from 'antd';
import { connect } from 'react-redux';
import { FieldTimeOutlined } from '@ant-design/icons';
import {
  createDo,
  deleteDo,
  editDo,
  completeDo,
  checkDo,
} from '../../store/actions/index';

const TopHeader = props => {
  const { curCapacity } = props;
  const { Header } = Layout;
  return (
    <Header className="header">
      <div className="log">
        <FieldTimeOutlined spin style={{ fontSize: '30px', marginRight: '12px' }} />
        XOA
      </div>
      <div className="hd-right-box">
        <div className="volume-box">
          Used Capacity<span> {curCapacity + ' b'}</span>，Total Capacity
          <span> 5MB</span>
        </div>
      </div>
    </Header>
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
export default connect(mapStateToProps, mapDispatchToProps)(TopHeader);
