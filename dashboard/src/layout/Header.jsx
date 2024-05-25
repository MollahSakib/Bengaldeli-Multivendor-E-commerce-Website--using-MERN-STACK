import React from 'react';
import { FaList } from 'react-icons/fa';
import { useSelector } from 'react-redux';
const Header = ({ showSidebar, setShowSidebar }) => {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <div className="fixed top-0 left-0 w-full py-5 px-2 lg:px-7 z-40">
      <div
        className="ml-0 lg:ml-[260px] rounded-md h-[65px] flex justify-between
        items-center bg-[#000000] text-[#ffffff] px-5 transition-all"
      >
        <div
          onClick={() => setShowSidebar(!showSidebar)}
          className="w-[35px] flex lg:hidden 
        h-[35px] rounded-md bg-[#d4c4c4] text-[#000000] shadow-lg hover:shadow-white-500 hover:opacity-70 justify-center cursor-pointer"
        >
          <span className="flex justify-between items-center">
            <FaList />
          </span>
        </div>
        <div className="hidden md:block">
          <input
            className="px-4 py-2 outline-none border bg-transparent border-slate-700 rounded-md text-[#ffffff]
           focus:border-red-500 overflow-hidden"
            type="text"
            name="search"
            placeholder="search"
          />
        </div>
        <div className="flex justify-center items-center gap-8 relative">
          <div className="flex justify-center items-center">
            <div className="flex justify-center items-center gap-3">
              <div className="flex justify-center items-center flex-col text-end">
                <h2 className="text-sm font-bold">{userInfo.name}</h2>
                <span className="text-[14px] w-full font-normal">
                  {userInfo.role}
                </span>
              </div>
              {userInfo.role === 'admin' ? (
                <img
                  className="w-[45px] h-[45px] rounded-md overflow-hidden"
                  src={'http://localhost:3001/images/admin.jpg'}
                  alt=""
                />
              ) : (
                <img
                  className="w-[45px] h-[45px] rounded-md overflow-hidden"
                  src={userInfo?.image}
                  alt=""
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
