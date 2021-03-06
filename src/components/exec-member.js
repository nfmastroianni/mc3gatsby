import * as React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { FaLinkedin } from "react-icons/fa";

export default function execMember({
  fullName,
  role,
  socialMediaImage,
  socialMediaLink,
}) {
  return (
    <>
      <div
        className={`p-4 flex flex-col text-center md:flex-row flex-wrap items-center ${
          socialMediaImage !== "none" && ` md:text-left`
        }`}
      >
        <a href={socialMediaLink}>
          {socialMediaImage === "none" && <></>}
          {!socialMediaImage && (
            <img
              src="https://via.placeholder.com/100"
              alt={`placeholder for portrait of ${fullName}`}
              className="w-24 md:mr-4 rounded-full flex-initial border border-slate-300"
            />
          )}
          {socialMediaImage && socialMediaImage !== "none" && (
            <GatsbyImage
              image={getImage(socialMediaImage.gatsbyImageData)}
              alt=""
              className="filter grayscale transition duration-500 ease-in-out hover:grayscale-0 w-24 md:mr-4 rounded-full flex-initial border border-slate-300"
            />
          )}
        </a>
        <div className="flex-1">
          <h3 className="text-xl font-medium">{fullName}</h3>
          <h4 className="text-sm ">{role}</h4>
          <p className={`${!socialMediaLink && `hidden`}`}>
            <a href={socialMediaLink}>
              <FaLinkedin className="inline text-blue-700 text-sm" />
              <span className="ml-2 text-xs">Connect on LinkedIn</span>
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
