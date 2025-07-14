import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCompanies,
  addCompany,
  updateCompany,
  deleteCompany,
} from "../actions/companyAction";
import { Table, Button, Input, Form, Typography, Space, Checkbox, message } from "antd";

const { Title } = Typography;

const Company = () => {
  const dispatch = useDispatch();
  const { list = [] } = useSelector((state) => state.company || {});
  const [form] = Form.useForm();
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    dispatch(getCompanies());
  }, [dispatch]);

  const handleFinish = (values) => {
    if (editId) {
      dispatch(updateCompany(editId, values));
      message.success("Company updated!");
      setEditId(null);
    } else {
      dispatch(addCompany(values));
      message.success("Company added!");
    }
    form.resetFields();
  };

  const handleEdit = (item) => {
    form.setFieldsValue(item);
    setEditId(item.id);
  };

  const handleDelete = (id) => {
    dispatch(deleteCompany(id));
    message.success("Company deleted!");
  };

  const handleCancelEdit = () => {
    form.resetFields();
    setEditId(null);
  };

  const columns = [
    { title: "Company Name", dataIndex: "name", key: "name" },
    { title: "Location", dataIndex: "location", key: "location" },
    {
      title: "Verified",
      dataIndex: "verifiedStatus",
      key: "verifiedStatus",
      render: (val) => (val ? "Yes" : "No"),
    },
    {
      title: "Actions",
      render: (_, record) => (
        <Space>
          <Button onClick={() => handleEdit(record)}>Edit</Button>
          <Button danger onClick={() => handleDelete(record.id)}>Delete</Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 20 }}>
      <Title level={2}>Company Management</Title>
      <Form
        form={form}
        layout="inline"
        onFinish={handleFinish}
        style={{ marginBottom: 16 }}
      >
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Please enter company name" }]}
        >
          <Input placeholder="Company Name" />
        </Form.Item>
        <Form.Item
          name="location"
          rules={[{ required: true, message: "Please enter location" }]}
        >
          <Input placeholder="Location" />
        </Form.Item>
        <Form.Item name="verifiedStatus" valuePropName="checked">
          <Checkbox>Verified</Checkbox>
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary">
            {editId ? "Update" : "Add"}
          </Button>
        </Form.Item>
        {editId && (
          <Form.Item>
            <Button onClick={handleCancelEdit}>Cancel</Button>
          </Form.Item>
        )}
      </Form>

      <Table
        dataSource={list}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default Company;
