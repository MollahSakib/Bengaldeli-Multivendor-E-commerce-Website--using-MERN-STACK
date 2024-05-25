import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { GrClose } from 'react-icons/gr';
import { Link } from 'react-router-dom';
import Pagination from '../Pagination';
import { BsImage } from 'react-icons/bs';
import toast from 'react-hot-toast';
import { PropagateLoader } from 'react-spinners';
import { overrideStyle } from '../../utils/Utils';
import Search from '../components/Search';
import { useSelector, useDispatch } from 'react-redux';
import {
  categoryAdd,
  messageClear,
  get_category,
} from '../../store/Reducers/categoryReducer';

const Category = () => {
  const dispatch = useDispatch();
  const { loader, successMessage, errorMessage, categorys } = useSelector(
    (state) => state.category
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [parPage, setParPage] = useState(5);
  const [show, setshow] = useState(false);
  const [imageShow, setImage] = useState('');

  const [state, setState] = useState({
    name: '',
    image: '',
  });

  const imageHandle = (e) => {
    let files = e.target.files;
    if (files.length > 0) {
      setImage(URL.createObjectURL(files[0]));
      setState({
        ...state,
        image: files[0],
      });
    }
  };
  const add_category = (e) => {
    e.preventDefault();
    dispatch(categoryAdd(state));
  };

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      setState({
        name: '',
        image: '',
      });
      setImage('');
    }
  }, [successMessage, errorMessage]);

  useEffect(() => {
    const obj = {
      parPage: parseInt(parPage),
      page: parseInt(currentPage),
      searchValue,
    };
    dispatch(get_category(obj));
  }, [searchValue, currentPage, parPage]);

  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="flex lg:hidden justify-between items-center mb-5 p-4 bg-[#000000] rounded-md">
        <h1 className="text-[#ffffff] font-semibold text-lg">Category</h1>
        <button
          onClick={() => setshow(true)}
          className="bg-green-500 shadow-lg hover:shadow-green-500/50 px-4 py-2 cursor-pointer text-white rounded-sm text-sm"
        >
          Add
        </button>
      </div>
      <div className="flex flex-wrap w-full">
        <div className="w-full lg:w-7/12 mt-5">
          <div className="w-full p-4 bg-[#000000] rounded-md">
            <Search
              setParPage={setParPage}
              setSearchValue={setSearchValue}
              searchValue={searchValue}
            />
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left text-[#ffffff]">
                <thead className="text-sm text-[#ffffff] uppercase border-b border-slate-700">
                  <tr>
                    <th scope="col" className="py-3 px-4">
                      No
                    </th>
                    <th scope="col" className="py-3 px-4">
                      Image
                    </th>
                    <th scope="col" className="py-3 px-4">
                      Name
                    </th>
                    <th scope="col" className="py-3 px-4">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {categorys.map((d, i) => (
                    <tr key={i}>
                      <td
                        // eslint-disable-next-line jsx-a11y/scope
                        scope="row"
                        className="py-1 px-4 font-medium whitespace-nowrap"
                      >
                        {i + 1}
                      </td>
                      <td
                        // eslint-disable-next-line jsx-a11y/scope
                        scope="row"
                        className="py-1 px-4 font-medium whitespace-nowrap"
                      >
                        <img
                          className="w-[45px] h-[45px]"
                          src={d.image}
                          alt=""
                        />
                      </td>
                      <td
                        // eslint-disable-next-line jsx-a11y/scope
                        scope="row"
                        className="py-1 px-4 font-medium whitespace-nowrap"
                      >
                        <span>{d.name}</span>
                      </td>
                      <td
                        // eslint-disable-next-line jsx-a11y/scope
                        scope="row"
                        className="py-1 px-4 font-medium whitespace-nowrap"
                      >
                        <div className="flex justify-start items-center gap-4">
                          <Link className="p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50">
                            <FaEdit />
                          </Link>
                          <Link className="p-[6px] bg-red-500 rounded hover:shadow-lg hover:shadow-red-500/50">
                            <FaTrash />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="w-full flex justify-end mt-4 bottom-4 right-4">
              <Pagination
                pageNumber={currentPage}
                setPageNumber={setCurrentPage}
                totalItem={50}
                parPage={parPage}
                showItem={3}
              />
            </div>
          </div>
        </div>
        <div
          className={`w-[320px] lg:w-5/12 translate-x-100 lg:relative lg:right-0 fixed ${
            show ? 'right-0' : '-right-[340px]'
          }
                 z-[9999] top-0 transition-all duration-500 `}
        >
          <div className="w-full p-5">
            <div className=" bg-[#000000] h-screen lg:h-auto px-3 py-2 lg:rounded-md text-[#ffffff]">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-[#ffffff] font-semibold text-xl">
                  Add Category
                </h1>
                <div
                  onClick={() => setshow(false)}
                  className="block lg:hidden p-[6px] bg-red-500 rounded hover:shadow-lg hover:shadow-red-500/50 cursor-pointer"
                >
                  <GrClose />
                </div>
              </div>

              <form onSubmit={add_category}>
                <div className="flex flex-col w-full gap-1 mb-3">
                  <label htmlFor="">Category name</label>
                  <input
                    value={state.name}
                    onChange={(e) =>
                      setState({ ...state, name: e.target.value })
                    }
                    className="px-3 py-2 outline-none border bg-transparent border-slate-700 rounded-md text-[#ffffff] focus:border-red-500 overflow-hidden"
                    type="text"
                    id="name"
                    name="category_name"
                    placeholder="category name"
                    required
                  />
                </div>
                <div className="flex justify-center items-center">
                  <label
                    className="flex justify-center items-center
                                flex-col h-[250px] cursor-pointer border border-dashed
                                hover:border-indigo-500 w-[250px] border-[#ffffff]"
                    htmlFor="image"
                  >
                    {imageShow ? (
                      <img className=" w-full h-full" src={imageShow} />
                    ) : (
                      <>
                        <span>
                          <BsImage />
                        </span>
                        <span>Select Image</span>
                      </>
                    )}
                  </label>
                </div>
                <input
                  onChange={imageHandle}
                  className="hidden"
                  type="file"
                  name="image"
                  id="image"
                  required
                />
                <div className="flex justify-center items-center mt-4">
                  <button
                    disabled={loader ? true : false}
                    className="bg-green-500 w-[200px] hover:shadow-red-500/20 hover:shadow-ig 
                        text-white rounded-md px-7 py-2 mb-3"
                  >
                    {loader ? (
                      <PropagateLoader cssOverride={overrideStyle} />
                    ) : (
                      'Add Category'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
