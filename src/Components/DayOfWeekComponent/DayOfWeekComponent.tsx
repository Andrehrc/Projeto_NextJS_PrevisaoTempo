import React, { useState, useEffect } from 'react';

import './styles.css'

const GetWeekDay = (today: Date) => {
    return new Intl.DateTimeFormat('pt-BR', { weekday: 'long' }).format(today);
}

const GetHourAndMinute = (today: Date) => {
    const hour = today.getHours();
    const minute = today.getMinutes();
    return { hour, minute };
}

export const DayOfWeekAndTime = () => {
    const [weekDay, setWeekDay] = useState<string>('');
    const [hour, setHour] = useState<number>(0);
    const [minute, setMinute] = useState<number>(0);

    const updateDateTime = () => {
        const today: Date = new Date();
        setWeekDay(GetWeekDay(today));
        const { hour, minute } = GetHourAndMinute(today);
        setHour(hour);
        setMinute(minute);
    };

    useEffect(() => {
        const intervalId = setInterval(updateDateTime, 1000);
        return () => clearInterval(intervalId);
    }, []);

    function cumprimentoDoDia() {
        const horaAtual = new Date().getHours();
      
        if (horaAtual >= 6 && horaAtual < 12) {
          return 'Dia';
        } else if (horaAtual >= 12 && horaAtual < 18) {
          return 'Tarde';
        } else {
          return 'Noite';
        }
      }

    const periodoDoDia = cumprimentoDoDia();
    const formattedHour = hour < 10 ? `0${hour}` : `${hour}`;
    const formattedMinute = minute < 10 ? `0${minute}` : `${minute}`;

    return (
        <div className={`${periodoDoDia} time-saudacao-container`} >
            <h3 className='font-bold time'>{formattedHour}:{formattedMinute}</h3>

            {periodoDoDia == 'Dia' &&
                <h3 id='saudacao' className='saudacao'>Bom dia!</h3>
            }

            {periodoDoDia == 'Tarde' &&
                <h3 id='saudacao' className='saudacao'>Boa tarde!</h3>
            }

            {periodoDoDia == 'Noite' &&
                <h3 id='saudacao' className='saudacao'>Boa noite!</h3>
            }

            <h3 className='capitalize font-bold weekday'>{weekDay}</h3>
        </div>
    );
}