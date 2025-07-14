import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEmployers, addEmployer, updateEmployer, deleteEmployer } from "../actions/employerAction";
import { Table, Button, Input, Form, Typography, Space, Select } from "antd";

const { Title } = Typography;
const { Option } = Select;

const Employer = () => {
  const dispatch = useDispatch();
  const { list = [] } = useSelector((state) => state.employer || {});

  const [form] = Form.useForm();
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    dispatch(getEmployers());
  }, [dispatch]);

  const handleFinish = (values) => {
    if (editId) {
      dispatch(updateEmployer(editId, values));
      setEditId(null);
    } else {
      dispatch(addEmployer(values));
    }
    form.resetFields();
  };

  const handleEdit = (employer) => {
    form.setFieldsValue(employer);
    setEditId(employer.id);
  };

  const handleDelete = (id) => {
    dispatch(deleteEmployer(id));
  };

  const columns = [
    {
      title: "Company Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleEdit(record)}>Edit</Button>
          <Button type="link" danger onClick={() => handleDelete(record.id)}>Delete</Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 20 }}>
      <Title level={2}>Employer Management</Title>
      <Form form={form} layout="inline" onFinish={handleFinish} style={{ marginBottom: 20 }}>
        <Form.Item name="name" rules={[{ required: true, message: "Please input company name" }]}>
          <Input placeholder="Company Name" />
        </Form.Item>
        <Form.Item name="email" rules={[{ required: true, message: "Please input email" }]}>
          <Input placeholder="Email" type="email" />
        </Form.Item>
        <Form.Item name="category" rules={[{ required: true, message: "Please select category" }]}>
          <Select placeholder="Select category" style={{ width: 160 }}>
            <Option value="IT">IT</Option>
            <Option value="Finance">Finance</Option>
            <Option value="Manufacturing">Manufacturing</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {editId ? "Update" : "Add"} Employer
          </Button>
        </Form.Item>
      </Form>

      <Table dataSource={list} columns={columns} rowKey="id" />
    </div>
  );
};

export default Employer;
