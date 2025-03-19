import React, {useEffect, useState} from "react";
import {ArrowLeft} from "lucide-react";
import {Button, type GetProp, Upload, type UploadFile, type UploadProps} from "antd";
import {Dialog, Flex, Text, TextField,} from "@radix-ui/themes";
import ImgCrop from "antd-img-crop";
import {PhoneOutlined, UsergroupAddOutlined, ContactsOutlined,} from '@ant-design/icons';
import { Segmented } from 'antd';
import ContactCard from "../components/contactCard/contactCard.tsx";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../store/store.ts";
import {changeSegment} from "../reducer/segmentsSlice.ts";
import RoomDataForm from "../components/roomDataForm/roomDataForm.tsx";
import {getFullName} from "../../util/getFullName.ts";
import {Contact} from "../model/contact.ts";

interface CreateRoomsProps {
    collapse: boolean;
    setShowCreateRooms: React.Dispatch<React.SetStateAction<boolean>>;
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

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const CreateChats: React.FC<CreateRoomsProps> = ({ setShowCreateRooms, collapse }) => {
    const [selectedValue, setSelectedValue] = useState("New Contact");
    const dispatch = useDispatch<AppDispatch>();
    const [roomName, setRoomName] = useState("");
    const [memberList, setMemberList] = useState<Contact[]>([]);

    useEffect(() => {
        if (selectedValue === "New Rooms") {
            dispatch(changeSegment({ segment: "New Rooms" , collapse: true}));
        } else if (collapse === false && selectedValue === "New Contact") {
            dispatch(changeSegment({ segment: "New Contact", collapse: false }));
        }
    }, [selectedValue]);

    const handleArrowBtn = () => {
        setShowCreateRooms(false);
        dispatch(changeSegment({ segment: "", collapse: false }));
    }

    const [fileList, setFileList] = useState<UploadFile[]>([
        {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: '',
        },
    ]);

    const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    const onPreview = async (file: UploadFile) => {
        let src = file.url as string;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj as FileType);
                reader.onload = () => resolve(reader.result as string);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };

    const handleBeforeUpload = (file: any) => {
        console.log(file);
        return true;
    };

    const handleAddContact = () => {
        return true;
    }

    const handleSegmentChange = (value: string) => {
        setSelectedValue(value);
    }

    const handleContactCard = (contact: Contact) => {
        setMemberList((prevMembers: Contact[]) => {
            if (!prevMembers.some((member) => member.email === contact.email)) {
                return [...prevMembers, contact];
            } else {
                return prevMembers.filter(member => member.email !== contact.email);
            }
        });
    }

    const handleModalCancelBtn = () => {}

    const handleAddTOContactModalSaveBtn = () => {

    }

    const handleCreateRoomBtn = () => {
        console.log("trigger button")
        console.log(memberList);
        console.log(roomName);
    }

    return(
        <>
            <div className="pl-4 pt-4 text-white">
                <Flex className="flex pr-" style={{justifyContent: "space-between", alignItems: "center", width: "100%"}}>
                    <Button type="text" icon={<ArrowLeft/>} onClick={handleArrowBtn}
                            style={{fontSize: '20px', color: "white", alignSelf: "start"}}
                    />
                    <Text style={{fontSize: "24px", font: "icon", display: collapse ? 'none' : ''}}>New Chat</Text>
                    <Dialog.Root>
                        <Dialog.Trigger>
                                <Button type="text" icon={<PhoneOutlined color="white" className="text-amber-50 mr-8" style={{ fontSize: "25px" }}/>}
                                        onClick={handleAddContact}
                                />
                        </Dialog.Trigger>

                        <Dialog.Content maxWidth="450px">
                            <Dialog.Title>Add to new contact</Dialog.Title>
                            <Dialog.Description size="2" mb="4">
                                Fill the form for new contact.
                            </Dialog.Description>

                            <Flex gapY={"1"} className="flex flex-col ml-0 bg-gray-500 bg-opacity-25 rounded-lg pr-5 pl-5 pt-0 pb-4">
                                <Flex align="center" className="items-center pr-0 pl-0 pt-3 rounded-lg">
                                    <Flex direction="column" gap="1" maxWidth="300px">
                                        <Text className="text-gray-400" style={{fontSize: "12px", font: "revert", textAlign: "start"}}>First Name</Text>
                                        <TextField.Root size="2" variant="soft" placeholder="room name" style={{ width: "360px", }} />
                                        <Text className="text-gray-400" style={{fontSize: "12px", font: "revert", textAlign: "start"}}>Last Name</Text>
                                        <TextField.Root size="2" variant="soft" placeholder="room name" style={{ width: "360px" }} />
                                        <Text className="text-gray-400" style={{fontSize: "12px", font: "revert", textAlign: "start"}}>Email</Text>
                                        <TextField.Root size="2" variant="soft" placeholder="room name" style={{ width: "360px" }} />
                                    </Flex>
                                </Flex>
                            </Flex>

                            <Flex gap="3" mt="4" justify="end">
                                <Dialog.Close>
                                    <Button className="bg-blue-500 bg-opacity-70 hover:bg-blue-300 text-amber-50" onClick={handleModalCancelBtn}>
                                        Cancel
                                    </Button>
                                </Dialog.Close>
                                <Dialog.Close>
                                    <Button className="bg-blue-500 bg-opacity-70 hover:bg-blue-300 text-amber-50" onClick={handleAddTOContactModalSaveBtn}>Save</Button>
                                </Dialog.Close>
                            </Flex>
                        </Dialog.Content>
                    </Dialog.Root>
                </Flex>
                <Flex justify="center" align="center" className="flex flex-col mt-5 mb-7 text-center">
                    <Segmented
                        className="bg-blue-500 bg-opacity-75 mb-3"
                        onChange={handleSegmentChange}
                        value={selectedValue}
                        options={[
                            {
                                label: collapse ? <ContactsOutlined /> : 'New Contact',
                                value: 'New Contact',
                                icon: collapse ? undefined : <ContactsOutlined />
                            },
                            {
                                label: collapse ? <UsergroupAddOutlined /> : 'New Rooms',
                                value: 'New Rooms',
                                icon: collapse ? undefined : <UsergroupAddOutlined />
                            },
                        ]}
                        style={{ marginRight: collapse ? "19px" : "17px" }}
                    />
                    {selectedValue === "New Rooms" ? (
                        <>
                            <Flex align="center" className="mr-4 mb-3">
                                <ImgCrop rotationSlider>
                                    <Upload
                                        action="http://localhost:3000/upload-image"
                                        listType="picture-circle"
                                        fileList={fileList}
                                        onChange={onChange}
                                        onPreview={onPreview}
                                        beforeUpload={handleBeforeUpload}
                                        className="text-blue-500"
                                    >
                                        {fileList.length < 1 && '+ Upload'}
                                    </Upload>
                                </ImgCrop>
                            </Flex>
                            { !collapse &&
                                <RoomDataForm
                                    collapse={collapse}
                                    setRoomName={setRoomName}
                                    setMembers={setMemberList}
                                    selectedValue={selectedValue}
                                    sizeTextField={"250px"}/>
                            }
                            <Flex justify="end" style={{ width: "290px", marginRight: "14px", display: collapse ? "none" : "block" }}>
                                <Button
                                    type="text"
                                    className="text-amber-50 bg-blue-500 hover:!text-white hover:!bg-blue-400 mt-2 w-full"
                                    onClick={handleCreateRoomBtn}
                                >
                                    Create Room
                                </Button>
                            </Flex>
                        </>
                    ) : (
                            <div className="w-full pr-4" style={{
                                height: "74vh",
                                overflowY: "auto",
                                overflowX: "hidden",
                                scrollBehavior: "smooth",
                                scrollbarWidth: "thin",
                                scrollbarColor: "#888 #333",
                            }}
                            >
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
                            </div>
                        )
                    }
                </Flex>
            </div>
        </>
    )
}

export default CreateChats;