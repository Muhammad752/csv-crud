import axios from 'axios';
import { Fragment, useReducer } from 'react';
import { useEffect, useState } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import useUser from '../auth/useUser';
import useToken from '../auth/useToken';
import { Link } from 'react-router-dom';
import './MainPages.scss';
import { useSearchParams } from 'react-router-dom';
import Pagination from '../components/Pagination';
import DataRender from '../components/FileRender/DataRender';
import UserProfile from '../components/UserProfile/UserProfile';
import Headers from '../components/Headers/Headers';
import Loading from '../components/Loading';
import { useNavigate } from 'react-router-dom';

export default function DataPage() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [token] = useToken();
  const [data, setData] = useState();
  const [searchKey, setSearchKey] = useState('');
  const [mainListRefresh, refreshMainList] = useReducer((a) => !a, false);
  const [searchParams, setSearchParams] = useSearchParams({
    pageNum: 0,
  });
  let pageNum = searchParams.get('pageNum');

  const setPageNum = (num) => {
    setSearchParams({
      pageNum: Number(num),
    });
  };

  const [makeSearch, setMakeSearch] = useState({
    searchUrl: '',
    searchData: '',
  });

  const [userProfile, showUser] = useReducer(function (a) {
    return !a;
  }, false);

  useEffect(() => {
    pageNum = searchParams.get('pageNum');
    async function loadArticle() {
      try {
        // const response = await axios.get(`/offlineData.json`);
        setIsLoading(true);
        const response = await axios.get(
          process.env.REACT_APP_PROXY + `/pinfl/` + makeSearch.searchUrl,
          {
            headers: { Authorization: `Bearer ${token}` },
            params: {
              page: pageNum,
              size: 15,
              searchValue: makeSearch.searchData,
            },
          }
        );
        const newArticle = response.data;
        if (newArticle) {
          setData(newArticle);
        }
        setIsLoading(false);
        pageNum = searchParams.get('pageNum');
      } catch (e) {
        pageNum = searchParams.get('pageNum');
        localStorage.removeItem('ipoteka_token');
        localStorage.removeItem('ipoteka_refresh_token');
        setIsLoading(false);
      }
    }
    loadArticle();
  }, [mainListRefresh, pageNum]);
  if (data)
    if (!(data.pageable.pageNumber == Number(pageNum))) {
      console.log(data.pageable.pageNumber, pageNum);
      setTimeout(() => {
        refreshMainList();
      }, 100);
      setTimeout(() => {
        refreshMainList();
      }, 100);
    } else {
      console.log('Success');
      console.log(data.pageable.pageNumber, pageNum);
    }
  return (
    <>
      {isLoading && <Loading opacity={0} />}
      {/* <header className="bg-white shadow">
        <div className="mx-auto pl-20 px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Dashboard
          </h1>
        </div>
      </header> */}
      {userProfile && <UserProfile showUser={showUser} />}
      <div className="">
        <main>
          <div className="mx-auto py-6 sm:px-6 lg:px-8 ">
            <DataRender
              data={data}
              refreshMainList={refreshMainList}
              setData={setData}
              searchKey={searchKey}
              setSearchKey={setSearchKey}
              makeSearch={makeSearch}
              setMakeSearch={setMakeSearch}
              setPageNum={setPageNum}
            />

            {data && (
              <Pagination
                data={data}
                refreshMainList={refreshMainList}
                setPageNum={setPageNum}
                pageNum={pageNum}
              />
            )}
          </div>
        </main>
      </div>
    </>
  );
}
