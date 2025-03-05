import React from 'react';

const CancelfillIcon = ({ className }) => {
  return (
    <div className={className}>
      <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 15.058 15.058'>
        <path
          id='cancel'
          d='M12.856,2.208a7.529,7.529,0,1,0,0,10.653A7.541,7.541,0,0,0,12.856,2.208Zm-2.22,7.546a.628.628,0,1,1-.888.888L7.529,8.421,5.311,10.64a.628.628,0,1,1-.888-.888L6.642,7.534,4.423,5.315a.628.628,0,1,1,.888-.888L7.529,6.646,9.748,4.427a.628.628,0,1,1,.888.888L8.417,7.534Z'
          transform='translate(0 -0.005)'
          fill='currentColor'
        />
      </svg>
    </div>
  );
};

export const CancelIcon = () => {
  return (
    <div>
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'>
        <path fill='none' d='M0 0h24v24H0z' />
        <path
          fill='currentcolor'
          d='M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z'
        />
      </svg>
    </div>
  );
};
export default CancelfillIcon;
