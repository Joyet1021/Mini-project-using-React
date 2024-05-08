import React from "react";

function button(props) {
  const { children, className, onClick } = props;
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}

export default button;
