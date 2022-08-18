import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Typography, Button, Modal, Row, Col, Table, Form, Input } from 'antd';
import React, { useState, useEffect } from 'react';
import classes from './styles.module.scss';
import { ToastContainer, toast } from 'react-toastify';
import { Helmet } from 'react-helmet';

const { Title } = Typography;

const Customer = () => {
  const [dataSource, setDataSource] = useState([]);
  const [isFetchData, setIsFetchData] = useState(false);

  const onDelete = async (record) => {
    const newData = await fetch('/delete-customer', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        id: record.customerid,
      }),
    }).then((res) => res.json());

    console.log(newData);

    setDataSource((pre) => {
      return pre.filter((item) => item.customerid !== record.customerid);
    });

    toast.success(`${record.customerid} deleted!`);
  };

  const columns = [
    {
      key: '1',
      title: 'CustomerID',
      dataIndex: 'customerid',
    },
    {
      key: '2',
      title: 'Name',
      dataIndex: 'name',
    },
    {
      key: '3',
      title: 'Phone Number',
      dataIndex: 'phonenumber',
    },
    {
      key: '4',
      title: 'Gender',
      dataIndex: 'gender',
    },
    {
      key: '5',
      title: 'Actions',
      render: (record) => {
        return (
          <>
            <DeleteOutlined
              onClick={() => onDelete(record)}
              style={{ color: 'red', marginLeft: '12px', cursor: 'pointer' }}
            />
          </>
        );
      },
    },
  ];

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalVisible(false);
  };

  const onFinish = async (values) => {
    const newData = await fetch('/insert-customer', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        values: values,
      }),
    }).then((res) => res.json());

    if (newData) {
      setDataSource((prev) => {
        return [
          ...prev,
          {
            customerid: values.customerid,
            name: values.name,
            phonenumber: values.phonenumber,
            gender: values.gender,
          },
        ];
      });
      form.resetFields();
      setIsModalVisible(false);
      toast.success('Customer Added Successfully!');
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const getData = async () => {
    setDataSource([]);
    const newData = await fetch('/select-all-customers', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Accept: 'application/json',
      },
    }).then((res) => res.json());

    if (newData) {
      setIsFetchData(true);
      newData.map((item) => {
        setDataSource((prev) => {
          return [
            ...prev,
            {
              customerid: item.CustomerID,
              name: item.Name,
              phonenumber: item.PhoneNumber,
              gender: item.Gender,
            },
          ];
        });
      });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Customer | Simplicity</title>
      </Helmet>
      <Row className={classes.top}>
        <Col xs={24} md={8}>
          <Title level={3}>Customer</Title>
        </Col>
        <Col xs={24} md={8} offset={8} className={classes.add}>
          <Button icon={<PlusOutlined />} onClick={showModal}>
            Add New Customer
          </Button>
          <Modal
            title="Add New Customer"
            visible={isModalVisible}
            onCancel={handleCancel}
            footer={false}
          >
            <Form
              form={form}
              name="basic"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="CustomerID"
                name="customerid"
                rules={[
                  {
                    required: true,
                    message: 'Please input ID of customer!',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item label="Name" name="name">
                <Input />
              </Form.Item>

              <Form.Item label="Phone Number" name="phonenumber">
                <Input />
              </Form.Item>

              <Form.Item label="Gender" name="gender">
                <Input />
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </Col>
      </Row>
      <Table
        pagination={{
          position: ['bottomCenter', 'bottomCenter'],
        }}
        bordered
        columns={columns}
        dataSource={dataSource}
      ></Table>
      <Button onClick={getData} style={{ marginTop: '20px' }}>
        {isFetchData ? 'Refresh' : 'Get Data'}
      </Button>
      <ToastContainer position="bottom-right" autoClose={2000} />
    </div>
  );
};

export default Customer;
