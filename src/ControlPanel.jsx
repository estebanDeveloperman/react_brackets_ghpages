import React, { useState } from "react";
import "./ControlPanel.css"; // Importa los estilos CSS
import upcLogo from "./assets/upc.png";
import usilLogo from "./assets/uni.png";

const ControlPanel = ({
  time,
  scoreAo,
  scoreAka,
  penaltiesAo,
  penaltiesAka,
  onUpdate,
  onStart,
  onStop,
}) => {
  const [senshuAo, setSenshuAo] = useState(false);
  const [senshuAka, setSenshuAka] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleTimerClick = () => {
    if (isRunning) {
      onStop();
    } else {
      onStart();
    }
    setIsRunning(!isRunning);
  };

  const togglePenalty = (index, team) => {
    if (team === "Ao") {
      const updatedPenalties = [...penaltiesAo];
      updatedPenalties[index] = !updatedPenalties[index];
      onUpdate((prevState) => ({
        ...prevState,
        penaltiesAo: updatedPenalties,
      }));
    } else {
      const updatedPenalties = [...penaltiesAka];
      updatedPenalties[index] = !updatedPenalties[index];
      onUpdate((prevState) => ({
        ...prevState,
        penaltiesAka: updatedPenalties,
      }));
    }
  };

  return (
    <div className="control-panel">
      <div className="team blue">
        <h1>Ao</h1>
        <div className="logo-container">
          <img src={upcLogo} alt="UPC Logo" className="university-logo" />
        </div>
        <p>Marcos Jonathan Nunta Rengifo</p>
        <button
          className="modern-button"
          onClick={() =>
            onUpdate((prevState) => ({
              ...prevState,
              scoreAo: prevState.scoreAo + 3,
            }))
          }
        >
          Ippon
        </button>
        <button
          className="modern-button"
          onClick={() =>
            onUpdate((prevState) => ({
              ...prevState,
              scoreAo: prevState.scoreAo + 2,
            }))
          }
        >
          Waza-ari
        </button>
        <button
          className="modern-button"
          onClick={() =>
            onUpdate((prevState) => ({
              ...prevState,
              scoreAo: prevState.scoreAo + 1,
            }))
          }
        >
          Yuko
        </button>
        <div>
          <label>
            <input
              type="checkbox"
              checked={senshuAo}
              onChange={() => setSenshuAo(!senshuAo)}
            />
            Senshu
          </label>
        </div>
        <div className="penalties">
          {penaltiesAo.slice(0, 5).map((penalty, index) => (
            <label key={index}>
              <input
                type="checkbox"
                checked={penalty}
                onChange={() => togglePenalty(index, "Ao")}
              />
              {index < 3 ? `${index + 1}C` : index === 3 ? "HC" : "H"}
            </label>
          ))}
        </div>
        <h1 className="score">{scoreAo}</h1>
      </div>
      <div className="timer">
        <h1 className="time">{formatTime(time)}</h1>
        <button className="modern-button" onClick={handleTimerClick}>
          {isRunning ? "Stop" : "Start"}
        </button>
      </div>
      <div className="team red">
        <h1>Aka</h1>
        <div className="logo-container">
          <img src={usilLogo} alt="USIL Logo" className="university-logo" />
        </div>
        <p>Cristhian Omar Medina Molina</p>
        <button
          className="modern-button"
          onClick={() =>
            onUpdate((prevState) => ({
              ...prevState,
              scoreAka: prevState.scoreAka + 3,
            }))
          }
        >
          Ippon
        </button>
        <button
          className="modern-button"
          onClick={() =>
            onUpdate((prevState) => ({
              ...prevState,
              scoreAka: prevState.scoreAka + 2,
            }))
          }
        >
          Waza-ari
        </button>
        <button
          className="modern-button"
          onClick={() =>
            onUpdate((prevState) => ({
              ...prevState,
              scoreAka: prevState.scoreAka + 1,
            }))
          }
        >
          Yuko
        </button>
        <div>
          <label>
            <input
              type="checkbox"
              checked={senshuAka}
              onChange={() => setSenshuAka(!senshuAka)}
            />
            Senshu
          </label>
        </div>
        <div className="penalties">
          {penaltiesAka.slice(0, 5).map((penalty, index) => (
            <label key={index}>
              <input
                type="checkbox"
                checked={penalty}
                onChange={() => togglePenalty(index, "Aka")}
              />
              {index < 3 ? `${index + 1}C` : index === 3 ? "HC" : "H"}
            </label>
          ))}
        </div>
        <h1 className="score">{scoreAka}</h1>
      </div>
    </div>
  );
};

export default ControlPanel;
