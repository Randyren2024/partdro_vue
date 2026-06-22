// Partdro AgriTech Products Data
// Structured per Partdro categories

export interface Product {
  id: string
  code: string
  name: string
  nameCn: string
  description: string
  descriptionCn: string
  category: string
  categoryName: string
  features: string[]
  applications?: string[]
  specsGroups?: { title: string; specs: Record<string, string> }[]
  specifications: Record<string, string>
  image: string
  gallery?: string[]
  faqs?: { question: string; answer: string }[]
  inStock: boolean
  isBestSeller: boolean
  isNew: boolean
  tagline?: string
  whyReasons?: string[]
  learnMoreCards?: { title: string; description: string; image: string }[]
  isPartdro?: boolean
}

export const categories = [
  {
    id: 'consumer-drones',
    name: 'Consumer Drones',
    nameCn: '消费级无人机',
    description: 'High-performance drones for aerial photography, videography, and recreational flying',
    icon: 'consumer-drones'
  },
  {
    id: 'enterprise-drones',
    name: 'Enterprise Drones',
    nameCn: '行业级无人机',
    description: 'Professional UAV solutions for industrial inspection, surveying, mapping, and public safety',
    icon: 'enterprise-drones'
  },
  {
    id: 'agriculture-drones',
    name: 'Agricultural Drones',
    nameCn: '农业无人机',
    description: 'Smart spraying, seeding, and crop monitoring drones for precision agriculture',
    icon: 'agriculture-drones'
  },
  {
    id: 'drone-accessories',
    name: 'Drone Accessories',
    nameCn: '无人机配件',
    description: 'Batteries, propellers, controllers, cases, and essential drone gear',
    icon: 'drone-accessories'
  },
  {
    id: 'payloads-sensors',
    name: 'Payloads & Sensors',
    nameCn: '负载与传感器',
    description: 'Thermal cameras, LiDAR, multispectral sensors, and specialized payloads',
    icon: 'payloads-sensors'
  }
]

export const products: Product[] = [
  {
    id: 'lumenfly-mini',
    code: 'LM-MINI',
    name: 'Camera Drone',
    nameCn: 'Lumenfly Mini 摄影无人机',
    description: 'Sub-249g 4K camera drone with 3-axis gimbal, 40-min flight, and 12 km HD live transmission.',
    descriptionCn: '249 克以下 4K 摄影无人机，三轴机械增稳云台，40 分钟续航，12 公里高清图传。',
    category: 'consumer-drones',
    categoryName: 'Consumer Drones',
    tagline: 'Pocket-Size 4K Mini Drone Under 249g — Your Everyday Aerial Storyteller',
    image: '/images/lumenfly-mini/hero.jpg',
    gallery: [
      '/images/lumenfly-mini/hero.jpg',
      '/images/lumenfly-mini/one-tap-takeoff.jpg',
      '/images/lumenfly-mini/live-feed.jpg',
      '/images/lumenfly-mini/sony-sensor.jpg',
      '/images/lumenfly-mini/gimbal.jpg',
      '/images/lumenfly-mini/wind-resistance.jpg',
      '/images/lumenfly-mini/auto-track.jpg',
      '/images/lumenfly-mini/battery-life.jpg',
      '/images/lumenfly-mini/standard-kit.jpg',
      '/images/lumenfly-mini/fly-more-combo.jpg'
    ],
    features: [
      '4K/60FPS HDR',
      '48MP PHOTOS',
      '3-AXIS GIMBAL',
      '40-MIN FLIGHT',
      'SUB-249G',
      '12 KM HD LIVE'
    ],
    applications: [
      'Aerial Photography',
      'Travel Vlogging',
      'Hiking & Adventure',
      'Social Content Creation',
      'Cinematic Filmmaking',
      'Night & Time-lapse'
    ],
    whyReasons: [
      'Sub-249g ultra-light body — foldable to pocket size, no FAA registration required for recreational use',
      '1/2-inch Sony CMOS with 48MP photos and 4K/60fps HDR video — broadcast-grade image quality',
      '3-axis mechanical gimbal for cinematic smoothness — no electronic stabilization artifacts',
      '40-minute flight per battery, 120 minutes total with Fly More Combo — finish a full shoot',
      '12 km HD live transmission at 1080p/60fps — see exactly what the drone sees, in real time',
      'AI Auto Track keeps you centered hands-free, plus QuickShots for one-tap cinematic moves',
      'SR-Log flat color profile for pro color grading in post-production'
    ],
    learnMoreCards: [
      {
        title: 'One-Tap Takeoff & Landing',
        description: 'Beginner-friendly from the first flight. One-tap takeoff, one-tap return, and an intuitive on-screen interface that gets you in the air in under 60 seconds — no piloting experience required.',
        image: '/images/lumenfly-mini/one-tap-takeoff.jpg'
      },
      {
        title: 'See Farther. Fly Smarter.',
        description: 'SkyBridge HD transmission streams 1080p/60fps live view up to 12 km away, so you can frame the shot, scout the route, and bring the drone home with confidence — even when it is well beyond line of sight.',
        image: '/images/lumenfly-mini/live-feed.jpg'
      },
      {
        title: '1/2-inch Sony CMOS Sensor',
        description: 'A large 1/2-inch Sony sensor with f/1.7 aperture captures 48MP stills and 4K/60fps HDR video. High dynamic range preserves shadow detail and highlight roll-off in golden-hour and backlit scenes.',
        image: '/images/lumenfly-mini/sony-sensor.jpg'
      },
      {
        title: '3-Axis Mechanical Gimbal',
        description: 'A real mechanical gimbal — not electronic stabilization — keeps every frame steady through aggressive maneuvers, wind gusts, and high-speed flight. Cinematic smoothness, zero jello.',
        image: '/images/lumenfly-mini/gimbal.jpg'
      },
      {
        title: 'Level 5 Wind Resistance',
        description: 'Hold position and hold your shot in winds up to 15 m/s (Level 5). The Mini stays locked on subject even when coastal gusts, ridge winds, or thermal updrafts would shake a lesser drone.',
        image: '/images/lumenfly-mini/wind-resistance.jpg'
      },
      {
        title: 'Hands-Free Auto Track',
        description: 'AI subject tracking keeps you, your bike, your dog, or your group centered in frame — no follow-me beacon, no remote input required. Walk, ride, ski. The Mini does the flying.',
        image: '/images/lumenfly-mini/auto-track.jpg'
      }
    ],
    specsGroups: [
      {
        title: 'Camera',
        specs: {
          'Sensor': '1/2-inch Sony CMOS',
          'Max Photo Resolution': '48 MP',
          'Max Video Resolution': '4K / 60fps HDR',
          'Aperture': 'f/1.7',
          'Color Profile': 'SR-Log flat (8-bit)',
          'Vertical Video': '2.7K',
          'Gimbal': '3-axis mechanical',
          'Zoom': '4× digital in 1080p'
        }
      },
      {
        title: 'Flight Performance',
        specs: {
          'Max Flight Time': '40 min per battery',
          'Fly More Combo Total': '120 min (3 batteries)',
          'Wind Resistance': 'Level 5 — 15 m/s',
          'Operating Temperature': '-15°C to 40°C',
          'Max Takeoff Altitude': '5,000 m',
          'Max Speed': '19 m/s (Sport mode)'
        }
      },
      {
        title: 'Transmission',
        specs: {
          'Max Range': '12 km / 7.45 mi (FCC)',
          'Live View Quality': '1080p / 60fps',
          'Frequency': 'Dual-band 2.4 / 5.8 GHz',
          'Latency': '<120 ms'
        }
      },
      {
        title: 'Safety & Obstacle Sensing',
        specs: {
          'Forward Sensing': 'Yes',
          'Downward Sensing': 'Yes',
          'Auto Return-to-Home': 'Yes (GPS + low battery + signal loss)',
          'GPS': 'GPS + GLONASS + Galileo',
          'Geo-fencing': 'Yes'
        }
      },
      {
        title: 'Physical',
        specs: {
          'Takeoff Weight': '< 249 g (with battery & props)',
          'Folded Dimensions': '138 × 81 × 58 mm',
          'Unfolded Dimensions': '253 × 312 × 64 mm',
          'Storage': 'microSD up to 512 GB',
          'In the Box': 'Drone, RC, 1 battery, props, cables'
        }
      }
    ],
    specifications: {
      'Sensor': '1/2-inch Sony CMOS',
      'Max Photo': '48 MP',
      'Max Video': '4K / 60fps HDR',
      'Aperture': 'f/1.7',
      'Gimbal': '3-axis mechanical',
      'Color Profile': 'SR-Log flat',
      'Max Flight Time': '40 min',
      'Wind Resistance': 'Level 5 (15 m/s)',
      'Max Range': '12 km',
      'Live View': '1080p / 60fps',
      'Obstacle Sensing': 'Forward + Downward',
      'Takeoff Weight': '< 249 g'
    },
    faqs: [
      {
        question: 'Does the Lumenfly Mini require FAA registration?',
        answer: 'No. With a takeoff weight under 249 grams (including battery and propellers), the Mini falls below the FAA registration threshold for recreational use in the United States. Commercial pilots may still need a Part 107 license depending on use case — check your local regulations.'
      },
      {
        question: 'How long can the Mini fly on a single battery?',
        answer: 'Up to 40 minutes per battery under ideal conditions (no wind, hover, 25°C). Real-world flight with movement and wind typically yields 30–35 minutes. The Fly More Combo includes 3 batteries plus a charging hub for up to 120 minutes of total air time.'
      },
      {
        question: 'Can the Mini track me automatically?',
        answer: 'Yes. AI Auto Track keeps a person, vehicle, or pet centered in frame without any follow-me beacon or remote input. Simply tap the subject on screen and start moving — the Mini handles the flying while you focus on the activity.'
      },
      {
        question: 'Does it support time-lapse and panoramic shots?',
        answer: 'Yes. The Mini supports both Free Mode and CourseLock Mode time-lapse at 1080p, plus 180° wide-angle and 112° ultra-wide panoramic stitching. Combine with the 3-axis gimbal for buttery-smooth hyper-lapse footage.'
      },
      {
        question: 'What are QuickShots and how do they work?',
        answer: 'QuickShots are one-tap cinematic flight patterns: Lift, Loop, Twist, Vista, and Asteroid. Tap once on the subject, choose a pattern, and the Mini flies a pre-programmed maneuver while recording — perfect for social-ready clips with no piloting skill required.'
      },
      {
        question: 'Can I shoot at night?',
        answer: 'The Mini can shoot at night using standard exposure modes. There is no dedicated AI Night Mode, so for best low-light results we recommend flying manually, lowering shutter speed, and using ND filters to control motion blur.'
      },
      {
        question: 'Are third-party ND filters supported?',
        answer: 'Yes. The Mini accepts standard third-party ND filter sets (ND4 / ND8 / ND16 / ND32). ND filters are not included in the box and are sold separately.'
      },
      {
        question: 'Is the Mini waterproof?',
        answer: 'No. The Mini is not waterproof or weather-sealed. Do not fly in rain, snow, or fog. If the drone gets wet, power it off immediately, remove the battery, and contact support before attempting to fly again.'
      },
      {
        question: 'What is SR-Log and how do I use it?',
        answer: 'SR-Log is a flat color profile designed for professional post-production color grading. It captures maximum dynamic range with reduced in-camera contrast, giving you more latitude to push shadows, recover highlights, and match footage to other cameras. A free LUT pack is available for download from the Lumenfly support page.'
      },
      {
        question: 'What is the warranty and return policy?',
        answer: 'Every Mini ships with a 12-month manufacturing-defect warranty and a 30-day hassle-free return window. Lumenfly Care extends coverage to up to two accidental-damage replacements in 12 months with free round-trip shipping.'
      }
    ],
    inStock: true,
    isBestSeller: false,
    isNew: true
  }
]

export function getProductsByCategory(categoryId: string): Product[] {
  return products.filter(p => p.category === categoryId)
}

export function getProductById(productId: string): Product | undefined {
  return products.find(p => p.id === productId)
}

export function getBestSellers(): Product[] {
  return products.filter(p => p.isBestSeller)
}

export function getNewProducts(): Product[] {
  return products.filter(p => p.isNew)
}