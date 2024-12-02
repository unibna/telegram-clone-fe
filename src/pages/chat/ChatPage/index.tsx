import React, { useState } from "react";
import { Layout } from "antd";
import SideBar from "./SideBar";
import MainContent from "./MainContent";

const ChatPage: React.FC = () => {
  const [selectedContact, setSelectedContact] = useState<any>(null);
  const [selectedRoom, setSelectedRoom] = useState<any>(null);

  const handleContactClick = (contact: any) => {
    setSelectedContact(contact);
    setSelectedRoom(null); // Clear room selection
  };

  const handleRoomClick = (room: any) => {
    setSelectedRoom(room);
    setSelectedContact(null); // Clear contact selection
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SideBar
        onContactClick={handleContactClick}
        onRoomClick={handleRoomClick}
      />
      <MainContent
        selectedContact={selectedContact}
        selectedRoom={selectedRoom}
      />
    </Layout>
  );
};

export default ChatPage;
