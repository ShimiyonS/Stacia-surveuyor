import React, { useState, useRef } from 'react'
import "../Styles/SignInPage.css"
import SignInImg from "../Assets/SignUpImg.png"
import VerifyImg from "../Assets/VerifyImg.png"
import OtpVerify from "../Assets/OtpVerify.png"
import MobileVerify from "../Assets/MobileVerify.png"
import Logo from "../Assets/IsmartLogo.svg"
import axios from 'axios'
import OTPInput from 'react-otp-input'
import OtpInput from '../Components/Auth/OtpInput'

export default function SignInpage() {
  const [verify, setVerify] = useState(false);
  const [mobileVerify, setMobileVerify] = useState(false);
  const [signInVerify, setSignInVerify] = useState(true);
  const [otpVerify, setOtpVerify] = useState(false);
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [mobile, setMobile] = useState('');
  const [getOtp, setGetOtp] = useState(false);
  const [otp, setOtp] = useState('');

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  }


  // const handleEmailVerify = async () => {
  //   await axios.post('http://192.168.29.138:8000/manager/verify-email', {
  //     emailId: email
  //   }).then((res) => {
  //     // alert("email is verified!!!)");
  //     setSignInVerify(false);
  //     setVerify(1);
  //   })
  //     .catch((err) => alert("email id is not verified!!!"))
  // }

  const handleSignIn = async () => {
    await axios.post('http://192.168.29.138:8000/manager/sign-in', {
      emailId: email,
      password: pass
    }).then((res) => alert("crt ra  :)"))
      .catch((err) => alert("thappu da  :("))
  }

  const handleMobileVerify = () => {
    setVerify(false);
    setSignInVerify(false);
    setMobileVerify(true);
  }

  const handleEmailVerifyScreen = () => {
    setSignInVerify(true);
    setEmail(true);
    setOtpVerify(false);
    setMobileVerify(false);
  }

  const handleOtpVerifyScreen = async () => {
    try {
      const res = await axios.post(`http://192.168.0.115:8002/auth/otp-login`, {
        mobileNo: mobile
      }
      );
      console.log(res.data)
      if (res.data.success) {
        console.log(res.data.OTP);
        setVerify(false);
        setSignInVerify(false);
        setMobileVerify(false);
        setOtpVerify(true);
      } else {
        console.log("error");
        console.log(res.data)
      }
    } catch (err) {
      console.log(err);
    }
  }


  const handleOtp = async () => {
    try {
      const res = await axios.post(`http://192.168.0.115:8002/auth/verify-otp`, {

      })
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div className="sign-in-page">
      <div className="sign-in-left">
        {
          verify && <img src={VerifyImg} alt="" />
        }
        {
          mobileVerify && <img src={MobileVerify} alt="" srcset="" />
        }
        {
          signInVerify && <img src={SignInImg} alt="" srcset="" />
        }
        {
          otpVerify && <img src={OtpVerify} alt='' />
        }

        <div className="sign-in-overlay">
          <div style={{ display: 'flex', flexDirection: 'column', rowGap: '10px' }}>
            <div className="good-network-box">
              <div className="good-network-text">The Good Network</div>
            </div>

            <div className="line"></div>
            <div className="we-text">We are</div>
            <div className="invite-text">Invite only right now</div>
            <div className="desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus molestiae voluptatem explicabo, recusandae nulla sequi aut</div>
          </div>

          <div className="lorem-text-box">
            <div className="lorem-text">Lorem ipsum is simply</div>
            <div className="lorem-text1">Lorem ipsum is simply</div>
          </div>
        </div>
      </div>

      <div className="sign-in-right">
        <div className='sign-in-right2'>
          <div className="ismart-logo">
            <img src={Logo} alt="" />
          </div>
          {
            signInVerify && <div className="sign-up-text">Sign in your account</div>
          }

          {
            verify && <div className="sign-up-text">Sign in your account</div>
          }

          {
            mobileVerify && <div className="sign-up-text">Sign in using Mobile Number</div>
          }

          {
            otpVerify && <div className="sign-up-text">Enter OTP code</div>
          }

          {
            otpVerify ? <div className="welcome-text">Enter the 6 - digit OTP code we send to +91 9654852686</div> : <div className="welcome-text">Welcome back Select method to sign up :</div>
          }

          {
            otpVerify && <OtpInput length={6} />
          }

          {
            signInVerify && <div>
              <div className="email">Email</div>
              <div className="email-input">
                <input type="email" placeholder='Enter your email' onChange={handleInputChange} />
              </div>
            </div>
          }

          {
            verify && <div>
              <div className="email">Password</div>
              <div className="email-input">
                <input type="password" placeholder='Enter your password' onChange={(e) => setPass(e.target.value)} />
              </div>
            </div>
          }

          {
            mobileVerify && <div>
              <div className="email">Mobile number</div>
              <div className="email-input">
                <input type="number" placeholder='Enter your mobile number' onChange={(e) => setMobile(e.target.value)} />
              </div>
            </div>
          }

          {/* {
            mobileVerify && (<div className="next-btn" onClick={handleOtpVerifyScreen}>
              Send otp
            </div>)
          } */}

          {/* {
            verify ? (
              <div className="next-btn" onClick={handleSignIn}>
                Sign in
              </div>) : <div className="next-btn" onClick={handleSignIn}>
              Sign in
            </div>
          } */}

          
          {
            mobileVerify ? <div className="next-btn" onClick={handleOtpVerifyScreen}>
              Send otp
            </div> : verify ? <div className="next-btn" onClick={handleSignIn}>
              Sign in
            </div> : <div className="next-btn"
              onClick={handleOtp}
            >
              Verify
            </div>
          }

          {
            verify && <>
              <div className="forgot">
                <a href="">Forgot Password</a>
              </div>
              <div style={{ color: '#D3D3D3', textAlign: 'center' }}>or</div>

            </>
          }
          {
            mobileVerify && (
              <div className="sign-with-mobile" onClick={handleEmailVerifyScreen}>
                Back to sign up with email
              </div>
            )
          }
          {
            signInVerify && (
              (
                <div className="sign-with-mobile" onClick={handleMobileVerify}>
                  Sign in with Mobile Number
                </div>
              )
            )
          }
          {
            otpVerify && (
              <div className="sign-with-mobile" onClick={handleEmailVerifyScreen}>
                Back to sign up with email
              </div>)
          }
        </div>
      </div>
    </div>
  )
}
