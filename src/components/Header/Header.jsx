import { useRef, useState } from "react";
import {
  HiSearch,
  HiCalendar,
  HiMinus,
  HiPlus,
  HiLogout,
} from "react-icons/hi";
import useOutsideClick from "../../hooks/useOutsideClick";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

function Header() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [destination, setDestination] = useState(
    searchParams.get("destination" || "")
  );
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openDate, setOpenDate] = useState(false);
  const [accountBtn, setAccountBtn] = useState(false);

  const navigate = useNavigate();

  const handleOptions = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "inc" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const handleSearch = () => {
    // زمانیکه استیت آبجکت بود با این متد به عبارت قابل فهم تبدیل کنیم
    // اگر انجام ندهیم عبارت های غیرقابل فهم در یو آر ال نمایش داده میشود
    //! مسیر اشتباه :
    // ! setSearchParams({ date, destination, options });
    // ! ?date=%5Bobject+Object%5D&destination=&options=%5Bobject+Object%5D
    // ? مسیر درست:
    const encodedParams = createSearchParams({
      date: JSON.stringify(date),
      destination,
      options: JSON.stringify(options),
    });
    // * اگر در پروژه هامون نیاز بود سرچ پارامز هاتون رو ست بکنید آپدیت کنید و توی یو آر ال قرار دهید به این روش انجام دهید
    //setSearchParams(encodedParams);
    // ! همزمان که کاربر تعداد مسافرا و روزها را وارد کرده و دکمه سرچ را میزند سرچ پارامز هارو آپدیت کنیم که هتل ها و چیزایی که جستجو کرده را در قسمت آدرس نمایش دهد
    // ! دکمه ی سمت راست جستجو را اگر بزنیم یک صفحه با تمامی هتل ها و لوکیشنشون نمایش داده میشود
    navigate({
      pathname: "/hotels",
      search: encodedParams.toString(),
    });
  };

  return (
    <nav className="container mx-auto max-w-screen-2xl bg-white px-1 py-2 shadow-lg sticky z-10 top-0 mb-8 sm:flex items-center justify-between">
      <div className="flex justify-around items-center flex-1">
        <ul className="flex items-center sm:border-r sm:border-slate-300 text-xs md:text-sm lg:text-lg lg:gap-x-4">
          <li>
            <span className="hidden sm:block text-blach font-bold px-1 hover:bg-blue-200 rounded-lg transition-all duration-500">
              LOGO
            </span>
          </li>
          <li>
            <a
              className="block text-blue-700 px-1 hover:bg-gray-100 rounded-lg transition-all duration-500"
              href="#"
              onClick={() => navigate("/")}
            >
              Home
            </a>
          </li>
          <li>
            <a
              className="block text-blue-700 px-1 hover:bg-gray-100 rounded-lg transition-all duration-500"
              href="#"
              onClick={() => navigate("/hotels")}
            >
              Hotels
            </a>
          </li>
          <li>
            <a
              className="block text-blue-700 px-1 hover:bg-gray-100 rounded-lg transition-all duration-500"
              href="#"
              onClick={() => navigate("/bookmark")}
            >
              Bookmarks
            </a>
          </li>
          <li
            className="relative flex items-center"
            onMouseEnter={() => setAccountBtn(!accountBtn)}
          >
            <span
              className="block hover:cursor-pointer text-blue-700 p-1 hover:bg-gray-100 rounded-lg transition-all duration-500"
              href="#"
              id="accountDropDown"
            >
              Account
            </span>
            {accountBtn && <AccountItems setAccountBtn={setAccountBtn} />}
          </li>
        </ul>
        <div className="w-full max-w-lg">
          <div className="bg-slate-200 rounded-2xl flex items-center gap-x-2 ml-2 p-1 md:mx-2 lg:p-1.5 sm:ml-0 text-xs md:text-sm lg:text-base">
            <button
              className=" bg-blue-700 p-1 rounded-full"
              onClick={handleSearch}
            >
              <HiSearch className="text-white" />
            </button>
            <input
              className="focus:outline-none bg-transparent w-full p-0.5 text-slate-800"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              type="search"
              placeholder="Where to go?"
            />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-around border bg-slate-200 rounded-2xl p-1 lg:p-2 lg:px-4 mx-1">
        {/* date item */}
        <DateItem
          openDate={openDate}
          setOpenDate={setOpenDate}
          date={date}
          setDate={setDate}
        />
        <div className="relative flex items-center text-slate-500 text-xs md:text-sm lg:text-base lg:px-4">
          <div
            id="optionDropDown"
            onClick={() => setOpenOptions(!openOptions)}
            className="hover:cursor-pointer"
          >
            {options.adult}Adult&bull;{options.children}Children&bull;
            {options.room}Room
          </div>
          {openOptions && (
            <GuestOptionsList
              options={options}
              handleOptions={handleOptions}
              setOpenOptions={setOpenOptions}
            />
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;

function GuestOptionsList({ options, handleOptions, setOpenOptions }) {
  const optionsRef = useRef();
  useOutsideClick(optionsRef, "optionDropDown", () => setOpenOptions(false));
  return (
    <div
      ref={optionsRef}
      className="absolute top-8 bg-white rounded-xl p-1 sm:p-2 w-full shadow-md border border-blue-200 text-sm"
    >
      <OptionItem
        handleOptions={handleOptions}
        type="adult"
        minLimit={1}
        options={options}
      />
      <OptionItem
        handleOptions={handleOptions}
        type="children"
        minLimit={0}
        options={options}
      />
      <OptionItem
        handleOptions={handleOptions}
        type="room"
        minLimit={1}
        options={options}
      />
    </div>
  );
}

function OptionItem({ options, type, minLimit, handleOptions }) {
  return (
    <div className="flex items-center justify-between mt-2">
      <span>{type}</span>
      <div className="flex items-center">
        <button
          className="bg-slate-200 p-1 rounded-md text-blue-700"
          disabled={options[type] <= minLimit}
          onClick={() => handleOptions(type, "dec")}
        >
          <HiMinus className="w-2 h-2 md:w-3 md:h-3 lg:w-4 lg:h-4" />
        </button>
        <span className="px-4">{options[type]}</span>
        <button
          className="bg-slate-200 p-1 rounded-md text-blue-700"
          onClick={() => handleOptions(type, "inc")}
        >
          <HiPlus className="w-2 h-2 md:w-3 md:h-3 lg:w-4 lg:h-4" />
        </button>
      </div>
    </div>
  );
}

function DateItem({ openDate, setOpenDate, date, setDate }) {
  const dateRef = useRef();
  useOutsideClick(dateRef, "dateDropDown", () => setOpenDate(false));
  // console.log(date);
  return (
    <div
      id="dateDropDown"
      ref={dateRef}
      className="relative flex items-center gap-x-1 pr-1 md:pr-4 border-r border-slate-400 text-slate-500 text-xs md:text-sm lg:text-base"
    >
      <HiCalendar className="w-4 h-4 text-blue-700 sm:w-5 sm:h-5 md:w-6 md:h-6" />
      <div
        onClick={() => setOpenDate(!openDate)}
        className="hover:cursor-pointer"
      >
        {`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
          date[0].endDate,
          "MM/dd/yyyy"
        )} `}
      </div>
      {openDate && (
        <DateRange
          ranges={date}
          onChange={(item) => setDate([item.selection])}
          className="absolute top-10"
          minDate={new Date()}
          moveRangeOnFirstSelection={true}
        />
      )}
    </div>
  );
}

function AccountItems({ setAccountBtn }) {
  const accountRef = useRef();
  useOutsideClick(accountRef, "accountDropDown", () => setAccountBtn(false));
  return (
    <div
      ref={accountRef}
      className="absolute z-10 flex flex-col text-center top-10 bg-white rounded-xl sm:p-2 w-24 shadow-md border border-blue-200 text-sm"
    >
      <User />
    </div>
  );
}

function User() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <div>
      {isAuthenticated ? (
        <div className="flex justify-between">
          <span className="text-blue-700 p-2">{user.name}</span>
          <button>
            <HiLogout onClick={handleLogout} className="text-red-700" />
          </button>
        </div>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="text-gray-500 px-2 py-1 hover:bg-gray-200 hover:text-blue-700 rounded-lg text-center"
        >
          Login
        </button>
      )}
    </div>
  );
}
