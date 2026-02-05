import Image from "next/image";
import logo from "@/public/logo.svg"
import template1 from '@/public/template1.png'
import download from '@/public/download.svg'
const Preview = () => {
    return (
        <div className="bg-[#D7E0F0] h-256 w-full">
            <nav className="w-full h-24 flex items-center gap-4 border-b border-[#DBD3D3] pl-22">
                <Image src={logo} alt="Logo" width={40} height={32} />
                <p className="text-[#C99326] text-[10px]">Imena-pop</p>
            </nav>
            <div className="pl-51 pr-51 pt-24 flex gap-12 items-center justify-center">
                <div className="flex flex-col">
                    <div className="flex items-center gap-4">
                     <p className="text-black font-bold w-1.5">&lt;</p>
                     <p className="text-[10px] text-black">Back to edit</p>
                    </div>
                    <Image src={template1} alt="Template" />
                </div>
                <div className="w-110">
                    <p className="text-black font-medium text-4xl">Your Imena <span className="font-instrument-serif italic text-[#1851C1]">Masterpiece </span> is Ready.</p>
                    <p className="text-[16px] mt-4 text-black" >The layout has been meticulously optimized for high-quality printing. Please review all details before downloading.</p>
                    <div className="flex bg-[#CBCFE6] w-108.5 h-19.5 mt-4 items-center rounded-[20px] pl-4.25 gap-3">
                        <Image src={download} alt="download" />
                        <p className="text-black text-[16px]">Download as PDF</p>
                    </div>
                    <div className="flex bg-[#CBCFE6] w-108.5 h-19.5 items-center rounded-[20px] pl-4.25 gap-3 mt-4">
                        <Image src={download} alt="download" />
                        <p className="text-black text-[16px]">Download as PDF</p>
                    </div>
                </div>
                
            </div>
        </div>
    );
}
 
export default Preview;