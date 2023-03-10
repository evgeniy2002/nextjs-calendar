import GlobalContext from '@/context/GlobalContext';
import dayjs from 'dayjs';
import React from 'react';

export const Day = ({ day, rowIdx }) => {
  const [dayEvents, setDayEvents] = React.useState([]);
  const { setDaySelected, setShowEventModal, savedEvents, setSelectedEvent } =
    React.useContext(GlobalContext);

  React.useEffect(() => {
    const events = savedEvents.filter(
      (evt) => dayjs(evt.day).format('DD-MM-YY') === day.format('DD-MM-YY'),
    );
    setDayEvents(events);
  }, [savedEvents, day]);

  const getCurrentDayClass = () => {
    return day.format('DD-MM-YY') === dayjs().format('DD-MM-YY')
      ? 'bg-blue-600 text-white rounded-full w-7 py-1'
      : '';
  };
  return (
    <div className="border border-gray-200 flex flex-col">
      <header className="flex flex-col items-center">
        {rowIdx === 0 && (
          <p className="text-sm mt-1 font-medium">{day.format('ddd').toUpperCase()}</p>
        )}
        <p className={`text-sm p1 my-1 text-center ${getCurrentDayClass()}`}>{day.format('DD')}</p>
      </header>
      <div
        className="flex-1 cursor-pointer pl-2"
        onClick={() => {
          setDaySelected(day);
          setShowEventModal(true);
        }}>
        {dayEvents.map((evt, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedEvent(evt)}
            style={{ background: evt.label }}
            className={`p-2  mr-3 text-white text-sm rounded mb-1 truncate`}>
            {evt.title}
          </div>
        ))}
      </div>
    </div>
  );
};
