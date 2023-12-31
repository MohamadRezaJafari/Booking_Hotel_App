import { createContext, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import axios from "axios";
import toast from "react-hot-toast";

const HotelContext = createContext();
const BASE_URL = "http://localhost:5000/hotels";

export default function HotelsProvider({ children }) {
  // اطلاعات اون هتل با آیدی انتخاب شده را در این استیت ذخیره میکنیم برای اینکه در صفحه ی هتل ها مشخص شود کدوم هتل را انتخاب کردیم با افتادن یک خط دور اسم هتل در لیست هتل ها
  const [currentHotel, setCurrentHotel] = useState(null);
  const [isLoadingCurrHotel, setIsLoadingCurrHotel] = useState(false);
  // --------------------------------------------------------
  // زمان فشردن کیک سرچ در هدر یکسری سرچ پارامس میفرستیم به صفحه هتل ها مثلا مقصد و تعداد اتاق هاو.. و برای دریافت همه هتل ها و یا هتل هایی که بر اساس اسم و اتاق ها فیلتر میشوند
  const [searchParams, setSearchParams] = useSearchParams();
  const destination = searchParams.get("destination");
  const room = JSON.parse(searchParams.get("options"))?.room;

  const { isLoading, data: hotels } = useFetch(
    BASE_URL,
    `q=${destination || ""}&accommodates_gte=${room || 1}`
  );
  // --------------------------------------------------------

  // آیدی اون سینگل هتل را از پارامز که در هتل ها در تگ لینک فرستادیم دریافت میکند و اطلاعات یک هتل را به ما میدهد
  async function getHotel(id) {
    setIsLoadingCurrHotel(true);
    try {
      const { data } = await axios.get(`${BASE_URL}/${id}`);
      // console.log(data);
      setCurrentHotel(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoadingCurrHotel(false);
    }
  }

  return (
    <HotelContext.Provider
      value={{ isLoading, hotels, getHotel, currentHotel, isLoadingCurrHotel }}
    >
      {children}
    </HotelContext.Provider>
  );
}

export function useHotels() {
  return useContext(HotelContext);
}
