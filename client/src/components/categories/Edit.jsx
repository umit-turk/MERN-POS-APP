import { Button, Form, Input, Modal, Table, message } from "antd";
import React, { useState } from "react";

const Edit = ({ isEditModalOpen, editModal, categories, setCategories }) => {
  const [editingRow, setEditingRow] = useState({});

  const onFinish = (values) => {
    try {
       fetch("http://localhost:5000/api/categories/update-category", {
        method: "PUT",
        body: JSON.stringify({ ...values, categoryId: editingRow._id }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      message.success("Category updated successfully");
      setCategories((prev) =>
        prev.map((item) => {
          return item._id === editingRow._id
            ? { ...item, title: values.title }
            : { ...item };
        })
      );
    } catch (error) {
      message.warning("Category has not been updated");
      console.log(error);
    }
  };

  const deleteCategory = (id) => {
    const confirmed = window.confirm("Are you sure?");
    if (!confirmed) return;
    try {
      fetch("http://localhost:5000/api/categories/delete-category", {
        method: "DELETE",
        body: JSON.stringify({ categoryId: id }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      setCategories((prev) => prev.filter((item) => item._id !== id));
      message.success("Category deleted successfully");
    } catch (error) {
      console.log(error);
      message.warning("Category has not deleted ");
    }
  };

  const columns = [
    {
      title: "Category Title",
      dataIndex: "title",
      render: (_, record) => {
        return record._id === editingRow._id ? (
          <Form.Item className="mb-0" name="title">
            <Input defaultValue={record.title} />
          </Form.Item>
        ) : (
          <p>{record.title}</p>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        return (
          <div>
            <Button
              type="link"
              className="pl-0"
              onClick={() => setEditingRow(record)}
            >
              Edit
            </Button>
            <Button type="link" htmlType="submit" className="text-gray-500">
              Save
            </Button>
            <Button
              onClick={() => deleteCategory(record._id)}
              type="link"
              danger
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <Modal
      title="Category Operations"
      open={isEditModalOpen}
      onCancel={editModal}
    >
      <Form onFinish={onFinish}>
        <Table
          bordered
          dataSource={categories}
          columns={columns}
          rowKey={"_id"}
        />
      </Form>
    </Modal>
  );
};

export default Edit;
