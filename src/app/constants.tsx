import { TicketTag } from './types';

export const tagColors: Record<TicketTag, string> = {
  story: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50',
  bug: 'bg-red-500/20 text-red-400 border-red-500/50',
  defect: 'bg-orange-500/20 text-orange-400 border-orange-500/50',
  spike: 'bg-purple-500/20 text-purple-400 border-purple-500/50',
};