import { Outlet } from "react-router-dom";
import Map from "../Map/Map";
import { useBookMark } from "../../context/BookmarkListContext";

function BookmarkLayout() {
  const {bookmarks}=useBookMark()
  return (
    <div className="flex mt-4 justify-between items-stretch max-h-[calc(104vh_-_130px)] w-full px-2">
      <div className="w-1/2 overflow-y-scroll pr-1 min-h-[calc(104vh_-_130px)]">
        <Outlet />
      </div>
      <Map markerLocations={bookmarks} />
    </div>
  );
}

export default BookmarkLayout;
