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
            Bengaldeli
          </h2>
          <p className="text-md mb-3 flex justify-center items-center">
            Please enter your email address to search for your account.
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

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="bg-green-500 hover:shadow-green-500/20 hover:shadow-ig text-white rounded-md px-7 py-2 mb-3">
                <Link to="/login">back</Link>
              </button>
              <button
                disabled={loader ? true : false}
                className="bg-red-500 hover:shadow-red-500/20 hover:shadow-ig text-white rounded-md px-7 py-2 mb-3"
              >
                {loader ? (
                  <PropagateLoader cssOverride={overrideStyle} />
                ) : (
                  'next'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
