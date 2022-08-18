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
import React, { useEffect, useState } from 'react';
import classes from './styles.module.scss';
import { ToastContainer, toast } from 'react-toastify';
import { formatNewDate, formatReceivedSqlDate } from '../../utils/formatDate';
import { Helmet } from 'react-helmet';

const { Title } = Typography;

const Supply = () => {
  const [dataSource, setDataSource] = useState([]);
  const [isFetchData, setIsFetchData] = useState(false);

  const onDelete = async (record) => {
    const newData = await fetch('/delete-supply', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        id: record.supplyid,
      }),
    }).then((res) => res.json());

    console.log(newData);

    setDataSource((pre) => {
      return pre.filter((item) => item.supplyid !== record.supplyid);
    });

    toast.success(`${record.supplyid} deleted!`);
  };

  const columns = [
    {
      key: '0',
      title: 'SupplyID',
      dataIndex: 'supplyid',
    },
    {
      key: '1',
      title: 'SupplierID',
      dataIndex: 'supplierid',
    },
    {
      key: '2',
      title: 'IngredientID',
      dataIndex: 'ingredientid',
    },
    {
      key: '3',
      title: 'Supply Date',
      dataIndex: 'date',
    },
    {
      key: '4',
      title: 'Quantity (g)',
      dataIndex: 'quantity',
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
    const newData = await fetch('/insert-supply', {
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
            supplyid: values.supplyid,
            supplierid: values.supplierid,
            ingredientid: values.ingredientid,
            date: formatNewDate(values.date),
            quantity: values.quantity,
          },
        ];
      });
      form.resetFields();
      setIsModalVisible(false);
      toast.success('New Supply Added Successfully!');
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const getData = async () => {
    setDataSource([]);
    const newData = await fetch('/select-all-supplies', {
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
              supplyid: item.SupplyID,
              supplierid: item.SupplierID,
              ingredientid: item.IngredientID,
              date: formatReceivedSqlDate(item.SupplyDate),
              quantity: item.Quantity,
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
        <title>Supply | Simplicity</title>
      </Helmet>
      <Row className={classes.top}>
        <Col xs={24} md={8}>
          <Title level={3}>Supply</Title>
        </Col>
        <Col xs={24} md={8} offset={8} className={classes.add}>
          <Button icon={<PlusOutlined />} onClick={showModal}>
            Add New Supply
          </Button>
          <Modal
            title="Add New Supply"
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
                label="SupplyID"
                name="supplyid"
                rules={[
                  {
                    required: true,
                    message: 'Please input ID of new supply!',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="SupplierID"
                name="supplierid"
                rules={[
                  {
                    required: true,
                    message: 'Please input ID of supplier!',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="IngredientID"
                name="ingredientid"
                rules={[
                  {
                    required: true,
                    message: 'Please input ID of ingredient!',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item label="Supply Date" name="date">
                <DatePicker />
              </Form.Item>

              <Form.Item label="Quantity (g)" name="quantity">
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

export default Supply;
