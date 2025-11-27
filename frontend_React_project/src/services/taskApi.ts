// src/api/taskService.ts
import axios from "axios";

export interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

const API_URL = "http://127.0.0.1:8000/tasks/"; // Django endpoint

export const taskApi = {
  async getAllTasks(): Promise<Task[]> {
    const response = await axios.get<Task[]>(API_URL);
    return response.data;
  },

  async createTask(data: {
    title: string;
    description?: string;
  }): Promise<Task> {
    const response = await axios.post<Task>(API_URL, data);
    return response.data;
  },

  async updateTask(
    id: number,
    data: { title?: string; description?: string; completed?: boolean }
  ): Promise<Task> {
    const response = await axios.put<Task>(`${API_URL}${id}/`, data);
    return response.data;
  },

  async deleteTask(id: number): Promise<void> {
    await axios.delete(`${API_URL}${id}/`);
  },

  async toggleTaskCompletion(id: number, completed: boolean): Promise<Task> {
    const response = await axios.patch<Task>(`${API_URL}${id}/`, { completed });
    return response.data;
  },
};
