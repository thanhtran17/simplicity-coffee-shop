import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Typography, Button, Modal, Row, Col, Table, Form, Input } from 'antd';
import React, { useState, useEffect } from 'react';
import classes from './styles.module.scss';
import { ToastContainer, toast } from 'react-toastify';
import { Helmet } from 'react-helmet';

const { Title } = Typography;

const Made = () => {
  const [dataSource, setDataSource] = useState([]);
  const [isFetchData, setIsFetchData] = useState(false);

  const onDelete = async (record) => {
    const newData = await fetch('/delete-made', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        id: record.madeid,
      }),
    }).then((res) => res.json());

    console.log(newData);

    setDataSource((pre) => {
      return pre.filter((item) => item.madeid !== record.madeid);
    });

    toast.success(`${record.madeid} deleted!`);
  };

  const columns = [
    {
      key: '1',
      title: 'MadeID',
      dataIndex: 'madeid',
    },
    {
      key: '2',
      title: 'IngredientID',
      dataIndex: 'ingredientid',
    },
    {
      key: '3',
      title: 'ProductID',
      dataIndex: 'productid',
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
    const newData = await fetch('/insert-made', {
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
            madeid: values.madeid,
            productid: values.productid,
            ingredientid: values.ingredientid,
            quantity: values.quantity,
          },
        ];
      });
      form.resetFields();
      setIsModalVisible(false);
      toast.success('New Recipe Added Successfully!');
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const getData = async () => {
    setDataSource([]);
    const newData = await fetch('/select-all-made', {
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
              madeid: item.MadeID,
              productid: item.ProductID,
              ingredientid: item.IngredientID,
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
        <title>Recipe | Simplicity</title>
      </Helmet>
      <Row className={classes.top}>
        <Col xs={24} md={8}>
          <Title level={3}>Made</Title>
        </Col>
        <Col xs={24} md={8} offset={8} className={classes.add}>
          <Button icon={<PlusOutlined />} onClick={showModal}>
            Add New Recipe
          </Button>
          <Modal
            title="Add New Recipe"
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
                label="MadeID"
                name="madeid"
                rules={[
                  {
                    required: true,
                    message: 'Please input ID of new recipe!',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="ProductID"
                name="productid"
                rules={[
                  {
                    required: true,
                    message: 'Please input ID of product!',
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

export default Made;
