import { apiClient as api } from './api';

export interface Workspace {
    id: number;
    name: string;
    description: string;
    ownerId: number;
    createdAt: string;
    updatedAt: string;
}

export interface WorkspaceMember {
    id: number;
    userId: number;
    name?: string;
    email: string;
    role: string;
    inviteStatus: string;
    joinedAt: string;
}

export interface WorkspaceDocument {
    id: number;
    workspaceId: number;
    title: string;
    content: string;
    lastEditedBy: number;
    version: number;
    createdAt: string;
    updatedAt: string;
}

export interface WorkspaceResponse {
    id: number;
    name: string;
    description: string;
    ownerId: number;
    ownerName?: string;
    createdAt: string;
    currentUserRole?: string;
    memberCount?: number;
    documentCount?: number;
    members?: WorkspaceMember[];
    documents?: WorkspaceDocument[];
}

export interface WorkspaceInviteResponse {
    workspaceId: number;
    workspaceName: string;
    role: string;
    inviteToken: string;
    invitedAt: string;
    inviterName?: string;
    inviterEmail?: string;
}

export interface WorkspaceDocumentResponse {
    id: number;
    workspaceId: number;
    title: string;
    content: string;
    lastEditedBy: number;
    version: number;
    createdAt: string;
    updatedAt: string;
}

export const WorkspaceService = {
    createWorkspace: async (data: { name: string; description: string }) => {
        const response = await api.post<WorkspaceResponse>('/workspaces', data);
        return response.data;
    },
    getUserWorkspaces: async () => {
        const response = await api.get<WorkspaceResponse[]>('/workspaces');
        return response.data;
    },
    getWorkspace: async (workspaceId: number) => {
        const response = await api.get<WorkspaceResponse>(`/workspaces/${workspaceId}`);
        return response.data;
    },
    updateWorkspace: async (workspaceId: number, data: { name?: string; description?: string }) => {
        const response = await api.put<WorkspaceResponse>(`/workspaces/${workspaceId}`, data);
        return response.data;
    },
    deleteWorkspace: async (workspaceId: number) => {
        await api.delete(`/workspaces/${workspaceId}`);
    },
    inviteMember: async (workspaceId: number, data: { email: string; role: string }) => {
        const response = await api.post<{ message: string }>(`/workspaces/${workspaceId}/invites`, data);
        return response.data;
    },
    getPendingInvites: async () => {
        const response = await api.get<WorkspaceInviteResponse[]>('/workspaces/invites/pending');
        return response.data;
    },
    acceptInvite: async (token: string) => {
        const response = await api.post<{ message: string }>(`/workspaces/invites/${token}/accept`);
        return response.data;
    },
    rejectInvite: async (token: string) => {
        const response = await api.post<{ message: string }>(`/workspaces/invites/${token}/reject`);
        return response.data;
    },
    updateMemberRole: async (workspaceId: number, memberUserId: number, data: { role: string }) => {
        const response = await api.put<{ message: string }>(`/workspaces/${workspaceId}/members/${memberUserId}/role`, data);
        return response.data;
    },
    removeMember: async (workspaceId: number, memberUserId: number) => {
        await api.delete(`/workspaces/${workspaceId}/members/${memberUserId}`);
    },
    createDocument: async (workspaceId: number, data: { title: string; content?: string }) => {
        const response = await api.post<WorkspaceDocumentResponse>(`/workspaces/${workspaceId}/documents`, data);
        return response.data;
    },
    getDocument: async (workspaceId: number, documentId: number) => {
        const response = await api.get<WorkspaceDocumentResponse>(`/workspaces/${workspaceId}/documents/${documentId}`);
        return response.data;
    },
    updateDocument: async (workspaceId: number, documentId: number, data: { title?: string; content?: string }) => {
        const response = await api.put<WorkspaceDocumentResponse>(`/workspaces/${workspaceId}/documents/${documentId}`, data);
        return response.data;
    },
    deleteDocument: async (workspaceId: number, documentId: number) => {
        await api.delete(`/workspaces/${workspaceId}/documents/${documentId}`);
    }
};
