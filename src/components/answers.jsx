/* eslint-disable react/prop-types */
import { useRef } from "react";
import { Howl } from "howler";
import wrongPic from "../assets/image/wrong.png";
import correctPic from "../assets/image/touchscreen.png";
import correctSoundFile from "../assets/audio/correct.wav";
import wrongSoundFile from "../assets/audio/wrong.wav";

const Answers = ({ onSelect, answer: userAnswer, selectedAnswer, answerState, COLORS }) => {
  // audio object creation
  const correctSound = new Howl({ src: correctSoundFile });
  const wrongSound = new Howl({ src: wrongSoundFile });
  const shuffleQuestions = useRef();
  if (!shuffleQuestions.current) {
    shuffleQuestions.current = [...userAnswer];
    shuffleQuestions.current.sort(() => Math.random() - 0.5);
  }

  let namingLetter;
  let answerLetter = ["A", "B", "C", "D"];



  return (
    <ul id='answers'>
      {userAnswer.map((answer, index) => {
        const isAnswered = selectedAnswer === answer;
        let cssClass = "";
        let isCorrect;
        let isClicked = false;

        if (answerState === "answered" && isAnswered) {
          cssClass = "selected";
          isClicked = false;
        }

        if (
          (answerState === "correct" || answerState === "wrong") &&
          isAnswered
        ) {
          cssClass = answerState;
          isClicked = true;
        }

        if (answerState === "correct") {
          isCorrect = true;
        }

        if (answerState === "wrong") {
          isCorrect = false;
        }

        if (answerState === "correct" && isAnswered && isClicked) {
          // sound correct play
          correctSound.play();
          // bubbles pop
          const count = 200,
            defaults = {
              origin: { y: 0.7 },
            };

          // eslint-disable-next-line no-inner-declarations
          function fire(particleRatio, opts) {
            // eslint-disable-next-line no-undef
            confetti(
              Object.assign({}, defaults, opts, {
                particleCount: Math.floor(count * particleRatio),
              })
            );
          }

          fire(0.25, {
            spread: 26,
            startVelocity: 55,
          });

          fire(0.2, {
            spread: 60,
          });

          fire(0.35, {
            spread: 100,
            decay: 0.91,
            scalar: 0.8,
          });

          fire(0.1, {
            spread: 120,
            startVelocity: 25,
            decay: 0.92,
            scalar: 1.2,
          });

          fire(0.1, {
            spread: 120,
            startVelocity: 45,
          });
        }

        // wrongSound play
        if (answerState === "wrong" && isAnswered && isClicked) {
          wrongSound.play();
        }

        const colorsItems = COLORS.map((items) => items.colors_answers);
        const colorsItem = colorsItems[0][index];
        const originalIndex = userAnswer.findIndex((item) => item === userAnswer[index]);
        namingLetter = answerLetter[originalIndex];
        return (
          <li className='answer' key={answer}>
            <button
              onClick={() => onSelect(answer)}
              className={`${cssClass} animate__animated animate__zoomIn`}
              style={{ backgroundColor: colorsItem }}
              disabled={answerState !== ""}>
              <p
                className={`${namingLetter} name_letter`}
                style={
                  isAnswered && isClicked && isCorrect
                    ? { backgroundColor: "#5a4637", color: "#f9f2e5" }
                    : { backgroundColor: "#f9f2e5", color: "#5a4637" }
                }>
                {namingLetter}
              </p>
              {isAnswered &&
                isClicked &&
                (isCorrect ? (
                  <img
                    src={correctPic}
                    alt='correct'
                    className='correctPic show animate__heartBeat'
                  />
                ) : (
                  <img
                    src={wrongPic}
                    alt='wrong'
                    className='wrongPic show animate__wobble'
                  />
                ))}
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default Answers;
