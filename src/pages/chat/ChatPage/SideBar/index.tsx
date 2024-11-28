import React, { useState } from "react";
import { Layout, Tabs, Input, List, Avatar, Button, Flex, Divider } from "antd";
import { UserOutlined, MessageOutlined, UserAddOutlined, CommentOutlined } from "@ant-design/icons";
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
      return <Button shape="circle" icon={<UserAddOutlined />} />;
    }
    if (activeTab === "chats") {
      return <Button shape="circle" icon={<CommentOutlined />} />;
    }
    return null;
  };

  return (
    <Layout.Sider width="25vw" style={{ background: "#fff", borderRight: "1px solid #ddd" }}>
      <Flex
        vertical
        style={{
          height: "100%",
          overflowY: "auto",
          borderRight: "1px solid #ddd",
          padding: "16px",
        }}
      >
        <Flex
          className="side-bar-header"
          justify="space-between"
          align="center"
        >
          <h3 style={{ flex: 1, textAlign: 'center', margin: 0 }}>
            {activeTab === "contacts" ? "Contacts" : "Chats"}
          </h3>
          <div style={{ marginLeft: 'auto' }}>
            {renderTabButton()}
          </div>
        </Flex>

        <Divider />

        <Input.Search
          placeholder="Search..."
          allowClear
          onSearch={(value) => console.log("Search:", value)}
          style={{ margin: "8px" }}
        />

        <Divider />
        
        <Tabs
          defaultActiveKey="contacts"
          onChange={handleTabChange}
          tabBarGutter={16}
        >
          <TabPane key="contacts" tab={
            <Flex style={{ width: "10vw" }} justify="center">
              <Button shape="circle" icon={<UserOutlined />} />
            </Flex>
          }>
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

          <TabPane key="chats" tab={
            <Flex style={{ width: "10vw" }} justify="center">
              <Button shape="circle" icon={<MessageOutlined />} />
            </Flex>
          }>
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
      </Flex>
    </Layout.Sider>
  );
};

export default SideBar;
