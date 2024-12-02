import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  Layout, Tabs, Input, List, Avatar,
  Button, Modal, Flex, Divider, message
} from "antd";
import {
  UserOutlined, UserAddOutlined,
  UsergroupAddOutlined, CommentOutlined,
  LogoutOutlined
} from "@ant-design/icons";
import classNames from "classnames";

import { ContactService, RoomService, UserService } from "../../../../services"
import "./index.css";

const { TabPane } = Tabs;

interface Contact {
  id: number;
  name: string;
  email?: string;
  avatar?: string;
}

interface Room {
  id: number;
  name: string;
  description: string;
}

interface SideBarProps {
  onContactClick: (contact: Contact) => void;
  onRoomClick: (room: Room) => void;
}

const defaultRoomData = { name: "", description: "" };

const SideBar: React.FC<SideBarProps> = ({
  onContactClick,
  onRoomClick
}) => {
  const navigate = useNavigate();

  const userInfo = useSelector((state: any) => state.user.userInfo);

  const [activeTab, setActiveTab] = useState("contacts");
  const [selectedContactId, setSelectedContactId] = useState<number | null>(null);
  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalName, setModalName] = useState("");

  const [newRoomData, setNewRoomData] = useState(defaultRoomData);
  const [rooms, setRooms] = useState<Room[]>([]);

  const [contacts, setContacts] = useState<Contact[]>([])
  const [selectedAddContactId, setSelectedAddContactId] = useState<number | null>(null);
  
  const [userContacts, setUserContacts] = useState<Contact[]>([])

  const handleTabChange = (key: string) => {
    setActiveTab(key);

    if (key === "rooms") {
      handleListRooms(); // Fetch rooms when the "Rooms" tab is opened
    }
  };

  const handleContactClick = (contact: Contact) => {
    setSelectedContactId(contact.id);
    setSelectedRoomId(null); // Deselect any selected room
    onContactClick(contact);
  };

  const handleRoomClick = (room: Room) => {
    setSelectedRoomId(room.id);
    setSelectedContactId(null);
    onRoomClick(room);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth/login");
  };

  const handleListUserContacts = async () => {
    try {
      const response = await ContactService.listUserContacts();

      response.data = response.data.map((contact: any) => {
        return {
          id: contact.user_id,
          name: contact.user_name,
        };
      });

      setUserContacts(response.data);
    } catch (error: any) {
      console.error("Failed to list user contacts:", error);
      message.error(error.response?.data?.message || "Failed to list user contacts.");
    }
  }

  const handleListRooms = async () => {
    try {
      const response = await RoomService.listUserRooms();

      response.data = response.data.map((room: any) => {
        return {
          id: room.ID,
          name: room.name,
          description: room.description,
        };
      });

      setRooms(response.data);
    } catch (error: any) {
      console.error("Failed to list rooms:", error);
      message.error(error.response?.data?.message || "Failed to list rooms.");
    }
  };

  const handleJoinRoom = async (roomId: number, isSilent: boolean = false) => {
    try {
      const response = await RoomService.join(roomId);
      if (!isSilent) {
        message.success(`Joined room successfully!`);
      }
    } catch (error: any) {
      message.error(error.response?.data?.message || "Failed to join room.");
    }
  }

  const handleCreateRoom = async () => {
    if (!newRoomData.name.trim()) {
      message.error("Room name cannot be empty.");
      return;
    }

    try {
      const response = await RoomService.create({
        name: newRoomData.name,
        description: newRoomData.description
      });
      await handleJoinRoom(response.data.ID, true);
      message.success(`Room '${newRoomData.name}' created successfully!`);
      setIsModalVisible(false);
      setNewRoomData(defaultRoomData);
      await handleListRooms();
    } catch (error: any) {
      message.error(error.response?.data?.message || "Failed to create room.");
    }
  };

  const handleAddContactButton = () => {
    setIsModalVisible(true); // Show the modal
    setModalName("contact");
  }

  const handleListContacts = async (keyword: string) => {
    try {
      const response = await ContactService.listContacts(keyword);

      console.log("response.data:", response.data);

      response.data = response.data.map((contact: any) => {
        return {
          id: contact.ID,
          name: contact.username,
          email: contact.email,
        };
      });

      setContacts(response.data);
    } catch (error: any) {
      console.error("Failed to list user contacts:", error);
      message.error(error.response?.data?.message || "Failed to list user contacts.");
    }
  }

  const handleSelectAddContactId = async (contact: Contact) => {
    setSelectedAddContactId(contact.id);
  }

  const handleAddContact = async () => {
    if (!selectedAddContactId) {
      message.error("Please select a contact to add.");
      return;
    }

    try {
      const response = await ContactService.addContact(userInfo.ID, selectedAddContactId);
      console.log("response.data:", response.data);
      message.success(`Contact added successfully!`);
      setIsModalVisible(false);
      setSelectedAddContactId(null);
      await handleListUserContacts();
    } catch (error: any) {
      message.error(error.response?.data?.message || "Failed to add contact.");
    }
  }

  const handleAddRoomButton = () => {
    setIsModalVisible(true); // Show the modal
    setModalName("room");
  };

  const renderTabButton = () => {
    if (activeTab === "contacts") {
      return <Button shape="circle" icon={<UserAddOutlined />} onClick={handleAddContactButton} />;
    }
    if (activeTab === "rooms") {
      return <Button shape="circle" icon={<UsergroupAddOutlined />} onClick={handleAddRoomButton} />;
    }
    return null;
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setNewRoomData(defaultRoomData);
  };

  useEffect(() => {
    handleListUserContacts();
    handleListRooms();
  }, []);

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
        <Flex className="side-bar-header" justify="space-between" align="center">
          <div style={{ marginRight: "auto" }}>
            <Button
              shape="circle"
              icon={<LogoutOutlined style={{ transform: "rotate(180deg)" }} />}
              onClick={handleLogout}
            />
          </div>
          <h3 style={{ flex: 1, textAlign: "center", margin: 0 }}>
            {activeTab === "contacts"
              ? "Contacts"
              : activeTab === "chats"
                ? "Chats"
                : "Rooms"}
          </h3>
          <div style={{ marginLeft: "auto" }}>{renderTabButton()}</div>
        </Flex>

        <Divider />

        <Input.Search
          placeholder="Search..."
          allowClear
          onSearch={(value) => console.log("Search:", value)}
          style={{ margin: "8px" }}
        />

        <Divider />

        <Tabs defaultActiveKey="contacts" onChange={handleTabChange} tabBarGutter={16}>
          {/* Contacts Tab */}
          <TabPane key="contacts" tab="Contacts">
            <List
              itemLayout="horizontal"
              dataSource={userContacts}
              renderItem={(item) => (
                <List.Item
                  className={classNames("list-item", {
                    "list-item-selected": selectedContactId === item.id,
                  })}
                  onClick={() => handleContactClick(item)}
                >
                  <List.Item.Meta avatar={<Avatar>{item.name.charAt(0).toUpperCase()}</Avatar>} title={item.name} />
                </List.Item>
              )}
            />
          </TabPane>

          {/* Chats Tab */}
          <TabPane key="rooms" tab="Rooms">
            <List
              itemLayout="horizontal"
              dataSource={rooms}
              renderItem={(item) => (
                <List.Item
                  className={classNames("list-item", {
                    "list-item-selected": selectedRoomId === item.id,
                  })}
                  onClick={() => handleRoomClick(item)}
                >
                  <List.Item.Meta
                    avatar={<Avatar>{item.name.charAt(0).toUpperCase()}</Avatar>}
                    title={item.name}
                    description={item.description}
                  />
                </List.Item>
              )}
            />
          </TabPane>
        </Tabs>

        <Flex
          className="side-bar-footer"
          style={{
            paddingTop: "8px",
            borderTop: "1px solid #ddd",
            display: "flex",
            alignItems: "center",
            marginTop: "auto",
          }}
        >
          <Avatar>{userInfo.username.charAt(0).toUpperCase()}</Avatar>
          <div style={{ marginLeft: "12px" }}>
            <h4 style={{ margin: 0 }}>{userInfo?.username}</h4>
            <p style={{ margin: 0, fontSize: "12px", color: "#888" }}>{userInfo?.email}</p>
          </div>
        </Flex>
      </Flex>

      {/* Modal for adding a new chat */}
      <Modal
        title="Create a new room"
        visible={isModalVisible && (modalName === "room")}
        onOk={handleCreateRoom} // Handle room creation
        onCancel={handleModalCancel} // Cancel room creation
        okText="Create"
        cancelText="Cancel"
      >
        <Flex
          vertical
          gap={4}
        >
          <Input
            placeholder="Enter room name"
            value={newRoomData.name}
            onChange={(e) => setNewRoomData({
              ...newRoomData,
              name: e.target.value
            })}
          />
          <Input
            placeholder="Enter room's description"
            value={newRoomData.description}
            onChange={(e) => setNewRoomData({
              ...newRoomData,
              description: e.target.value
            })}
          />
        </Flex>
      </Modal>

      {/* Modal for adding a new contact */}
      <Modal
        title="Add a new contact"
        visible={isModalVisible && (modalName === "contact")}
        onOk={handleAddContact}
        onCancel={handleModalCancel}
        okText="Add"
        cancelText="Cancel"
      >
        <Input.Search
          placeholder="Enter email or username"
          allowClear
          onChange={(e) => handleListContacts(e.target.value)}
        />

        {contacts && (
          <List
            size="small"
            bordered
            style={{ marginTop: 8 }}
            dataSource={contacts}
            renderItem={(item: any) => (
              <List.Item
                className={classNames("list-item", {
                  "list-item-selected": selectedAddContactId === item.id,
                })}
                onClick={() => handleSelectAddContactId(item)}
                style={{ cursor: 'pointer' }}
              >
                <Flex>
                  <Avatar>{item.name.charAt(0).toUpperCase()}</Avatar>
                  <div style={{ marginLeft: "12px" }}>
                    <h4 style={{ margin: 0 }}>{item?.name}</h4>
                    <p style={{ margin: 0, fontSize: "12px", color: "#888" }}>{item?.email}</p>
                  </div>
                </Flex>
              </List.Item>
            )}
          />
        )}
      </Modal>
    </Layout.Sider>
  );
};


export default SideBar;
