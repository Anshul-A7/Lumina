"use client";

import React, { useState, useEffect } from 'react';
import { WorkspaceService, WorkspaceResponse, WorkspaceMember, WorkspaceDocument, WorkspaceInviteResponse } from '@/lib/workspace.service';
import { Users, FileText, Plus, Search, Trash2, Settings, UserPlus, X, Edit2, Play, Bell } from 'lucide-react';
import toast from 'react-hot-toast';

export default function CollaborationView({ onOpenDocument }: { onOpenDocument: (workspaceId: number, documentId: number) => void }) {
  const [workspaces, setWorkspaces] = useState<WorkspaceResponse[]>([]);
  const [pendingInvites, setPendingInvites] = useState<WorkspaceInviteResponse[]>([]);
  const [selectedWorkspace, setSelectedWorkspace] = useState<WorkspaceResponse | null>(null);
  const [members, setMembers] = useState<WorkspaceMember[]>([]);
  const [documents, setDocuments] = useState<WorkspaceDocument[]>([]);
  
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [showRequestsModal, setShowRequestsModal] = useState(false);
  const [userPlan, setUserPlan] = useState<string>("FREE");
  const [newWorkspaceName, setNewWorkspaceName] = useState("");
  const [newWorkspaceDesc, setNewWorkspaceDesc] = useState("");
  
  const [isInviting, setIsInviting] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("VIEWER");
  
  const [isCreatingDoc, setIsCreatingDoc] = useState(false);
  const [newDocTitle, setNewDocTitle] = useState("");

  const [currentUserId, setCurrentUserId] = useState<number | null>(null);

  useEffect(() => {
    // We can get userId from auth service or assume ownerId check
    fetchWorkspaces();
  }, []);

  const fetchWorkspaces = async () => {
    try {
      setIsLoading(true);
      const [data, subscriptionInfo] = await Promise.all([
        WorkspaceService.getUserWorkspaces(),
        import('@/lib/subscription.service').then(m => m.getSubscription())
      ]);
      setWorkspaces(data);
      if (subscriptionInfo) {
        setUserPlan(subscriptionInfo.plan);
      }
      try {
        const invites = await WorkspaceService.getPendingInvites();
        setPendingInvites(invites);
      } catch (err) {
        console.error("Failed to fetch pending invites", err);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load workspaces");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateWorkspace = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWorkspaceName.trim()) return;
    try {
      await WorkspaceService.createWorkspace({ name: newWorkspaceName, description: newWorkspaceDesc });
      toast.success("Workspace created");
      setIsCreating(false);
      setNewWorkspaceName("");
      setNewWorkspaceDesc("");
      fetchWorkspaces();
    } catch (err: any) {
      setIsCreating(false);
      // The api.ts interceptor handles 403 and 429 and displays a custom toast, so we don't need toast.error here
    }
  };

  const fetchWorkspaceDetails = async (id: number) => {
    try {
      const data = await WorkspaceService.getWorkspace(id);
      setSelectedWorkspace(data);
      setMembers(data.members || []);
      setDocuments(data.documents || []);
    } catch (err) {
      toast.error("Failed to load workspace details");
    }
  };

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedWorkspace || !inviteEmail.trim()) return;
    try {
      await WorkspaceService.inviteMember(selectedWorkspace.id, { email: inviteEmail, role: inviteRole });
      toast.success("Invite sent");
      setIsInviting(false);
      setInviteEmail("");
      fetchWorkspaceDetails(selectedWorkspace.id);
    } catch (err: any) {
      setIsInviting(false);
      // The api.ts interceptor handles limits and displays a custom toast
    }
  };

  const handleCreateDoc = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedWorkspace || !newDocTitle.trim()) return;
    try {
      await WorkspaceService.createDocument(selectedWorkspace.id, { title: newDocTitle, content: "" });
      toast.success("Document created");
      setIsCreatingDoc(false);
      setNewDocTitle("");
      fetchWorkspaceDetails(selectedWorkspace.id);
    } catch (err) {
      toast.error("Failed to create document");
    }
  };
  
  const handleDeleteWorkspace = async (id: number) => {
    if (!window.confirm("Delete this workspace permanently?")) return;
    try {
      await WorkspaceService.deleteWorkspace(id);
      toast.success("Workspace deleted");
      setSelectedWorkspace(null);
      fetchWorkspaces();
    } catch (err) {
      toast.error("Failed to delete workspace");
    }
  };
  
  const handleAcceptInvite = async (token: string) => {
    try {
      await WorkspaceService.acceptInvite(token);
      toast.success("Invite accepted");
      fetchWorkspaces();
    } catch (err) {
      toast.error("Failed to accept invite");
    }
  };

  const handleRejectInvite = async (token: string) => {
    try {
      await WorkspaceService.rejectInvite(token);
      toast.success("Invite rejected");
      fetchWorkspaces();
    } catch (err) {
      toast.error("Failed to reject invite");
    }
  };
  
  const handleRemoveMember = async (memberId: number) => {
    if (!selectedWorkspace || !window.confirm("Remove this member?")) return;
    try {
      await WorkspaceService.removeMember(selectedWorkspace.id, memberId);
      toast.success("Member removed");
      fetchWorkspaceDetails(selectedWorkspace.id);
    } catch (err) {
      toast.error("Failed to remove member");
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-full">Loading workspaces...</div>;
  }

  return (
    <div className="w-full h-full flex flex-col md:flex-row bg-gray-50">
      {/* Sidebar - Workspace List */}
      <div className="w-full md:w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="font-bold text-gray-800">Workspaces</h2>
          <button 
            onClick={() => setIsCreating(true)} 
            className="p-1 rounded hover:bg-gray-100"
            title="Create Workspace"
          >
            <Plus className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          {workspaces.length === 0 ? (
            <div className="p-4 text-sm text-gray-500 text-center">No workspaces found</div>
          ) : (
            workspaces.map(ws => (
              <button
                key={ws.id}
                onClick={() => fetchWorkspaceDetails(ws.id)}
                className={`w-full text-left px-4 py-3 border-l-4 transition-all ${
                  selectedWorkspace?.id === ws.id 
                    ? 'bg-gray-100 border-black' 
                    : 'border-transparent hover:bg-gray-50 border-b border-b-gray-100'
                }`}
              >
                <div className={`font-semibold text-sm truncate ${selectedWorkspace?.id === ws.id ? 'text-black' : 'text-gray-800'}`}>{ws.name}</div>
                <div className={`text-xs mt-0.5 truncate ${selectedWorkspace?.id === ws.id ? 'text-gray-600' : 'text-gray-500'}`}>{ws.description || 'No description'}</div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Main Content - Workspace Details */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {selectedWorkspace ? (
          <div className="flex-1 overflow-y-auto p-6 md:p-10 bg-gray-50">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">{selectedWorkspace.name}</h1>
                  {selectedWorkspace.currentUserRole === 'ADMIN' && (
                    <span className="bg-indigo-50 border border-indigo-100 text-indigo-700 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">Admin</span>
                  )}
                </div>
                <p className="text-gray-500 font-medium text-sm md:text-base">{selectedWorkspace.description || 'No description provided.'}</p>
              </div>
              
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => handleDeleteWorkspace(selectedWorkspace.id)} 
                  className="px-4 py-2 text-gray-500 bg-white hover:text-red-600 hover:bg-red-50 hover:border-red-100 border border-gray-200 rounded-xl transition-all font-semibold text-sm flex items-center gap-2 shadow-sm"
                  title="Delete Workspace"
                >
                  <Trash2 className="w-4 h-4" />
                  <span className="hidden md:inline">Delete</span>
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Documents Section */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold flex items-center gap-2"><FileText className="w-5 h-5" /> Documents</h3>
                  <button onClick={() => setIsCreatingDoc(true)} className="text-sm bg-black text-white px-3 py-1.5 rounded flex items-center gap-1 hover:bg-gray-800">
                    <Plus className="w-4 h-4" /> New
                  </button>
                </div>
                
                {isCreatingDoc && (
                  <form onSubmit={handleCreateDoc} className="mb-4 flex gap-2">
                    <input type="text" placeholder="Document Title" required value={newDocTitle} onChange={e => setNewDocTitle(e.target.value)} className="flex-1 p-2 border rounded text-sm" />
                    <button type="submit" className="bg-indigo-600 text-white px-3 py-1.5 rounded text-sm">Save</button>
                    <button type="button" onClick={() => setIsCreatingDoc(false)} className="px-3 py-1.5 text-gray-500">Cancel</button>
                  </form>
                )}

                <div className="space-y-2">
                  {documents.length === 0 ? <div className="text-sm text-gray-500">No documents yet</div> : documents.map(doc => (
                    <div key={doc.id} className="flex justify-between items-center p-3 hover:bg-gray-50 border rounded-lg group">
                      <span className="font-medium">{doc.title}</span>
                      <button onClick={() => onOpenDocument(selectedWorkspace.id, doc.id)} className="opacity-0 group-hover:opacity-100 bg-indigo-100 text-indigo-700 p-1.5 rounded flex items-center gap-1 text-xs font-semibold">
                        <Edit2 className="w-3 h-3" /> Edit
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Members Section */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    <Users className="w-5 h-5" /> 
                    Members
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium ml-2">
                      Admin: {selectedWorkspace.ownerName || 'Unknown'}
                    </span>
                  </h3>
                  <button onClick={() => setIsInviting(true)} className="text-sm bg-gray-100 text-gray-700 px-3 py-1.5 rounded flex items-center gap-1 hover:bg-gray-200 font-semibold">
                    <UserPlus className="w-4 h-4" /> Invite
                  </button>
                </div>

                <div className="space-y-3">
                  {members.map(member => (
                    <div key={member.id} className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-white flex items-center justify-center font-bold text-xs">
                          {member.email ? member.email[0].toUpperCase() : 'U'}
                        </div>
                        <div>
                          <div className="text-sm font-semibold">{member.email}</div>
                          <div className="text-xs text-gray-500 flex items-center gap-1">
                            <span className="capitalize">{member.role.toLowerCase()}</span>
                            {member.inviteStatus !== 'ACCEPTED' && <span className="bg-yellow-100 text-yellow-800 px-1.5 py-0.5 rounded-full text-[10px]">Pending</span>}
                          </div>
                        </div>
                      </div>
                      <button onClick={() => handleRemoveMember(member.id)} className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded hover:bg-red-50" title="Remove Member">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400 p-8 text-center flex-col gap-4">
            <Users className="w-12 h-12 text-gray-300" />
            <p>Select a workspace or create a new one to collaborate.</p>
            <div className="flex items-center gap-3 mt-4">
              <button 
                onClick={() => setIsCreating(true)} 
                className="px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors bg-black text-white hover:bg-gray-800"
                title="Create Workspace"
              >
                <Plus className="w-4 h-4" /> Create Workspace
              </button>
              <button 
                onClick={() => setShowRequestsModal(true)} 
                className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-gray-200 transition-colors border border-gray-200 relative"
              >
                <Bell className="w-4 h-4" /> Requests
                {pendingInvites.length > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                  </span>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Requests Modal */}
      {showRequestsModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full border border-gray-100 overflow-hidden flex flex-col min-h-[50vh] max-h-[85vh]">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h2 className="font-bold text-gray-900 flex items-center gap-2 text-lg">
                <Bell className="w-5 h-5 text-gray-500" />
                Workspace Requests
              </h2>
              <button onClick={() => setShowRequestsModal(false)} className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1 bg-gray-50/30">
              {pendingInvites.length === 0 ? (
                <div className="text-center py-16 text-gray-500 flex flex-col items-center gap-3">
                  <UserPlus className="w-12 h-12 text-gray-300" />
                  <p className="text-base font-medium">You have no pending requests.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {pendingInvites.map(inv => (
                    <div key={inv.inviteToken} className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="font-semibold text-gray-900">{inv.workspaceName}</div>
                          <div className="text-xs text-gray-500 mt-0.5 flex flex-col gap-0.5">
                            <span>Invited as: <span className="font-medium text-gray-700">{inv.role}</span></span>
                            {inv.inviterName && (
                              <span>Invited by: <span className="font-medium text-gray-700">{inv.inviterName} ({inv.inviterEmail})</span></span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-2">
                        <button onClick={() => handleAcceptInvite(inv.inviteToken)} className="flex-1 bg-black text-white text-sm py-2 rounded-lg font-semibold hover:bg-gray-800 transition-colors">Accept</button>
                        <button onClick={() => handleRejectInvite(inv.inviteToken)} className="flex-1 bg-gray-100 text-gray-700 text-sm py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors border border-gray-200">Reject</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Invite Member Modal */}
      {isInviting && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full border border-gray-100 overflow-hidden flex flex-col">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h2 className="font-bold text-gray-900 flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-gray-500" />
                Invite Member
              </h2>
              <button onClick={() => setIsInviting(false)} className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleInvite} className="p-5 flex flex-col gap-4">
              <div className="text-sm text-gray-500">
                Invite new collaborators to <span className="font-bold text-black">{selectedWorkspace?.name}</span>.
              </div>
              <input 
                type="email" 
                placeholder="Email Address" 
                required 
                value={inviteEmail} 
                onChange={e => setInviteEmail(e.target.value)} 
                className="p-3 border border-gray-200 rounded-lg text-sm w-full focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-all" 
              />
              <div className="flex gap-2">
                <select 
                  value={inviteRole} 
                  onChange={e => setInviteRole(e.target.value)} 
                  className="p-3 border border-gray-200 rounded-lg text-sm flex-1 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 cursor-pointer"
                >
                  <option value="VIEWER">Viewer</option>
                  <option value="EDITOR">Editor</option>
                  <option value="ADMIN">Admin</option>
                </select>
                <button type="submit" className="bg-black text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors">
                  Send Invite
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create Workspace Modal */}
      {isCreating && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full border border-gray-100 overflow-hidden flex flex-col">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h2 className="font-bold text-gray-900 flex items-center gap-2">
                <Plus className="w-5 h-5 text-gray-500" />
                Create Workspace
              </h2>
              <button onClick={() => setIsCreating(false)} className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleCreateWorkspace} className="p-5 flex flex-col gap-4">
              <div className="text-sm text-gray-500">
                Give your new collaborative space a name and an optional description.
              </div>
              
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-700">Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Project Alpha" 
                  required 
                  value={newWorkspaceName} 
                  onChange={e => setNewWorkspaceName(e.target.value)} 
                  className="p-3 border border-gray-200 rounded-lg text-sm w-full focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-all" 
                />
              </div>
              
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-700">Description (Optional)</label>
                <textarea 
                  placeholder="What is this workspace for?" 
                  rows={3}
                  value={newWorkspaceDesc} 
                  onChange={e => setNewWorkspaceDesc(e.target.value)} 
                  className="p-3 border border-gray-200 rounded-lg text-sm w-full focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-all resize-none" 
                />
              </div>
              
              <div className="pt-2">
                <button type="submit" className="w-full bg-black text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors">
                  Create Workspace
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
