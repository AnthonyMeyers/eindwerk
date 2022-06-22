import React from "react";

const Errormessage = ({ children, className }) => {
  return (
    <>
      {!children && <p></p>}
      {children && <p className={className}>{children}</p>}
    </>
  );
};

export default Errormessage;
