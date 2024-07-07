import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Layout,
  Menu,
  Button,
  Row,
  Col,
  Typography,
  Form,
  Input,
  Switch,
  InputNumber,
  message,
} from "antd";
import { useUserLoginMutation } from "../redux/features/auth/authApi";
import { useEffect } from "react";
import { useGetUserQuery } from "../redux/features/user/userApi";
const { Title } = Typography;
const { Header, Footer, Content } = Layout;

const SignIn = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const { data, refetch: refetchBaseUser } = useGetUserQuery();

  const user = useSelector((state) => state?.user?.data);
  const token = useSelector((state) => state?.auth?.accessToken);
  const navigate = useNavigate();

  const [userLogin, { isSuccess: loginSuccess, error: loginError }] =
    useUserLoginMutation();

  const success = (message) => {
    messageApi.open({
      type: "success",
      content: message || "Success",
    });
  };

  const error = (message) => {
    messageApi.open({
      type: "error",
      content: message || "Error",
    });
  };

  const warning = (message) => {
    messageApi.open({
      type: "warning",
      content: message || "Warning",
    });
  };

  const onFinish = async (values) => {
    const data = {
      work_area: Number(values.work_area),
      password: values.password,
    };
    const response = await userLogin(data);

    if (response?.error) {
      error(response?.error?.data?.message);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    if (token) {
      // window.location.reload();
      refetchBaseUser();
      navigate("/");
    }
  }, [loginSuccess, token]);

  return (
    <>
      <Layout
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
          padding: "1rem",
        }}
        className="layout-default layout-signin"
      >
        {contextHolder}
        <div style={{ width: "80%" }}>
          <Title level={2} className="mb-15">
            User Login
          </Title>
          {/* <Title className="font-regular text-muted" level={5}>
              Enter your email and password to sign in
            </Title> */}
          <Form
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="vertical"
          >
            <Form.Item
              className="mobile"
              label="Mobile"
              name="mobile"
              rules={[
                {
                  required: true,
                  message: "Please input your mobile!",
                },
              ]}
            >
              <Input style={{ fontWeight: "400" }} placeholder="Mobile" />
            </Form.Item>

            <Form.Item
              className="username"
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input type='password' style={{ fontWeight: "400" }} placeholder="Password" />
            </Form.Item>

            {/* <Form.Item
                    name="remember"
                    className="aligin-center"
                    valuePropName="checked"
                  >
                    <Switch defaultChecked onChange={onChange} />
                    Remember me
                  </Form.Item> */}

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
              >
                LOGIN
              </Button>
            </Form.Item>
            {/* <p className="font-semibold text-muted">
                    Don't have an account?{" "}
                    <Link to="/sign-up" className="text-dark font-bold">
                      Sign Up
                    </Link>
                  </p> */}
          </Form>
        </div>
        <Footer>
          <p className="copyright"> Copyright © 2023 Impala Intech Limited</p>
        </Footer>
      </Layout>
    </>
  );
};

export default SignIn;
