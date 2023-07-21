import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

export default function Pagination({
  data,
  refreshMainList,
  setPageNum,
  pageNum,
}) {
  const pagesLength = Array.from({ length: data.totalPages }, (x, i) => i);
  let skip = false;
  return (
    <div className="flex items-center justify-between  border-gray-200 bg-white px-4 py-3 sm:px-6 absolute w-full m-auto p-4 right-0 left-0 bottom-5">
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          onClick={() => {
            setPageNum(Number(pageNum) - 1);
            refreshMainList();
          }}
        >
          Previous
        </a>
        <a
          href="#"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing{' '}
            <span className="font-medium">{data.pageable.offset + 1}</span> to{' '}
            <span className="font-medium">
              {data.pageable.offset + data.pageable.pageSize <=
              data.totalElements
                ? data.pageable.offset + data.pageable.pageSize
                : data.totalElements}
            </span>{' '}
            of <span className="font-medium">{data.totalElements}</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <a
              href="#"
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              onClick={() => {
                setPageNum(Number(pageNum) - 1);
                refreshMainList();
              }}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </a>
            {pagesLength.map((val, ind) => {
              if (
                pagesLength.length > 7 &&
                !(Number(pageNum) - 1 <= val && Number(pageNum) + 1 >= val) &&
                !(val == 0 || val == pagesLength.length - 1)
              ) {
                if (skip) {
                  return;
                }
                skip = true;
                return (
                  <span
                    key={ind}
                    className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0 cursor-pointer"
                    onClick={() => {
                      if (Number(pageNum) < val) {
                        setPageNum(Number(pageNum) + 2);
                        console.log('bigger');
                      } else {
                        console.log('smaller');
                        setPageNum(Number(pageNum) - 2);
                      }
                      refreshMainList();
                    }}
                  >
                    ...
                  </span>
                );
              } else {
                skip = false;
              }
              if (skip) {
                return;
              }
              if (val == pageNum)
                return (
                  <a
                    key={ind}
                    href="#"
                    aria-current="page"
                    className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    style={{ background: '#5231ae' }}
                    onClick={(event) => {
                      setPageNum(event.target.textContent - 1);
                      refreshMainList();
                    }}
                  >
                    {val + 1}
                  </a>
                );
              else
                return (
                  <a
                    key={ind}
                    href="#"
                    className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    onClick={(event) => {
                      setPageNum(event.target.textContent - 1);
                      refreshMainList();
                    }}
                  >
                    {val + 1}
                  </a>
                );
            })}

            <a
              href="#"
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              onClick={() => {
                setPageNum(Number(pageNum) + 1);
                refreshMainList();
              }}
            >
              <span className="sr-only" onClick={() => {}}>
                Next
              </span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}
