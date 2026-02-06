'use client';

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import InvitationPreview, { InvitationData } from "../components/InvitationPreview";

const ShareContent = () => {
    const searchParams = useSearchParams();
    const [data, setData] = useState<InvitationData | null>(null);

    useEffect(() => {
        const urlData = searchParams.get('data');
        if (urlData) {
            try {
                const decoded = JSON.parse(decodeURIComponent(escape(atob(urlData))));
                setData(decoded);
            } catch (e) {
                console.error('Failed to decode URL data', e);
            }
        }
    }, [searchParams]);

    if (!data) {
        return (
            <div className="min-h-screen bg-[#050A30] flex items-center justify-center text-white">
                Loading invitation...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#D7E0F0] flex items-center justify-center p-4">
            <div className="w-full max-w-[500px] aspect-[1/1.414] shadow-2xl">
                <InvitationPreview data={data} />
            </div>
        </div>
    );
};

export default function SharePage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ShareContent />
        </Suspense>
    );
}
