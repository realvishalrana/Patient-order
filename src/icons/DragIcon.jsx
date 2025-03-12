import React from "react";

const DragIcon = (props) => {
  return (
    // <svg
    //   xmlns='http://www.w3.org/2000/svg'
    //   viewBox='0 0 24 24'
    //   id='draggable-dots'
    //   fill='currentColor'
    //   {...props}
    // >
    //   <path
    //     fill='currentColor'
    //     d='M8.5 17c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm7-10c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-7 3c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm7 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 7c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-7-14c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z'
    //   ></path>
    // </svg>
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="currentColor"
      {...props}
    >
      <circle cx="8" cy="5" r="2" />
      <circle cx="16" cy="5" r="2" />
      <circle cx="8" cy="12" r="2" />
      <circle cx="16" cy="12" r="2" />
      <circle cx="8" cy="19" r="2" />
      <circle cx="16" cy="19" r="2" />
    </svg>
  );
};

export default DragIcon;
