"use client"
import "./globals.css"
import BitcoinRealTime from '@/components/BitcoinRealTime';
import { useState } from 'react';

export default function Home() {

  const [disabled, setDisabled] = useState(false);

  const vibrateDevice = () => {

    if ('vibrate' in navigator) {
      const pattern = [
        100,
        50,
        100,
        50,
        100,
        50,
        100,
        50,
        100,
        50,
        100,
        50,
        100,
        50,
        100,
        50,
        100,
        50,
        100,
        50,
        100,
        100,
        100,
        100,
        100,
        100,
        100,
        100,
        100
      ];
      navigator.vibrate(pattern);
    } else {
      console.log('A funcionalidade de vibração não está disponível neste dispositivo.');
    }
  };


  const showNotification = () => {
    alert(`funcinou tambem hehe`)
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Preço fora do limite', {
        body: 'O preço do Bitcoin está fora do limite definido.',
        icon: '/public/icon-192x192.png' // Altere para o caminho do seu ícone de notificação
      });
    } else if ('Notification' in window && Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification('Permissão concedida', {
            body: 'Agora você receberá notificações quando o preço do Bitcoin estiver fora do limite.'
          });
        }
      });
    }
  };


  const handleClick = () => {

    vibrateDevice();
    showNotification();
    setDisabled(true);

    setTimeout(() => {
      setDisabled(false);
    }, 2000); // Desativa o botão por 5 segundos
  };


  const handleBitcoinPriceUpdate = (price: any) => {
    console.log("PAI", price)
  };

  return (
    <div className="container">
      <h1>Clique no botão para vibrar o dispositivo</h1>
      <BitcoinRealTime onPriceUpdate={handleBitcoinPriceUpdate} />
      <button onClick={handleClick} disabled={disabled}>Vibrar</button>
    </div>
  );
}







