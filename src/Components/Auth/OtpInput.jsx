import React, { useState, useRef } from 'react';
import "../../App.css";

const OtpInput = ({ length }) => {
  const [otp, setOtp] = useState(new Array(length).fill(''));
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && index > 0 && !otp[index]) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <>
      <div className="otp-container">
        {otp.map((value, index) => (
          <input
            key={index}
            type="text"
            maxLength={1}
            value={value}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            ref={(ref) => (inputRefs.current[index] = ref)}
            className="otp-input"
          />
        ))}
      </div>
      {/* <div className='next-btn'>Verify</div> */}
    </>
  );
};

export default OtpInput;
