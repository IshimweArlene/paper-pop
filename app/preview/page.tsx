'use client';

import Image from "next/image";
import logo from "@/public/logo.svg"
import downloadIcon from '@/public/download.svg'
import { useEffect, useState, useRef } from "react";
import InvitationPreview, { InvitationData } from "../components/InvitationPreview";
import Link from 'next/link';
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';

const Preview = () => {
    const [data, setData] = useState<InvitationData | null>(null);
    const [copied, setCopied] = useState(false);
    const previewRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // First check URL for data (for shared links)
        const params = new URLSearchParams(window.location.search);
        const urlData = params.get('data');
        
        if (urlData) {
            try {
                const decoded = JSON.parse(decodeURIComponent(escape(atob(urlData))));
                setData(decoded);
                return;
            } catch (e) {
                console.error('Failed to decode URL data', e);
            }
        }

        // Fallback to localStorage (for the creator)
        const stored = localStorage.getItem('invitationData');
        if (stored) {
            setData(JSON.parse(stored));
        }
    }, []);

    const generateShareLink = () => {
        if (!data) return '';
        try {
            const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(data))));
            const baseUrl = window.location.origin + '/share';
            return `${baseUrl}?data=${encoded}`;
        } catch (e) {
            return '';
        }
    };

    const shareLink = generateShareLink();

    const handleCopyLink = () => {
        if (!shareLink) return;
        navigator.clipboard.writeText(shareLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownloadPDF = async () => {
        if (!previewRef.current) return;

        try {
            await document.fonts.ready;
            
            const dataUrl = await toPng(previewRef.current, { 
                quality: 1.0,
                pixelRatio: 2,
                cacheBust: true,
            });
            
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'px',
                format: [500, 707] 
            });
            
            const width = pdf.internal.pageSize.getWidth();
            const height = pdf.internal.pageSize.getHeight();
            
            pdf.addImage(dataUrl, 'PNG', 0, 0, width, height);
            pdf.save(`imena-invitation-${data?.eventTitle || 'event'}.pdf`);
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Failed to generate PDF. Please try again.');
        }
    };

    return (
        <div className="bg-[#D7E0F0] min-h-screen w-full">
            <nav className="w-full h-24 flex items-center gap-4 border-b border-[#DBD3D3] pl-22">
                <Image src={logo} alt="Logo" width={40} height={32} />
                <p className="text-[#C99326] text-[10px]">Imena-pop</p>
            </nav>
            <div className="pl-51 pr-51 pt-24 pb-24 flex gap-12 items-center justify-center flex-wrap">
                <div className="flex flex-col">
                    <Link href="/create" className="flex items-center gap-4 mb-4 cursor-pointer">
                     <p className="text-black font-bold w-1.5">&lt;</p>
                     <p className="text-[10px] text-black">Back to edit</p>
                    </Link>
                    <div ref={previewRef} className="w-125 aspect-[1/1.414] shadow-2xl">
                        {data ? (
                            <InvitationPreview data={data} />
                        ) : (
                            <div className="w-full h-full bg-white flex items-center justify-center text-black">
                                Loading preview...
                            </div>
                        )}
                    </div>
                </div>
                <div className="w-110">
                    <p className="text-black font-medium text-4xl">Your Imena <span className="font-instrument-serif italic text-[#1851C1]">Masterpiece </span> is Ready.</p>
                    <p className="text-[16px] mt-4 text-black" >The layout has been meticulously optimized for high-quality printing. Please review all details before downloading.</p>
                    
                    <div 
                        onClick={handleDownloadPDF}
                        className="flex bg-[#CBCFE6] w-108.5 h-19.5 mt-4 items-center rounded-[20px] pl-4.25 gap-3 cursor-pointer hover:bg-[#b8bccf] transition-colors"
                    >
                        <Image src={downloadIcon} alt="download" />
                        <p className="text-black text-[16px]">Download as PDF</p>
                    </div>

                    <div className="mt-4">
                        <div 
                            onClick={handleCopyLink}
                            className="flex bg-[#CBCFE6] w-108.5 h-19.5 items-center rounded-[20px] pl-4.25 gap-3 cursor-pointer hover:bg-[#b8bccf] transition-colors"
                        >
                            <div className="w-6 h-6 flex items-center justify-center bg-white rounded-full">
                                <span className="text-black text-xs font-bold">🔗</span>
                            </div>
                            <p className="text-black text-[16px]">
                                {copied ? 'Link Copied!' : 'Copy Link to Share'}
                            </p>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    );
}
 
export default Preview;