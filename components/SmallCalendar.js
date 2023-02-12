import GlobalContext from '@/context/GlobalContext';
import { getMonth } from '@/utils';
import dayjs from 'dayjs';
import Image from 'next/image';
import React from 'react';
import { Day } from './Day';

export const SmallCalendar = () => {
  const [currentMonthIdx, setCurrentMonthIdx] = React.useState(dayjs().month());
  const [currentMonth, setCurrentMonth] = React.useState(getMonth());

  const { monthIndex, setSmallCalendarMonth, setDaySelected, daySelected } =
    React.useContext(GlobalContext);

  React.useEffect(() => {
    setCurrentMonthIdx(monthIndex);
  }, [monthIndex]);

  React.useEffect(() => {
    setCurrentMonth(getMonth(currentMonthIdx));
  }, [currentMonthIdx]);

  const handlePrevMonth = () => {
    setCurrentMonthIdx(currentMonthIdx - 1);
  };
  const handleNextMonth = () => {
    setCurrentMonthIdx(currentMonthIdx + 1);
  };
  const getCurrentDayClass = (day) => {
    const format = 'DD-MM-YY';
    const nowDay = dayjs().format(format);
    const currDay = day.format(format);
    const slcDay = daySelected && daySelected.format(format);
    if (nowDay === currDay) {
      return 'bg-blue-500 rounded-full text-white';
    } else if (currDay === slcDay) {
      return 'bg-blue-100 rounded-full text-black font-bold';
    } else {
      return '';
    }
  };
  return (
    <div className="mt-9">
      <header className="flex justify-between items-center">
        <p className="text-lg font-bold mx-1 text-gray-600">
          {dayjs(new Date(dayjs().year(), currentMonthIdx)).format('MMMM YYYY')}
        </p>
        <div>
          <button onClick={handlePrevMonth} className="mr-5">
            <span className="cursor-pointer text-gray-600 mx-2">
              <Image src={'/images/arrow-left.svg'} width={23} height={23} alt="" />
            </span>
          </button>
          <button className="rotate-180" onClick={handleNextMonth}>
            <span className="cursor-pointer text-gray-600 mx-2">
              <Image src={'/images/arrow-left.svg'} width={23} height={23} alt="" />
            </span>
          </button>
        </div>
      </header>
      <div className="grid grid-cols-7 grid-rows-6 tran">
        {currentMonth[0].map((day, index) => (
          <span key={index} className="text-sm py-1 text-center">
            {day.format('dd')}
          </span>
        ))}
        {currentMonth.map((row, i) => (
          <React.Fragment key={i}>
            {row.map((day, idx) => (
              <button
                key={idx}
                className={`py-1 w-full ${getCurrentDayClass(day)}`}
                onClick={() => {
                  setSmallCalendarMonth(currentMonthIdx);
                  setDaySelected(day);
                }}>
                <span className="text-sm">{day.format('D')}</span>
              </button>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
