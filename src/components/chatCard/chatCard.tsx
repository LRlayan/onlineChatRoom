import React from "react";
import { Avatar, Box, Card, Flex, Text } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";

interface ChatCardProps{
    collapse: boolean;
}

const ChatCard: React.FC<ChatCardProps> = ({ collapse }) => {
    return (
        <Box width="500px" p="3">
            <Card size="3" style={{ padding: "16px" }}> {/* ✅ Add padding here */}
                <Flex gap="4" align="center">
                    { collapse ?
                        <Avatar size="6" fallback="T" color="indigo" className="mr-5 ml-0.5 text-3xl" style={{ borderRadius: "50%" }}/>
                        :
                        <>
                            <Avatar size="6" fallback="T" color="indigo" className="mr-5 text-3xl" style={{ borderRadius: "50%" }}/>
                            <Box>
                                <Text as="div" weight="bold">
                                    Ramesh Layan
                                </Text>
                                <Text as="div" color="blue">
                                    Engineering
                                </Text>
                            </Box>
                        </>
                    }
                </Flex>
            </Card>
        </Box>
    );
};

export default ChatCard;
