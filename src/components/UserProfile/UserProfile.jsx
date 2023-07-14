import "./UserProfile.scss";
import useUser from "../../auth/useUser";

const UserProfile = ({ showUser }) => {
  let userInfo = useUser();
  console.log(userInfo.name);
  return (
    <div
      className='user__background flex items-center'
      onClick={(ev) => {
        if (ev.target.classList[0] === "user__background") {
          showUser();
        }
      }}>
      <div className='user__panel p-6 bg-white rounded-md overflow-auto flex flex-col justify-between'>
        <div>
          <div className='w-full flex flex-row mb-12 justify-between'>
            <h1>User Info</h1>
            <span
              onClick={showUser}
              className='cursor-pointer'>
              X
            </span>
          </div>
          <div className='flex gap-2'>
            <label htmlFor='p-name'>Name: </label>
            <input
              type='text'
              name=''
              id='p-name'
              value={userInfo.family_name}
            />
          </div>
          <br />
          <div className='flex gap-2'>
            <label htmlFor='p-lastName'>Last name:</label>
            <input
              type='text'
              name=''
              id=''
              value={userInfo.given_name}
            />
          </div>

          <br />
          <div className='flex gap-2'>
            <label htmlFor='p-email'>Email: </label>
            <input
              type='text'
              name=''
              id='p-email'
              value={userInfo.email}
            />
          </div>
          <br />
          <div className='flex gap-2'>
            <label htmlFor='p-email'>Telephone number: </label>
            <input
              type='text'
              name=''
              id='p-email'
              value={userInfo.preferred_username}
            />
          </div>
        </div>
        <br />
        <br />
        <footer
          id='submitLoan'
          className=''>
          <hr />
          <p className='flex justify-end'>
            <a href='#submitLoan'>
              <button className=' mt-2 bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded'>
                Edit
              </button>
            </a>
            <button
              className='mt-2 ml-2 bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded'
              onClick={showUser}>
              Close
            </button>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default UserProfile;
