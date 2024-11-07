import React from "react";

const Footer = () => {
  return (
    <div className="fixed bottom-0 left-0 bg-[tomato] w-full font-serif py-[5px] text-[white] text-center">
      <footer>
        <p className="text-wrap capitalize">
          &copy;Quiz App. designed by{" "}
          <span className="uppercase font-[200]">
            <a
              href="https://tawanda-dev.netlify.app"
              target="_blank"
              className="text-[green] font-bold hover:text-[black] hover:underline capitalize"
              rel="noreferrer"
            >
              Tawanda
            </a>
          </span>
        </p>
      </footer>
    </div>
  );
};

export default Footer;
