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

const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
}

const refreshToken = async (): Promise<any> => {
  const refreshToken = localStorage.getItem('refresh_token');
  
  try {
    const response = await axios.post(
      AUTH_API_URL + '/refresh-token',
      { refreshToken },
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )

    return response.data;
  } catch (error: any) {
    throw error;
  }
}

const getAuthHeaders = (headers: any) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

const AuthService = {
  register,
  login,
  logout,
  refreshToken,
  getAuthHeaders
};

export default AuthService;
