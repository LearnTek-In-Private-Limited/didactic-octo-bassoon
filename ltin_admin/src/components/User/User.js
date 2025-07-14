// 📁 src/components/User.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, addUser, updateUser, deleteUser } from "../actions/userActions";
import { Table, Button, Input, Form, Typography, Space, Select } from "antd";

const { Title } = Typography;
const { Option } = Select;

const User = () => {
  const dispatch = useDispatch();
  const { list = [] } = useSelector((state) => state.user || {});

  const [form] = Form.useForm();
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleFinish = (values) => {
    if (editId) {
      dispatch(updateUser(editId, values));
      setEditId(null);
    } else {
      dispatch(addUser(values));
    }
    form.resetFields();
  };

  const handleEdit = (user) => {
    form.setFieldsValue(user);
    setEditId(user.id);
  };

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
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
      <Title level={2}>User Management</Title>
      <Form form={form} layout="inline" onFinish={handleFinish} style={{ marginBottom: 20 }}>
        <Form.Item name="name" rules={[{ required: true, message: "Please input name" }]}> 
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item name="email" rules={[{ required: true, message: "Please input email" }]}> 
          <Input placeholder="Email" type="email" />
        </Form.Item>
        <Form.Item name="role" rules={[{ required: true, message: "Please select role" }]}> 
          <Select placeholder="Select role" style={{ width: 160 }}>
            <Option value="student">Student</Option>
            <Option value="employer">Employer</Option>
            <Option value="admin">Admin</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {editId ? "Update" : "Add"} User
          </Button>
        </Form.Item>
      </Form>

      <Table dataSource={list} columns={columns} rowKey="id" />
    </div>
  );
};

export default User;