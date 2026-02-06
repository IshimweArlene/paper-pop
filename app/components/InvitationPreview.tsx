import React from 'react';

export interface InvitationData {
  eventTitle: string;
  hostedBy: string;
  eventDate: string;
  eventTime: string;
  location: string;
  agendas: string[];
  notes?: string;
}

const InvitationPreview = ({ data }: { data: InvitationData }) => {
  // Helper to format date
  const formatDate = (dateString: string) => {
    if (!dateString) return { month: 'JAN', day: '01', year: '2026', dayName: 'Sunday' };
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return { month: 'JAN', day: '01', year: '2026', dayName: 'Sunday' };

    return {
      month: date.toLocaleString('default', { month: 'short' }),
      day: date.getDate(),
      year: date.getFullYear(),
      dayName: date.toLocaleString('default', { weekday: 'long' })
    };
  };

  const { month, day, year, dayName } = formatDate(data.eventDate);

  // Helper to format time
  const formatTimeDisplay = (time: string) => {
    if (!time) return "7:00 PM";
    // Check if valid HH:MM format
    if (/^([01]\d|2[0-3]):?([0-5]\d)$/.test(time)) {
        const [h, m] = time.split(':');
        const hour = parseInt(h, 10);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const hour12 = hour % 12 || 12;
        return `${hour12}:${m} ${ampm}`;
    }
    return time;
  };

  // Adjusted sizes for Alex Brush script font which needs to be larger to be legible
  const notesLength = data.notes?.length || 0;
  const notesSize = notesLength > 200 ? 'text-[20px]' : notesLength > 100 ? 'text-[24px]' : 'text-[36px]';
  
  const agendasCount = data.agendas.length;
  const agendasSize = agendasCount > 6 ? 'text-[14px]' : agendasCount > 4 ? 'text-[16px]' : 'text-[20px]';

  const calculateHeaderSize = (text: string) => {
    const len = text?.length || 0;
    if (len > 30) return 'text-[35px]';
    if (len > 15) return 'text-[50px]';
    return 'text-[65px]';
  };

  const titleSize = calculateHeaderSize(data.eventTitle || "Imena");
  const hostSize = calculateHeaderSize(data.hostedBy || "Family");

  return (
    <div className="w-full h-full bg-[#050A30] relative flex flex-col items-center justify-center text-white overflow-hidden p-6 shadow-2xl">
        {/* Border with Top-Right Gap */}
        <div className="absolute top-12 bottom-12 left-12 border-l-[2.5px] border-[#D0DB2D] pointer-events-none"></div> {/* Left Line */}
        <div className="absolute bottom-12 left-12 right-12 border-b-[2.5px] border-[#D0DB2D] pointer-events-none"></div> {/* Bottom Line */}
        <div className="absolute top-12 left-12 right-24 border-t-[2.5px] border-[#D0DB2D] pointer-events-none"></div> {/* Top Line - stops short of right */}
        <div className="absolute top-24 bottom-12 right-12 border-r-[2.5px] border-[#D0DB2D] pointer-events-none"></div> {/* Right Line - starts lower */}

        {/* Content */}
        <div className="z-10 flex flex-col items-center mt-4 w-full h-full justify-between py-10">
            
            {/* Header */}
            <div className="w-full flex flex-col items-center px-4">
                <h1 className={`self-start pl-8 font-instrument-serif ${titleSize} text-[#D0DB2D] -mb-4 leading-none wrap-break-word w-full`}>
                    {data.eventTitle || "Imena"}
                </h1>
                <h2 className={`font-instrument-serif ${hostSize} text-[#D0DB2D] ml-28 leading-none wrap-break-word text-center max-w-full`}>
                   {data.hostedBy ? `${data.hostedBy}` : "Family"}
                </h2>
            </div>

            {/* DateTime Section */}
             <div className="flex items-center justify-center gap-6 w-full px-8 my-2">
                <div className="text-center border-t border-b border-[#D0DB2D] py-1">
                    <p className="text-[24px] leading-none px-2">{dayName}</p>
                </div>
                
                <div className="text-center flex flex-col px-2">
                    <p className="text-[20px] font-bold uppercase tracking-wider">{month}</p>
                    <p className="text-[52px] font-bold text-[#facc15] leading-none">{day}</p>
                    <p className="text-[24px] font-bold">{year}</p>
                </div>

                <div className="text-center border-t border-b border-[#D0DB2D] py-1">
                     <p className="text-[24px] leading-none px-2">{formatTimeDisplay(data.eventTime)}</p>
                </div>
             </div>

             {/* Agendas */}
             <div className="flex flex-col items-center flex-1 justify-center w-full px-8">
                 <h3 className="text-[#D0DB2D] text-[26px] uppercase mb-3">AGENDAS</h3>
                 <div className="flex justify-center w-full">
                     <ul className={`text-left ${agendasSize} text-gray-200 space-y-1 inline-block`}>
                         {data.agendas.length > 0 ? (
                            data.agendas.map((item, i) => (
                                <li key={i}>• {item}</li>
                            ))
                         ) : (
                             <>
                                <li>• Welcoming remarks</li>
                                <li>• Eating and Drinking</li>
                             </>
                         )}
                     </ul>
                 </div>
             </div>

             {/* Footer */}
             <div className="flex flex-col items-center w-3/4 mt-2">
                {data.notes && (
                    <p className={`mb-2 font-instrument-serif text-[#D0DB2D] leading-tight text-center wrap-break-word ${notesSize}`}>
                        {data.notes}
                    </p>
                )}
                <div className="text-center text-[16px] text-gray-400 font-instrument-serif">
                    <p>The honor will be ours to have you</p>
                    <p>Welcome!</p>
                </div>
             </div>

        </div>
    </div>
  )
}

export default InvitationPreview;
