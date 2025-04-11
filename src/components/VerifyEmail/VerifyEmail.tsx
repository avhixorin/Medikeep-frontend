import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const VerifyEmail: React.FC = () => {
  const inputsRef = useRef<HTMLInputElement[]>([]);
  const [timer, setTimer] = useState(60);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const value = e.target.value;
    if (value && idx < inputsRef.current.length - 1) {
      inputsRef.current[idx + 1].focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
    if (e.key === "Backspace" && !e.currentTarget.value && idx > 0) {
      inputsRef.current[idx - 1].focus();
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []); // runs only once on mount

  return (
    <StyledWrapper>
      <form className="form">
        <div className="title">OTP</div>
        <div className="subtitle">Verification Code</div>
        <p className="message">
          We’ve sent a verification code to your email address.
          <br />
          <span className="font-bold">{"ay***@gmail.com"}</span>
        </p>
        <div className="inputs">
          {[0, 1, 2, 3].map((i) => (
            <input
              key={i}
              type="text"
              maxLength={1}
              ref={(el) => (inputsRef.current[i] = el!)}
              onChange={(e) => handleChange(e, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              required
            />
          ))}
        </div>
        <p className="message">
          Didn’t receive the code?{" "}
          <button disabled={timer !== 0} className="font-bold" type="button">
            {timer ? `Resend after ${timer}s` : "Resend"}
          </button>
        </p>
        <button className="action" type="submit">
          Verify Me
        </button>
      </form>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  background: linear-gradient(to left, #bfdbfe, #bbf7d0, #fef9c3);
  display: flex;
  align-items: center;
  justify-content: center;

  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 400px;
    background: rgba(255, 255, 255, 0.85);
    border-radius: 16px;
    padding: 32px 24px;
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(6px);
    transition: all 0.3s ease;
  }

  .title {
    font-size: 26px;
    font-weight: bold;
    color: #333;
  }

  .subtitle {
    font-size: 18px;
    margin-top: 4px;
    color: #666;
  }

  .message {
    color: #555;
    font-size: 14px;
    margin: 12px 0;
    text-align: center;
  }

  .inputs {
    display: flex;
    gap: 12px;
    margin: 16px 0;
  }

  .inputs input {
    width: 48px;
    height: 50px;
    font-size: 20px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 8px;
    background: white;
    transition: border 0.2s ease;
  }

  .inputs input:focus {
    border-color: #6a5acd;
    outline: none;
  }

  .action {
    margin-top: 16px;
    padding: 12px 24px;
    border-radius: 10px;
    border: none;
    background-color: #6a5acd;
    color: white;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }

  .action:hover {
    background-color: #5a4ebf;
  }

  .font-bold {
    font-weight: bold;
    color: #6a5acd;
    background: none;
    border: none;
    cursor: pointer;
  }

  .font-bold:disabled {
    cursor: not-allowed;
    color: #aaa;
  }
`;

export default VerifyEmail;
