import * as React from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined, } from '@ant-design/icons';
import { FiMenu } from "react-icons/fi";
import { Button, Layout, Menu, theme } from 'antd';
import {useState} from "react";
import * as Tabs from "@radix-ui/react-tabs";
import {Box, Flex} from "@radix-ui/themes";
import ChatCard from "./chatCard/chatCard.tsx";

const { Header, Sider, Content } = Layout;

const chatDetails = [
    {}
];


const RootLayout: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: {},
    } = theme.useToken();

    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed} width={388} collapsedWidth={120} style={{ background: "#1f252e" }}>
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
                <Flex direction="column" className="gap-4 pb-2 justify-center">
                    <Tabs.Root defaultValue="allChats">
                        <Tabs.List className="text-white border-b border-gray-700">
                            <Tabs.Trigger value="allChats" className="px-4 py-2 border-b-2 border-transparent hover:border-gray-500 data-[state=active]:border-cyan-500">All Chats</Tabs.Trigger>
                            <Tabs.Trigger value="Groups" className="px-4 py-2 border-b-2 border-transparent hover:border-gray-500 data-[state=active]:border-cyan-500">Groups</Tabs.Trigger>
                        </Tabs.List>

                        <Box pt="3">
                            {["allChats", "Groups"].map((category) => (
                                <Tabs.Content key={category} value={category}>
                                    {collapsed ? <ChatCard collapse={collapsed}/> : <ChatCard collapse={collapsed}/>
                                    }
                                </Tabs.Content>
                            ))}
                        </Box>
                    </Tabs.Root>
                </Flex>
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
