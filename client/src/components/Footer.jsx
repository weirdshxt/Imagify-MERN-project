import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="flex items-center justify-between gap-4 py-3 mt-20">
      <img src={assets.logo_icon} alt="" width={30} className="max-sm:hidden" />
      <p className="flex-1 border-l border-gray-400 pl-4 max-sm:pl-2 text-sm text-gray-500">
        All right reserved. Copyright @imagify
      </p>

      <div className="flex gap-2">
        <img src={assets.facebook_icon} alt="" width={30} />
        <img src={assets.instagram_icon} alt="" width={30} />
        <img src={assets.twitter_icon} alt="" width={30} />
      </div>
    </div>
  );
};

export default Footer;
