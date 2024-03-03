"use client"
import "./globals.css"
import BitcoinRealTime from '@/components/BitcoinRealTime';
import { useState } from 'react';

export default function Home() {

  const [disabled, setDisabled] = useState(false);

  const vibrateDevice = () => {

    if ('vibrate' in navigator) {
      navigator.vibrate(2000);
    } else {
      console.log('A funcionalidade de vibração não está disponível neste dispositivo.');
    }
  };


  const showNotification = () => {
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


  const requestNotificationPermission = () => {
    // Solicitar permissão de notificação ao usuário
    if ('Notification' in window) {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          console.log('Permissão de notificação concedida.');
        } else {
          console.log('Permissão de notificação não concedida.');
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
      <h1>Clique para testar a vibração</h1>
      <button onClick={handleClick} disabled={disabled}>Vibrar</button>
      <BitcoinRealTime onPriceUpdate={handleBitcoinPriceUpdate} />
      <button onClick={requestNotificationPermission}>Permitir Notificações</button>
    </div>
  );
}







