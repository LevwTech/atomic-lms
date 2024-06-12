// src/Dropdown.js
import { useState, useEffect, useRef } from "react";
import { useDebouncedCallback } from "use-debounce";

const Dropdown = ({ options, query, setQuery, setParentCourse, isLoading }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(true);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const debounced = useDebouncedCallback(
    // function
    (value) => {
      setQuery(value);
    },
    // delay in ms
    500,
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="dropdown w-full" ref={dropdownRef}>
      <input
        type="text"
        placeholder="Search..."
        className="rounded"
        onChange={(e) => debounced(e.target.value)}
        onClick={toggleDropdown}
      />
      {isOpen && (
        <ul className="dropdown-list ">
          {query === "" ? (
            <div className="p-4"> No search results </div>
          ) : isLoading ? (
            <div className="p-4 flex justify-center items-center">
              <p>Loading...</p>
            </div>
          ) : (
            options.map((option, index) => (
              <li
                onClick={() => {
                  setParentCourse(option.id);
                  setIsOpen(false);
                }}
                key={index}
                className="dropdown-list-item justify-between flex"
              >
                <p> {option.name}</p>
                <p> {option.code}</p>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
