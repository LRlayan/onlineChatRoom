import * as React from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined, } from '@ant-design/icons';
import { Button, Layout, theme } from 'antd';
import {useState} from "react";
import * as Tabs from "@radix-ui/react-tabs";
import {Box, Flex, Tooltip, IconButton, Dialog,} from "@radix-ui/themes";
import ChatCard from "./chatCard/chatCard.tsx";
import { MessageOutlined, TeamOutlined } from "@ant-design/icons";
import {ChatArea} from "../pages/chatArea.tsx";
import "@radix-ui/themes/styles.css";
import DropdownMenuSet from "./dropdownMenu/dropdownMenu.tsx";
import ProfileView from "./profileView/profileView.tsx";
import {PlusIcon} from "lucide-react";
import CreateChats from "./createChats/createChats.tsx";
import {useDispatch, useSelector} from "react-redux";
import {changeSegment, SegmentsRootState} from "../reducer/segments.ts";
import {AppDispatch} from "../store/store.ts";
import RoomDataForm from "./createChats/roomDataForm/roomDataForm.tsx";

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
    const selectSegment = useSelector((state: SegmentsRootState) => state.segment.segment);
    const isCollapse = useSelector((state: SegmentsRootState) => state.segment.collapse);
    const dispatch = useDispatch<AppDispatch>();
    const {
        token: {},
    } = theme.useToken();
    const [selectedCard, setSelectedCard] = useState<number | null>(null);
    const [showProfile, setShowProfile] = useState(false);
    const [showCreateRooms, setCreateRooms] = useState(false);

    const handleCardClick = (key: number) => {
        setSelectedCard(prev => prev === key ? null : key);
    };

    const handleCreateRoomBtn = () => {
        setCreateRooms(true);
        setShowProfile(false);
    }

    const handleCollapseBtn1 = () => {
        setCollapsed(true);
    }

    const handleCollapseBtn2= () => {
        setCollapsed(!collapsed);
        if (isCollapse) {
            dispatch(changeSegment({ segment: "New Rooms" , collapse: true}));
        }
    }

    const handleCollapseBtn3= () => {
        setCollapsed(!collapsed);
        if (isCollapse) {
            dispatch(changeSegment({ segment: "New Rooms" , collapse: true}));
        }
    }

    const handleModalCancelBtn = () => {
        dispatch(changeSegment({ segment: "New Contact", collapse: true}));
    }

    const handleModalSaveBtn = () => {
        dispatch(changeSegment({ segment: "New Contact", collapse: true}));
    }

    return (
            <Layout>
                <Sider trigger={null} collapsible collapsed={collapsed} width={388} collapsedWidth={120}
                       style={{
                           background: "#1f252e",
                       }}
                >
                    {!showProfile && !showCreateRooms ? (
                    <>
                        <div className="demo-logo-vertical" />
                        <DropdownMenuSet setShowProfile={setShowProfile} />
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
                                                .map((card, index) => (
                                                    <ChatCard
                                                        collapse={collapsed}
                                                        key={index} name={card.name}
                                                        date={card.date}
                                                        lastSeen={card.lastSeen}
                                                        msgStatus={card.msgStatus}
                                                        message={card.messages}
                                                        isSelected={selectedCard === index}
                                                        onClick={() => handleCardClick(index)}
                                                    />
                                                ))}
                                        </Tabs.Content>
                                    ))}
                                    <div className="absolute bottom-4 right-6" onClick={handleCreateRoomBtn}>
                                        <Tooltip content="Creat a Room">
                                            <IconButton radius="full" style={{ background: "#3392ff", width: "50px", height: "50px"}}>
                                                <PlusIcon size={24}/>
                                            </IconButton>
                                        </Tooltip>
                                    </div>
                                </Box>
                            </Tabs.Root>
                        </Flex>
                    </>
                    ) : !showCreateRooms && showProfile ? (
                        <ProfileView collapse={collapsed} setShowProfile={setShowProfile} />
                    ) : !showProfile && showCreateRooms ? (
                        <CreateChats collapse={collapsed} setShowCreateRooms={setCreateRooms}/>
                    ): ""}
                </Sider>
                <Layout style={{ background: "black" }}>
                    <Header style={{ padding: 0, background: "#313a47", }}>
                        { selectSegment === "New Rooms" && isCollapse ?
                            (
                                <Dialog.Root>
                                    <Dialog.Trigger>
                                        <Button
                                            type="text"
                                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                                            onClick={handleCollapseBtn1}
                                            style={{
                                                fontSize: '16px',
                                                width: 64,
                                                height: 64,
                                                color: "white",
                                            }}
                                        />
                                    </Dialog.Trigger>

                                    <Dialog.Content maxWidth="450px">
                                        <Dialog.Title>Create Rooms</Dialog.Title>
                                        <Dialog.Description size="2" mb="4">
                                            Fill the form for your room.
                                        </Dialog.Description>

                                        <RoomDataForm collapse={collapsed} selectedValue={selectSegment}/>

                                        <Flex gap="3" mt="4" justify="end">
                                            <Dialog.Close>
                                                <Button onClick={handleModalCancelBtn}>
                                                    Cancel
                                                </Button>
                                            </Dialog.Close>
                                            <Dialog.Close>
                                                <Button onClick={handleModalSaveBtn}>Save</Button>
                                            </Dialog.Close>
                                        </Flex>
                                    </Dialog.Content>
                                </Dialog.Root>

                            ) : selectSegment === "New Contact" && !isCollapse ? (
                                <Button
                                    type="text"
                                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                                    onClick={handleCollapseBtn2}
                                    style={{
                                        fontSize: '16px',
                                        width: 64,
                                        height: 64,
                                        color: "white",
                                    }}
                                />
                            ) : (
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={handleCollapseBtn3}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                            color: "white",
                        }}
                    />


                            )
                        }
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
                        <ChatArea/>
                    </Content>
                </Layout>
            </Layout>
    );
};

export default RootLayout;
