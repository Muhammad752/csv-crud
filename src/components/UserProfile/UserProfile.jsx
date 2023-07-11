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
          <div className='flex gap-4'>
            <input
              type='text'
              name=''
              id=''
              value={userInfo.family_name}
            />
            <input
              type='text'
              name=''
              id=''
              value={userInfo.given_name}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
