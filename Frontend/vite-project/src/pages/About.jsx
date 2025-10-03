import React from 'react';
import { Award, Heart, Zap, Users, Globe, Building2, TrendingUp, Handshake, ShieldCheck } from 'lucide-react';

// --- MOCK DATA ---
const teamMembers = [
  { name: 'Alex Johnson', role: 'CEO & Founder', avatar: 'https://placehold.co/100x100/A0522D/FFFFFF?text=AJ' },
  { name: 'Sarah Lee', role: 'Head of Product', avatar: 'https://placehold.co/100x100/5F9EA0/FFFFFF?text=SL' },
  { name: 'Mark Chen', role: 'Lead Developer', avatar: 'https://placehold.co/100x100/808000/FFFFFF?text=MC' },
  { name: 'Maria Lopez', role: 'Community Manager', avatar: 'https://placehold.co/100x100/B0C4DE/FFFFFF?text=ML' },
];

const values = [
  { 
    title: 'Trust & Safety', 
    description: 'We prioritize the security of every guest and host, offering verified profiles and 24/7 support.', 
    icon: ShieldCheck, 
    color: 'text-red-500' 
  },
  { 
    title: 'Global Community', 
    description: 'Fostering connections that transcend borders, making travel meaningful and enriching for everyone.', 
    icon: Globe, 
    color: 'text-yellow-500' 
  },
  { 
    title: 'Innovation', 
    description: 'Constantly evolving our platform to make booking and hosting the most seamless experience possible.', 
    icon: Zap, 
    color: 'text-blue-500' 
  },
];

/**
 * Modern, attractive, and responsive About Page component.
 */
function About() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      
      {/* --- 1. HERO HEADER --- */}
      <section className="
        bg-gradient-to-r from-red-600 to-red-800 
        pt-16 pb-20 sm:pt-20 sm:pb-24 
        shadow-xl
      ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="
            text-5xl sm:text-6xl font-extrabold text-white 
            tracking-tight leading-tight mb-3
          ">
            About <span className="text-yellow-300">Us</span>
          </h1>
          <p className="text-lg sm:text-xl text-red-200 max-w-3xl mx-auto">
            Our journey in helping people find the perfect stay and sharing unique spaces.
          </p>
        </div>
      </section>

      {/* --- 2. INTRO & PLATFORM DESCRIPTION --- */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:grid md:grid-cols-2 md:gap-12 items-center">
            
            {/* Left: Image/Illustration */}
            <div className="mb-8 md:mb-0 relative p-4 bg-red-50 rounded-2xl shadow-xl border border-red-200">
                <Building2 className="w-16 h-16 text-red-600 absolute top-4 left-4 opacity-10" />
                <Globe className="w-4/5 h-auto text-red-400 mx-auto md:w-full opacity-80 animate-pulse-slow" />
                <p className="text-center font-semibold text-gray-700 mt-4">Connecting travelers with unique experiences.</p>
            </div>
            
            {/* Right: Text Block */}
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-gray-800 border-l-4 border-red-500 pl-4">
                Who We Are
              </h2>
              <p className="text-gray-600 text-lg">
                We are a dedicated platform built on the philosophy that travel should feel authentic, personal, and simple. We connect millions of guests seeking temporary stays with hosts offering unique and comfortable spaces around the globe.
              </p>
              <div className="space-y-3">
                <p className="flex items-start text-gray-700">
                  <Handshake className="w-5 h-5 text-red-500 mr-2 mt-1 flex-shrink-0" />
                  <span className='font-medium'>For Guests:</span> We offer a curated list of verified homes, from cozy cabins to sprawling villas, ensuring comfort and reliability.
                </p>
                <p className="flex items-start text-gray-700">
                  <TrendingUp className="w-5 h-5 text-red-500 mr-2 mt-1 flex-shrink-0" />
                  <span className='font-medium'>For Hosts:</span> We provide an intuitive platform and the tools necessary to effortlessly manage bookings, maximize income, and share their passion for hospitality.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- 3. MISSION & VALUES SECTION --- */}
      <section className="py-16 bg-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            Our Mission & Core Values
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((item, index) => (
              <div 
                key={index} 
                className="
                  bg-white p-6 rounded-xl shadow-lg border-t-4 border-red-500 
                  hover:shadow-xl transition duration-300 transform hover:translate-y-[-4px] 
                  space-y-3
                "
              >
                <item.icon className={`w-10 h-10 ${item.color} mb-3`} />
                <h3 className="text-xl font-bold text-gray-800">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
          
          {/* Mission Statement */}
          <div className='mt-12 text-center p-6 border-2 border-red-400 rounded-xl bg-red-100/50 shadow-inner'>
            <h3 className="text-2xl font-extrabold text-red-700 flex items-center justify-center">
              <Award className='w-6 h-6 mr-2 text-red-700' />
              Our Goal: Empower hosts to share their spaces easily.
            </h3>
          </div>
        </div>
      </section>

      {/* --- 4. TEAM SECTION --- */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            Meet the Team
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-lg 
                transition duration-300 hover:shadow-2xl border border-gray-100"
              >
                <img 
                  src={member.avatar} 
                  alt={member.name} 
                  className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-red-300"
                />
                <h4 className="text-lg font-bold text-gray-800">{member.name}</h4>
                <p className="text-sm text-red-600 font-semibold">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 5. CALL TO ACTION (CTA) BANNER --- */}
      <section className="bg-red-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Join Our Community Today!
          </h2>
          <p className="text-xl text-red-200 mb-8 max-w-3xl mx-auto">
            Find your next perfect stay or take the first step to become a host.
          </p>
          <div className='flex justify-center space-x-4'>
            <button className="
              flex items-center space-x-2 px-8 py-4 rounded-full 
              text-lg font-bold text-red-900 bg-yellow-400 
              shadow-lg hover:bg-yellow-500 active:bg-yellow-600 
              transition duration-300 transform hover:scale-[1.05] 
              focus:ring-4 focus:ring-yellow-300 focus:ring-offset-2
            ">
              <Heart className='w-5 h-5'/>
              <span>Find Your Stay</span>
            </button>
            <button className="
              flex items-center space-x-2 px-8 py-4 rounded-full 
              text-lg font-bold text-white border-2 border-yellow-400
              shadow-lg hover:bg-yellow-400 hover:text-red-900 active:bg-yellow-500
              transition duration-300 transform hover:scale-[1.05] 
              focus:ring-4 focus:ring-yellow-300 focus:ring-offset-2
            ">
              <Users className='w-5 h-5'/>
              <span>Become a Host</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}

export default About;
