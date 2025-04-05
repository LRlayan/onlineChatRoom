import React, {Dispatch, SetStateAction, useEffect} from "react";
import {Box, Flex, Text, TextField} from "@radix-ui/themes";
import ContactCard from "../contactCard/contactCard.tsx";
import {Contact} from "../../model/contact.ts";
import {getFullName} from "../../../util/getFullName.ts";
import {AppDispatch} from "../../store/store.ts";
import {useDispatch, useSelector} from "react-redux";
import {ContactRootState, getAllContact} from "../../reducer/contactSlice.ts";

interface RoomDataFormProps {
    collapse: boolean;
    selectedValue: string;
    sizeTextField: string;
    setRoomName: (name: string) => void;
    setMembers: Dispatch<SetStateAction<Contact[]>>;
}

const RoomDataForm: React.FC<RoomDataFormProps> = ({ collapse, selectedValue, sizeTextField, setRoomName, setMembers }) => {

    const dispatch = useDispatch<AppDispatch>();
    const contacts = useSelector((state: ContactRootState) => state.contact.contacts) || [];

    useEffect(() => {
        dispatch(getAllContact());
    }, [dispatch]);

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
                    {contacts.map((contact, index) => {
                        const fullName = getFullName(contact.firstName, contact.lastName);

                        return (
                            <ContactCard
                                key={index}
                                collapse={collapse}
                                selectedSegment={selectedValue}
                                name={fullName}
                                bio={contact.bio}
                                profile={""}
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