import React from 'react';
import { CreateEventButton } from './CreateEventButton';
import { Labels } from './Labels';
import { SmallCalendar } from './SmallCalendar';
import { WidgetsBar } from './WidgetsBar';

export const Sidebar = () => {
  return (
    <aside className="border p-5 w-64">
      <CreateEventButton />
      <SmallCalendar />
      <WidgetsBar />
      {/* <Labels /> */}
    </aside>
  );
};
