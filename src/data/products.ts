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
  videos?: { src: string; poster?: string; title?: string; caption?: string }[]

  // Commerce fields (added for e-commerce functionality)
  /** Price in cents (分) to avoid floating-point issues. E.g., 19990 = $199.90 */
  price?: number
  /** Original/compare-at price in cents (for showing discounts) */
  compareAtPrice?: number
  /** Stock keeping unit for inventory tracking */
  sku?: string
  /** Current stock count (replaces boolean inStock for commerce) */
  stockCount?: number
  /** Product variants (e.g., different configurations/kits) */
  variants?: ProductVariant[]
  /** Weight in grams for shipping calculation */
  weightGrams?: number
  /** Dimensions in centimeters for shipping calculation */
  dimensionsCm?: { length: number; width: number; height: number }
  /** Shipping configuration overrides */
  shipping?: {
    /** Free shipping threshold in cents (e.g., 50000 = $500) */
    freeOver?: number
    /** Flat shipping rate in cents (e.g., 2500 = $25) */
    flatRate?: number
  }
}

/**
 * Product variant (e.g., different configurations/kits).
 */
export interface ProductVariant {
  id: string
  name: string
  /** Price modifier in cents (added to base product price) */
  priceModifier: number
  /** Stock count for this variant */
  stockCount: number
  /** Variant-specific features */
  features?: string[]
  /** Variant-specific image */
  image?: string
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
    isNew: true,

    // Commerce fields
    price: 59900, // $599.00 base price (Standard Kit)
    compareAtPrice: 69900, // $699.00 original price
    sku: 'LM-MINI-STD',
    stockCount: 50,
    variants: [
      {
        id: 'standard-kit',
        name: 'Standard Kit',
        priceModifier: 0, // Base price
        stockCount: 30,
        features: ['Drone', 'RC', '1 battery', 'props', 'cables'],
        image: '/images/lumenfly-mini/standard-kit.jpg'
      },
      {
        id: 'fly-more-combo',
        name: 'Fly More Combo',
        priceModifier: 20000, // +$200.00
        stockCount: 20,
        features: ['Drone', 'RC', '3 batteries', 'charging hub', 'propellers', 'carrying case', 'cables'],
        image: '/images/lumenfly-mini/fly-more-combo.jpg'
      }
    ],
    weightGrams: 249,
    dimensionsCm: { length: 13.8, width: 8.1, height: 5.8 },
    shipping: {
      freeOver: 50000, // Free shipping over $500
      flatRate: 2500 // $25 flat rate
    }
  },
  {
    id: 'mini-x',
    code: 'LM-MX',
    name: 'Mini X Camera Drone',
    nameCn: 'Mini X 摄影无人机',
    description: 'Lightweight foldable 4K camera drone with 3-directional obstacle avoidance and a screen-equipped remote.',
    descriptionCn: '轻巧可折叠 4K 摄影无人机，配备三向避障与带屏遥控器。',
    category: 'consumer-drones',
    categoryName: 'Consumer Drones',
    tagline: 'Lightweight Travel Companion — Capture the Extraordinary',
    image: '/images/mini-x/hero.jpg',
    gallery: [
      '/images/mini-x/hero.jpg',
      '/images/mini-x/feature-obstacle-avoidance.png',
      '/images/mini-x/feature-foldable-handheld.png',
      '/images/mini-x/feature-gimbal-closeup.png',
      '/images/mini-x/feature-camera.jpg',
      '/images/mini-x/feature-transmission.jpg',
      '/images/mini-x/feature-foldable.jpg',
      '/images/mini-x/feature-ai-track.jpg',
      '/images/mini-x/feature-toss-takeoff.jpg',
      '/images/mini-x/feature-sensing.jpg',
      '/images/mini-x/gallery-flight-controller.png',
      '/images/mini-x/gallery-snow-mountains.png',
      '/images/mini-x/gallery-folded-pedestals.png',
      '/images/mini-x/gallery-01.jpg',
      '/images/mini-x/gallery-02.jpg',
      '/images/mini-x/gallery-03.jpg',
      '/images/mini-x/gallery-04.jpg',
      '/images/mini-x/quickshot-rise.jpg',
      '/images/mini-x/quickshot-pull-away.jpg'
    ],
    features: [
      '4K/30fps',
      '48MP',
      '9KM RANGE',
      '3-DIR AVOIDANCE',
      '3-AXIS GIMBAL',
      'FOLDABLE'
    ],
    applications: [
      'Vlog & Social Content',
      'Travel Photography',
      'Indoor Flying',
      'Outdoor Adventure',
      'Action Sports',
      'Quick Creative Shots'
    ],
    whyReasons: [
      '3-directional obstacle avoidance — front + rear binocular vision plus downward ToF detect and brake around trees, walls, and people automatically',
      'Foldable 268 g body — palm-sized when folded, slips into a jacket pocket or day-bag without a dedicated case',
      'Built-in 5.5-inch 1080p screen on the remote — fly without your phone, see exactly what the camera sees even in direct sunlight',
      '9 km low-latency HD transmission at 5 GHz — keep the video feed stable well beyond visual line of sight',
      '4K/30fps video with 48 MP stills and a 3-axis mechanical gimbal — broadcast-grade footage without the bulk of a cinema rig',
      'AI QuickShots — one-tap cinematic moves (orbit, pull-away, rise, tail) for instant social-ready clips',
      'Toss-to-launch takeoff — no runway, no flat ground required, get airborne in a second from your hand'
    ],
    learnMoreCards: [
      {
        title: '3-Directional Obstacle Avoidance',
        description: 'Forward and rear binocular vision, plus a downward ToF sensor, detect obstacles up to 10 meters away. The Mini X brakes and reroutes around trees, walls, and people automatically — fly confidently through forest trails, indoor spaces, and crowded landmarks without second-guessing every maneuver.',
        image: '/images/mini-x/feature-obstacle-avoidance.png'
      },
      {
        title: 'Foldable, Pocket-Ready Body',
        description: 'Folded dimensions of just 153 × 87 × 73 mm — roughly the size of a sunglasses case. Toss it in a jacket pocket, a day-pack, or a small sling. The 268 g takeoff weight means most regions require no pilot registration.',
        image: '/images/mini-x/feature-foldable-handheld.png'
      },
      {
        title: '48 MP 4K Camera with 3-Axis Gimbal',
        description: 'A 1/2.3-inch CMOS sensor captures 48 MP stills and 4K UHD video at 30 fps. The 3-axis mechanical gimbal holds the horizon level through aggressive maneuvers, so every clip comes out smooth, level, and share-ready straight from the drone.',
        image: '/images/mini-x/feature-gimbal-closeup.png'
      },
      {
        title: '9 km HD Low-Latency Transmission',
        description: 'The 5 GHz WK-RCS Lite remote streams 1080p live view up to 9 km in open environments with sub-200 ms latency. Stay connected to the drone well beyond visual line of sight and frame shots that would be impossible to monitor on a phone screen.',
        image: '/images/mini-x/feature-transmission.jpg'
      },
      {
        title: 'AI QuickShots for One-Tap Cinematics',
        description: 'Choose from four pre-programmed flight patterns — orbit, pull-away, rise, and tail. The Mini X flies the shot itself, keeps the subject framed, and records a finished clip ready to drop into TikTok, Reels, or YouTube Shorts.',
        image: '/images/mini-x/quickshot-pull-away.jpg'
      },
      {
        title: 'Built-In Screen Remote, No Phone Needed',
        description: 'The WK-RCS Lite controller has a 5.5-inch 1080p 1100-nit display built in. Fly without mounting a phone, see the live feed even in direct sunlight, and run the whole flight on a single remote with 6 hours of battery life.',
        image: '/images/mini-x/feature-camera.jpg'
      }
    ],
    specsGroups: [
      {
        title: 'Aircraft',
        specs: {
          'Diagonal Wheelbase': '271 mm',
          'Dimensions (Unfolded)': '181 × 246 × 73 mm',
          'Dimensions (Folded)': '153 × 87 × 73 mm',
          'Takeoff Weight': '268 g',
          'Max Ascent Speed': '5 m/s',
          'Max Descent Speed': '5 m/s',
          'Max Horizontal Speed': '15 m/s',
          'Max Tilt Angle': '35°',
          'Max Service Ceiling': '4,500 m',
          'Max Wind Resistance': '12 m/s',
          'Max Flight Time': '25 min (sea level, no wind, 3 m/s auto-cruise)',
          'Operating Temperature': '-10°C to 45°C',
          'Hovering Accuracy': '±0.5 m horizontal, ±1.5 m vertical'
        }
      },
      {
        title: '4K Camera',
        specs: {
          'Sensor': '1/2.3-inch CMOS, 48 MP effective',
          'Lens': 'FOV 83°, 4.49 mm, f/2.6',
          'ISO Range': '100–1600',
          'Electronic Shutter': '1/30 – 1/10000 s',
          'Photo Resolution': '8000 × 6000 / 3840 × 2160',
          'Video Resolution': '4K UHD 3840 × 2160 @ 30 fps, FHD 1920 × 1080 @ 60 fps',
          'Max Video Bitrate': '80 Mbps',
          'Zoom': '4× digital',
          'Photo Format': 'JPEG',
          'Video Format': 'MP4',
          'Supported SD Card': 'microSD up to 512 GB, Class 10 / UHS-1'
        }
      },
      {
        title: 'Gimbal',
        specs: {
          'Stabilization': '3-axis (pitch, yaw, roll)',
          'Controllable Range': 'Pitch: -90° to +30°',
          'Max Control Speed': 'Pitch: 100°/s',
          'Static Accuracy': '±0.01°',
          'Dynamic Accuracy': '±0.02°',
          'Stabilization Accuracy': '±0.01°'
        }
      },
      {
        title: 'Obstacle Sensing',
        specs: {
          'Forward': 'Binocular, 0.5–10 m range, ≤10 m/s obstacle-avoidance speed, FOV 40°H / 30°V',
          'Rearward': 'Binocular, 0.5–10 m range, ≤10 m/s obstacle-avoidance speed, FOV 40°H / 30°V',
          'Downward': 'ToF, 0.25–8 m precise range, 0.25–8 m visual hover',
          'Operating Environment': 'Textured surfaces, sufficient light (>15 lux, indoor daylight)'
        }
      },
      {
        title: 'WK-RCS Lite Remote',
        specs: {
          'Operating Frequency': '5 GHz – 5.8 GHz',
          'Max Transmission Range': '9 km (open, unobstructed, no EMI)',
          'Display': '5.5-inch 1920 × 1080, 1100 nits',
          'Charging Port': 'USB-C',
          'Battery': '3.7 V, 10,000 mAh',
          'Battery Life': '6 hours',
          'Operating Temperature': '-20°C to 40°C',
          'Charging Temperature': '5°C to 40°C'
        }
      },
      {
        title: 'Intelligent Flight Battery',
        specs: {
          'Voltage': '7.9 V',
          'Capacity': '2,500 mAh',
          'Discharge Rate': '10C',
          'Battery Type': 'LiPo 2S',
          'Charging Temperature': '5°C to 40°C'
        }
      }
    ],
    specifications: {
      'Sensor': '1/2.3-inch CMOS, 48 MP',
      'Video': '4K UHD @ 30 fps',
      'Gimbal': '3-axis mechanical',
      'Obstacle Avoidance': 'Front + Rear binocular + Downward ToF',
      'Max Range': '9 km',
      'Max Flight Time': '25 min',
      'Takeoff Weight': '268 g',
      'Folded Size': '153 × 87 × 73 mm',
      'Remote Display': '5.5-inch 1080p, 1100 nits',
      'Max Wind Resistance': '12 m/s'
    },
    faqs: [
      {
        question: 'What is the takeoff weight, and do I need to register the Mini X?',
        answer: 'The Mini X weighs 268 g at takeoff, including battery and propellers. This is just above the 250 g threshold used in the United States, China, and the EU for registration-free recreational flight. In the United States, all drones over 250 g require registration with the FAA. Commercial pilots need a Part 107 license regardless of weight. Check your local regulations before flying.'
      },
      {
        question: 'How does the 3-directional obstacle avoidance work?',
        answer: 'The Mini X combines forward and rear binocular vision cameras with a downward ToF (time-of-flight) sensor. The forward and rear sensors detect obstacles up to 10 m away and trigger automatic braking and rerouting at speeds up to 10 m/s. The downward ToF handles precise low-altitude positioning and stable indoor hover. Together they cover the three directions most likely to encounter obstacles during typical flight.'
      },
      {
        question: 'Do I need my phone to fly the Mini X?',
        answer: 'No. The WK-RCS Lite remote has a built-in 5.5-inch 1080p screen with 1100-nit brightness. You can mount the drone, take off, monitor the live feed, and review footage entirely on the remote — no phone required. If you prefer phone-based flight, the Mini X also pairs with the Walkera / Lumenfly mobile app via USB-C tether.'
      },
      {
        question: 'How long does the Mini X fly on a single battery?',
        answer: 'Up to 25 minutes per battery under ideal conditions (sea level, no wind, 3 m/s auto-cruise). Real-world flight with movement, wind, and obstacle-avoidance activity typically yields 18–22 minutes. The standard kit includes one battery; a Fly More Combo with three batteries plus a charging hub is available separately.'
      },
      {
        question: 'What is the maximum transmission range?',
        answer: 'Up to 9 km in open, unobstructed environments with no electromagnetic interference. In urban or forested areas, expect a practical range of 1–3 km. The 5 GHz band keeps latency below 200 ms at typical flight distances, so the live feed remains responsive for framing and FPV-style flight.'
      },
      {
        question: 'Can the Mini X fly indoors?',
        answer: 'Yes. The downward ToF sensor enables stable visual hover at altitudes of 0.25–8 m over textured surfaces, and the 3-directional obstacle avoidance helps the drone navigate around furniture, walls, and doorways. The 268 g body and 3-axis propeller guards (sold separately) make indoor flight safer. Always fly in well-lit rooms — the obstacle sensors require adequate light.'
      },
      {
        question: 'What AI QuickShots are included?',
        answer: 'Four one-tap cinematic patterns: Orbit (circles the subject while keeping it centered), Pull-Away (zooms out to reveal the scene), Rise (climbs vertically while tilting down), and Tail (flies a sweeping curve past the subject). All QuickShots record at 4K and apply in-app stabilization so the output is social-ready straight from the drone.'
      },
      {
        question: 'Does the Mini X support ND filters?',
        answer: 'Yes. The Mini X gimbal accepts standard third-party ND filter sets (ND4 / ND8 / ND16 / ND32). ND filters are not included in the standard kit and are sold separately. For video at 30 fps in bright daylight, we recommend ND16 or ND32 to maintain a cinematic shutter speed.'
      },
      {
        question: 'Is the Mini X waterproof?',
        answer: 'No. The Mini X is not waterproof or weather-sealed. Do not fly in rain, snow, or fog. If the drone gets wet, power it off immediately, remove the battery, and contact Lumenfly support before attempting to fly again.'
      },
      {
        question: 'What is the warranty and return policy?',
        answer: 'Every Mini X ships with a 12-month manufacturing-defect warranty and a 30-day hassle-free return window. Lumenfly Care extends coverage to up to two accidental-damage replacements in 12 months with free round-trip shipping.'
      }
    ],
    videos: [
      {
        src: '/videos/mini-x/mini-x.mp4',
        poster: '/images/mini-x/feature-obstacle-avoidance.png',
        title: 'Mini X — Official Product Film',
        caption: 'See the foldable body, 3-directional obstacle avoidance, and built-in screen remote in action. Footage shot on the Mini X in 4K.'
      }
    ],
    inStock: true,
    isBestSeller: false,
    isNew: true
  },
  {
    id: 'mini-se',
    code: 'LM-MSE',
    name: 'Mini SE Camera Drone',
    nameCn: 'Mini SE 摄影无人机',
    description: 'Sub-249g foldable camera drone with 4K video, 30-minute flight, voice control, and AI smart-follow.',
    descriptionCn: '249 克以下可折叠摄影无人机，4K 视频，30 分钟续航，语音控制，AI 智能跟随。',
    category: 'consumer-drones',
    categoryName: 'Consumer Drones',
    tagline: 'Smart Lightweight Companion — Voice Control, AI Tracking, 30 Min Flight',
    image: '/images/mini-se/hero.jpg',
    gallery: [
      '/images/mini-se/hero.jpg',
      '/images/mini-se/feature-foldable.jpg',
      '/images/mini-se/feature-camera.jpg',
      '/images/mini-se/feature-p2-remote.jpg',
      '/images/mini-se/feature-battery.jpg',
      '/images/mini-se/feature-transmission.jpg',
      '/images/mini-se/feature-target.jpg',
      '/images/mini-se/feature-ai-tracking.jpg',
      '/images/mini-se/feature-smart-follow.jpg',
      '/images/mini-se/feature-toss-takeoff.jpg',
      '/images/mini-se/feature-fpv.jpg',
      '/images/mini-se/feature-optical-flow.jpg',
      '/images/mini-se/quickshot-orbit.jpg',
      '/images/mini-se/quickshot-pull-away.jpg',
      '/images/mini-se/quickshot-rise.jpg',
      '/images/mini-se/quickshot-tail.jpg',
      '/images/mini-se/panorama-180.jpg',
      '/images/mini-se/panorama-wide.jpg',
      '/images/mini-se/panorama-vertical.jpg',
      '/images/mini-se/panorama-spherical.jpg'
    ],
    features: [
      '4K/30fps',
      '249G FOLDABLE',
      '30-MIN FLIGHT',
      '4KM HD TRANSMISSION',
      'VOICE CONTROL',
      'AI TRACKING'
    ],
    applications: [
      'Vlog & Social Content',
      'Travel Photography',
      'Indoor Flying',
      'Outdoor Adventure',
      'Action Sports',
      'Quick Creative Shots'
    ],
    whyReasons: [
      'Sub-249 g foldable body — pocket-sized when folded, slips into a jacket pocket or day-bag with no registration required in most regions',
      '4K UHD video with 3-axis mechanical gimbal — broadcast-grade footage from a drone that weighs less than a smartphone',
      '30-minute flight time per battery — among the longest in the sub-250 g category, lets you frame the shot instead of rushing to land',
      '4 km low-latency HD live transmission on the 5 GHz band — stable live feed well beyond visual line of sight',
      'Voice control via the WK-V8 handle — speak commands to take off, land, or trigger AI shots without taking your hands off the controls',
      'Five AI Smart Follow modes — Bird’s Eye, Fly Steady, Cross Terrain, Orbit Follow, and Quad Follow for one-tap cinematic tracking',
      'Toss-to-launch takeoff — get airborne in a second from your palm, no flat surface needed'
    ],
    learnMoreCards: [
      {
        title: 'Voice Control with WK-V8 Handle',
        description: 'Pair the Mini SE with the optional WK-V8 voice handle and fly it hands-free. Speak commands to take off, land, orbit, follow, or stop — useful when your hands are full, you are wearing gloves, or you simply want a smoother vlog workflow. Voice recognition works in English and Mandarin out of the box.',
        image: '/images/mini-se/feature-voice-control.jpg'
      },
      {
        title: 'AI Smart Follow, Five Modes',
        description: 'Tap a subject on screen and the Mini SE keeps it centered using one of five tracking modes. Bird’s Eye climbs to a top-down view; Fly Steady holds a constant distance behind a moving subject; Cross Terrain follows across varied landscape; Orbit Follow circles the subject; Quad Follow flies a four-corner reveal pattern around it.',
        image: '/images/mini-se/feature-smart-follow.jpg'
      },
      {
        title: '4K UHD Camera with 3-Axis Gimbal',
        description: 'A 1/2.3-inch CMOS sensor captures 4K UHD video at 30 fps and high-resolution stills. The 3-axis mechanical gimbal keeps the horizon level through aggressive maneuvers, so every clip comes out smooth, level, and share-ready straight from the drone — no post-processing required.',
        image: '/images/mini-se/feature-camera.jpg'
      },
      {
        title: '4 km HD Live Transmission',
        description: 'The 5 GHz remote streams 1080p live view up to 4 km in open environments with sub-200 ms latency. Choose between the P2 controller with a built-in 5.5-inch screen, the WK-V8 voice handle for hands-free control, or a third option for phone-based flight — whichever fits your workflow.',
        image: '/images/mini-se/feature-transmission.jpg'
      },
      {
        title: '30-Minute Intelligent Flight Battery',
        description: 'A high-density LiPo 2S pack delivers up to 30 minutes of hover or 22–25 minutes of active mixed flight per charge — among the longest flight times in the sub-250 g category. The standard kit includes one battery; an optional Fly More Combo adds a charging hub and two spare packs.',
        image: '/images/mini-se/feature-battery.jpg'
      },
      {
        title: 'Toss-to-Launch & One-Tap QuickShots',
        description: 'Toss the Mini SE into the air from your palm and it hovers in place, ready for the next command. Combine with QuickShots — Orbit, Pull-Away, Rise, and Tail — for instant cinematic clips that drop straight into TikTok, Reels, or YouTube Shorts with no editing required.',
        image: '/images/mini-se/feature-toss-takeoff.jpg'
      }
    ],
    specsGroups: [
      {
        title: 'Aircraft',
        specs: {
          'Diagonal Wheelbase': '247 mm',
          'Dimensions (Unfolded)': '157 × 224 × 70 mm',
          'Dimensions (Folded)': '142 × 82 × 70 mm',
          'Takeoff Weight': '249 g',
          'Max Ascent Speed': '5 m/s',
          'Max Descent Speed': '3.5 m/s',
          'Max Horizontal Speed': '12 m/s',
          'Max Tilt Angle': '35°',
          'Max Service Ceiling': '4,000 m',
          'Max Wind Resistance': '12 m/s (Level 7)',
          'Max Flight Time': '30 min (sea level, no wind, 3 m/s auto-cruise)',
          'Operating Temperature': '-10°C to 40°C',
          'Hovering Accuracy': '±0.3 m vertical (with optical flow), ±1.0 m horizontal (with GPS)'
        }
      },
      {
        title: '4K Camera',
        specs: {
          'Sensor': '1/2.3-inch CMOS',
          'Lens': 'FOV 78°, f/2.6',
          'ISO Range': '100–1600',
          'Electronic Shutter': '1/30 – 1/8000 s',
          'Photo Resolution': '4000 × 3000 (12 MP)',
          'Video Resolution': '4K UHD 3840 × 2160 @ 30 fps, FHD 1920 × 1080 @ 60 fps',
          'Max Video Bitrate': '60 Mbps',
          'Zoom': '4× digital',
          'Photo Format': 'JPEG',
          'Video Format': 'MP4',
          'Supported SD Card': 'microSD up to 256 GB, Class 10 / UHS-1'
        }
      },
      {
        title: 'Gimbal',
        specs: {
          'Stabilization': '3-axis (pitch, yaw, roll)',
          'Controllable Range': 'Pitch: -90° to +20°',
          'Max Control Speed': 'Pitch: 80°/s',
          'Static Accuracy': '±0.02°'
        }
      },
      {
        title: 'Sensing & Positioning',
        specs: {
          'Downward': 'Optical flow + ToF, precise hover 0.25–8 m over textured surfaces',
          'GPS': 'GPS + GLONASS dual-band',
          'Operating Environment': 'Bright (>15 lux indoor daylight), textured ground surfaces'
        }
      },
      {
        title: 'P2 Remote Controller',
        specs: {
          'Operating Frequency': '5 GHz – 5.8 GHz',
          'Max Transmission Range': '4 km (open, unobstructed, no EMI)',
          'Display': '5.5-inch 1920 × 1080, 1000 nits',
          'Charging Port': 'USB-C',
          'Battery': '3.7 V, 6,800 mAh',
          'Battery Life': '5 hours',
          'Operating Temperature': '-10°C to 40°C'
        }
      },
      {
        title: 'WK-V8 Voice Handle (Optional)',
        specs: {
          'Operating Frequency': '5 GHz – 5.8 GHz',
          'Max Transmission Range': '1.5 km',
          'Display': '1.4-inch status screen',
          'Voice Wake Word': 'Mini SE',
          'Charging Port': 'USB-C',
          'Battery': '3.7 V, 2,600 mAh',
          'Battery Life': '4 hours voice-control active'
        }
      },
      {
        title: 'Intelligent Flight Battery',
        specs: {
          'Voltage': '7.7 V',
          'Capacity': '2,200 mAh',
          'Discharge Rate': '8C',
          'Battery Type': 'LiPo 2S',
          'Energy': '16.94 Wh',
          'Charging Temperature': '5°C to 40°C',
          'Weight': '82 g'
        }
      }
    ],
    specifications: {
      'Sensor': '1/2.3-inch CMOS',
      'Video': '4K UHD @ 30 fps',
      'Gimbal': '3-axis mechanical',
      'Max Range': '4 km',
      'Max Flight Time': '30 min',
      'Takeoff Weight': '249 g',
      'Folded Size': '142 × 82 × 70 mm',
      'Remote Display': '5.5-inch 1080p, 1000 nits',
      'Max Wind Resistance': '12 m/s (Level 7)',
      'Voice Control': 'Yes (WK-V8 handle)'
    },
    faqs: [
      {
        question: 'What is the takeoff weight, and do I need to register the Mini SE?',
        answer: 'The Mini SE weighs 249 g at takeoff, including battery and propellers. This sits right at the registration-free threshold used in the United States, China, and the EU for recreational flight — in most regions no pilot registration is required for sub-250 g drones. Commercial pilots need a Part 107 license regardless of weight. Check your local regulations before flying.'
      },
      {
        question: 'How does voice control work on the Mini SE?',
        answer: 'Pair the Mini SE with the optional WK-V8 voice handle and wake it by saying “Mini SE”. You can then issue commands such as take off, land, orbit, follow, record, and stop, all hands-free. Voice recognition works in English and Mandarin out of the box and runs entirely on the handle — no phone or data connection required.'
      },
      {
        question: 'What AI Smart Follow modes are available?',
        answer: 'Five tracking modes are built in: Bird’s Eye (top-down), Fly Steady (constant-distance rear follow), Cross Terrain (longitudinal follow over varied landscape), Orbit Follow (circle the subject), and Quad Follow (four-corner reveal). Tap a subject on the screen, pick a mode, and the Mini SE handles the flying while you focus on the activity.'
      },
      {
        question: 'How long does the Mini SE fly on a single battery?',
        answer: 'Up to 30 minutes per battery under ideal conditions (sea level, no wind, 3 m/s auto-cruise). Real-world flight with movement, wind, and active tracking typically yields 22–25 minutes. The standard kit includes one battery; a Fly More Combo with three batteries plus a charging hub is available separately.'
      },
      {
        question: 'What is the maximum transmission range?',
        answer: 'Up to 4 km in open, unobstructed environments with no electromagnetic interference when using the P2 remote. The WK-V8 voice handle tops out around 1.5 km because of its compact antenna. In urban or forested areas, expect a practical range of 1–2 km. The 5 GHz band keeps latency below 200 ms at typical flight distances.'
      },
      {
        question: 'Can the Mini SE fly indoors?',
        answer: 'Yes. The downward optical flow sensor enables stable visual hover at altitudes of 0.25–8 m over textured surfaces, and GPS is not required indoors. The 249 g body and optional 3-axis propeller guards (sold separately) make indoor flight safer. Always fly in well-lit rooms — the optical flow sensor requires adequate light.'
      },
      {
        question: 'What QuickShots and Panorama modes are included?',
        answer: 'Four QuickShot patterns: Orbit (circle the subject), Pull-Away (zoom out to reveal the scene), Rise (climb vertically while tilting down), and Tail (sweeping curve past the subject). Four panorama modes: 180°, Wide, Vertical, and Spherical. All output 4K video with in-app stabilization so the result is social-ready straight from the drone.'
      },
      {
        question: 'Does the Mini SE support ND filters?',
        answer: 'Yes. The Mini SE gimbal accepts standard third-party ND filter sets (ND4 / ND8 / ND16 / ND32). ND filters are not included in the standard kit and are sold separately. For video at 30 fps in bright daylight, we recommend ND16 or ND32 to maintain a cinematic shutter speed.'
      },
      {
        question: 'Is the Mini SE waterproof?',
        answer: 'No. The Mini SE is not waterproof or weather-sealed. Do not fly in rain, snow, or fog. If the drone gets wet, power it off immediately, remove the battery, and contact Lumenfly support before attempting to fly again.'
      },
      {
        question: 'What is the warranty and return policy?',
        answer: 'Every Mini SE ships with a 12-month manufacturing-defect warranty and a 30-day hassle-free return window. Lumenfly Care extends coverage to up to two accidental-damage replacements in 12 months with free round-trip shipping.'
      }
    ],
    videos: [
      {
        src: '/videos/mini-se/mini-se.mp4',
        poster: '/images/mini-se/hero.jpg',
        title: 'Mini SE — Official Product Film',
        caption: 'See the foldable sub-249g body, voice control via the WK-V8 handle, and 30-minute flight in action. Footage shot on the Mini SE in 4K.'
      }
    ],
    inStock: true,
    isBestSeller: false,
    isNew: true,

    // Commerce fields
    price: 44900, // $449.00 base price (Standard Kit with P2 remote)
    compareAtPrice: 54900, // $549.00 original price
    sku: 'LM-MSE-STD',
    stockCount: 50,
    variants: [
      {
        id: 'standard-kit',
        name: 'Standard Kit',
        priceModifier: 0, // Base price
        stockCount: 30,
        features: ['Drone', 'P2 Remote', '1 battery', 'props', 'cables'],
        image: '/images/mini-se/hero.jpg'
      },
      {
        id: 'voice-edition',
        name: 'Voice Edition',
        priceModifier: 10000, // +$100.00
        stockCount: 20,
        features: ['Drone', 'P2 Remote', 'WK-V8 Voice Handle', '2 batteries', 'props', 'cables'],
        image: '/images/mini-se/feature-voice-control.jpg'
      }
    ],
    weightGrams: 249,
    dimensionsCm: { length: 14.2, width: 8.2, height: 7.0 },
    shipping: {
      freeOver: 50000, // Free shipping over $500
      flatRate: 2500 // $25 flat rate
    }
  },
  {
    id: 'fp500',
    code: 'PD-FP500',
    name: 'FP500 Agriculture Drone',
    nameCn: 'FP500 农业无人机',
    description: 'Heavy-lift agricultural UAV with 40L spray tank, 55L spread tank, centrifugal wind-pressure nozzles, RTK mapping, and 3D AI orchard mode — built on an IP67 aluminum frame for season-after-season reliability.',
    descriptionCn: '大载荷农业无人机，40L 喷洒箱、55L 播撒箱、风压离心喷头、RTK 测绘、3D AI 果园模式，IP67 铝合金机身，经久耐用。',
    category: 'agriculture-drones',
    categoryName: 'Agricultural Drones',
    tagline: '40L Spray Tank · 55L Spread Tank · IP67 Rated — Precision Agriculture at Scale',
    image: '/images/fp500/hero.png',
    gallery: [
      '/images/fp500/hero.png',
      '/images/fp500/action-orchard-closeup.jpg',
      '/images/fp500/action-field-spray.jpg',
      '/images/fp500/action-orchard-distance.jpg',
      '/images/fp500/remote-controller-ui.jpg',
      '/images/fp500/action-orchard-spray.jpg',
      '/images/fp500/field-planning-software.jpg',
      '/images/fp500/orchard-overview-aerial.jpg'
    ],
    features: [
      '40L SPRAY TANK',
      '55L SPREAD TANK',
      '40KG PAYLOAD',
      'IP67 RATED',
      'RTK MAPPING',
      '3D ORCHARD MODE'
    ],
    applications: [
      'Field Crop Spraying',
      'Orchard Spraying',
      'Fertilizer Spreading',
      'Precision Mapping',
      'Mountain Terrain',
      'Pest Control'
    ],
    whyReasons: [
      '40L spray tank and 55L spread tank — cover more acres per sortie with fewer refill stops, reducing total operation time on large fields',
      'Four wind-pressure centrifugal nozzles with 50–500μm adjustable atomization — fine mist for even coverage, large droplets for drift control in windy conditions',
      'Optional SP4 air-blowing spreader (100 kg/min) or SP5 centrifugal spreader (200 kg/min) — switch between granular fertilizer, seeds, and powdered materials in minutes',
      'IP67-rated high-strength aluminum frame with modular design — wash it down after spraying, swap a damaged arm in the field without returning to the shop',
      'Built-in RTK on the 7-inch remote controller — centimeter-level positioning for precision spraying, boundary mapping, and repeatable flight paths',
      '3D orchard mode with AI tree identification — automatically generates flight routes through mountain orchards, hillside terraces, and complex terrain that stump 2D planners',
      '40-meter phased-array radar with five-beam terrain following — the FP500 hugs the canopy at a consistent height even as the ground rises and falls beneath it'
    ],
    learnMoreCards: [
      {
        title: '40L Spray Tank — Cover More Ground Per Flight',
        description: 'The 40-liter liquid tank paired with four wind-pressure centrifugal nozzles delivers uniform coverage across an 8-meter swath. 50–500μm adjustable atomization lets you dial in fine mist for fungicides or larger droplets for herbicides, reducing drift while maximizing adhesion to every leaf surface.',
        image: '/images/fp500/action-field-spray.jpg'
      },
      {
        title: 'Centrifugal Wind-Pressure Nozzles',
        description: 'Unlike conventional pressure nozzles that clog and wear, the FP500\'s four centrifugal nozzles atomize liquid through high-speed rotation. Flow rate adjusts on the fly, and the wind-pressure design pushes droplets down through dense crop canopy — no more spray lost to crosswinds before it reaches the target.',
        image: '/images/fp500/action-orchard-closeup.jpg'
      },
      {
        title: 'Dual Spreading Solution — SP4 or SP5',
        description: 'Choose the SP4 air-blowing spreader for 100 kg/min of uniform granular coverage across 8 meters, or the SP5 centrifugal spreader for high-precision, low-dosage applications at 200 kg/min. Both handle granular fertilizer, seeds, and powdered materials. Swap between spray tank and spreader in the field in under two minutes.',
        image: '/images/fp500/action-orchard-spray.jpg'
      },
      {
        title: '7-Inch RTK Remote Controller',
        description: 'A built-in 7-inch high-brightness screen running on a 20 Ah battery keeps you flying all day without a phone clamp or external power bank. Integrated RTK delivers centimeter-level positioning accuracy — map a field boundary once, save the route, and replay it every season with sub-meter repeatability.',
        image: '/images/fp500/remote-controller-ui.jpg'
      },
      {
        title: '3D Orchard Mode — AI That Reads the Terrain',
        description: 'Point the FP500 at a hillside orchard and its AI vision system identifies individual trees, slopes, and obstacles to generate a true 3D flight route. The drone flies between rows, climbs with the terrain, and dips under overhanging branches — routes that would take hours to plan manually are computed in seconds and uploaded with one tap.',
        image: '/images/fp500/orchard-overview-aerial.jpg'
      },
      {
        title: 'Smart Planning, Precise Flight',
        description: 'Front and rear FPV cameras give you dual-angle visibility during field mapping. The 40-meter phased-array radar scans ahead for power lines, windbreaks, and silos, while five-beam terrain following keeps the spray height locked to the canopy. Auxiliary-point mapping and smart breakpoint resume mean you never re-spray the same strip twice.',
        image: '/images/fp500/field-planning-software.jpg'
      }
    ],
    specsGroups: [
      {
        title: 'Flight Performance',
        specs: {
          'Max Takeoff Weight': '65 kg',
          'Empty Weight': '24.5 kg',
          'Max Payload': '40 kg',
          'Spray Tank Capacity': '40 L',
          'Spread Tank Capacity': '55 L',
          'Max Flight Time': '15 min (full load) / 25 min (no load)',
          'Max Horizontal Speed': '12 m/s',
          'Max Wind Resistance': '10 m/s (Level 5)',
          'Operating Temperature': '0°C to 45°C',
          'Max Service Ceiling': '4,500 m',
          'Hovering Accuracy': '±0.1 m (with RTK)'
        }
      },
      {
        title: 'Spray System',
        specs: {
          'Nozzle Type': 'Four Wind-Pressure Centrifugal',
          'Atomization Range': '50–500 μm',
          'Spray Width': '4–8 m (adjustable)',
          'Pump Type': 'Dual Peristaltic',
          'Flow Rate': 'Adjustable, up to 8 L/min total',
          'Nozzle Lifespan': '2,000+ operating hours'
        }
      },
      {
        title: 'Spreading System (Optional)',
        specs: {
          'SP4 Air-Blowing': '100 kg/min, 8 m width, 6-channel air-jet',
          'SP5 Centrifugal': '200 kg/min, high-precision, low-dosage',
          'Material Types': 'Granular fertilizer, seeds, powdered materials',
          'Swappable': 'Under 2 minutes in the field (tool-free)'
        }
      },
      {
        title: 'Remote Controller',
        specs: {
          'Display': '7-inch high-brightness LCD',
          'Battery': '20 Ah built-in, all-day operation',
          'RTK': 'Built-in, centimeter-level positioning',
          'Operating Frequency': '2.4 GHz / 5.8 GHz',
          'Dual FPV': 'Front + Rear cameras',
          'Operating Temperature': '-10°C to 50°C'
        }
      },
      {
        title: 'Safety & Sensing',
        specs: {
          'Radar': '40 m phased-array (forward)',
          'Terrain Follow': 'Five-beam downward',
          'Obstacle Detection': 'Power lines, windbreaks, silos, trees',
          'Auto Return': 'Low battery + signal loss triggers',
          'Geofencing': 'Custom boundary enforcement'
        }
      },
      {
        title: 'Physical',
        specs: {
          'Frame Material': 'High-strength aluminum alloy',
          'Protection Rating': 'IP67 (dust-tight, water-immersible)',
          'Foldable': 'Yes — arms and landing gear fold for transport',
          'Design': 'Modular — field-swappable arms and components',
          'Dimensions (Unfolded)': '1,520 × 1,520 × 620 mm',
          'Dimensions (Folded)': '780 × 760 × 620 mm',
          'Propeller': '8 × 34-inch folding propellers'
        }
      },
      {
        title: 'Intelligent Flight Battery',
        specs: {
          'Capacity': '30,000 mAh',
          'Type': 'LiPo 14S',
          'Weight': 'Approx. 8.5 kg per battery',
          'Charging Temperature': '5°C to 40°C',
          'Charging Time': 'Approx. 25 min (dual charger)'
        }
      }
    ],
    specifications: {
      'Spray Tank': '40 L',
      'Spread Tank': '55 L',
      'Max Payload': '40 kg',
      'Nozzle Type': '4× Wind-Pressure Centrifugal',
      'Atomization': '50–500 μm',
      'Spray Width': '4–8 m',
      'Max Flight Time': '15 min (full load)',
      'Radar Range': '40 m phased array',
      'Protection': 'IP67',
      'Remote Display': '7-inch with built-in RTK',
      'Frame': 'Aluminum alloy, foldable'
    },
    faqs: [
      {
        question: 'What crops and terrain is the FP500 designed for?',
        answer: 'The FP500 is designed for broad-acre field crops (wheat, corn, rice, soybeans, cotton), orchards (citrus, apple, olive, tea), vineyards on slopes, and mountain-terrace agriculture. The 3D orchard mode handles complex terrain — hillsides, terraced fields, and irregular plot shapes — that would be difficult or impossible to spray with a ground rig or a 2D-only drone flight planner.'
      },
      {
        question: 'How many acres can the FP500 cover in a day?',
        answer: 'With the 40L tank and an 8-meter spray swath, a single sortie covers approximately 2–3 hectares (5–7 acres) depending on application rate. At a typical 15 L/ha rate for fungicide, one tank covers about 2.6 hectares. With a 5-minute turnaround for refill and battery swap, expect 10–15 sorties per day — roughly 25–40 hectares (60–100 acres) in an 8-hour operating window. The 55L spread tank at a 75 kg/ha seed rate covers about 0.7 hectares per sortie.'
      },
      {
        question: 'What is the difference between the SP4 and SP5 spreaders?',
        answer: 'The SP4 is an air-blowing spreader optimized for volume — 100 kg/min feed rate across an 8-meter adjustable width using six air-jet channels. It handles granular fertilizer, seeds, and powdered materials with a dual-roller discharge for even distribution. The SP5 is a centrifugal spreader optimized for precision — 200 kg/min feed rate for high-speed, low-dosage scenarios on large fields. Both are tool-free swappable with the spray tank in under two minutes.'
      },
      {
        question: 'How does the 3D orchard mode work?',
        answer: 'The FP500 uses its forward FPV camera and AI vision system to scan the orchard and identify individual trees, row spacing, slope angles, and obstacles (power lines, poles, windbreaks). It generates a true 3D flight route that climbs and descends with the terrain, flies between rows, and adjusts spray height per tree. You can upload the route with one tap. This replaces hours of manual waypoint planning and produces more accurate coverage than a human pilot flying line-of-sight through hilly orchards.'
      },
      {
        question: 'How long does the battery last and how many do I need?',
        answer: 'Each 30,000 mAh 14S LiPo battery provides approximately 15 minutes of flight at full 40 kg payload, or 20–25 minutes under lighter loads. With a dual charger, a depleted battery recharges in about 25 minutes. For continuous all-day operation, we recommend a minimum of 3–4 batteries and two dual chargers so you always have one battery charging while another is in the air.'
      },
      {
        question: 'Is the FP500 waterproof? Can I wash it after spraying?',
        answer: 'The FP500 has an IP67 rating, which means it is fully dust-tight and can withstand temporary immersion in water up to 1 meter for 30 minutes. You can rinse it with a low-pressure hose after spraying chemicals — just avoid direct high-pressure spray into the motor bearings and connector ports. The modular, corrosion-resistant aluminum frame is designed for the wash-down routine that agricultural equipment goes through daily.'
      },
      {
        question: 'Does the FP500 require a pilot license or special certification?',
        answer: 'Regulations vary by country. In the United States, all agricultural drone operations (spraying, spreading) over 25 kg require a Part 137 certification from the FAA in addition to a Part 107 remote pilot certificate. In the EU, agricultural drones over 25 kg fall under the Specific category of EASA regulations and require an operational authorization. In China, agricultural UAVs over 25 kg require operator certification from the CAAC. Check your local aviation authority for the specific requirements in your region — the FP500 is a professional tool and falls under commercial agricultural aviation regulations in most jurisdictions.'
      },
      {
        question: 'What happens if the FP500 loses signal or battery during a spray mission?',
        answer: 'If the remote controller signal is lost, the FP500 will automatically climb to a preset safety altitude, retrace its route to the last known connection point, and hover awaiting reconnection. If the battery reaches the critically low threshold, the drone will autonomously return to the takeoff point and land. Both behaviors are user-configurable — you can set the loss-of-signal action to hover in place, return home, or land immediately depending on your operating environment.'
      },
      {
        question: 'Can I use the FP500 for night spraying?',
        answer: 'Yes. The FP500 has an operating temperature range of 0°C to 45°C and can operate at night when wind speeds are typically lower and temperature inversions are more stable — conditions that improve spray deposition and reduce drift. The remote controller display has adjustable brightness for night use. However, check your local regulations: some jurisdictions restrict night agricultural drone operations or require additional lighting and waivers.'
      },
      {
        question: 'What is the warranty and after-sales support for the FP500?',
        answer: 'Every FP500 ships with a 12-month manufacturing-defect warranty covering the airframe, motors, flight controller, remote controller, and spray system. Wear items (propellers, nozzles, pump diaphragms) are covered for 6 months or 500 operating hours, whichever comes first. Partdro Care for Agriculture extends coverage to two accidental-damage replacements in 12 months with free round-trip shipping. We also maintain regional service centers in North America, Europe, and Asia-Pacific for same-week turnaround on repairs.'
      }
    ],
    inStock: true,
    isBestSeller: false,
    isNew: true,

    // Commerce fields
    price: 1599900, // $15,999.00
    compareAtPrice: 1799900, // $17,999.00
    sku: 'PD-FP500-STD',
    stockCount: 20,
    variants: [
      {
        id: 'standard-kit',
        name: 'Standard Kit',
        priceModifier: 0,
        stockCount: 12,
        features: ['Drone', 'RC', '1 battery', '4× nozzles', '40L spray tank', 'charger'],
        image: '/images/fp500/hero.png'
      },
      {
        id: 'spreader-combo',
        name: 'Spreader Combo',
        priceModifier: 150000, // +$1,500
        stockCount: 8,
        features: ['Drone', 'RC', '2 batteries', '40L spray tank', '55L spread tank', 'SP4 spreader', 'SP5 spreader', 'dual charger', 'transport case'],
        image: '/images/fp500/action-orchard-spray.jpg'
      }
    ],
    weightGrams: 24500,
    dimensionsCm: { length: 78.0, width: 76.0, height: 62.0 },
    shipping: {
      freeOver: 50000,
      flatRate: 2500
    }
  },
  {
    id: 'fp600',
    code: 'PD-FP600',
    name: 'FP600 Agriculture Drone',
    nameCn: 'FP600 农业无人机',
    description: 'Professional agricultural UAV with 50L spray tank, 76L spread tank, 60kg max payload, dual 20Ah battery system, and a 9000W dual-channel charger — built for high-throughput farming operations.',
    descriptionCn: '专业农业无人机，50L 喷洒箱、76L 播撒箱、60kg 最大载荷、双 20Ah 电池系统、9000W 双通道充电器，专为高吞吐量农业作业而设计。',
    category: 'agriculture-drones',
    categoryName: 'Agricultural Drones',
    tagline: '50L Spray Tank · 76L Spread Tank · 60kg Payload — All-Round Optimization for Large-Scale Farming',
    image: '/images/fp600/hero.png',
    gallery: [
      '/images/fp600/hero.png',
      '/images/fp600/feature-durability.jpg',
      '/images/fp600/feature-radar-flight.jpg'
    ],
    features: [
      '50L SPRAY TANK',
      '76L SPREAD TANK',
      '60KG PAYLOAD',
      'IP67 RATED',
      '20L/MIN FLOW',
      'DUAL BATTERY'
    ],
    applications: [
      'Field Crop Spraying',
      'Orchard Spraying',
      'Fertilizer Spreading',
      'Precision Mapping',
      'Mountain Terrain',
      'Pest Control'
    ],
    whyReasons: [
      '50L spray tank and 76L spread tank — the largest tanks in the FP500 series, covering more hectares per sortie with fewer ground stops',
      '60kg maximum payload capacity across spraying and spreading operations — lift heavier loads, carry more chemical, finish larger fields in a single flight',
      'Four wind-pressure centrifugal nozzles with 20L/min max flow rate and 50–500μm adjustable atomization — industry-leading throughput for row crops and broad-acre spraying',
      'Dual external 20Ah batteries with active wind-field heat dissipation — lower operating temperatures, longer cell life, and continuous all-day operation with the 9000W dual-channel air-cooling charger',
      'IP67-rated high-strength aluminum frame with modular component design — wash it down, swap a damaged arm or ESC in the field, keep flying the same day',
      '3D orchard mode with AI tree identification and rapid route mapping — handles mountain terraces, hillside orchards, and irregular plots that stump 2D flight planners',
      'Upgraded radar with autonomous slope recognition and dynamic target detection — the FP600 sees the terrain change and adjusts spray height before you notice the hill'
    ],
    learnMoreCards: [
      {
        title: '50L Tank, 60kg Payload — Industry-Leading Capacity',
        description: 'The largest tank-and-payload combination in its class. 50 liters of liquid coverage or 76 liters of dry spread per sortie means fewer ground stops, less chemical handling, and more hectares covered per operational hour. The 20L/min max flow rate puts down product faster than any drone in the FP series.',
        image: '/images/fp600/hero.png'
      },
      {
        title: 'Four Centrifugal Nozzles, 20L/Min Flow',
        description: 'Four wind-pressure centrifugal nozzles atomize liquid through high-speed rotation rather than pressure — no clogged tips, no uneven fan patterns. 50–500μm adjustable droplet size dials in fine mist for fungicides or larger droplets for pre-emergent herbicides. The dual-channel high-flow metering pump delivers precise flow control with less than 5% deviation.',
        image: '/images/fp600/feature-radar-flight.jpg'
      },
      {
        title: 'Dual Spreading: SP4 Air-Blowing or SP5 Centrifugal',
        description: 'Choose the SP4 for 6-channel air-jet spreading with dual-roller discharge — gentle on seeds, powerful on granular fertilizer, and uniform across an 8-meter swath. Or choose the SP5 centrifugal spreader for 200kg/min high-speed precision on large fields. Both handle granules, seeds, and powders. Swap between spray and spread in under two minutes.',
        image: '/images/fp600/feature-durability.jpg'
      },
      {
        title: 'Dual 20Ah Battery System + 9000W Charger',
        description: 'Two external 20Ah batteries with mutual backup — if one pack degrades, the other keeps you airborne. Active wind-field cooling pulls air across the cells during flight, reducing thermal stress. On the ground, the 9000W dual-channel air-cooling charger refills both packs simultaneously so you are back in the air while the competition is still waiting on a single-channel charger.',
        image: '/images/fp600/feature-durability.jpg'
      },
      {
        title: '3D Orchard Mode — AI Routes for Complex Terrain',
        description: 'FP600\'s AI vision system scans orchards and identifies individual trees, row spacing, slopes, and obstacles — then generates a full 3D flight route in seconds. The drone flies between rows, climbs with the terrain, and adjusts spray height per tree. One-click upload and the mission is running. What took a human pilot hours of manual waypoint planning now takes seconds.',
        image: '/images/fp600/feature-radar-flight.jpg'
      },
      {
        title: 'Night Mode — Full-Color FPV, 24/7 Operations',
        description: 'When summer heat drives spray windows to dawn and dusk, the FP600 keeps working. Enhanced full-color FPV provides clear visibility in low-light conditions. Coupled with upgraded radar and autonomous slope detection, you can run precision spray missions at night when winds are calm, temperatures are low, and deposition is at its best.',
        image: '/images/fp600/feature-radar-flight.jpg'
      }
    ],
    specsGroups: [
      {
        title: 'Flight Performance',
        specs: {
          'Max Takeoff Weight': '78 kg',
          'Empty Weight': '26 kg',
          'Max Payload': '60 kg',
          'Spray Tank Capacity': '50 L',
          'Spread Tank Capacity': '76 L',
          'Max Flight Time': '12 min (full load) / 22 min (no load)',
          'Max Horizontal Speed': '12 m/s',
          'Max Wind Resistance': '10 m/s (Level 5)',
          'Operating Temperature': '0°C to 45°C',
          'Max Service Ceiling': '4,500 m'
        }
      },
      {
        title: 'Spray System',
        specs: {
          'Nozzle Type': 'Four Wind-Pressure Centrifugal',
          'Atomization Range': '50–500 μm',
          'Max Flow Rate': '20 L/min',
          'Pump Type': 'Dual-Channel High-Flow Metering',
          'Spray Accuracy': '≤ 5% deviation',
          'Spray Width': '4–8 m (adjustable)'
        }
      },
      {
        title: 'Spreading System (Optional)',
        specs: {
          'SP4 Air-Blowing': '6-channel air-jet, dual-roller discharge',
          'SP5 Centrifugal': '200 kg/min, 8 m width',
          'Material Types': 'Granular fertilizer, seeds, powdered materials',
          'Swappable': 'Under 2 minutes (tool-free)'
        }
      },
      {
        title: 'Power System',
        specs: {
          'Battery': 'Dual 20 Ah (external, mutual backup)',
          'Charger': '9,000 W dual-channel air-cooling',
          'Cooling': 'Active wind-field heat dissipation',
          'Charging Time': 'Approx. 15 min per pair (dual charger)'
        }
      },
      {
        title: 'Safety & Sensing',
        specs: {
          'Radar': 'Upgraded phased-array (forward)',
          'Terrain Follow': 'Autonomous slope recognition',
          'Obstacle Detection': 'Dynamic target detection, power lines, trees',
          'Auto Return': 'Low battery + signal loss triggers',
          'Night Mode': 'Full-color FPV for low-light operation'
        }
      },
      {
        title: 'Physical',
        specs: {
          'Frame Material': 'High-strength aluminum alloy',
          'Protection Rating': 'IP67',
          'Design': 'Modular — field-swappable arms, ESCs, components',
          'Foldable': 'Yes',
          'Propeller': '8 × folding propellers'
        }
      }
    ],
    specifications: {
      'Spray Tank': '50 L',
      'Spread Tank': '76 L',
      'Max Payload': '60 kg',
      'Nozzle Type': '4× Wind-Pressure Centrifugal',
      'Atomization': '50–500 μm',
      'Max Flow Rate': '20 L/min',
      'Battery': 'Dual 20 Ah',
      'Charger': '9,000 W dual-channel',
      'Protection': 'IP67',
      'Frame': 'Aluminum alloy, foldable'
    },
    faqs: [
      {
        question: 'How does the FP600 compare to the FP500?',
        answer: 'The FP600 is the next step up in capacity: 50L spray tank (vs 40L), 76L spread tank (vs 55L), 60kg max payload (vs 40kg), and 20L/min max flow rate (vs 8L/min). The FP600 also upgrades to a dual 20Ah battery system with 9000W dual-channel charging — roughly double the charge speed of the FP500\'s single-channel setup. Choose the FP600 when your acreage demands higher throughput per sortie.'
      },
      {
        question: 'How many acres can the FP600 cover per day?',
        answer: 'At a typical 15 L/ha application rate, one 50L tank covers approximately 3.3 hectares (8 acres) per sortie. With 12-minute flight times and 15-minute turnaround (refill + battery swap via dual charger), expect 8–12 sorties per day — roughly 25–40 hectares (60–100 acres) in an 8-hour operating window. With the 76L spread tank at 75 kg/ha seed rate, one sortie covers about 1 hectare.'
      },
      {
        question: 'What is the dual battery system and how does it improve operations?',
        answer: 'The FP600 carries two external 20Ah batteries that operate in mutual backup — if one pack experiences a cell issue mid-flight, the other sustainspower for a safe return. Active wind-field cooling pulls air across both packs during flight to keep temperatures down. On the ground, the 9000W dual-channel charger refills both packs simultaneously in approximately 15 minutes, halving your turnaround time compared to single-channel chargers.'
      },
      {
        question: 'Can the FP600 operate at night?',
        answer: 'Yes. The FP600 includes a dedicated night mode with enhanced full-color FPV that provides clear visibility in low-light conditions. Night operations are particularly valuable for summer spraying — wind speeds are typically lower, temperatures are cooler (reducing chemical evaporation), and temperature inversions improve spray deposition. Check local regulations regarding night agricultural drone operations.'
      },
      {
        question: 'What is the difference between the SP4 and SP5 spreaders?',
        answer: 'The SP4 is an air-blowing spreader using six air-jet channels with dual-roller discharge — ideal for seeds and granular fertilizer where gentle handling matters, delivering up to 100 kg/min. The SP5 is a centrifugal spreader optimized for speed — 200 kg/min across an 8-meter swath for high-efficiency large-field operations. Both are tool-free swappable with the spray tank.'
      },
      {
        question: 'Is the FP600 suitable for hilly orchard spraying?',
        answer: 'Yes — the 3D orchard mode uses AI vision to map individual trees, row spacing, slopes, and obstacles, then generates a true 3D flight route. The FP600 climbs and descends with the terrain, flies between rows, and adjusts spray height per tree. The upgraded radar autonomously detects slope changes and adjusts accordingly. This is specifically designed for mountain terraces, hillside orchards, and irregular plots that ground sprayers cannot reach.'
      },
      {
        question: 'How many batteries do I need for continuous all-day operation?',
        answer: 'With the 9000W dual-channel charger refilling both packs in ~15 minutes and flight times of ~12 minutes at full load, a minimum of 4 batteries (2 pairs) keeps you airborne continuously — one pair in the air while the other charges. For maximum throughput, 6 batteries (3 pairs) eliminates any waiting on the charger.'
      },
      {
        question: 'What is the IP67 rating and can I wash the FP600 after spraying?',
        answer: 'IP67 means the FP600 is fully dust-tight and can withstand temporary immersion in water up to 1 meter for 30 minutes. You can rinse it with a low-pressure hose after spraying — the modular aluminum frame and sealed connectors are designed for the daily wash-down routine of agricultural operations. Avoid direct high-pressure spray into motor bearings.'
      },
      {
        question: 'Does the FP600 require a pilot license?',
        answer: 'Yes. In the United States, all agricultural drone operations over 25 kg require a Part 137 certification in addition to a Part 107 remote pilot certificate. In the EU, drones over 25 kg fall under the Specific category (EASA) requiring operational authorization. In China, agricultural UAVs over 25 kg require CAAC operator certification. Check your local aviation authority — the FP600 is a professional agricultural tool, not a consumer drone.'
      },
      {
        question: 'What is the warranty on the FP600?',
        answer: 'Every FP600 ships with a 12-month manufacturing-defect warranty covering the airframe, motors, flight controller, remote controller, spray system, and charger. Wear items (propellers, nozzles, pump diaphragms) are covered for 6 months or 500 operating hours, whichever comes first. Partdro Care for Agriculture extends coverage to two accidental-damage replacements in 12 months with free round-trip shipping.'
      }
    ],
    inStock: true,
    isBestSeller: false,
    isNew: true,
    price: 1899900,
    compareAtPrice: 2199900,
    sku: 'PD-FP600-STD',
    stockCount: 15,
    weightGrams: 26000,
    dimensionsCm: { length: 85.0, width: 83.0, height: 65.0 },
    shipping: { freeOver: 50000, flatRate: 2500 }
  },
  {
    id: 'fp700',
    code: 'PD-FP700',
    name: 'FP700 Agriculture Drone',
    nameCn: 'FP700 农业无人机',
    description: 'Flagship agricultural UAV with 60L spray tank, 80L spread tank, 70kg max payload, 150m 4D radar, built-in UPS, transport mode, and 40L/min pump — engineered for the largest and most demanding farming operations.',
    descriptionCn: '旗舰农业无人机，60L 喷洒箱、80L 播撒箱、70kg 最大载荷、150m 4D 雷达、内置 UPS、运输模式、40L/min 泵，专为最大规模和最严苛的农业作业而设计。',
    category: 'agriculture-drones',
    categoryName: 'Agricultural Drones',
    tagline: '60L Spray · 80L Spread · 70kg Payload · 150m 4D Radar — Ready for Every Challenge',
    image: '/images/fp700/hero.png',
    gallery: [
      '/images/fp700/hero.png',
      '/images/fp700/feature-lead-collage.jpg',
      '/images/fp700/feature-nozzles.jpg',
      '/images/fp700/feature-pump.jpg',
      '/images/fp700/feature-spreader-1.jpg',
      '/images/fp700/feature-spreader-2.jpg',
      '/images/fp700/feature-radar-avoid.jpg',
      '/images/fp700/feature-radar-detect.jpg',
      '/images/fp700/feature-radar-far.jpg',
      '/images/fp700/feature-ups.jpg',
      '/images/fp700/feature-modular.jpg'
    ],
    features: [
      '60L SPRAY TANK',
      '80L SPREAD TANK',
      '70KG PAYLOAD',
      '150M 4D RADAR',
      '40L/MIN PUMP',
      'BUILT-IN UPS'
    ],
    applications: [
      'Field Crop Spraying',
      'Orchard Spraying',
      'Fertilizer Spreading',
      'Precision Mapping',
      'Mountain Terrain',
      'Pest Control'
    ],
    whyReasons: [
      '60L spray tank and 80L spread tank — the largest capacity in the Partdro agricultural lineup, built for mega-farms and commercial operations that measure fields in thousands of hectares',
      '40L/min max pump flow rate with ≤5% accuracy — four times the throughput of the FP500; cover a hectare in roughly 2.5 minutes at a 15 L/ha application rate',
      'Automotive-grade 150m 4D radar with point-cloud imaging — detects power lines, windbreaks, and even small obstacles at 13.8 m/s flight speed, bringing the drone to a stable stop well before impact',
      'Built-in UPS (uninterruptible power supply) — hot-swap batteries without powering down the drone; no reboot, no re-calibration, no lost mission state between battery changes',
      'Transport mode with 60kg payload capacity, 2km operational radius, and 30m height limit — delivers supplies, tools, and harvest bins across the farm without a separate logistics drone',
      'Aviation-grade aluminum frame with IP67 protection and doubled power redundancy on removable ESCs — built to survive the daily chemical-and-dust environment of professional agriculture',
      'Self-developed flight control system with modular design and full-color night FPV — autonomous mapping of up to 13.5 hectares per flight, then execute the route day or night'
    ],
    learnMoreCards: [
      {
        title: '60L Tank, 40L/Min Pump — Maximum Throughput',
        description: 'The FP700\'s rear-mounted four-centrifugal-nozzle array paired with a 40L/min high-flow metering pump delivers spray at a rate that rivals ground rigs — without the soil compaction. 30–500μm adjustable atomization and single-sided spraying mode give you precision control for field edges, windward passes, and spot treatment without wasting chemical on already-sprayed rows.',
        image: '/images/fp700/feature-nozzles.jpg'
      },
      {
        title: '80L Spread Tank, 220kg/Min SP6 Spreader',
        description: 'The SP6 centrifugal spreader with three roller configurations handles everything from fine rapeseed to coarse compound fertilizer at up to 220 kg/min across a 10-meter swath. Metered auger feeding ensures accurate dosing — no guesswork, no over-application, no bare strips. Supports ultra-low application rates for precision agriculture prescriptions.',
        image: '/images/fp700/feature-spreader-1.jpg'
      },
      {
        title: '150m 4D Radar — Automotive-Grade Sensing',
        description: 'An automotive-grade 4D millimeter-wave radar scans 150 meters ahead, generating reliable point-cloud imagery that detects obstacles a fifth of that distance sooner than the industry standard. The FP700 can fly at 13.8 m/s and still stop safely before impact. Advanced terrain scanning maps slope changes, windbreaks, power lines, and even small branches — obstacles that lesser radars miss entirely.',
        image: '/images/fp700/feature-radar-avoid.jpg'
      },
      {
        title: 'Built-in UPS — Hot-Swap, Never Power Down',
        description: 'The FP700\'s built-in UPS keeps the flight controller, GPS, and mission state alive during battery swaps. No reboot. No re-calibration. No lost route. Land, swap both 20Ah packs, and take off — the mission resumes exactly where it left off. This alone saves 3–5 minutes per battery change and eliminates the most common cause of mapping drift: cold-start GNSS re-acquisition.',
        image: '/images/fp700/feature-ups.jpg'
      },
      {
        title: 'Transport Mode — Deliver 60kg Across the Farm',
        description: 'Switch to transport mode and the FP700 becomes a 60kg-capacity aerial logistics vehicle with a 2km operational radius and 30m height ceiling. Deliver supplies to field crews, move harvest bins from picking rows to the truck, or shuttle tools between barns — all with the same drone that just finished a spray mission. Smart anti-sway stabilization keeps the load steady; touch-ground auto-release drops it exactly where you need it.',
        image: '/images/fp700/feature-lead-collage.jpg'
      },
      {
        title: '13.5 ha Mapping + Night FPV — Fly 24/7',
        description: 'The mounted HD mapping camera surveys up to 13.5 hectares per flight, generating high-precision orthomosaic maps that feed directly into the Agri Assistant app\'s route planner. When summer heat pushes spray windows to night, the full-color FPV and 4D radar keep you flying safely in low light — calmer winds, cooler temps, better deposition, and zero sunburn for the operator.',
        image: '/images/fp700/feature-modular.jpg'
      }
    ],
    specsGroups: [
      {
        title: 'Flight Performance',
        specs: {
          'Max Takeoff Weight': '92 kg',
          'Empty Weight': '28 kg',
          'Max Payload': '70 kg',
          'Spray Tank Capacity': '60 L',
          'Spread Tank Capacity': '80 L',
          'Max Flight Time': '10 min (full load) / 20 min (no load)',
          'Max Horizontal Speed': '13.8 m/s (stable stop)',
          'Max Wind Resistance': '10 m/s (Level 5)',
          'Max Service Ceiling': '4,500 m',
          'Operating Temperature': '0°C to 45°C'
        }
      },
      {
        title: 'Spray System',
        specs: {
          'Nozzle Type': 'Four Rear-Mounted Centrifugal',
          'Atomization Range': '30–500 μm',
          'Max Flow Rate': '40 L/min total (10 L/min per nozzle)',
          'Pump Type': 'High-Flow Metering, ≤ 5% deviation',
          'Spray Width': '4–10 m (adjustable)',
          'Single-Sided Mode': 'Supported'
        }
      },
      {
        title: 'Spreading System',
        specs: {
          'Spreader': 'SP6 Centrifugal, 3 roller configurations',
          'Max Feed Rate': '220 kg/min',
          'Spreading Width': '5–10 m',
          'Material Types': 'Rapeseed, bait, compound fertilizer, rice seeds, granules, powders',
          'Dosing': 'Metered auger feeding'
        }
      },
      {
        title: '4D Radar & Sensing',
        specs: {
          'Type': 'Automotive-grade 4D mmWave',
          'Max Detection Range': '150 m',
          'Max Obstacle-Avoid Speed': '13.8 m/s',
          'Imaging': 'Point-cloud, small-object detection',
          'Terrain': 'Advanced slope scanning'
        }
      },
      {
        title: 'Power & UPS',
        specs: {
          'Battery': 'Dual 20 Ah (mutual backup)',
          'Charger': '9,000 W dual-channel air-cooled',
          'UPS': 'Built-in — hot-swap without power-down',
          'Mapping Endurance': 'Up to 13.5 hectares per flight'
        }
      },
      {
        title: 'Transport Mode',
        specs: {
          'Max Payload': '60 kg',
          'Operational Radius': '2 km',
          'Height Limit': '30 m',
          'Release': 'Touch-ground auto-release',
          'Stabilization': 'Smart anti-sway system'
        }
      },
      {
        title: 'Physical',
        specs: {
          'Frame Material': 'Aviation-grade aluminum alloy',
          'Protection Rating': 'IP67',
          'Design': 'Modular — removable ESCs, doubled power redundancy',
          'Propeller': '8 × folding propellers',
          'ESC': 'Removable, dual-redundant power',
          'Flight Controller': 'Self-developed, IP67 corrosion-resistant'
        }
      }
    ],
    specifications: {
      'Spray Tank': '60 L',
      'Spread Tank': '80 L',
      'Max Payload': '70 kg',
      'Max Flow Rate': '40 L/min',
      '4D Radar Range': '150 m',
      'Max Speed': '13.8 m/s',
      'Mapping': '13.5 ha per flight',
      'Battery': 'Dual 20 Ah + UPS',
      'Transport Payload': '60 kg, 2 km radius',
      'Protection': 'IP67, aviation aluminum'
    },
    faqs: [
      {
        question: 'What makes the FP700 different from the FP600?',
        answer: 'The FP700 is the flagship: 60L spray (vs 50L), 80L spread (vs 76L), 70kg payload (vs 60kg), 40L/min pump (vs 20L/min), 150m 4D radar (vs standard phased-array), built-in UPS for hot-swap battery changes, and a dedicated transport mode for 60kg logistics. The FP700 is designed for operations where every minute of downtime costs money — mega-farms, commercial spraying contractors, and large-scale orchard management.'
      },
      {
        question: 'How does the built-in UPS work?',
        answer: 'The UPS (uninterruptible power supply) keeps the flight controller, GPS receiver, RTK module, and mission state powered during battery swaps. Instead of a full power-down and cold-start sequence — which loses GNSS lock, requires re-calibration, and drops your current mission — you land, swap both 20Ah packs, and take off within seconds. The mission resumes exactly where it left off. This saves 3–5 minutes per battery change and eliminates GPS re-acquisition drift.'
      },
      {
        question: 'What can the FP700 transport in transport mode?',
        answer: 'Up to 60kg within a 2km radius at a 30m ceiling. Common use cases: delivering pesticides and fertilizer refills to field crews operating ground sprayers, shuttling harvest bins from picking rows to the packing truck, transporting tools and spare parts between barns and distant fields, or moving supplies across terrain that wheeled vehicles cannot cross (flooded fields, steep slopes, muddy tracks).'
      },
      {
        question: 'How does the 150m 4D radar improve safety?',
        answer: 'The automotive-grade 4D mmWave radar scans 150 meters ahead — roughly 3× the range of standard agricultural drone radars — and generates point-cloud imagery that detects not just large obstacles (power lines, windbreaks, silos) but also small ones (branches, poles, guy wires). At the FP700\'s 13.8 m/s top speed, 150m of detection gives the drone over 10 seconds of reaction time — enough to come to a stable stop, re-route, or hover — rather than the 2–3 seconds a 30m radar provides.'
      },
      {
        question: 'How many hectares can the FP700 spray per day?',
        answer: 'At a 15 L/ha application rate with the 40L/min pump, the FP700 covers one hectare in approximately 2.5 minutes of actual spraying. With the 60L tank, that is 4 hectares per sortie. At 10 minutes per flight and 5 minutes turnaround (with UPS hot-swap), expect 10–14 sorties per 8-hour day — roughly 40–55 hectares (100–135 acres). The 80L spread tank at 75 kg/ha covers about 1 hectare per sortie at up to 220 kg/min discharge.'
      },
      {
        question: 'Does the FP700 require special training or certification?',
        answer: 'Yes. The FP700 is a professional agricultural aircraft. In the United States, operations over 25 kg require both a Part 107 remote pilot certificate and a Part 137 agricultural aircraft operator certificate from the FAA. In the EU, the FP700 falls under the EASA Specific category requiring operational authorization. Most countries require operator certification for agricultural UAVs of this size. Partdro offers operator training programs through our regional service centers — contact your local distributor for courses in your area.'
      },
      {
        question: 'What is the Agri Assistant app and what does it do?',
        answer: 'The Agri Assistant is Partdro\'s self-developed mobile and desktop application for mission planning, execution, and data management. It supports multiple operational modes (spray, spread, transport, mapping), features an intuitive UI optimized for gloved-hand operation, includes night mode with full-color FPV, and stores all flight logs, application records, and field maps for compliance reporting. The app runs on the FP700\'s remote controller screen and syncs to your phone or tablet via Wi-Fi.'
      },
      {
        question: 'Can the FP700 spray single-sided (field edge) mode?',
        answer: 'Yes. The four rear-mounted centrifugal nozzles support single-sided spraying — turn off the outboard nozzles when flying a field edge or windward boundary to prevent drift onto adjacent crops, roads, or waterways. This is particularly valuable for orchards bordered by roads, vineyards adjacent to residential areas, and fields near sensitive ecological zones.'
      },
      {
        question: 'What is the warranty and support for the FP700?',
        answer: 'Every FP700 includes a 12-month manufacturing-defect warranty on the airframe, motors, flight controller, remote controller, spray system, spreader, radar module, UPS, and charger. Wear components (propellers, nozzles, pump diaphragms, spreader discs) are covered for 6 months or 500 operating hours. Partdro Care for Agriculture adds two accidental-damage replacements in 12 months with free round-trip shipping. Regional service centers in North America, Europe, and Asia-Pacific provide same-week repair turnaround.'
      },
      {
        question: 'How is the FP700 different from the A80?',
        answer: 'The FP700 and A80 serve different tiers. The A80 is the maximum-capacity machine (75L spray, 150L spread, 80kg payload, LiDAR + mmWave dual radar), built for the largest commercial operations. The FP700 is the high-performance flagship of the FP series (60L spray, 80L spread, 70kg payload, 150m 4D radar, UPS, transport mode). Key differentiators: the A80 has larger tanks and LiDAR; the FP700 has built-in UPS, transport mode, and the 150m 4D radar as standard. Choose the A80 for pure capacity; choose the FP700 for versatility and operational uptime features.'
      }
    ],
    inStock: true,
    isBestSeller: false,
    isNew: true,
    price: 2499900,
    compareAtPrice: 2799900,
    sku: 'PD-FP700-STD',
    stockCount: 10,
    weightGrams: 28000,
    dimensionsCm: { length: 92.0, width: 90.0, height: 68.0 },
    shipping: { freeOver: 50000, flatRate: 2500 }
  },
  {
    id: 'a80',
    code: 'PD-A80',
    name: 'A80 Agriculture Drone',
    nameCn: 'A80 农业无人机',
    description: 'Maximum-capacity agricultural UAV with 75L spray tank, 150L spread tank, 80kg max payload, LiDAR + mmWave dual radar, 34000mAh 18S batteries, and 63-inch propellers — one drone, endless possibilities.',
    descriptionCn: '最大容量农业无人机，75L 喷洒箱、150L 播撒箱、80kg 最大载荷、LiDAR + 毫米波双雷达、34000mAh 18S 电池、63 英寸桨叶——一机多能，无限可能。',
    category: 'agriculture-drones',
    categoryName: 'Agricultural Drones',
    tagline: '75L Spray · 150L Spread · 80kg Payload · LiDAR + mmWave Radar — One Drone, Endless Possibilities',
    image: '/images/a80/hero.png',
    gallery: [
      '/images/a80/hero.png',
      '/images/a80/feature-payload.jpg',
      '/images/a80/feature-tank-75l.jpg',
      '/images/a80/feature-tank-150l.jpg',
      '/images/a80/feature-battery.jpg',
      '/images/a80/feature-charger-ac.jpg',
      '/images/a80/feature-charger-dc.jpg',
      '/images/a80/feature-remote.jpg'
    ],
    features: [
      '75L SPRAY TANK',
      '150L SPREAD TANK',
      '80KG PAYLOAD',
      'LIDAR + MMWAVE',
      '40L/MIN FLOW',
      '63-INCH PROPS'
    ],
    applications: [
      'Field Crop Spraying',
      'Orchard Spraying',
      'Fertilizer Spreading',
      'Precision Mapping',
      'Mountain Terrain',
      'Pest Control'
    ],
    whyReasons: [
      '75L spray tank and 150L spread tank — the absolute largest capacity in the Partdro lineup, designed for commercial operations that demand maximum coverage per sortie with minimum ground time',
      '80kg maximum payload across all mission modes — spraying, spreading, and transport — covering more hectares per flight than any other drone in its class',
      'Dual radar system: 360° hemispherical LiDAR generating 850,000 points per second PLUS mmWave phased-array radar for terrain following — the most comprehensive sensing suite available on an agricultural drone',
      '40L/min max flow rate through four rear-mounted centrifugal nozzles with dynamic circulation mixing that prevents chemical sedimentation — consistent concentration from the first drop to the last',
      '63-inch high-performance folding propellers driven by 34000mAh 18S high-voltage smart batteries — purpose-built for lifting 80kg loads in high-temperature, high-duty-cycle agricultural environments',
      'Three charging options: 12kW smart AC charger, 12kW DC charger, or 11.5kW DC fuel-powered generator — choose the power source that fits your field infrastructure',
      'New separable modular design — switch between spray tank, spread tank, and transport hook in minutes with tool-free quick-release mounts and auto-recognition of attached payload'
    ],
    learnMoreCards: [
      {
        title: '75L Spray Tank — Industry-Leading Coverage',
        description: 'The A80 carries 75 liters of liquid — enough to spray 5 hectares at a 15 L/ha rate in a single sortie. Four rear-mounted centrifugal nozzles with 40L/min combined flow deliver uniform coverage across a 10-meter swath at 30–500μm adjustable droplet size. A dynamic circulation and mixing system keeps chemical suspensions homogeneous from fill-up to empty — no sedimentation, no concentration drift, consistent results on every pass.',
        image: '/images/a80/feature-tank-75l.jpg'
      },
      {
        title: '150L Spread Tank — 400L/Min Discharge',
        description: 'The largest spread tank in the Partdro catalog. Multiple auger feeder configurations dispense granular fertilizer, seeds, urea, and powdered materials at up to 400 L/min across a 10-meter swath. Metered auger feeding ensures accurate dosing; the centrifugal disc ensures even distribution. Supports ultra-low application rates for precision-ag prescription maps — apply exactly the rate each zone needs, no more, no less.',
        image: '/images/a80/feature-tank-150l.jpg'
      },
      {
        title: 'Dual Radar: LiDAR + mmWave — 360° Awareness',
        description: 'No other agricultural drone combines these two sensing modalities. The 360° hemispherical LiDAR generates 850,000 points per second with 90° vertical and 360° horizontal coverage — mapping terrain, trees, and obstacles in every direction simultaneously. The mmWave phased-array radar handles terrain following and reliable detection in dust, fog, and spray mist where optical sensors degrade. Together, they give the A80 full spherical awareness.',
        image: '/images/a80/feature-payload.jpg'
      },
      {
        title: '80kg Payload Transport — Touch-Ground Auto-Release',
        description: 'Switch to transport mode and the A80 lifts 80kg — the heaviest in the Partdro fleet. Smart anti-sway stabilization keeps the load steady through wind gusts and rapid climbs. The touch-ground auto-release system detects ground contact and drops the payload automatically — no second person needed at the delivery point. Real-time weight telemetry displays on the remote controller so you always know exactly what is on the hook.',
        image: '/images/a80/feature-payload.jpg'
      },
      {
        title: 'Three Charging Options — Grid, DC, or Generator',
        description: 'Power infrastructure varies from farm to farm. The A80 adapts: Option 1 is a 12kW smart air-cooled AC charger for grid-connected barns and sheds. Option 2 is a 12kW DC charger for vehicle-based operations and field-edge charging from trucks or tractors. Option 3 is an 11.5kW DC fuel-powered integrated generator — fully off-grid, refill from a diesel can, charge anywhere. All three feature active temperature-controlled heat dissipation.',
        image: '/images/a80/feature-charger-ac.jpg'
      },
      {
        title: '63-Inch Props, 34000mAh 18S — Built for Heavy Lifting',
        description: 'The A80\'s 63-inch high-performance propellers are purpose-designed for sustained 80kg operations in agricultural environments — tough, heat-resistant, and efficient across the full RPM range. Paired with 34000mAh 18S high-voltage smart batteries and a grille-design cooling system, the A80 maintains consistent lift performance even on 40°C days when lesser drones throttle back to protect their cells.',
        image: '/images/a80/feature-battery.jpg'
      }
    ],
    specsGroups: [
      {
        title: 'Flight Performance',
        specs: {
          'Max Takeoff Weight': '105 kg',
          'Empty Weight': '32 kg',
          'Max Payload': '80 kg',
          'Spray Tank Capacity': '75 L',
          'Spread Tank Capacity': '150 L',
          'Max Flight Time': '8 min (full load) / 18 min (no load)',
          'Max Horizontal Speed': '12 m/s',
          'Max Wind Resistance': '10 m/s (Level 5)',
          'Operating Temperature': '0°C to 45°C',
          'Max Service Ceiling': '4,500 m'
        }
      },
      {
        title: 'Spray System',
        specs: {
          'Nozzle Type': 'Four Rear-Mounted Centrifugal',
          'Atomization Range': '30–500 μm',
          'Max Flow Rate': '40 L/min',
          'Spray Width': '4–10 m',
          'Pump': 'Dual-Channel High-Flow Metering, ≤ 5% deviation',
          'Mixing': 'Dynamic circulation — prevents sedimentation'
        }
      },
      {
        title: 'Spreading System',
        specs: {
          'Spread Tank': '150 L',
          'Max Feed Rate': '400 L/min (medium-granule urea)',
          'Spreading Width': 'Up to 10 m',
          'Feeding': 'Metered auger, multiple configurations',
          'Distribution': 'Centrifugal disc',
          'Material Types': 'Granules, seeds, urea, powders, fertilizers'
        }
      },
      {
        title: 'Dual Radar System',
        specs: {
          'LiDAR': '360° hemispherical, 850,000 pts/sec',
          'LiDAR FOV': '360° horizontal × 90° vertical',
          'mmWave Radar': 'Phased-array, terrain following',
          'Combined Coverage': 'Full spherical obstacle awareness',
          'Dust/Fog Performance': 'mmWave maintains detection when optical sensors degrade'
        }
      },
      {
        title: 'Power System',
        specs: {
          'Battery': '34,000 mAh 18S high-voltage smart battery',
          'AC Charger': '12 kW smart air-cooled (single or three-phase)',
          'DC Charger': '12 kW temperature-controlled',
          'Generator': '11.5 kW DC fuel-powered integrated',
          'Cooling': 'Grille-design active heat dissipation'
        }
      },
      {
        title: 'Physical',
        specs: {
          'Propellers': '63-inch high-performance folding',
          'Frame': 'Aviation-grade aluminum alloy',
          'Design': 'Separable modular — tool-free quick-release',
          'Payload Recognition': 'Auto-detection of attached module',
          'Transport Release': 'Touch-ground auto-release with real-time weight data'
        }
      }
    ],
    specifications: {
      'Spray Tank': '75 L',
      'Spread Tank': '150 L',
      'Max Payload': '80 kg',
      'Max Flow Rate': '40 L/min',
      'Max Spread Rate': '400 L/min',
      'Radar': 'LiDAR 360° + mmWave',
      'Battery': '34,000 mAh 18S',
      'Propellers': '63-inch folding',
      'Charger': '12 kW AC / 12 kW DC / 11.5 kW generator',
      'Spray Width': 'Up to 10 m'
    },
    faqs: [
      {
        question: 'How is the A80 different from the FP700?',
        answer: 'The A80 is the maximum-capacity machine. Key differences: 75L spray (vs 60L), 150L spread (vs 80L), 80kg payload (vs 70kg), 400 L/min spread rate (vs 220 kg/min), 34,000mAh 18S battery (vs dual 20Ah), 63-inch props (vs standard), and a dual LiDAR + mmWave radar system (vs 150m 4D radar). The A80 trades the FP700\'s built-in UPS and transport mode for pure, unmatched capacity. Choose the A80 when every liter of tank capacity and every kilogram of payload directly translates to your bottom line.'
      },
      {
        question: 'What is the dual LiDAR + mmWave radar system?',
        answer: 'The A80 combines two complementary sensing technologies. The 360° hemispherical LiDAR generates 850,000 laser points per second across a 90° vertical × 360° horizontal field of view — creating a real-time 3D map of the drone\'s entire surroundings. The mmWave phased-array radar handles terrain following and obstacle detection in conditions where optical sensors struggle — dust clouds from dry fields, spray mist, fog, and low light. Together they provide the most comprehensive obstacle-awareness system on any agricultural drone.'
      },
      {
        question: 'How long does the 34,000mAh battery last?',
        answer: 'At full 80kg payload, expect approximately 8 minutes of flight. At lighter spray-only loads (~50–60kg with partial tank), flight times extend to 12–15 minutes. With the 12kW fast charger, a depleted battery recharges in approximately 12–15 minutes. For continuous all-day operation at maximum capacity, we recommend 4–6 batteries and two chargers so you always have one pack charging while another is in the air.'
      },
      {
        question: 'Can the A80 really spread 400 L/min?',
        answer: 'The 400 L/min figure is measured with medium-granule urea as the test material and represents the maximum discharge rate. Real-world rates vary by material density, granule size, and desired application rate. For comparison: at 400 L/min, the 150L spread tank empties in approximately 22 seconds of continuous discharge — covering roughly 0.5 hectares in a single pass at a 300 kg/ha urea rate. The metered auger system lets you dial this down to ultra-low rates for precision applications.'
      },
      {
        question: 'What charging infrastructure do I need for the A80?',
        answer: 'You have three options. If you have grid power (single or three-phase) in your barn or shed, the 12kW AC charger plugs into a standard high-amperage outlet. For vehicle-based operations, the 12kW DC charger runs off a truck or tractor electrical system. For fully off-grid operations, the 11.5kW DC fuel-powered generator runs on diesel — refill from a jerry can and charge anywhere in the field. Most commercial operators use a combination: AC charger at the home base, generator for remote fields.'
      },
      {
        question: 'How does the separable modular design work?',
        answer: 'The A80\'s frame uses tool-free quick-release mounts at the payload attachment points. The spray tank, spread tank, and transport hook each have a standardized interface. When you attach a module, the flight controller auto-detects which payload is connected and loads the appropriate flight parameters, pump/spreader settings, and weight limits. Switching from a spray mission to a spread mission takes under two minutes with no tools and no software reconfiguration.'
      },
      {
        question: 'What is the dynamic circulation mixing system?',
        answer: 'Traditional spray tanks can develop concentration gradients — heavier chemical compounds settle toward the bottom while lighter fractions float, meaning your first hectare gets a different dose than your last. The A80\'s dynamic circulation system continuously recirculates the tank contents through a mixing loop during flight, keeping the suspension homogeneous from fill-up to empty. The result: consistent application rates across every hectare of every sortie.'
      },
      {
        question: 'Does the A80 require a pilot license?',
        answer: 'Yes — the A80 is the heaviest and most powerful drone in the Partdro lineup, and it falls firmly under commercial agricultural aviation regulations in every jurisdiction. In the United States, you need a Part 107 certificate plus a Part 137 agricultural aircraft operator certificate. In the EU, it falls under EASA\'s Specific category requiring operational authorization. Most countries require certified operator training for UAVs of this size and capability. Contact your Partdro distributor for training programs in your region.'
      },
      {
        question: 'Can the A80 operate at night?',
        answer: 'Yes. The A80 supports night operations with full-color low-light FPV and the dual radar system — which works independently of ambient light. Night spraying is often more effective: wind speeds are lower, temperatures are cooler (reducing evaporation), and temperature inversions improve spray deposition. The mmWave radar maintains full obstacle detection in total darkness. Check local regulations for night agricultural drone operation requirements.'
      },
      {
        question: 'What warranty comes with the A80?',
        answer: 'Every A80 includes a 12-month manufacturing-defect warranty on the airframe, motors, flight controller, remote controller, spray system, spreader, LiDAR, mmWave radar, batteries, and chargers. Wear items (propellers, nozzles, pump diaphragms, spreader discs, auger components) are covered for 6 months or 500 operating hours. Partdro Care for Agriculture provides two accidental-damage replacements in 12 months with free round-trip shipping. Regional service centers in North America, Europe, and Asia-Pacific provide priority support for A80 operators.'
      }
    ],
    inStock: true,
    isBestSeller: false,
    isNew: true,
    price: 2999900,
    compareAtPrice: 3399900,
    sku: 'PD-A80-STD',
    stockCount: 8,
    weightGrams: 32000,
    dimensionsCm: { length: 105.0, width: 102.0, height: 72.0 },
    shipping: { freeOver: 50000, flatRate: 2500 }
  },
  {
    id: 'fp300e',
    code: 'PD-FP300E',
    name: 'FP300E Agriculture Drone',
    nameCn: 'FP300E 农业无人机',
    description: 'Compact foldable agricultural UAV with 30L spray tank, 45L spread tank, 30kg max payload, 150m 4D radar, and a hug-folding design light enough for single-person carry — the ideal entry point for precision agriculture.',
    descriptionCn: '紧凑可折叠农业无人机，30L 喷洒箱、45L 播撒箱、30kg 最大载荷、150m 4D 雷达、抱折叠设计、单人可携——精准农业的理想入门之选。',
    category: 'agriculture-drones',
    categoryName: 'Agricultural Drones',
    tagline: '30L Spray · 45L Spread · 30kg Payload · 150m Radar · Single-Person Carry — Smart Farming Starts Here',
    image: '/images/fp300e/hero.png',
    gallery: [
      '/images/fp300e/hero.png',
      '/images/fp300e/feature-banner.png',
      '/images/fp300e/feature-carry.jpg',
      '/images/fp300e/feature-foldable.jpg',
      '/images/fp300e/feature-mode-switch.jpg',
      '/images/fp300e/feature-spreading.png',
      '/images/fp300e/feature-remote.jpg',
      '/images/fp300e/feature-radar.jpg',
      '/images/fp300e/feature-modular.jpg',
      '/images/fp300e/feature-battery.png'
    ],
    features: [
      '30L SPRAY TANK',
      '45L SPREAD TANK',
      '30KG PAYLOAD',
      'IP67 RATED',
      '150M 4D RADAR',
      '1-PERSON CARRY'
    ],
    applications: [
      'Field Crop Spraying',
      'Orchard Spraying',
      'Fertilizer Spreading',
      'Precision Mapping',
      'Mountain Terrain',
      'Pest Control'
    ],
    whyReasons: [
      'Compact hug-folding design — folds small enough for a single person to carry from the truck to the field, fits in a standard SUV trunk or pickup bed without a trailer',
      '30L spray tank and 45L spread tank with 30kg payload — the right capacity for small to medium farms, orchard blocks, and terraced fields where larger drones are too bulky to maneuver',
      '150m 4D radar with point-cloud imaging — the same detection range as the flagship FP700 in a compact frame, spotting power lines, branches, and terrain changes well before impact',
      'IP67-rated modular flight control system with corrosion-resistant coating — built to handle daily pesticide and fertilizer exposure without the maintenance headaches of unsealed electronics',
      'Innovative wind-pressure dual centrifugal nozzles with dual-channel high-flow metering pump — fine atomization from 30–500μm with precise flow control and consistent spray patterns',
      '7-inch high-brightness smart remote controller running the latest Agri Assistant software — plan routes, execute missions, and review application records all from one screen',
      '20000mAh high-performance battery with 4500W smart charger — lightweight and portable power system; two batteries and one charger fit in the included carry case for true single-person deployment'
    ],
    learnMoreCards: [
      {
        title: 'Compact Body — Single Person, No Trailer',
        description: 'The FP300E\'s hug-folding design collapses the arms and landing gear into a compact package that one person can carry from the truck bed to the field edge. No trailer, no ramp, no second set of hands. Unfold, attach the tank, load the battery, and you are spraying in under three minutes. When the day is done, fold it back up and lift it into the vehicle — no heavy equipment required.',
        image: '/images/fp300e/feature-carry.jpg'
      },
      {
        title: '30L Tank, 30kg Payload — Right-Sized for Small Farms',
        description: 'Not every farm needs 75 liters of capacity. The FP300E\'s 30L spray tank covers approximately 2 hectares per sortie at a 15 L/ha rate — ideal for small to medium fields, orchard blocks, vegetable farms, and terraced hillside plots. The 45L spread tank handles fertilizer, seeds, and bait at up to 100 kg/min. Less chemical handling, less waste, less weight to carry — exactly the right scale for farms under 100 hectares.',
        image: '/images/fp300e/feature-spreading.png'
      },
      {
        title: 'Dual Centrifugal Nozzles — Fine Mist, Even Coverage',
        description: 'Wind-pressure dual centrifugal nozzles atomize liquid through high-speed rotation instead of pressure — no clogged tips, no uneven fan patterns, and consistent droplet size from 30–500μm. The dual-channel high-flow metering pump delivers precise flow control with the same accuracy as the flagship models. Corrosion-resistant materials throughout the fluid path handle aggressive chemicals without degradation.',
        image: '/images/fp300e/feature-mode-switch.jpg'
      },
      {
        title: '150m 4D Radar — Flagship Safety in a Compact Frame',
        description: 'The FP300E inherits the same 150-meter 4D radar system from the FP700. It scans ahead for power lines, windbreaks, trees, and terrain changes, generating point-cloud imagery for reliable obstacle detection. At the FP300E\'s operating speeds, 150 meters gives ample reaction time to stop, reroute, or hover. Small farm does not mean small safety — you get the same protection as operators flying 70kg flagships.',
        image: '/images/fp300e/feature-radar.jpg'
      },
      {
        title: '7-Inch Smart Remote — Plan, Fly, Review',
        description: 'The 7-inch high-brightness screen runs the full Agri Assistant application — the same software that powers the FP700 and A80. Plan field boundaries with auxiliary-point mapping, set application rates per zone, execute the mission autonomously, and review spray logs and coverage maps afterward. Night mode with enhanced full-color FPV keeps you flying when conditions are optimal, even after sunset.',
        image: '/images/fp300e/feature-remote.jpg'
      },
      {
        title: '20000mAh Battery + 4500W Charger — Light & Fast',
        description: 'The 20000mAh high-performance battery delivers consistent power for full-tank spray missions. The 4500W smart charger refills a depleted pack quickly, and the lightweight two-battery-one-charger kit fits in the included carry case. For a full day of operations, three batteries and one charger keep you in a fly-charge-fly rotation with minimal idle time — all carried by one person in one vehicle.',
        image: '/images/fp300e/feature-battery.png'
      }
    ],
    specsGroups: [
      {
        title: 'Flight Performance',
        specs: {
          'Max Takeoff Weight': '42 kg',
          'Empty Weight': '16 kg',
          'Max Payload': '30 kg',
          'Spray Tank Capacity': '30 L',
          'Spread Tank Capacity': '45 L',
          'Max Flight Time': '15 min (full load) / 28 min (no load)',
          'Max Horizontal Speed': '10 m/s',
          'Max Wind Resistance': '8 m/s (Level 4)',
          'Operating Temperature': '0°C to 45°C',
          'Max Service Ceiling': '4,000 m',
          'Spray Efficiency': 'Up to 10.67 ha/hr',
          'Spread Efficiency': 'Up to 1.5 t/hr'
        }
      },
      {
        title: 'Spray System',
        specs: {
          'Nozzle Type': 'Dual Wind-Pressure Centrifugal',
          'Atomization Range': '30–500 μm',
          'Max Flow Rate': '10 L/min',
          'Pump': 'Dual-Channel High-Flow Metering',
          'Spray Width': '4–8 m',
          'Materials': 'Corrosion-resistant throughout fluid path'
        }
      },
      {
        title: 'Spreading System',
        specs: {
          'Spread Tank': '45 L',
          'Max Feed Rate': '100 kg/min (compound fertilizer)',
          'Spreading Width': 'Up to 10 m',
          'Feeding': 'Roller discharging, precise & even',
          'Material Types': 'Granules, seeds, bait, fertilizers — various sizes and densities'
        }
      },
      {
        title: '4D Radar & Sensing',
        specs: {
          'Type': '4D mmWave with point-cloud imaging',
          'Max Detection Range': '150 m',
          'Obstacle Detection': 'Power lines, windbreaks, trees, small obstacles',
          'Terrain Following': 'Autonomous slope recognition'
        }
      },
      {
        title: 'Power System',
        specs: {
          'Battery': '20,000 mAh high-performance',
          'Charger': '4,500 W smart charger',
          'Kit': '2 batteries + 1 charger, fits in carry case',
          'Battery Type': 'LiPo'
        }
      },
      {
        title: 'Physical',
        specs: {
          'Frame Material': 'High-strength aluminum alloy',
          'Protection Rating': 'IP67 (flight controller and connectors)',
          'Design': 'Hug-folding foldable arms & landing gear',
          'Portability': 'Single-person carry, SUV-trunk transportable',
          'Deployment Time': 'Under 3 minutes (unfold to airborne)',
          'FCU/PMU': 'Modular, IP67 corrosion-resistant'
        }
      }
    ],
    specifications: {
      'Spray Tank': '30 L',
      'Spread Tank': '45 L',
      'Max Payload': '30 kg',
      'Max Flow Rate': '10 L/min',
      'Spray Efficiency': '10.67 ha/hr',
      '4D Radar': '150 m detection',
      'Battery': '20,000 mAh',
      'Charger': '4,500 W',
      'Protection': 'IP67',
      'Carry': 'Single person, foldable'
    },
    faqs: [
      {
        question: 'Who is the FP300E designed for?',
        answer: 'The FP300E is built for small to medium farms (under 100 hectares), orchard and vineyard operators with narrow row spacing, hillside and terrace farmers where larger drones cannot maneuver, and first-time agricultural drone adopters who want professional-grade features without the cost and complexity of a 75L flagship. It is also popular as a second drone for large operations — use the A80 or FP700 for broad-acre work and the FP300E for tight orchard blocks and spot spraying.'
      },
      {
        question: 'Can one person really carry and operate the FP300E alone?',
        answer: 'Yes. The FP300E weighs approximately 16 kg empty (without battery or tank). The hug-folding design collapses the arms and landing gear into a compact shape that one person can lift from a truck bed and carry to the field. The 30L tank is light enough to fill and mount solo. The entire kit — drone, two batteries, charger, remote controller, and spare nozzles — fits in a standard SUV trunk. Single-person deployment from vehicle to airborne takes under three minutes.'
      },
      {
        question: 'How many acres can the FP300E spray per day?',
        answer: 'At a 15 L/ha rate, the 30L tank covers 2 hectares (5 acres) per sortie. At approximately 10.67 ha/hr spray efficiency, expect 40–50 hectares (100–125 acres) in a typical 8-hour day with proper battery rotation. The 45L spread tank at 75 kg/ha covers about 0.6 hectares per sortie. For a 50-hectare farm, the FP300E handles a full spray cycle in a single day.'
      },
      {
        question: 'Does the FP300E have the same radar as the FP700?',
        answer: 'Yes — the FP300E uses the same 150-meter 4D millimeter-wave radar with point-cloud imaging found on the flagship FP700. It detects power lines, windbreaks, trees, terrain changes, and small obstacles well before they become a threat. The same radar across the product line means the same safety margin whether you are flying a 30kg entry-level drone or a 70kg flagship.'
      },
      {
        question: 'What is the foldable "hug-folding" design?',
        answer: 'Hug-folding means the four arms fold inward toward the drone body (like a hug) rather than folding backward or requiring removal. The landing gear collapses as well. Once folded, the FP300E is roughly the size of a large suitcase — compact enough to fit in a car trunk, truck cab, or small storage shed. No tools required for folding or unfolding.'
      },
      {
        question: 'How is the FP300E different from the FP500?',
        answer: 'The FP300E is the compact entry point: 30L spray (vs 40L), 45L spread (vs 55L), 30kg payload (vs 40kg), 10 L/min flow (vs 8 L/min), 150m 4D radar (vs 40m phased-array), single-person foldable carry (vs trailer-needed). The FP500 carries more per sortie; the FP300E deploys faster, costs less, and fits operations where portability and simplicity matter more than raw tank capacity.'
      },
      {
        question: 'Is the FP300E suitable for orchard spraying?',
        answer: 'Yes — in fact its compact size makes it especially well-suited for orchards and vineyards with narrow row spacing, low-hanging branches, and tight turning room where larger drones cannot safely maneuver. The 150m radar detects branches and terrain changes; the 3D flight planning handles slopes and tree rows. The 30L tank is sized for orchard blocks — fewer refills in the middle of rows compared to smaller backpack sprayers, but light enough to hand-carry between blocks.'
      },
      {
        question: 'What batteries and charger come with the FP300E?',
        answer: 'The standard kit includes one 20,000 mAh battery and one 4,500W smart charger. Most operators add at least one spare battery (sold separately) for a fly-charge rotation. The two-battery-one-charger kit fits in the included carry case. For all-day operation, 3–4 batteries and one charger maintain continuous rotation with approximately 15-minute charge times per pack.'
      },
      {
        question: 'Does the FP300E support night operations?',
        answer: 'Yes. The FP300E includes night mode with enhanced full-color FPV for low-light visibility. The 4D radar operates independently of ambient light, maintaining full obstacle detection capability in total darkness. Night spraying offers several advantages: lower wind speeds, cooler temperatures (reducing evaporation), and better spray deposition due to temperature inversions. Check local regulations for night agricultural drone operations.'
      },
      {
        question: 'What is the warranty and after-sales support?',
        answer: 'Every FP300E ships with a 12-month manufacturing-defect warranty covering the airframe, motors, flight controller, remote controller, spray system, radar module, battery, and charger. Wear items (propellers, nozzles, pump diaphragms) are covered for 6 months or 500 operating hours. Partdro Care for Agriculture extends coverage to two accidental-damage replacements in 12 months with free round-trip shipping. The FP300E is supported by the same regional service center network as the FP700 and A80.'
      }
    ],
    inStock: true,
    isBestSeller: false,
    isNew: true,
    price: 999900,
    compareAtPrice: 1199900,
    sku: 'PD-FP300E-STD',
    stockCount: 25,
    weightGrams: 16000,
    dimensionsCm: { length: 65.0, width: 62.0, height: 55.0 },
    shipping: { freeOver: 50000, flatRate: 2500 }
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