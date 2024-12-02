import axios from "axios";

import AuthService from "./AuthService";

const ROOM_API_URL = process.env.REACT_APP_API_URL + '/api/rooms';

const create = async (data: {
  name: string,
  description: string,
}): Promise<any> => {
  let headers = {
    'Content-Type': 'application/json',
  }
  headers = AuthService.getAuthHeaders(headers);

  try {
    const response = await axios.post(
      ROOM_API_URL,
      data,
      { headers }
    )

    return response.data;
  } catch (error: any) {
    throw error;
  }
}

const join = async (roomId: number): Promise<any> => {
  let headers = {
    'Content-Type': 'application/json',
  }
  headers = AuthService.getAuthHeaders(headers);

  try {
    const response = await axios.post(
      ROOM_API_URL + `/${roomId}/join`,
      {},
      { headers }
    )

    return response.data;
  } catch (error: any) {
    throw error;
  }
}

const listUserRooms = async (): Promise<any> => {
  try {
    let headers = {
      'Content-Type': 'application/json',
    }
    headers = AuthService.getAuthHeaders(headers);

    const response = await axios.get(
      ROOM_API_URL + '/me',
      { headers }
    )

    return response.data;
  } catch (error: any) {
    throw error;
  }
}

const RoomService = {
  create,
  join,
  listUserRooms
}

export default RoomService;
