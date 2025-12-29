"use client";
import React from 'react';
import { TicketTag,Ticket, ColumnData} from '../types';
import { tagColors } from '../constants';


interface TicketProps {
  ticket: Ticket;
  columnId: string;
  onRemove: (columnId: string, ticketId: number) => void;
  onUpdateTag: (columnId: string, ticketId: number, newTag: TicketTag) => void;

}

export const TicketItem: React.FC<TicketProps> = ({ ticket, columnId, onRemove, onUpdateTag}) => {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
const glowStyles = {
    story: "hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:border-indigo-400",
    bug: "hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] hover:border-red-400",
    defect: "hover:shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:border-orange-400",
    spike: "hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:border-purple-400",
    task: "hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:border-blue-400",
  };
  const allTags: TicketTag[] = ['story', 'bug', 'defect', 'spike', 'task'];
 
 return (
    <div className={`
      group relative p-4 pt-3 rounded-lg text-slate-200 
      bg-slate-700/50 border border-slate-600/50
      transition-all duration-300 ease-out
      
      /* Elevation & Scale */
      hover:scale-[1.02] 
      hover:-translate-y-1
      
      /* Glow & Border logic */
      ${glowStyles[ticket.tag as keyof typeof glowStyles]}
      
      /* Cursor styling */
      cursor-default
    `}>
      {/* Optional: Add a colored accent bar on the left 
        to make the color identity even stronger 
      */}
      <div className="flex justify-between items-start mb-2">
        {}
        <div className="relative">
          <button 
            onClick={(e) => setIsDropdownOpen(!isDropdownOpen)}
            className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border transition-all hover:brightness-125 ${tagColors[ticket.tag]}`}
          >
            {ticket.tag}
          </button>

          {}
        {isDropdownOpen && (
            <>
              {}
              <div 
                className="fixed inset-0 z-40 bg-transparent" 
                onClick={() => setIsDropdownOpen(false)}
              />
              <div className="absolute top-full left-0 mt-1 w-40 bg-slate-800 border border-slate-500 rounded-md shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-[70] py-1">
                {allTags.map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      onUpdateTag(columnId, ticket.id, t);
                      setIsDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-[10px] uppercase font-bold hover:bg-slate-600 text-slate-200 transition-colors"
                  >
                    {t}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        <button 
          onClick={() => onRemove(columnId, ticket.id)} 
          className="text-slate-400 hover:text-red-400 cursor-pointer text-lg leading-none 
             /* Smooth Transition States */
             opacity-0 translate-x-2 
             group-hover:opacity-100 group-hover:translate-x-0 
             transition-all duration-200 ease-out"
        > 
          &times; 
        </button>
      </div>

      <p className="text-sm text-slate-300">{ticket.text}</p>
    </div>
  );
};