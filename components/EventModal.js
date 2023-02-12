import GlobalContext from '@/context/GlobalContext';
import Image from 'next/image';
import React from 'react';

const labelsClasses = ['#ff4b4bd8', '#e0ac1ed4', '#6999ffd4'];

export const EventModal = () => {
  const { setShowEventModal, daySelected, dispatch, selectedEvent } =
    React.useContext(GlobalContext);
  const [title, setTitle] = React.useState(selectedEvent ? selectedEvent.title : '');
  const [description, setDescription] = React.useState(
    selectedEvent ? selectedEvent.description : '',
  );

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
    };
    if (selectedEvent) {
      dispatch({ type: 'update', payload: calendatEvent });
    } else {
      dispatch({ type: 'push', payload: calendatEvent });
    }
    setShowEventModal(false);
  };
  return (
    <div className="h-screen  w-full fixed left-0 top-0 flex justify-center items-center">
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
              required
              className="pt-3 border-0 text-gray-600 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setDescription(e.target.value)}
            />
            <span>
              <Image src={'images/bookmark.svg'} width={20} height={20} alt="" />
            </span>
            <div className="flex gap-x-2">
              {labelsClasses.map((color, i) => (
                <span
                  key={i}
                  className=" w-6 h-6 rounded-full flex items-center justify-center cursor-pointer"
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
