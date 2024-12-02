import React from "react";
import { List, Avatar, Flex } from "antd";

interface ChatMessageProps {
  messages: any[];
}

const renderRightMessage = (msg: any, index: number) => {
  return (
    <List.Item
      key={index}
      style={{
        display: "flex",
        justifyContent: "flex-end",
        marginBottom: "8px",
      }}
    >
      <Flex
        style={{
          backgroundColor: "#1890ff",
          color: "white",
          padding: "8px 16px",
          borderRadius: "16px",
          minWidth: "300px",
          maxWidth: "80%",
          width: "fit-content",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <List.Item.Meta
          title={msg.sender === "user" ? "You" : "Contact"}
          description={msg.text}
        />
      </Flex>

      <Avatar
        style={{
          marginLeft: "8px",
          backgroundColor: "#f1f1f1",
          color: "#1890ff",
        }}
      >
        {msg.sender === "user" ? "U" : "C"}
      </Avatar>
    </List.Item>
  );
};

const renderLeftMessage = (msg: any, index: number) => {
  return (
    <List.Item
      key={index}
      style={{
        display: "flex",
        justifyContent: "flex-start",
        marginBottom: "8px",
      }}
    >
      <Avatar
        style={{
          marginRight: "8px",
          backgroundColor: "#f1f1f1",
          color: "#1890ff",
        }}
      >
        {msg.sender === "contact" ? "C" : "U"}
      </Avatar>

      <Flex
        style={{
          backgroundColor: "#f1f1f1",
          color: "black",
          padding: "8px 16px",
          borderRadius: "16px",
          minWidth: "300px",
          maxWidth: "80%",
          width: "fit-content",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        }}
      >
        <List.Item.Meta
          title={msg.sender === "contact" ? "Contact" : "You"}
          description={msg.text}
        />
      </Flex>
    </List.Item>
  );
};

const renderMessage = (msg: any, index: number) => {
  return msg.sender === "user"
    ? renderRightMessage(msg, index)
    : renderLeftMessage(msg, index);
}

const ChatMessage: React.FC<ChatMessageProps> = ({ messages }) => {
  return (
    <Flex
      vertical
      style={{
        flex: 1,
        overflowY: "auto",
        flexDirection: "column-reverse",
        backgroundColor: "#fff",
        borderRadius: "8px",
        border: "1px solid #f0f0f0",
        padding: "16px",
      }}
    >
      <List
        dataSource={messages}
        renderItem={renderMessage}
        split={false}
      />
    </Flex>
  );
};

export default ChatMessage;
