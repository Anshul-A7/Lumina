import { apiClient } from '@/lib/api';

export interface GeneratedImage {
  id: number;
  prompt: string;
  imageUrl: string;
  createdAt: string;
}

export const imageService = {
  /**
   * Get all generated images for the authenticated user
   */
  getUserImages: async (): Promise<GeneratedImage[]> => {
    try {
      const response = await apiClient.get('/api/images');
      return response.data;
    } catch (error) {
      console.error('Error fetching user images:', error);
      throw error;
    }
  },

  /**
   * Delete a generated image by ID
   */
  deleteImage: async (id: number): Promise<void> => {
    try {
      await apiClient.delete(`/api/images/${id}`);
    } catch (error) {
      console.error('Error deleting image:', error);
      throw error;
    }
  }
};
