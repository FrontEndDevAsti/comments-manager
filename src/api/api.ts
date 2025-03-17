import axios from "axios";
import type { Comment, NewComment } from "../types/types";

// Create an axios instance with default config
const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// Get comments (limited to 20)
export const getComments = async (): Promise<Comment[]> => {
  try {
    const response = await api.get<Comment[]>("/comments");
    return response.data.slice(0, 20); // Limit to 20 comments
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
};

// Delete a comment
export const deleteComment = async (id: number): Promise<void> => {
  try {
    await api.delete(`/comments/${id}`);
  } catch (error) {
    console.error(`Error deleting comment with ID ${id}:`, error);
    throw error;
  }
};

export default api;
