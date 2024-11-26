import React, { useState } from "react";
import { Layout, Tabs, Input, List, Avatar, Button } from "antd";
import { UserOutlined, MessageOutlined, PlusOutlined, CommentOutlined } from "@ant-design/icons";
import classNames from "classnames";

import "./index.css";

const { TabPane } = Tabs;

interface Contact {
  id: string;
  name: string;
  avatar: string;
}

interface Chat {
  id: string;
  name: string;
  lastMessage: string;
}

interface SideBarProps {
  onContactClick: (contact: Contact) => void;
  onChatClick: (chat: Chat) => void;
}

const SideBar: React.FC<SideBarProps> = ({ onContactClick, onChatClick }) => {
  const [activeTab, setActiveTab] = useState("contacts");
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  const contacts: Contact[] = [
    { id: "1", name: "John Doe", avatar: "https://via.placeholder.com/40" },
    { id: "2", name: "Jane Smith", avatar: "https://via.placeholder.com/40" },
    { id: "3", name: "Alice", avatar: "https://via.placeholder.com/40" },
  ];

  const chats: Chat[] = [
    { id: "101", name: "Project Team", lastMessage: "Meeting at 3 PM" },
    { id: "102", name: "Jane Smith", lastMessage: "Thanks for the update!" },
    { id: "103", name: "John Doe", lastMessage: "Let’s catch up tomorrow." },
  ];

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  const handleContactClick = (contact: Contact) => {
    setSelectedContactId(contact.id);
    setSelectedChatId(null); // Deselect any selected chat
    onContactClick(contact);
  };

  const handleChatClick = (chat: Chat) => {
    setSelectedChatId(chat.id);
    setSelectedContactId(null); // Deselect any selected contact
    onChatClick(chat);
  };

  const renderTabButton = () => {
    if (activeTab === "contacts") {
      return <Button icon={<PlusOutlined />}>Add Contact</Button>;
    }
    if (activeTab === "chats") {
      return <Button icon={<CommentOutlined />}>New Chat</Button>;
    }
    return null;
  };

  return (
    <Layout.Sider width="30%" style={{ background: "#fff", borderRight: "1px solid #ddd" }}>
      <div className="tab-header">
        <h3>{activeTab === "contacts" ? "Contacts" : "Chats"}</h3>
        {renderTabButton()}
      </div>

      <Input.Search
        placeholder="Search..."
        allowClear
        style={{ margin: "16px 0" }}
        onSearch={(value) => console.log("Search:", value)}
      />

      <Tabs defaultActiveKey="contacts" onChange={handleTabChange} tabBarGutter={16}>
        <TabPane key="contacts" tab={<UserOutlined />}>
          <List
            itemLayout="horizontal"
            dataSource={contacts}
            renderItem={(item) => (
              <List.Item
                className={classNames("list-item", {
                  "list-item-selected": selectedContactId === item.id,
                })}
                onClick={() => handleContactClick(item)}
              >
                <List.Item.Meta avatar={<Avatar src={item.avatar} />} title={item.name} />
              </List.Item>
            )}
          />
        </TabPane>

        <TabPane key="chats" tab={<MessageOutlined />}>
          <List
            itemLayout="horizontal"
            dataSource={chats}
            renderItem={(item) => (
              <List.Item
                className={classNames("list-item", {
                  "list-item-selected": selectedChatId === item.id,
                })}
                onClick={() => handleChatClick(item)}
              >
                <List.Item.Meta
                  avatar={<Avatar icon={<UserOutlined />} />}
                  title={item.name}
                  description={item.lastMessage}
                />
              </List.Item>
            )}
          />
        </TabPane>
      </Tabs>
    </Layout.Sider>
  );
};

export default SideBar;
