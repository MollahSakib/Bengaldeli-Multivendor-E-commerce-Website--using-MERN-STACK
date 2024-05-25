import React, { forwardRef, useEffect, useState } from 'react';
import { BsCurrencyDollar } from 'react-icons/bs';
import toast from 'react-hot-toast';
import moment from 'moment';
import { FixedSizeList as List } from 'react-window';
import { useSelector, useDispatch } from 'react-redux';
import {
  get_seller_payemt_details,
  send_withdrowal_request,
  messageClear,
} from '../../store/Reducers/PaymentReducer';

function handleOnWheel({ deltaY }) {
  console.log('handleOnWheel', deltaY);
}
const outerElementType = forwardRef((props, ref) => (
  <div ref={ref} onWheel={handleOnWheel} {...props} />
));
const Payments = () => {
  const [amount, setAmount] = useState(0);
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const {
    successMessage,
    errorMessage,
    loader,
    pendingWithdrows,
    successWithdrows,
    totalAmount,
    withdrowAmount,
    pendingAmount,
    availableAmount,
  } = useSelector((state) => state.payment);

  const Row = ({ index, style }) => {
    return (
      <div style={style} className="flex text-sm">
        <div className="w-[25%] p-2 whitespace-nowrap">{index + 1}</div>
        <div className="w-[25%] p-2 whitespace-nowrap">
          ${pendingWithdrows[index]?.amount}
        </div>
        <div className="w-[25%] p-2 whitespace-nowrap">
          <span className="py-[1px] px-[5px] bg-slate-500 text-blue-300 rounded-md text-xs">
            {pendingWithdrows[index]?.status}
          </span>
        </div>
        <div className="w-[25%] p-2 whitespace-nowrap">
          {moment(pendingWithdrows[index]?.createdAt).format('LL')}
        </div>
      </div>
    );
  };

  const Rows = ({ index, style }) => {
    return (
      <div style={style} className="flex text-sm">
        <div className="w-[25%] p-2 whitespace-nowrap">{index + 1}</div>
        <div className="w-[25%] p-2 whitespace-nowrap">
          ${successWithdrows[index]?.amount}
        </div>
        <div className="w-[25%] p-2 whitespace-nowrap">
          <span className="py-[1px] px-[5px] bg-slate-500 text-blue-300 rounded-md text-xs">
            {successWithdrows[index]?.status}
          </span>
        </div>
        <div className="w-[25%] p-2 whitespace-nowrap">
          {moment(successWithdrows[index]?.createdAt).format('LL')}
        </div>
      </div>
    );
  };

  useEffect(() => {
    dispatch(get_seller_payemt_details(userInfo._id));
  }, []);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [errorMessage, successMessage]);

  const sendRequest = (e) => {
    e.preventDefault();
    //console.log(availableAmount - amount);
    if (availableAmount - amount > 10) {
      dispatch(send_withdrowal_request({ amount, sellerId: userInfo._id }));
      setAmount(0);
    } else {
      toast.error('insufficient balance');
    }
  };

  return (
    <div className="px-2 md:px-20 py-5">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7 mb-5">
        <div className="flex justify-between items-center p-5 bg-[#000000] rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-[#ffffff] ">
            <h2 className="text-lg font-bold">${totalAmount}</h2>
            <span className="text-sm font-normal">Total Sales</span>
          </div>
          <div className="w-[46px] h-[47px] rounded-full bg-[#28c76f1f]  flex justify-center items-center text-xl">
            <BsCurrencyDollar className="text-[#28c76f] shadow-lg" />
          </div>
        </div>

        <div className="flex justify-between items-center p-5 bg-[#000000] rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-[#ffffff] ">
            <h2 className="text-lg font-bold">${availableAmount}</h2>
            <span className="text-sm font-normal">Available Amount</span>
          </div>
          <div className="w-[46px] h-[47px] rounded-full bg-[#e000e81f]  flex justify-center items-center text-xl">
            <BsCurrencyDollar className="text-[#cd00e8] shadow-lg" />
          </div>
        </div>

        <div className="flex justify-between items-center p-5 bg-[#000000] rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-[#ffffff] ">
            <h2 className="text-lg font-bold">${withdrowAmount}</h2>
            <span className="text-sm font-normal">Withdrawal Amount</span>
          </div>
          <div className="w-[46px] h-[47px] rounded-full bg-[#00cfe81f]  flex justify-center items-center text-xl">
            <BsCurrencyDollar className="text-[#00cfe8] shadow-lg" />
          </div>
        </div>

        <div className="flex justify-between items-center p-5 bg-[#000000] rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-[#ffffff] ">
            <h2 className="text-lg font-bold">${pendingAmount}</h2>
            <span className="text-sm font-normal">Pending Amount</span>
          </div>
          <div className="w-[46px] h-[47px] rounded-full bg-[#7367f01f]  flex justify-center items-center text-xl">
            <BsCurrencyDollar className="text-[#7367f0] shadow-lg" />
          </div>
        </div>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-7 pb-4">
        <div className="bg-[#000000] text-[#ffffff] rounded-md p-5">
          <h2 className="text-lg">Send Withdrawal Request</h2>
          <div className="py-5">
            <form onSubmit={sendRequest}>
              <div className="flex gap-3 flex-wrap">
                <input
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  value={amount}
                  min="0"
                  type="number"
                  className="ml-[22px] md:w-[80%] px-4 py-2 outline-none border bg-transparent border-slate-700 rounded-md text-[#ffffff]
           focus:border-red-500 overflow-hidden"
                  name="amount"
                />
                <button
                  disabled={loader}
                  className="bg-green-500 hover:shadow-green-500/50 hover:shadow-lg text-white rounded-sm px-4 py-2 text-sm"
                >
                  {loader ? 'loading..' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
          <div>
            <h2 className="text-lg pb-4">Pending Withdrawal Request</h2>
            <div className="w-full overflow-x-auto">
              <div className="flex bg-[#161d31] uppercase text-xs min-w-[340px]">
                <div className="w-[25%] p-2">No</div>
                <div className="w-[25%] p-2">Amount</div>
                <div className="w-[25%] p-2">Status</div>
                <div className="w-[25%] p-2">Date</div>
              </div>
              {
                <List
                  style={{ minWidth: '340px', overflowX: 'hidden' }}
                  className="List"
                  height={350}
                  itemCount={pendingWithdrows.length}
                  itemSize={35}
                  outerElementType={outerElementType}
                >
                  {Row}
                </List>
              }
            </div>
          </div>
        </div>
        <div className="bg-[#000000] text-[#ffffff] rounded-md p-5">
          <div>
            <h2 className="text-lg pb-4">Success Withdrawal</h2>
            <div className="w-full overflow-x-auto">
              <div className="flex bg-[#161d31] uppercase text-xs min-w-[340px]">
                <div className="w-[25%] p-2">No</div>
                <div className="w-[25%] p-2">Amount</div>
                <div className="w-[25%] p-2">Status</div>
                <div className="w-[25%] p-2">Date</div>
              </div>
              {
                <List
                  style={{ minWidth: '340px', overflowX: 'hidden' }}
                  className="List"
                  height={350}
                  itemCount={successWithdrows.length}
                  itemSize={35}
                  outerElementType={outerElementType}
                >
                  {Rows}
                </List>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;
