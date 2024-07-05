import React, { useState, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import ControlPanel from "./ControlPanel";
import PublicView from "./PublicView";
import "./App.css"; // Importa los estilos CSS

const App = () => {
  const [state, setState] = useState({
    time: 120,
    scoreAo: 0,
    scoreAka: 0,
    penaltiesAo: [false, false, false, false, false],
    penaltiesAka: [false, false, false, false, false],
    tatami: 1,
  }); // 2 minutos en segundos
  const publicWindowRef = useRef(null);
  const timerRef = useRef(null);

  const handleUpdate = (updateFunc) => {
    setState((prevState) => updateFunc(prevState));
  };

  const startTimer = () => {
    if (timerRef.current) return; // Evitar múltiples temporizadores
    timerRef.current = setInterval(() => {
      setState((prevState) => {
        if (prevState.time > 0) {
          return { ...prevState, time: prevState.time - 1 };
        } else {
          clearInterval(timerRef.current);
          timerRef.current = null;
          return prevState;
        }
      });
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
  };

  useEffect(() => {
    // Abrir la ventana emergente solo si no está abierta
    if (!publicWindowRef.current || publicWindowRef.current.closed) {
      publicWindowRef.current = window.open(
        "",
        "Public View",
        "width=800,height=600"
      );
      publicWindowRef.current.document.body.innerHTML =
        '<div id="public-view-root"></div>';
    }

    // Evitar cerrar la ventana emergente cuando el componente se desmonta
    const publicWindow = publicWindowRef.current;
    const publicViewRoot =
      publicWindow.document.getElementById("public-view-root");

    // Función para actualizar el contenido de la ventana emergente
    const updatePublicView = () => {
      const publicViewComponent = (
        <PublicView
          time={state.time}
          scoreAo={state.scoreAo}
          scoreAka={state.scoreAka}
          tatami={state.tatami}
          penaltiesAo={state.penaltiesAo}
          penaltiesAka={state.penaltiesAka}
        />
      );
      createRoot(publicViewRoot).render(publicViewComponent); // Usa createRoot en lugar de ReactDOM.render
    };

    // Actualizar el contenido de la ventana emergente
    updatePublicView();

    // Limpiar el efecto solo al desmontar el componente
    return () => {
      // No cerramos la ventana aquí para mantenerla abierta
    };
  }, [
    state.time,
    state.scoreAo,
    state.scoreAka,
    state.penaltiesAo,
    state.penaltiesAka,
    state.tatami,
  ]); // Dependencias: actualiza solo cuando cambian el tiempo o el puntaje

  // Limpiar la ventana emergente cuando el componente se desmonta
  useEffect(() => {
    return () => {
      if (publicWindowRef.current) {
        publicWindowRef.current.close();
      }
      clearInterval(timerRef.current); // Limpiar el temporizador
    };
  }, []);

  return (
    <div className="app-container">
      <ControlPanel
        time={state.time}
        scoreAo={state.scoreAo}
        scoreAka={state.scoreAka}
        penaltiesAo={state.penaltiesAo}
        penaltiesAka={state.penaltiesAka}
        onUpdate={handleUpdate}
        onStart={startTimer}
        onStop={stopTimer}
      />
    </div>
  );
};

export default App;
