import React, { useEffect, useState } from 'react';
import { BsImages } from 'react-icons/bs';
import { FaEdit } from 'react-icons/fa';
import { FadeLoader } from 'react-spinners';
import { useSelector, useDispatch } from 'react-redux';
import {
  profile_image_upload,
  messageClear,
  profile_info_add,
} from '../../store/Reducers/authReducer';
import toast from 'react-hot-toast';
import { PropagateLoader } from 'react-spinners';
import { overrideStyle } from '../../utils/Utils';

import { create_stripe_connect_account } from '../../store/Reducers/sellerReducer';

const Profile = () => {
  const [state, setState] = useState({
    division: '',
    district: '',
    shopName: '',
    sub_district: '',
  });
  const dispatch = useDispatch();
  const { userInfo, loader, successMessage } = useSelector(
    (state) => state.auth
  );

  const add_image = (e) => {
    if (e.target.files.length > 0) {
      const formData = new FormData();
      formData.append('image', e.target.files[0]);
      dispatch(profile_image_upload(formData));
    }
  };

  const add = (e) => {
    e.preventDefault();
    dispatch(profile_info_add(state));
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      messageClear();
    }
  }, [successMessage]);

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="px-2 lg:px-7 py-5">
      <div className="w-full flex flex-wrap">
        <div className="w-full md:w-6/12">
          <div className="w-full p-4 bg-[#000000] rounded-md text-[#ffffff]">
            <div className="flex justify-center items-center py-3">
              {userInfo?.image ? (
                <label
                  htmlFor="img"
                  className="h-[310px] w-[300px] relative p-3 cursor-pointer overflow-hidden"
                >
                  <img className="w-full h-full" src={userInfo.image} alt="" />
                  {loader && (
                    <div className="bg-slate-300 absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20">
                      <span>
                        <FadeLoader />
                      </span>
                    </div>
                  )}
                </label>
              ) : (
                <label
                  className="flex justify-center items-center flex-col h-[210px] w-[300px] cursor-pointer border border-dashed hover:border-red-500 border-[#ffffff] relative"
                  htmlFor="img"
                >
                  <span>
                    <BsImages />
                  </span>
                  <span>Select Image</span>
                  {loader && (
                    <div className="bg-slate-300 absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20">
                      <span>
                        <FadeLoader />
                      </span>
                    </div>
                  )}
                </label>
              )}
              <input
                onChange={add_image}
                type="file"
                className="hidden"
                id="img"
              />
            </div>
            <div className="px-0 md:px-5 py-2">
              <div className="flex justify-between text-sm flex-col gap-2 p-4 bg-slate-800 rounded-md relative">
                <span className="p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50 absolute right-2 top-2 cursor-pointer">
                  <FaEdit />
                </span>
                <div className="flex gap-2">
                  <span>Name :</span>
                  <span>{userInfo.name}</span>
                </div>
                <div className="flex gap-2">
                  <span>Email :</span>
                  <span>{userInfo.email}</span>
                </div>
                <div className="flex gap-2">
                  <span>Role :</span>
                  <span>{userInfo.role}</span>
                </div>
                <div className="flex gap-2">
                  <span>Status :</span>
                  <span>{userInfo.status}</span>
                </div>
                <div className="flex gap-2">
                  <span>Payment Account :</span>
                  <p>
                    {userInfo.payment === 'active' ? (
                      <span className=" bg-green-500 text-white text-xs cursor-pointer font-normal ml-2 px-2 py-0.5 rounded">
                        {userInfo.payment}
                      </span>
                    ) : (
                      <span
                        onClick={() =>
                          dispatch(create_stripe_connect_account())
                        }
                        className=" bg-red-500 text-white text-xs cursor-pointer font-normal ml-2 px-2 py-0.5 rounded"
                      >
                        click active
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>
            <div className="px-0 md:px-5 py-2">
              {!userInfo?.shopInfo ? (
                <form onSubmit={add}>
                  <div className="flex flex-col w-full gap-1">
                    <label htmlFor="shop">Shop name</label>
                    <input
                      value={state.shopName}
                      onChange={inputHandle}
                      className="px-3 py-2  focus:border-indigo-500 outline-none border bg-transparent border-slate-700 rounded-md text-[#ffffff]"
                      type="text"
                      placeholder="shop name"
                      name="shopName"
                      id="shop"
                    />
                  </div>
                  <div className="flex flex-col w-full gap-1">
                    <label htmlFor="division">Division</label>
                    <input
                      value={state.division}
                      onChange={inputHandle}
                      className="px-3 py-2  focus:border-indigo-500 outline-none border bg-transparent border-slate-700 rounded-md text-[#ffffff]"
                      type="text"
                      placeholder="division"
                      name="division"
                      id="division"
                    />
                  </div>
                  <div className="flex flex-col w-full gap-1">
                    <label htmlFor="district">District </label>
                    <input
                      value={state.district}
                      onChange={inputHandle}
                      className="px-3 py-2  focus:border-indigo-500 outline-none border bg-transparent border-slate-700 rounded-md text-[#ffffff]"
                      type="text"
                      placeholder="district"
                      name="district"
                      id="district"
                    />
                  </div>
                  <div className="flex flex-col w-full gap-1">
                    <label htmlFor="sub">Sub District</label>
                    <input
                      value={state.sub_district}
                      onChange={inputHandle}
                      className="px-3 py-2  focus:border-indigo-500 outline-none border bg-transparent border-slate-700 rounded-md text-[#ffffff]"
                      type="text"
                      placeholder="sub district"
                      name="sub_district"
                      id="sub"
                    />
                  </div>
                  <button
                    disabled={loader ? true : false}
                    className=" w-[200px] bg-green-500 hover:shadow-green-500/50 hover:shadow-lg text-white rounded-md px-7 py-2 mt-5 my-2 mb-3"
                  >
                    {loader ? (
                      <PropagateLoader cssOverride={overrideStyle} />
                    ) : (
                      'Update Information'
                    )}
                  </button>
                </form>
              ) : (
                <div className="flex justify-between text-sm flex-col gap-2 p-4 bg-slate-800 rounded-md relative">
                  <span className="p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50 absolute right-2 top-2 cursor-pointer">
                    <FaEdit />
                  </span>
                  <div className="flex gap-2">
                    <span>Shop Name:</span>
                    <span>{userInfo.shopInfo?.shopName}</span>
                  </div>
                  <div className="flex gap-2">
                    <span>Division:</span>
                    <span>{userInfo.shopInfo?.division}</span>
                  </div>
                  <div className="flex gap-2">
                    <span>District:</span>
                    <span>{userInfo.shopInfo?.district}</span>
                  </div>
                  <div className="flex gap-2">
                    <span>Sub District:</span>
                    <span>{userInfo.shopInfo?.sub_district}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="w-full md:w-6/12">
          <div className="w-full pl-0 md:pl-7 mt-6 md:mt-0 ">
            <div className="bg-[#000000] rounded-md text-[#ffffff] p-4">
              <h1 className="text-white text-lg mb-3 font-semibold">
                Change Password
              </h1>
              <form>
                <div className="flex flex-col w-full gap-1">
                  <label htmlFor="email">Email</label>
                  <input
                    className="px-3 py-2  focus:border-indigo-500 outline-none border bg-transparent border-slate-700 rounded-md text-[#ffffff]"
                    type="email"
                    placeholder="email"
                    name="email"
                    id="email"
                  />
                </div>
                <div className="flex flex-col w-full gap-1">
                  <label htmlFor="o_password">Old Password</label>
                  <input
                    className="px-3 py-2  focus:border-indigo-500 outline-none border bg-transparent border-slate-700 rounded-md text-[#ffffff]"
                    type="password"
                    placeholder="old password"
                    name="old_password"
                    id="o_password"
                  />
                </div>
                <div className="flex flex-col w-full gap-1">
                  <label htmlFor="n_password">New Password</label>
                  <input
                    className="px-3 py-2  focus:border-indigo-500 outline-none border bg-transparent border-slate-700 rounded-md text-[#ffffff]"
                    type="password"
                    placeholder="new password"
                    name="new_password"
                    id="n_password"
                  />
                </div>
                <button className="bg-green-500 hover:shadow-green-500/50 hover:shadow-lg text-white rounded-md px-7 py-2 mt-5">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
