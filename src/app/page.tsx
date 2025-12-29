"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { Column } from './components/Column';
import { TicketTag, ColumnData, Ticket } from './types';
import { supabase } from './lib/supabaseClient';

const TicketBoard: React.FC = () => {
  const [columns, setColumns] = useState<ColumnData[]>([
    { id: 'col-1', title: 'To Do', tickets: [] },
    { id: 'col-2', title: 'In Progress', tickets: [] },
    { id: 'col-3', title: 'Done', tickets: [] },
  ]);
  const [isLoaded, setIsLoaded] = useState(false);

  const fetchTickets = useCallback(async () => {
    const { data, error } = await supabase.from('tickets').select('*');
    
    if (error) {
      console.error('❌ Connection Error:', error.message);
      return;
    }

    if (data) {
      // 1. Map tickets using the column_id from the database
      setColumns([
        { id: 'col-1', title: 'To Do', tickets: data.filter(t => t.column_id === 'col-1') },
        { id: 'col-2', title: 'In Progress', tickets: data.filter(t => t.column_id === 'col-2') },
        { id: 'col-3', title: 'Done', tickets: data.filter(t => t.column_id === 'col-3') },
      ]);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    fetchTickets();
    const channel = supabase
      .channel('schema-db-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tickets' }, () => {
        fetchTickets();
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [fetchTickets]);

  const addTicket = async (columnId: string) => {
    const ticketText = prompt("Enter ticket description:");
    if (!ticketText) return;

    // 2. We now send BOTH column_id and status to be safe
    const statusMap: { [key: string]: string } = {
      'col-1': 'To Do',
      'col-2': 'In Progress',
      'col-3': 'Done'
    };

    const { error } = await supabase
      .from('tickets')
      .insert([{ 
        text: ticketText, 
        tag: 'story', 
        column_id: columnId,      // <--- Added this
        status: statusMap[columnId] // <--- Also keep status updated
      }]);

    if (error) alert("Error adding ticket: " + error.message);
  };

const removeTicket = async (columnId: string, ticketId: number) => {
  const { error } = await supabase
    .from('tickets')
    .delete()
    .eq('id', ticketId);

  if (error) console.error('Error removing ticket:', error);
};

 const updateTicketTag = async (columnId: string, ticketId: number, newTag: TicketTag) => {
  const { error } = await supabase
    .from('tickets')
    .update({ tag: newTag })
    .eq('id', ticketId);

  if (error) console.error('Error updating tag:', error);
};
  if (!isLoaded) return <div className="bg-slate-900 h-screen" />;

  return (
    <div className="flex h-screen w-full bg-slate-900 p-10 overflow-x-auto gap-6 items-start">
      {columns.map(col => (
        <Column 
          key={col.id}
          id={col.id}
          title={col.title}
          tickets={col.tickets}
          onAddTicket={addTicket}
          onRemoveTicket={removeTicket}
          onUpdateTag={updateTicketTag}
        />
      ))}
    </div>
  );
};

export default TicketBoard;