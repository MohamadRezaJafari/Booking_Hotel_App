import { Link } from "react-router-dom";
import { useHotels } from "../../context/HotelsProvider";

function Hotels() {
  const { isLoading, hotels, currentHotel } = useHotels();
  if (isLoading) return <p>loading...</p>;

  return (
    <div className="m-4">
      <h2 className="text-sm sm:text-base md:text-2xl font-bold mb-4">
        Search Result :({hotels.length})
      </h2>
      {hotels.map((item) => {
        return (
          <Link
            key={item.id}
            to={`/hotels/${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
          >
            <div
              className={`${
                item.id === currentHotel?.id
                  ? "border-double border-4 border-blue-700 p-2 mb-4"
                  : ""
              }`}
            >
              <img
                src={item.picture_url.url}
                alt={item.name}
                className="rounded-md w-24 h-24 sm:w-52 sm:h-52 md:w-80 md:h-80 lg:w-96 lg:h-96 mb-4 object-cover shadow-lg shadow-slate-700"
              />
              <div className="text-sm">
                <p className="font-bold">{item.smart_location}</p>
                <p className="text-slate-400">{item.name}</p>
                <p className="font-bold mb-8">
                  €&nbsp;{item.price}&nbsp;
                  <span className="text-slate-400">Night</span>
                </p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default Hotels;
