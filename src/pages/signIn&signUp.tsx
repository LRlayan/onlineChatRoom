import React, {useState} from "react";
import {Text, TextField} from "@radix-ui/themes";
import { Input, Button, Checkbox, Form, FormProps } from "antd";
import {useDispatch} from "react-redux";
import AnchorTag from "../components/anchor-tag/AnchorTag.tsx";
import {AppDispatch} from "../store/store.ts";
import {Heading1} from "../components/heading/Heading.tsx";

type FieldType = {
    username?: string;
    password?: string;
    email?: string;
    remember?: string;
};

const SignInSignUp: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [isSignUp, setIsSignUp] = useState(false);
    const [registerUsername, setRegisterUsername] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");

    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const handleUser = () => {
        if (isSignUp) {
            // const newUser = new User(registerUsername,registerEmail,registerPassword);
            // return dispatch(register(newUser));
        }
        // const user: User = { username: loginUsername, email: "", password: loginPassword };
        // dispatch(login(user));
    };


    const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
        console.log("Success:", values);
    };

    const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <>
            <div className="relative w-screen h-screen flex items-center justify-center">
                {/* Background Shape */}
                <div
                    className="bg-white bg-opacity-100 absolute top-0 w-full"
                    style={{
                        height: "100vh",
                        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                    }}
                ></div>
                <div
                    className="bg-gray-900 absolute bottom-0 w-full"
                    style={{
                        height: "100vh",
                        clipPath: "polygon(0 60%, 100% 30%, 100% 100%, 0 100%)",
                    }}
                ></div>

                {/* Sign In Form */}
                <div className="relative z-10 bg-white p-8 rounded-lg shadow-[0_2px_12px_rgba(0,0,0,0.2)] shadow-gray-200" style={{width: "480px"}}>
                    <Heading1 name={isSignUp ? "Sign Up" : "Sign In"} classes={"text-blue-950 text-center mb-8 font-bold text-2xl"} />
                    <Form
                        name="basic"
                        labelCol={{ span: 10 }}
                        wrapperCol={{ span: 20 }}
                        style={{ width: "100%" }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        {/* Username Field */}
                        <Form.Item<FieldType>
                            label="Username"
                            name="username"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            rules={[{ required: true, message: "Please input your username!" }]}
                            style={{ marginBottom: "3px" }}
                        >
                            <Input className="bg-blue-500 bg-opacity-20 border-0" onChange={
                                isSignUp
                                    ? (e) => setRegisterUsername(e.target.value)
                                    : (e) => setLoginUsername(e.target.value)}/>
                        </Form.Item>

                        {/* Email Field (Only for Sign Up) */}
                        {isSignUp && (
                            <Form.Item<FieldType>
                                label="Email"
                                name="email"
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                rules={[{ required: true, message: "Please input your username!" }]}
                                style={{ marginBottom: "3px" }}
                            >
                                <Input className="bg-blue-500 bg-opacity-20 border-0" onChange={(e) => setRegisterEmail(e.target.value)}/>
                            </Form.Item>

                        )}

                        {/* Password Field */}
                        <Form.Item<FieldType>
                            label="Password"
                            name="password"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            rules={[{ required: true, message: "Please input your password!" }]}
                            style={{ marginBottom: "3px" }}
                        >
                            <Input.Password className="bg-blue-500 bg-opacity-20 border-0" onChange={
                                isSignUp
                                    ? (e) => setRegisterPassword(e.target.value)
                                    : (e) => setLoginPassword(e.target.value)}/>
                        </Form.Item>

                        {/* Forgot Password (Only for Sign In) */}
                        {!isSignUp && (
                            <AnchorTag href="/forgot-password" name={"Forgot password?"} classes={"text-blue-500 mb-2 text-right hover:underline block"} />
                        )}

                        {/* Remember Me Checkbox (Only for Sign In) */}
                        {!isSignUp && (
                            <Form.Item<FieldType>
                                name="remember" valuePropName="checked"
                                className={"text-center"}
                                label={null}
                                wrapperCol={{ span: 24, offset: 0 }}>
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>
                        )}

                        <Form.Item
                            label={null}
                            wrapperCol={{ span: 24, offset: 0 }}
                            className="flex justify-center"
                            style={{ marginTop: "24px" }}
                        >
                            <Button type="primary" className="bg-blue-700 w-full max-w-sm px-20" htmlType="button" onClick={handleUser}>
                                {isSignUp ? "Sign Up" : "Sign In"}
                            </Button>
                        </Form.Item>

                        {/* Toggle Between Sign In & Sign Up */}
                        <div className="text-center mt-4 pr-3 pl-3">
                            {isSignUp ? (
                                <p>
                                    Already have an account?{" "}
                                    <AnchorTag name={"Sign In"} href={"#"} classes={"text-blue-500 hover:underline"} onClick={() => setIsSignUp(false)} />
                                </p>
                            ) : (
                                <p>
                                    Don't have an account?{" "}
                                    <AnchorTag name={"Sign Up"} href={"#"} classes={"text-blue-500 hover:underline"} onClick={() => setIsSignUp(true)} />
                                </p>
                            )}
                        </div>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default SignInSignUp;