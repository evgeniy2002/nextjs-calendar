import GlobalContext from '@/context/GlobalContext';
import dayjs from 'dayjs';
import React, { useContext, useEffect } from 'react';

export const Day = ({ day, rowIdx }) => {
  const [dayEvents, setDayEvents] = React.useState([]);
  const { setDaySelected, setShowEventModal, savedEvents, setSelectedEvent } = useContext(GlobalContext); 

  useEffect(() => {
    const events = savedEvents.filter(
      (evt) => dayjs(evt.day).format('DD-MM-YY') === day.format('DD-MM-YY'),
    );
    setDayEvents(events);
  }, [savedEvents, day]);

  const getCurrentDayClass = () => {
    return day.format('DD-MM-YY') === dayjs().format('DD-MM-YY')
      ? 'bg-red-500 text-white rounded w-7 py-1'
      : '';
  };
  return (
    <div 
      className="border h-[270px] overflow-y-scroll flex flex-col cursor-pointer no-scrollbar"
      onClick={() => {
        setDaySelected(day);
        setShowEventModal(true);
      }}>
      <header className="flex flex-col items-center">
        {rowIdx === 0 && (
          <p className="text-sm mt-1 font-medium">{day.format('ddd').toUpperCase()}</p>
        )}
        <p className={`text-sm p-1 my-1 text-center ${getCurrentDayClass()}`}>{day.format('DD')}</p>
      </header>
      <div
        className="flex flex-col gap-1 px-2"
       >
        {dayEvents.map((evt, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedEvent(evt)}
            style={{ background: evt.label }}
            className={`relative px-3 pb-2 text-white rounded border border-[#000] last:mb-3 shadow-md`}>
              <p className='text-lg font-medium text-line-clamp'>{evt.title}</p>
              <p className='text-sm pt-1 text-line-clamp-2'>{evt.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
