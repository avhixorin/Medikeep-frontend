import styled from "styled-components";

const Switch = ({
  isDoctor,
  handleRoleChange,
}: {
  isDoctor: string;
  handleRoleChange: (role:string) => void;
}) => {
  return (
    <StyledWrapper>
      <div className="radio-inputs">
        <label className="radio">
          <input
            type="radio"
            name="role"
            value="doctor"
            checked={ isDoctor === "Yes"}
            onChange={() => handleRoleChange("Yes")}
          />
          <span className="name">Yes</span>
        </label>
        <label className="radio">
          <input
            type="radio"
            name="role"
            value="patient"
            checked={ isDoctor === "No"}
            onChange={() => handleRoleChange("No")}
          />
          <span className="name">No</span>
        </label>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .radio-inputs {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    border-radius: 4px;
    background-color: #eee;
    box-sizing: border-box;
    padding: 0.2rem;
    width: 240px;
    font-size: 12px;
    height: 36px;
  }

  .radio-inputs .radio {
    flex: 1 1 auto;
    text-align: center;
  }

  .radio-inputs .radio input {
    display: none;
  }

  .radio-inputs .radio .name {
    display: flex;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    border: none;
    padding: 0.4rem 0;
    color: rgba(51, 65, 85, 1);
    transition: all 0.15s ease-in-out;
  }

  .radio-inputs .radio input:checked + .name {
    background-color: #fff;
    font-weight: 600;
  }
`;

export default Switch;
