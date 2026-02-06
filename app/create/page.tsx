'use client';

import Image from "next/image";
import logo from '@/public/logo.svg'
import { useState, useEffect } from 'react';
import InvitationPreview from "@/app/components/InvitationPreview";
import { useRouter } from 'next/navigation';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressIndicator = ({ currentStep, totalSteps }: ProgressIndicatorProps) => {
  return (
    <div className="flex items-center gap-2 mb-20 mt-6">
      {Array.from({ length: totalSteps }, (_, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < currentStep;
        const isCurrent = stepNumber === currentStep;
        const isUpcoming = stepNumber > currentStep;

        return (
          <div key={stepNumber} className="flex items-center">
            <div
              className={`w-12.5 h-12.5 rounded-full flex items-center justify-center text-xl font-bold transition-colors ${
                isCompleted
                  ? 'bg-[#1851C1] text-white'
                  : isCurrent
                  ? 'bg-[#668edf] text-white'
                  : 'bg-gray-300 text-gray-600'
              }`}
            >
              {isCompleted ? '✓' : stepNumber}
            </div>
            {stepNumber < totalSteps && (
              <div
                className={`w-12 h-0.5 transition-colors ${
                  isCompleted ? 'bg-[#1851C1]' : 'bg-gray-300'
                }`}
              ></div>
            )}
          </div>
        );
      })}
    </div>
  );
};

const Create = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [currentAgenda, setCurrentAgenda] = useState('');
  const router = useRouter();
  const [formData, setFormData] = useState({
    eventTitle: '',
    hostedBy: '',
    eventDate: '',
    eventTime: '',
    location: '',
    agendas: [] as string[],
    notes: ''
  });

  useEffect(() => {
    const stored = localStorage.getItem('invitationData');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setFormData(parsed);
      } catch (e) {
        console.error('Failed to load stored data', e);
      }
    }
  }, []);

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addAgenda = (agendaText: string) => {
    if (agendaText.trim() !== '') {
      setFormData(prev => ({
        ...prev,
        agendas: [...prev.agendas, agendaText.trim()]
      }));
    }
  };

  const removeAgenda = (index: number) => {
    setFormData(prev => ({
      ...prev,
      agendas: prev.agendas.filter((_, i) => i !== index)
    }));
  };

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return formData.eventTitle.trim() !== '' && formData.hostedBy.trim() !== '';
      case 2:
        return formData.location.trim() !== '';
      case 3:
        return true; // No validation needed for step 3 now
      default:
        return true;
    }
  };

  const nextStep = () => {
    console.log('Next step clicked, current step:', currentStep);
    if (currentStep === 3 && validateCurrentStep()) {
      // Save form data to localStorage before navigating to preview
      localStorage.setItem('invitationData', JSON.stringify(formData));
      // Navigate to preview page instead of going to step 4
      router.push('/preview');
    } else if (currentStep < 3 && validateCurrentStep()) {
      const newStep = currentStep + 1;
      console.log('Setting step to:', newStep);
      setCurrentStep(newStep);
    } else {
      console.log('Validation failed for step', currentStep);
    }
  };

  const prevStep = () => {
    console.log('Previous step clicked, current step:', currentStep);
    if (currentStep > 1) {
      const newStep = currentStep - 1;
      console.log('Setting step to:', newStep);
      setCurrentStep(newStep);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <p className="font-instrument-serif text-[32px] text-black italic ">Basic Info</p>
            <p className="font-bold text-[16px] text-black mb-15">What's the occasion? Let's give it a grand name.</p>
            <p className="text-[16px] text-black">Event Title</p>
            <input 
              value={formData.eventTitle}
              onChange={(e) => updateFormData('eventTitle', e.target.value)}
              className="w-[414px] h-10.25 border border-[rgba(215,224,240,1)] mb-4 focus:outline-none text-black" 
            />
            <p className="text-[16px] text-black">Hosted By</p>
            <input 
              value={formData.hostedBy}
              onChange={(e) => updateFormData('hostedBy', e.target.value)}
              className="w-[414px] h-10.25 border border-[rgba(215,224,240,1)] mb-12 focus:outline-none text-black" 
            />
          </>
        );
      case 2:
        return (
          <>
            <p className="font-instrument-serif text-[32px] text-black italic">Time & Place</p>
            <p className="font-bold text-[16px] text-black mb-12">Tell your relatives where and when to gather.</p>
            <div className="flex w-[414px] gap-4">
              <div>
                <p className="text-[16px] text-black">Event Date</p>
                  <input 
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={formData.eventDate}
                    onChange={(e) => updateFormData('eventDate', e.target.value)}
                    className="w-full flex-1 h-10.25 border border-[rgba(215,224,240,1)] mb-4 focus:outline-none text-black px-2" 
                  />
              </div>
              <div>
                <p className="text-[16px] text-black">Event Time</p>
                <input 
                  type="time"
                  value={formData.eventTime}
                  onChange={(e) => updateFormData('eventTime', e.target.value)}
                  className="w-full flex-1 h-10.25 border border-[rgba(215,224,240,1)] mb-4 focus:outline-none text-black px-2" 
                />
              </div>
            </div>
                       
            <p className="text-[16px] text-black">Location</p>
            <input 
              value={formData.location}
              onChange={(e) => updateFormData('location', e.target.value)}
              className="w-[414px] h-10.25 border border-[rgba(215,224,240,1)] mb-12 focus:outline-none text-black" 
            />
          </>
        );
      case 3:
        return (
          <>
            <p className="font-instrument-serif text-[32px] text-black italic">Event Description</p>
            <p className="font-bold text-[16px] text-black mb-12">Add a description and a quick agenda for the day.</p>
            
            <p className="text-[16px] text-black">Description</p>
            <textarea 
              value={formData.notes}
              onChange={(e) => updateFormData('notes', e.target.value)}
              className="w-[414px] h-27.75 border border-[rgba(215,224,240,1)] mb-4 resize-none focus:outline-none text-black"
            ></textarea>
            
            <p className="text-[16px] text-black mb-4">Event Agenda</p>
            <div className="flex gap-2 mb-4">
              <input 
                type="text"
                value={currentAgenda}
                onChange={(e) => setCurrentAgenda(e.target.value)}
                placeholder="Add agenda item..."
                className="flex-1 h-10.25 border border-[rgba(215,224,240,1)] focus:outline-none text-black px-3" 
              />
              <button 
                type="button"
                onClick={() => {
                  addAgenda(currentAgenda);
                  setCurrentAgenda('');
                }}
                className="bg-[#1851C1] text-white px-4 py-2 rounded-[10px] text-sm font-medium cursor-pointer"
              >
                Add
              </button>
            </div>
            
            {formData.agendas.length > 0 && (
              <div className="mb-12">
                <ul className="space-y-1">
                  {formData.agendas.map((agenda, index) => (
                    <li key={index} className="flex items-start gap-2 text-black">
                      <span className="text-gray-500 mt-1">•</span>
                      <span className="flex-1">{agenda}</span>
                      <button 
                        type="button"
                        onClick={() => removeAgenda(index)}
                        className="text-red-500 hover:text-red-700 text-sm ml-2 cursor-pointer"
                      >
                        ✕
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        );
      default:
        return null;
    }
  };
  return (
    <div className="w-full min-h-screen overflow-hidden">
      <nav className="w-full h-24 flex items-center pl-22">
        <Image src={logo} alt="Logo" width={40} height={32} />
        <p className="text-[#C99326] text-[10px]">Imena-pop</p>
      </nav>
      <div className="flex w-full">
        <form className="w-176.75 pl-27 pb-10" onSubmit={handleFormSubmit}>
          <ProgressIndicator currentStep={currentStep} totalSteps={3} />
          
          {renderStepContent()}
          <div className="flex gap-4 mt-4">
            <button 
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="bg-[#D7E0F0] text-[16px] rounded-[10px] text-black w-46.5 h-11.25 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              Previous
            </button>
            <button 
              type="button"
              onClick={nextStep}
              disabled={!validateCurrentStep()}
              className="bg-[#1851C1] rounded-[10px] text-[16px] text-white w-46.5 h-11.25 disabled:cursor-not-allowed cursor-pointer"
            >
              {currentStep === 3 ? 'Create Invitation' : 'Next step'}
            </button>
          </div>
        </form>
        <div className="flex-1 min-h-screen bg-[#D7E0F0] flex items-center justify-center sticky top-0">
         <div className="w-125 aspect-[1/1.414] shadow-2xl">
            <InvitationPreview data={formData} />
         </div>
        </div>
        
      </div>
      
    </div>
  );
}
 
export default Create;