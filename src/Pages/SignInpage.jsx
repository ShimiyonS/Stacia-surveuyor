import React, { useState } from 'react'
import "../Styles/SignInPage.css"
import SignInImg from "../Assets/SignUpImg.svg"
import VerifyImg from "../Assets/VerifyImg.svg"
import MobileVerify from "../Assets/MobileVerify.svg"
import Logo from "../Assets/IsmartLogo.svg"
import axios from 'axios'
import OTPInput from 'react-otp-input'

export default function SignInpage() {
  const [verify, setVerify] = useState(false);
  const [mobileVerify, setMobileVerify] = useState(false);
  const [signInVerify, setSignInVerify] = useState(true);
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [mobile, setMobile] = useState('');
  const [getOtp, setGetOtp] = useState(false);
  const [otp, setOtp] = useState('');

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  }


  const handleEmailVerify = async () => {
    await axios.post('http://192.168.29.138:8000/manager/verify-email', {
      emailId: email
    }).then((res) => {
      // alert("email is verified!!!)");
      setSignInVerify(false);
      setVerify(1);
    })
      .catch((err) => alert("email id is not verified!!!"))
  }

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

  const handleGetOtp = async () => {
    await axios.post('http://192.168.29.138:8000/manager/otp-signin', {
      mobileNo: mobile
    }).then((res) => alert(res.data.otp))
      .catch((err) => alert("number thappu da bunda"))
  }

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
          <div className="welcome-text">Welcome back Select method to sign up :</div>
          {
            mobileVerify ? '' : <div>
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
          {/* <OTPInput
            inputStyle={
              {
                height: '30px',
                width: '30px',
                marginRight: '20px'
              }
            }
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderInput={(props) => <input {...props} />}
          /> */}
          {
            mobileVerify ? <div className="next-btn" onClick={handleGetOtp}>
              Get otp
            </div> : verify ? <div className="next-btn" onClick={handleSignIn}>
              Sign in
            </div> : <div className="next-btn" onClick={handleEmailVerify}>
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
          <div className="sign-with-mobile" onClick={handleMobileVerify}>
            Sign in with Mobile Number
          </div>
        </div>
      </div>
    </div>
  )
}
