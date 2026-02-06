'use client';

import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.svg";
import template1 from "@/public/template1.png";

const templates = [
  {
    id: 'classic-dark',
    name: 'Classic Imena Dark',
    description: 'The signature deep blue and gold aesthetic for formal family gatherings.',
    image: template1,
    category: 'Formal'
  },
  {
    id: 'modern-white',
    name: 'Modern Grace',
    description: 'A clean, minimalist white layout with elegant typography.',
    image: template1, // Placeholder since we only have one for now
    category: 'Minimalist'
  },
  {
    id: 'vibrant-gold',
    name: 'Celebration Gold',
    description: 'Premium gold accents on a cream background for joyous celebrations.',
    image: template1, // Placeholder
    category: 'Festive'
  }
];

export default function TemplatesPage() {
  return (
    <div className="bg-[#D7E0F0] min-h-screen w-full">
      <nav className="w-full h-24 flex items-center justify-between border-b border-[#DBD3D3] px-22 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-4">
          <Image src={logo} alt="Logo" width={40} height={32} />
          <p className="text-[#C99326] text-[10px] font-bold tracking-widest uppercase">Imena-pop</p>
        </Link>
        <Link href="/create">
          <button className="bg-[#1851C1] text-white px-8 py-3 rounded-full font-bold hover:bg-[#1444a1] transition-all shadow-lg hover:shadow-xl active:scale-95">
            Create New
          </button>
        </Link>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-instrument-serif italic text-[#050A30] mb-4">Our Signature <span className="text-[#1851C1]">Layouts</span></h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Choose a foundation that perfectly captures the essence of your legacy. 
            All templates are meticulously crafted to ensure a premium feel.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {templates.map((template) => (
            <div key={template.id} className="group bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col border border-white hover:border-[#1851C1]/20">
              <div className="relative aspect-[1/1.4] overflow-hidden bg-gray-100">
                <Image 
                  src={template.image} 
                  alt={template.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-6 left-6">
                  <span className="bg-white/90 backdrop-blur-md text-[#1851C1] px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-sm">
                    {template.category}
                  </span>
                </div>
              </div>
              
              <div className="p-8 flex flex-col flex-1">
                <h3 className="text-2xl font-bold text-[#050A30] mb-2">{template.name}</h3>
                <p className="text-gray-500 mb-8 text-sm leading-relaxed">
                  {template.description}
                </p>
                
                <Link href="/create" className="mt-auto">
                  <button className="w-full py-4 rounded-2xl border-2 border-[#1851C1] text-[#1851C1] font-bold group-hover:bg-[#1851C1] group-hover:text-white transition-all duration-300">
                    Use this template
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <footer className="w-full py-12 flex flex-col items-center border-t border-[#DBD3D3] mt-20 bg-white/50">
        <p className="font-instrument-serif italic text-lg text-black mb-6">Ready to bring your vision to life?</p>
        <Link href="/create">
          <button className="rounded-full bg-[#1851C1] px-12 py-4 text-white font-bold shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all active:scale-95">
            Get Started Now
          </button>
        </Link>
        <p className="text-[10px] text-gray-400 mt-12 tracking-widest uppercase">Created by Imena Dev Team</p>
      </footer>
    </div>
  );
}
