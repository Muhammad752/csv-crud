const Loading = () => {
  return (
    <>
      <div className="bg-opacity-20 fixed top-0 right-0 h-screen w-screen z-50 flex justify-center items-center bg-black  flex-col">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
        <p className="mt-5 text-white text-base">LOADING . . .</p>
      </div>
    </>
  );
};

export default Loading;
