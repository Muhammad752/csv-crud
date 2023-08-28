const Loading = ({ opacity = 70 }) => {
  console.log(opacity);
  return (
    <>
      <div
        className={`bg-opacity-70 fixed top-0 right-0 h-screen w-screen z-50 flex justify-center items-center  flex-col bg-black opacity-${opacity}`}
      >
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
        <p className="mt-5 text-white text-base">LOADING . . .</p>
      </div>
    </>
  );
};

export default Loading;
