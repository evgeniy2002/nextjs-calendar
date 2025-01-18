import GlobalContext from '@/context/GlobalContext';
import Image from 'next/image';
import React, { useContext, useState } from 'react';
import { Toggle } from './Toggle';

const labelsClasses = ['#9BA1B6', '#F7455B', '#efaa1c', '#2b68ead4'];

export const EventModal = () => {
  const { setShowEventModal, daySelected, dispatch, selectedEvent } = useContext(GlobalContext);
  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : '');
  const [didPay, setDidPay] = useState(selectedEvent ? selectedEvent.didPay : false);
  const [description, setDescription] = useState(selectedEvent ? selectedEvent.description : '');

  const [selectedLabel, setSelectedLabel] = React.useState(
    selectedEvent ? labelsClasses.find((lbl) => lbl === selectedEvent.label) : labelsClasses[0],
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const calendatEvent = {
      id: selectedEvent ? selectedEvent.id : Date.now(),
      title,
      description,
      label: selectedLabel,
      day: daySelected.valueOf(),
      didPay,
    };
    if (selectedEvent) {
      dispatch({ type: 'update', payload: calendatEvent });
    } else {
      dispatch({ type: 'push', payload: calendatEvent });
    }
    setShowEventModal(false);
  };
  return (
    <div className="fixed left-0 top-0 w-full h-full flex justify-center items-center z-10">
      <form className="bg-white rounded-lg shadow-2xl w-1/4">
        <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
          <span>
            <Image src={'images/menu.svg'} width={15} height={15} alt="" />
          </span>
          <div className="flex">
            {selectedEvent && (
              <span
                onClick={() => {
                  dispatch({
                    type: 'delete',
                    payload: selectedEvent,
                  });
                  setShowEventModal(false);
                }}
                className="cursor-pointer">
                <Image src={'images/trash.svg'} width={20} height={20} alt="" />
              </span>
            )}
            <button onClick={() => setShowEventModal(false)} className="ml-2">
              <span>
                <Image src={'images/cross.svg'} width={25} height={25} alt="" />
              </span>
            </button>
          </div>
        </header>
        <div className="p-3">
          <div className="grid grid-cols-1/5 items-end gap-y-7">
            <div></div>
            <input
              type="text"
              name="title"
              placeholder="Add title"
              value={title}
              required
              className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setTitle(e.target.value)}
            />
            <span>
              <Image src={'images/clock.svg'} width={20} height={20} alt="" />
            </span>
            <p>{daySelected && daySelected.format('dddd, MMMM DD')}</p>
            <span>
              <Image src={'images/calendar.svg'} width={20} height={20} alt="" />
            </span>
            <textarea
              type="text"
              name="description"
              placeholder="Add description"
              value={description}
              rows={6}
              required
              className="pt-3 border-0 text-gray-600 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500 z-10"
              onChange={(e) => setDescription(e.target.value)}
            />
            {
              selectedEvent && selectedEvent.label !== '#2b68ead4' && (
                <>
                  <span>
                    <Image src={'images/pay.svg'} width={24} height={24} alt="" />
                  </span>
                  <Toggle isOn={didPay} handleToggle={() => setDidPay(!didPay)}/>
                </>
              )
            }
            <span>
              <Image src={'images/bookmark.svg'} width={20} height={20} alt="" />
            </span>
            <div className="inline-flex gap-x-2 pt-10">
              {labelsClasses.map((color, i) => (
                <span
                  key={i}
                  className="relative w-6 h-6 rounded-full flex items-center justify-center cursor-pointer"
                  style={{ background: color }}
                  onClick={() => setSelectedLabel(color)}>
                  {selectedLabel === color && (
                    <span>
                      <Image src={'images/check.svg'} width={12} height={12} alt="" />
                    </span>
                  )}
                </span>
              ))}
            </div>
           
          </div>
        </div>
        <footer className="flex justify-end w-auto border-t p-3 mt-5">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white">
            Save
          </button>
        </footer>
      </form>
    </div>
  );
};
