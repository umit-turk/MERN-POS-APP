import {
  SearchOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  CopyOutlined,
  UserOutlined,
  BarChartOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Badge, Input, message } from "antd";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./index.css";

const Header = ({ setFiltered, categoryTitle }) => {
  const cart = useSelector((state) => state.cart);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const logOut = () => {
    if (window.confirm("Do you want to log out? Are you sure?")) {
      localStorage.removeItem("posUser");
      message.success("Logout successful");
      navigate("/login");
    }
  };

  const search = async (title) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/products/search?q=${title}&category=${categoryTitle}`
      );
      const data = await res.json();
      if (res.status === 200) {
        setFiltered(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="border-b mb-6">
      <header className="header py-4 px-6 flex justify-between items-center gap-10">
        <div className="logo">
          <Link to={"/"}>
            <h2 className="text-2xl font-bold md:text-4xl">LOGO</h2>
          </Link>
        </div>
        <div
          onClick={() => {
            pathname !== "/" && navigate("/");
          }}
          className="header-search flex-1 flex justify-center"
        >
          <Input
            size="large"
            placeholder="Search..."
            prefix={<SearchOutlined />}
            className="rounded-full max-w-[800px]"
            onChange={(e) => search(e.target.value.toLocaleLowerCase())}
          />
        </div>
        <div className="menu-links ">
          <Link to={"/"} className={`menu-link ${pathname === "/" && "active"}`}>
            <HomeOutlined className="md:text-2xl text-xl" />
            <span className="text-[10px] md:text-xs">Home</span>
          </Link>
          <Badge
            count={cart?.cartItems?.length}
            offset={[0, 0]}
            className="md:flex hidden"
          >
            <Link to={"/cart"} className={`menu-link ${pathname === "/cart" && "active"}`}>
              <ShoppingCartOutlined className="md:text-2xl text-xl" />
              <span className="text-[10px] md:text-xs">Cart</span>
            </Link>
          </Badge>
          <Link to={"/invoices"} className={`menu-link ${pathname === "/invoices" && "active"}`}>
            <CopyOutlined className="md:text-2xl text-xl" />
            <span className="text-[10px] md:text-xs">Invoices</span>
          </Link>
          <Link to={"/customers"} className={`menu-link ${pathname === "/customers" && "active"}`}>
            <UserOutlined className="md:text-2xl text-xl" />
            <span className="text-[10px] md:text-xs">Customers</span>
          </Link>
          <Link to={"/statistic"} className={`menu-link ${pathname === "/statistic" && "active"}`}>
            <BarChartOutlined className="md:text-2xl text-xl" />
            <span className="text-[10px] md:text-xs">Statistics</span>
          </Link>
          <div onClick={logOut}>
            <Link className={`menu-link`}>
              <LogoutOutlined className="md:text-2xl text-xl" />
              <span className="text-[10px] md:text-xs">Logout</span>
            </Link>
          </div>
        </div>
        <Badge
          count={cart?.cartItems?.length}
          offset={[0, 0]}
          className="md:hidden flex"
        >
          <Link to={"/cart"} className={`menu-link ${pathname === "/cart" && "active"}`}>
            <ShoppingCartOutlined className="text-2xl" />
            <span className="text-[10px] md:text-xs">Cart</span>
          </Link>
        </Badge>
      </header>
    </div>
  );
};

export default Header;
