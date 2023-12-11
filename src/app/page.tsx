import React from 'react';
import dotenv from 'dotenv';
import { WeatherComponent } from "@/Components/WeatherComponent/WeatherComponent";

dotenv.config();

function Page() {
  return (
    <div>
      <WeatherComponent />
    </div>
  );
}

export default Page;
