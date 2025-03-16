import * as React from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined, } from '@ant-design/icons';
import { FiMenu } from "react-icons/fi";
import { Button, Layout, theme } from 'antd';
import {useState} from "react";
import * as Tabs from "@radix-ui/react-tabs";
import {Box, Flex} from "@radix-ui/themes";
import ChatCard from "./chatCard/chatCard.tsx";
import { MessageOutlined, TeamOutlined } from "@ant-design/icons";

const { Header, Sider, Content } = Layout;

const chatDetails = [
    {name:"Ramesh Layan", date: "2025-03-16", lastSeen: "7.53 am", msgStatus: "seen", messages: "ado mokada karanne ada ban set wemuda rata. 1500k dammanam athi. ado mokada karanne ada ban set wemuda rata. 1500k dammanam athi. ado mokada karanne ada ban set wemuda rata. 1500k dammanam athi.", category: "Groups"},
    {name:"Gotabaya", date: "2025-03-16", lastSeen: "7.53 am", msgStatus: "delivered", messages: "ado mokada karanne ada ban set wemuda rata. 1500k dammanam athi.", category: ""},
    {name:"Anura Sahodaraya", date: "2025-03-16", lastSeen: "7.53 am", msgStatus: "sent", messages: "ado mokada karanne ada ban set wemuda rata. 1500k dammanam athi.", category: ""},
    {name:"Samare", date: "2025-03-16", lastSeen: "7.53 am", msgStatus: "seen", messages: "ado mokada karanne ada ban set wemuda rata. 1500k dammanam athi.", category: "Groups"},
    {name:"Samare", date: "2025-03-16", lastSeen: "7.53 am", msgStatus: "seen", messages: "ado mokada karanne ada ban set wemuda rata. 1500k dammanam athi.", category: "Groups"},
    {name:"Samare", date: "2025-03-16", lastSeen: "7.53 am", msgStatus: "seen", messages: "ado mokada karanne ada ban set wemuda rata. 1500k dammanam athi.", category: "Groups"},
];


const RootLayout: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: {},
    } = theme.useToken();

    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed} width={388} collapsedWidth={120}
                   style={{
                       background: "#1f252e",
                   }}
            >
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
                <Flex direction="column" className="gap-4 justify-center">
                    <Tabs.Root defaultValue="allChats">
                        <Tabs.List className="text-white border-b border-gray-700 flex items-center overflow-x-hidden">
                            <Tabs.Trigger value="allChats" className={`px-4 py-2 border-b-2 border-transparent hover:border-gray-500 data-[state=active]:border-cyan-500 flex items-center ${collapsed ? "justify-center" : ""}`}>
                                <MessageOutlined style={{ fontSize: "20px", color: "gray" }} />
                                {!collapsed && <span className="ml-2">All Chats</span>}
                            </Tabs.Trigger>

                            <Tabs.Trigger value="Groups" className={`px-4 py-2 border-b-2 border-transparent hover:border-gray-500 data-[state=active]:border-cyan-500 flex items-center ${collapsed ? "justify-center" : ""}`}>
                                <TeamOutlined style={{ fontSize: "20px", color: "gray" }} />
                                {!collapsed && <span className="ml-2">Groups</span>}
                            </Tabs.Trigger>
                        </Tabs.List>

                        <Box pt="3" style={{
                            height: "82.6vh",
                            overflowY: "auto",
                            overflowX: "hidden",
                            scrollBehavior: "smooth",
                            scrollbarWidth: "thin",
                            scrollbarColor: "#888 #333",
                        }}>
                            {["allChats", "Groups"].map((category) => (
                                <Tabs.Content key={category} value={category}>
                                    {chatDetails.filter((data) => category === "allChats" || data.category === category)
                                        .map((card) => (
                                            <ChatCard collapse={collapsed} name={card.name} date={card.date} lastSeen={card.lastSeen} msgStatus={card.msgStatus} message={card.messages}/>
                                        ))}
                                </Tabs.Content>
                            ))}
                        </Box>
                    </Tabs.Root>
                </Flex>
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
