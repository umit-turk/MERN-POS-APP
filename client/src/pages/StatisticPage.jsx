import { useEffect, useState } from "react";
import Header from "../components/header/Header";
import StatisticCard from "../components/statistics/StatisticCard";
import { Area, Pie } from "@ant-design/plots";
import { Spin } from "antd";
const StatisticPage = () => {
  const [data, setData] = useState();
  const [products, setProducts] = useState([]);
  const user = JSON.parse(localStorage.getItem("posUser"));
  
  useEffect(() => {
    asyncFetch();
    getProducts();
  }, []);

  const asyncFetch = () => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/invoices/get-all`)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log("fetch data failed", error);
      });
  };

  const getProducts = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/products/get-all`);
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const config = {
    data: data,
    xField: "customerName",
    yField: "subTotal",
    xAxis: {
      range: [0, 1],
    },
  };

  const config2 = {
    appendPadding: 10,
    data: data,
    angleField: "subTotal",
    colorField: "customerName",
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: "inner",
      offset: "-50%",
      content: "{value}",
      style: {
        textAlign: "center",
        fontSize: 14,
      },
    },
    interactions: [
      {
        type: "element-selected",
      },
      {
        type: "element-active",
      },
    ],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: "pre-wrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
        content: "Total\nValue",
      },
    },
  };

  const totalAmount = () => {
    const amount = data.reduce((total, item) => item.total + total, 0);
    return amount.toFixed(2);
  };

  return (
    <>
      <Header />
      <h1 className="text-4xl font-bold text-center mb-4">Statistics</h1>
      {data ? (
        <div className="px-6 md:pb-0 pb-20">
          <div className="statistic-section">
            <h2 className="text-xl">
              Welcome{" "}
              <span className="text-green-700 font-bold text-xl">
                {user?.username}
              </span>
            </h2>
            <div className="statistic-cards grid xl:grid-cols-4 md:grid-cols-2 my-10 md:gap-10 gap-4">
              <StatisticCard
                title={"Total Customer"}
                amount={data?.length}
                img={"https://picsum.photos/200/300"}
              />
              <StatisticCard
                title={"Total Earnings"}
                amount={totalAmount() + "₺"}
                img={"https://picsum.photos/201/300"}
              />
              <StatisticCard
                title={"Sum of Sales"}
                amount={data?.length}
                img={"https://picsum.photos/202/300"}
              />
              <StatisticCard
                title={"Total Product"}
                amount={products?.length}
                img={"https://picsum.photos/205/300"}
              />
            </div>
            <div className="flex justify-between gap-10 lg:flex-row flex-col items-center">
              <div className="lg:w-1/2 lg:h-80 h-72">
                <Area {...config} />
              </div>
              <div className="lg:w-1/2 lg:h-80 h-72">
                <Pie {...config2} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Spin
          size="large"
          className="absolute top-1/2 w-screen h-screen flex justify-center"
        />
      )}
    </>
  );
};

export default StatisticPage;
