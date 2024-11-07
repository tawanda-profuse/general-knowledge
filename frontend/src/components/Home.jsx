const Home = () => {
  return (
    <div className="m-auto w-[90vw] md:w-2/4 bg-[white] rounded-lg p-[1rem] px-[2rem] md:px-0 overflow-y-scroll h-[80vh] flex flex-col gap-[2rem] absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4">
      <h1 className="text-center underline text-[2rem]">
        Welcome to the QuizVibe
      </h1>
      <ul className="list-disc text-[1.4rem] mx-auto md:w-3/4 w-full">
        <li>Select a quiz from the side menu at the left.</li>
        <li>You are welcome to create a quiz.</li>
        <li>
          Wait for your quiz to be reviewed and then it will be made available
          for the public to see.
        </li>
      </ul>
    </div>
  );
};

export default Home;
