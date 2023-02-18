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

const Header = () => {
  return (
    <div className="border-b mb-6">
      <header className="header py-4 px-6 flex justify-between items-center gap-10">
        <div className="logo">
          <a href="/">
            <h2 className="text-2xl font-bold md:text-4xl">LOGO</h2>
          </a>
        </div>
        <div className="header-search flex-1 flex justify-center">
          <Input
            size="large"
            placeholder="Search..."
            prefix={<SearchOutlined />}
            className="rounded-full max-w-[800px]"
          />
        </div>
        <div className="menu-links flex justify-between items-center gap-7 md:static fixed bottom-0 md:w-auto w-screen md:bg-transparent bg-white left-0 md:border-t-0 border-t md:px-0 px-4 py-1">
          <a
            href={"/"}
            className="menu-link flex flex-col transition-all hover:text-[#40a9ff]"
          >
            <HomeOutlined className="md:text-2xl text-xl" />
            <span className="text-[10px] md:text-xs">Home</span>
          </a>
          <Badge count={5} offset={[0, 6]} className="md:flex hidden">
            <a
              href={"/"}
              className="menu-link flex flex-col transition-all hover:text-[#40a9ff]"
            >
              <ShoppingCartOutlined className="md:text-2xl text-xl" />
              <span className="text-[10px] md:text-xs">Cart</span>
            </a>
          </Badge>

          <a
            href={"/"}
            className="menu-link flex flex-col transition-all hover:text-[#40a9ff]"
          >
            <CopyOutlined className="md:text-2xl text-xl" />
            <span className="text-[10px] md:text-xs">Invoices</span>
          </a>
          <a
            href={"/"}
            className="menu-link flex flex-col transition-all hover:text-[#40a9ff]"
          >
            <UserOutlined className="md:text-2xl text-xl" />
            <span className="text-[10px] md:text-xs">Customers</span>
          </a>
          <a
            href={"/"}
            className="menu-link flex flex-col transition-all hover:text-[#40a9ff]"
          >
            <BarChartOutlined className="md:text-2xl text-xl" />
            <span className="text-[10px] md:text-xs">Statistics</span>
          </a>
          <a
            href={"/"}
            className="menu-link flex flex-col transition-all hover:text-[#40a9ff]"
          >
            <LogoutOutlined className="md:text-2xl text-xl" />
            <span className="text-[10px] md:text-xs">Logout</span>
          </a>
        </div>
        <Badge count={5} offset={[0, 6]} className="md:hidden flex">
          <a
            href={"/"}
            className="menu-link flex flex-col transition-all hover:text-[#40a9ff]"
          >
            <ShoppingCartOutlined className="text-2xl" />
            <span className="text-[10px] md:text-xs">Cart</span>
          </a>
        </Badge>
      </header>
    </div>
  );
};

export default Header;
