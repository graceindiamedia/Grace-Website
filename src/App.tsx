/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Heart, 
  MapPin, 
  Calendar, 
  Church, 
  Users, 
  PlayCircle, 
  Mail, 
  Phone, 
  Instagram, 
  Facebook, 
  ChevronRight,
  Menu,
  X,
  ArrowRight,
  Copy,
  Check,
  CreditCard,
  QrCode,
  Quote,
  ChevronLeft,
  ArrowUp,
  Clock
} from "lucide-react";

import { AdminPage } from './pages/Admin';
import { supabase } from './lib/supabase';

// --- Components ---

const Header = ({ setView, currentView }: { setView: (v: string) => void, currentView: string }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home", action: () => setView('home') },
    { name: "About", href: "#about", action: () => setView('about') },
    { name: "Ministries", href: "#ministries", action: () => setView('home') },
    { name: "Programs", href: "#programs", action: () => setView('home') },
    { name: "Contact", href: "#contact", action: () => setView('home') },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled || currentView !== 'home' ? "glass py-3" : "bg-transparent py-5"}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('home')}>
          <Church className="w-8 h-8 text-primary" />
          <span className="serif text-xl font-bold tracking-tight text-ink uppercase">Grace Ministries</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={currentView === 'home' ? link.href : '#'} 
              onClick={(e) => {
                if (link.name === 'About') {
                  e.preventDefault();
                  setView('about');
                  return;
                }
                if (currentView !== 'home') {
                  e.preventDefault();
                  setView('home');
                  setTimeout(() => {
                    window.location.hash = link.href;
                  }, 100);
                }
              }}
              className={`text-sm font-medium hover:text-primary transition-colors uppercase tracking-widest ${currentView === link.name.toLowerCase() ? 'text-primary' : ''}`}
            >
              {link.name}
            </a>
          ))}
          <button 
            onClick={() => setView('donate')}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all uppercase tracking-widest ${currentView === 'donate' ? 'bg-primary text-white' : 'bg-primary text-white hover:opacity-90'}`}
          >
            Donate
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full glass p-6 md:hidden flex flex-col gap-4"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-lg font-serif border-b border-black/5 pb-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <button className="bg-primary text-white w-full py-3 rounded-xl mt-2 font-medium uppercase tracking-widest">
              Donate Now
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/seed/south-india/1920/1080?brightness=0.3" 
          alt="South India Village" 
          className="w-full h-full object-cover grayscale-[20%]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-paper" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl pt-20">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-accent uppercase tracking-[0.3em] font-medium mb-6 text-sm"
        >
          I will put My Spirit in you, and you shall live
        </motion.p>
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-white text-5xl md:text-8xl font-serif mb-8 leading-tight"
        >
          A Mission of Love <br/> 
          <span className="italic">in the Heart of Districts</span>
        </motion.h1>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col md:flex-row gap-4 justify-center items-center"
        >
          <button className="bg-primary text-white px-10 py-4 rounded-full text-sm font-medium uppercase tracking-widest hover:scale-105 transition-transform flex items-center gap-2">
            Read More <ArrowRight className="w-4 h-4" />
          </button>
          <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-4 rounded-full text-sm font-medium uppercase tracking-widest hover:bg-white hover:text-ink transition-all">
            Our Vision
          </button>
        </motion.div>
      </div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block"
      >
        <div className="w-[1px] h-20 bg-gradient-to-b from-white to-transparent" />
      </motion.div>
    </section>
  );
};

const Stats = () => {
  const stats = [
    { label: "Mission Churches", value: "33", icon: Church },
    { label: "Missionaries", value: "105", icon: Users },
    { label: "Visiting Villages", value: "900", icon: MapPin },
    { label: "Churches in Progress", value: "04", icon: Heart },
  ];

  return (
    <section className="bg-paper py-24 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
        {stats.map((stat, idx) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <stat.icon className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-5xl md:text-6xl font-serif mb-2">{stat.value}</h3>
            <p className="text-ink/60 uppercase tracking-widest text-xs font-medium">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Ministries = () => {
  return (
    <section id="ministries" className="py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-primary uppercase tracking-widest text-sm font-semibold mb-4">Our Vision</p>
            <h2 className="text-4xl md:text-5xl font-serif mb-8 italic">
              "Come, my beloved, let us go forth into the field; let us lodge in the villages."
            </h2>
            <div className="space-y-6 text-ink/80 leading-relaxed max-w-lg">
              <p>
                Grace Ministries India is dedicated to spreading the light of the gospel to the most remote corners of South India. 
                Our mission began with a simple call to serve the rural communities of Tuticorin and has grown into a nationwide movement of love and faith.
              </p>
              <div className="flex items-start gap-4 p-4 border-l-2 border-accent bg-paper/50 italic">
                “Evangelism in Tamil villages followed by evangelism throughout India.”
              </div>
            </div>
            <button className="mt-10 group flex items-center gap-2 text-sm font-bold uppercase tracking-widest border-b-2 border-primary pb-1">
              About Our Mission <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          <div className="relative">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="aspect-[4/5] rounded-[100px] overflow-hidden"
            >
              <img 
                src="https://picsum.photos/seed/grace-church/800/1000" 
                alt="Ministry Work" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-accent/20 rounded-full blur-3xl -z-10" />
            <div className="absolute top-1/2 right-[-20%] vertical-text opacity-10 pointer-events-none text-8xl font-serif select-none">
              TUTICORIN
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Programs = () => {
  const defaultPrograms = [
    {
      id: "1",
      title: "Vasanamum Vazhvum",
      description: "Weekly devotion presented by Bro B Porselvan Asir. Mondays & Thursdays.",
      image: "https://picsum.photos/seed/devotion/600/400",
      time: "Mon & Thu"
    },
    {
      id: "2",
      title: "Grace Voice",
      description: "Spiritual messages to uplift your soul. Every Saturday.",
      image: "https://picsum.photos/seed/voice/600/400",
      time: "Saturdays"
    },
    {
      id: "3",
      title: "Prayer Cells",
      description: "Small group gatherings for dedicated prayer, fellowship, and spiritual growth.",
      image: "https://picsum.photos/seed/prayer/600/400",
      time: "Weekly"
    },
    {
      id: "4",
      title: "Village Ministry",
      description: "Reaching unreached villages across South India with the gospel and community support.",
      image: "https://picsum.photos/seed/village/600/400",
      time: "Ongoing"
    },
    {
      id: "5",
      title: "Children Ministry",
      description: "Nurturing the next generation through Sunday schools, VBS, and moral education.",
      image: "https://picsum.photos/seed/children/600/400",
      time: "Sundays"
    },
    {
      id: "6",
      title: "Youth Ministry",
      description: "Empowering young people to grow in faith, leadership, and service to society.",
      image: "https://picsum.photos/seed/youth/600/400",
      time: "Monthly"
    },
    {
      id: "7",
      title: "Charity",
      description: "Extending God's love through practical help, relief work, and support for the needy.",
      image: "https://picsum.photos/seed/charity/600/400",
      time: "Ongoing"
    }
  ];

  const [programs, setPrograms] = useState(defaultPrograms);

  useEffect(() => {
    const fetchPrograms = async () => {
      if (!import.meta.env.VITE_SUPABASE_URL) return;
      const { data } = await supabase.from('programs').select('*').order('created_at', { ascending: false });
      if (data && data.length > 0) {
        setPrograms(data);
      }
    };
    fetchPrograms();
  }, []);

  return (
    <section id="programs" className="bg-ink text-white py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <p className="text-accent uppercase tracking-widest text-sm font-semibold mb-4">Our Initiatives</p>
            <h2 className="text-4xl md:text-5xl font-serif">Programs & Ministries</h2>
          </div>
          <p className="text-white/60 max-w-sm mb-1">
            Explore the various ways we serve, reach out, and nurture our communities in faith.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((p, idx) => (
            <motion.div 
              key={p.id || p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-video overflow-hidden rounded-2xl mb-6">
                <img 
                  src={p.image} 
                  alt={p.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <PlayCircle className="w-16 h-16 text-white stroke-[1px]" />

                </div>
                <div className="absolute top-4 left-4 bg-accent/90 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-ink">
                  {p.time}
                </div>
              </div>
              <h3 className="text-2xl font-serif mb-2 flex items-center gap-2">
                {p.title} <ChevronRight className="w-5 h-5 text-accent opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
              </h3>
              <p className="text-white/60">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const testimonials = [
    {
      text: "Grace Ministries came to our village when we had no hope. Now, we have a community of faith that supports us in every way.",
      author: "Rajesh Kumar",
      location: "Virudhunagar"
    },
    {
      text: "The youth ministry transformed my life. I found purpose and a calling to serve others instead of wandering aimlessly.",
      author: "Priya",
      location: "Tuticorin"
    },
    {
      text: "Through their charity work, my children received education and proper guidance. I am forever grateful for their support.",
      author: "Lakshmi",
      location: "Tirunelveli"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-24 px-6 bg-paper overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        <Quote className="w-12 h-12 text-primary/20 mx-auto mb-8" />
        <h2 className="text-3xl md:text-5xl font-serif mb-16 italic">Voices of Grace</h2>
        
        <div className="relative min-h-[250px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="absolute w-full px-12"
            >
              <p className="text-xl md:text-2xl text-ink/80 leading-relaxed mb-8">
                "{testimonials[currentIndex].text}"
              </p>
              <div className="flex flex-col items-center">
                <span className="font-bold uppercase tracking-widest text-xs mb-1">
                  {testimonials[currentIndex].author}
                </span>
                <span className="text-primary text-[10px] uppercase tracking-widest">
                  {testimonials[currentIndex].location}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
          
          <button 
            onClick={prev}
            className="absolute left-0 p-3 bg-white rounded-full shadow-sm hover:scale-105 transition-transform text-ink/60 hover:text-primary z-10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button 
            onClick={next}
            className="absolute right-0 p-3 bg-white rounded-full shadow-sm hover:scale-105 transition-transform text-ink/60 hover:text-primary z-10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
        
        <div className="flex justify-center gap-2 mt-12">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex ? 'bg-primary w-6' : 'bg-ink/20 hover:bg-ink/40'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [formType, setFormType] = useState<'general' | 'prayer'>('general');

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-20">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif mb-8">Reach Out</h2>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-full border border-ink/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold uppercase tracking-widest text-xs mb-2">Address</h4>
                  <p className="text-ink/60">3/1 Abraham Nagar, Periyanayagapuram,<br/>Tuticorin - 628101</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-full border border-ink/10 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold uppercase tracking-widest text-xs mb-2">Email</h4>
                  <p className="text-ink/60">contact@graceministries.org</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-full border border-ink/10 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold uppercase tracking-widest text-xs mb-2">Phone</h4>
                  <p className="text-ink/60">+91 461 1234567</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-10 rounded-[40px] shadow-sm border border-ink/5">
            <div className="flex gap-4 mb-8">
              <button 
                onClick={() => setFormType('general')}
                className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest rounded-xl transition-colors ${formType === 'general' ? 'bg-ink text-white' : 'bg-paper text-ink/60 hover:text-ink'}`}
              >
                General Message
              </button>
              <button 
                onClick={() => setFormType('prayer')}
                className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest rounded-xl transition-colors ${formType === 'prayer' ? 'bg-primary text-white' : 'bg-paper text-ink/60 hover:text-ink'}`}
              >
                Prayer Request
              </button>
            </div>
            
            <AnimatePresence mode="wait">
              <motion.form 
                key={formType}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                {formType === 'prayer' && (
                  <p className="text-xs text-ink/50 italic mb-4">
                    Your prayer request will be sent to a private, admin-only view where our intercessory team will pray for you.
                  </p>
                )}
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="First Name" className="w-full px-5 py-4 rounded-2xl bg-paper/50 border-none focus:ring-2 focus:ring-primary/20 text-sm" />
                  <input type="text" placeholder="Last Name" className="w-full px-5 py-4 rounded-2xl bg-paper/50 border-none focus:ring-2 focus:ring-primary/20 text-sm" />
                </div>
                <input type="email" placeholder="Email Address" className="w-full px-5 py-4 rounded-2xl bg-paper/50 border-none focus:ring-2 focus:ring-primary/20 text-sm" />
                {formType === 'prayer' && (
                  <input type="text" placeholder="Phone Number (Optional)" className="w-full px-5 py-4 rounded-2xl bg-paper/50 border-none focus:ring-2 focus:ring-primary/20 text-sm" />
                )}
                <textarea 
                  placeholder={formType === 'general' ? "Your Message" : "Describe your prayer request..."} 
                  rows={4} 
                  className="w-full px-5 py-4 rounded-2xl bg-paper/50 border-none focus:ring-2 focus:ring-primary/20 text-sm resize-none" 
                />
                <button className={`w-full text-white py-4 rounded-2xl font-bold uppercase tracking-widest text-xs transition-colors ${formType === 'general' ? 'bg-ink hover:bg-primary' : 'bg-primary hover:bg-ink'}`}>
                  {formType === 'general' ? 'Send Message' : 'Submit Prayer Request'}
                </button>
              </motion.form>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = ({ setView }: { setView: (v: string) => void }) => {
  return (
    <footer className="border-t border-ink/5 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-20">
          <div className="max-w-xs">
            <div className="flex items-center gap-2 mb-6">
              <Church className="w-8 h-8 text-primary" />
              <span className="serif text-xl font-bold tracking-tight uppercase">Grace Ministries</span>
            </div>
            <p className="text-ink/60 text-sm leading-relaxed mb-6">
              Serving the villages of South India with faith, hope, and compassion since 2021.
            </p>
            <form className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-widest text-ink/80">Subscribe to Updates</label>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="bg-paper/50 px-4 py-3 rounded-l-xl border-none focus:ring-2 focus:ring-primary/20 text-sm w-full outline-none"
                  required
                />
                <button 
                  type="button" 
                  className="bg-ink text-white px-5 py-3 rounded-r-xl text-xs font-bold uppercase tracking-widest hover:bg-primary transition-colors"
                >
                  Join
                </button>
              </div>
            </form>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 lg:w-2/3">
            <div>
              <h4 className="font-bold uppercase tracking-widest text-[10px] mb-6 text-ink/40">Navigation</h4>
              <ul className="space-y-3 text-sm">
                <li><button onClick={() => setView('home')} className="hover:text-primary">Home</button></li>
                <li><button onClick={() => setView('home')} className="hover:text-primary">Ministries</button></li>
                <li><button onClick={() => setView('about')} className="hover:text-primary">About</button></li>
                <li><button onClick={() => setView('home')} className="hover:text-primary">Contact</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold uppercase tracking-widest text-[10px] mb-6 text-ink/40">Social</h4>
              <ul className="space-y-3 text-sm flex flex-col">
                <a href="#" className="flex items-center gap-2 hover:text-primary"><Instagram className="w-4 h-4" /> Instagram</a>
                <a href="#" className="flex items-center gap-2 hover:text-primary"><Facebook className="w-4 h-4" /> Facebook</a>
              </ul>
            </div>
            <div>
              <h4 className="font-bold uppercase tracking-widest text-[10px] mb-6 text-ink/40">Legal</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary">Terms</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-ink/5 gap-4">
          <p className="text-[10px] text-ink/40 uppercase tracking-widest">
            © 2026 GRACE MINISTRIES INDIA. ALL RIGHTS RESERVED.
          </p>
          <p className="text-[10px] text-ink/40 uppercase tracking-widest">
            DESIGNED WITH GRACE
          </p>
        </div>
      </div>
    </footer>
  );
};

const DonatePage = () => {
  const bankAccounts = [
    {
      title: "Missionary Work",
      name: "Grace Ministries",
      accNo: "156100710400123",
      ifsc: "TMBL0000156",
      branch: "Sipcot, Tuticorin",
      bank: "Tamilnad Mercantile Bank"
    },
    {
      title: "Youth & Children Ministry",
      name: "Young Soul Winners Mission",
      accNo: "035100710400087",
      ifsc: "TMBL0000035",
      branch: "Pudukottai, Tuticorin",
      bank: "Tamilnad Mercantile Bank"
    },
    {
      title: "General & Support",
      name: "Grace Ministries",
      accNo: "10237757808",
      ifsc: "SBIN0007629",
      branch: "SBI Bazar, Tuticorin",
      bank: "State Bank of India"
    },
    {
      title: "Prayer Ministry",
      name: "Tabernacle of God Mission",
      accNo: "0331007100400026",
      ifsc: "TMBL0000033",
      branch: "Elairampannai, Tuticorin",
      bank: "Tamilnad Mercantile Bank"
    }
  ];

  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-32 pb-24 px-6 bg-paper min-h-screen"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-primary uppercase tracking-[0.3em] font-medium mb-4 text-xs"
          >
            Contribution
          </motion.p>
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-serif mb-6"
          >
            Be a Part to Reach <br/> <span className="italic">the Villages</span>
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-ink/60 max-w-2xl mx-auto"
          >
            Your support enables us to build churches, support missionaries, and provide spiritual guidance to remote communities across South India.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-ink text-white p-10 rounded-[40px] flex flex-col justify-between items-start"
          >
            <div>
              <QrCode className="w-12 h-12 text-accent mb-6" />
              <h2 className="text-3xl font-serif mb-4">UPI Payments</h2>
              <p className="text-white/60 mb-8">Scan or use the number below for any UPI app (GPay, PhonePe, Paytm).</p>
            </div>
            <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl w-full">
              <div className="shrink-0 w-10 h-10 bg-accent rounded-full flex items-center justify-center text-ink font-bold">
                <Phone className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] uppercase tracking-widest text-white/40">Mobile / UPI Number</p>
                <p className="font-mono text-xl">94432 89026</p>
              </div>
              <button 
                onClick={() => copyToClipboard("9443289026", "upi")}
                className="p-3 hover:bg-white/10 rounded-xl transition-colors"
                title="Copy UPI Number"
              >
                {copiedId === "upi" ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-accent text-ink p-10 rounded-[40px] flex flex-col justify-center"
          >
            <Heart className="w-12 h-12 text-primary mb-6" />
            <h2 className="text-3xl font-serif mb-4">Volunteer With Us</h2>
            <p className="text-ink/70 mb-8 leading-relaxed">
              Beyond financial support, we are always looking for passionate individuals to join our mission on the ground in Tamil villages.
            </p>
            <a href="tel:+919487489026" className="inline-flex items-center gap-3 bg-ink text-white px-8 py-4 rounded-full text-sm font-bold uppercase tracking-widest hover:scale-105 transition-transform">
              <Phone className="w-4 h-4" /> Call Us to Volunteer
            </a>
          </motion.div>
        </div>

        <div className="space-y-4">
          <h3 className="text-2xl font-serif mb-8 text-center">Bank Transfer Information</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {bankAccounts.map((acc, idx) => (
              <motion.div 
                key={acc.accNo}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 + (idx * 0.1) }}
                className="glass p-8 rounded-[32px] group hover:border-primary/30 transition-all"
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h4 className="text-primary font-bold uppercase tracking-widest text-[10px] mb-1">{acc.title}</h4>
                    <p className="text-xl font-serif">{acc.bank}</p>
                  </div>
                  <CreditCard className="w-6 h-6 text-ink/20" />
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-end border-b border-ink/5 pb-2">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-ink/40">Account Name</p>
                      <p className="font-medium">{acc.name}</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-end border-b border-ink/5 pb-2">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-ink/40">Account Number</p>
                      <p className="font-mono text-lg">{acc.accNo}</p>
                    </div>
                    <button onClick={() => copyToClipboard(acc.accNo, acc.accNo)} className="text-primary/60 hover:text-primary p-2">
                      {copiedId === acc.accNo ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  <div className="flex justify-between items-end border-b border-ink/5 pb-2">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-ink/40">IFSC Code</p>
                      <p className="font-mono">{acc.ifsc}</p>
                    </div>
                    <button onClick={() => copyToClipboard(acc.ifsc, acc.ifsc)} className="text-primary/60 hover:text-primary p-2">
                      {copiedId === acc.ifsc ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-ink/40">Branch</p>
                    <p className="text-sm text-ink/60">{acc.branch}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const AboutPage = () => {
  const atPresentStats = [
    { label: "Mission Fields", value: "54", icon: MapPin },
    { label: "Missionaries", value: "105", icon: Users },
    { label: "Visiting Villages", value: "900", icon: MapPin },
    { label: "Church Groups", value: "90", icon: Users },
    { label: "Churches Built", value: "33", icon: Church },
    { label: "Lands Ready", value: "08", icon: Heart },
    { label: "Under Construction", value: "04", icon: Church },
    { label: "Mission Houses Needed", value: "02", icon: Heart },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-32 pb-24 px-6 bg-paper min-h-screen"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-20 items-start mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <p className="text-primary uppercase tracking-[0.3em] font-medium mb-4 text-xs">Our History</p>
            <h1 className="text-5xl md:text-7xl font-serif mb-8 italic">Started with <br/> a Prayer</h1>
            <div className="space-y-6 text-ink/70 leading-relaxed text-lg">
              <p>
                In the year 1985, Bro. B Porselvan Asir and a group of students from Tuticorin College gathered in prayer. 
                During these moments of devotion, God placed a profound burden and vision in their hearts.
              </p>
              <p>
                They saw the thousands of villages across Tamil Nadu that had never heard the gospel, where no church stood, 
                and they felt called to reach out to lukewarm communities and unreached fields.
              </p>
              <p>
                Grace Ministries was officially founded in 1987. From those humble student gatherings, 
                Bro. Porselvan Asir has dedicated his life as a missionary, leading a movement that has grown 
                to support over 105 missionaries today.
              </p>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[60px] overflow-hidden shadow-2xl">
              <img 
                src="https://picsum.photos/seed/history/800/1000" 
                alt="Our History" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 glass p-8 rounded-3xl max-w-xs hidden md:block">
              <p className="serif text-primary text-2xl mb-2">Since 1987</p>
              <p className="text-xs uppercase tracking-widest text-ink/60">Over 35 years of village evangelism and community building.</p>
            </div>
          </motion.div>
        </div>

        <section className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif mb-4 italic">The Urgent Need</h2>
            <p className="text-ink/60 max-w-2xl mx-auto">
              Tamil Nadu is home to thousands of villages where the message of hope has not yet arrived. 
              In some districts, like Virudhunagar, over 400 out of 598 villages have no church at all.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {atPresentStats.map((stat, idx) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white/50 p-8 rounded-3xl text-center border border-ink/5"
              >
                <div className="text-primary mb-4 flex justify-center">
                  <stat.icon className="w-6 h-6" />
                </div>
                <h3 className="text-3xl font-serif mb-1">{stat.value}</h3>
                <p className="text-[10px] uppercase tracking-widest text-ink/40 font-bold">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="bg-ink text-white p-12 md:p-20 rounded-[60px] overflow-hidden relative">
          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-serif mb-6 italic text-accent">Our Mission Continued</h2>
              <p className="text-white/70 text-lg mb-8 leading-relaxed">
                Our vision remains clear: Evangelism in Tamil villages followed by evangelism throughout India. 
                We are building more than structures; we are building communities of faith.
              </p>
              <button 
                onClick={() => (window.location.hash = "#contact")}
                className="bg-accent text-ink px-10 py-4 rounded-full text-sm font-bold uppercase tracking-widest hover:scale-105 transition-transform"
              >
                Partner With Us
              </button>
            </div>
            <div className="bg-white/5 p-8 rounded-3xl border border-white/10">
              <p className="serif text-2xl italic mb-4">"God gave a burden and a vision to reach villages where there are no churches."</p>
              <div className="h-1 w-20 bg-accent" />
            </div>
          </div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        </section>
      </div>
    </motion.div>
  );
};

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-4 bg-primary text-white rounded-full shadow-lg hover:scale-110 hover:bg-ink transition-all"
          aria-label="Back to top"
        >
          <ArrowUp className="w-6 h-6" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

const UpcomingEvents = () => {
  const defaultEvents = [
    {
      id: "1",
      title: "Tuticorin Village Outreach",
      date: "Oct 15, 2026",
      time: "09:00 AM - 04:00 PM",
      location: "Periyanayagapuram, Tuticorin",
      type: "Village Visit",
      description: "Join our missionary team as we visit families in Periyanayagapuram to share the gospel, distribute essentials, and pray with the locals.",
      image: "https://picsum.photos/seed/outreach1/600/400"
    },
    {
      id: "2",
      title: "Youth Intercessory Prayer",
      date: "Oct 20, 2026",
      time: "06:30 PM - 08:30 PM",
      location: "Main Grace Church",
      type: "Prayer Cell",
      description: "A special evening dedicated to our youth, focusing on intercessory prayer, worship, and spiritual empowerment for the next generation.",
      image: "https://picsum.photos/seed/youthprayer/600/400"
    },
    {
      id: "3",
      title: "Virudhunagar Mission Trip",
      date: "Nov 02, 2026",
      time: "07:00 AM - 07:00 PM",
      location: "Virudhunagar District",
      type: "Village Visit",
      description: "A full-day mission trip to the unreached villages of Virudhunagar district. We will be surveying areas for new church plants and hosting open-air meetings.",
      image: "https://picsum.photos/seed/virudhunagar/600/400"
    }
  ];

  const [events, setEvents] = useState(defaultEvents);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      if (!import.meta.env.VITE_SUPABASE_URL) return;
      const { data } = await supabase.from('events').select('*').order('created_at', { ascending: false });
      if (data && data.length > 0) {
        setEvents(data);
      }
    };
    fetchEvents();
  }, []);

  return (
    <section className="py-24 px-6 bg-ink text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <p className="text-accent uppercase tracking-widest text-sm font-semibold mb-4">Join Us</p>
            <h2 className="text-4xl md:text-5xl font-serif">Upcoming Events</h2>
          </div>
          <p className="text-white/60 max-w-sm mb-1">
            Stay updated with our monthly schedules for prayer cells, village visits, and community outreach programs.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {events.map((evt, idx) => (
            <motion.div 
              key={evt.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => setSelectedEvent(evt)}
              className="bg-white/5 rounded-3xl overflow-hidden border border-white/10 cursor-pointer group hover:border-primary/50 transition-colors"
            >
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={evt.image} 
                  alt={evt.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-accent text-ink px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                  {evt.type}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-primary mb-4">
                  <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {evt.date}</span>
                </div>
                <h3 className="text-2xl font-serif mb-2 group-hover:text-primary transition-colors">{evt.title}</h3>
                <div className="flex items-center gap-2 text-white/50 text-sm mt-4">
                  <MapPin className="w-4 h-4" /> {evt.location}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedEvent(null)}
            className="fixed inset-0 bg-ink/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-paper text-ink max-w-2xl w-full rounded-[40px] overflow-hidden shadow-2xl relative"
            >
              <div className="relative h-64">
                <img 
                  src={selectedEvent.image} 
                  alt={selectedEvent.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <button 
                  onClick={() => setSelectedEvent(null)}
                  className="absolute top-6 right-6 w-10 h-10 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/40 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-10">
                <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-primary mb-4">
                  <span className="bg-primary/10 px-3 py-1 rounded-full">{selectedEvent.type}</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-serif mb-6">{selectedEvent.title}</h3>
                
                <div className="grid grid-cols-2 gap-6 mb-8 border-y border-ink/10 py-6">
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-ink/40 font-bold mb-1">Date & Time</p>
                      <p className="text-sm font-medium">{selectedEvent.date}</p>
                      <p className="text-sm text-ink/60">{selectedEvent.time}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-ink/40 font-bold mb-1">Location</p>
                      <p className="text-sm font-medium">{selectedEvent.location}</p>
                    </div>
                  </div>
                </div>
                
                <p className="text-ink/80 leading-relaxed mb-8">
                  {selectedEvent.description}
                </p>
                
                <div className="flex gap-4">
                  <button 
                    onClick={() => {
                      setSelectedEvent(null);
                      window.location.hash = "#contact";
                    }}
                    className="flex-1 bg-ink text-white py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-primary transition-colors"
                  >
                    Join Event
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default function App() {
  const [view, setView] = useState(() => {
    const path = window.location.pathname;
    if (path.startsWith('/admin')) return 'admin';
    if (path.startsWith('/about')) return 'about';
    if (path.startsWith('/donate')) return 'donate';
    return 'home';
  });

  const handleSetView = (newView: string) => {
    setView(newView);
    const path = newView === 'home' ? '/' : `/${newView}`;
    window.history.pushState({}, '', path);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path.startsWith('/admin')) setView('admin');
      else if (path.startsWith('/about')) setView('about');
      else if (path.startsWith('/donate')) setView('donate');
      else setView('home');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <div className="min-h-screen">
      <Header setView={handleSetView} currentView={view} />
      {view === 'home' ? (
        <>
          <Hero />
          <Stats />
          <Ministries />
          <Programs />
          <UpcomingEvents />
          <Testimonials />
          <Contact />
        </>
      ) : view === 'about' ? (
        <AboutPage />
      ) : view === 'admin' ? (
        <AdminPage />
      ) : (
        <DonatePage />
      )}
      <Footer setView={handleSetView} />
      <BackToTop />
    </div>
  );
}

