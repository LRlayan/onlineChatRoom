import React from "react";
import {Box, Flex, Text, TextField} from "@radix-ui/themes";
import ContactCard from "../../contactCard/contactCard.tsx";

interface RoomDataFormProps {
    collapse: boolean;
    selectedValue: string;
}

const contactDetails = [
    {name: "Amodh", email: "amodh@gmail.com", bio: "Software", profile: ""},
    {name: "Kavindu", email: "kavi@gmail.com", bio: "Software Dev", profile: ""},
    {name: "Tharusha", email: "capa@gmail.com", bio: "Software Engineering", profile: ""},
    {name: "Nishan", email: "nisha@gmail.com", bio: "Developer", profile: ""},
    {name: "Eranga", email: "era@gmail.com", bio: "fullstack dev", profile: ""},
    {name: "Saminda", email: "sami@gmail.com", bio: "Bekaray ", profile: ""},
    {name: "Sandul", email: "sandul@gmail.com", bio: "Hichchi guide", profile: ""},
];

const RoomDataForm: React.FC<RoomDataFormProps> = ({ collapse, selectedValue }) => {

    const handleContactCard = (contact: {name: string, bio: string, profile: string}) => {
        console.log("Clicked on contact:", contact);
    }

    return(
        <>
            <Flex gapY={"1"} className="flex flex-col ml-0 bg-gray-500 bg-opacity-25 rounded-lg pr-5 pl-5 pt-0 pb-3 mr-4">
                <Flex align="center" className="items-center pr-0 pl-0 pt-3 rounded-lg">
                    <Flex direction="column" gap="1" maxWidth="300px">
                        <Text className="text-gray-400" style={{fontSize: "12px", font: "revert", textAlign: "start"}}>Room Name</Text>
                        <TextField.Root size="2" variant="soft" placeholder="room name" style={{ width: "250px" }} />
                    </Flex>
                </Flex>
                <Text className="text-gray-400" style={{fontSize: "12px", font: "revert", textAlign: "start"}}>Select Contact</Text>
                <Box
                    style={{
                        height: "39vh",
                        overflowY: "auto",
                        overflowX: "hidden",
                        scrollBehavior: "smooth",
                        scrollbarWidth: "thin",
                        scrollbarColor: "#888 #333",
                    }}>
                    {contactDetails.map((contact, index) => {
                        return (
                            <ContactCard
                                key={index}
                                collapse={collapse}
                                selectedSegment={selectedValue}
                                name={contact.name}
                                bio={contact.bio}
                                profile={contact.profile}
                                onClick={() => handleContactCard(contact)}
                            />
                        );
                    })}
                </Box>
            </Flex>
        </>
    )
}

export default RoomDataForm;