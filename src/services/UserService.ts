import axios from "axios";

import AuthService from "./AuthService";

const USER_API_URL = process.env.REACT_APP_API_URL + '/api/users';
const DIRECT_MESSAGE_API_URL = process.env.REACT_APP_API_URL + '/api/chat/direct';

const me = async (): Promise<any> => {
  try {
    let headers = {
      'Content-Type': 'application/json',
    }
    headers = AuthService.getAuthHeaders(headers);

    const response = await axios.get(
      USER_API_URL + '/me',
      { headers }
    )

    return response.data;
  } catch (error: any) {
    throw error;
  }
}

const getDirectMessages = async (contactId: number): Promise<any> => {
  try {
    let headers = {
      'Content-Type': 'application/json',
    }
    headers = AuthService.getAuthHeaders(headers);

    const response = await axios.get(
      DIRECT_MESSAGE_API_URL + `?user_id=${contactId}`,
      { headers }
    )

    return response.data;
  } catch (error: any) {
    throw error;
  }
}

const UserService = {
  me,
  getDirectMessages
}

export default UserService;
