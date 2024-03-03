"use client"
import { useEffect, useState } from 'react';

export default function Home() {

  const [disabled, setDisabled] = useState(false);

  const vibrateDevice = () => {
    // Verifica se a funcionalidade de vibração está disponível no navegador
    if ('vibrate' in navigator) {
      // Vibra o dispositivo por 1000ms (1 segundo)
      navigator.vibrate(1000);
    } else {
      // Caso a funcionalidade de vibração não esteja disponível, exiba uma mensagem de erro ou execute outra ação
      console.log('A funcionalidade de vibração não está disponível neste dispositivo.');
    }
  };

  const handleClick = () => {
    vibrateDevice();
    setDisabled(true);

    setTimeout(() => {
      setDisabled(false);
    }, 2000); // Desativa o botão por 5 segundos
  };

  return (
    <>  
      <h1>Clique no botão para vibrar o dispositivo</h1>
      <button onClick={handleClick} disabled={disabled}>Vibrar</button>
    </>
  );
}







