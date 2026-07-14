export const translations = {
  fr: {
    nav: {
      about: "Profil",
      journey: "Parcours",
      skills: "Stack",
      projects: "Projets",
      contact: "Contact"
    },
    hero: {
      status: "Stage @ SBI Informatique · Alternance Sept 2026",
      title1: "Réseaux",
      title2: "& Systèmes.",
      description: "Étudiant en L3 informatique au CERI d'Avignon, actuellement en stage ",
      descriptionHighlight: "administration systèmes, réseaux et cybersécurité",
      descriptionEnd: " chez SBI Informatique. Ce qui me plaît : décortiquer une infra de bout en bout et la sécuriser, avec une doc propre derrière.",
      cta: "Voir mes projets",
      facts: [
        { label: "début", value: "sept 2026" },
        { label: "rythme", value: "2 sem / 2 sem" },
        { label: "zone", value: "Avignon & alentours" },
        { label: "permis", value: "B + véhicule" }
      ]
    },
    terminal: {
      title: "alexi@srv-dmz: ~ · tapez une commande",
      hint: "// tapez `help` ou cliquez un bouton ↓",
      tryLabel: "Essayez :",
      initialCmd: "whoami",
      initialOut: "alexi · L3 CERI · stagiaire adminsys @ SBI",
      inputAria: "Terminal du portfolio : tapez une commande, par exemple help",
      notFound: (cmd: string) => "bash: " + cmd + " : commande introuvable, essayez `help`",
      responses: {
        "help": "commandes : whoami · stage · alternance · projets · cv · contact · systemctl status alexi · clear",
        "whoami": "alexi · L3 CERI Avignon · stagiaire adminsys @ SBI Informatique",
        "stage": "SBI Informatique (mai à août 2026, prolongé par avenant)\nphase 1 · projets :\n> maquette réseau PME GNS3 (VLANs, DMZ, OPNsense)\n> mur Grafana 6 écrans (Atera, KPAX, Veeam)\nphase 2 · au quotidien :\n> tickets & support client via Atera, parc impression KPAX\n> pare-feux OPNsense / pfSense / Stormshield\n> Windows Server 2022, interventions sur site",
        "projets": "→ direction la section Projets…",
        "projects": "→ direction la section Projets…",
        "cv": "→ ouverture du CV…",
        "contact": "alexim13550@gmail.com · linkedin.com/in/alexi-miaille-baba88333",
        "alternance": "master SYRIUS · dès sept 2026 · rythme 2 sem école / 2 sem entreprise\nzone : Avignon & alentours · permis B + véhicule\ncôté employeur : aide à l'embauche 5 000 € (PME), formation financée par l'OPCO\n→ alexim13550@gmail.com",
        "systemctl status alexi": "● alexi.service - étudiant réseaux & systèmes\n   Loaded: loaded (CERI Avignon, L3)\n   Active: active (running) depuis mai 2026 · stage SBI\n   Next: master SYRIUS sept 2026, cherche l'alternance\n→ alexim13550@gmail.com",
        "ls": "stage/  projets/  cv.pdf  contact.txt"
      } as Record<string, string>
    },
    journey: {
      label: "01 // Parcours",
      title1: "Du cours",
      title2: "au terrain.",
      internDate: "Mai à Août 2026 · En cours · Prolongé par avenant",
      internTitle: "Stage Adminsys & Réseau chez SBI Informatique",
      internSub: "Avignon Agroparc · prestataire IT & sécurité multi-clients",
      internStory: "Recruté au départ pour des projets, puis ",
      internStoryHighlight: "prolongé parce que l'équipe avait besoin de renfort",
      internStoryEnd: " : depuis, je travaille sur le terrain au même rythme que les techniciens.",
      phase1: "Phase 1",
      phase1Label: "Projets",
      phase1Items: [
        "Maquette réseau PME complète sous GNS3 : VLANs, DMZ, OPNsense, ACLs Cisco",
        "Mur de supervision Grafana 6 écrans : scripts Bash sur les API Atera, KPAX et Veeam"
      ],
      phase2: "Phase 2",
      phase2Label: "Le quotidien avec l'équipe",
      phase2Items: [
        "Tickets et support client au quotidien via Atera, parc d'impression avec KPAX",
        "Interventions sur site : passerelles, plans d'adressage, Windows Server 2022, accès RDS",
        "Pare-feux en environnement réel : OPNsense, pfSense, découverte de Stormshield",
        "Déploiement de postes : agent Atera, Bitdefender, Microsoft 365 Business"
      ],
      internChips: ["Atera", "OPNsense", "Windows Server", "Stormshield", "KPAX", "Proxmox"],
      degreeDate: "2023 à 2026",
      degreeTitle: "Licence Informatique au CERI Avignon",
      degreeSub: "CCNA1 · projets réseau & dev (Mbox, CeriCar, monitoring…)",
      masterDate: "Sept 2026 · Accepté ✓",
      masterTitle: "Master SYRIUS · Réseaux & Cybersécurité",
      masterSub: "Admission validée, il ne me manque que l'entreprise d'alternance"
    },
    skills: {
      label: "02 // Stack",
      title1: "Compétences",
      title2: "_Techniques",
      legendHot: "Pratiqué en stage / production",
      legendBase: "Acquis en cours & projets perso",
      categories: [
        {
          icon: "shield",
          name: "Réseaux & Sécurité",
          origin: "// cœur de cible",
          items: [
            { name: "OPNsense", hot: true }, { name: "pfSense", hot: true },
            { name: "VLAN / ACL Cisco", hot: true }, { name: "NAT / Port Forward", hot: true },
            { name: "Cisco CCNA1", hot: false }, { name: "DMZ / segmentation", hot: false },
            { name: "VPN", hot: false }, { name: "Stormshield (init.)", hot: false }
          ]
        },
        {
          icon: "server",
          name: "Systèmes & Virtualisation",
          origin: "// serveurs & hyperviseurs",
          items: [
            { name: "Proxmox", hot: true }, { name: "Windows Server 2022", hot: true },
            { name: "RDS", hot: true }, { name: "Ubuntu Server", hot: false },
            { name: "Nginx", hot: false }, { name: "GNS3", hot: false }, { name: "Netplan", hot: false }
          ]
        },
        {
          icon: "monitor",
          name: "Supervision & Outils MSP",
          origin: "// environnement prestataire IT",
          items: [
            { name: "Grafana", hot: true }, { name: "Atera (API)", hot: true },
            { name: "Veeam", hot: true }, { name: "KPAX", hot: true },
            { name: "Bitdefender", hot: false }, { name: "Microsoft 365", hot: false },
            { name: "Ticketing", hot: false }
          ]
        },
        {
          icon: "code",
          name: "Développement & Scripting",
          origin: "// automatiser, intégrer",
          items: [
            { name: "Bash", hot: true }, { name: "Python", hot: false },
            { name: "PHP", hot: false }, { name: "Java", hot: false },
            { name: "PostgreSQL", hot: false }, { name: "React / TS", hot: false }, { name: "Git", hot: false }
          ]
        }
      ]
    },
    projects: {
      label: "03 // Travaux",
      title1: "Projets",
      title2: "_Sélectionnés",
      featuredTag: "★ Projet phare",
      viewOnGithub: "Voir sur GitHub",
      readReport: "Lire le rapport",
      readNetworkReport: "Lire le rapport réseau",
      diagramCaption: "Trajet d'une requête web dans la maquette",
      diagram: {
        aria: "Topologie de la maquette : Internet, pare-feu OPNsense, LAN avec switch L3 et VLANs, DMZ avec serveur Ubuntu nginx",
        internet: "Le monde extérieur : la requête du visiteur arrive par le WAN",
        opnsense: "OPNsense : NAT, filtrage, isolation de la DMZ",
        switchL3: "Switch L3 Cisco : routage inter-VLAN et ACLs",
        dmz: "Serveur Ubuntu en DMZ : nginx sert le portfolio"
      },
      mboxCaption: "Interface réelle du projet",
      nextProject: "Prochain projet\nen cours de build…",
      gns3: {
        category: "Infrastructure & Sécurité",
        title: "Réseau PME : DMZ & publication web",
        desc: "J'ai monté une infrastructure PME complète sous GNS3 : switch L3 Cisco pour les VLANs, le routage et les ACLs, pare-feu OPNsense pour le NAT et l'isolation de la DMZ, serveur Ubuntu avec Nginx pour héberger ce portfolio. Le tout validé par 33 tests, avec des règles anti-pivot pour bloquer tout rebond depuis la DMZ vers le LAN.",
        tech: ["OPNsense", "Cisco L3", "VLAN/ACL", "DMZ", "NAT", "Nginx"]
      },
      mbox: {
        category: "Réseau & Infrastructure",
        title: "Mbox, box Internet virtualisée",
        desc: "Mon plus gros projet de licence : recréer une box Internet de A à Z, avec son interface d'administration (4 mois, environ 2000 lignes de PHP et Bash). Architecture 3 VMs en double NAT et 7 services réseau configurés et pilotés depuis l'interface : Apache/HTTPS, BIND9, DHCP, Postfix, FTP, MariaDB, SSH. Avec modes débutant/expert, webmail et speedtest.",
        tech: ["PHP", "Bash", "BIND9 / DNS", "DHCP", "Postfix", "Linux"]
      },
      grafana: {
        category: "Supervision · réalisé chez SBI",
        title: "Mur Grafana 6 écrans",
        desc: "Six écrans qui affichent l'état du parc en temps réel : mes scripts Bash interrogent les API Atera (tickets, alertes), KPAX (imprimantes) et Veeam (sauvegardes), et alimentent Grafana en JSON.",
        tech: ["Grafana", "Bash", "API", "Veeam"]
      },
      cericar: {
        category: "Web Application",
        title: "CeriCar, covoiturage",
        desc: "Un BlaBlaCar étudiant monté en binôme avec Yii2 et PostgreSQL : recherche AJAX, réservations, profils conducteurs et passagers, gestion des rôles.",
        tech: ["Yii2", "PHP", "PostgreSQL", "Bootstrap"]
      },
      ams: {
        category: "Ops & Monitoring",
        title: "AdminMonitoring System",
        desc: "Surveillance temps réel CPU, RAM et disque avec interface web Flask. Projet solo, mon premier pas vers la supervision.",
        tech: ["Python", "Flask", "Linux"]
      },
      geodex: {
        category: "Web Development",
        title: "GéoDex, collection",
        desc: "Un site de collection de pierres en PHP natif, sans framework : authentification, profils utilisateurs, back-office admin et tout le CRUD écrit à la main sur PostgreSQL. En binôme.",
        tech: ["PHP", "PostgreSQL", "HTML/CSS"]
      },
      java: {
        category: "Application Java",
        title: "Ma Supérette du Net",
        desc: "Une supérette à gérer en Java Swing : fournisseurs, stocks, ventes et tableaux de bord. Architecture MVC sur PostgreSQL, monté en binôme.",
        tech: ["Java", "PostgreSQL", "Swing"]
      }
    },
    contact: {
      title: "Contactez-moi",
      subtitle: "Alternance Sept 2026 // Réseau • Cybersécurité • Infra",
      employerNote: "Côté employeur : aide à l'embauche 5 000 € (entreprise de moins de 250 salariés) · formation financée par l'OPCO",
      cta: "Envoyer un email",
      downloadCV: "Télécharger CV"
    },
    footer: {
      copyright: "© 2026 // ALEXI_MIAILLE",
      uptime: "$ uptime · v4.0 · nginx · vps"
    },
    notFound: {
      msg: "$ bash: page: commande introuvable",
      sub: "// la route demandée n'existe pas sur ce serveur",
      back: "cd ~/accueil"
    },
    a11y: {
      openMenu: "Ouvrir le menu",
      closeMenu: "Fermer le menu",
      switchLang: "Switch to English",
      close: "Fermer"
    }
  },
  en: {
    nav: {
      about: "Profile",
      journey: "Journey",
      skills: "Stack",
      projects: "Projects",
      contact: "Contact"
    },
    hero: {
      status: "Intern @ SBI Informatique · Work-study Sept 2026",
      title1: "Networks",
      title2: "& Systems.",
      description: "Computer science student (year 3) at CERI, Avignon University, currently interning in ",
      descriptionHighlight: "systems administration, networking and cybersecurity",
      descriptionEnd: " at SBI Informatique. What I enjoy: taking an infrastructure apart end to end and locking it down, with proper docs to show for it.",
      cta: "See my projects",
      facts: [
        { label: "start", value: "Sept 2026" },
        { label: "pace", value: "2 wks / 2 wks" },
        { label: "area", value: "Avignon area" },
        { label: "license", value: "B + car" }
      ]
    },
    terminal: {
      title: "alexi@srv-dmz: ~ · type a command",
      hint: "// type `help` or click a button ↓",
      tryLabel: "Try:",
      initialCmd: "whoami",
      initialOut: "alexi · CS student · sysadmin intern @ SBI",
      inputAria: "Portfolio terminal: type a command, for example help",
      notFound: (cmd: string) => "bash: " + cmd + ": command not found, try `help`",
      responses: {
        "help": "commands: whoami · stage · alternance · projects · cv · contact · systemctl status alexi · clear",
        "whoami": "alexi · CS student at CERI Avignon · sysadmin intern @ SBI Informatique",
        "stage": "SBI Informatique (May to August 2026, internship extended)\nphase 1 · projects:\n> full SMB network lab in GNS3 (VLANs, DMZ, OPNsense)\n> 6-screen Grafana wall (Atera, KPAX, Veeam)\nphase 2 · operations:\n> daily client tickets & support via Atera, KPAX printer fleet\n> firewalls: OPNsense / pfSense / Stormshield\n> Windows Server 2022, on-site interventions",
        "projects": "→ heading to the Projects section…",
        "projets": "→ heading to the Projects section…",
        "cv": "→ opening the resume…",
        "contact": "alexim13550@gmail.com · linkedin.com/in/alexi-miaille-baba88333",
        "alternance": "SYRIUS Master's · from Sept 2026 · 2 wks school / 2 wks company\narea: Avignon & surroundings · driving license + car\nfor employers (France): €5,000 hiring aid (SMBs), training funded by OPCO\n→ alexim13550@gmail.com",
        "systemctl status alexi": "● alexi.service - networks & systems student\n   Loaded: loaded (CERI Avignon, BSc)\n   Active: active (running) since May 2026 · SBI internship\n   Next: SYRIUS Master Sept 2026, looking for a work-study\n→ alexim13550@gmail.com",
        "ls": "internship/  projects/  resume.pdf  contact.txt"
      } as Record<string, string>
    },
    journey: {
      label: "01 // Journey",
      title1: "From class",
      title2: "to the field.",
      internDate: "May to August 2026 · Ongoing · Internship extended",
      internTitle: "Sysadmin & Network intern at SBI Informatique",
      internSub: "Avignon Agroparc · multi-client IT & security provider",
      internStory: "Initially hired for projects, then ",
      internStoryHighlight: "extended because the team needed backup",
      internStoryEnd: ": since then I have been working in the field at the same pace as the technicians.",
      phase1: "Phase 1",
      phase1Label: "Projects",
      phase1Items: [
        "Full SMB network lab in GNS3: VLANs, DMZ, OPNsense, Cisco ACLs",
        "6-screen Grafana supervision wall: Bash scripts querying the Atera, KPAX and Veeam APIs"
      ],
      phase2: "Phase 2",
      phase2Label: "Day to day with the team",
      phase2Items: [
        "Daily client tickets and support through Atera, printer fleet with KPAX",
        "On-site interventions: gateways, IP addressing plans, Windows Server 2022, RDS access",
        "Firewalls in production: OPNsense, pfSense, first steps with Stormshield",
        "Workstation deployment: Atera agent, Bitdefender, Microsoft 365 Business"
      ],
      internChips: ["Atera", "OPNsense", "Windows Server", "Stormshield", "KPAX", "Proxmox"],
      degreeDate: "2023 to 2026",
      degreeTitle: "BSc Computer Science at CERI Avignon",
      degreeSub: "CCNA1 · network & dev projects (Mbox, CeriCar, monitoring…)",
      masterDate: "Sept 2026 · Accepted ✓",
      masterTitle: "SYRIUS Master's · Networks & Cybersecurity",
      masterSub: "Admission confirmed, all I need now is the work-study company"
    },
    skills: {
      label: "02 // Stack",
      title1: "Technical",
      title2: "_Skills",
      legendHot: "Practiced during internship / production",
      legendBase: "Learned in class & personal projects",
      categories: [
        {
          icon: "shield",
          name: "Networks & Security",
          origin: "// main focus",
          items: [
            { name: "OPNsense", hot: true }, { name: "pfSense", hot: true },
            { name: "VLAN / Cisco ACL", hot: true }, { name: "NAT / Port Forward", hot: true },
            { name: "Cisco CCNA1", hot: false }, { name: "DMZ / segmentation", hot: false },
            { name: "VPN", hot: false }, { name: "Stormshield (intro)", hot: false }
          ]
        },
        {
          icon: "server",
          name: "Systems & Virtualization",
          origin: "// servers & hypervisors",
          items: [
            { name: "Proxmox", hot: true }, { name: "Windows Server 2022", hot: true },
            { name: "RDS", hot: true }, { name: "Ubuntu Server", hot: false },
            { name: "Nginx", hot: false }, { name: "GNS3", hot: false }, { name: "Netplan", hot: false }
          ]
        },
        {
          icon: "monitor",
          name: "Monitoring & MSP Tools",
          origin: "// IT provider environment",
          items: [
            { name: "Grafana", hot: true }, { name: "Atera (API)", hot: true },
            { name: "Veeam", hot: true }, { name: "KPAX", hot: true },
            { name: "Bitdefender", hot: false }, { name: "Microsoft 365", hot: false },
            { name: "Ticketing", hot: false }
          ]
        },
        {
          icon: "code",
          name: "Development & Scripting",
          origin: "// automate, integrate",
          items: [
            { name: "Bash", hot: true }, { name: "Python", hot: false },
            { name: "PHP", hot: false }, { name: "Java", hot: false },
            { name: "PostgreSQL", hot: false }, { name: "React / TS", hot: false }, { name: "Git", hot: false }
          ]
        }
      ]
    },
    projects: {
      label: "03 // Works",
      title1: "Selected",
      title2: "_Projects",
      featuredTag: "★ Featured project",
      viewOnGithub: "View on GitHub",
      readReport: "Read the report",
      readNetworkReport: "Read the network report",
      diagramCaption: "Path of a web request through the lab",
      diagram: {
        aria: "Lab topology: Internet, OPNsense firewall, LAN with L3 switch and VLANs, DMZ with Ubuntu nginx server",
        internet: "The outside world: the visitor's request comes in through the WAN",
        opnsense: "OPNsense: NAT, filtering, DMZ isolation",
        switchL3: "Cisco L3 switch: inter-VLAN routing and ACLs",
        dmz: "Ubuntu server in the DMZ: nginx serves the portfolio"
      },
      mboxCaption: "Actual project interface",
      nextProject: "Next project\ncurrently building…",
      gns3: {
        category: "Infrastructure & Security",
        title: "SMB network: DMZ & web publishing",
        desc: "I built a complete SMB infrastructure in GNS3: a Cisco L3 switch for VLANs, routing and ACLs, an OPNsense firewall for NAT and DMZ isolation, and an Ubuntu server running Nginx to host this very portfolio. Validated by 33 tests, with anti-pivot rules blocking any bounce from the DMZ to the LAN.",
        tech: ["OPNsense", "Cisco L3", "VLAN/ACL", "DMZ", "NAT", "Nginx"]
      },
      mbox: {
        category: "Network & Infrastructure",
        title: "Mbox, virtualized Internet box",
        desc: "My biggest degree project: recreating an Internet box from scratch, with its admin interface (4 months, around 2000 lines of PHP and Bash). 3-VM architecture behind double NAT and 7 network services configured and managed from the interface: Apache/HTTPS, BIND9, DHCP, Postfix, FTP, MariaDB, SSH. With beginner/expert modes, webmail and speedtest.",
        tech: ["PHP", "Bash", "BIND9 / DNS", "DHCP", "Postfix", "Linux"]
      },
      grafana: {
        category: "Monitoring · built at SBI",
        title: "6-screen Grafana wall",
        desc: "Six screens showing the fleet status in real time: my Bash scripts query the Atera (tickets, alerts), KPAX (printers) and Veeam (backups) APIs and feed Grafana with JSON.",
        tech: ["Grafana", "Bash", "API", "Veeam"]
      },
      cericar: {
        category: "Web Application",
        title: "CeriCar, ridesharing",
        desc: "A student BlaBlaCar built in a pair with Yii2 and PostgreSQL: AJAX search, bookings, driver and passenger profiles, role management.",
        tech: ["Yii2", "PHP", "PostgreSQL", "Bootstrap"]
      },
      ams: {
        category: "Ops & Monitoring",
        title: "AdminMonitoring System",
        desc: "Real-time CPU, RAM and disk monitoring with a Flask web interface. Solo project, my first step into supervision.",
        tech: ["Python", "Flask", "Linux"]
      },
      geodex: {
        category: "Web Development",
        title: "GéoDex, collection",
        desc: "A stone collection site in plain PHP, no framework: authentication, user profiles, admin back-office and all the CRUD written by hand on PostgreSQL. Pair project.",
        tech: ["PHP", "PostgreSQL", "HTML/CSS"]
      },
      java: {
        category: "Java Application",
        title: "My Online Grocery",
        desc: "A grocery store to run in Java Swing: suppliers, inventory, sales and dashboards. MVC architecture on PostgreSQL, built in a pair.",
        tech: ["Java", "PostgreSQL", "Swing"]
      }
    },
    contact: {
      title: "Contact me",
      subtitle: "Work-study Sept 2026 // Network • Cybersecurity • Infra",
      employerNote: "For employers (France): €5,000 hiring aid (companies under 250 employees) · training funded by OPCO",
      cta: "Send an email",
      downloadCV: "Download resume"
    },
    footer: {
      copyright: "© 2026 // ALEXI_MIAILLE",
      uptime: "$ uptime · v4.0 · nginx · vps"
    },
    notFound: {
      msg: "$ bash: page: command not found",
      sub: "// the requested route does not exist on this server",
      back: "cd ~/home"
    },
    a11y: {
      openMenu: "Open menu",
      closeMenu: "Close menu",
      switchLang: "Passer en français",
      close: "Close"
    }
  }
};

export type Language = 'fr' | 'en';
export type Translations = typeof translations.fr;
