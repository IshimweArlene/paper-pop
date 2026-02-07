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

  const formatTimeDisplay = (time: string) => {
    if (!time) return "7:00 PM";
    if (/^([01]\d|2[0-3]):?([0-5]\d)$/.test(time)) {
        const [h, m] = time.split(':');
        const hour = parseInt(h, 10);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const hour12 = hour % 12 || 12;
        return `${hour12}:${m} ${ampm}`;
    }
    return time;
  };

  const notesLength = data.notes?.length || 0;
  const notesSize = notesLength > 150 ? 'text-[12px]' : notesLength > 100 ? 'text-[16px]' : 'text-[32px]';
  
  const agendasCount = data.agendas.length;
  const agendasSize = agendasCount > 6 ? 'text-[8px]' : agendasCount > 4 ? 'text-[10px]' : 'text-[12px]';

  const calculateHeaderSize = (text: string) => {
    const len = text?.length || 0;
    if (len > 30) return 'text-[20px]';
    if (len > 15) return 'text-[30px]';
    return 'text-[45px]';
  };

  const titleSize = calculateHeaderSize(data.eventTitle || "Imena");
  const hostSize = calculateHeaderSize(data.hostedBy || "Wihogora");

  return (
    <div className="w-full h-full bg-[#050A30] relative flex flex-col items-center justify-center text-white overflow-hidden p-6 shadow-2xl">
        <div className="absolute top-12 bottom-12 left-12 border-l-[2.5px] border-[#D0DB2D] pointer-events-none"></div> 
        <div className="absolute bottom-12 left-12 right-12 border-b-[2.5px] border-[#D0DB2D] pointer-events-none"></div> 
        <div className="absolute top-12 left-12 right-24 border-t-[2.5px] border-[#D0DB2D] pointer-events-none"></div> 
        <div className="absolute top-24 bottom-12 right-12 border-r-[2.5px] border-[#D0DB2D] pointer-events-none"></div> 

        <div className="z-10 flex flex-col items-center w-full h-full justify-between pb-20 pt-16 px-16">
            
            <div className="w-full flex flex-col px-4">
                <h1 className={`font-instrument-serif ${titleSize} text-[#D0DB2D] leading-none wrap-break-word w-full text-left`}>
                    {data.eventTitle || "Imena"}
                </h1>
                <div className="flex justify-center -my-1">
                    <p className="font-alex-brush text-[28px] text-white mt-1">by</p>
                </div>
                <h2 className={`font-serif ${hostSize} text-[#D0DB2D] leading-none wrap-break-word text-right w-full`}>
                   {data.hostedBy ? `${data.hostedBy}` : "Light"}
                </h2>
            </div>

            <div className="flex flex-col items-center -my-2 gap-1 w-full text-center">
                <p className="font-alex-brush text-[28px] text-white">at</p>
                <p className="font-instrument-serif text-[20px] mb-3 text-[#D0DB2D] wrap-break-word">
                    {data.location || "Imena Venue"}
                </p>
            </div>

              <div className="flex items-center justify-center gap-6 w-full my-2">
                <div className="text-center border-t border-b border-[#D0DB2D] py-1">
                    <p className="text-[20px] leading-none px-2">{dayName}</p>
                </div>
                
                <div className="text-center flex flex-col px-2">
                    <p className="text-[16px] font-bold uppercase tracking-wider">{month}</p>
                    <p className="text-[48px] font-bold text-[#facc15] leading-none">{day}</p>
                    <p className="text-[20px] font-bold">{year}</p>
                </div>

                <div className="text-center border-t border-b border-[#D0DB2D] py-1">
                     <p className="text-[20px] leading-none px-2">{formatTimeDisplay(data.eventTime)}</p>
                </div>
             </div>

             <div className="flex flex-col items-center flex-1 justify-center w-full">
                 <h3 className="text-[#D0DB2D] text-[20px] uppercase mb-1 ">AGENDAS</h3>
                 <div className="flex justify-center w-full">
                     <ul className={`text-left ${agendasSize} text-gray-200 space-y-0.5 inline-block`}>
                         {data.agendas.length > 0 ? (
                            data.agendas.map((item, i) => (
                                <li key={i} className="wrap-break-word">• {item}</li>
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

             <div className="flex flex-col items-center w-full">
                {data.notes && (
                    <p className={` font-instrument-serif text-[#D0DB2D] leading-tight text-center wrap-break-word ${notesSize} w-full`}>
                        {data.notes}
                    </p>
                )}
                <div className="text-center text-[12px] text-gray-400 font-instrument-serif mt-2">
                    <p>The honor will be ours to have you</p>
                    <p>Welcome!</p>
                </div>
             </div>

        </div>
    </div>
  )
}

export default InvitationPreview;
