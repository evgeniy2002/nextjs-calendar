import { CalendarHeader } from '@/components/CalendarHeader';
import { Sidebar } from '@/components/Sidebar';
import { Month } from '@/components/Month';
import Head from 'next/head';
import { getMonth } from '@/utils';
import React from 'react';
import GlobalContext from '@/context/GlobalContext';
import { EventModal } from '@/components/EventModal';

export default function Home() {
  const [currentMonth, setCurrentMonth] = React.useState(getMonth());
  const { monthIndex, showEventModal } = React.useContext(GlobalContext);

  React.useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <>
      <Head>
        <title>Google Calendar</title>
      </Head>
      {showEventModal && <EventModal />}
      <main className="h-screen flex flex-col">
        <CalendarHeader />
        <div className="flex flex-1">
          <Sidebar />
          <Month month={currentMonth} />
        </div>
      </main>
    </>
  );
}
