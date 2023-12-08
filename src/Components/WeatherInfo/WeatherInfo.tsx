import React from 'react';

import './styles.css'

interface WeatherData {
  description: string;
  icon: string;
}

interface WeatherInfoProps {
  weatherData: WeatherData;
}

export const WeatherInfo: React.FC<WeatherInfoProps> = ({ weatherData}) => (
  <div className='flex items-center justify-center capitalize font-bold clima'>
    <img src={weatherData.icon} alt="icone previsao" />{weatherData.description}
  </div>
);