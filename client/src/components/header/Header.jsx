import {
  SearchOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  CopyOutlined,
  UserOutlined,
  BarChartOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Badge, Input } from "antd";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./index.css"

const Header = () => {
  const cart = useSelector((state) => state.cart)
  return (
    <div className="border-b mb-6">
      <header className="header py-4 px-6 flex justify-between items-center gap-10">
        <div className="logo">
          <Link to={"/"}>
            <h2 className="text-2xl font-bold md:text-4xl">LOGO</h2>
          </Link>
        </div>
        <div className="header-search flex-1 flex justify-center">
          <Input
            size="large"
            placeholder="Search..."
            prefix={<SearchOutlined />}
            className="rounded-full max-w-[800px]"
          />
        </div>
        <div className="menu-links ">
          <Link
            to={"/"}
            className="menu-link "
          >
            <HomeOutlined className="md:text-2xl text-xl" />
            <span className="text-[10px] md:text-xs">Home</span>
          </Link>
          <Badge count={cart.cartItems.length} offset={[0, 0]} className="md:flex hidden">
            <Link
              to={"/cart"}
              className="menu-link "
            >
              <ShoppingCartOutlined className="md:text-2xl text-xl" />
              <span className="text-[10px] md:text-xs">Cart</span>
            </Link>
          </Badge>
          <Link
            to={"/invoices"}
            className="menu-link "
          >
            <CopyOutlined className="md:text-2xl text-xl" />
            <span className="text-[10px] md:text-xs">Invoices</span>
          </Link>
          <Link
            to={"/customers"}
            className="menu-link "
          >
            <UserOutlined className="md:text-2xl text-xl" />
            <span className="text-[10px] md:text-xs">Customers</span>
          </Link>
          <Link
            to={"/statistic"}
            className="menu-link "
          >
            <BarChartOutlined className="md:text-2xl text-xl" />
            <span className="text-[10px] md:text-xs">Statistics</span>
          </Link>
          <Link
            to={"/"}
            className="menu-link "
          >
            <LogoutOutlined className="md:text-2xl text-xl" />
            <span className="text-[10px] md:text-xs">Logout</span>
          </Link>
        </div>
        <Badge count={cart.cartItems.length} offset={[0, 0]} className="md:hidden flex">
          <Link
            to={"/"}
            className="menu-link "
          >
            <ShoppingCartOutlined className="text-2xl" />
            <span className="text-[10px] md:text-xs">Cart</span>
          </Link>
        </Badge>
      </header>
    </div>
  );
};

export default Header;
