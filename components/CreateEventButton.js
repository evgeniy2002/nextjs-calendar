import Image from 'next/image';
import React from 'react';

export const CreateEventButton = () => {
  return (
    <button className="border p-2 rounded-full flex items-center duration-300 shadow-md hover:shadow-xl hover:duration-300">
      <Image src={'/images/plus.svg'} width={25} height={25} className="w-7 h-7" alt="" />
      <span className="p-2">Create</span>
    </button>
  );
};
