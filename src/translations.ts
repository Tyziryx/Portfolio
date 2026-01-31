export const translations = {
  fr: {
    nav: {
      about: "Profil",
      skills: "Stack",
      projects: "Projets",
      contact: "Contact"
    },
    hero: {
      status: "Status: En recherche d'alternance",
      title1: "Informatique",
      title2: "& Systèmes.",
      description: "Étudiant L3 informatique à l'Université d'Avignon (CERI). Entre ",
      descriptionHighlight: "développement, réseau et infrastructure",
      descriptionEnd: ", j'explore pour trouver ma voie.",
      cta: "Découvrir mes projets"
    },
    about: {
      label: "01 // À_Propos",
      title1: "Bidouilleur dans",
      title2: "l'Âme.",
      paragraph1: "Depuis petit, je démonte et répare tout ce qui me passe entre les mains. Ce qui a commencé avec des appareils électroniques s'est naturellement tourné vers l'informatique : ",
      paragraph1Highlight: "comprendre comment ça marche",
      paragraph1End: ", c'est ce qui me motive.",
      paragraph2: "Actuellement en L3 Informatique à l'Université d'Avignon (CERI), j'explore différents domaines. Mes projets académiques m'ont formé au développement web. Mais c'est en touchant aux réseaux (CCNA1, config DHCP/DNS avec Mbox) que j'ai trouvé un intérêt particulier pour l'infrastructure. Objectif : Master SYRIUS (CERI) pour approfondir le réseau et la cybersécurité.",
      card1Title: "Formation",
      card1Desc: "L3 Informatique - CERI Avignon",
      card2Title: "Approche",
      card2Desc: "Apprendre en bidouillant",
      card3Title: "Objectif 2026",
      card3Desc: "Master SYRIUS (Réseau/Cybersec)",
      card4Title: "Certification",
      card4Desc: "Cisco CCNA1"
    },
    currently: {
      label: "// En_ce_moment",
      item1: "Développement Mbox v2 : amélioration globale, contrôle parental et autres fonctionnalités.",
      item2: "Approfondissement des compétences réseau : cours et projets académiques.",
      item3: "Je postule dans des boîtes réseau et cybersécurité pour une alternance en septembre 2026"
    },
    skills: {
      label: "02 // Stack",
      title: "Compétences_Techniques",
      category1: "Réseaux & Infrastructure",
      category1Items: ["Cisco CCNA1", "Config routeurs/switchs", "Linux serveur", "Monitoring système", "Scripting Bash"],
      category2: "Développement",
      category2Items: ["PHP", "Python", "Java", "HTML/CSS", "JavaScript"],
      category3: "Outils & Bases de Données",
      category3Items: ["PostgreSQL", "Git", "React"]
    },
    projects: {
      label: "03 // Travaux",
      title: "Projets_Sélectionnés",
      buildLog: "// WORKS_2025-2026",
      project1: {
        category: "Réseau & Infrastructure",
        title: "Mbox - Box Internet",
        desc: "Interface d'administration complète pour routeur domestique virtualisé (sept 2025 - janv 2026). Architecture 3 VMs avec double NAT, 7 services réseau configurés (Apache/HTTPS, BIND9, DHCP, Postfix, FTP, MariaDB, SSH). Modes débutant/expert, delegation DNS, Webmail, Speedtest avec historique, Forum. 4 mois de dev, ~2000 lignes de code PHP/Bash.",
        tech: ["PHP", "Bash", "DHCP", "DNS", "Linux"]
      },
      project2: {
        category: "Web Application",
        title: "CeriCar - Covoiturage",
        desc: "Plateforme de covoiturage complète avec recherche AJAX, réservations, profils conducteurs/voyageurs. Développé en binôme avec framework Yii2, PostgreSQL et Bootstrap. Architecture MVC avec système de rôles.",
        tech: ["Yii2", "PHP", "PostgreSQL", "Bootstrap"]
      },
      project3: {
        category: "Ops & Monitoring",
        title: "AdminMonitoring System",
        desc: "Système de surveillance en temps réel : métriques CPU, RAM, disque avec interface web Flask. Projet solo pour apprendre le monitoring système et l'automatisation.",
        tech: ["Python", "Flask", "Linux"]
      },
      project4: {
        category: "Web Development",
        title: "GéoDex - Collection",
        desc: "Application web de collection de pierres avec authentification, profils utilisateurs et back-office admin. Projet en binôme développé en PHP natif avec PostgreSQL. Gestion complète CRUD.",
        tech: ["PHP", "PostgreSQL", "HTML/CSS"]
      },
      project5: {
        category: "Application Java",
        title: "Ma Supérette du Net",
        desc: "Application de gestion pour supérette : fournisseurs, stocks, ventes et tableaux de bord. Projet en binôme avec interface Swing et base PostgreSQL. Architecture MVC.",
        tech: ["Java", "PostgreSQL", "Swing"]
      }
    },
    contact: {
      title: "On discute ?",
      subtitle: "Recherche alternance Sept 2026 // Réseau • Cybersec • DevOps",
      cta: "Envoyer un email"
    },
    footer: {
      copyright: "© 2026 // ALEXI_MIAILLE",
      uptime: "Étudiant L3 - CERI Avignon",
      builtWith: "Made with ☕ & curiosity"
    }
  },
  en: {
    nav: {
      about: "Profile",
      skills: "Stack",
      projects: "Projects",
      contact: "Contact"
    },
    hero: {
      status: "Status: Looking for work-study program",
      title1: "Computer",
      title2: "& Systems.",
      description: "Computer Science student (L3) at University of Avignon (CERI). Between ",
      descriptionHighlight: "development, networking and infrastructure",
      descriptionEnd: ", exploring to find my path.",
      cta: "Discover my projects"
    },
    about: {
      label: "01 // About_Me",
      title1: "Tinkerer at",
      title2: "Heart.",
      paragraph1: "Since childhood, I've been taking apart and fixing everything I can get my hands on. What started with electronics naturally evolved into computer science: ",
      paragraph1Highlight: "understanding how things work",
      paragraph1End: " is what drives me.",
      paragraph2: "Currently in L3 Computer Science at University of Avignon (CERI), I'm exploring different areas. My academic projects trained me in web development. But it's by working with networks (CCNA1, DHCP/DNS config with Mbox) that I found a particular interest in infrastructure. Goal: Master's SYRIUS (CERI) to deepen networking and cybersecurity.",
      card1Title: "Education",
      card1Desc: "L3 Computer Science - CERI Avignon",
      card2Title: "Approach",
      card2Desc: "Learning by tinkering",
      card3Title: "Goal 2026",
      card3Desc: "Master SYRIUS (Network/Cybersec)",
      card4Title: "Certification",
      card4Desc: "Cisco CCNA1"
    },
    currently: {
      label: "// Currently",
      item1: "Working on Mbox v2: overall improvements, parental control and other features.",
      item2: "Deepening networking skills through coursework and academic projects.",
      item3: "Applying to network and cybersec companies for a work‑study role in Sept 2026"
    },
    skills: {
      label: "02 // Stack",
      title: "Technical_Skills",
      category1: "Networks & Infrastructure",
      category1Items: ["Cisco CCNA1", "Router/Switch config", "Linux server", "System monitoring", "Bash scripting"],
      category2: "Development",
      category2Items: ["PHP", "Python", "Java", "HTML/CSS", "JavaScript"],
      category3: "Tools & Databases",
      category3Items: ["PostgreSQL", "Git", "React"]
    },
    projects: {
      label: "03 // Works",
      title: "Selected_Projects",
      buildLog: "// WORKS_2025-2026",
      project1: {
        category: "Network & Infrastructure",
        title: "Mbox - Internet Box",
        desc: "Complete administration interface for virtualized home router (Sept 2025 - Jan 2026). 3 VMs architecture with double NAT, 7 configured network services (Apache/HTTPS, BIND9, DHCP, Postfix, FTP, MariaDB, SSH). Beginner/Expert modes, DNS delegation, Webmail, Speedtest with history, Forum. 4 months dev, ~2000 lines PHP/Bash code.",
        tech: ["PHP", "Bash", "DHCP", "DNS", "Linux"]
      },
      project2: {
        category: "Web Application",
        title: "CeriCar - Ridesharing",
        desc: "Complete ridesharing platform with AJAX search, bookings, driver/passenger profiles. Pair project built with Yii2 framework, PostgreSQL and Bootstrap. MVC architecture with role system.",
        tech: ["Yii2", "PHP", "PostgreSQL", "Bootstrap"]
      },
      project3: {
        category: "Ops & Monitoring",
        title: "AdminMonitoring System",
        desc: "Real-time monitoring system: CPU, RAM, disk metrics with Flask web interface. Solo project to learn system monitoring and automation.",
        tech: ["Python", "Flask", "Linux"]
      },
      project4: {
        category: "Web Development",
        title: "GéoDex - Collection",
        desc: "Stone collection web app with authentication, user profiles and admin back-office. Pair project developed in native PHP with PostgreSQL. Full CRUD management.",
        tech: ["PHP", "PostgreSQL", "HTML/CSS"]
      },
      project5: {
        category: "Java Application",
        title: "My Grocery Store",
        desc: "Store management application: suppliers, inventory, sales and dashboards. Pair project with Swing interface and PostgreSQL database. MVC architecture.",
        tech: ["Java", "PostgreSQL", "Swing"]
      }
    },
    contact: {
      title: "Let's talk?",
      subtitle: "Looking for work-study Sept 2026 // Network • Cybersec • DevOps",
      cta: "Send an email"
    },
    footer: {
      copyright: "© 2026 // ALEXI_MIAILLE",
      uptime: "Student L3 - CERI Avignon",
      builtWith: "Made with ☕ & curiosity"
    }
  }
};

export type Language = 'fr' | 'en';
export type Translations = typeof translations.fr;
