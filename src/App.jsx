import AddNewBookmark from "./components/AddNewBookmark/AddNewBookmark";
import AppLayout from "./components/AppLayout/AppLayout";
import Bookmark from "./components/Bookmark/Bookmark";
import BookmarkLayout from "./components/BookmarkLayout/BookmarkLayout";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Hotels from "./components/Hotels/Hotels";
import LocationList from "./components/LocationList/LocationList";
import Login from "./components/Login/Login";
import ProtectRoute from "./components/ProtectRoute/ProtectRoute";
import SingleBookmark from "./components/SingleBookmark/SingleBookmark";
import SingleHotel from "./components/SingleHotel/SingleHotel";
import AuthProvider from "./context/AuthProvider";
import BookmarkListProvider from "./context/BookmarkListContext";
import HotelsProvider from "./context/HotelsProvider";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <AuthProvider>
        <BookmarkListProvider>
          <HotelsProvider>
            <Toaster />
            <Header />
            <Routes>
              <Route path="/" element={<LocationList />} />
              <Route path="/hotels" element={<AppLayout />}>
                <Route index element={<Hotels />} />
                <Route path=":id" element={<SingleHotel />} />
              </Route>
              <Route
                path="/bookmark"
                element={
                  <ProtectRoute>
                    <BookmarkLayout />
                  </ProtectRoute>
                }
              >
                <Route index element={<Bookmark />} />
                <Route path=":id" element={<SingleBookmark />} />
                <Route path="add" element={<AddNewBookmark />} />
              </Route>
              <Route path="/login" element={<Login />} />
            </Routes>
            <Footer />
          </HotelsProvider>
        </BookmarkListProvider>
      </AuthProvider>
    </>
  );
}

export default App;
