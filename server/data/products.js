export const categories = [
  { id: 'drones', label: 'Drones' },
  { id: 'composants', label: 'Composants' },
  { id: 'radiocommandes', label: 'Radiocommandes' }
]

export const products = [
  // Drones
  {
    id: 1,
    slug: 'explorer-kit',
    name: 'Explorer Kit',
    shortDescription: 'Kit drone complet pour débuter l\'exploration aérienne.',
    description: 'Le Explorer Kit est le drone idéal pour les pilotes débutants et intermédiaires. Livré pré-assemblé avec contrôleur de vol, ESC et moteurs, il offre une expérience de vol stable et intuitive. Son châssis en fibre de carbone garantit légèreté et robustesse.',
    price: 14900,
    images: ['/images/drones/drone-1.jpg', '/images/drones/drone-2.jpg', '/images/drones/drone-3.jpg'],
    category: 'drones',
    tags: ['kit', 'débutant', 'fpv', 'prêt à voler'],
    specs: [
      { label: 'Taille', value: '5 pouces' },
      { label: 'Poids', value: '250 g' },
      { label: 'Autonomie', value: '8 min' },
      { label: 'Moteurs', value: '2306 2450KV' },
      { label: 'Batterie', value: '4S 1300mAh' },
      { label: 'Contrôleur', value: 'F4 intégré' }
    ],
    inStock: true
  },
  {
    id: 2,
    slug: 'pro-racer',
    name: 'Pro Racer',
    shortDescription: 'Drone de course haute performance pour pilotes confirmés.',
    description: 'Le Pro Racer est conçu pour la compétition FPV. Châssis ultra-léger en carbone T700, moteurs haute vitesse et ESC 50A pour des accélérations fulgurantes. Atteignez des vitesses de plus de 160 km/h avec une agilité inégalée.',
    price: 29900,
    images: ['/images/drones/drone-4.jpg', '/images/drones/drone-5.jpg', '/images/drones/drone-6.jpg'],
    category: 'drones',
    tags: ['racing', 'compétition', 'fpv', 'haute performance'],
    specs: [
      { label: 'Taille', value: '5 pouces' },
      { label: 'Poids', value: '320 g' },
      { label: 'Vitesse max', value: '160 km/h' },
      { label: 'Moteurs', value: '2207 2750KV' },
      { label: 'Batterie', value: '6S 1100mAh' },
      { label: 'ESC', value: '50A BLHeli_32' }
    ],
    inStock: true
  },
  {
    id: 3,
    slug: 'nano-micro',
    name: 'Nano Micro',
    shortDescription: 'Micro drone d\'intérieur ultra-compact et agile.',
    description: 'Le Nano Micro est parfait pour le vol en intérieur et les espaces restreints. Avec ses protections d\'hélices intégrées et son poids plume de 30g, il est idéal pour s\'entraîner sans risque. Compatible avec les lunettes FPV standards.',
    price: 8900,
    images: ['/images/drones/drone-3.jpg', '/images/drones/drone-1.jpg'],
    category: 'drones',
    tags: ['micro', 'intérieur', 'whoop', 'débutant'],
    specs: [
      { label: 'Taille', value: '65mm' },
      { label: 'Poids', value: '30 g' },
      { label: 'Autonomie', value: '4 min' },
      { label: 'Moteurs', value: '0802 19000KV' },
      { label: 'Batterie', value: '1S 300mAh' },
      { label: 'Caméra', value: 'Nano FPV' }
    ],
    inStock: true
  },

  // Composants
  {
    id: 4,
    slug: 'esc-4en1',
    name: 'ESC 4-en-1',
    shortDescription: 'Contrôleur de vitesse 4-en-1 compact et puissant.',
    description: 'ESC 4-en-1 de dernière génération avec firmware BLHeli_32. Supporte jusqu\'à 45A en continu par moteur. Design compact qui simplifie le câblage et réduit le poids. Compatible 3-6S avec régulateur de tension intégré.',
    price: 4500,
    images: ['/images/drones/drone-4.jpg'],
    category: 'composants',
    tags: ['esc', 'électronique', 'blheli'],
    specs: [
      { label: 'Courant continu', value: '45A' },
      { label: 'Courant burst', value: '55A' },
      { label: 'Firmware', value: 'BLHeli_32' },
      { label: 'Tension', value: '3-6S LiPo' },
      { label: 'BEC', value: '5V / 3A' },
      { label: 'Poids', value: '8 g' }
    ],
    inStock: true
  },
  {
    id: 5,
    slug: 'pack-moteurs-2306',
    name: 'Pack Moteurs 2306',
    shortDescription: 'Lot de 4 moteurs brushless 2306 pour freestyle.',
    description: 'Pack de 4 moteurs brushless 2306 2450KV optimisés pour le freestyle et le vol longue portée. Aimants en arc N52H pour un couple maximal. Roulements japonais pour une durabilité accrue. Arbre en titane de 5mm.',
    price: 3500,
    images: ['/images/drones/drone-5.jpg'],
    category: 'composants',
    tags: ['moteurs', 'brushless', '2306'],
    specs: [
      { label: 'Taille', value: '2306' },
      { label: 'KV', value: '2450' },
      { label: 'Poids', value: '33 g / moteur' },
      { label: 'Aimants', value: 'N52H arc' },
      { label: 'Arbre', value: 'Titane 5mm' },
      { label: 'Tension', value: '4-6S' }
    ],
    inStock: true
  },
  {
    id: 6,
    slug: 'frame-3d-carbon',
    name: 'Frame 3D Carbon',
    shortDescription: 'Châssis 5 pouces imprimé 3D et carbone.',
    description: 'Châssis hybride combinant plaques carbone découpées CNC et pièces imprimées en 3D (TPU). Design modulaire permettant de remplacer facilement les bras endommagés. Espace optimisé pour l\'électronique avec gestion de câbles intégrée.',
    price: 2500,
    images: ['/images/drones/drone-2.jpg'],
    category: 'composants',
    tags: ['frame', 'châssis', '3d', 'carbone'],
    specs: [
      { label: 'Taille', value: '5 pouces' },
      { label: 'Empattement', value: '220mm' },
      { label: 'Matériaux', value: 'Carbone + TPU' },
      { label: 'Épaisseur bras', value: '5mm' },
      { label: 'Poids', value: '95 g' },
      { label: 'Stack', value: '30.5x30.5mm' }
    ],
    inStock: false
  },
  {
    id: 7,
    slug: 'controleur-vol-f7',
    name: 'Contrôleur de Vol F7',
    shortDescription: 'FC haute performance avec processeur F7 et gyro intégré.',
    description: 'Contrôleur de vol basé sur le processeur STM32F722 avec gyroscope BMI270. Barometer intégré, OSD, blackbox sur flash 16Mo. 6 ports UART pour connecter GPS, récepteur, VTX et plus encore. Firmware Betaflight pré-installé.',
    price: 5500,
    images: ['/images/drones/drone-6.jpg'],
    category: 'composants',
    tags: ['fc', 'contrôleur', 'betaflight', 'f7'],
    specs: [
      { label: 'Processeur', value: 'STM32F722' },
      { label: 'Gyroscope', value: 'BMI270' },
      { label: 'UART', value: '6 ports' },
      { label: 'Flash', value: '16 Mo' },
      { label: 'OSD', value: 'AT7456E' },
      { label: 'Poids', value: '7 g' }
    ],
    inStock: true
  },

  // Radiocommandes
  {
    id: 8,
    slug: 'tx16-max',
    name: 'TX16 Max',
    shortDescription: 'Radiocommande haut de gamme multi-protocole.',
    description: 'La TX16 Max est une radiocommande polyvalente avec écran tactile couleur et gimbals Hall Effect de haute précision. Compatible avec tous les protocoles grâce au module multi-protocole intégré. Système EdgeTX pour une personnalisation totale.',
    price: 12900,
    images: ['/images/drones/drone-1.jpg', '/images/drones/drone-6.jpg'],
    category: 'radiocommandes',
    tags: ['radiocommande', 'edgetx', 'multi-protocole'],
    specs: [
      { label: 'Écran', value: '4.3" tactile couleur' },
      { label: 'Gimbals', value: 'Hall Effect AG01' },
      { label: 'Protocoles', value: 'Multi-protocole' },
      { label: 'Firmware', value: 'EdgeTX' },
      { label: 'Batterie', value: '2x 18650' },
      { label: 'Portée', value: '> 2 km' }
    ],
    inStock: true
  },
  {
    id: 9,
    slug: 'compact-lite',
    name: 'Compact Lite',
    shortDescription: 'Radiocommande compacte et légère pour le terrain.',
    description: 'La Compact Lite est idéale pour les pilotes qui veulent voyager léger. Format gamepad ergonomique, sticks amovibles et batterie intégrée rechargeable. Module ELRS intégré pour une liaison ultra-fiable à faible latence.',
    price: 7900,
    images: ['/images/drones/drone-3.jpg'],
    category: 'radiocommandes',
    tags: ['radiocommande', 'compact', 'elrs', 'portable'],
    specs: [
      { label: 'Format', value: 'Gamepad' },
      { label: 'Protocole', value: 'ELRS 2.4GHz' },
      { label: 'Portée', value: '> 5 km' },
      { label: 'Batterie', value: 'Li-Po 2000mAh' },
      { label: 'Autonomie', value: '8 heures' },
      { label: 'Poids', value: '280 g' }
    ],
    inStock: true
  },
  {
    id: 10,
    slug: 'module-elrs-nano',
    name: 'Module ELRS Nano',
    shortDescription: 'Module émetteur ELRS 2.4GHz nano pour toute radiocommande.',
    description: 'Module émetteur ExpressLRS nano compatible avec toutes les radiocommandes équipées d\'un bay nano. Protocole open-source offrant une latence de seulement 2ms et une portée de plus de 10km. Mise à jour OTA via WiFi intégrée.',
    price: 2900,
    images: ['/images/drones/drone-5.jpg'],
    category: 'radiocommandes',
    tags: ['elrs', 'module', 'nano', 'émetteur'],
    specs: [
      { label: 'Protocole', value: 'ELRS 2.4GHz' },
      { label: 'Puissance', value: '250mW max' },
      { label: 'Latence', value: '2 ms' },
      { label: 'Portée', value: '> 10 km' },
      { label: 'Mise à jour', value: 'WiFi OTA' },
      { label: 'Poids', value: '4 g' }
    ],
    inStock: true
  }
]
