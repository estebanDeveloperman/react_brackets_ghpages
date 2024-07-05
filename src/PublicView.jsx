import React from "react";
import upcLogo from "./assets/upc.png";
import usilLogo from "./assets/uni.png";

const PublicView = ({
  time,
  scoreAo,
  scoreAka,
  tatami,
  penaltiesAo,
  penaltiesAka,
}) => {
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const styles = {
    publicView: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#ffffff",
      textAlign: "center",
      padding: "20px",
      fontFamily: "Roboto, sans-serif",
    },
    header: {
      fontSize: "36px",
      marginBottom: "20px",
      padding: "20px 40px",
      border: "3px solid black",
      borderRadius: "20px",
      backgroundColor: "#e0e0e0",
      fontWeight: "bold",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    main: {
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      width: "100%",
      flexGrow: 1,
    },
    team: {
      flex: 1,
      padding: "20px",
      borderRadius: "10px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    blue: {
      backgroundColor: "#0000ff",
      color: "#ffffff",
    },
    red: {
      backgroundColor: "#ff0000",
      color: "#ffffff",
    },
    time: {
      fontSize: "100px",
      margin: "20px 0",
    },
    score: {
      fontSize: "100px",
      marginTop: "20px",
    },
    penalties: {
      display: "flex",
      justifyContent: "center",
      margin: "20px 0",
    },
    penaltyActive: {
      backgroundColor: "#ff8000", // Usamos naranja para las penalidades activas
      color: "#ffffff",
      padding: "5px 10px",
      margin: "0 10px",
      borderRadius: "5px",
    },
    penaltyInactive: {
      backgroundColor: "#ffffff",
      color: "#000000",
      padding: "5px 10px",
      margin: "0 10px",
      borderRadius: "5px",
      border: "1px solid black",
    },
    universityLogo: {
      width: "100px",
      height: "100px",
      borderRadius: "50%",
      backgroundColor: "#ffffff",
      padding: "10px",
      margin: "10px 0",
    },
    participantName: {
      fontSize: "30px",
      marginBottom: "10px",
    },
  };

  return (
    <div style={styles.publicView}>
      <div style={styles.header}>Tatami {tatami}</div>
      <div style={styles.main}>
        <div style={{ ...styles.team, ...styles.red }}>
          <h1>Aka</h1>
          <div style={styles.universityLogo}>
            <img
              src={usilLogo}
              alt="USIL Logo"
              style={{ width: "100%", height: "100%", borderRadius: "50%" }}
            />
          </div>
          <p style={styles.participantName}>Cristhian Omar Medina Molina</p>
          <h1 style={styles.score}>{scoreAka}</h1>
          <div style={styles.penalties}>
            {penaltiesAka.slice(0, 5).map((penalty, index) => (
              <div
                key={index}
                style={penalty ? styles.penaltyActive : styles.penaltyInactive}
              >
                {index < 3 ? `${index + 1}C` : index === 3 ? "HC" : "H"}
              </div>
            ))}
          </div>
        </div>
        <div style={styles.time}>
          <h1>{formatTime(time)}</h1>
        </div>
        <div style={{ ...styles.team, ...styles.blue }}>
          <h1>Ao</h1>
          <div style={styles.universityLogo}>
            <img
              src={upcLogo}
              alt="UPC Logo"
              style={{ width: "100%", height: "100%", borderRadius: "50%" }}
            />
          </div>
          <p style={styles.participantName}>Marcos Jonathan Nunta Rengifo</p>
          <h1 style={styles.score}>{scoreAo}</h1>
          <div style={styles.penalties}>
            {penaltiesAo.slice(0, 5).map((penalty, index) => (
              <div
                key={index}
                style={penalty ? styles.penaltyActive : styles.penaltyInactive}
              >
                {index < 3 ? `${index + 1}C` : index === 3 ? "HC" : "H"}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicView;
