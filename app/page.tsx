import Image from "next/image";
import Navbar from "./components/Navbar";
import template1 from "../public/template1.png";
export default function Home() {
  return (
    <div className="max-w-360 h-645.75 overflow-hidden bg-white ">
      <div className="w-183.5 h-full left-88.25 relative ">
        <div className=" h-111 flex justify-center bg-linear-to-b from-[#FFFFFF] to-[#D7E0F0]">
          <Navbar />
          <div className="pt-28 text-center whitespace-break-spaces w-99.75">
            <p className="font-instrument-serif italic text-[48px] text-[#433D3D]">The <span className="text-[#1851C1]">Digital Space</span> for families to <span className="text-[#1851C1]">plan & invite!</span></p>
            <p className="text-lg text-[#433D3D]">Create invitations, plan events, share details, and connect families beautifully</p>
            <button className="bg-[#1851C1] w-41.75 h-11.5 rounded-[40px] text-lg font-semibold mt-4">Get Started</button>
          </div>
        </div>
        
        <div className="flex flex-col items-center justify-center mt-9.25">
          <p className="font-instrument-serif italic text-[32px] text-black">Idea to Invitation in <span className="text-[#1851C1]">3 Steps</span></p>
          <p className="text-[16px] text-black w-104.25 text-center">We've streamlined the workflow so you can focus on the event, not the paperwork.</p>
          <div className="w-full h-43.5 mt-9.25 flex pt-4 px-39.5 items-start gap-14 border-t-[#DBD3D3] border">
            <p className="text-black font-normal text-[16px]">\001</p>
            <div>
              <p className="font-medium text-xl text-black">Fill in event details to start creating your Imena invitation</p>
              <p className="text-[16px] mt-2 text-[#433D3D]">You enter event title, date, time, location, and agenda, instantly creating a clear structure with consistent formatting.</p>
            </div>
          </div>
           <div className="w-full h-43.5 flex pt-4 px-39.5 items-start gap-14 border-t-[#DBD3D3] border">
            <p className="text-black font-normal text-[16px]">\002</p>
            <div>
              <p className="font-medium text-xl text-black">Preview a polished Imena-themed invitation generated in real time</p>
              <p className="text-[16px] mt-2 text-[#433D3D]">The invitation updates live with Imena branding, allowing you to review layout, colors, and content before finalizing.</p>
            </div>
          </div>
          <div className="w-full h-43.5  flex pt-4 px-39.5 items-start gap-14 border-t-[#DBD3D3] border">
            <p className="text-black font-normal text-[16px]">\003</p>
            <div>
              <p className="font-medium text-xl text-black">Download and share your invitation as a ready-to-use PDF</p>
              <p className="text-[16px] mt-2 text-[#433D3D]">Download a high-quality PDF that preserves design and formatting, ready to share with family members or outsiders.</p>
            </div>
          </div>

          <div className="flex flex-col px-29.5 justify-center items-center pt-8.75 mt-4">
            <p className="font-instrument-serif italic text-[32px] text-black">Our Signature <span className="text-[#1851C1]">Layouts</span></p>
            <p className="text-[16px] text-center text-black font-normal mt-2">Choose from a variety of Imena-approved templates, each designed to capture the essence of our family heritage.</p>
            <Image src={template1} alt="template1" className="mt-6 shadow-md w-119 h-149.25"/>
          </div>
          <div className="w-183.5 flex flex-col items-center mt-3 px-26.75">
            <p className="font-instrument-serif italic mt-5 text-[32px] text-black">Why choose <span className="text-[#1851C1]">Imena Pop</span>?</p>
            <div className="grid grid-rows-2 gap-x-5 mt-3 ">
              <div className="grid grid-cols-2 gap-3 border-b border-[#DBD3D3]">
                <div className="flex flex-col items-start gap-2 ">
                 <p className="text-black text-xl font-medium">Consistent Branding</p>
                 <p className="text-[16px] text-[#433D3D]">Every invitation strictly adheres to the Imena color palette and typography guidelines.</p>
                </div>
                <div className="flex flex-col items-start gap-2 ">
                  <p className="text-black text-xl font-medium">Fast Generation</p>
                  <p className="text-[16px] text-[#433D3D]">No more waiting on designers. Generate premium invites in seconds, not days, ready for immediate use.</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col items-start gap-2 ">
                 <p className="text-black text-xl font-medium">Professional look</p>
                 <p className="text-[16px] text-[#433D3D]">Our layouts are crafted by senior designers to ensure your event feels premium from the first view.</p>
                </div>
                <div className="flex flex-col items-start gap-2">
                  <p className="text-black text-xl font-medium">Share anywhere</p>
                  <p className="text-[16px] text-[#433D3D]">Optimized files for WhatsApp, Email, or Print. Share your legacy with outsiders and family alike.</p>
                </div>
              </div>              
              
            </div>
          </div>
        </div>
      </div>
     
    </div>
  );
}
