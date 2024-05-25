import React, { useState, useEffect } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { Link } from 'react-router-dom';
import Pagination from '../Pagination';
import { useSelector, useDispatch } from 'react-redux';
import { get_admin_orders } from '../../store/Reducers/OrderReducer';

const Orders = () => {
  const dispatch = useDispatch();
  const { totalOrder, myOrders } = useSelector((state) => state.order);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [parPage, setParPage] = useState(5);
  const [show, setShow] = useState('');

  useEffect(() => {
    dispatch(
      get_admin_orders({
        parPage: parseInt(parPage),
        page: parseInt(currentPage),
        searchValue,
      })
    );
  }, [parPage, currentPage, searchValue]);
  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-[#000000] rounded-md">
        <div className="flex flex-col lg:flex-row justify-between items-center">
          <select
            onChange={(e) => setParPage(parseInt(e.target.value))}
            className="px-4 py-2 outline-none focus:border-red-500 bg-[#ffffff] border-slate-700 rounded-md text-[#000000] mb-4 lg:mb-0"
          >
            <option value="5">5</option>
            <option value="15">15</option>
            <option value="50">50</option>
          </select>
          <input
            className="px-3 py-2 outline-none border bg-transparent border-slate-700 rounded-md text-[#ffffff]
           focus:border-red-500 overflow-hidden mb-4 lg:mb-0"
            type="text"
            placeholder="search"
          />
        </div>
        <div className="relative mt-5 overflow-x-auto">
          <div className="w-full text-sm text-left [#ffffff]">
            <div className="text-sm text-[#ffffff] uppercase border-b border-slate-700">
              <div className="flex justify-between items-start">
                <div className="py-3 w-[25%]">Order Id</div>
                <div className="py-3 w-[13%]">Price</div>
                <div className="py-3 w-[18%]">Payment Status</div>
                <div className="py-3 w-[18%]">Order Status</div>
                <div className="py-3 w-[18%]">Action</div>
                <div className="py-3 w-[8%]">
                  <MdKeyboardArrowDown />
                </div>
              </div>
            </div>

            {myOrders.map((o, i) => (
              <div key={i} className="text-[#ffffff]">
                <div className="flex justify-between items-start border-b border-slate-700">
                  <div className="py-4 w-[25%] font-meduim whitespace-nowrap">
                    #{o._id}
                  </div>
                  <div className="py-4 w-[13%]">${o.price}</div>
                  <div className="py-4 w-[18%]">{o.payment_status}</div>
                  <div className="py-4 w-[18%]">{o.delivery_status}</div>
                  <div className="py-4 w-[18%]">
                    <Link to={`/admin/dashboard/order/details/${o._id}`}>
                      view
                    </Link>
                  </div>
                  <div
                    onClick={(e) => setShow(o._id)}
                    className="py-4  cursor-pointer w-[8%]"
                  >
                    <MdKeyboardArrowDown />
                  </div>
                </div>

                <div
                  className={
                    show === o._id
                      ? 'block border-b border-slate-700 bg-slate-800'
                      : 'hidden'
                  }
                >
                  {o.suborder.map((so, i) => (
                    <div
                      key={i}
                      className="flex justify-start items-start border-b border-slate-700"
                    >
                      <div className="py-4 pl-3 w-[25%] font-meduim whitespace-nowrap">
                        #{so._id}
                      </div>
                      <div className="py-4 w-[13%]">${so.price}</div>
                      <div className="py-4 w-[18%]">{o.payment_status}</div>
                      <div className="py-4 w-[18%]">{o.delivery_status}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        {totalOrder <= parPage ? (
          ''
        ) : (
          <div className="w-full flex justify-end mt-4 bottom-4 right-4">
            <Pagination
              pageNumber={currentPage}
              setPageNumber={setCurrentPage}
              totalItem={totalOrder}
              parPage={parPage}
              showItem={4}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
