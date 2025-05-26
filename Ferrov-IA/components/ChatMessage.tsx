
import React from 'react';
import { Message, Role } from '../types';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === Role.USER;

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-xl lg:max-w-2xl px-4 py-3 rounded-lg shadow ${
          isUser
            ? 'bg-sky-600 text-white rounded-br-none'
            : 'bg-slate-700 text-slate-100 rounded-bl-none'
        }`}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>
        <p className={`text-xs mt-1 ${isUser ? 'text-sky-200 text-right' : 'text-slate-400 text-left'}`}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  );
};
