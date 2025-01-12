import Image from 'next/image'
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import GlobalContext from '@/context/GlobalContext';
import classNames from 'classnames';
import { ResultOfYearModal } from './ResultOfYearModal';
import { createPortal } from 'react-dom';

const statusTask = {
  '#F7455B': 'unsuccess',
  '#efaa1c': 'notfinished',
  '#2b68ead4': 'success',
  '#9BA1B6': 'created'
};

export const WidgetsBar = () => {
  const inputRef = useRef(null);

  const { savedEvents } = useContext(GlobalContext);
  const [weight, setWeight] = useState('');
  const [prevWeight, setPrevWeight] = useState(0);
  const [inProgressTitle, setInProgressTitle] = useState('');
  const [statusTasks, setStatusTasks] = useState({});
  const [showResultYear, setShowResultYear] = useState(false);
  const [isEdit, setIsEdit] = useState(false)

  useEffect(() => {
    if (savedEvents) {
      const eventsMap = savedEvents.reduce((acc, { label }) => {
        const statusKey = statusTask[label];
        if (statusKey) {
          acc[statusKey] = (acc[statusKey] || 0) + 1;
          acc.total = (acc.total || 0) + 1;
        }
        return acc;
      }, {});
      setStatusTasks(eventsMap);
    }
  }, [savedEvents])

  useEffect(() => {
    const widget = JSON.parse(localStorage.getItem('widget'))

    if (widget) {
      setWeight(widget.weight);
      setInProgressTitle(widget.inProgressTitle);
      setPrevWeight(widget.diffWeight)
    }
  }, [isEdit]);

  const handleClickInput = () => {
    if (isEdit && inputRef.current) {
      inputRef.current.focus();
    }
  }

  const handleChangeWidget = () => {
    const widget = JSON.parse(localStorage.getItem('widget'))
   
    const widgetEvent = {
      weight,
      inProgressTitle,
      diffWeight: (weight - widget.weight).toFixed(1)
    }

    localStorage.setItem('widget', JSON.stringify(widgetEvent));
    setIsEdit(false)
  }

  return (
    <div className='mt-10 flex flex-col gap-10'>
      <div className='flex flex-col gap-5'>
        <div className='flex items-center flex-wrap' onClick={handleClickInput}>
          <Image src={'/images/weight.svg'} width={22} height={22} alt="" />
          <span className='flex-1 text-xl font-medium select-none ml-2'>Вес: </span>
          <input
            ref={inputRef}
            type="text"
            name="title"
            value={weight}
            disabled={!isEdit}
            required
            className={classNames("w-1/5  h-full text-center bg-gray-100 font-medium duration-150 outline-none", {
              '!bg-white duration-150': isEdit
            })}
            onChange={(e) => setWeight(e.target.value)}
          />
          <span className='relative mr-2'>Кг</span>
          <span className='flex items-center'>
            <span className='font-bold'>{prevWeight}</span>

            <span className='relative top-1'>
            {
              prevWeight > 0 
                ? <Image src={'/images/arrow-up.svg'} width={22} height={22} className='animate-bounce' alt=''/>
                : <Image src={'/images/arrow-down.svg'} width={22} height={22} className='animate-bounce' alt=''/>
            }
            </span>
            
          </span>
        </div>
        <div className='flex gap-2'>  
          <Image src={'/images/study.svg'} width={22} height={22} alt="" className='self-start'/>
        
          <div className='flex flex-col gap-1'>
            <h3 className='text-xl font-medium select-none'>В изучение:</h3>
            
            <textarea
                type="text"
                name="title"
                placeholder="Текущая задача"
                value={inProgressTitle}
                disabled={!isEdit}
                rows={2}
                required
                className={classNames("p-2 bg-gray-100 outline-none rounded duration-150  w-full border-b-[1px] border-gray-200", {
                  'bg-white duration-150': isEdit
                })}
                onChange={(e) => setInProgressTitle(e.target.value)}
              />
          </div>
        </div>
        <div className={`grid ${isEdit ? 'grid-cols-2' : 'grid-cols-1'}`}>
          <button
            onClick={() => {
              if(!isEdit) {
                setIsEdit(true)
              }else{
                handleChangeWidget()
              }
            }}
            className=" bg-red-500  hover:bg-red-600 hover:duration-300 duration-300 px-3 py-2 rounded text-white">
            {isEdit ? 'Сохранить' : 'Редактировать'}
          </button>
          {
            isEdit && (
              <button 
                onClick={() => setIsEdit(false)} 
                className='hover:text-blue-600'>
                  Отменить
              </button>
            )
          } 
        </div>
      </div>

      <div className=''>
        <div className='flex items-center gap-2 pb-3'>
          <Image src={'/images/statistics.svg'} width={22} height={22} alt="" />
          <h3 className='text-xl font-medium'>Статистика:</h3>
        </div>

        <div className='grid'>
          <div className='relative'>
            <span>Выполнено</span>
            <span className='absolute right-0 text-[#2b68ead4]'>{statusTasks.success}</span>
          </div>
          <div className='relative'>
            <span>Не доделано</span>
            <span className='absolute right-0 text-[#efaa1c]'>{statusTasks.notfinished}</span>
          </div>
          <div className='relative'>
            <span>Не выполнено</span>
            <span className='absolute right-0 text-[#F7455B]'>{statusTasks.unsuccess}</span>
          </div>
          <div className='relative'>
            <span>Создано</span>
            <span className='absolute right-0 text-[#9BA1B6]'>{statusTasks.created}</span>
          </div>
          <div className='relative mt-4 border-t-[1px] pt-2'>
            <span>Всего</span>
            <span className='absolute right-0'>{statusTasks.total}</span>
          </div>
        </div>
      </div>

      <div className='widget-hover flex items-center gap-2 group' onClick={() => setShowResultYear(true)}>
        <Image src={'images/calendar.svg'} width={20} height={20} alt="" />
        <p className='relative w-full text-xl font-medium'>Итоги года <span className='absolute right-0'>&#8594;</span></p>
      </div>
    

      {showResultYear && createPortal(
        <ResultOfYearModal onClose={() => setShowResultYear(false)} />,
        document.body
      )}
    </div>
  )
}
