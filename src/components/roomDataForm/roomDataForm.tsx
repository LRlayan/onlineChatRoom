import React, {Dispatch, SetStateAction} from "react";
import {Box, Flex, Text, TextField} from "@radix-ui/themes";
import ContactCard from "../contactCard/contactCard.tsx";
import {Contact} from "../../model/contact.ts";
import {getFullName} from "../../../util/getFullName.ts";

interface RoomDataFormProps {
    collapse: boolean;
    selectedValue: string;
    sizeTextField: string;
    setRoomName: (name: string) => void;
    setMembers: Dispatch<SetStateAction<Contact[]>>;
}

const contactDetails = [
    {firstName: "Amodh", lastName: "Nanditha", email: "amodh@gmail.com", bio: "Software", profile: ""},
    {firstName: "Kavindu", lastName: "Gayantha", email: "kavi@gmail.com", bio: "Software Dev", profile: ""},
    {firstName: "Tharusha", lastName: "Nethmina", email: "capa@gmail.com", bio: "Software Engineering", profile: ""},
    {firstName: "Nishan", lastName: "Tharuka", email: "nisha@gmail.com", bio: "Developer", profile: ""},
    {firstName: "Eranga", lastName: "Hasakalum", email: "era@gmail.com", bio: "fullstack dev", profile: ""},
    {firstName: "Saminda", lastName: "Fernando", email: "sami@gmail.com", bio: "Bekaray ", profile: ""},
    {firstName: "Sandul", lastName: "Rusara", email: "sandul@gmail.com", bio: "Hichchi guide", profile: ""},
];

const RoomDataForm: React.FC<RoomDataFormProps> = ({ collapse, selectedValue, sizeTextField, setRoomName, setMembers }) => {

    const handleContactCard = (contact: Contact) => {
        setMembers((prevMembers: Contact[]) => {
            if (!prevMembers.some((member) => member.email === contact.email)) {
                return [...prevMembers, contact];
            } else {
                return prevMembers.filter(member => member.email !== contact.email);
            }
        });
    };

    return(
        <>
            <Flex gapY={"1"} className="flex flex-col ml-0 bg-gray-500 bg-opacity-25 rounded-lg pr-5 pl-5 pt-0 pb-3 mr-4">
                <Flex align="center" className="items-center pr-0 pl-0 pt-3 rounded-lg">
                    <Flex direction="column" gap="1" maxWidth="300px">
                        <Text className="text-gray-400" style={{fontSize: "12px", font: "revert", textAlign: "start"}}>Room Name</Text>
                        <TextField.Root size="2" variant="soft" placeholder="room name" style={{ width: `${sizeTextField}`}}
                            onChange={(e) => setRoomName(e.target.value)}
                        />
                    </Flex>
                </Flex>
                <Text className="text-gray-400" style={{fontSize: "12px", font: "revert", textAlign: "start"}}>Select Contact</Text>
                <Box
                    style={{
                        height: "32.6vh",
                        overflowY: "auto",
                        overflowX: "hidden",
                        scrollBehavior: "smooth",
                        scrollbarWidth: "thin",
                        scrollbarColor: "#888 #333",
                    }}>
                    {contactDetails.map((contact, index) => {
                        const fullName = getFullName(contact.firstName, contact.lastName);

                        return (
                            <ContactCard
                                key={index}
                                collapse={collapse}
                                selectedSegment={selectedValue}
                                name={fullName}
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