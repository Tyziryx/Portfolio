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
      status: "Alternance @ COMAITE · Master SYRIUS",
      title1: "Réseaux",
      title2: "& Systèmes.",
      description: "Étudiant en Master SYRIUS au CERI d'Avignon, en alternance ",
      descriptionHighlight: "systèmes et réseaux",
      descriptionEnd: " chez COMAITE, hébergeur web et e-commerce à Vedène. Ce qui me plaît : décortiquer une infra de bout en bout et la sécuriser, avec une doc propre derrière.",
      cta: "Voir mes projets",
      facts: [
        { label: "alternance", value: "COMAITE" },
        { label: "formation", value: "Master SYRIUS" },
        { label: "rythme", value: "2 sem / 2 sem" },
        { label: "zone", value: "Avignon & alentours" }
      ]
    },
    terminal: {
      title: "alexi@srv-dmz: ~ · tapez une commande",
      hint: "// tapez `help` ou cliquez un bouton ↓",
      tryLabel: "Essayez :",
      initialCmd: "whoami",
      initialOut: "alexi · master SYRIUS · alternant sys & réseaux @ COMAITE",
      inputAria: "Terminal du portfolio : tapez une commande, par exemple help",
      notFound: (cmd: string) => "bash: " + cmd + " : commande introuvable, essayez `help`",
      responses: {
        "help": "commandes : whoami · stage · alternance · projets · cv · contact · systemctl status alexi · clear",
        "whoami": "alexi · master SYRIUS CERI Avignon · alternant sys & réseaux @ COMAITE",
        "stage": "SBI Informatique (mai à août 2026, terminé · prolongé par avenant)\nphase 1 · projets :\n> maquette réseau PME GNS3 (VLANs, DMZ, OPNsense)\n> mur Grafana 6 écrans (Atera, KPAX, Veeam, Bitdefender)\nphase 2 · le quotidien avec l'équipe :\n> tickets & support client via Atera, parc impression KPAX\n> pare-feux OPNsense / pfSense / Stormshield\n> Windows Server 2022, interventions sur site",
        "projets": "→ direction la section Projets…",
        "projects": "→ direction la section Projets…",
        "cv": "→ ouverture du CV…",
        "contact": "alexim13550@gmail.com · linkedin.com/in/alexi-miaille-baba88333",
        "alternance": "COMAITE SARL · Vedène (84) · hébergeur web & e-commerce\nposte : alternant systèmes & réseaux\ncontrat : du 1er sept 2026 au 31 août 2028, toute la durée du master\nrythme : 2 sem au CERI / 2 sem en entreprise\n→ alexim13550@gmail.com",
        "systemctl status alexi": "● alexi.service - alternant réseaux & systèmes\n   Loaded: loaded (CERI Avignon, master SYRIUS)\n   Active: active (running) depuis sept 2026 · COMAITE\n  Process: stage SBI 2026 (code=exited, status=0/SUCCESS)\n     Next: diplôme master SYRIUS · août 2028\n→ alexim13550@gmail.com",
        "ls": "alternance/  stage/  projets/  cv.pdf  contact.txt"
      } as Record<string, string>
    },
    journey: {
      label: "01 // Parcours",
      title1: "Du cours",
      title2: "au terrain.",
      apprenticeDate: "Sept 2026 à Août 2028 · En cours",
      apprenticeTitle: "Alternance Systèmes & Réseaux chez COMAITE",
      apprenticeSub: "Vedène (84) · hébergeur web & e-commerce",
      apprenticeStory: "Contrat signé sur ",
      apprenticeStoryHighlight: "les deux années du master",
      apprenticeStoryEnd: ", en rythme 2 semaines au CERI puis 2 semaines en entreprise. Après le stage en prestation multi-clients chez SBI, je passe côté hébergeur : moins de parcs à gérer, plus de serveurs et de production web.",
      internDate: "Mai à Août 2026 · Terminé · Prolongé par avenant",
      internTitle: "Stage Adminsys & Réseau chez SBI Informatique",
      internSub: "Avignon Agroparc · prestataire IT & sécurité multi-clients",
      internStory: "Recruté au départ pour des projets, puis ",
      internStoryHighlight: "prolongé parce que l'équipe avait besoin de renfort",
      internStoryEnd: " : j'ai fini le stage sur le terrain, au même rythme que les techniciens.",
      phase1: "Phase 1",
      phase1Label: "Projets",
      phase1Items: [
        "Maquette réseau PME complète sous GNS3 : VLANs, DMZ, OPNsense, ACLs Cisco",
        "Mur de supervision Grafana 6 écrans : scripts Bash sur les API Atera, KPAX, Veeam et Bitdefender"
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
      masterDate: "Sept 2026 à 2028 · En cours",
      masterTitle: "Master SYRIUS · Réseaux & Cybersécurité",
      masterSub: "CERI Avignon · deux ans en alternance, dans la continuité de la licence"
    },
    skills: {
      label: "02 // Stack",
      title1: "Compétences",
      title2: "_Techniques",
      legendHot: "Pratiqué en entreprise · stage & alternance",
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
      diagramCaption: "Trois flux : requête web, sortie LAN, pivot refusé",
      diagram: {
        aria: "Topologie animée de la maquette : une requête web entre par le WAN, traverse le pare-feu OPNsense et atteint le serveur nginx en DMZ ; un poste du LAN sort vers Internet via le switch L3 puis le pare-feu ; une tentative de rebond depuis la DMZ vers le LAN est arrêtée par la règle anti-pivot.",
        internet: "Le monde extérieur : la requête du visiteur arrive par le WAN",
        opnsense: "OPNsense : NAT, filtrage, isolation de la DMZ",
        switchL3: "Switch L3 Cisco : routage inter-VLAN et ACLs",
        dmz: "Serveur Ubuntu en DMZ : nginx sert le portfolio",
        deny: "Règle anti-pivot : depuis la DMZ, aucun paquet ne peut atteindre le LAN"
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
        desc: "Six écrans qui affichent l'état du parc en temps réel, un écran par source : trois pour Atera (tickets, alertes, parc), un pour Veeam (sauvegardes), un pour KPAX (imprimantes), un pour Bitdefender (protection des postes). Mes scripts Bash interrogent les API et alimentent Grafana en JSON.",
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
      subtitle: "Alternance en cours // Réseau • Cybersécurité • Infra",
      cta: "Envoyer un email",
      downloadCV: "Télécharger CV"
    },
    footer: {
      copyright: "© 2026 // ALEXI_MIAILLE",
      uptime: "$ uptime · v4.1 · nginx · vps"
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
      status: "Apprentice @ COMAITE · SYRIUS Master's",
      title1: "Networks",
      title2: "& Systems.",
      description: "Master's student in the SYRIUS program at CERI, Avignon University, working as an apprentice in ",
      descriptionHighlight: "systems and networking",
      descriptionEnd: " at COMAITE, a web and e-commerce hosting provider in Vedène. What I enjoy: taking an infrastructure apart end to end and locking it down, with proper docs to show for it.",
      cta: "See my projects",
      facts: [
        { label: "employer", value: "COMAITE" },
        { label: "program", value: "SYRIUS Master's" },
        { label: "pace", value: "2 wks / 2 wks" },
        { label: "area", value: "Avignon area" }
      ]
    },
    terminal: {
      title: "alexi@srv-dmz: ~ · type a command",
      hint: "// type `help` or click a button ↓",
      tryLabel: "Try:",
      initialCmd: "whoami",
      initialOut: "alexi · SYRIUS master's · sys & network apprentice @ COMAITE",
      inputAria: "Portfolio terminal: type a command, for example help",
      notFound: (cmd: string) => "bash: " + cmd + ": command not found, try `help`",
      responses: {
        "help": "commands: whoami · stage · alternance · projects · cv · contact · systemctl status alexi · clear",
        "whoami": "alexi · SYRIUS master's at CERI Avignon · sys & network apprentice @ COMAITE",
        "stage": "SBI Informatique (May to August 2026, completed · contract extended)\nphase 1 · projects:\n> full SMB network lab in GNS3 (VLANs, DMZ, OPNsense)\n> 6-screen Grafana wall (Atera, KPAX, Veeam, Bitdefender)\nphase 2 · day to day with the team:\n> daily client tickets & support via Atera, KPAX printer fleet\n> firewalls: OPNsense / pfSense / Stormshield\n> Windows Server 2022, on-site interventions",
        "projects": "→ heading to the Projects section…",
        "projets": "→ heading to the Projects section…",
        "cv": "→ opening the resume…",
        "contact": "alexim13550@gmail.com · linkedin.com/in/alexi-miaille-baba88333",
        "alternance": "COMAITE SARL · Vedène, Vaucluse · web & e-commerce hosting\nrole: systems & network apprentice\ncontract: 1 Sept 2026 to 31 Aug 2028, the full length of the master's\npace: 2 wks at CERI / 2 wks at the company\n→ alexim13550@gmail.com",
        "systemctl status alexi": "● alexi.service - networks & systems apprentice\n   Loaded: loaded (CERI Avignon, SYRIUS master's)\n   Active: active (running) since Sept 2026 · COMAITE\n  Process: SBI internship 2026 (code=exited, status=0/SUCCESS)\n     Next: SYRIUS master's degree · Aug 2028\n→ alexim13550@gmail.com",
        "ls": "apprenticeship/  internship/  projects/  resume.pdf"
      } as Record<string, string>
    },
    journey: {
      label: "01 // Journey",
      title1: "From class",
      title2: "to the field.",
      apprenticeDate: "Sept 2026 to Aug 2028 · Ongoing",
      apprenticeTitle: "Systems & Network apprentice at COMAITE",
      apprenticeSub: "Vedène, Vaucluse · web & e-commerce hosting",
      apprenticeStory: "Signed for ",
      apprenticeStoryHighlight: "the full two years of the master's",
      apprenticeStoryEnd: ", alternating 2 weeks at CERI and 2 weeks at the company. After the internship on the multi-client provider side at SBI, I am moving to the hosting side: fewer client fleets to look after, more servers and live web production.",
      internDate: "May to August 2026 · Completed · Contract extended",
      internTitle: "Sysadmin & Network intern at SBI Informatique",
      internSub: "Avignon Agroparc · multi-client IT & security provider",
      internStory: "Initially hired for projects, then ",
      internStoryHighlight: "extended because the team needed backup",
      internStoryEnd: ": I finished the internship out in the field, at the same pace as the technicians.",
      phase1: "Phase 1",
      phase1Label: "Projects",
      phase1Items: [
        "Full SMB network lab in GNS3: VLANs, DMZ, OPNsense, Cisco ACLs",
        "6-screen Grafana supervision wall: Bash scripts querying the Atera, KPAX, Veeam and Bitdefender APIs"
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
      masterDate: "Sept 2026 to 2028 · In progress",
      masterTitle: "SYRIUS Master's · Networks & Cybersecurity",
      masterSub: "CERI Avignon · two years as an apprentice, straight on from the BSc"
    },
    skills: {
      label: "02 // Stack",
      title1: "Technical",
      title2: "_Skills",
      legendHot: "Practiced on the job · internship & apprenticeship",
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
      diagramCaption: "Three flows: web request, LAN egress, pivot denied",
      diagram: {
        aria: "Animated lab topology: a web request comes in through the WAN, crosses the OPNsense firewall and reaches the nginx server in the DMZ; a LAN workstation goes out to the Internet through the L3 switch and the firewall; an attempt to bounce from the DMZ to the LAN is stopped by the anti-pivot rule.",
        internet: "The outside world: the visitor's request comes in through the WAN",
        opnsense: "OPNsense: NAT, filtering, DMZ isolation",
        switchL3: "Cisco L3 switch: inter-VLAN routing and ACLs",
        dmz: "Ubuntu server in the DMZ: nginx serves the portfolio",
        deny: "Anti-pivot rule: from the DMZ, no packet can reach the LAN"
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
        desc: "Six screens showing the fleet status in real time, one screen per source: three for Atera (tickets, alerts, fleet), one for Veeam (backups), one for KPAX (printers), one for Bitdefender (endpoint protection). My Bash scripts query the APIs and feed Grafana with JSON.",
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
      subtitle: "Apprenticeship under way // Network • Cybersecurity • Infra",
      cta: "Send an email",
      downloadCV: "Download resume"
    },
    footer: {
      copyright: "© 2026 // ALEXI_MIAILLE",
      uptime: "$ uptime · v4.1 · nginx · vps"
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
