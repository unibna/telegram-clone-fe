import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import { Flex, Layout, message } from "antd";

import { ChatInput, ChatMessages } from "../../../../components/chat";

import { RoomService, UserService } from "../../../../services";

const WEBSOCKET_APP_URL = process.env.REACT_APP_WEBSOCKET_APP_URL;

interface MainContentProps {
  selectedContact: any;
  selectedRoom: any;
}

const MainContent: React.FC<MainContentProps> = ({ selectedContact, selectedRoom }) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [messageValue, setMessageValue] = useState<string>("");

  const [status, setStatus] = useState('Disconnected');
  const wsRef = useRef<WebSocket | null>(null);

  const userInfo = useSelector((state: any) => state.user.userInfo);

  const handleSendMessageToRoom = () => { }

  const handleSendMessageToContact = () => {
    console.log("wsRef.current:", wsRef.current);
    console.log("selectedContact:", selectedContact);

    const wsDirectMessage = {
      type: 'direct',
      receiver_id: selectedContact.id,
      content: messageValue,
    };
    wsRef.current?.send(JSON.stringify(wsDirectMessage));

    const newMessage = {
      sender: "user",
      text: messageValue,
      timestamp: new Date(),
    }
    setMessages([...messages, newMessage])

    console.log("WebSocket sent:", wsDirectMessage);
    console.log("Message sent:", newMessage);

    setMessageValue("");
  }

  const handleSendMessage = () => {
    if (!messageValue.trim()) return;

    if (selectedContact) {
      handleSendMessageToContact();
    } else if (selectedRoom) {
      handleSendMessageToRoom();
    }
  };

  const handleLoadMessageToContact = async () => {
    try {
      const response = await UserService.getDirectMessages(selectedContact.id);
      console.log(response?.data);
      const directMessages = response?.data.map((message: any) => ({
        sender: message.sender_id === userInfo.ID ? "user" : "contact",
        text: message.content,
        timestamp: new Date(message.CreatedAt),
      }));
      setMessages(directMessages);
    } catch (error: any) {
      message.error(error?.response?.data?.message || "Failed to load messages");
    }
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

  const loadMessages = async () => {
    if (selectedContact) {
      await handleLoadMessageToContact();
    } else if (selectedRoom) {
      await handleLoadMessageToRoom();
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessageValue(e.target.value);
  };

  const handleWSReceiveMessage = async (event: MessageEvent) => {
    const eventData = JSON.parse(event.data);
    
    if (eventData.type !== 'direct') {
      return;
    }

    const { sender_id, content } = eventData;

    if (sender_id === selectedContact?.id) {
      const newMessage = {
        sender: "contact",
        text: content,
        timestamp: new Date(),
      };
      await loadMessages();
      setMessages([...messages, newMessage]);
    }
  }

  const handleWebSocketMessage = () => {
    const access_token = localStorage.getItem('access_token') || '';
    const socketUrl = WEBSOCKET_APP_URL + `?access_token=${access_token}`;
    wsRef.current = new WebSocket(socketUrl);

    console.log('WebSocket connecting...');
    console.log('WebSocket:', wsRef.current);

    wsRef.current.onopen = () => {
      console.log('WebSocket connected');

      // Start sending a ping message every 30 seconds to keep the connection alive
      const pingInterval = setInterval(() => {
        if (wsRef.current?.readyState === WebSocket.OPEN) {
          wsRef.current.send('ping');
          console.log('Ping sent to server');
        }
      }, 30000); // Every 30 seconds

      // Clear interval when connection is closed
      if (wsRef.current) {
        wsRef.current.onclose = () => {
          clearInterval(pingInterval);
          console.log('WebSocket disconnected');
        };
      }
    };

    wsRef.current.onmessage = (event) => {
      console.log('Received:', event.data);
      handleWSReceiveMessage(event);
    };

    wsRef.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    wsRef.current.onclose = () => {
      console.log('WebSocket disconnected');
    };

    // Cleanup on component unmount
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  };

  useEffect(() => {
    if (selectedContact || selectedRoom) {
      loadMessages();
    }
  }, [selectedContact, selectedRoom]);

  useEffect(() => {
    handleWebSocketMessage();
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
          <h2>#{selectedContact ? selectedContact.id : selectedRoom.id}</h2>
          <h2>-{selectedContact ? selectedContact.name : selectedRoom.name}</h2>
        </Flex>

        <ChatMessages messages={messages} />

        <ChatInput
          messageValue={messageValue}
          onInputChange={handleInputChange}
          onSendButtonClick={handleSendMessage}
        />
      </Flex>
    </Layout.Content>
  );
};

export default MainContent;
