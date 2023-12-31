import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useHotels } from "../../context/HotelsProvider";

function SingleHotel() {
  const { id } = useParams();
  // console.log(id);

  const { getHotel, currentHotel, isLoadingCurrHotel } = useHotels();

  useEffect(() => {
    getHotel(id);
  }, [id]);

  if (isLoadingCurrHotel || !currentHotel) return <p>Loading...</p>;

  return (
    <div className="flex-col items-center justify-center pl-4 md:pl-8">
      <div>
        <h2 className="text-xs font-bold sm:text-sm md:text-lg mb-4">
          {currentHotel.name}
        </h2>
        <div className="text-xs sm:text-sm md:text-lg mb-8">
          <strong>{currentHotel.number_of_reviews} reviews</strong> &bull;
          {currentHotel.smart_location}
        </div>
        <img
          src={currentHotel.xl_picture_url}
          alt={currentHotel.name}
          className="rounded-md w-24 h-24 sm:w-52 sm:h-52 md:w-80 md:h-80 lg:w-96 lg:h-96 mb-4 object-cover shadow-lg shadow-slate-700"
        />
      </div>
    </div>
  );
}

export default SingleHotel;
