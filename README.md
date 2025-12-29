🚀 Real-Time Kanban Board
A professional-grade, full-stack Kanban board built with Next.js, Tailwind CSS, and Supabase. This project features real-time synchronization across multiple devices, a custom-built dropdown system, and a high-end dark mode UI with dynamic glows.

✨ Key Features
Real-Time Sync: Powered by Supabase WebSockets. Changes made on mobile reflect instantly on desktop.

Persistent Storage: PostgreSQL database integration ensures your tickets are saved permanently.

Custom UI Engine:

Neon Glows: Dynamic shadows and border effects based on ticket tags (Bug, Story, Task, etc.).

Defensive UI: Custom-built dropdowns with global click-to-close logic using React useRef.

Smooth Animations: Hover scaling and 3D translation effects for a premium feel.

Fully Type-Safe: Built with TypeScript for reliable development.

🛠️ Tech Stack
Framework: Next.js (App Router)

Styling: Tailwind CSS

Database/Realtime: Supabase

Language: TypeScript

🚀 Getting Started
1. Clone and Install
Bash

git clone https://github.com/Purple-Pirate/ticketmanager.git
cd ticket-manager
npm install
2. Environment Variables
Create a .env.local file in the root directory and add your Supabase credentials:

Code snippet

NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
3. Database Schema
Run the following SQL in your Supabase SQL Editor:

SQL

create table tickets (
  id bigint primary key generated always as identity,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  text text not null,
  tag text not null,
  column_id text not null
);

-- Enable Realtime for the tickets table
alter publish realtime add table tickets;
4. Run Locally
Bash

npm run dev
🎨 Design System
Primary Background: Pure Black (#000000)

Card Background: Slate-700 (50% Opacity)

Tag Colors:

Bug: Red Glow

Story: Indigo Glow

Spike: Purple Glow

Task: Blue Glow

Roadmap
[ ] Drag and Drop implementation (dnd-kit).

[ ] User authentication for private boards.

[ ] Ticket filtering and search bar.