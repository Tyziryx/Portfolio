import React, { useState, useEffect } from "react";
import {
  ArrowUpRight, Github, Linkedin, Shield, Terminal,
  Cpu, Code, Globe, Layout, Mail, BookOpen, Coffee, Binary, User, X, Menu
} from "lucide-react";
import { translations, Language, Translations } from "./translations";

import geodexImg from "./assets/images/geodex.jpg";
import javaImg from "./assets/images/java-bdd.png";
import amsImg from "./assets/images/ams-dashboard.jpg";
import cericarImg from "./assets/images/cericar.png";
import mboxImg from "./assets/images/mbox.png";

interface Project {
  category: string;
  title: string;
  desc: string;
  tech: string[];
  link: string;
  image: string;
}

const Portfolio = () => {
  const [scrolled, setScrolled] = useState(false);
  const [lang, setLang] = useState<Language>('fr');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t: Translations = translations[lang];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLang(prev => prev === 'fr' ? 'en' : 'fr');
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const projects: Project[] = [
    {
      category: t.projects.project1.category,
      title: t.projects.project1.title,
      desc: t.projects.project1.desc,
      tech: t.projects.project1.tech,
      link: "https://github.com/Tyziryx/Mbox",
      image: mboxImg
    },
    {
      category: t.projects.project2.category,
      title: t.projects.project2.title,
      desc: t.projects.project2.desc,
      tech: t.projects.project2.tech,
      link: "https://github.com/Tyziryx/CeriCar",
      image: cericarImg
    },
    {
      category: t.projects.project3.category,
      title: t.projects.project3.title,
      desc: t.projects.project3.desc,
      tech: t.projects.project3.tech,
      link: "https://github.com/Tyziryx/amserveur",
      image: amsImg
    },
    {
      category: t.projects.project4.category,
      title: t.projects.project4.title,
      desc: t.projects.project4.desc,
      tech: t.projects.project4.tech,
      link: "https://github.com/Tyziryx/WebsiteProg",
      image: geodexImg
    },
    {
      category: t.projects.project5.category,
      title: t.projects.project5.title,
      desc: t.projects.project5.desc,
      tech: t.projects.project5.tech,
      link: "https://github.com/Tyziryx/Ams-JavaBdd",
      image: javaImg
    }
  ];

  const skills = [
    {
      name: t.skills.category1,
      items: t.skills.category1Items,
      icon: <Code size={18}/>
    },
    {
      name: t.skills.category2,
      items: t.skills.category2Items,
      icon: <Cpu size={18}/>
    },
    {
      name: t.skills.category3,
      items: t.skills.category3Items,
      icon: <Shield size={18}/>
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">

      {/* Simple Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${scrolled ? 'bg-zinc-950/95 backdrop-blur-md border-zinc-800 py-3' : 'bg-zinc-950/80 backdrop-blur-sm border-zinc-800 py-4'}`}>
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          <a href="#top" onClick={(e) => handleNavClick(e, '#top')} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img src="/Logo_Alexi.svg" alt="Alexi Miaille" className="w-20 h-12 md:w-24 md:h-14 object-contain" />
          </a>
          <div className="flex items-center gap-3 md:gap-8">
            <div className="hidden md:flex gap-6 lg:gap-8 font-mono text-[10px] uppercase tracking-widest font-bold">
              <a href="#about" onClick={(e) => handleNavClick(e, '#about')} className="hover:text-purple-500 transition-colors">{t.nav.about}</a>
              <a href="#skills" onClick={(e) => handleNavClick(e, '#skills')} className="hover:text-purple-500 transition-colors">{t.nav.skills}</a>
              <a href="#projects" onClick={(e) => handleNavClick(e, '#projects')} className="hover:text-purple-500 transition-colors">{t.nav.projects}</a>
              <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')} className="hover:text-purple-500 transition-colors">{t.nav.contact}</a>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={toggleLanguage}
                className="w-8 h-8 border border-zinc-800 flex items-center justify-center hover:border-purple-500 hover:text-purple-500 transition-all bevel-sm"
                aria-label="Toggle language"
              >
                <Globe size={16} />
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden w-8 h-8 border border-zinc-800 flex items-center justify-center hover:border-purple-500 hover:text-purple-500 transition-all bevel-sm"
                aria-label="Toggle menu"
              >
                <Menu size={16} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}></div>
          <div className="absolute top-0 right-0 h-full w-[75vw] max-w-xs bg-zinc-900 border-l border-zinc-800 shadow-2xl">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b border-zinc-800">
                <span className="font-mono text-xs uppercase tracking-widest text-purple-500 font-bold">Menu</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-8 h-8 border border-zinc-800 flex items-center justify-center hover:border-purple-500 hover:text-purple-500 transition-all bevel-sm"
                >
                  <X size={16} />
                </button>
              </div>
              <div className="flex flex-col p-4 space-y-1 font-mono uppercase tracking-wider font-bold">
                <a href="#about" onClick={(e) => handleNavClick(e, '#about')} className="hover:text-purple-500 hover:bg-zinc-800/50 transition-all py-4 px-4 border-b border-zinc-800/50 text-sm">{t.nav.about}</a>
                <a href="#skills" onClick={(e) => handleNavClick(e, '#skills')} className="hover:text-purple-500 hover:bg-zinc-800/50 transition-all py-4 px-4 border-b border-zinc-800/50 text-sm">{t.nav.skills}</a>
                <a href="#projects" onClick={(e) => handleNavClick(e, '#projects')} className="hover:text-purple-500 hover:bg-zinc-800/50 transition-all py-4 px-4 border-b border-zinc-800/50 text-sm">{t.nav.projects}</a>
                <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')} className="hover:text-purple-500 hover:bg-zinc-800/50 transition-all py-4 px-4 text-sm">{t.nav.contact}</a>
              </div>
              <div className="mt-auto p-4 border-t border-zinc-800">
                <div className="flex items-center gap-2 text-xs text-zinc-600 font-mono">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  <span className="uppercase tracking-wider">Alexi Miaille</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <header id="top" className="pt-32 md:pt-40 pb-16 md:pb-24 px-4 md:px-6 container mx-auto">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-3 py-1 mb-6 md:mb-8 bevel-sm">
            <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
            <span className="font-mono text-[9px] md:text-[10px] uppercase font-bold tracking-widest text-zinc-400">{t.hero.status}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-6 md:mb-8">
            {t.hero.title1}<br/><span className="text-purple-500 italic">{t.hero.title2}</span>
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-zinc-400 leading-relaxed mb-8 md:mb-12 max-w-2xl">
            {t.hero.description}<span className="text-white">{t.hero.descriptionHighlight}</span>{t.hero.descriptionEnd}
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#projects" className="bg-white text-black px-8 py-4 font-bold uppercase text-xs bevel-sm hover:bg-purple-600 hover:text-white transition-all">
              {t.hero.cta}
            </a>
            <div className="flex gap-2">
              <a href="https://github.com/aleximiaille" target="_blank" rel="noopener noreferrer" className="w-12 h-12 border border-zinc-800 flex items-center justify-center hover:border-purple-500 hover:text-purple-500 transition-all bevel-sm">
                <Github size={20} />
              </a>
              <a href="https://www.linkedin.com/in/alexi-miaille-baba88333" target="_blank" rel="noopener noreferrer" className="w-12 h-12 border border-zinc-800 flex items-center justify-center hover:border-purple-500 hover:text-purple-500 transition-all bevel-sm">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Section: A Propos */}
      <section id="about" className="py-16 md:py-24 px-4 md:px-6 border-t border-zinc-900">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start">
            <div className="space-y-6 md:space-y-8">
              <div className="flex items-center gap-3 text-purple-500 font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold">
                <User size={14} className="md:w-4 md:h-4" /> {t.about.label}
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter leading-tight">
                {t.about.title1}<br/><span className="text-zinc-600">{t.about.title2}</span>
              </h2>
              <div className="space-y-4 text-zinc-400 leading-relaxed text-lg">
                <p>
                  {t.about.paragraph1}<span className="text-white">{t.about.paragraph1Highlight}</span>{t.about.paragraph1End}
                </p>
                <p>
                  {t.about.paragraph2}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 pt-8 md:pt-12">
              <div className="p-4 md:p-6 bg-zinc-900/30 border border-zinc-800 bevel-sm group hover:border-purple-500/50 transition-colors">
                <BookOpen className="text-purple-500 mb-4" size={24} />
                <h4 className="font-bold uppercase text-sm mb-2">{t.about.card1Title}</h4>
                <p className="text-xs text-zinc-500 font-mono">{t.about.card1Desc}</p>
              </div>
              <div className="p-6 bg-zinc-900/30 border border-zinc-800 bevel-sm group hover:border-purple-500/50 transition-colors">
                <Coffee className="text-purple-500 mb-4" size={24} />
                <h4 className="font-bold uppercase text-sm mb-2">{t.about.card2Title}</h4>
                <p className="text-xs text-zinc-500 font-mono">{t.about.card2Desc}</p>
              </div>
              <div className="p-6 bg-zinc-900/30 border border-zinc-800 bevel-sm group hover:border-purple-500/50 transition-colors">
                <Terminal className="text-purple-500 mb-4" size={24} />
                <h4 className="font-bold uppercase text-sm mb-2">{t.about.card3Title}</h4>
                <p className="text-xs text-zinc-500 font-mono">{t.about.card3Desc}</p>
              </div>
              <div className="p-6 bg-zinc-900/30 border border-zinc-800 bevel-sm group hover:border-purple-500/50 transition-colors">
                <Binary className="text-purple-500 mb-4" size={24} />
                <h4 className="font-bold uppercase text-sm mb-2">{t.about.card4Title}</h4>
                <p className="text-xs text-zinc-500 font-mono">{t.about.card4Desc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 md:py-24 px-4 md:px-6 bg-zinc-950/50 border-y border-zinc-900">
        <div className="container mx-auto">
          <div className="mb-12 md:mb-16">
             <div className="flex items-center gap-3 text-purple-500 font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold mb-4">
                <Cpu size={14} className="md:w-4 md:h-4" /> {t.skills.label}
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter">{t.skills.title}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {skills.map((skill, i) => (
              <div key={i} className="space-y-6">
                <div className="flex items-center gap-3 text-zinc-300">
                  {skill.icon}
                  <h3 className="font-bold uppercase tracking-widest text-sm">{skill.name}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item, idx) => (
                    <span key={idx} className="font-mono text-[11px] bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-sm text-zinc-400 hover:text-purple-400 transition-colors">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Currently Section */}
      <section className="py-12 md:py-16 px-4 md:px-6 container mx-auto border-b border-zinc-900">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 text-purple-500 font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold mb-6 md:mb-8">
            <Coffee size={16} /> {t.currently.label}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="bg-zinc-900/30 border border-zinc-800 p-4 md:p-6 bevel-sm">
              <div className="text-purple-500 mb-2 md:mb-3">
                <BookOpen size={18} />
              </div>
              <p className="text-xs md:text-sm text-zinc-400 leading-relaxed">{t.currently.item1}</p>
            </div>
            <div className="bg-zinc-900/30 border border-zinc-800 p-4 md:p-6 bevel-sm">
              <div className="text-purple-500 mb-2 md:mb-3">
                <Terminal size={18} />
              </div>
              <p className="text-xs md:text-sm text-zinc-400 leading-relaxed">{t.currently.item2}</p>
            </div>
            <div className="bg-zinc-900/30 border border-zinc-800 p-4 md:p-6 bevel-sm">
              <div className="text-purple-500 mb-2 md:mb-3">
                <Mail size={18} />
              </div>
              <p className="text-xs md:text-sm text-zinc-400 leading-relaxed">{t.currently.item3}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 md:py-32 px-4 md:px-6 container mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-12 md:mb-16 space-y-4 md:space-y-0">
          <div className="space-y-3 md:space-y-4">
            <div className="flex items-center gap-3 text-purple-500 font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold">
              <Layout size={14} className="md:w-4 md:h-4" /> {t.projects.label}
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter italic">{t.projects.title}</h2>
          </div>
          <span className="font-mono text-[9px] md:text-[10px] text-zinc-600">{t.projects.buildLog}</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <div
              key={i}
              onClick={() => setSelectedProject(project)}
              className="group bg-zinc-900/40 border border-zinc-800 p-8 hover:border-purple-500/50 transition-all bevel-sm relative overflow-hidden flex flex-col h-full cursor-pointer"
            >
              <div className="flex justify-between items-start mb-6">
                <span className="font-mono text-[10px] text-purple-500 font-bold uppercase tracking-widest">{project.category}</span>
                <ArrowUpRight size={18} className="text-zinc-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-2xl font-black uppercase mb-4 group-hover:text-purple-500 transition-colors leading-tight">{project.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-8">
                {project.desc}
              </p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tech.map(t => (
                  <span key={t} className="font-mono text-[9px] text-zinc-600 uppercase">#{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal pour les projets */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-2 md:p-4"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-zinc-900 border-2 border-purple-500/50 max-w-4xl w-full max-h-[95vh] md:max-h-[90vh] overflow-y-auto bevel-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-zinc-900 border-b border-zinc-800 p-4 md:p-6 flex justify-between items-start md:items-center z-10">
              <div className="flex-1 mr-2">
                <span className="font-mono text-[9px] md:text-[10px] text-purple-500 font-bold uppercase tracking-widest">{selectedProject.category}</span>
                <h3 className="text-xl md:text-3xl font-black uppercase mt-1 md:mt-2 leading-tight">{selectedProject.title}</h3>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="w-8 h-8 md:w-10 md:h-10 border border-zinc-800 hover:border-purple-500 hover:text-purple-500 transition-all flex items-center justify-center bevel-sm flex-shrink-0"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-4 md:p-6 space-y-4 md:space-y-6">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full border border-zinc-800 bevel-sm"
              />

              <div className="space-y-3 md:space-y-4">
                <p className="text-zinc-300 text-base md:text-lg leading-relaxed">
                  {selectedProject.desc}
                </p>

                <div className="flex flex-wrap gap-2 md:gap-3">
                  {selectedProject.tech.map(tech => (
                    <span key={tech} className="bg-zinc-800 border border-zinc-700 px-3 md:px-4 py-1.5 md:py-2 font-mono text-xs md:text-sm text-purple-400">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-2 md:gap-3 mt-2 md:mt-4">
                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-white text-black px-6 md:px-8 py-3 md:py-4 font-bold uppercase text-xs bevel-sm hover:bg-purple-600 hover:text-white transition-all"
                  >
                    Voir sur GitHub <Github size={16} />
                  </a>
                  {selectedProject.title.includes("Mbox") && (
                    <a
                      href="/Rapport%20FInal%20Miaille%20Alexi.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-zinc-800 border border-zinc-700 text-white px-6 md:px-8 py-3 md:py-4 font-bold uppercase text-xs bevel-sm hover:border-purple-500 hover:bg-purple-600 transition-all"
                    >
                      Lire le rapport <BookOpen size={16} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer Section */}
      <footer id="contact" className="mt-auto py-16 md:py-24 px-4 md:px-6 border-t border-zinc-900">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-8 md:gap-12">
          <div className="text-center md:text-left">
            <h2 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter mb-4">{t.contact.title}</h2>
            <p className="text-zinc-500 font-mono text-xs md:text-sm tracking-tight italic uppercase">{t.contact.subtitle}</p>
          </div>
          <div className="flex flex-col gap-4 w-full md:w-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="mailto:alexim13550@gmail.com" className="bg-white text-black px-8 py-4 font-bold uppercase text-xs bevel-sm flex items-center justify-center gap-2 hover:bg-purple-600 hover:text-white transition-all shadow-lg active:scale-95">
                {t.contact.cta} <Mail size={16} />
              </a>
              <a href="/CV%20Alexi%20Miaille.pdf" download className="bg-zinc-800 border border-zinc-700 text-white px-8 py-4 font-bold uppercase text-xs bevel-sm flex items-center justify-center gap-2 hover:border-purple-500 hover:bg-purple-600 transition-all active:scale-95">
                Télécharger CV <ArrowUpRight size={16} />
              </a>
            </div>
            <div className="flex justify-center md:justify-end gap-6 font-mono text-[10px] text-zinc-600 uppercase font-bold tracking-widest">
              <a href="https://github.com/Tyziryx" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Github</a>
              <a href="https://www.linkedin.com/in/alexi-miaille-baba88333" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Linkedin</a>
            </div>
          </div>
        </div>
        <div className="container mx-auto mt-24 pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4 font-mono text-[9px] text-zinc-700 uppercase tracking-[0.3em]">
          <span>{t.footer.copyright}</span>
          <div className="flex gap-4">
            <span className="text-zinc-800">{t.footer.uptime}</span>
            <span className="hidden md:block">{t.footer.builtWith}</span>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Portfolio;
