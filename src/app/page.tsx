import { WeatherComponent } from "@/Components/WeatherComponent/WeatherComponent";
import React, { useState } from 'react';

function cumprimentoDoDia() {
  const horaAtual = new Date().getHours();

  switch (true) {
    case horaAtual >= 6 && horaAtual < 12:
      return 'Dia';
    case horaAtual >= 12 && horaAtual < 18:
      return 'Tarde';
    default:
      return 'Noite';
  }
}

function Page() {
  const periodoDoDia = cumprimentoDoDia();

  return (
    <div className={periodoDoDia}>
      <WeatherComponent></WeatherComponent>
    
    </div>
  );
}

export default Page;