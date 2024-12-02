import React, { useState, useEffect } from "react";

import { Button, Flex, Input, Layout } from "antd";

import { ChatMessage } from "../../../../components/chat";

interface MainContentProps {
  selectedContact: any;
  selectedRoom: any;
}

const MainContent: React.FC<MainContentProps> = ({ selectedContact, selectedRoom }) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState<string>("");

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      sender: "user",
      text: message,
      timestamp: new Date(),
    };
    setMessages([...messages, newMessage]);
    setMessage("");
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
      fetchMessages();
    }
  }, [selectedContact, selectedRoom]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  if (!selectedContact && !selectedRoom) {
    return (
      <Flex>
        <h2>Please select a contact or chat.</h2>
      </Flex>
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
            value={message}
            onChange={handleInputChange}
            style={{
              marginRight: "8px",
              resize: "none",
              maxHeight: "100px",
              width: "100%",
            }}
          />
          <Button type="primary" onClick={handleSendMessage} disabled={!message.trim()}>
            Send
          </Button>
        </Flex>
      </Flex>
    </Layout.Content>
  );
};

export default MainContent;
