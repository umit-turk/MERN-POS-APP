import { Button, Card, Table } from "antd";
import Header from "../components/header/Header";
import { useState } from "react";
import PrintBill from "../components/bills/PrintBill";
import { useEffect } from "react";

const InvoicesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [billItems, setBillItems] = useState([]);
  const [customer, setCustomer] = useState()
  

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
    },
    {
      title: "Phone number",
      dataIndex: "customerPhoneNumber",
      key: "customerPhoneNumber",
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
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (price) => {
        return <span>{price}₺</span>
      }
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
        />
      </div>
      {/* Modal */}
      <PrintBill customer={customer} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}  />
      {/* Modal */}
    </>
  );
};

export default InvoicesPage;
