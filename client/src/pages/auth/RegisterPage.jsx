import { Button, Carousel, Form, Input, message } from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthCarousel from "../../components/auth/AuthCarousel";

const RegisterPage = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const onFinish = async (values) => {
    setLoading(true)
    try {
     const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/auth/register`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      if(res.status === 200) {
        message.success("Registration successful")
        navigate("/login")
        setLoading(false)
      }

    } catch (error) {
      message.error("There are some errors")
      console.log(error);
    }
  };

  return (
    <div className="h-screen">
      <div className="flex justify-between h-full">
        <div className="xl:px-20 w-full px-10 flex flex-col h-full justify-center relative">
          <h1 className="text-center text-5xl font-bold mb-2">LOGO</h1>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="User Name"
              name={"username"}
              rules={[
                { required: true, message: "You have to enter user name" },
              ]}
            >
              <Input />
            </Form.Item>
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
            <Form.Item
              label="Retype password"
              dependencies={["password"]}
              name={"passwordAgain"}
              rules={[
                { required: true, message: "You have to retype password" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The two passwords that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                size="large"
                loading={loading}
              >
                Register
              </Button>
            </Form.Item>
          </Form>
          <div className="flex justify-center absolute left-0 bottom-10 right-0">
            Do you have an account?
            <Link className="text-blue-600" to={"/login"}>
              {" "}
              Login now
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

export default RegisterPage;
