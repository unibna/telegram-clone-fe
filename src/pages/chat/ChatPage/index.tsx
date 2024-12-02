import React, { useState } from "react";
import { Layout } from "antd";
import SideBar from "./SideBar";

const { Content } = Layout;

const ChatPage: React.FC = () => {
  const [selectedContact, setSelectedContact] = useState<any>(null);
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [selectedRoom, setSelectedRoom] = useState<any>(null);

  const handleContactClick = (contact: any) => {
    setSelectedContact(contact);
    setSelectedChat(null); // Clear chat selection
    setSelectedRoom(null); // Clear room selection
  };

  const handleChatClick = (chat: any) => {
    setSelectedChat(chat);
    setSelectedContact(null); // Clear contact selection
    setSelectedRoom(null); // Clear room selection
  };

  const handleRoomClick = (room: any) => {
    setSelectedRoom(room);
    setSelectedChat(null); // Clear chat selection
    setSelectedContact(null); // Clear contact selection
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SideBar
        onContactClick={handleContactClick}
        onChatClick={handleChatClick}
        onRoomClick={handleRoomClick}
      />

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
        {selectedRoom && (
          <div>
            <h2>Chat: {selectedRoom.name}</h2>
            <p>Description:: {selectedRoom.description}</p>
          </div>
        )}
        {!selectedContact && !selectedChat && !selectedRoom && <h2>Please select a contact or chat.</h2>}
      </Content>
    </Layout>
  );
};

export default ChatPage;
