"use client"; 
import { useRouter } from "next/navigation";
import { useState } from "react";
import { links, RoleBased } from "./Navbardata";
import Image from "next/image";
interface HeaderProps {
  setMenuOpen: (value: boolean) => void; 
}

const Header: React.FC<HeaderProps> = ({ setMenuOpen }) => {
  const router = useRouter(); 
  const [, setLoading] = useState(false);
  const [, setIsOpen] = useState(false);



  const handleNavigate = async (courseName: string) => {
    setLoading(true);
  
    if (courseName === "Internship") {
      router.push("/internship");
    } else {
      const encodedText = encodeURIComponent(courseName);
      router.push(`/coursecontent?message=${encodedText}`);
    }
  
    setLoading(false);
    setIsOpen(false);
    setMenuOpen(false); 
  };
  

  return (
    <div className="bg-black w-full  justify-center px-40 border-b border-gray-400/30 flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-gray-400/30">
      {/* Domain-based Section */}
      <div className="lg:w-2/3 p-4">
        <h1 className="text-lg font-bold mb-4 text-blue-300">Domain-based</h1>
        <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3">
          {links.map((link) => (
            <li
              key={link.label}
              className="flex items-center pl-4 pt-1 text-sm cursor-pointer hover:text-gray-300 transition-transform space-x-2"
              onClick={() => handleNavigate(link.label)}
            >
              <Image width={40} height={40} src={link.icon} alt={link.label} className="w-8" />
              <span className="text-gray-400 pl-2">
                {link.label}
                <br />
                <span className="text-gray-600 text-sm">{link.details}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Role-based Section */}
      <div className="lg:w-4/3 p-4">
        <h1 className="text-lg font-bold mb-4 text-blue-300">Role-Based</h1>
        <ul>
          {RoleBased.map((link) => (
            <li
              key={link.label}
              className="flex items-center pl-4 pt-1 text-sm cursor-pointer hover:text-gray-300 transition-transform space-x-2"
              onClick={() => handleNavigate(link.label)}
            >
              <img src={link.icon} alt={link.label} className="w-8" />
              <span className="text-gray-400">
                {link.label}
                <br />
                <span className="text-gray-600 text-sm">{link.details}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Header;
