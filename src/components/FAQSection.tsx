import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  id: number;
  question: string;
  answer: string[];
}

const FAQSection = () => {
  const [openItem, setOpenItem] = useState<number | null>(null);

  const faqItems: FAQItem[] = [
    {
      id: 1,
      question: "Does it have a guarantee?",
      answer: [
        "Yes! We offer a 180-day satisfaction guarantee. If for any reason you're not satisfied, you can request a full refund. That's how confident we are in the results Max Testorin delivers."
      ]
    },
    {
      id: 2,
      question: "When will I receive my order?",
      answer: [
        "Much sooner than you think.",
        "As soon as your payment is confirmed, your order is shipped quickly using express logistics. Most of our customers receive their package within 2 to 5 business days, depending on the region. In many cases, it arrives even before the expected date. Our goal is for you to start your treatment as soon as possible — no waiting."
      ]
    },
    {
      id: 3,
      question: "I've been using it for 7 days and my erections are already stronger. Will it keep improving?",
      answer: [
        "Yes! What you're feeling is just the beginning. Max Testorin's formula works in phases — first improving blood flow, then hormonal production, and finally stabilizing long-term results. Stick with it, and you'll notice even more improvement in the coming weeks."
      ]
    },
    {
      id: 4,
      question: "I saw the product is natural. Can I use it without worrying about side effects?",
      answer: [
        "Absolutely. Max Testorin is 100% natural, with no hormones or artificial stimulants. It's made with safe, tested, and approved ingredients. The formula works in harmony with your body — and best of all, there's no addiction or dependency."
      ]
    },
    {
      id: 5,
      question: "Can I take it with other supplements?",
      answer: [
        "Yes, no problem.",
        "Max Testorin is a 100% natural supplement and can be combined with multivitamins, omega-3, creatine, collagen, and other products.",
        "If in doubt, we simply recommend avoiding use alongside other synthetic or hormonal stimulants, since Max Testorin already naturally activates your body's own mechanisms. It was designed to be safe, compatible, and effective with your daily routine."
      ]
    },
    {
      id: 6,
      question: "How many bottles should I order to get started?",
      answer: [
        "If you want to experience the full results and get the best value, the ideal option is the 6-bottle kit. It's the most chosen by those who want to complete the treatment without interruptions — and it comes with the biggest discount per bottle."
      ]
    }
  ];

  const toggleItem = (itemId: number) => {
    setOpenItem(prev => prev === itemId ? null : itemId);
  };

  const isOpen = (itemId: number) => openItem === itemId;

  return (
    <div className="mt-12 w-full max-w-md mx-auto">
      <div className="bg-gradient-to-r from-gray-50 via-white to-gray-50 border-2 border-gray-200 rounded-2xl p-6 shadow-lg relative overflow-hidden">
        
        {/* FAQ Header */}
        <div className="relative z-10 text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-red-800 via-red-600 to-red-400 bg-clip-text text-transparent leading-tight">
            Frequently Asked Questions
          </h2>
        </div>
        
        {/* FAQ Items */}
        <div className="relative z-10 space-y-4">
          {faqItems.map((item) => (
            <div key={item.id} className="border border-gray-200 rounded-xl overflow-hidden">
              
              {/* Question Header - Clickable */}
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full text-left p-4 bg-white hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between group"
              >
                <h3 className="text-base font-bold text-gray-800 pr-4 leading-relaxed group-hover:text-red-600 transition-colors duration-200">
                  {item.question}
                </h3>
                
                <div className="flex-shrink-0 bg-red-100 group-hover:bg-red-200 rounded-full p-1 transition-colors duration-200">
                  {isOpen(item.id) ? (
                    <ChevronUp className="w-4 h-4 text-red-600" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-red-600" />
                  )}
                </div>
              </button>
              
              {/* Answer Content - Expandable */}
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen(item.id) ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="p-4 pt-0 bg-gray-50 border-t border-gray-200">
                  <div className="space-y-4">
                    {item.answer.map((paragraph, index) => (
                      <p key={index} className="text-gray-600 leading-relaxed text-base text-left mt-3 first:mt-0">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQSection;