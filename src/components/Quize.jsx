import React, { useEffect, useState } from "react";
import "../components/Quize.css";

function Quize() {
  const [data, setData] = useState([]);
  let [i, setI] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  useEffect(() => {
    async function gateData() {   
      try {
       
        const YOUR_API_KEY = "qSjuUhjDBUH6GkYWL76GdFTTteKYIK7E1Z4nADNW";
        const URL = `https://quizapi.io/api/v1/questions?apiKey=${YOUR_API_KEY}&category=linux&difficulty=Easy&limit=10`;
        let responce = await fetch(URL);
        let json = await responce.json();
        console.log(json);
        setData(json || []);
        console.log(data.length);
      } catch (error) {
        console.error("this is an arror",error);
      }
    }
    
    setTimeout(() => {
    }, 10);
    gateData()
  }, []);
  const handleAnswerSelect = (answerKey) => {
    setSelectedAnswer(answerKey);

    // Check if the answer is correct
    const correctAnswerKey = Object.entries(data[i].correct_answers || {}).find(([key, value]) => value === "true")?.[0];

    if (correctAnswerKey && correctAnswerKey === `${answerKey}_correct`) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  const handleI = () => {
    if (i < data.length - 1) {
      setI((prev) => prev + 1);
    } else {
      alert("You've reached the last question!");
    }
  };
  return <>


      {data.length > 0 ? (
        <>
          <span>Question {i + 1}:</span>
          <p>{data[i].question}</p>
          <p>{data[i].description || "No description available"}</p>
          <ul>
            {Object.entries(data[i].answers || {}).map(([key, value]) =>value && (
                     <li key={key}>
                    <button onClick={() => handleAnswerSelect(key)}style={{color: selectedAnswer === key ? "#494242" : "",}}>
                      {value}
                    </button>
                  </li>))}
          </ul>
          {isCorrect !== null && (
            <p>
              {isCorrect ? "Correct! 🎉" : "Incorrect! ❌"}
            </p>
          )}
          <button onClick={handleI}>Next</button>
        </>)
         :
       (<p>Loading...</p>)}
  </>;
}

export default Quize;
