import { Button, Form, Input, Modal, Select, message } from "antd";
import React from "react";

const Add = ({
  isAddModalOpen,
  products,
  categories,
  addModal,
  setProducts,
}) => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const response = await fetch("http://localhost:5000/api/products/add-product", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }
      message.success("Product added successfully");
      form.resetFields();
      setProducts([
        ...products,
        {
          ...values,
          _id: Math.random(),
          price: Number(values.price),
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Modal
        title="Add New Product"
        open={isAddModalOpen}
        onCancel={addModal}
        footer={false}
      >
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            label="Add Product"
            name="title"
            rules={[
              { required: true, message: "Product name cannot be empty" },
            ]}
          >
            <Input placeholder="Enter a product name" />
          </Form.Item>
          <Form.Item
            label="Product Image"
            name="img"
            rules={[
              { required: true, message: "Product image cannot be empty" },
            ]}
          >
            <Input placeholder="Enter a product image" />
          </Form.Item>
          <Form.Item
            label="Product Price"
            name="price"
            rules={[
              { required: true, message: "Product name cannot be empty" },
            ]}
          >
            <Input placeholder="Enter a product price" />
          </Form.Item>
          <Form.Item
            label="Choose Category"
            name="category"
            rules={[
              { required: true, message: "Category field can not be empty" },
            ]}
          >
            <Select
              showSearch
              placeholder="Select a person"
              optionFilterProp="children"
              //   onChange={onChange}
              //   onSearch={onSearch}
              filterOption={(input, option) =>
                (option?.title ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              filterSort={(optionA, optionB) =>
                (optionA?.title ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.title ?? "").toLowerCase())
              }
              options={categories}
            />
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
