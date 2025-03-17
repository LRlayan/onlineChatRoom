import React from "react";
import {Flex, Text, Card, Box, Avatar} from "@radix-ui/themes";
import {getFirstLetter} from "../../../util/splitName.ts";

interface ContactProps {
    name: string;
    bio: string;
    profile: string;
    onClick: () => void;
}

const ContactCard: React.FC<ContactProps> = ({ name, bio, profile, onClick }) => {

    const handleContactCard = () => {
        onClick();
    }

    return(
        <>
            <Box maxWidth="370px">
                <Card className="mb-1 hover:bg-gray-500" onClick={handleContactCard} style={{ cursor: 'pointer' }}>
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
            </Box>
        </>
    )
}

export default ContactCard;