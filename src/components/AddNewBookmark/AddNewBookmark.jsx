import ReactCountryFlag from "react-country-flag";
import { useNavigate } from "react-router-dom";
import useUrlLocation from "../../hooks/useUrlLocation";
import { useEffect, useState } from "react";
import { useBookMark } from "../../context/BookmarkListContext";
import toast from "react-hot-toast";
import axios from "axios";

const BASE_GEOCODING_URL =
  "https://api.bigdatacloud.net/data/reverse-geocode-client";

function AddNewBookmark() {
  const [lat, lng] = useUrlLocation();
  const navigate = useNavigate();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(false);
  const { createBookMark } = useBookMark();

  useEffect(() => {
    if (!lat || !lng) return;
    async function fetchLocationData() {
      setIsLoadingGeoCoding(true);
      try {
        const { data } = await axios.get(
          `${BASE_GEOCODING_URL}?latitude=${lat}&longitude=${lng}`
        );
        if (!data.countryCode)
          throw new Error(
            "this location is not city,please click some where else! "
          );
        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setCountryCode(data.countryCode);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoadingGeoCoding(false);
      }
    }
    fetchLocationData();
  }, [lat, lng]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cityName || !country) return;

    const newBookMark = {
      cityName,
      country,
      countryCode,
      latitude: lat,
      longitude: lng,
      host_location: cityName + "" + country,
    };
    await createBookMark(newBookMark);
    navigate("/bookmark");
  };

  if (isLoadingGeoCoding) return <p>Loading...</p>;

  return (
    <div className="px-2 md:px-4">
      <h2 className="text-xs sm:text-lg md:text-2xl font-bold mb-4 text-nowrap">
        Bookmark New Location
      </h2>
      <form className="flex-col" onSubmit={handleSubmit}>
        <div className="flex flex-col mb-4">
          <label htmlFor="cityName" className="text-xs sm:text-base md:text-lg">
            CityName
          </label>
          <input
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            type="text"
            name="cityName"
            id="cityName"
            className="border border-slate-500 rounded-xl p-2 text-xs sm:text-sm md:text-base"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="country" className="text-xs sm:text-base md:text-lg">
            CountryName
          </label>
          <input
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            type="text"
            name="country"
            id="country"
            className="border border-slate-500 rounded-xl p-2 text-xs sm:text-sm md:text-base"
          />
          <ReactCountryFlag
            className="m-4"
            style={{ height: 50, width: 50 }}
            svg
            countryCode={countryCode}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
            className="mb-4 px-1 sm:px-2 md:px-4 py-1 sm:py-2 text-xs sm:text-sm md:text-base border text-white bg-blue-700 rounded-lg"
          >
            &larr; Back
          </button>
          <button className="mb-4 px-1 sm:px-2 md:px-4 py-1 sm:py-2 text-xs sm:text-sm md:text-base border text-white bg-blue-700 rounded-lg">
            {" "}
            ✔️ Add
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddNewBookmark;
