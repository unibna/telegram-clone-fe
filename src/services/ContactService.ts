import axios from "axios";

import AuthService from "./AuthService";

const USER_CONTACT_API_URL = process.env.REACT_APP_API_URL + '/api/users';

const listUserContacts = async (keyword: string = ""): Promise<any> => {
  try {
    let headers = {
      'Content-Type': 'application/json',
    }
    headers = AuthService.getAuthHeaders(headers);

    // add username as query param
    let queryParams = new URLSearchParams();
    queryParams.append('username', keyword);

    let url = USER_CONTACT_API_URL + '/contacts';
    if (queryParams) {
      url += `?${queryParams.toString()}`;
    }

    const response = await axios.get(
      url,
      { headers }
    )

    return response.data;
  } catch (error: any) {
    throw error;
  }
}

const listContacts = async (keyword: string = ""): Promise<any> => {
  try {
    let headers = {
      'Content-Type': 'application/json',
    }
    headers = AuthService.getAuthHeaders(headers);

    // add username as query param
    let queryParams = new URLSearchParams();
    queryParams.append('username', keyword);

    let url = USER_CONTACT_API_URL
    if (queryParams) {
      url += `?${queryParams.toString()}`;
    }

    const response = await axios.get(
      url,
      { headers }
    )

    return response.data;
  } catch (error: any) {
    throw error;
  }
}

const addContact = async (userId: number, contactId: number): Promise<any> => {
  try {
    let headers = {
      'Content-Type': 'application/json',
    }
    headers = AuthService.getAuthHeaders(headers);

    const response = await axios.post(
      USER_CONTACT_API_URL + '/contacts',
      {
        user_id: userId,
        user_contact_id: contactId
      },
      { headers }
    )

    return response.data;
  } catch (error: any) {
    throw error;
  }
}

const ContactService = {
  listUserContacts,
  listContacts,
  addContact
}

export default ContactService;
