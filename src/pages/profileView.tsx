import React, {useState} from "react";
import { ArrowLeft, Pencil } from "lucide-react";
import { Button, Upload } from "antd";
import {Flex, Text} from "@radix-ui/themes";
import type { GetProp, UploadFile, UploadProps } from 'antd';
import ImgCrop from 'antd-img-crop';
import { UserOutlined, IdcardOutlined, MailOutlined } from '@ant-design/icons';
import { DropdownMenu} from "@radix-ui/themes";

interface ProfileViewProps {
    setShowProfile: React.Dispatch<React.SetStateAction<boolean>>;
    collapse: boolean;
}

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const ProfileView: React.FC<ProfileViewProps> = ({ setShowProfile, collapse }) => {

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

    const handleArrowBtn = () => {
        setShowProfile(false);
    }

    const handleEditProfile = () => {}

    return (
        <>
            <div className="p-4 text-white">
                <Flex className="flex" style={{justifyContent: "space-between", alignItems: "center", width: "100%"}}>
                    <Button type="text" icon={<ArrowLeft/>} onClick={handleArrowBtn}
                            style={{fontSize: '20px', color: "white", alignSelf: "start"}}
                    />
                    <Text style={{fontSize: "24px", font: "icon", display: collapse ? 'none' : ''}}>Profile</Text>
                    <Button type="text" icon={<Pencil color="white"/>} onClick={handleEditProfile}/>
                </Flex>

                <Flex justify="center" align="center" className="flex flex-col mt-7 mb-7 text-center">
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
                    <Text className="mt-5 mb-1" style={{fontSize: "18px", font: "icon"}}>Ramesh</Text>
                    <Text className="text-gray-400" style={{fontSize: "12px", font: "icon"}}>online</Text>
                </Flex>

                <Flex gapY={"1"}
                      className="flex flex-col ml-0 bg-gray-500 bg-opacity-25 rounded-lg pr-5 pl-5 pt-3 pb-3">
                    <Flex align="center" className="items-center hover:bg-blue-400 hover:bg-opacity-25 p-3 rounded-lg">
                        <UserOutlined className="text-gray-400" style={{fontSize: "25px", marginRight: "12px"}}/>
                        <Flex className="flex flex-col ml-6" style={{display: collapse ? 'none' : ''}}>
                            <Text style={{fontSize: "18px", font: "icon"}}>rameshlayan</Text>
                            <Text className="mb-0 text-gray-400"
                                  style={{fontSize: "12px", font: "revert"}}>Username</Text>
                        </Flex>
                    </Flex>
                    <DropdownMenu.Separator/>
                    <Flex align="center" className="items-center hover:bg-blue-400 hover:bg-opacity-25 p-3 rounded-lg">
                        <IdcardOutlined className="text-gray-400" style={{fontSize: "25px", marginRight: "12px"}}/>
                        <Flex className="flex flex-col ml-6" style={{display: collapse ? 'none' : ''}}>
                            <Text style={{fontSize: "18px", font: "icon"}}>Ramesh Layan</Text>
                            <Text className="mb-0 text-gray-400" style={{fontSize: "12px", font: "revert"}}>Name</Text>
                        </Flex>
                    </Flex>
                    <DropdownMenu.Separator/>
                    <Flex align="center" className="items-center hover:bg-blue-400 hover:bg-opacity-25 p-3 rounded-lg">
                        <MailOutlined className="text-gray-400" style={{fontSize: "25px", marginRight: "12px"}}/>
                        <Flex className="flex flex-col ml-6" style={{display: collapse ? 'none' : ''}}>
                            <Text style={{fontSize: "18px", font: "icon"}}>rameshlayan4@gmail.com</Text>
                            <Text className="text-gray-400" style={{fontSize: "12px", font: "revert"}}>Email</Text>
                        </Flex>
                    </Flex>
                </Flex>
                <Button className="mt-3 bg-red-700 border-0 shadow-md text-white w-full">Logout</Button>
            </div>
        </>
    );
};

export default ProfileView;
