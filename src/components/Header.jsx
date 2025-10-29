import imglogo from "../assets/quiz-logo.png";

const Header = () => {
  return (
    <>
      <header>
        <img src={imglogo} alt="Image logo" />
        <h1>ReactQuiz App</h1>
      </header>
    </>
  );
};

export default Header;
