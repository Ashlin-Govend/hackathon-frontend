// src/utils/apiClient.js
import axios from 'axios';

const BASE_URL = 'https://your-backend-url.com/api'; // Replace with your actual backend URL

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    // You can add Authorization headers here if needed
  },
});

class ApiClient {
  static async get(endpoint, params = {}) {
    try {
      const response = await axiosInstance.get(endpoint, { params });
      return response.data;
    } catch (error) {
      throw ApiClient.handleError(error);
    }
  }

  static async post(endpoint, data = {}) {
    try {
      const response = await axiosInstance.post(endpoint, data);
      return response.data;
    } catch (error) {
      throw ApiClient.handleError(error);
    }
  }

  static async put(endpoint, data = {}) {
    try {
      const response = await axiosInstance.put(endpoint, data);
      return response.data;
    } catch (error) {
      throw ApiClient.handleError(error);
    }
  }

  static async delete(endpoint) {
    try {
      const response = await axiosInstance.delete(endpoint);
      return response.data;
    } catch (error) {
      throw ApiClient.handleError(error);
    }
  }

  static handleError(error) {
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error('API error:', error.response.data);
      return error.response.data;
    } else if (error.request) {
      // Request was made but no response received
      console.error('No response received:', error.request);
      return { error: 'No response from server' };
    } else {
      // Something else caused the error
      console.error('Error:', error.message);
      return { error: error.message };
    }
  }
}

export default ApiClient;
