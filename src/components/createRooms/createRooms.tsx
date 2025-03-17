import React, {useState} from "react";
import {ArrowLeft} from "lucide-react";
import {Button, type GetProp, Upload, type UploadFile, type UploadProps} from "antd";
import {Flex, Text, Tooltip} from "@radix-ui/themes";
import ImgCrop from "antd-img-crop";
import { AppstoreOutlined, BarsOutlined, PhoneOutlined } from '@ant-design/icons';
import { Segmented } from 'antd';
import ContactCard from "../contactCard/contactCard.tsx";

interface CreateRoomsProps {
    collapse: boolean;
    setShowCreateRooms: React.Dispatch<React.SetStateAction<boolean>>;
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

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const CreateRooms: React.FC<CreateRoomsProps> = ({ setShowCreateRooms, collapse }) => {

    const [selectedValue, setSelectedValue] = useState("New Contact");

    const handleArrowBtn = () => {
        setShowCreateRooms(false);
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

    const handleContactCard = (contact: {name: string, bio: string, profile: string}) => {
        console.log("Clicked on contact:", contact);
    }

    return(
        <>
            <div className="pl-4 pt-4 text-white">
                <Flex className="flex pr-4" style={{justifyContent: "space-between", alignItems: "center", width: "100%"}}>
                    <Button type="text" icon={<ArrowLeft/>} onClick={handleArrowBtn}
                            style={{fontSize: '20px', color: "white", alignSelf: "start"}}
                    />
                    <Text style={{fontSize: "24px", font: "icon", display: collapse ? 'none' : ''}}>New Chat</Text>
                    <Tooltip content="Add To Contact">
                        <Button type="text" icon={<PhoneOutlined color="white" className="text-amber-50" style={{ fontSize: "25px" }}/>} onClick={handleAddContact}/>
                    </Tooltip>
                </Flex>
                <Flex justify="center" align="center" className="flex flex-col mt-7 mb-7 text-center">
                    <Segmented className="bg-blue-500 bg-opacity-75 mb-5"
                        onChange={handleSegmentChange}
                        value={selectedValue}
                        options={[
                            { label: 'New Contact', value: 'New Contact', icon: <BarsOutlined /> },
                            { label: 'New Rooms', value: 'New Rooms', icon: <AppstoreOutlined /> },
                        ]}
                    />
                    {selectedValue === "New Rooms" ? (
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
                                {contactDetails.map((contact) => {
                                    return (
                                        <ContactCard
                                            key={contact.name}
                                            name={contact.name}
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

export default CreateRooms;