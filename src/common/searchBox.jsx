import React from "react";
import Input from "./input";

const SearchBox = ({ value, onChange }) => {
  return (
    <Input
      name={"search"}
      placeholder="Search..."
      className="form-controll mr-2"
      value={value}
      onChange={event => onChange(event.target.value)}
    />
  );
};

export default SearchBox;

/* <form class="form-inline">
        <input
          class="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
          Search
        </button>
      </form>*/
