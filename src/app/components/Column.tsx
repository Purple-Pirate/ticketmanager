"use client";
import React from 'react';
import { TicketItem } from './ticketItem';
import { Ticket, TicketTag } from '../types'; 

interface ColumnProps {
  id: string;
  title: string;
  tickets: Ticket[]; 
  onAddTicket: (columnId: string) => void;
  onRemoveTicket: (columnId: string, ticketId: number) => void;
  onUpdateTag: (columnId: string, ticketId: number, newTag: TicketTag) => void;
}

export const Column: React.FC<ColumnProps> = ({ id, title, tickets, onAddTicket, onRemoveTicket, onUpdateTag }) => {
  return (
    <div className="w-80 flex-shrink-0 bg-slate-800 rounded-xl flex flex-col border border-slate-700 shadow-xl">
      <div className="p-4 border-b border-slate-700 flex justify-between items-center">
        <h2 className="text-slate-200 font-bold uppercase text-xs tracking-widest">{title}</h2>
        <span className="text-slate-500 text-xs">{tickets.length}</span>
      </div>

      <div className="p-3 space-y-3 low-y-autooverf max-h-[calc(100vh-250px)]">
        {tickets.map((ticket) => (
          <TicketItem 
            key={ticket.id} 
            ticket={ticket} 
            columnId={id} 
            onRemove={onRemoveTicket}
            onUpdateTag={onUpdateTag}
          />
        ))}
      </div>

      <button 
        onClick={() => onAddTicket(id)}
        className="m-3 p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg text-sm cursor-pointer transition-colors"
      >
        + Add a card
      </button>
    </div>
  );
};