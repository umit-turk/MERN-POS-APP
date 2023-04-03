import { Table } from "antd";
import Header from "../components/header/Header";
import { useEffect, useState } from "react";

const CustomerPage = () => {
  const [billItems, setBillItems] = useState([]);
  
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
  ];
  return (
    <>
      <Header />
      <div className="px-6">
        <h1 className="text-4xl font-bold text-center mb-4">Customers</h1>
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
    </>
  );
};

export default CustomerPage;
