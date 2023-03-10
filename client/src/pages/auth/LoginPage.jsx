import { Button, Carousel, Checkbox, Form, Input } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import AuthCarousel from "../../components/auth/AuthCarousel";

const LoginPage = () => {
  return (
    <div className="h-screen">
      <div className="flex justify-between h-full">
        <div className="xl:px-20 w-full px-10 flex flex-col h-full justify-center relative">
          <h1 className="text-center text-5xl font-bold mb-2">LOGO</h1>
          <Form layout="vertical">
            <Form.Item
              label="E-mail"
              name={"email"}
              rules={[{ required: true, message: "You have to enter email" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name={"password"}
              rules={[
                { required: true, message: "You have to enter password" },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item name={"remember"} valuePropName="checked">
                <div className="flex justify-between items-center">
                    <Checkbox>Remember me</Checkbox>
                    <Link>Forgot Password?</Link>
                </div>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                size="large"
              >
                Login
              </Button>
            </Form.Item>
          </Form>
          <div className="flex justify-center absolute left-0 bottom-10 right-0">
            Don't have an account?
            <Link className="text-blue-600" to={"/register"}>
              {" "}
              Register now
            </Link>{" "}
          </div>
        </div>
        <div className="xl:w-4/6 lg:w-3/5 md:w-1/2 md:flex hidden bg-[#6c63ff] h-full">
          <div className="w-full h-full flex items-center">
            <div className="w-full">
              <Carousel autoplay className="!h-full px-6">
                <AuthCarousel
                  img="/images/responsive.svg"
                  title="Responsive"
                  description="Compatible with all device sizes"
                />
                <AuthCarousel
                  img="/images/statistic.svg"
                  title="Statics"
                  description="Compatible with all device sizes"
                />
                <AuthCarousel
                  img="/images/customer.svg"
                  title="Customer Satisfaction"
                  description="Customers satisfied with the product at the end of the experience"
                />
                <AuthCarousel
                  img="/images/admin.svg"
                  title="Control Panel"
                  description="One-stop management"
                />
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
