'use client';

import Image from "next/image";
import logo from "@/public/logo.svg"
import downloadIcon from '@/public/download.svg'
import { useEffect, useState, useRef } from "react";
import InvitationPreview, { InvitationData } from "../components/InvitationPreview";
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';

export const dynamic = 'force-dynamic';

const Preview = () => {
    const [data, setData] = useState<InvitationData | null>(null);
    const [shareLink, setShareLink] = useState('');
    const [copied, setCopied] = useState(false);
    const previewRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const urlData = params.get('data');
        
        if (urlData) {
            try {
                const decoded = JSON.parse(decodeURIComponent(escape(atob(urlData))));
                if (decoded && decoded.eventTitle) {
                    setData(decoded);
                    return;
                }
            } catch (e) {
                console.error('Failed to decode URL data', e);
            }
        }

        const stored = localStorage.getItem('invitationData');
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                if (parsed && parsed.eventTitle) {
                    setData(parsed);
                    return;
                }
            } catch (e) {
                console.error('Failed to parse stored data', e);
            }
        }
        
        router.replace('/create');
    }, [router]);

    useEffect(() => {
        if (data) {
            try {
                const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(data))));
                const baseUrl = window.location.origin + '/share';
                setShareLink(`${baseUrl}?data=${encoded}`);
            } catch (e) {
                console.error('Failed to generate share link', e);
            }
        }
    }, [data]);

    const handleCopyLink = () => {
        if (!shareLink) return;
        navigator.clipboard.writeText(shareLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleStartNew = () => {
        if (confirm('Are you sure you want to start a new invitation? This will clear your current progress.')) {
            localStorage.removeItem('invitationData');
            window.location.href = '/create';
        }
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

    const handleDownloadPNG = async () => {
        if (!previewRef.current) return;

        try {
            await document.fonts.ready;
            
            const dataUrl = await toPng(previewRef.current, { 
                quality: 1.0,
                pixelRatio: 4, // Higher pixel ratio for better PNG quality
                cacheBust: true,
            });
            
            const link = document.createElement('a');
            link.download = `imena-invitation-${data?.eventTitle || 'event'}.png`;
            link.href = dataUrl;
            link.click();
        } catch (error) {
            console.error('Error generating PNG:', error);
            alert('Failed to generate PNG. Please try again.');
        }
    };

    return (
        <div className="bg-[#D7E0F0] min-h-screen w-full">
            <nav className="w-full h-24 flex items-center gap-4 border-b border-[#DBD3D3] pl-22">
                <Link href="/" className="flex items-center gap-4 cursor-pointer group">
                    <Image src={logo} alt="Logo" width={40} height={32} className="group-hover:scale-110 transition-transform duration-300" />
                    <p className="text-[#C99326] text-[10px] font-bold tracking-widest uppercase group-hover:text-[#1851C1] transition-colors">Imena-pop</p>
                </Link>
            </nav>
            <div className="px-4 md:px-51 pt-12 md:pt-24 pb-12 md:pb-24 flex gap-8 md:gap-12 items-center justify-center flex-wrap">
                <div className="flex flex-col w-full max-w-[31.25rem]">
                    <Link href="/create" className="flex items-center gap-4 mb-4 cursor-pointer">
                     <p className="text-black font-bold w-1.5">&lt;</p>
                     <p className="text-[10px] text-black">Back to edit</p>
                    </Link>
                    <div ref={previewRef} className="w-full aspect-[1/1.414] shadow-2xl">
                        {data ? (
                            <InvitationPreview data={data} />
                        ) : (
                            <div className="w-full h-full bg-white flex items-center justify-center text-black">
                                Loading preview...
                            </div>
                        )}
                    </div>
                </div>
                <div className="w-full max-w-[27.5rem]">

                    <p className="text-black font-medium text-4xl">Your Imena <span className="font-instrument-serif italic text-[#1851C1]">Masterpiece </span> is Ready.</p>
                    <p className="text-[16px] mt-4 text-black" >The layout has been meticulously optimized for high-quality printing. Please review all details before downloading.</p>
                    
                    <div 
                        onClick={handleDownloadPDF}
                        className="flex bg-[#CBCFE6] w-108.5 h-19.5 mt-4 items-center rounded-[20px] pl-4.25 gap-3 cursor-pointer hover:bg-[#b8bccf] transition-colors"
                    >
                        <Image src={downloadIcon} alt="download" />
                        <p className="text-black text-[16px]">Download as PDF</p>
                    </div>

                    <div 
                        onClick={handleDownloadPNG}
                        className="flex bg-[#CBCFE6] w-108.5 h-19.5 mt-4 items-center rounded-[20px] pl-4.25 gap-3 cursor-pointer hover:bg-[#b8bccf] transition-colors"
                    >
                        <Image src={downloadIcon} alt="download" />
                        <p className="text-black text-[16px]">Download as PNG</p>
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