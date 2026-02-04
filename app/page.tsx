import Image from "next/image";
import Navbar from "./components/Navbar";
export default function Home() {
  return (
    <div className="max-w-360 h-645.75 overflow-hidden bg-white ">
      <div className="w-183.5 h-full left-88.25 relative ">
        <div className=" h-111 flex justify-center bg-linear-to-b from-[#FFFFFF] to-[#D7E0F0]">
          <Navbar />
          <div className="pt-32 text-center whitespace-break-spaces">
           <p className="font-instrument-serif  text-[48px]">The <span className="text-[#1851C1]">Digital Space</span> for families to <span>plan & invite!</span></p>

          </div>
        </div>
      </div>
     
    </div>
  );
}
