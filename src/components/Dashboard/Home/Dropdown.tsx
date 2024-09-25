import React, { useState } from "react";
import styled from "styled-components";

interface DropdownProps {
  handleMonthSelect: (month: string) => void;
  selectedMonth: string;
}

const Dropdown: React.FC<DropdownProps> = ({ handleMonthSelect, selectedMonth }) => {



  const [options] = useState(["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]);
  const [showOptions, setShowOptions] = useState(false);

  const handleSelect = (option: string) => {
    handleMonthSelect(option);
    setShowOptions(false);
  };


  return (
    <StyledWrapper>
      <div className="select" onClick={() => setShowOptions(!showOptions)}>
        <div className="selected">
          {selectedMonth}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 512 512"
            className={`arrow ${showOptions ? 'open' : ''}`}
          >
            <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
          </svg>
        </div>
        {showOptions && (
          <div className="options">
            {options.map((option, index) => (
              <div key={index} className="option" onClick={() => handleSelect(option)}>
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .select {
    width: fit-content;
    cursor: pointer;
    position: relative;
    transition: 300ms;
    color: #6b728c;
    background-color: #ffffff;
    border: 1px solid #6b728c;
    border-radius: 5px;
    padding: 5px;
  }

  .selected {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #6b728c;
  }

  .arrow {
    height: 10px;
    width: 25px;
    fill: #6b728c;
    transition: 300ms;
    transform: rotate(-90deg);
  }

  .arrow.open {
    transform: rotate(0deg);
  }

  .options {
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    padding: 5px;
    background-color: #ffffff;
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 10;
    width: 150px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    border: 1px solid #6b728c;

    /* Constrain the height and allow scrolling */
    max-height: 200px; /* Set this to a value that fits within your layout */
    overflow-y: auto; /* Enable scrolling */
  }

  .option {
    padding: 10px;
    font-size: 15px;
    cursor: pointer;
    color: #6b728c;
    transition: 300ms;
  }

  .option:hover {
    background-color: #f0f0f0;
  }

  /* Customize scrollbar if needed */
  .options::-webkit-scrollbar {
    width: 8px;
  }

  .options::-webkit-scrollbar-thumb {
    background-color: #6b728c;
    border-radius: 10px;
  }
`;

export default Dropdown;
