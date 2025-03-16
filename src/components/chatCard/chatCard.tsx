import React from "react";
import {Avatar, Box, Card, DropdownMenu, Flex, Text} from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { CheckOutlined, EllipsisOutlined } from '@ant-design/icons';
import { theme } from 'antd';
import "@radix-ui/themes/styles.css";
import {Archive, Bookmark, Star, } from "lucide-react";

interface ChatCardProps {
    collapse: boolean;
    name: string;
    date: string;
    lastSeen: string;
    msgStatus: string;
    message: string;
    isSelected: boolean;
    onClick: () => void;
}

const ChatCard: React.FC<ChatCardProps> = ({ collapse, name, date, lastSeen, msgStatus, message, isSelected, onClick }) => {

    const {
        token: {},
    } = theme.useToken();

    const getFirstLetter = (name: string): string => name.charAt(0).toUpperCase();

    const handleClick = () => {
        onClick();
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "sent":
                return <CheckOutlined className="ml-4" style={{ fontSize: "13px", color: "gray" }} />;
            case "delivered":
                return (
                    <Box className="flex ml-3">
                        <Flex gap="1" align="center">
                            <CheckOutlined style={{ fontSize: "13px", marginRight: "-11px", color: "gray" }} />
                            <CheckOutlined style={{ fontSize: "13px", color: "gray" }} />
                        </Flex>
                    </Box>
                );
            case "seen":
                return (
                    <Box className="flex ml-3">
                        <Flex gap="1" align="center">
                            <CheckOutlined className="text-blue-500" style={{ fontSize: "13px", marginRight: "-11px" }} />
                            <CheckOutlined className="text-blue-500" style={{ fontSize: "13px" }} />
                        </Flex>
                    </Box>
                );
            default:
                return null;
        }
    };

    return (
        <Box width="378px" pb="1">
            <Card
                size="3"
                className={`cursor-pointer ${isSelected ? "bg-gray-700" : "hover:bg-gray-500 hover:bg-opacity-20"}`}
                style={{ borderRadius: "10px", padding: "0 10px 16px 16px" }}
                onClick={handleClick}
            >
                <DropdownMenu.Root>
                    <DropdownMenu.Trigger>
                        <Flex justify="end" align="center">
                            <EllipsisOutlined style={{ fontSize: "18px" }} />
                        </Flex>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content align="end" sideOffset={5}>
                        <DropdownMenu.Item>
                            <Bookmark className="w-4 h-4 mr-2" /> Saved Message
                        </DropdownMenu.Item>
                        <DropdownMenu.Separator />
                        <DropdownMenu.Item>
                            <Archive className="w-4 h-4 mr-2" /> Archive Chats
                        </DropdownMenu.Item>
                        <DropdownMenu.Item>
                            <Star className="w-4 h-4 mr-2" /> Add to favorites
                        </DropdownMenu.Item>
                        <DropdownMenu.Separator />
                        <DropdownMenu.Item shortcut="⌘ ⌫" color="red">
                            Delete
                        </DropdownMenu.Item>
                    </DropdownMenu.Content>
                </DropdownMenu.Root>
                <Flex align="center" style={{ padding: "0", margin: "0 0 2px 0" }}>

                    {collapse ? (
                        <Avatar
                            size="6"
                            fallback={getFirstLetter(name)}
                            color="sky"
                            className="mr-2 ml-0.5 text-3xl"
                            style={{ borderRadius: "50%" }}
                        />
                    ) : (
                        <>
                            <Avatar
                                size="6"
                                fallback={getFirstLetter(name)}
                                color="sky"
                                className="mr-2 text-3xl"
                                style={{ borderRadius: "50%" }}
                            />
                            <Box>
                                <Flex align="center" justify="between">
                                    <Text
                                        as="div"
                                        weight="bold"
                                        className="text-amber-50 max-w-96"
                                        style={{ fontSize: "16px" }}
                                    >
                                        {name}
                                    </Text>
                                    <Text
                                        as="div"
                                        weight="bold"
                                        className="text-amber-50"
                                        style={{ fontSize: "11px" }}
                                    >
                                        {date}
                                    </Text>
                                </Flex>

                                <Box>
                                    <Flex>
                                        <Text
                                            as="div"
                                            className="text-gray-400"
                                            style={{
                                                width: "220px",
                                                whiteSpace: "nowrap",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                            }}
                                        >
                                            {message}
                                        </Text>
                                        {getStatusIcon(msgStatus)}
                                    </Flex>
                                </Box>
                            </Box>
                        </>
                    )}
                </Flex>
            </Card>
        </Box>
    );
};

export default ChatCard;
