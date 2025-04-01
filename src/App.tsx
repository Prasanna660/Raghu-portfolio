import React, { useEffect, useRef } from 'react';
import { Film, Play, Award, Mail, Camera, Phone, MapPin, Languages, Briefcase, GraduationCap } from 'lucide-react';
import Lottie from 'lottie-react';
import cameraAnimation from './animations/camera.json';
import filmAnimation from './animations/film.json';
import awardAnimation from './animations/award.json';

function App() {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const sections = document.querySelectorAll('.parallax-section');
      
      sections.forEach((section: Element) => {
        const htmlSection = section as HTMLElement;
        const rect = htmlSection.getBoundingClientRect();
        
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          const speed = htmlSection.dataset.speed || '0.5';
          const yPos = (scrolled - rect.top - scrolled) * Number(speed) * 0.5;
          htmlSection.style.transform = `translate3d(0, ${yPos}px, 0)`;
        }
      });

      const bounceElements = document.querySelectorAll('.bounce-on-scroll');
      bounceElements.forEach((el: Element) => {
        const rect = el.getBoundingClientRect();
        const threshold = window.innerHeight * 0.8;
        
        if (rect.top < threshold && rect.bottom > 0) {
          if (!el.classList.contains('bouncing')) {
            el.classList.add('bouncing');
          }
        } else {
          el.classList.remove('bouncing');
        }
      });
    };

    const observerOptions = {
      threshold: [0, 0.2, 0.4, 0.6, 0.8, 1],
      rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.2) {
          entry.target.classList.add('active');
          if (entry.target.classList.contains('hover-float')) {
            entry.target.classList.add('floating');
          }
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-rotate, .hover-float');
    elements.forEach(element => observer.observe(element));

    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#1a1510] text-[#e6d5b8] overflow-x-hidden sand-pattern parallax-container" ref={parallaxRef}>
      {/* Hero Section */}
      <div className="min-h-screen relative flex items-center justify-center overflow-hidden dune-overlay parallax-section" data-speed="0.2">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1510]/80 via-[#1a1510]/50 to-[#1a1510]"></div>
        <div className="relative z-10 text-center px-4">
          <div className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-8 floating">
            <Lottie animationData={cameraAnimation} loop={true} />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-gradient reveal-scale">
            Raghu
          </h1>
          <p className="text-xl md:text-2xl text-[#c2a87d] reveal">Aspiring Filmmaker</p>
          <div className="mt-8 flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6 reveal">
            <a href="tel:+919361804719" className="flex items-center justify-center text-[#c2a87d] hover:text-[#e6d5b8] transition-colors">
              <Phone className="w-5 h-5 mr-2" />
              +91 93618 04719
            </a>
            <a href="mailto:raghupersonal.contact@gmail.com" className="flex items-center justify-center text-[#c2a87d] hover:text-[#e6d5b8] transition-colors">
              <Mail className="w-5 h-5 mr-2" />
              raghupersonal.contact@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section className="py-20 px-6 relative overflow-hidden sand-waves parallax-section" data-speed="0.1">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="reveal-left hover-float bounce-on-scroll">
            <h2 className="text-4xl font-bold mb-8 flex items-center text-gradient">
              <Camera className="mr-2 glow" /> About Me
            </h2>
            <p className="text-[#e6d5b8] text-lg leading-relaxed border-glow bg-glass p-6 rounded-xl">
              Aspiring filmmaker passionate about excelling in the Tamil film industry. I've honed my skills in storytelling and visual design/sketching, focusing on bringing compelling narratives to the screen. I thrive in fast-paced environments, balancing creative vision with practical execution. Proficient in writing, directing, communication, and post-production, I'm dedicated to crafting unique and impactful films. Ready to bring fresh ideas and energy to new projects.
            </p>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-20 px-6 relative parallax-section" data-speed="0.4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-gradient reveal-scale flex items-center justify-center">
            <GraduationCap className="mr-2" /> Education
          </h2>
          <div className="space-y-8">
            <div className="bg-glass border-glow rounded-xl p-6 reveal-left hover-float">
              <h3 className="text-xl font-bold text-[#c2a87d]">BA (HONS) FILM</h3>
              <p className="text-[#8b6d4b]">LASALLE College of Arts</p>
              <p className="text-[#e6d5b8] mt-2">In partnership with Goldsmiths, University of London</p>
            </div>
            <div className="bg-glass border-glow rounded-xl p-6 reveal-right hover-float">
              <h3 className="text-xl font-bold text-[#c2a87d]">Theatre & Art School</h3>
              <p className="text-[#8b6d4b]">Chettinad Players</p>
              <p className="text-[#e6d5b8] mt-2">Stage Play (Dronacharya, 2020)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 px-6 relative sand-waves parallax-section" data-speed="0.3">
        <div className="max-w-6xl mx-auto">
          <div className="w-24 h-24 mx-auto mb-8 floating hover-float">
            <Lottie animationData={filmAnimation} loop={true} />
          </div>
          <h2 className="text-4xl font-bold mb-12 text-center text-gradient reveal-scale">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div 
                key={index} 
                className={`bg-glass border-glow rounded-xl overflow-hidden reveal-${index % 2 === 0 ? 'left' : 'right'} hover-float bounce-on-scroll`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-[#c2a87d]">{project.title}</h3>
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-[#8b6d4b] hover:text-[#c2a87d] transition-colors inline-flex items-center mb-4"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Watch Film
                  </a>
                  <p className="text-[#e6d5b8]">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Experience */}
      <section className="py-20 px-6 relative overflow-hidden parallax-section" data-speed="0.4">
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-4xl font-bold mb-12 text-center text-gradient reveal-scale flex items-center justify-center">
            <Briefcase className="mr-2" /> Professional Experience
          </h2>
          <div className="bg-glass border-glow rounded-xl p-6 reveal-left hover-float">
            <h3 className="text-xl font-bold text-[#c2a87d]">Assistant Director | Feature Film: Akaali (2024)</h3>
            <ul className="mt-4 space-y-2 text-[#e6d5b8]">
              <li className="flex items-start">
                <span className="text-[#c2a87d] mr-2">•</span>
                Assisted in shot planning and mood-setting visuals
              </li>
              <li className="flex items-start">
                <span className="text-[#c2a87d] mr-2">•</span>
                Writing scenes, dialogues and schedule management
              </li>
              <li className="flex items-start">
                <span className="text-[#c2a87d] mr-2">•</span>
                Coordinated a small team on location and in-studio
              </li>
              <li className="flex items-start">
                <span className="text-[#c2a87d] mr-2">•</span>
                Maintained integrity and honesty throughout the project
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-6 relative sand-waves parallax-section" data-speed="0.3">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12 text-gradient reveal-scale">Skills & Languages</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-glass border-glow rounded-xl p-6 reveal-left hover-float">
              <h3 className="text-xl font-bold text-[#c2a87d] mb-4">Technical Skills</h3>
              <ul className="space-y-2 text-[#e6d5b8]">
                <li>Communication</li>
                <li>Screenplay Writing</li>
                <li>Adobe Premiere & Photoshop</li>
                <li>Videography & Photography</li>
                <li>Problem-Solving</li>
              </ul>
            </div>
            <div className="bg-glass border-glow rounded-xl p-6 reveal-right hover-float">
              <h3 className="text-xl font-bold text-[#c2a87d] mb-4">Languages</h3>
              <ul className="space-y-2 text-[#e6d5b8]">
                <li>English</li>
                <li>Tamil</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-6 relative parallax-section" data-speed="0.4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 flex items-center justify-center text-gradient reveal-scale">
            <Mail className="mr-2 glow" /> Get in Touch
          </h2>
          <div className="space-y-4 reveal hover-float">
            <p className="text-[#e6d5b8]">
              <Phone className="inline-block mr-2" />
              <a href="tel:+919361804719" className="text-[#c2a87d] hover:text-[#e6d5b8] transition-colors">+91 93618 04719</a>
            </p>
            <p className="text-[#e6d5b8]">
              <Mail className="inline-block mr-2" />
              <a href="mailto:raghupersonal.contact@gmail.com" className="text-[#c2a87d] hover:text-[#e6d5b8] transition-colors">raghupersonal.contact@gmail.com</a>
            </p>
            <p className="text-[#e6d5b8]">
              <MapPin className="inline-block mr-2" />
              3-2D, Rani Meyyam
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-[#8b6d4b] bg-glass">
        <p>© 2024 Raghu. All rights reserved.</p>
      </footer>
    </div>
  );
}

const projects = [
  {
    title: "Once Upon a Love in Madras",
    description: "A heartfelt narrative exploring love in the vibrant city of Madras",
    link: "https://drive.google.com/file/d/1eD4PF9Me4cphJMNzV0OHp0HfNzhg5THR/view?usp=sharing"
  },
  {
    title: "Making",
    description: "Behind-the-scenes documentary showcasing the filmmaking process",
    link: "https://drive.google.com/file/d/1tywEcEKIIGfRWk9R4puMEjVGqRvXPRJu/view?usp=sharing"
  },
  {
    title: "Paper Kadhal",
    description: "A unique love story told through the medium of paper",
    link: "https://drive.google.com/file/d/1mv1n5RIrIkBkG2M9RGmU5sq91NTH5oRK/view?usp=sharing"
  },
  {
    title: "Karai Oram Oviyan",
    description: "A visual journey along the coastline through an artist's perspective",
    link: "#"
  },
  {
    title: "Iru Chakra Vaazhkai",
    description: "A compelling story about life's dualities",
    link: "#"
  }
];

export default App;