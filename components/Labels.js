import GlobalContext from '@/context/GlobalContext';
import React from 'react';

export const Labels = () => {
  const { labels, updateLabel } = React.useContext(GlobalContext);

  return (
    <>
      <p className="text-gray-500 font-bold mt-10">Label</p>
      {labels.map(({ label: lbl, checked }, idx) => (
        <label key={idx} className="items-center mt-3 flex">
          <input
            type="checkbox"
            onChange={() => updateLabel({ label: lbl, checked: !checked })}
            checked={checked}
            className={`h-4 w-4 text-${lbl}-400 rounded focus:ring-0 cursor-pointer`}
          />
          <span className="ml-2 text-md text-gray-700 capitalize">{lbl}</span>
        </label>
      ))}
    </>
  );
};
