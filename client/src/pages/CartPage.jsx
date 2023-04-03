import { Button, Card, Input, Popconfirm, Space, Table, message } from "antd";
import Header from "../components/header/Header";
import CreateBill from "../components/cart/CreateBill";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  PlusCircleOutlined,
  MinusCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { decrease, deleteCart, increase } from "../redux/cartSlice";
import Highlighter from "react-highlight-words";

const CartPage = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { cartItems, total, tax } = useSelector((state) => state.cart);
  const [searchedColumn, setSearchedColumn] = useState("");
  const [searchText, setSearchText] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

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
      ...getColumnSearchProps("title"),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      ...getColumnSearchProps("category"),
    },
    {
      title: "Product Price",
      dataIndex: "price",
      key: "price",
      render: (price) => {
        return <span>{price.toFixed(2)}₺</span>;
      },
      sorter: (a, b) => a.price - b.price,
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
