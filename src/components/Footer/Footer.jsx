import { SocialIcon } from "react-social-icons/component";
import "react-social-icons/whatsapp";
import "react-social-icons/instagram";
import "react-social-icons/twitter";
import "react-social-icons/facebook";

function Footer() {
  return (
    <footer className="container mx-auto max-w-screen-2xl rounded-md px-2">
      <div className="hidden w-full bg-white shadow-inner py-6 px-20 md:flex items-center justify-between gap-x-10 rounded-2xl">
        <div className="flex-col items-center justify-between ml-8 p-4 w-full">
          <h1 className="text-center font-bold mb-3">Social Media</h1>
          <div className="flex flex-col items-center gap-y-2">
            <span className="hover:cursor-pointer">
              <SocialIcon
                network="whatsapp"
                style={{ height: 30, width: 30 }}
              />
            </span>
            <span className="hover:cursor-pointer">
              <SocialIcon
                network="instagram"
                style={{ height: 30, width: 30 }}
              />
            </span>
            <span className="hover:cursor-pointer">
              <SocialIcon network="twitter" style={{ height: 30, width: 30 }} />
            </span>
            <span className="hover:cursor-pointer">
              <SocialIcon
                network="facebook"
                style={{ height: 30, width: 30 }}
              />
            </span>
          </div>
        </div>
        <div className="flex-col items-center p-4 w-40">
          <h1 className="mb-8 font-bold">Menu</h1>
          <ul className="">
            <li>
              <a href="">Home</a>
            </li>
            <li>
              <a href="">Bookmarks</a>
            </li>
            <li>
              <a href="">Login</a>
            </li>
            <li>
              <a href="">SignUp</a>
            </li>
            <li>
              <a href="">About</a>
            </li>
          </ul>
        </div>
        <div className="flex-col p-2 w-full">
          <div className="flex items-stretch justify-between overflow-hidden rounded-xl bg-gray-200">
            <input
              type="text"
              dir="ltr"
              className="border-0 w-full max-w-[150px] bg-transparent p-2 text-gray-700 outline-none focus:outline-none"
              placeholder="Email Address"
            />
            <button className="border-0 bg-blue-500 px-4 text-white outline-none">
              SignUp
            </button>
          </div>
        </div>
        <div className="flex-col items-center ml-8 p-4 w-full">
          <h1 className="text-start font-bold mb-8">Contact</h1>
          <p>Street : Satarkhan Tehranvila</p>
          <p>City : Tehran</p>
          <p>State full : Naderi Rad</p>
          <p>Zip code : 1021201</p>
          <p>Phone Number : +989129639131</p>
        </div>
      </div>
      <p className="hidden md:block text-center text-xs">
        Created By <strong>Dev.MohamadRezaJafari@gmail.com</strong> in 2023
      </p>
    </footer>
  );
}

export default Footer;
