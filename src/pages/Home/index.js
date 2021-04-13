import React, { useState, useEffect } from 'react';
import { Layout, message } from 'antd';
import FormContent from '../../components/content/content';
import TopHeader from '../../components/header/header';
import ModalBox from '../../components/modal/modal';
import { connect } from 'react-redux';
import { createDo, deleteDo, editDo, completeDo, checkDo } from '../../store/actions';
import './index.less';

const Home = props => {
  const [isEdit, setIsEdit] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [curSchedule, setCurSchedule] = useState({});
  const [schedule, setSchedule] = useState({});

  useEffect(() => {
    setInterval(() => {
      remindDos.forEach((item, i) => {
        let now = new Date(),
          month = now.getMonth() + 1,
          date = now.getDate(),
          nowStr =
            now.getFullYear() +
            '-' +
            (month < 10 ? '0' + month : month) +
            '-' +
            (date < 10 ? '0' + date : date);
        if (+new Date(item.finishDate) < +new Date(nowStr)) {
          props.checkDo(i);
        }
      });
    }, 10000);
  });
  const delay = (time, data) => {
    message.info(data, time);
  };
  const showModal = () => {
    setSchedule({});
    setModalVisible(true);
    setIsEdit(false);
    setCurSchedule({});
  };

  const handleEdit = index => {
    setCurSchedule(remindDos[index]);
    setModalVisible(true);
    setIsEdit(true);
    setSchedule({ index: index });
  };
  const handleOk = () => {
    if (isEdit) {
      props.editDo({ ...curSchedule, ...schedule }, () => {
        setModalVisible(false);
      });
      delay(1.5, 'Schedule has been changed !');
    } else {
      props.createDo({ ...schedule }, () => {
        setModalVisible(false);
      });
      delay(1.5, 'New Schedule has been created successful !');
    }
  };
  const handleCancel = () => {
    setModalVisible(false);
  };
  const handleDone = index => {
    props.completeDo(index, () => {
      delay(0.5, 'Schedule has been completed successful ！');
    });
  };
  const handleDelete = index => {
    props.deleteDo(index, () => {
      delay(0.5, 'Schedule has been deleted successful !');
    });
  };

  const { remindDos } = props;
  const { Footer } = Layout;

  return (
    <div className="home-wrap">
      <Layout>
        <TopHeader></TopHeader>
        <FormContent
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handleDone={handleDone}
          showModal={showModal}
        ></FormContent>
        <Footer>Footer</Footer>
      </Layout>
      <ModalBox
        isEdit={isEdit}
        modalVisible={modalVisible}
        handleOk={handleOk}
        handleCancel={handleCancel}
        curSchedule={curSchedule}
        schedule={schedule}
      ></ModalBox>
    </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(Home);
