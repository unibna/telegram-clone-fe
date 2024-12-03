import React from "react";

import { Button, Input, Flex } from "antd";

interface ChatInputProps {
  messageValue: string;
  onInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSendButtonClick: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({
  messageValue,
  onInputChange,
  onSendButtonClick,
}) => {
  return (
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
        onChange={onInputChange}
        style={{
          marginRight: "8px",
          resize: "none",
          maxHeight: "100px",
          width: "100%",
        }}
      />
      <Button type="primary" onClick={onSendButtonClick} disabled={!messageValue.trim()}>
        Send
      </Button>
    </Flex>
  );
}

export default ChatInput;
