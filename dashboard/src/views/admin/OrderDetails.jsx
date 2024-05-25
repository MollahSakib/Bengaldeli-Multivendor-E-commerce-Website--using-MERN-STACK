import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  get_admin_order,
  admin_order_status_update,
  messageClear,
} from '../../store/Reducers/OrderReducer';

const OrderDetails = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();

  const { order, errorMessage, successMessage } = useSelector(
    (state) => state.order
  );

  useEffect(() => {
    dispatch(get_admin_order(orderId));
  }, [orderId]);

  const [status, setStatus] = useState('');
  useEffect(() => {
    setStatus(order?.delivery_status);
  }, [order]);
  const status_update = (e) => {
    dispatch(
      admin_order_status_update({ orderId, info: { status: e.target.value } })
    );
    setStatus(e.target.value);
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage]);

  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-[#000000] rounded-md">
        <div className="flex justify-between items-center p-4">
          <h2 className="text-xl text-[#000000] border-dashed rounded-lg p-4 bg-white font-semibold">
            Order Details
          </h2>
          <select
            onChange={status_update}
            value={status}
            name=""
            id=""
            className="px-4 py-2 outline-none focus:border-red-500 bg-[#ffffff] border-slate-700 rounded-md text-[#000000]"
          >
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Warehouse">Warehouse</option>
            <option value="Placed">Placed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
        <div className="p-4">
          <div className="flex justify-center gap-2 text-md font-semibold text-[#000000] border w-[33%] rounded-md bg-yellow-500 mb-1">
            <h2>
              #{order._id} {'->'}{' '}
            </h2>
            <span>{order.date}</span>
          </div>
          <div className="flex flex-wrap">
            <div className="w-[32%]">
              <div className="pr-3 text-[#ffffff] text-lg">
                <div className="flex flex-col gap-1 border-dashed rounded-md p-2">
                  <div>
                    <h2 className="pb-2 font-semibold mb-3">
                      Deliver to : {order.shippingInfo?.name}
                    </h2>
                    <p>
                      <span className="">
                        {order.shippingInfo?.address}
                        {', '}
                        {order.shippingInfo?.province}
                        {', '}
                        {order.shippingInfo?.city}
                        {', '}
                        {order.shippingInfo?.area}
                        {'. '}
                      </span>
                    </p>
                  </div>
                  <div className="flex justify-start items-center gap-3 border-dashed rounded-md">
                    <h2>Payment Status : </h2>
                    <span className="text-base">{order.payment_status}</span>
                  </div>
                  <span>Price : ${order.price}</span>
                </div>

                <div className="mt-4 flex flex-col gap-4">
                  <div className="text-[#ffffff]">
                    {order.products &&
                      order.products.map((p, i) => (
                        <div
                          key={i}
                          className="mb-2 flex gap-3 text-md items-center border-dashed rounded-lg p-4 bg-gray-500"
                        >
                          <img
                            className="w-[60px] h-[60px] rounded-md"
                            src={p?.images[0]}
                            alt=""
                          />
                          <div>
                            <h2 className="text-xl font-semibold">{p.name}</h2>
                            <p className="text-gray-900">
                              <span className="font-semibold">Brand:</span>{' '}
                              {p.brand}
                            </p>
                            <p className="text-gray-900">
                              <span className="font-semibold">Quantity:</span>{' '}
                              {p.quantity}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[68%]">
              <div className="pl-3">
                <div className="mt-4 flex flex-col gap-4">
                  {order?.suborder?.map((o, i) => (
                    <div key={i} className="text-[#ffffff]">
                      <div className="flex w-[25%] mb-1 justify-center items-center gap-3 border rounded-lg p-2 bg-green-700 font-semibold">
                        <h2>Seller {i + 1} order : </h2>
                        <span>{o.delivery_status}</span>
                      </div>
                      {o.products?.map((p, j) => (
                        <div
                          key={j}
                          className="flex gap-3 mb-2 text-md items-center border-dashed rounded-lg p-4 bg-gray-500"
                        >
                          <img
                            className="w-[45px] h-[45px] rounded-md"
                            src={p?.images[0]}
                            alt=""
                          />
                          <div>
                            <h2 className="text-xl font-semibold">{p.name}</h2>
                            <p className="text-gray-900">
                              <span className="font-semibold">Brand:</span>{' '}
                              {p.brand}
                            </p>
                            <p className="text-gray-900">
                              <span className="font-semibold">Quantity:</span>{' '}
                              {p.quantity}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
