import React from "react";

//sfc- stateless function component

const Like = props => {
  //The filled and empty heart classes from font-awsome
  let cssClass = "fa fa-heart";
  if (!props.clicked) cssClass += "-o";

  return (
    <React.Fragment>
      <i
        className={cssClass}
        aria-hidden={true}
        style={{ cursor: "pointer" }}
        onClick={props.onClick}
      />
    </React.Fragment>
  );
};

export default Like;
