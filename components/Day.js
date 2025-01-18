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
      className="border flex flex-col cursor-pointer"
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
      <div className="flex flex-col gap-1 px-2 h-[300px] overflow-y-scroll  no-scrollbar">
        {dayEvents.map((evt, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedEvent(evt)}
            style={{ background: evt.label }}
            className={`relative px-3 pt-1 pb-3 text-white rounded border border-[#000] last:mb-3 shadow-md`}>
              <div className='relative'>
                <p className='text-base font-medium text-line-clamp'>{evt.title}</p>
                {
                  evt.label !== '#2b68ead4' && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      strokeWidth="2"
                      stroke={evt.didPay ? '#fff' : '#000'}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`absolute -top-1 -right-2 ${!evt.didPay && 'animate-bigPulse'}`}
                    >
                      <rect width="20" height="12" x="2" y="6" rx="2" />
                      <circle cx="12" cy="12" r="2" />
                      <path d="M6 12h.01M18 12h.01" />
                    </svg>
                  )
                }
               
              </div>
              <p className='text-sm mt-2 text-line-clamp-2'>{evt.description}</p>  
          </div>
        ))}
      </div>
    </div>
  );
};
