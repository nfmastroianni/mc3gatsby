import { Menu, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import {
  HiChevronDown,
  HiCalendar,
  HiOutlineCalendar,
  HiSun,
  HiOutlineSun,
  HiAcademicCap,
  HiOutlineAcademicCap,
  HiNewspaper,
  HiOutlineNewspaper,
  HiPlus,
  HiOutlinePlus,
  HiExternalLink,
  HiOutlineExternalLink,
  HiCloud,
  HiOutlineCloud,
  HiHome,
  HiOutlineHome,
  HiIdentification,
  HiOutlineIdentification,
  HiChatAlt2,
  HiOutlineChatAlt2,
} from "react-icons/hi";

const query = graphql`
  {
    allContentfulMenuItem(sort: { fields: menuOrder, order: ASC }) {
      nodes {
        linkText
        url
        type
        menuOrder
        menuIcon
        id
      }
    }
  }
`;

export default function Navbar(props) {
  const {
    allContentfulMenuItem: { nodes },
  } = useStaticQuery(query);
  return (
    <div className="bg-white mx-auto px-4 sm:px-6 lg:px-8 w-full shadow-sm z-10">
      <div className="max-w-screen-xl flex justify-between items-center py-6 md:justify-start md:space-x-10 mx-auto">
        <div className="flex-1">
          <Link
            className="flex items-center flex-wrap focus:outline-none focus:ring-4 focus:ring-yellow-300"
            to="/"
          >
            <StaticImage
              src="../images/favicon-icon.png"
              alt="Monmouth County Curriculum Consortium logo"
              loading="lazy"
              placeholder="tracedSVG"
              className="w-16 block mr-3 flex-initial"
            />
            <p className="font-sans font-medium text-sm md:text-base text-blue-700 lg:text-xl">
              Monmouth County <br />
              Curriculum Consortium
            </p>
          </Link>
        </div>
        {/* Mobile Navigation begins here */}
        <div
          className={`${nodes.length > 5 ? " " : " lg:hidden"} -mr-2 -my-2 `}
        >
          <div className="text-right">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-md hover:bg-opacity-95 hover:text-blue-50 focus:outline-none focus:ring-4 focus:ring-yellow-300">
                  Menu
                  <HiChevronDown
                    className="w-5 h-5 ml-2 -mr-1 text-blue-200"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-slate-100 rounded-md shadow-lg ring-1 ring-yellow-300 ring-opacity-5 focus:outline-none">
                  <div className="px-1 py-1 text-white">
                    {nodes.map((node) => {
                      const icons = {
                        Calendar: HiCalendar,
                        Sun: HiSun,
                        AcademicCap: HiAcademicCap,
                        Newspaper: HiNewspaper,
                        Plus: HiPlus,
                        Link: HiExternalLink,
                        Cloud: HiCloud,
                        Identification: HiIdentification,
                        ChatAlt2: HiChatAlt2,
                      };
                      const iconsOutline = {
                        Calendar: HiOutlineCalendar,
                        Sun: HiOutlineSun,
                        AcademicCap: HiOutlineAcademicCap,
                        Newspaper: HiOutlineNewspaper,
                        Plus: HiOutlinePlus,
                        Link: HiOutlineExternalLink,
                        Cloud: HiOutlineCloud,
                        Identification: HiOutlineIdentification,
                        ChatAlt2: HiOutlineChatAlt2,
                      };
                      const MenuIcon = icons[node.menuIcon];
                      const MenuIconOutline = iconsOutline[node.menuIcon];
                      // Check Link type, if internal use Link component
                      if (node.type === "Internal") {
                        return (
                          <Menu.Item key={node.id}>
                            {({ active }) => (
                              <Link
                                to={node.url}
                                className={`${
                                  active
                                    ? "bg-blue-700 hover:text-white focus:text-white"
                                    : "text-slate-900 "
                                } ${
                                  props.path.includes(node.url) &&
                                  `border-b-2 bg-blue-100 text-black font-semibold shadow-sm `
                                } focus:text-white group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                              >
                                {active ? (
                                  <MenuIcon
                                    className="w-5 h-5 mr-2"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <MenuIconOutline
                                    className="w-5 h-5 mr-2"
                                    aria-hidden="true"
                                  />
                                )}
                                {node.linkText}
                              </Link>
                            )}
                          </Menu.Item>
                        );
                      } else {
                        return (
                          <Menu.Item key={node.id}>
                            {({ active }) => (
                              <a
                                href={node.url}
                                className={`${
                                  active
                                    ? "bg-blue-700 text-white"
                                    : "text-slate-900"
                                } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                              >
                                {active ? (
                                  <MenuIcon
                                    className="w-5 h-5 mr-2"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <MenuIconOutline
                                    className="w-5 h-5 mr-2"
                                    aria-hidden="true"
                                  />
                                )}
                                {node.linkText}
                              </a>
                            )}
                          </Menu.Item>
                        );
                      }
                    })}
                  </div>
                  <div className="px-1 py-1">
                    {props.path !== "/" && (
                      <>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/"
                              className={`${
                                active
                                  ? "bg-blue-700 text-white"
                                  : "text-slate-900"
                              } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                            >
                              {active ? (
                                <HiHome
                                  className="w-5 h-5 mr-2"
                                  aria-hidden="true"
                                />
                              ) : (
                                <HiOutlineHome
                                  className="w-5 h-5 mr-2"
                                  aria-hidden="true"
                                />
                              )}
                              Home
                            </Link>
                          )}
                        </Menu.Item>
                      </>
                    )}
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/join"
                          className={`${
                            active ? "bg-blue-700 text-white" : "text-slate-900"
                          } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                        >
                          {active ? (
                            <HiPlus
                              className="w-5 h-5 mr-2"
                              aria-hidden="true"
                            />
                          ) : (
                            <HiOutlinePlus
                              className="w-5 h-5 mr-2"
                              aria-hidden="true"
                            />
                          )}
                          Become a Member
                        </Link>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
        {/* Desktop Navigation begins here */}
        <nav
          className={`${
            nodes.length > 5
              ? "hidden "
              : "hidden lg:flex space-x-10 text-blue-700 font-semibold"
          } `}
        >
          <Link
            to="/"
            className={`${
              props.path === "/" &&
              `transition ease-in-out duration-150 hover:border-blue-700 border-b-4 border-blue-500 pointer-events-none `
            }inline-flex items-center text-base leading-6 font-medium focus:outline-none focus:ring-4 focus:ring-yellow-300 rounded-sm transition ease-in-out duration-150`}
          >
            Home
          </Link>

          {nodes.map((node) => {
            if (node.type === "Internal") {
              return (
                <Link
                  className={`${
                    props.path.includes(node.url) &&
                    `transition ease-in-out duration-150 hover:border-blue-700 border-b-4 border-blue-500 pointer-events-none `
                  }inline-flex items-center text-base leading-6 font-medium focus:outline-none focus:ring-4 focus:ring-yellow-300 rounded-sm transition ease-in-out duration-150`}
                  to={node.url}
                  key={node.menuOrder}
                >
                  {node.linkText}
                </Link>
              );
            } else {
              return (
                <a
                  className={`${
                    props.path.includes(node.url) &&
                    `transition ease-in-out duration-150 hover:border-red-700 border-b-4 border-blue-700 `
                  }inline-flex items-center text-base leading-6 font-medium focus:outline-none focus:ring-4 focus:ring-yellow-300 rounded-sm transition ease-in-out duration-150`}
                  href={node.url}
                  key={node.menuOrder}
                >
                  {node.linkText}
                </a>
              );
            }
          })}
        </nav>
        <div
          className={`${
            nodes.length > 5 ? "hidden" : " hidden lg:flex "
          }   items-center justify-end space-x-8 md:flex-1 lg:w-0`}
        >
          <span className="inline-flex rounded-md shadow-sm flex-none">
            <Link
              className=" whitespace-no-wrap text-center items-center justify-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-yellow-300 active:bg-blue-600 transition ease-in-out duration-150"
              to="/join"
            >
              Become a Member
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
