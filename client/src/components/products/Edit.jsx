import { Button, Form, Input, Modal, Select, Table, message } from "antd";
import React, { useEffect, useState } from "react";

const Edit = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState({});
  
  const [form] = Form.useForm();
  useEffect(() => {
    getProducts();
    getCategories();
  }, []);

  const getProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/products/get-all");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCategories = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/categories/get-all");
      const data = await res.json();
      data && setCategories(data.map((item) => {
        return {...item, value:item.title}
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const onFinish = (values) => {
    try {
      fetch("http://localhost:5000/api/products/update-product", {
        method: "PUT",
        body: JSON.stringify({ ...values, productId:editingItem._id }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      message.success("Product updated successfully");
      setProducts((prev) =>
        prev.map((item) => {
        return item._id === editingItem._id ? values : item
        })
      );
    } catch (error) {
      message.warning("Product has not been updated");
      console.log(error);
    }
  };

  const deleteCategory = (id) => {
    const confirmed = window.confirm("Are you sure?");
    if (!confirmed) return;
    try {
      fetch("http://localhost:5000/api/products/delete-product", {
        method: "DELETE",
        body: JSON.stringify({ productId: id }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      setProducts((prev) => prev.filter((item) => item._id !== id));
      message.success("Product deleted successfully");
    } catch (error) {
      console.log(error);
      message.warning("Product has not deleted ");
    }
  };

  const columns = [
    {
      title: "Product Name",
      dataIndex: "title",
      width: "8%",
      render: (_, record) => {
        return <p>{record.title}</p>;
      },
    },
    {
      title: "Product Image",
      dataIndex: "image",
      width: "5%",
      render: (_, record) => {
        return (
          <img src={record.img} alt="" className="w-full h-20 object-cover" />
        );
      },
    },
    {
      title: "Product Price",
      dataIndex: "price",
      width: "8%",
    },
    {
      title: "Category",
      dataIndex: "category",
      width: "8%",
    },
    {
      title: "Action",
      dataIndex: "action",
      width: "8%",
      render: (text, record) => {
        return (
          <div>
            <Button
              onClick={() => {
                setIsEditModalOpen(true)
                setEditingItem(record);
              }}
              type="link"
              className="pl-0"
            >
              Edit
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
    <>
      <Table
        scroll={{
          x: 1000,
          y: 600,
        }}
        bordered
        dataSource={products}
        columns={columns}
        rowKey={"_id"}
      />
      <Modal
        title="Update Product"
        open={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        footer={false}
      >
        <Form form={form} onFinish={onFinish} initialValues={editingItem} layout="vertical">
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
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default Edit;
