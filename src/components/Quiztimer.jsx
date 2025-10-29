/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

const QuestionTimer = ({
  timeout,
  onTimeOut,
  mode,
  userAnswers,
  QUESTIONS,
}) => {
  const [remainingTime, setRemainingTime] = useState(timeout);

  const answeredCorrectly = userAnswers.filter(
    (answer, index) => answer === QUESTIONS[index].answers[0]
  );

  const answeredPercent = Math.round(
    (answeredCorrectly.length / userAnswers.length) * 100
  );
  useEffect(() => {

    const timer = setTimeout(onTimeOut, timeout);
    return () => {
      clearTimeout(timer);
    };
  }, [timeout, onTimeOut]);

  // progress configuration
  useEffect(() => {
    if (timeout <= 0) return;
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 100);
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [timeout]);

  // let countDown = remainingTime / 1000;

  return (
    <>
      <progress
        value={remainingTime}
        id="question-time"
        max={timeout}
        className={mode}
      />
    </>
  );
};

export default QuestionTimer;
