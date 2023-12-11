'use client'

import './styles.css'

import React, { useEffect, useState } from 'react';
import { WeatherInfo } from '../WeatherInfo/WeatherInfo';
import { DayOfWeekAndTime } from '../DayOfWeekComponent/DayOfWeekComponent';

interface WeatherData {
  description: string;
  icon: string;
}

export const WeatherComponent: React.FC = () => {
  const [cidade, setCidade] = useState<string | null>(null);
  const [estado, setEstado] = useState<string | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  useEffect(() => {
    const obterCidadePorCoordenadas = async (latitude: number, longitude: number) => {
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&lang=pt`);
        const dados = await response.json();

        const novaCidade = dados.address.city || dados.address.town || dados.address.village;
        const novoEstado = dados.address.state;

        setCidade(novaCidade);
        setEstado(novoEstado);

      } catch (erro) {
        console.error("Erro ao obter cidade:", erro);
      }
    };

    const obterPrevisaoTempo = async (latitude: number, longitude: number) => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_REACT_APP_OPENWEATHERMAP_API_KEY;
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&lang=pt_br&units=metric&appid=${apiKey}`;


        fetch(apiUrl)
          .then((response) => response.json())
          .then((dados) => {

            const weatherInfo: WeatherData = {
              description: dados.weather[0].description,
              icon: `http://openweathermap.org/img/wn/${dados.weather[0].icon}.png`
            };

            setWeatherData(weatherInfo);

            console.log(dados)

          })
          .catch((erro) => {
            console.error("Erro ao obter previsão do tempo:", erro);
          });

      } catch (erro) {
        console.error("Erro ao obter previsão do tempo:", erro);
      }
    };

    const obterLocalizacao = () => {
      if (typeof window !== 'undefined' && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (posicao) => {
            const latitude = posicao.coords.latitude;
            const longitude = posicao.coords.longitude;

            obterCidadePorCoordenadas(latitude, longitude);
            obterPrevisaoTempo(latitude, longitude);
          },
          (erro) => {
            console.error("Erro ao obter localização:", erro);
          }
        );
      } else {
        console.error("Geolocalização não é suportada pelo navegador ou não é um ambiente cliente");
      }
    };

    obterLocalizacao();
    
  }, []);

  return (
    <div className="Weather-container">
      {cidade !== null ? (
        <div className='weather-card'>
          <DayOfWeekAndTime></DayOfWeekAndTime>
          <p className='cidade-estado'>{cidade} - {estado}</p>
          {weatherData !== null ? (
            <WeatherInfo weatherData={weatherData} />
          ) : (
            <p>Obtendo a previsão do tempo...</p>
          )}
        </div>
      ) : (
        <p>Obtendo a localização...</p>
      )}
    </div>
  );
};