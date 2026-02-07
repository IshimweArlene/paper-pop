'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import InvitationPreview from '../components/InvitationPreview';
import { InvitationData } from '../components/InvitationPreview';
import Link from 'next/link';

const ShareContent = () => {
    const searchParams = useSearchParams();
    const [data, setData] = useState<InvitationData | null>(null);

    useEffect(() => {
        const encodedData = searchParams.get('data');
        if (encodedData) {
            try {
                const decoded = JSON.parse(decodeURIComponent(escape(atob(encodedData))));
                setData(decoded);
            } catch (e) {
                console.error('Failed to decode share data', e);
            }
        }
    }, [searchParams]);

    if (!data) {
        return (
            <div className="min-h-screen bg-[#D7E0F0] flex items-center justify-center p-6">
                <div className="bg-white/50 backdrop-blur-xl p-8 rounded-2xl border border-white shadow-xl text-center">
                    <p className="text-black font-bold mb-4">Invalid or missing invitation data.</p>
                    <Link href="/" className="bg-[#1851C1] text-white px-6 py-2 rounded-xl text-sm font-bold">
                        Go Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#D7E0F0] flex flex-col items-center p-4 md:p-10">
            <Link href="/" className="mb-8 flex items-center gap-4 bg-white/50 backdrop-blur-md px-6 py-3 rounded-full hover:bg-white transition-all shadow-sm hover:shadow-md cursor-pointer group">
                <div className="bg-[#C99326] w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold group-hover:bg-[#1851C1] transition-colors">I</div>
                <div className="flex flex-col">
                   <p className="text-[#C99326] text-[10px] font-bold tracking-widest uppercase group-hover:text-[#1851C1] transition-colors">Imena-pop</p>
                   <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">Back to Home</p>
                </div>
            </Link>

            <div className="w-full max-w-[500px] aspect-[1/1.414] shadow-2xl bg-[#050A30] animate-in fade-in zoom-in duration-700">
                <InvitationPreview data={data} />
            </div>

            <p className="mt-8 text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em]">Created with Imena-pop</p>
        </div>
    );
};

const SharePage = () => {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#D7E0F0] flex items-center justify-center text-black">Loading...</div>}>
            <ShareContent />
        </Suspense>
    );
};

export default SharePage;
