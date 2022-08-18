import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Typography,
  Button,
  Modal,
  Row,
  Col,
  Table,
  Form,
  Input,
  DatePicker,
} from 'antd';
import React, { useState, useEffect } from 'react';
import classes from './styles.module.scss';
import { ToastContainer, toast } from 'react-toastify';
import { formatNewDate, formatReceivedSqlDate } from '../../utils/formatDate';
import { Helmet } from 'react-helmet';

const { Title } = Typography;

const Order = () => {
  const [dataSource, setDataSource] = useState([]);
  const [isFetchData, setIsFetchData] = useState(false);

  const onDelete = async (record) => {
    const newData = await fetch('/delete-order', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        id: record.orderid,
      }),
    }).then((res) => res.json());

    setDataSource((pre) => {
      return pre.filter((item) => item.orderid !== record.orderid);
    });

    toast.success(`${record.orderid} deleted!`);
  };

  const columns = [
    {
      key: '1',
      title: 'OrderID',
      dataIndex: 'orderid',
    },
    {
      key: '2',
      title: 'CustomerID',
      dataIndex: 'customerid',
    },
    {
      key: '3',
      title: 'EmployeeID',
      dataIndex: 'employeeid',
    },
    {
      key: '4',
      title: 'Date Ordered',
      dataIndex: 'date',
    },
    {
      key: '5',
      title: 'Payment Type',
      dataIndex: 'payment',
    },
    {
      key: '6',
      title: 'Total Price',
      dataIndex: 'totalprice',
    },
    {
      key: '7',
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
    const newData = await fetch('/insert-order', {
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
            orderid: values.orderid,
            customerid: values.customerid,
            employeeid: values.employeeid,
            date: formatNewDate(values.date),
            payment: values.payment,
            totalprice: values.totalprice,
          },
        ];
      });
      form.resetFields();
      setIsModalVisible(false);
      toast.success('Order Added Successfully!');
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const getData = async () => {
    setDataSource([]);
    const newData = await fetch('/select-all-orders', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Accept: 'application/json',
      },
    }).then((res) => res.json());

    console.log(newData);

    if (newData) {
      setIsFetchData(true);
      newData.map((item) => {
        setDataSource((prev) => {
          return [
            ...prev,
            {
              orderid: item.OrderingID,
              customerid: item.CustomerID,
              employeeid: item.EmployeeID,
              date: formatReceivedSqlDate(item.DateOrdered),
              payment: item.PaymentType,
              totalprice: item.TotalPrice,
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
        <title>Order | Simplicity</title>
      </Helmet>
      <Row className={classes.top}>
        <Col xs={24} md={8}>
          <Title level={3}>Order</Title>
        </Col>
        <Col xs={24} md={8} offset={8} className={classes.add}>
          <Button icon={<PlusOutlined />} onClick={showModal}>
            Add New Order
          </Button>
          <Modal
            title="Add New Order"
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
                label="OrderID"
                name="orderid"
                rules={[
                  {
                    required: true,
                    message: 'Please input ID of order!',
                  },
                ]}
              >
                <Input />
              </Form.Item>

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

              <Form.Item
                label="EmployeeID"
                name="employeeid"
                rules={[
                  {
                    required: true,
                    message: 'Please input ID of employee!',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item label="Date Ordered" name="date">
                <DatePicker />
              </Form.Item>

              <Form.Item label="Payment Type" name="payment">
                <Input />
              </Form.Item>

              <Form.Item label="Total Price" name="totalprice">
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

export default Order;
