import { Button, Card, Popconfirm, Table, message } from "antd";
import Header from "../components/header/Header";
import CreateBill from "../components/cart/CreateBill";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { decrease, deleteCart, increase } from "../redux/cartSlice";

const CartPage = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { cartItems, total, tax } = useSelector((state) => state.cart);
  const setModalOpen = () => {
    setIsModalOpen((prev) => !prev);
  };

  const confirm = (e) => {
    message.success("Product delete successfully");
    dispatch(deleteCart(e));
  };
  const cancel = (e) => {
    message.error("Click on No");
  };

  const columns = [
    {
      title: "Product Image",
      dataIndex: "img",
      key: "img",
      width: "125px",
      render: (img) => {
        return <img src={img} className="w-full h-20 object-cover" />;
      },
    },
    {
      title: "Product Name",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Product Price",
      dataIndex: "price",
      key: "price",
      render: (price) => {
        return <span>{price.toFixed(2)}₺</span>;
      },
    },
    {
      title: "Total",
      render: (price, record) => {
        return <span>{(record.quantity * record?.price).toFixed(2)}₺</span>;
      },
    },
    {
      title: "Product Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity, record) => {
        return (
          <div className="flex items-center">
            <Button
              icon={<PlusCircleOutlined />}
              className="w-full flex items-center justify-center !rounded-full"
              type="primary"
              size="small"
              onClick={() => dispatch(increase(record))}
            />
            <span className="font-bold w-6 inline-block text-center">
              {quantity}
            </span>
            <Button
              icon={<MinusCircleOutlined />}
              className="w-full flex items-center justify-center !rounded-full"
              type="primary"
              size="small"
              onClick={() => {
                if (quantity === 1) {
                  if (
                    window.confirm("The product is going to remove from cart")
                  ) {
                    dispatch(decrease(record));
                    message.success("Product Removed From Cart");
                  }
                }
                if (quantity > 1) {
                  dispatch(decrease(record));
                }
              }}
            />
          </div>
        );
      },
    },
    {
      title: "Actions",
      render: (_, record) => {
        return (
          <Popconfirm
            title="Delete the product"
            description="Are you sure to delete this product?"
            onConfirm={() => confirm(record)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        );
      },
    },
  ];
  return (
    <>
      <Header />
      <div className="px-6">
        <Table
          dataSource={cartItems}
          columns={columns}
          bordered
          pagination={false}
          scroll={{
            x: 1200,
            y: 300,
          }}
        />
        <div className="cart-total flex justify-end mt-4">
          <Card className="w-72" bordered={false}>
            <div className="flex justify-between">
              <span>Sub Total</span>
              <span>{total.toFixed(2)}₺</span>
            </div>
            <div className="flex justify-between my-2">
              <span>VAT %8</span>
              <span className="text-red-600">{(total * tax) / 100}</span>
            </div>
            <div className="flex justify-between">
              <b>Total</b>
              <b>{(total + (total * tax) / 100).toFixed(2)}₺</b>
            </div>
            <Button
              onClick={setModalOpen}
              size="large"
              className="mt-4 w-full"
              type="primary"
              disabled={cartItems.length === 0}
            >
              Order
            </Button>
          </Card>
        </div>
      </div>
      {/* Modal */}
      <CreateBill isModalOpen={isModalOpen} setModalOpen={setModalOpen} />
      {/* Modal */}
    </>
  );
};

export default CartPage;
