import { useState } from "react";

// navigator.geolocation:
//   برای دسترسی به لوکیشن کاربر

export default function useGeoLocation() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [position, setPosition] = useState({});

  //   زمانیکه کاربر روی دکمه دسترسی به موقعیت کلیک میکند این فانکشن اجرا شود
  function getPosition() {
    if (!navigator.geolocation)
      return setError("Your Browser dose not support geolocation");

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      }
    );
  }

  return { isLoading, error, position, getPosition };
}