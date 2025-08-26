import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getApplications,
  addApplication,
  updateApplication,
  deleteApplication,
} from "../actions/applicationFormAction";
import { Table, Button, Input, Form, Typography, Space } from "antd";
import { useParams } from "react-router-dom";

const { Title } = Typography;

const ApplicationForm = () => {
  const dispatch = useDispatch();
  const { list = [] } = useSelector((state) => state.application || {});
  const [form] = Form.useForm();
  const [editId, setEditId] = useState(null);
  const { internshipTitle } = useParams();

  useEffect(() => {
    dispatch(getApplications());
  }, [dispatch]);

  useEffect(() => {
    if (internshipTitle) {
      form.setFieldsValue({ internshipTitle: decodeURIComponent(internshipTitle) });
    }
  }, [internshipTitle, form]);

  const handleFinish = (values) => {
    if (editId) {
      dispatch(updateApplication(editId, values));
      setEditId(null);
    } else {
      dispatch(addApplication(values));
    }
    form.resetFields();
  };

  const handleEdit = (item) => {
    form.setFieldsValue(item);
    setEditId(item.id);
  };

  const handleDelete = (id) => {
    dispatch(deleteApplication(id));
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Contact", dataIndex: "contact", key: "contact" },
    { title: "Resume Path", dataIndex: "resumePath", key: "resumePath", render: (text) => (
      <a href={text} target="_blank" rel="noopener noreferrer">{text}</a>
    )},
    { title: "Internship Title", dataIndex: "internshipTitle", key: "internshipTitle" },
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
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: 20 }}>
      <Title level={2}>Application Management</Title>
      <Form form={form} layout="inline" onFinish={handleFinish}>
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Enter name" }]}
        >
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Enter email" },
            { type: "email", message: "Enter a valid email" },
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="contact"
          rules={[{ required: true, message: "Enter contact" }]}
        >
          <Input placeholder="Contact" />
        </Form.Item>
        <Form.Item
          name="resumePath"
          rules={[
            { required: true, message: "Enter resume path" },
            {
              validator: (_, value) =>
                value && value.endsWith(".pdf")
                  ? Promise.resolve()
                  : Promise.reject("Only .pdf files are allowed"),
            },
          ]}
        >
          <Input placeholder="Resume PDF URL" />
        </Form.Item>
        <Form.Item
          name="internshipTitle"
          rules={[{ required: true, message: "Enter internship title" }]}
        >
          <Input placeholder="Internship Title" />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary">
            {editId ? "Update" : "Add"}
          </Button>
        </Form.Item>
      </Form>
      <Table
        dataSource={list}
        columns={columns}
        rowKey="id"
        style={{ marginTop: 20 }}
      />
    </div>
  );
};

export default ApplicationForm;
