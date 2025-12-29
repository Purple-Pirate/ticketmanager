export type TicketTag = 'story' | 'bug' | 'defect' | 'spike' | 'task';

export interface Ticket {
  id: number;
  text: string;
  tag: TicketTag; 
}

export interface ColumnData {
  id: string;
  title: string;
  tickets: Ticket[];
}