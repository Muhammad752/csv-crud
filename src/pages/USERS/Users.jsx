import axios from 'axios';
import { Fragment, useReducer } from 'react';
import { useEffect, useState } from 'react';
import useUser from '../../auth/useUser';
import useToken from '../../auth/useToken';
import '../MainPages.scss';
import Pagination from '../../components/Pagination';
import UsersRender from '../../components/UsersRender/UsersRender';
import Loading from '../../components/Loading';
import Headers from '../../components/Headers/Headers';
import { useSearchParams } from 'react-router-dom';

export default function Users() {
  const [searchKey, setSearchKey] = useState('');
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
  const user = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [token] = useToken();
  console.log('My user');
  console.log(user);
  const [data, setData] = useState();
  const [mainListRefresh, refreshMainList] = useReducer((a) => !a, false);

  useEffect(() => {
    pageNum = searchParams.get('pageNum');
    async function loadArticle() {
      try {
        // const response = await axios.get(`/offlineData.json`);
        setIsLoading(true);
        const response = await axios.get(
          process.env.REACT_APP_PROXY2 +
            `/api/admin/users` +
            makeSearch.searchUrl,
          {
            headers: { Authorization: `Bearer ${token}` },
            params: {
              page: pageNum,
              size: 10,
              search: makeSearch.searchData,
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
        console.log(e.message);
        localStorage.removeItem('ipoteka_token');
        setIsLoading(false);
      }
    }
    loadArticle();
  }, [mainListRefresh, pageNum]);
  if (data) {
    if (!(data.pageable.pageNumber === Number(pageNum))) {
      setTimeout(() => {
        refreshMainList();
      }, 50);
    }
  }
  if (data)
    return (
      <>
        <div>
          <Headers current="Users" />
          {/* {isLoading && <Loading />} */}
          <main>
            <div className="mx-auto py-6 sm:px-6 lg:px-8 ">
              <>
                <UsersRender
                  data={data.content}
                  refreshMainList={refreshMainList}
                  setData={setData}
                  searchKey={searchKey}
                  setSearchKey={setSearchKey}
                  makeSearch={makeSearch}
                  setMakeSearch={setMakeSearch}
                  setPageNum={setPageNum}
                />
                {/* <DataPageOption
                    data={data.content}
                    refreshMainList={refreshMainList}
                  /> */}
              </>

              <Pagination
                data={data}
                refreshMainList={refreshMainList}
                setPageNum={setPageNum}
                pageNum={pageNum}
              />
            </div>
          </main>
        </div>
      </>
    );
}
