
import React, { useState, useEffect } from 'react';
import axios from 'axios';
interface BitcoinRealTimeProps {
  onPriceUpdate: (price: number) => void;
}

const apiKey = process.env.API_KEY;

const BitcoinRealTime: React.FC<BitcoinRealTimeProps> = ({ onPriceUpdate }) => {
  const [bitcoinPrice, setBitcoinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(999999);
  const [minPrice, setMinPrice] = useState<number | null>(99);

  useEffect(() => {
    const fetchBitcoinPrice = async () => {
      try {
        const response = await axios.get('https://api.coindesk.com/v1/bpi/currentprice.json');
        const price = response.data.bpi.USD.rate_float;
        console.log("BORA", response.data);
        console.log("EITA", response.data.bpi.USD.rate_float);
        setBitcoinPrice(price);
        // Chama a função de atualização do preço no componente pai
        onPriceUpdate(price);

        // Verifica se o preço está fora dos limites máximo e mínimo e vibra o dispositivo se necessário
        if (maxPrice !== null && price > maxPrice) {
          vibrateDevice();
        }
        if (minPrice !== null && price < minPrice) {
          vibrateDevice();
        }
      } catch (error) {
        console.error('Error fetching Bitcoin price:', error);
      }
    };

    const intervalId = setInterval(fetchBitcoinPrice, 15000); // 15 segundos

    // Cleanup function to clear interval on unmount
    return () => clearInterval(intervalId);
  }, [onPriceUpdate, maxPrice, minPrice]);

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

  return (
    <div>
      <h1>Bitcoin Price (USD)</h1>
      {bitcoinPrice !== null ? (
        <p>{bitcoinPrice}</p>
      ) : (
        <p>Carregando último preço...</p>
      )}

      <label htmlFor="maxPrice">Preço Máximo:</label>
      <input
        type="number"
        id="maxPrice"
        value={maxPrice || ''}
        onChange={(e) => setMaxPrice(parseFloat(e.target.value))}
      />

      <label htmlFor="minPrice">Preço Mínimo:</label>
      <input
        type="number"
        id="minPrice"
        value={minPrice || ''}
        onChange={(e) => setMinPrice(parseFloat(e.target.value))}
      />
    </div>
  );
};

export default BitcoinRealTime;
