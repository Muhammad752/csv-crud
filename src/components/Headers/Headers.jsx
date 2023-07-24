import axios from 'axios';
import { useReducer, Fragment } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import UserProfile from '../../components/UserProfile/UserProfile';
import useToken from '../../auth/useToken';
import useUser from '../../auth/useUser';

const Headers = ({ current }) => {
  const navigator = useNavigate();
  const [token] = useToken();
  const user = useUser();
  const [userProfile, showUser] = useReducer(function (a) {
    return !a;
  }, false);
  const imageUrl =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp_3YqeetRoOdPsnESJq-J6MuPOrYpmZqxig&usqp=CAU';

  const navigation = [
    {
      name: 'Dashboard',
      href: '/dataPage',
      current: current === 'Dashboard',
      display: true,
    },
    {
      name: 'Users',
      href: '/users',
      current: current === 'Users',
      display: user ? user.realm_access.roles.includes('ROLE_ADMIN') : false,
    },
  ];
  const userNavigation = [
    { name: 'Your Profile', href: '#', onclick: () => showUser() },
    {
      name: 'Delete account',
      href: '#',
      onclick: async () => {
        try {
          const res = await axios.delete(
            process.env.REACT_APP_PROXY2 + '/api/auth/delete',
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          console.log(res);
          localStorage.removeItem('ipoteka_token');
          localStorage.removeItem('ipoteka_refresh_token');
        } catch (e) {
          alert(e.message);
          console.log(e.message);
        }
      },
    },
    {
      name: 'Sign out',
      href: '/',
      onclick: () => {
        localStorage.removeItem('ipoteka_token');
        localStorage.removeItem('ipoteka_refresh_token');
        navigator('/');
        console.log('Sign out');
        window.location.reload();
      },
    },
  ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  return (
    <>
      {userProfile && <UserProfile showUser={showUser} />}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 dashboar__head shadow pb-5">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0 cursor-pointer">
              <Link to="/dataPage">
                <img
                  className="h-80 object-contain rounded-md"
                  src={process.env.PUBLIC_URL + './images/ipotekabank-logo.png'}
                  alt="Ipoteka bank Logo"
                />
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-8 flex items-baseline space-x-4">
                {navigation.map((item) => {
                  console.log(item);
                  return (
                    <div style={{ display: item.display ? 'block' : 'none' }}>
                      <NavLink
                        key={item.name}
                        to={item.href}
                        className={({ isActive }) =>
                          isActive
                            ? 'bg-white text-black border-b-2 border-indigo-500  px-3 py-2 text-lg font-medium h-[6.7rem] flex items-center '
                            : 'text-gray-300 hover:text-black px-3 py-2 text-lg font-medium h-[6.7rem] flex items-center '
                        }
                      >
                        {item.name}
                      </NavLink>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {/* <button
                type='button'
                className='rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
                <span className='sr-only'>View notifications</span>
                <BellIcon
                  className='h-6 w-6'
                  aria-hidden='true'
                />
              </button> */}

              {/* Profile dropdown */}
              <Menu as="div" className="relative ml-3">
                <div>
                  <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full"
                      src={imageUrl}
                      alt=""
                    />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {userNavigation.map((item) => (
                      <Menu.Item key={item.name}>
                        {({ active }) => (
                          <Link
                            to={item.href}
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700'
                            )}
                            onClick={item.onclick}
                          >
                            {item.name}
                          </Link>
                        )}
                      </Menu.Item>
                    ))}
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">{/* Mobile menu button */}</div>
        </div>
      </div>
    </>
  );
};

export default Headers;
