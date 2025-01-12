import GlobalContext from '@/context/GlobalContext';
import Image from 'next/image';
import React, { useContext, useState } from 'react';

export const ResultOfYearModal = ({ onClose }) => {

  const [result, setResult] = useState(() => {
    const resultYear = localStorage.getItem('result')

    return resultYear !== null ? JSON.parse(resultYear) : ''
  })

  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem('result', JSON.stringify(result))
    onClose()
  }

  return (
    <div className="fixed w-1/2 bg-white left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 shadow-2xl">
      <form>
        <header className="w-full bg-gray-100 flex items-center justify-between p-4">
          <span className='flex gap-4'>
            <Image src={'images/menu.svg'} width={15} height={15} alt="" />
            <span className='text-xl'>Итоги года</span>
          </span>
          <button onClick={onClose} className="ml-2">
            <span>
              <Image src={'images/cross.svg'} width={25} height={25} alt="" />
            </span>
          </button>            
        </header>
        <div className='px-4 h-1/2'>
          <textarea
            type="text"
            name="result"
            placeholder="Add result"
            value={result}
            rows={20}
            required
            className="text-gray-600 w-full outline-none py-4"
            onChange={(e) => setResult(e.target.value)}
          />
        </div>
      </form>
      <footer className="flex justify-end w-auto border-t p-3 mt-5">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white">
            Save
          </button>
        </footer>
      {/* 

        <form className='w-1/4 aspect-square  bg-white shadow-2xl'>

        </form> */}
      {/* <form className="bg-white rounded-lg shadow-2xl w-1/4">
      
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque iusto, itaque in repellat eos perspiciatis temporibus explicabo tenetur corrupti. Incidunt nihil exercitationem, enim odit voluptatum deserunt impedit accusantium obcaecati dolor. */}
      
        {/* 
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
              rows={5}
              required
              className="pt-3 border-0 text-gray-600 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500 z-10"
              onChange={(e) => setDescription(e.target.value)}
            />
            <span>
              <Image src={'images/bookmark.svg'} width={20} height={20} alt="" />
            </span>
            <div className="inline-flex gap-x-2 pt-10">
              {labelsClasses.map(({tooltip, color}, i) => (
                <span
                  key={i}
                  data-tooltip={tooltip}
                  className="relative w-6 h-6 rounded-full flex items-center justify-center cursor-pointer color-tooltip"
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
        </footer> */}
     
    </div>
  );
};
