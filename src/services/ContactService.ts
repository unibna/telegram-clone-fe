import axios from "axios";

import AuthService from "./AuthService";

const USER_CONTACT_API_URL = process.env.REACT_APP_API_URL + '/api/users';

const list = async (): Promise<any> => {
  try {
    let headers = {
      'Content-Type': 'application/json',
    }
    headers = AuthService.getAuthHeaders(headers);

    const response = await axios.get(
      USER_CONTACT_API_URL + '/contacts',
      { headers }
    )

    return response.data;
  } catch (error: any) {
    throw error;
  }
}

const ContactService = {
  list
}

export default ContactService;
