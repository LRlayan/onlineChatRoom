import React from "react";
import { Avatar, Box, Card, Flex, Text } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { CheckOutlined } from '@ant-design/icons';

interface ChatCardProps{
    collapse: boolean;
    name: string;
    date: string;
    lastSeen: string;
    msgStatus: string;
    message: string;
}

const ChatCard: React.FC<ChatCardProps> = ({ collapse, name, date, lastSeen, msgStatus, message }) => {
    console.log(lastSeen);
    const getStatusIcon = (status: string) => {
        switch (status) {
            case "sent":
                return <CheckOutlined className="ml-4" style={{ fontSize: "13px", color: "gray" }} />;
            case "delivered":
                return (
                    <>
                        <Box className="flex ml-3">
                            <Flex gap="1" align="center">  {/* Reduced gap here */}
                                <CheckOutlined style={{ fontSize: "13px", marginRight: "-8px", color: "gray" }} />
                                <CheckOutlined style={{ fontSize: "13px", color: "gray" }} />
                            </Flex>
                        </Box>
                    </>
                )
            case "seen":
                return (
                    <>
                        <Box className="flex ml-3">
                            <Flex gap="1" align="center">  {/* Reduced gap here */}
                                <CheckOutlined className="text-blue-500" style={{ fontSize: "13px", marginRight: "-8px" }} />
                                <CheckOutlined className="text-blue-500" style={{ fontSize: "13px", }} />
                            </Flex>
                        </Box>
                    </>
                )
            default:
                return null;
        }
    };

    return (
        <Box width="395px" p="3">
            <Card size="3" style={{ padding: "16px" }}>
                <Flex gap="4" align="center">
                    { collapse ?
                        <Avatar size="6" fallback="T" color="cyan" className="mr-5 ml-0.5 text-3xl" style={{ borderRadius: "50%" }}/>
                        :
                        <>
                            <Avatar size="6" fallback="T" color="sky" className="mr-5 text-3xl" style={{ borderRadius: "50%" }}/>
                            <Box>
                                <Flex align="center" justify="between">
                                    <Text as="div" weight="bold" className="text-amber-50 max-w-96" style={{ fontSize: "16px" }}>
                                        {name}
                                    </Text>
                                    <Text as="div" weight="bold" className="text-amber-50" style={{ fontSize: "11px" }}>
                                        {date}
                                    </Text>
                                </Flex>

                                <Box>
                                    <Flex>
                                        <Text as="div" className="text-gray-400"
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
                    }
                </Flex>
            </Card>
        </Box>
    );
};

export default ChatCard;
