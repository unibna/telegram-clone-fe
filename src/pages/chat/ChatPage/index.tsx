import React, { useState } from "react";
import { Layout } from "antd";
import SideBar from "./SideBar";

const { Content } = Layout;

const ChatPage: React.FC = () => {
  const [selectedContact, setSelectedContact] = useState<any>(null);
  const [selectedChat, setSelectedChat] = useState<any>(null);

  const handleContactClick = (contact: any) => {
    setSelectedContact(contact);
    setSelectedChat(null); // Clear chat selection
  };

  const handleChatClick = (chat: any) => {
    setSelectedChat(chat);
    setSelectedContact(null); // Clear contact selection
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SideBar onContactClick={handleContactClick} onChatClick={handleChatClick} />

      <Content style={{ padding: "16px", background: "#f5f5f5" }}>
        {selectedContact && (
          <div>
            <h2>Contact: {selectedContact.name}</h2>
            <p>Chat functionality with {selectedContact.name} will go here...</p>
          </div>
        )}
        {selectedChat && (
          <div>
            <h2>Chat: {selectedChat.name}</h2>
            <p>Last message: {selectedChat.lastMessage}</p>
          </div>
        )}
        {!selectedContact && !selectedChat && <h2>Please select a contact or chat.</h2>}
      </Content>
    </Layout>
  );
};

export default ChatPage;
