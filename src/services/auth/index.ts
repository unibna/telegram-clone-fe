import axios from "axios";

const AUTH_API_URL = process.env.REACT_APP_API_URL + '/api/auth';

const register = async (
  data: {
    username: string,
    email: string,
    password: string
  }
): Promise<any> => {
  try {
    const response = await axios.post(
      AUTH_API_URL + '/register',
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )
    console.log('response:', response);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

const login = async (username: string, password: string): Promise<any> => {
  try {
    const response = await axios.post(
      AUTH_API_URL + '/login',
      { username, password },
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )

    const tokenPair = await response.data;
    return tokenPair;
  } catch (error: any) {
    throw error;
  }
};

const AuthService = {
  register,
  login
};

export default AuthService;
