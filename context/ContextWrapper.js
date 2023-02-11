import dayjs from 'dayjs';
import React from 'react';
import GlobalContext from './GlobalContext';

export const ContextWrapper = (props) => {
  const [monthIndex, setMonthIndex] = React.useState(dayjs().month());
  const [smallCalendarMonth, setSmallCalendarMonth] = React.useState(null);
  const [daySelected, setDaySelected] = React.useState(null);

  React.useEffect(() => {
    if (smallCalendarMonth !== null) {
      setMonthIndex(smallCalendarMonth);
    }
  }, [smallCalendarMonth]);

  return (
    <GlobalContext.Provider
      value={{
        monthIndex,
        setMonthIndex,
        smallCalendarMonth,
        setSmallCalendarMonth,
        daySelected,
        setDaySelected,
      }}>
      {props.children}
    </GlobalContext.Provider>
  );
};
