"use client";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  IconMenu2,
  IconX,
} from "@tabler/icons-react";

const Sidebar = ({ navItems }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCourseOpen, setIsCourseOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const CourseNavigate = async (courseName: string) => {
    setLoading(true);
    const encodedText = encodeURIComponent(courseName);
    router.push(`/coursecontent?message=${encodedText}`);
    setLoading(false);
    setIsOpen(false); // Close sidebar on selection
  };

  return (
    <div>
      {/* Menu Icon for small screens */}
      <div className="inline-flex lg:hidden justify-end">
        <IconMenu2 className="text-3xl text-white cursor-pointer" onClick={() => setIsOpen(!isOpen)} />
      </div>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 bottom-0 right-0 p-2 w-[300px] overflow-y-auto text-center bg-black transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Sidebar Header */}
        <div className="text-gray-100 text-xl">
          <div className="p-2.5 mt-1 flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-800 via-blue-600 to-white">
              <Link href="/" onClick={() => setIsOpen(false)}>DevOpsFarm</Link>
            </h1>
            <IconX className="text-2xl text-gray-200 cursor-pointer lg:hidden" onClick={() => setIsOpen(false)} />
          </div>
          <div className="my-2 bg-gray-600 h-[1px]"></div>
        </div>

        <div className="mt-3">
          {navItems.map((item: { id: React.Key | null | undefined; label: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; dropdown: any[]; }) => (
            <div key={item.id}>
              <div
                className="p-2.5 mt-3 flex items-center rounded-md px-4 cursor-pointer hover:bg-blue-600 text-white"
                onClick={item.label === "Courses" ? () => setIsCourseOpen(!isCourseOpen) : () => setIsOpen(false)}
              >
                <span className="text-[15px] ml-4 text-gray-200 font-bold">{item.label}</span>
              </div>

              {/* Dropdown for Courses */}
              
              {item.label === "Courses" && isCourseOpen && (
                <div className="pl-6">
                   <h1 className=" text-blue-300">Domain_Based</h1>
                  {loading ? (
                    <p className="text-center text-white">Loading...</p>
                  ) : (
                    item.dropdown?.filter((dropdownItem: { category: string; }) => dropdownItem.category === "domain_based").map((dropdownItem: { id: React.Key | null | undefined; label: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; icon: { url: string | undefined; }; }) => (
                     
                      <div
                        key={dropdownItem.id}
                        className="cursor-pointer flex items-center p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-white"
                        onClick={() => CourseNavigate(dropdownItem.label)}
                      >
                        <img src={dropdownItem.icon.url} className="w-6 h-6 mr-2" alt={dropdownItem.label} />
                        <span>{dropdownItem.label}</span>
                      </div>
                    ))
                  )}
                </div>
              )}

              {item.label === "Courses" && isCourseOpen && (
                <div className="pl-6">
                   <h1 className=" text-blue-300">Role-Based</h1>
                  {loading ? (
                    <p className="text-center text-white">Loading...</p>
                  ) : (
                    item.dropdown?.filter((dropdownItem: { category: string; }) => dropdownItem.category === "role_based").map((dropdownItem: { id: React.Key | null | undefined; label: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; icon: { url: string | undefined; }; }) => (
                     
                      <div
                        key={dropdownItem.id}
                        className="cursor-pointer flex items-center p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-white"
                        onClick={() => CourseNavigate(dropdownItem.label)}
                      >
                        <img src={dropdownItem.icon.url} className="w-6 h-6 mr-2" alt={dropdownItem.label} />
                        <span>{dropdownItem.label}</span>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
