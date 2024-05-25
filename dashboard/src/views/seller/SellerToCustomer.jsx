import React, { useEffect, useRef, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { FaList } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { socket } from '../../utils/Utils';
import { BsEmojiSmile } from 'react-icons/bs';

import {
  get_customers,
  messageClear,
  get_customer_message,
  send_message,
  updateMessage,
} from '../../store/Reducers/chatReducer';

const SellerToCustomer = () => {
  const scrollRef = useRef();
  const { userInfo } = useSelector((state) => state.auth);
  const {
    customers,
    currentCustomer,
    messages,
    successMessage,
    activeCustomer,
  } = useSelector((state) => state.chat);
  const [receverMessage, setReceverMessage] = useState('');
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const { customerId } = useParams();

  const [show, setshow] = useState(false);

  useEffect(() => {
    dispatch(get_customers(userInfo._id));
  }, []);
  useEffect(() => {
    if (customerId) {
      dispatch(get_customer_message(customerId));
    }
  }, [customerId]);

  const send = (e) => {
    e.preventDefault();
    dispatch(
      send_message({
        senderId: userInfo._id,
        receverId: customerId,
        text,
        name: userInfo?.shopInfo?.shopName,
      })
    );
    setText('');
  };
  useEffect(() => {
    if (successMessage) {
      socket.emit('send_seller_message', messages[messages.length - 1]);
      dispatch(messageClear());
    }
  }, [successMessage]);

  useEffect(() => {
    socket.on('customer_message', (msg) => {
      setReceverMessage(msg);
    });
    // socket.on('activeSeller', (sellers) => {
    //     setActiveSeller(sellers)
    // })
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (receverMessage) {
      if (
        customerId === receverMessage.senderId &&
        userInfo._id === receverMessage.receverId
      ) {
        dispatch(updateMessage(receverMessage));
      } else {
        toast.success(receverMessage.senderName + ' ' + 'send a message');
        dispatch(messageClear());
      }
    }
  }, [receverMessage]);

  return (
    <div className="px-2 lg:px-7 py-5">
      <div className="w-full bg-[#000000] px-4 py-4 rounded-md h-[calc(100vh-140px)]">
        <div className="flex w-full h-full relative">
          <div
            className={`w-[280px] h-full absolute z-10 ${
              show ? '-left-[16px]' : '-left-[336px]'
            } md:left-0 md:relative transition-all`}
          >
            <div className="w-full h-[calc(100vh-177px)] bg-[#252b3b] md:bg-transparent overflow-auto">
              <div className="flex text-xl justify-between items-center p-4 md:p-0 md:px-3 md:pb-3 text-white">
                <h2>Customers</h2>
                <span
                  onClick={() => setshow(!show)}
                  className="block cursor-pointer md:hidden"
                >
                  <IoMdClose />
                </span>
              </div>
              {customers.map((c, i) => (
                <Link
                  key={i}
                  to={`/seller/dashboard/chat-customer/${c.fdId}`}
                  className={`h-[60px] flex justify-start gap-2 items-center text-white px-2 py-2 rounded-sm cursor-pointer bg-slate-700`}
                >
                  <div className="relative">
                    <img
                      className="w-[38px] h-[38px] border-white border-2 max-w-[38px] p-[2px] rounded-full"
                      src={`http://localhost:3001/images/customer.png`}
                      alt=""
                    />
                    {activeCustomer.some((a) => a.customerId === c.fdId) && (
                      <div className="w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0"></div>
                    )}
                  </div>
                  <div className="flex justify-center items-start flex-col w-full">
                    <div className="flex justify-between items-center w-full">
                      <h2 className="text-base font-semibold">{c.name}</h2>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="w-full md:w-[calc(100%-200px)] md:pl-4">
            <div className="flex justify-between items-center">
              {customerId && (
                <div className="flex justify-start items-center gap-3">
                  <div className="relative">
                    <img
                      className="w-[42px] h-[42px] border-green-500 border-2 max-w-[38px] p-[2px] rounded-full"
                      src={`http://localhost:3001/images/customer.png`}
                      alt=""
                    />
                    {activeCustomer.some(
                      (a) => a.customerId === currentCustomer._id
                    ) && (
                      <div className="w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0"></div>
                    )}
                  </div>
                  <h2 className="text-base text-white font-semibold">
                    {currentCustomer.name}
                  </h2>
                </div>
              )}
              <div
                onClick={() => setshow(!show)}
                className="w-[35px] flex lg:hidden 
        h-[35px] rounded-md bg-[#d4c4c4] shadow-lg hover:shadow-white-500 hover:opacity-70 justify-center cursor-pointer"
              >
                <span className="flex justify-between items-center">
                  <FaList />
                </span>
              </div>
            </div>
            <div className="py-4">
              <div className="bg-slate-800 h-[calc(100vh-290px)] rounded-md p-3 overflow-auto">
                {customerId ? (
                  messages.map((m, i) => {
                    if (m.senderId === customerId) {
                      return (
                        <div
                          ref={scrollRef}
                          key={i}
                          className="w-full flex justify-start items-center"
                        >
                          <div className="flex justify-start items-start gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]">
                            <div>
                              <img
                                className="w-[38px] h-[38px] border-2 border-white rounded-full max-w-[38px] p-[3px]"
                                src={`http://localhost:3001/images/customer.png`}
                                alt=""
                              />
                            </div>
                            <div className="flex justify-center items-start flex-col w-full bg-green-500 shadow-lg shadow-green-500/50 text-white py-1 px-2 rounded-sm">
                              <span>{m.message}</span>
                            </div>
                          </div>
                        </div>
                      );
                    } else {
                      return (
                        <div
                          ref={scrollRef}
                          key={i}
                          className="w-full flex justify-end items-center"
                        >
                          <div className="flex justify-start items-start gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]">
                            <div className="flex justify-center items-start flex-col w-full bg-blue-500 shadow-lg shadow-green-500/50 text-white py-1 px-2 rounded-sm">
                              <span>{m.message}</span>
                            </div>
                            <div>
                              <img
                                className="w-[38px] h-[38px] border-2 border-white rounded-full max-w-[38px] p-[3px]"
                                src={userInfo?.image}
                                alt=""
                              />
                            </div>
                          </div>
                        </div>
                      );
                    }
                  })
                ) : (
                  <div className="w-full h-full flex justify-center items-center flex-col gap-2 text-white">
                    <span>
                      <BsEmojiSmile />
                    </span>
                    <span>Select Customer</span>
                  </div>
                )}
              </div>
            </div>
            <form onSubmit={send} className=" flex gap-3">
              <input
                readOnly={customerId ? false : true}
                onChange={(e) => setText(e.target.value)}
                value={text}
                className="w-full flex justify-between px-2 border border-slate-700 items-center py-[5px] focus:border-blue-500
                        rounded-md outline-none bg-transparent text-[#d0d2d6]"
                type="text"
                placeholder="input your message"
              />
              <button
                disabled={customerId ? false : true}
                className="flex justify-center items-center bg-cyan-500 shadow-lg hover:shadow-cyan-500/50 font-semibold w-[75px] h-[35px] rounded-md text-white"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerToCustomer;
