import React, {useState} from "react";
import {Flex, Text, Card, Box, Avatar, Tooltip} from "@radix-ui/themes";
import {getFirstLetter} from "../../../util/splitName.ts";

interface ContactProps {
    collapse: boolean;
    selectedSegment: string;
    name: string;
    bio: string;
    profile: string;
    onClick: () => void;
}

const ContactCard: React.FC<ContactProps> = ({collapse, selectedSegment, name, bio, profile, onClick}) => {
    const [isSelected, setSelected] = useState(false);
    const [count, setCount] = useState(0);

    const handleContactCard = () => {
        onClick();
        if (selectedSegment === "New Rooms") {
            setSelected(!isSelected);
            if (count === 0) {
                setCount(1);
            } else {
                setCount(0);
            }
        }
    }

    return (
        <>
            <Box maxWidth="370px">
                {collapse ? (
                    <Tooltip content={name}>
                        <Card
                            className="mb-1 hover:bg-gray-500"
                            onClick={handleContactCard}
                            style={{cursor: 'pointer'}}
                        >
                            <Flex gap="4" align="center">
                                <Avatar
                                    size="3"
                                    src={profile}
                                    radius="full"
                                    fallback={getFirstLetter(name)}
                                    style={{marginLeft: collapse ? "6px" : ""}}
                                />
                            </Flex>
                        </Card>
                    </Tooltip>
                ) : (
                    <Card
                        className={`mb-1 hover:bg-gray-500 ${isSelected && count === 1 ? "border-2 border-cyan-300" : "border-0"}`}
                        onClick={handleContactCard}
                        style={{cursor: 'pointer'}}
                    >
                        <Flex gap="4" align="center">
                            <Avatar
                                size="3"
                                src={profile}
                                radius="full"
                                fallback={getFirstLetter(name)}
                            />
                            <Box>
                                <Text as="div" size="2" weight="bold">
                                    {name}
                                </Text>
                                <Text as="div" size="2" color="gray">
                                    {bio}
                                </Text>
                            </Box>
                        </Flex>
                    </Card>
                )}
            </Box>
        </>
    )
}

export default ContactCard;