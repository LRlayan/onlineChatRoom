import * as React from "react";
import { FiMenu } from "react-icons/fi";
import { Button, } from 'antd';
import { DropdownMenu} from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { User, Bookmark, Archive, Star, Settings, } from "lucide-react";

const DropdownMenuSet: React.FC<{ setShowProfile: (value: boolean) => void }> = ({ setShowProfile }) => {
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
                <Button
                    type="text"
                    icon={<FiMenu size={27} />}
                    style={{ fontSize: '16px', width: 64, height: 64, color: "white" }}
                />
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
                <DropdownMenu.Item onClick={() => setShowProfile(true)}>
                    <User className="w-4 h-4 mr-2" /> Profile
                </DropdownMenu.Item>
                <DropdownMenu.Item>
                    <Bookmark className="w-4 h-4 mr-2" /> Saved Message
                </DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item>
                    <Archive className="w-4 h-4 mr-2" /> Archive Chats
                </DropdownMenu.Item>
                <DropdownMenu.Item>
                    <Star className="w-4 h-4 mr-2" /> Add to favorites
                </DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item>
                    <Settings className="w-4 h-4 mr-2" /> Setting
                </DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    );
};

export default DropdownMenuSet;