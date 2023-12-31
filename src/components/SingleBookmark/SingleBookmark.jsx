import { useNavigate, useParams } from "react-router-dom";
import { useBookMark } from "../../context/BookmarkListContext";
import { useEffect } from "react";

function SingleBookmark() {
  const { id } = useParams();
  const { getBookmark, currentBookmark, isLoading } = useBookMark();
  const navigate = useNavigate();

  useEffect(() => {
    getBookmark(id);
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  if (isLoading || !currentBookmark) return <p>Loading...</p>;

  return (
    <div>
      <button onClick={handleBack} className="text-xs sm:text-base mb-4 px-4 py-1 md:py-2 border text-white bg-blue-700 rounded-lg">
        ⬅️ Back To Bookmarks List
      </button>
      <h2 className="text-xl font-bold">{currentBookmark.cityName}</h2>
    </div>
  );
}

export default SingleBookmark;
