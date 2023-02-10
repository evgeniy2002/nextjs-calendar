import GlobalContext from '@/context/GlobalContext';
import { getMonth } from '@/utils';
import dayjs from 'dayjs';
import Image from 'next/image';
import React from 'react';

export const CalendarHeader = () => {
  const { monthIndex, setMonthIndex } = React.useContext(GlobalContext);

  const handlePrevMonth = () => {
    setMonthIndex(monthIndex - 1);
  };
  const handleNextMonth = () => {
    setMonthIndex(monthIndex + 1);
  };
  const handleReset = () => {
    setMonthIndex(dayjs().month());
  };

  return (
    <header className="px-4 py-2 flex items-center">
      <Image src={'images/logo.svg'} width={100} height={100} alt="" className="mr-2 w-12 h-12" />
      <h1 className="mr-10 text-xl text-gray-500 font-bold">Calendar</h1>
      <button onClick={handleReset} className="border rounded py-2 px-4">
        Today
      </button>
      <button onClick={handlePrevMonth}>
        <span className="cursor-pointer text-gray-600 mx-2">
          <Image src={'images/arrow-left.svg'} width={22} height={22} alt="" />
        </span>
      </button>
      <h2 className="text-lg font-bold mx-1 text-gray-600">
        {dayjs(new Date(dayjs().year(), monthIndex)).format('MMMM YYYY')}
      </h2>
      <button onClick={handleNextMonth} className="rotate-180">
        <span className="cursor-pointer text-gray-600 mx-2">
          <Image src={'images/arrow-left.svg'} width={22} height={22} alt="" />
        </span>
      </button>
    </header>
  );
};
