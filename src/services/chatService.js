import api from "./axiosCustom";


export const fetchMessages = async (roomId, page = 0, size = 20) => {
    try {
      const response = await api.get(`/api/v1/rooms/${roomId}/messages`, {
        params: { page, size }
      });
      return response.data; 
    } catch (error) {
      console.error("Failed to fetch messages", error);
      return [];
    }
  };