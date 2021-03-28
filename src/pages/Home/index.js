// import React, { Component } from 'react';
// import {
//   Layout,
//   Card,
//   Menu,
//   message,
//   Dropdown,
//   Button,
//   Modal,
//   Input,
//   Select,
//   Spin,
//   Empty,
//   Progress,
//   Badge,
//   Form,
// } from 'antd';
// import { connect } from 'react-redux';
// import { createDo, deleteDo, editDo, completeDo } from '../../store/actions';
// import { FieldTimeOutlined, PlusSquareFilled, DownOutlined } from '@ant-design/icons';
// import './index.less';

// const { Option } = Select;
// const { TextArea } = Input;

// class Home extends React.Component {
//   state = {
//     isEdit: false,
//     modalVisible: false,
//     modalTitle: 'Add Schedule',
//     curSchedule: {},
//   };
//   data = {
//     Schedule: {},
//     typeText: ['Daily', 'Weekly', 'Monthly', 'Quarterly'],
//   };
//   delay(time, data) {
//     message.info(data, time);
//   }
//   showModal = () => {
//     this.data.Schedule = {};
//     this.setState({ modalVisible: true, isEdit: false, curSchedule: {} });
//   };

//   handleEdit = index => {
//     this.setState({
//       curSchedule: this.props.remindDos[index],
//       modalVisible: true,
//       isEdit: true,
//     });
//     this.data.Schedule.index = index;
//   };
//   handleOk = () => {
//     if (this.state.isEdit) {
//       this.props.editDo({ ...this.state.curSchedule, ...this.data.Schedule }, () => {
//         this.setState({
//           modalVisible: false,
//         });
//       });
//       this.delay(1.5, 'Schedule has been changed !');
//     } else {
//       this.props.createDo({ ...this.data.Schedule }, () => {
//         this.setState({ modalVisible: false });
//       });
//       this.delay(1.5, 'New Schedule has been created successful !');
//     }
//     // console.log(this.state.curSchedule);
//     // console.log(this.data.Schedule);
//   };
//   handleCancel = () => {
//     this.setState({ modalVisible: false });
//   };
//   handleDone = index => {
//     this.props.completeDo(index, () => {
//       this.delay(0.5, 'Schedule has been completed successful ！');
//     });
//   };
//   handleDelete = index => {
//     this.props.deleteDo(index, () => {
//       this.delay(0.5, 'Schedule has been deleted successful !');
//     });
//   };
//   handleChange(type, v) {
//     this.data.Schedule[type] = v;
//   }
//   handleChange1 = (type, e) => {
//     this.data.Schedule[type] = e.target.value;
//   };

//   render () {
//     const { remindDos, loading, completeDos, failDos, curCapacity } = this.props;
//     const { Header, Footer, Content } = Layout;
//     const menu = i => {
//       return (
//         <Menu>
//           <Menu.Item onClick={this.handleEdit.bind(this, i)}>Edit</Menu.Item>
//           <Menu.Item onClick={this.handleDone.bind(this, i)}>Done</Menu.Item>
//           <Menu.Item onClick={this.handleDelete.bind(this, i)}>Delete</Menu.Item>
//         </Menu>
//       );
//     };
//     const hasComplete = completeDos.length,
//       hasFail = failDos.length,
//       totalComplete = hasComplete + hasFail,
//       efficiency = totalComplete ? (hasComplete / totalComplete) * 100 : 0;
//     return (
//       <div className="home-wrap">
//         <Layout>
//           <Header className="header">
//             <div className="log">
//               <FieldTimeOutlined spin style={{ fontSize: '30px', marginRight: '12px' }} />
//               XOA
//             </div>
//             <div className="hd-right-box">
//               <div className="volume-box">
//                 Used Capacity<span> {curCapacity + ' b'}</span>，Total Capacity
//                 <span> 5MB</span>
//               </div>
//             </div>
//           </Header>
//           <Content className="content">
//             <Spin tip="Loading..." spinning={loading}>
//               <div className="task-pane-wrap">
//                 {remindDos.map((item, i) => (
//                   <Card
//                     title={item.title}
//                     className="todo-card"
//                     extra={
//                       <Dropdown overlay={() => menu(i)} placement="bottomCenter" arrow>
//                         <Button>
//                           <DownOutlined />
//                         </Button>
//                       </Dropdown>
//                     }
//                     key={i}
//                   >
//                     <div className="todo-desc">
//                       <p>{item.description}</p>
//                     </div>
//                     <div className="todo-status">
//                       <div>Starting Date: {item.startDate}</div>
//                       <div>Finishing Date: {item.finishDate}</div>
//                       <div className="todo-desc">
//                         {this.data.typeText[item.type || 0]}
//                       </div>
//                     </div>
//                   </Card>
//                 ))}
//                 <div className="add-todo-btn" onClick={this.showModal}>
//                   <PlusSquareFilled />
//                 </div>
//               </div>
//               <div className="task-status-list">
//                 <Card
//                   title="Implementation Efficiency"
//                   style={{ width: '100%', marginBottom: '16px' }}
//                 >
//                   <Progress percent={efficiency} status="active" />
//                 </Card>
//                 <Card title="Completed" style={{ width: '100%', marginBottom: '16px' }}>
//                   {hasComplete ? (
//                     completeDos.map((item, i) => (
//                       <div className="status-list-item" key={i}>
//                         <Badge status="success" />
//                         {item.title}
//                       </div>
//                     ))
//                   ) : (
//                     <Empty
//                       image={Empty.PRESENTED_IMAGE_SIMPLE}
//                       style={{ paddingTop: '20px', paddingBottom: '20px' }}
//                     />
//                   )}
//                 </Card>
//                 <Card title="Failed" style={{ width: '100%', marginBottom: '16px' }}>
//                   {hasFail ? (
//                     failDos.map((item, i) => (
//                       <div className="status-list-item" key={i}>
//                         <Badge status="warning" />
//                         {item.title}
//                       </div>
//                     ))
//                   ) : (
//                     <Empty
//                       image={Empty.PRESENTED_IMAGE_SIMPLE}
//                       style={{ paddingTop: '20px', paddingBottom: '20px' }}
//                     />
//                   )}
//                 </Card>
//               </div>
//             </Spin>
//           </Content>
//           <Footer>Footer</Footer>
//         </Layout>
//         <Modal
//           title={this.state.isEdit ? 'Edit Schedule' : 'Add New Schedule'}
//           visible={this.state.modalVisible}
//           onOk={this.handleOk}
//           onCancel={this.handleCancel}
//           destroyOnClose
//         >
//           <Spin tip="Loading..." spinning={loading}>
//             <div className="todo-form">
//               <div className="form-control">
//                 <span className="label">Title:</span>
//                 <Input
//                   rules={[{ required: true, message: 'Please input your name' }]}
//                   placeholder="Please Type Your Title"
//                   className="todo-ipt"
//                   defaultValue={this.state.curSchedule.title}
//                   onChange={this.handleChange1.bind(this, 'title')}
//                 />
//               </div>
//               <div className="form-control">
//                 <span className="label">Starting Date:</span>
//                 <Input
//                   placeholder="Please Type Your Date"
//                   type="date"
//                   className="todo-ipt"
//                   defaultValue={this.state.curSchedule.startDate}
//                   onChange={this.handleChange1.bind(this, 'startDate')}
//                 />
//               </div>
//               <div className="form-control">
//                 <span className="label">Finishing Date:</span>
//                 <Input
//                   placeholder="Please Type Your Date"
//                   type="date"
//                   className="todo-ipt"
//                   defaultValue={this.state.curSchedule.finishDate}
//                   onChange={this.handleChange1.bind(this, 'finishDate')}
//                 />
//               </div>
//               <div className="form-control">
//                 <span className="label">Schedule Type:</span>
//                 <Select
//                   placeholder="Please Type Schedule Type"
//                   type="date"
//                   className="todo-select"
//                   defaultValue={this.state.curSchedule.type}
//                   onChange={this.handleChange.bind(this, 'type')}
//                 >
//                   <Option value="0">Daily</Option>
//                   <Option value="1">Weekly</Option>
//                   <Option value="2">Monthly</Option>
//                   <Option value="3">Quarterly</Option>
//                 </Select>
//               </div>
//               <div className="form-control">
//                 <span className="label">Description:</span>
//                 <TextArea
//                   maxLength="200"
//                   placeholder="Please Type Your Description"
//                   className="todo-ipt"
//                   defaultValue={this.state.curSchedule.description}
//                   onChange={this.handleChange1.bind(this, 'description')}
//                 />
//               </div>
//             </div>
//           </Spin>
//         </Modal>
//       </div>
//     );
//   }
// }
// const mapStateToProps = state => {
//   let { remindDos, failDos, completeDos, loading, err, curCapacity } = state;
//   return {
//     remindDos,
//     failDos,
//     completeDos,
//     loading,
//     err,
//     curCapacity,
//   };
// };
// const mapDispatchToProps = dispatch => {
//   return {
//     createDo(data, cb) {
//       dispatch(createDo(data, cb));
//     },
//     deleteDo(data, cb) {
//       dispatch(deleteDo(data, cb));
//     },
//     editDo(data, cb) {
//       dispatch(editDo(data, cb));
//     },
//     completeDo(data, cb) {
//       dispatch(completeDo(data, cb));
//     },
//   };
// };
// export default connect(mapStateToProps, mapDispatchToProps)(Home);
import React, { useState, useEffect } from 'react';
import {
  Layout,
  Card,
  Menu,
  message,
  Dropdown,
  Button,
  Modal,
  Input,
  Select,
  Spin,
  Empty,
  Progress,
  Badge,
} from 'antd';
import { connect } from 'react-redux';
import { createDo, deleteDo, editDo, completeDo, checkDo } from '../../store/actions';
import { FieldTimeOutlined, PlusSquareFilled, DownOutlined } from '@ant-design/icons';
import './index.less';

const { Option } = Select;
const { TextArea } = Input;

const Home = props => {
  const [isEdit, setIsEdit] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [curSchedule, setCurSchedule] = useState({});
  const [schedule, setSchedule] = useState({});

  const data = {
    typeText: ['Daily', 'Weekly', 'Monthly', 'Quarterly'],
  };

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

    // console.log(this.state.curSchedule);
    // console.log(this.data.Schedule);
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
  const handleChange = (type, v) => {
    schedule[type] = v;
  };
  const handleChange1 = (type, e) => {
    schedule[type] = e.target.value;
  };

  const { remindDos, loading, completeDos, failDos, curCapacity } = props;
  const { Header, Footer, Content } = Layout;
  const menu = i => {
    return (
      <Menu>
        <Menu.Item onClick={handleEdit.bind(this, i)}>Edit</Menu.Item>
        <Menu.Item onClick={handleDone.bind(this, i)}>Done</Menu.Item>
        <Menu.Item onClick={handleDelete.bind(this, i)}>Delete</Menu.Item>
      </Menu>
    );
  };
  const hasComplete = completeDos.length,
    hasFail = failDos.length,
    totalComplete = hasComplete + hasFail,
    efficiency = (totalComplete ? (hasComplete / totalComplete) * 100 : 0).toFixed();

  return (
    <div className="home-wrap">
      <Layout>
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
              <div className="add-todo-btn" onClick={showModal}>
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
        <Footer>Footer</Footer>
      </Layout>
      <Modal
        title={isEdit ? 'Edit Schedule' : 'Add New Schedule'}
        visible={modalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
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
                defaultValue={curSchedule.title}
                onChange={handleChange1.bind(this, 'title')}
              />
            </div>
            <div className="form-control">
              <span className="label">Starting Date:</span>
              <Input
                placeholder="Please Type Your Date"
                type="date"
                className="todo-ipt"
                defaultValue={curSchedule.startDate}
                onChange={handleChange1.bind(this, 'startDate')}
              />
            </div>
            <div className="form-control">
              <span className="label">Finishing Date:</span>
              <Input
                placeholder="Please Type Your Date"
                type="date"
                className="todo-ipt"
                defaultValue={curSchedule.finishDate}
                onChange={handleChange1.bind(this, 'finishDate')}
              />
            </div>
            <div className="form-control">
              <span className="label">Schedule Type:</span>
              <Select
                placeholder="Please Type Schedule Type"
                type="date"
                className="todo-select"
                defaultValue={curSchedule.type}
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
                defaultValue={curSchedule.description}
                onChange={handleChange1.bind(this, 'description')}
              />
            </div>
          </div>
        </Spin>
      </Modal>
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
// import React, { useState } from 'react';
// import {
//   Layout,
//   Card,
//   Menu,
//   message,
//   Dropdown,
//   Button,
//   Modal,
//   Input,
//   Select,
//   Spin,
//   Empty,
//   Progress,
//   Badge,
//   Form,
// } from 'antd';
// import { connect } from 'react-redux';
// import { createDo, deleteDo, editDo, completeDo } from '../../store/actions';
// import { FieldTimeOutlined, PlusSquareFilled, DownOutlined } from '@ant-design/icons';
// import './index.less';

// const { Option } = Select;
// const { TextArea } = Input;

// const Home = props => {
//   const [form] = Form.useForm();
//   const [isEdit, setIsEdit] = useState(false);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [curSchedule, setCurSchedule] = useState({});
//   const data = {
//     Schedule: {},
//     typeText: ['Daily', 'Weekly', 'Monthly', 'Quarterly'],
//   };
//   const delay = (time, data) => {
//     message.info(data, time);
//   };
//   const showModal = () => {
//     data.Schedule = {};
//     setModalVisible(true);
//     setIsEdit(false);
//     setCurSchedule({});
//   };

//   const handleEdit = index => {
//     setCurSchedule(remindDos[index]);
//     setModalVisible(true);
//     setIsEdit(true);
//     data.Schedule.index = index;
//   };
//   const handleOk = () => {
//     if (isEdit) {
//       props.editDo({ ...curSchedule, ...data.Schedule }, () => {
//         setModalVisible(false);
//       });
//       delay(1.5, 'Schedule has been changed !');
//     } else {
//       props.createDo({ ...data.Schedule }, () => {
//         setModalVisible(false);
//       });
//       delay(1.5, 'New Schedule has been created successful !');
//     }

//     // console.log(this.state.curSchedule);
//     // console.log(this.data.Schedule);
//   };
//   const handleCancel = () => {
//     setModalVisible(false);
//   };
//   const handleDone = index => {
//     props.completeDo(index, () => {
//       delay(0.5, 'Schedule has been completed successful ！');
//     });
//   };
//   const handleDelete = index => {
//     props.deleteDo(index, () => {
//       delay(0.5, 'Schedule has been deleted successful !');
//     });
//   };
//   const handleChange = (type, v) => {
//     data.Schedule[type] = v;
//   };
//   const handleChange1 = (type, e) => {
//     data.Schedule[type] = e.target.value;
//   };

//   const { remindDos, loading, completeDos, failDos, curCapacity } = props;
//   const { Header, Footer, Content } = Layout;
//   const menu = i => {
//     return (
//       <Menu>
//         <Menu.Item onClick={handleEdit.bind(this, i)}>Edit</Menu.Item>
//         <Menu.Item onClick={handleDone.bind(this, i)}>Done</Menu.Item>
//         <Menu.Item onClick={handleDelete.bind(this, i)}>Delete</Menu.Item>
//       </Menu>
//     );
//   };
//   const hasComplete = completeDos.length,
//     hasFail = failDos.length,
//     totalComplete = hasComplete + hasFail,
//     efficiency = totalComplete ? (hasComplete / totalComplete) * 100 : 0;
//   return (
//     <div className="home-wrap">
//       <Layout>
//         <Header className="header">
//           <div className="log">
//             <FieldTimeOutlined spin style={{ fontSize: '30px', marginRight: '12px' }} />
//             XOA
//           </div>
//           <div className="hd-right-box">
//             <div className="volume-box">
//               Used Capacity<span> {curCapacity + ' b'}</span>，Total Capacity
//               <span> 5MB</span>
//             </div>
//           </div>
//         </Header>
//         <Content className="content">
//           <Spin tip="Loading..." spinning={loading}>
//             <div className="task-pane-wrap">
//               {remindDos.map((item, i) => (
//                 <Card
//                   title={item.title}
//                   className="todo-card"
//                   extra={
//                     <Dropdown overlay={() => menu(i)} placement="bottomCenter" arrow>
//                       <Button>
//                         <DownOutlined />
//                       </Button>
//                     </Dropdown>
//                   }
//                   key={i}
//                 >
//                   <div className="todo-desc">
//                     <p>{item.description}</p>
//                   </div>
//                   <div className="todo-status">
//                     <div>Starting Date: {item.startDate}</div>
//                     <div>Finishing Date: {item.finishDate}</div>
//                     <div className="todo-desc">{data.typeText[item.type || 0]}</div>
//                   </div>
//                 </Card>
//               ))}
//               <div className="add-todo-btn" onClick={showModal}>
//                 <PlusSquareFilled />
//               </div>
//             </div>
//             <div className="task-status-list">
//               <Card
//                 title="Implementation Efficiency"
//                 style={{ width: '100%', marginBottom: '16px' }}
//               >
//                 <Progress percent={efficiency} status="active" />
//               </Card>
//               <Card title="Completed" style={{ width: '100%', marginBottom: '16px' }}>
//                 {hasComplete ? (
//                   completeDos.map((item, i) => (
//                     <div className="status-list-item" key={i}>
//                       <Badge status="success" />
//                       {item.title}
//                     </div>
//                   ))
//                 ) : (
//                   <Empty
//                     image={Empty.PRESENTED_IMAGE_SIMPLE}
//                     style={{ paddingTop: '20px', paddingBottom: '20px' }}
//                   />
//                 )}
//               </Card>
//               <Card title="Failed" style={{ width: '100%', marginBottom: '16px' }}>
//                 {hasFail ? (
//                   failDos.map((item, i) => (
//                     <div className="status-list-item" key={i}>
//                       <Badge status="warning" />
//                       {item.title}
//                     </div>
//                   ))
//                 ) : (
//                   <Empty
//                     image={Empty.PRESENTED_IMAGE_SIMPLE}
//                     style={{ paddingTop: '20px', paddingBottom: '20px' }}
//                   />
//                 )}
//               </Card>
//             </div>
//           </Spin>
//         </Content>
//         <Footer>Footer</Footer>
//       </Layout>
//       <Modal
//         title={isEdit ? 'Edit Schedule' : 'Add New Schedule'}
//         visible={modalVisible}
//         onOk={handleOk}
//         onCancel={handleCancel}
//         destroyOnClose
//       >
//         <Spin tip="Loading..." spinning={loading}>
//           <div className="todo-form">
//             <div className="form-control">
//               <span className="label">Title:</span>
//               <Input
//                 placeholder="Please Type Your Title"
//                 className="todo-ipt"
//                 defaultValue={curSchedule.title}
//                 onChange={handleChange1.bind(this, 'title')}
//               />
//             </div>
//             <div className="form-control">
//               <span className="label">Starting Date:</span>
//               <Input
//                 placeholder="Please Type Your Date"
//                 type="date"
//                 className="todo-ipt"
//                 defaultValue={curSchedule.startDate}
//                 onChange={handleChange1.bind(this, 'startDate')}
//               />
//             </div>
//             <div className="form-control">
//               <span className="label">Finishing Date:</span>
//               <Input
//                 placeholder="Please Type Your Date"
//                 type="date"
//                 className="todo-ipt"
//                 defaultValue={curSchedule.finishDate}
//                 onChange={handleChange1.bind(this, 'finishDate')}
//               />
//             </div>
//             <div className="form-control">
//               <span className="label">Schedule Type:</span>
//               <Select
//                 placeholder="Please Type Schedule Type"
//                 type="date"
//                 className="todo-select"
//                 defaultValue={curSchedule.type}
//                 onChange={handleChange.bind(this, 'type')}
//               >
//                 <Option value="0">Daily</Option>
//                 <Option value="1">Weekly</Option>
//                 <Option value="2">Monthly</Option>
//                 <Option value="3">Quarterly</Option>
//               </Select>
//             </div>
//             <div className="form-control">
//               <span className="label">Description:</span>
//               <TextArea
//                 maxLength="200"
//                 placeholder="Please Type Your Description"
//                 className="todo-ipt"
//                 defaultValue={curSchedule.description}
//                 onChange={handleChange1.bind(this, 'description')}
//               />
//             </div>
//           </div>
//         </Spin>
//       </Modal>
//     </div>
//   );
// };
// const mapStateToProps = state => {
//   let { remindDos, failDos, completeDos, loading, err, curCapacity } = state;
//   return {
//     remindDos,
//     failDos,
//     completeDos,
//     loading,
//     err,
//     curCapacity,
//   };
// };
// const mapDispatchToProps = dispatch => {
//   return {
//     createDo(data, cb) {
//       dispatch(createDo(data, cb));
//     },
//     deleteDo(data, cb) {
//       dispatch(deleteDo(data, cb));
//     },
//     editDo(data, cb) {
//       dispatch(editDo(data, cb));
//     },
//     completeDo(data, cb) {
//       dispatch(completeDo(data, cb));
//     },
//   };
// };
// export default connect(mapStateToProps, mapDispatchToProps)(Home);
