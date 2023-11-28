import React from "react";

type Props = {};

const CheckCircle = React.memo(function ({}: Props) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="ml-8"
    >
      <path
        d="M7.32031 13.1797L14.8203 5.67969L13.6484 4.46875L7.32031 10.7969L4.35156 7.82812L3.17969 9L7.32031 13.1797ZM3.10156 3.14062C4.74219 1.5 6.70833 0.679688 9 0.679688C11.2917 0.679688 13.2448 1.5 14.8594 3.14062C16.5 4.75521 17.3203 6.70833 17.3203 9C17.3203 11.2917 16.5 13.2578 14.8594 14.8984C13.2448 16.513 11.2917 17.3203 9 17.3203C6.70833 17.3203 4.74219 16.513 3.10156 14.8984C1.48698 13.2578 0.679688 11.2917 0.679688 9C0.679688 6.70833 1.48698 4.75521 3.10156 3.14062Z"
        fill="#D4009B"
      />
    </svg>
  );
});

CheckCircle.displayName = "CheckCircle";
export default CheckCircle;
