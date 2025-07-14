import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getInternships,
  addInternship,
  updateInternship,
  deleteInternship,
} from "../actions/internshipAction";
import { Table, Button, Input, Form, Typography, Space, Select, DatePicker } from "antd";
import moment from "moment";

const { Title } = Typography;
const { Option } = Select;

const Internship = () => {
  const dispatch = useDispatch();
  const { list = [] } = useSelector((state) => state.internship || {});
  const [form] = Form.useForm();
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    dispatch(getInternships());
  }, [dispatch]);

  const handleFinish = (values) => {
    const formattedValues = {
      ...values,
      lastDate: values.lastDate ? values.lastDate.format("YYYY-MM-DD") : null,
    };

    if (editId) {
      dispatch(updateInternship(editId, formattedValues));
      setEditId(null);
    } else {
      dispatch(addInternship(formattedValues));
    }
    form.resetFields();
  };

  const handleEdit = (item) => {
    form.setFieldsValue({
      ...item,
      lastDate: item.lastDate ? moment(item.lastDate, "YYYY-MM-DD") : null,
    });
    setEditId(item.id);
  };

  const handleDelete = (id) => {
    dispatch(deleteInternship(id));
  };

  const columns = [
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Company", dataIndex: "company", key: "company" },
    { title: "Duration", dataIndex: "duration", key: "duration" },
    { title: "Stipend", dataIndex: "stipend", key: "stipend" },
    { title: "Location", dataIndex: "location", key: "location" },
    { title: "Eligibility", dataIndex: "eligibility", key: "eligibility" },
    { 
      title: "Apply", 
      dataIndex: "apply", 
      key: "apply", 
      render: (url) => <a href={url} target="_blank" rel="noopener noreferrer">Apply</a>
    },
    { title: "Status", dataIndex: "status", key: "status" },
    { title: "Last Date", dataIndex: "lastDate", key: "lastDate" },
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
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: 20 }}>
      <Title level={2}>Internship Management</Title>

      <Form
        form={form}
        layout="inline"
        onFinish={handleFinish}
        style={{ flexWrap: "wrap", marginBottom: 20 }}
      >
        <Form.Item name="title" rules={[{ required: true, message: "Please enter title" }]}>
          <Input placeholder="Title" />
        </Form.Item>
        <Form.Item name="company" rules={[{ required: true, message: "Please enter company" }]}>
          <Input placeholder="Company" />
        </Form.Item>
        <Form.Item name="duration" rules={[{ required: true, message: "Please enter duration" }]}>
          <Input placeholder="Duration" />
        </Form.Item>
        <Form.Item name="stipend" rules={[{ required: true, message: "Please enter stipend" }]}>
          <Input placeholder="Stipend" />
        </Form.Item>
        <Form.Item name="location" rules={[{ required: true, message: "Please enter location" }]}>
          <Input placeholder="Location" />
        </Form.Item>
        <Form.Item name="eligibility" rules={[{ required: true, message: "Please enter eligibility" }]}>
          <Input placeholder="Eligibility" />
        </Form.Item>
        <Form.Item
          name="apply"
          rules={[
            { required: true, message: "Please enter application link" },
            { type: "url", message: "Please enter a valid URL" },
          ]}
        >
          <Input placeholder="Application URL (https://...)" />
        </Form.Item>
        <Form.Item name="status" rules={[{ required: true, message: "Please select status" }]}>
          <Select placeholder="Select Status" style={{ width: 150 }}>
            <Option value="pending">Pending</Option>
            <Option value="approved">Approved</Option>
            <Option value="rejected">Rejected</Option>
          </Select>
        </Form.Item>

        {/* New Last Date Field */}
        <Form.Item
          name="lastDate"
          rules={[{ required: true, message: "Please select last date" }]}
        >
          <DatePicker placeholder="LastDate" format="YYYY-MM-DD" />
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit" type="primary">
            {editId ? "Update" : "Add"}
          </Button>
        </Form.Item>
      </Form>

      <Table dataSource={list} columns={columns} rowKey="id" />
    </div>
  );
};

export default Internship;
