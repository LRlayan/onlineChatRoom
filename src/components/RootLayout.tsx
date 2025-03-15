import * as React from "react";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { FiMenu } from "react-icons/fi";
import { Button, Layout, Menu, theme } from 'antd';
import {useState} from "react";

const { Header, Sider, Content } = Layout;

const RootLayout: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: {},
    } = theme.useToken();

    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed} width={388} style={{ background: "#1f252e" }}>
                <div className="demo-logo-vertical" />
                <Button
                    type="text"
                    icon={<FiMenu size={27}/>}
                    style={{
                        fontSize: '16px',
                        width: 64,
                        height: 64,
                        color: "white",
                    }}
                />
                <Menu
                    theme="dark"
                    mode="vertical"
                    defaultSelectedKeys={['1']}
                    style={{ background: "#1f252e" }}
                    items={[
                        {
                            key: '1',
                            icon: <UserOutlined />,
                            label: 'nav 1',
                        },
                        {
                            key: '2',
                            icon: <VideoCameraOutlined />,
                            label: 'nav 2',
                        },
                        {
                            key: '3',
                            icon: <UploadOutlined />,
                            label: 'nav 3',
                        },
                    ]}
                />
            </Sider>
            <Layout style={{ background: "black" }}>
                <Header style={{ padding: 0, background: "#313a47", }}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                            color: "white",
                        }}
                    />
                </Header>
                <Content
                    style={{
                        margin: '',
                        padding: 24,
                        minHeight: 535,
                        backgroundImage: "url('/skulls.png')",
                        backgroundSize: "initial",
                        backgroundPosition: "center",
                        backgroundRepeat: "",
                    }}
                >
                    Content
                </Content>
            </Layout>
        </Layout>
    );
};

export default RootLayout;
