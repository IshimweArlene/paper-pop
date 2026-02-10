'use client';
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.svg";

const sections = [
  { id: "home", label: "Home" },
  { id: "how-it-works", label: "How It Works" },
  { id: "features", label: "Features" },
];

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      if (window.scrollY < 100) {
        setActiveSection("home");
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { 
        threshold: 0.1, 
        rootMargin: "-30% 0px -30% 0px" 
      }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    window.addEventListener('scroll', handleScroll);
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`fixed z-50 flex justify-between items-center px-4 md:pl-8 md:pr-2 mt-4 w-[95%] max-w-[43rem] h-15.5 border transition-all duration-300 rounded-full ${
      isScrolled 
        ? "bg-white/30 backdrop-blur-md border-[#DBD3D3]/50 shadow-sm" 
        : "bg-white border-[#DBD3D3]"
    }`}>
      <div className="flex items-center">
        <Image src={logo} alt="Logo" width={40} height={32} />
        <p className="text-[#C99326] text-[10px] hidden sm:block">Imena-pop</p>
      </div>
      <ul className="flex gap-2 sm:gap-4 text-[13px] sm:text-[15px] font-medium">
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
      <Link href="/templates">
        <button className="bg-[#1851C1] px-3 sm:w-34.25 h-10.75 rounded-4xl text-[14px] sm:text-[16px] text-white font-bold cursor-pointer whitespace-nowrap">
          Templates
        </button>
      </Link>
    </nav>

  );
};

export default Navbar;
