"use client";

import React, { useEffect, useState, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import { WorkspaceService, WorkspaceDocument } from '@/lib/workspace.service';
import { ArrowLeft, Save, Users } from 'lucide-react';
import toast from 'react-hot-toast';
import { sanitizeMdx } from '@/lib/sanitizeMdx';

// Make sure to match this with your backend WS config
const WS_URL = process.env.NEXT_PUBLIC_API_URL?.replace('http', 'ws') + '/ws' || 'ws://localhost:8080/ws';

interface CollabEditorProps {
  workspaceId: number;
  documentId: number;
  onBack: () => void;
}

export default function CollabEditor({ workspaceId, documentId, onBack }: CollabEditorProps) {
  const [doc, setDoc] = useState<WorkspaceDocument | null>(null);
  const [content, setContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const stompClient = useRef<Client | null>(null);
  const [connectedUsers, setConnectedUsers] = useState<any[]>([]);

  useEffect(() => {
    loadDocument();
    
    // Initialize STOMP client
    const client = new Client({
      brokerURL: WS_URL,
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        console.log('Connected to WS');
        client.subscribe(`/topic/workspace/${workspaceId}`, (message) => {
          if (message.body) {
            const data = JSON.parse(message.body);
            // Don't update if we sent it
            if (data.documentId === documentId && data.userId !== getUserId()) {
              setContent(data.content);
            }
          }
        });
      },
      onStompError: (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
      },
    });

    client.activate();
    stompClient.current = client;

    return () => {
      client.deactivate();
    };
  }, [workspaceId, documentId]);

  const loadDocument = async () => {
    try {
      setIsLoading(true);
      const data = await WorkspaceService.getDocument(workspaceId, documentId);
      setDoc(data);
      setContent(data.content || '');
    } catch (err) {
      toast.error('Failed to load document');
      onBack();
    } finally {
      setIsLoading(false);
    }
  };

  const getUserId = () => {
    // Basic mock user ID logic or fetch from auth context
    const token = localStorage.getItem('lumina_auth_token');
    // Using a random ID if not properly parsed, for collab broadcast ignoring
    return token ? 1 : Math.floor(Math.random() * 10000); 
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    
    // Broadcast changes
    if (stompClient.current && stompClient.current.connected) {
      stompClient.current.publish({
        destination: `/app/document.edit/${workspaceId}`,
        body: JSON.stringify({
          documentId,
          content: newContent,
          userId: getUserId(),
          userName: localStorage.getItem('lumina_user_name') || 'Anonymous'
        }),
      });
    }
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await WorkspaceService.updateDocument(workspaceId, documentId, { content });
      toast.success('Document saved securely');
    } catch (err) {
      toast.error('Failed to save document');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <div className="h-full flex items-center justify-center">Loading editor...</div>;

  return (
    <div className="w-full h-full flex flex-col bg-white">
      {/* Top Bar */}
      <div className="h-14 border-b border-gray-200 flex items-center justify-between px-4 shrink-0 bg-gray-50">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-1.5 rounded hover:bg-gray-200 transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div className="font-semibold text-gray-800">{doc?.title}</div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full border border-indigo-100">
            <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
            Live Collab
          </div>
          <button 
            onClick={handleSave} 
            disabled={isSaving}
            className="flex items-center gap-1.5 bg-black text-white px-3 py-1.5 rounded font-semibold text-sm hover:bg-gray-800 disabled:opacity-50"
          >
            <Save className="w-4 h-4" /> {isSaving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
      
      {/* Editor Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Basic Textarea for collab (Can be upgraded to MDXEditor or Monaco) */}
        <textarea
          value={content}
          onChange={handleChange}
          className="flex-1 w-full h-full p-8 resize-none outline-none font-mono text-sm leading-relaxed"
          placeholder="Start typing your document..."
        />
      </div>
    </div>
  );
}
