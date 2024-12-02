import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { Button, Flex, Input, Layout, message } from "antd";

import { ChatMessage } from "../../../../components/chat";

import { RoomService } from "../../../../services";

interface MainContentProps {
  selectedContact: any;
  selectedRoom: any;
}

const MainContent: React.FC<MainContentProps> = ({ selectedContact, selectedRoom }) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [messageValue, setMessageValue] = useState<string>("");

  const userInfo = useSelector((state: any) => state.user.userInfo);

  const handleSendMessageToRoom = () => { }

  const handleSendMessageToContact = () => { }

  const handleSendMessage = () => {
    if (!messageValue.trim()) return;

    const newMessage = {
      sender: "user",
      text: message,
      timestamp: new Date(),
    };
    setMessages([...messages, newMessage]);
    setMessageValue("");
  };

  const handleLoadMessageToContact = () => {
    setMessages([]);
  }

  const handleLoadMessageToRoom = async () => {
    try {
      const response = await RoomService.listRoomMessages(selectedRoom.id);
      console.log(response?.data);
      
      const responseMessages = response?.data.map((message: any) => ({
        sender: message.user_id === userInfo.ID ? "user" : "contact",
        text: message.content,
        timestamp: new Date(message.CreatedAt),
      }));
  
      console.log("responseMessages:", responseMessages);
  
      setMessages(responseMessages);
    } catch (error: any) {
      // Ensure that the error is converted to a string if it's an object
      const errorMessage = error instanceof Error ? error.message : error || "Failed to load messages";
      message.error(errorMessage);
    }
  };

  const loadMessages = () => {
    if (selectedContact) {
      handleLoadMessageToContact();
    } else if (selectedRoom) {
      handleLoadMessageToRoom();
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessageValue(e.target.value);
  };

  useEffect(() => {
    const fetchMessages = () => {
      setMessages([
        { sender: "user", text: "Hello, how are you?", timestamp: new Date() },
        { sender: "contact", text: "I'm fine, thanks!", timestamp: new Date() },
        { sender: "user", text: "What have you been up to?", timestamp: new Date() },
        { sender: "contact", text: "Just working on some projects. How about you?", timestamp: new Date() },
      ]);
    };

    if (selectedContact || selectedRoom) {
      loadMessages();
    }
  }, [selectedContact, selectedRoom]);

  if (!selectedContact && !selectedRoom) {
    return (
      <Layout.Content>
        <Flex
          className="chat-content"
          style={{
            padding: "16px",
            height: "100%",
            width: "100%",
          }}
        >
          <h2>Please select a contact or room.</h2>
        </Flex>
      </Layout.Content>
    )
  }

  return (
    <Layout.Content>
      <Flex
        vertical
        className="chat-content"
        style={{
          padding: "16px",
          height: "100%",
          width: "100%",
          overflowY: "auto",
        }}
      >
        <Flex
          className="chat-title"
          style={{
            backgroundColor: "#fff",
            marginBottom: "8px",
            padding: "4px 8px",
            borderRadius: "8px",
          }}
        >
          <h2>{selectedContact ? selectedContact.name : selectedRoom.name}</h2>
        </Flex>

        <ChatMessage messages={messages} />

        <Flex
          className="chat-input"
          style={{
            paddingTop: "8px",
            display: "flex",
            alignItems: "center",
            marginTop: "auto",
          }}
        >
          <Input.TextArea
            rows={2}
            placeholder="Type a message..."
            value={messageValue}
            onChange={handleInputChange}
            style={{
              marginRight: "8px",
              resize: "none",
              maxHeight: "100px",
              width: "100%",
            }}
          />
          <Button type="primary" onClick={handleSendMessage} disabled={!messageValue.trim()}>
            Send
          </Button>
        </Flex>
      </Flex>
    </Layout.Content>
  );
};

export default MainContent;
