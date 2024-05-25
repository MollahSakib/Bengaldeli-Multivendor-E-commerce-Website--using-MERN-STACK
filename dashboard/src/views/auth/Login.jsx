import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineGooglePlus, AiOutlineGithub } from 'react-icons/ai';
import { FiFacebook } from 'react-icons/fi';
import { CiTwitter } from 'react-icons/ci';
import { PropagateLoader } from 'react-spinners';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { overrideStyle } from '../../utils/Utils';
import { messageClear, seller_login } from '../../store/Reducers/authReducer';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loader, errorMessage, successMessage } = useSelector(
    (state) => state.auth
  );
  const [state, setState] = useState({
    email: '',
    password: '',
  });
  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const submit = (e) => {
    e.preventDefault();
    dispatch(seller_login(state));
  };
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      navigate('/');
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage]);
  return (
    <div className="min-w-screen min-h-screen bg-[#7f7f7f] flex justify-center items-center">
      <div className="w-[400px] text-[#000000] p-2">
        <div className="bg-[#f3f6f4] p-4 rounded-md">
          <h2 className="text-xl mb-3 flex justify-center items-center font-bold">
            Welcome to Bengaldeli
          </h2>
          <p className="text-sm mb-3 flex justify-center items-center">
            Sign-in your account & Start bussiness.
          </p>
          <form onSubmit={submit}>
            <div className="flex flex-col w-full gap-1 mb-3">
              <label htmlFor="email">Email</label>
              <input
                onChange={inputHandle}
                value={state.email}
                className="px-3 py-2 outline-none border border-slate-700 bg-transparent 
                            rounded-md text-[#000000] focus:border-red-500 overflow-hidden"
                type="text"
                name="email"
                placeholder="email"
                id="email"
                required
              />
            </div>
            <div className="flex flex-col w-full gap-1 mb-5">
              <label htmlFor="password">Password</label>
              <input
                onChange={inputHandle}
                value={state.password}
                className="px-3 py-2 outline-none border border-slate-700 bg-transparent 
                            rounded-md text-[#000000] focus:border-red-500 overflow-hidden"
                type="password"
                name="password"
                placeholder="password"
                id="password"
                required
              />
            </div>
            <button
              disabled={loader ? true : false}
              className="bg-red-500 w-full hover:shadow-red-500/20 hover:shadow-ig 
                        text-white rounded-md px-7 py-2 mb-3"
            >
              {loader ? (
                <PropagateLoader cssOverride={overrideStyle} />
              ) : (
                'Login'
              )}
            </button>
            <div className="flex items-center w-full gap-3 mb-3 justify-center">
              <p>
                Create new account? <Link to="/register">Signup</Link>
              </p>
            </div>
            <div className="flex items-center w-full gap-3 mb-3 justify-center">
              <p>
                <Link to="/forgetpass">Forgotten password?</Link>
              </p>
            </div>
            <div className="flex items-center w-full mb-3 justify-center">
              <div className="w-[45%] bg-red-700 h-[1px]"></div>
              <div className="w-[10%] flex justify-center items-center">
                <span className="pd-1">OR</span>
              </div>
              <div className="w-[45%] bg-red-700 h-[1px]"></div>
            </div>
            <div className="flex justify-center items-center gap-3">
              <div
                className="w-[35px] h-[35px] flex rounded-md bg-orange-700
                            shadow-lg hover:shadow-orange-700/50 justify-center cursor-pointer
                            items-center overflow-hidden text-white"
              >
                <span>
                  <AiOutlineGooglePlus />
                </span>
              </div>
              <div
                className="w-[35px] h-[35px] flex rounded-md bg-indigo-700
                            shadow-lg hover:shadow-indigo-700/50 justify-center cursor-pointer
                            items-center overflow-hidden text-white"
              >
                <span>
                  <FiFacebook />
                </span>
              </div>
              <div
                className="w-[35px] h-[35px] flex rounded-md bg-cyan-700
                            shadow-lg hover:shadow-cyan-700/50 justify-center cursor-pointer
                            items-center overflow-hidden text-white"
              >
                <span>
                  <CiTwitter />
                </span>
              </div>
              <div
                className="w-[35px] h-[35px] flex rounded-md bg-purple-700
                            shadow-lg hover:shadow-purple-700/50 justify-center cursor-pointer
                            items-center overflow-hidden text-white"
              >
                <span>
                  <AiOutlineGithub />
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
