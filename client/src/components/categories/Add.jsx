import { Button, Form, Input, Modal, message } from "antd";
import React from "react";

const Add = ({ isAddModalOpen, setCategories, categories, addModal }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    try {
      fetch("http://localhost:5000/api/categories/add-category", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      message.success("Category added successfully");
      form.resetFields();
      setCategories([
        ...categories,
        {
          _id: Math.random(),
          title: values.title,
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Modal
        title="Add New Category"
        open={isAddModalOpen}
        onCancel={addModal}
        footer={false}
      >
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            label="Add Category"
            name="title"
            rules={[
              { required: true, message: "Category field cannot be empty" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item className="flex justify-end mb-0">
            <Button type="primary" htmlType="submit">
              Add
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Add;
