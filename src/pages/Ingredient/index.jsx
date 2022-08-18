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

const Ingredient = () => {
  const [dataSource, setDataSource] = useState([]);
  const [isFetchData, setIsFetchData] = useState(false);

  const onDelete = async (record) => {
    const newData = await fetch('/delete-ingredient', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        id: record.ingredientid,
      }),
    }).then((res) => res.json());

    console.log(newData);

    setDataSource((pre) => {
      return pre.filter((item) => item.ingredientid !== record.ingredientid);
    });

    toast.success(`${record.ingredientid} deleted!`);
  };

  const columns = [
    {
      key: '1',
      title: 'IngredientID',
      dataIndex: 'ingredientid',
    },
    {
      key: '2',
      title: 'Name',
      dataIndex: 'name',
    },
    {
      key: '3',
      title: 'Price',
      dataIndex: 'price',
    },
    {
      key: '4',
      title: 'Quantity In Stock',
      dataIndex: 'quantity',
    },
    {
      key: '5',
      title: 'Expire Date',
      dataIndex: 'expire',
    },
    {
      key: '6',
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
    const newData = await fetch('/insert-ingredient', {
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
            ingredientid: values.ingredientid,
            name: values.name,
            price: values.price,
            quantity: values.quantity,
            expire: formatNewDate(values.expire),
          },
        ];
      });
      form.resetFields();
      setIsModalVisible(false);
      toast.success('Ingredient Added Successfully!');
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const getData = async () => {
    setDataSource([]);
    const newData = await fetch('/select-all-ingredients', {
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
              ingredientid: item.IngredientID,
              name: item.Name,
              price: item.Price,
              quantity: item.QuantityInStock,
              expire: formatReceivedSqlDate(item.ExpireDate),
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
        <title>Ingredient | Simplicity</title>
      </Helmet>
      <Row className={classes.top}>
        <Col xs={24} md={8}>
          <Title level={3}>Ingredient</Title>
        </Col>
        <Col xs={24} md={8} offset={8} className={classes.add}>
          <Button icon={<PlusOutlined />} onClick={showModal}>
            Add New Ingredient
          </Button>
          <Modal
            title="Add New Ingredient"
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

              <Form.Item label="Name" name="name">
                <Input />
              </Form.Item>

              <Form.Item label="Price" name="price">
                <Input />
              </Form.Item>
              <Form.Item label="Quantity In Stock" name="quantity">
                <Input />
              </Form.Item>
              <Form.Item label="Expire Date" name="expire">
                <DatePicker />
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

export default Ingredient;
