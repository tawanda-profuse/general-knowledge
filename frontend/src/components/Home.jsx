const Home = () => {
  return (
    <div className="m-auto w-[90vw] md:w-2/4 bg-[white] rounded-lg p-[1rem] px-[2rem] md:px-0 overflow-y-scroll h-[80vh] flex flex-col gap-[2rem] absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4">
      <h1 className="text-center underline text-[2rem]">Welcome to QuizVibe</h1>
      <ul className="list-disc text-[1.4rem] mx-auto md:w-3/4 w-full flex flex-col gap-[1rem]">
        <li>Select a quiz from the side menu at the left.</li>
        <li>
          You can create a quiz by clicking on the{" "}
          <q>
            <strong>Create Quiz</strong>
          </q>{" "}
          button.
        </li>
        <li>
          Wait for your quiz to be reviewed and then it will be made available
          for the public to see.
        </li>
      </ul>
    </div>
  );
};

export default Home;
