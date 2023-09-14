import React, { useRef } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userAxios from '../../../Axios/UserAxios';

const SignUp = () => {
  const [username, setusername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const usernameErr = useRef(null),
    passwordErr = useRef(null),
    emailErr = useRef(null),
    phoneErr = useRef(null);
  const Unsernameinput = useRef(null),
    Passwordinput = useRef(null),
    emailinput = useRef(null),
    phoneInput = useRef(null);
  const navigate = useNavigate(null);
  const backgroundImage = {
    backgroundImage: "url(../../../../public/images//wallpaper.jpg)",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };
  function validation(nums) {
    let flag = true; // Initialize flag to true
    if (nums.includes(1)) {
      setusername(Unsernameinput.current.value);
      if (username.trim() === '') {
        flag = false;
        usernameErr.current.innerText = 'Username is required';
        Unsernameinput.current.style.borderColor = 'red';
      } else {
        usernameErr.current.innerText = '';
        Unsernameinput.current.style.borderColor = 'green';
      }
    }
    if (nums.includes(2)) {
      setEmail(emailinput.current.value);
      const isValidEmail = (email) => {
        // Basic email validation using regular expression
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
      };
      if (email.trim() === '') {
        emailErr.current.innerText = 'Email is required';
        emailinput.current.style.borderColor = 'red';
        flag = false;
      } else if (!isValidEmail(email)) {
        emailErr.current.innerText = 'Invalid email format';
        emailinput.current.style.borderColor = 'red';
        flag = false;
      } else {
        emailErr.current.innerText = '';
        emailinput.current.style.borderColor = 'green';
      }
    }
    if (nums.includes(3)) {
      setPhone(phoneInput.current.value);
      if (phone.trim() === '') {
        phoneErr.current.innerText = 'Phone number is required';
        phoneInput.current.style.borderColor = 'red';
        flag = false;
      } else {
        phoneErr.current.innerText = '';
        phoneInput.current.style.borderColor = 'green';
      }
    }
    if (nums.includes(4)) {
      setPassword(Passwordinput.current.value);
      if (password.trim() === '') {
        passwordErr.current.innerText = 'Password is required';
        Passwordinput.current.style.borderColor = 'red';
        flag = false;
      } else {
        passwordErr.current.innerText = '';
        Passwordinput.current.style.borderColor = 'green';
      }
    }
    return flag;
  }

  const handleSignin = (e) => {
    e.preventDefault();
    const check = validation([1, 2, 3, 4])
    if (check) {
      userAxios
        .post('/signUp', { username, email, phone, password })
        .then((res) => {
          if (res.data.success) {
            navigate('/login');
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };



  return (
    <>
      <div className="w-[1440px] h-[1024px] p-8" style={backgroundImage}>
        <form onSubmit={handleSignin}>
          <div className="text-black text-[34px] font-normal mb-8">Sign up</div>

          <div className='mb-3'>
            <p className="mb-2 text-black text-2xl font-normal">USERNAME</p>
            <input type="text" onChange={() => validation([1])} className="w-[350px] h-10 mb- bg-stone-800 text-white border-b-2 border-stone-800" ref={Unsernameinput} />
            <div className="h-4 w-full ">
              <span ref={usernameErr} className="m text-red-600"></span>
            </div>
          </div>

          <div className='mb-3'>
            <p className="mb-2 text-black text-2xl font-normal">EMAIL</p>
            <input type="email" name="email" onChange={() => validation([2])} className="w-[350px] h-10  bg-stone-800 text-white  border-b-2 border-stone-800" ref={emailinput} />
            <div className="h-4 w-full ">
              <span ref={emailErr} className="m text-red-600" ></span>
            </div>
          </div>

          <div className='mb-3'>
            <p className="mb-2 text-black text-2xl font-normal">
              MOBILE NUMBER</p>
            <input type="text" name="mobileNumber" onChange={() => validation([3])} className="w-[350px] h-10  bg-stone-800 text-white  border-b-2 border-stone-800" ref={phoneInput} />
            <div className="h-4 w-full ">
              <span ref={phoneErr} className="m text-red-600" ></span>
            </div>
          </div>

          <div className='mb-3'>
            <p className="mb-2 text-black text-2xl font-normal">PASSWORD</p>
            <input type="password" name="password" onChange={() => validation([4])} className="w-[350px] h-10  bg-stone-800 text-white  border-b-2 border-stone-800" ref={Passwordinput} />
            <div className="h-4 w-full ">
              <span ref={passwordErr} className="m text-red-600" ></span>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-[180px] h-[45px] bg-stone-600 rounded-[100px] text-black text-xl font-normal border border-black hover:bg-black hover:text-white"
            >
              SIGN UP
            </button>
          </div>

          <div className="mt-4 text-white text-lg font-normal"
          onClick={()=> navigate('/login')}>
            Do you have an account? Just Login
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUp;
