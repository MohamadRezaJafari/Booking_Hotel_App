import { Link } from "react-router-dom";
import { useBookMark } from "../../context/BookmarkListContext";
import { ReactCountryFlag } from "react-country-flag";
import { HiTrash } from "react-icons/hi";

function Bookmark() {
  const { isLoading, bookmarks, currentBookmark, deleteBookMark } =
    useBookMark();

  const handleDelete = async (e, id) => {
    e.preventDefault();
    await deleteBookMark(id);
  };

  if (isLoading) return <p>Loading...</p>;
  if (!bookmarks.length) return <p className="text-xl font-bold">there is no Bookmarked location</p>;
  return (
    <div>
      <h2>Bookmark List :</h2>
      <div className="mx-2">
        {bookmarks.map((item) => {
          return (
            <Link
              key={item.id}
              to={`${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
            >
              <div
                className={`flex items-center justify-between p-4 my-4 border border-slate-700 rounded-xl text-xs sm:text-sm md:text-base ${
                  item.id === currentBookmark?.id ? "bg-slate-300" : ""
                }`}
              >
                <div className="text-xs md:text-base">
                  <ReactCountryFlag svg countryCode={item.countryCode} />
                  &nbsp; <strong>{item.cityName}</strong> &nbsp;{" "}
                  <span>{item.country}</span>
                </div>
                <button onClick={(e) => handleDelete(e, item.id)}>
                  <HiTrash className="text-red-500 w-4 h-4 sm:w-6 sm:h-6" />
                </button>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Bookmark;
