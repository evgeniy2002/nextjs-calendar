import dayjs from 'dayjs';
import React, { useMemo } from 'react';
import GlobalContext from './GlobalContext';
function savedEventsReducer(state, { type, payload }) {
  switch (type) {
    case 'push':
      return [...state, payload];
    case 'update':
      return state.map((evt) => (evt.id === payload.id ? payload : evt));
    case 'delete':
      return state.filter((evt) => evt.id !== payload.id);
    default:
      throw new Error();
  }
}

function initEvents() {
  if (typeof window !== 'undefined') {
    const storageEvents = localStorage.getItem('savedEvents');
    const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
    return parsedEvents;
  }
}
export const ContextWrapper = (props) => {
  const [monthIndex, setMonthIndex] = React.useState(dayjs().month());
  const [smallCalendarMonth, setSmallCalendarMonth] = React.useState(null);
  const [daySelected, setDaySelected] = React.useState(dayjs());
  const [showEventModal, setShowEventModal] = React.useState(false);
  const [selectedEvent, setSelectedEvent] = React.useState(null);
  // const [labels, setLabels] = React.useState([]);
  const [savedEvents, dispatch] = React.useReducer(savedEventsReducer, [], initEvents);

  // const filteredEvents = useMemo(() => {
  //   return savedEvents.filter((evt) =>
  //     labels
  //       .filter((lbl) => lbl.checked)
  //       .map((lbl) => lbl.label)
  //       .includes(evt.label),
  //   );
  // }, [savedEvents, labels]);

  React.useEffect(() => {
    localStorage.setItem('savedEvents', JSON.stringify(savedEvents));
  }, [savedEvents]);

  React.useEffect(() => {
    if (!showEventModal) {
      setSelectedEvent(null);
    }
  }, [showEventModal]);

  // React.useEffect(() => {
  //   setLabels((prevLabels) => {
  //     return [...new Set(savedEvents.map((evt) => evt.label))].map((label) => {
  //       const currentLabel = prevLabels.find((lbl) => lbl.label === label);
  //       return {
  //         label,
  //         checked: currentLabel ? currentLabel.checked : true,
  //       };
  //     });
  //   });
  // }, [savedEvents]);

  React.useEffect(() => {
    if (smallCalendarMonth !== null) {
      setMonthIndex(smallCalendarMonth);
    }
  }, [smallCalendarMonth]);

  // const updateLabel = (label) => {
  //   setLabels(labels.map((lbl) => (lbl.label === label.label ? label : lbl)));
  // };

  return (
    <GlobalContext.Provider
      value={{
        monthIndex,
        setMonthIndex,
        smallCalendarMonth,
        setSmallCalendarMonth,
        daySelected,
        setDaySelected,
        showEventModal,
        setShowEventModal,
        dispatch,
        selectedEvent,
        setSelectedEvent,
        savedEvents,
        // setLabels,
        // labels,
        // updateLabel,
        // filteredEvents,
      }}>
      {props.children}
    </GlobalContext.Provider>
  );
};
