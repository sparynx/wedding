'use client';

import { useState, useEffect } from 'react';

export default function WeddingWebsite() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState('');
  const [isInvitationVisible, setIsInvitationVisible] = useState(false);

  const slides = [
    "/weddding1.jpeg",
    "/weddding2.jpeg"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInvitationVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    const invitationCard = document.getElementById('invitation-card');
    if (invitationCard) {
      observer.observe(invitationCard);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isModalOpen]);

  const copyText = (text: string, label: string) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        showCopiedMessage(`${label} copied!`);
      }).catch(() => {
        fallbackCopy(text, label);
      });
    } else {
      fallbackCopy(text, label);
    }
  };

  const fallbackCopy = (text: string, label: string) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      showCopiedMessage(`${label} copied!`);
    } catch (err) {
      console.error('Fallback copy failed:', err);
    }
    document.body.removeChild(textArea);
  };

  const showCopiedMessage = (message: string) => {
    setCopiedMessage(message);
    setTimeout(() => {
      setCopiedMessage('');
    }, 2000);
  };

  return (
    <div className="font-lato overflow-x-hidden bg-white text-gray-800">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Cormorant+Garamond:wght@300;400;600&family=Lato:wght@300;400;600&display=swap');

        .font-lato {
          font-family: 'Lato', sans-serif;
        }

        .font-great-vibes {
          font-family: 'Great Vibes', cursive;
        }

        .font-cormorant {
          font-family: 'Cormorant Garamond', serif;
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes heartbeat {
          0%, 100% {
            transform: scale(1);
          }
          10%, 30% {
            transform: scale(1.1);
          }
          20%, 40% {
            transform: scale(1);
          }
        }

        .animate-fadeInDown {
          animation: fadeInDown 1.5s ease-out;
        }

        .animate-fadeInUp {
          animation: fadeInUp 1.5s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.4s ease;
        }

        .animate-slideInRight {
          animation: slideInRight 0.4s ease;
        }

        .animate-heartbeat {
          animation: heartbeat 1.5s ease-in-out infinite;
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {/* Image Slider */}
        <div className="absolute inset-0">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-2000 ${
                currentSlide === index ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                backgroundImage: `url(${slide})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center top'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/40" />
            </div>
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-5 text-center text-white">
          <h1 className="font-great-vibes mb-4 text-7xl font-normal text-yellow-400 shadow-lg animate-fadeInDown md:text-8xl">
            Queen & Bright
          </h1>
          <p className="font-cormorant mb-0 text-xl font-light uppercase tracking-[6px] shadow-md animate-fadeInUp md:text-2xl" style={{animationDelay: '0.3s', animationFillMode: 'both'}}>
            We're Getting Married
          </p>
          <p className="mt-8 text-lg font-light tracking-[2px] shadow-md animate-fadeInUp md:text-xl" style={{animationDelay: '0.6s', animationFillMode: 'both'}}>
            December 20th, 2025
          </p>
        </div>

        {/* Slider Dots */}
        <div className="absolute bottom-12 left-1/2 z-20 flex -translate-x-1/2 gap-4 md:bottom-12">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2.5 w-2.5 rounded-full border border-white/60 transition-all duration-400 ${
                currentSlide === index
                  ? 'bg-yellow-400 scale-120'
                  : 'bg-white/40'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Invitation Section */}
      <section className="flex items-center justify-center bg-white px-5 py-24 md:py-32">
        <div
          id="invitation-card"
          className={`max-w-3xl bg-white px-12 py-20 transition-all duration-1000 md:px-16 ${
            isInvitationVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-12'
          }`}
        >
          <h2 className="font-great-vibes mb-12 text-center text-6xl font-normal text-blue-700 md:text-7xl">
            You're Invited
          </h2>
          
          <div className="mx-auto mb-10 h-px w-20 bg-gradient-to-r from-transparent via-blue-700 to-transparent" />
          
          <div className="font-cormorant text-center text-lg leading-loose text-gray-600">
            <p>Together with our families, we joyfully invite you to celebrate<br className="hidden md:block" />the beginning of our forever</p>
            
            <div className="my-10 py-10">
              <strong className="font-cormorant mb-4 block text-2xl font-semibold text-blue-700 md:text-3xl">
                Saturday, December 20th, 2025
              </strong>
              <p className="my-2 text-lg text-gray-600">Ceremony at 10:30 AM</p>
              <p className="my-2 text-lg text-gray-600">Reception to follows immediately</p>
            </div>

            <div className="mx-auto my-10 h-px w-20 bg-gradient-to-r from-transparent via-blue-700 to-transparent" />
            
            <div className="mt-10 text-gray-800">
              <p><strong className="text-xl text-blue-700 md:text-2xl">RCCG Jesus Sanctuary</strong></p>
              <p>FCT 13, Jesus Sanctuary Provincial Headquarters Kuje Abuja</p>
            </div>
            
            <div className="mt-12 border-t border-gray-200 pt-10 text-base italic leading-loose text-gray-500 md:text-lg">
              "Two souls with but a single thought, two hearts that beat as one."
              <br /><br />
              Join us for a day of love, joy, and celebration as we exchange vows<br className="hidden md:block" />
              and begin our journey together. Your presence would mean the world to us.
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-gray-50 px-5 py-24 text-center md:py-28">
        <h2 className="font-great-vibes mb-5 text-6xl font-normal text-blue-700 md:text-7xl">
          Get In Touch
        </h2>
        <p className="mx-auto mb-14 max-w-2xl text-base leading-relaxed text-gray-600 md:text-lg">
          Have questions or need more information? Feel free to reach out to us directly on WhatsApp. We'd love to hear from you!
        </p>
        
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-10 md:grid-cols-2">
          <div className="bg-white p-12 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl md:p-14">
            <h3 className="font-cormorant mb-2 text-3xl font-semibold text-blue-700 md:text-4xl">Bride</h3>
            <p className="mb-8 text-base text-gray-500">Queen Ojochogwu</p>
            <a
              href="https://wa.me/2347053505198"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 px-8 py-3.5 text-base font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-green-600 hover:shadow-lg"
            >
              <span>💬</span>
              Message on WhatsApp
            </a>
          </div>
          
          <div className="bg-white p-12 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl md:p-14">
            <h3 className="font-cormorant mb-2 text-3xl font-semibold text-blue-700 md:text-4xl">Groom</h3>
            <p className="mb-8 text-base text-gray-500">Bright Oluwabusayo</p>
            <a
              href="https://wa.me/2348103308758"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 px-8 py-3.5 text-base font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-green-600 hover:shadow-lg"
            >
              <span>💬</span>
              Message on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Gift Section */}
      <section className="bg-white px-5 py-24 text-center md:py-28">
        <h2 className="font-great-vibes mb-8 text-6xl font-normal text-blue-700 md:text-7xl">
          Wedding Gift
        </h2>
        <p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-gray-600 md:text-lg">
          Your presence at our wedding is the greatest gift of all. However, if you wish to bless us with a monetary gift, we've provided our account details below.
        </p>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-700 px-12 py-4 text-base font-medium tracking-wide text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-900 hover:shadow-xl"
        >
          View Account Details
        </button>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-5 backdrop-blur-sm"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative w-full max-w-xl animate-slideUp bg-white p-12 shadow-2xl md:p-14"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-6 top-5 flex h-9 w-9 items-center justify-center text-3xl text-gray-400 transition-colors hover:text-gray-800"
              aria-label="Close modal"
            >
              &times;
            </button>
            
            <h3 className="font-great-vibes mb-12 text-center text-5xl font-normal text-blue-700 md:text-6xl">
              Gift Account Details
            </h3>
            
            <div className="mb-6 bg-gray-50 p-7 md:p-8">
              <h4 className="font-cormorant mb-5 text-xl font-semibold text-blue-700">Bank Account</h4>
              <div className="mb-4 flex flex-col items-start justify-between gap-3 md:flex-row md:items-center">
                <span className="flex-1 text-base font-medium text-gray-700">Gtbank</span>
                <button
                  onClick={() => copyText('Gtbank', 'Bank Name')}
                  className="w-full whitespace-nowrap bg-blue-700 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-blue-900 md:w-auto"
                >
                  📋 Copy
                </button>
              </div>
              <div className="flex flex-col items-start justify-between gap-3 md:flex-row md:items-center">
                <span className="flex-1 text-base font-medium text-gray-700">0649568900</span>
                <button
                  onClick={() => copyText('0649568900', 'Account Number')}
                  className="w-full whitespace-nowrap bg-blue-700 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-blue-900 md:w-auto"
                >
                  📋 Copy
                </button>
              </div>
            </div>

            <div className="bg-gray-50 p-7 md:p-8">
              <h4 className="font-cormorant mb-5 text-xl font-semibold text-blue-700">Mobile Money</h4>
              <div className="mb-4 flex flex-col items-start justify-between gap-3 md:flex-row md:items-center">
                <span className="flex-1 text-base font-medium text-gray-700">Queen Ojochogwu</span>
                <button
                  onClick={() => copyText('Queen Ojochogwu', 'Account Name')}
                  className="w-full whitespace-nowrap bg-blue-700 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-blue-900 md:w-auto"
                >
                  📋 Copy
                </button>
              </div>
              <div className="flex flex-col items-start justify-between gap-3 md:flex-row md:items-center">
                <span className="flex-1 break-all text-base font-medium text-gray-700">2347053505198</span>
                <button
                  onClick={() => copyText('+234 801 234 5678', 'Mobile Number')}
                  className="w-full whitespace-nowrap bg-blue-700 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-blue-900 md:w-auto"
                >
                  📋 Copy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Copied Message */}
      {copiedMessage && (
        <div className="animate-slideInRight fixed right-5 top-5 z-[100] bg-green-500 px-7 py-4 text-base font-medium text-white shadow-lg md:right-8 md:top-8">
          {copiedMessage}
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50 px-5 py-6 text-center">
        <p className="m-0 text-sm text-gray-500">
          Built with <span className="inline-block animate-heartbeat text-red-500">❤️</span> by{' '}
          <a
            href="https://sparynxlabs.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-blue-700 transition-colors hover:text-blue-900"
          >
            SparynX Labs
          </a>
        </p>
      </footer>
    </div>
  );
}