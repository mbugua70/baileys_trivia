import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CompltedImage from "../assets/image/completedQuiz.png";
import { updatePlayer } from "./api";
import RepodosaImage from "../assets/image/repodosa.png";
import BlancoImage from "../assets/image/blanco.png";

import Cocktail from "/image/DonJulio.jpg";

const resultsMap = {
  A: "DON PALOMA",
  B: "DON PALOMA",
  C: "DON MARGARITA",
  D: "DON MARGARITA",
};

const Summary = ({ userAnswers, QUESTIONS }) => {
  const [updateScore, setUpdateScore] = useState({});
  const [applyClass, setApplyClass] = useState(false);
  const navigate = useNavigate();

  // Count skipped answers
  const skippedAnswers = userAnswers.filter((answer) => answer === null);
  const skippedAnswerPercent = Math.round(
    (skippedAnswers.length / userAnswers.length) * 100
  );

  // Count the most selected category (A, B, C, or D)
  const choiceCount = { A: 0, B: 0, C: 0, D: 0 };

  const choiceLabels = ["A", "B", "C", "D"];

  userAnswers.forEach((answer, index) => {
    if (answer !== null) {
      const selectedIndex = QUESTIONS[index].answers.findIndex(
        (option) => option === answer
      );

      if (selectedIndex !== -1) {
        const selectedLabel = choiceLabels[selectedIndex];
        choiceCount[selectedLabel]++;
      }
    }
  });

  const mostChosenCategory = Object.keys(choiceCount).reduce((a, b) =>
    choiceCount[a] > choiceCount[b] ? a : b
  );

  console.log(mostChosenCategory, "most chosen category");

  console.log(choiceCount, "count");

  const finalRecommendation =
    resultsMap[mostChosenCategory] || "No recommendation available.";

  function handleRestart() {
    navigate("/");
  }

  useEffect(() => {
    async function updateFun() {
      const updateValue = {
        score: mostChosenCategory, // Storing the most chosen category instead of a numeric score
      };
      const updateResult = await updatePlayer(updateValue);
      setUpdateScore(updateResult);
    }

    updateFun();
  }, [mostChosenCategory]);

  useEffect(() => {
    const interval = setInterval(() => {
      setApplyClass((prev) => !prev);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  let imageContent;

  if (finalRecommendation === "DON PALOMA") {
    imageContent = (
      <img
        className="animate__animated animate__heartBeat"
        src={RepodosaImage}
        alt='repodosa image'
        style={{ width: "200px", height: "400px" }}
      />
    );
  } else {
    imageContent = (
      <img
        className="animate__animated animate__heartBeat"
        src={BlancoImage}
        alt='repodosa image'
        style={{ width: "200px", height: "400px" }}
      />
    );
  }

  return (
    <>
      {/* header summary details */}

      <div className='header_summary'>
        <div className='row_one_summary'>
          <div className='rows_one_details'>
            <p className='animate__animated animate__slideInRight'>
              Your matched{" "}
            </p>
            <p className='animate__animated animate__slideInRight'>Cocktail</p>
            <p className='animate__animated animate__slideInLeft'>Results </p>
          </div>
          <div className='row_two_details'>
            {/* <p>{finalRecommendation}</p> */}
          </div>
        </div>
        <div className='row_two_summary'>
          <img
            src={Cocktail}
            alt='cocktail image'
            style={{ width: "100%", height: "100%" }}
            className='animate__animated animate__rotateIn'
          />
        </div>
      </div>

      {/* summary details */}

      <div className='main_summary'>
        <div id='summary'>
          <div id='summary-stats'>
            <p>
              <span className='text animate__animated animate__heartBeat'>
                {finalRecommendation}
              </span>
            </p>

          </div>
           {imageContent}
          {/* <ol>
            {userAnswers.map((answer, index) => {
              let cssClass = "user-answer";
              if (answer === null) {
                cssClass += " skipped";
              }
              return (
                <li key={index}>
                  <h3>{index + 1}</h3>
                  <p className='question'>{QUESTIONS[index].text}</p>
                  <p className={cssClass}>{answer ?? "SKIPPED"}</p>
                </li>
              );
            })}
          </ol> */}
        </div>
        <div className='restart_button'>
          <button
            onClick={handleRestart}
            className={`restart animate__animated ${
              applyClass ? "animate__heartBeat" : ""
            }`}>
            start
          </button>
        </div>
      </div>
    </>
  );
};

export default Summary;
