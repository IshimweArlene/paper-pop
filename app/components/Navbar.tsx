'use client';
import { useEffect, useState } from "react";
import Image from "next/image";
import logo from "@/public/logo.svg";

const sections = [
  { id: "home", label: "Home" },
  { id: "how-it-works", label: "How It Works" },
  { id: "features", label: "Features" },
];

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 , rootMargin: "-78px 0px 0px 0px"}
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="fixed z-50 flex justify-between items-center pl-8 pr-2 mt-4 w-172 h-15.5 border border-[#DBD3D3] bg-white rounded-full">
      <div className="flex items-center">
        <Image src={logo} alt="Logo" width={40} height={32} />
        <p className="text-[#C99326] text-[10px]">Imena-pop</p>
      </div>
      <ul className="flex gap-4 text-[15px] font-medium">
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className={`transition-all duration-300 ${
                activeSection === section.id ? "text-[#1851C1]" : "text-black"
              }`}
            >
              {section.label}
            </a>
          </li>
        ))}
      </ul>
      <button className="bg-[#1851C1] w-34.25 h-10.75 rounded-4xl text-[16px] text-white font-bold cursor-pointer ">
        Templates
      </button>
    </nav>
  );
};

export default Navbar;
