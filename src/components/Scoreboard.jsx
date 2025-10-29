import { useState, useEffect } from "react";
import headerImage from "/image/about.png";

/* eslint-disable react/prop-types */
const Scoreboard = ({ userAnswers, QUESTIONS, generalTimer }) => {
  const [remainingTime, setRemainingTime] = useState(generalTimer);
  const [applyClass, setApplyClass] = useState(false);

  const answeredCorrectly = userAnswers.filter(
    (answer, index) =>
      answer === QUESTIONS[index].answers[0] ||
      answer === QUESTIONS[index].answers[1] ||
      answer === QUESTIONS[index].answers[0] ||
      answer === QUESTIONS[index].answers[2] ||
      answer === QUESTIONS[index].answers[3]
  );

  const answeredPercent = Math.round(
    (answeredCorrectly.length / userAnswers.length) * 100
  );

  // progress configuration
  useEffect(() => {
    if (generalTimer <= 0) return;
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 100);
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [generalTimer]);

  useEffect(() => {

    const interval = setInterval(() => {
      setApplyClass((prev) => !prev);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  let countDown = remainingTime / 1000;

  return (
    <>
      {/* <div className='scoreboard'>
        <div className='scores_main'>
          <h2>Scores</h2>
          <p>{isNaN(answeredPercent) ? "0" : answeredPercent}%</p>
        </div>
        <div className='timer_main'>
          <h2>Timer</h2>
          <p>{remainingTime > 0 ? countDown | 0 : "0"}</p>
        </div>
      </div> */}
      <div className={`image_containers`}>
        <img
          src={headerImage}
          alt=''
          style={{ width: "100%", height: "100%" }}
          className={`animate__animated ${applyClass ? 'animate__swing' : ''}`}
        />
      </div>
    </>
  );
};

export default Scoreboard;
