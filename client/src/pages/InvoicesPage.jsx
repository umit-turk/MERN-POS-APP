import { Button, Card, Input, Space, Table } from "antd";
import Header from "../components/header/Header";
import { useRef, useState } from "react";
import PrintBill from "../components/bills/PrintBill";
import { useEffect } from "react";
import Highlighter from "react-highlight-words";
import {
  SearchOutlined,
} from "@ant-design/icons";

const InvoicesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [billItems, setBillItems] = useState([]);
  const [customer, setCustomer] = useState()
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

  

  useEffect(() => {
   getBills();
  },[])
  
  const getBills = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/invoices/get-all");
      const data = await res.json();
      setBillItems(data);
    } catch (error) {
      console.log(error)
    }
  }

  const setModalOpen = (record) => {
    setIsModalOpen((prev) => !prev);
    setCustomer(record)
  };

  const columns = [
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
      ...getColumnSearchProps("customerName")
    },
    {
      title: "Phone number",
      dataIndex: "customerPhoneNumber",
      key: "customerPhoneNumber",
      ...getColumnSearchProps("customerPhoneNumber")
    },
    {
      title: "Created Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => {
        return <span>{date.substring(0,10)}</span>
      }
    },
    {
      title: "Payment Mode",
      dataIndex: "paymentMode",
      key: "paymentMode",
      ...getColumnSearchProps("paymentMode")
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (price) => {
        return <span>{price}₺</span>
      },
      sorter: (a, b) => a.total - b.total,
    },
    {
      title: "Actions",
      dataIndex: "action",
      key: "action",
      render: (_,record) => {
        return <Button type="link" className="pl-0" onClick={ () => {
          setIsModalOpen((prev) => !prev);
          setCustomer(record)
        }} >Print</Button>
      }
    },
  ];
  return (
    <>
      <Header />
      <div className="px-6">
        <h1 className="text-4xl font-bold text-center mb-4">Invoices</h1>
        <Table
          dataSource={billItems}
          columns={columns}
          bordered
          pagination={false}
          scroll={{
            x:1000,
            y:300
          }}
          rowKey={"_id"}
        />
      </div>
      {/* Modal */}
      <PrintBill customer={customer} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}  />
      {/* Modal */}
    </>
  );
};

export default InvoicesPage;
