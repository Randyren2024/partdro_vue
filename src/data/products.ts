// Vesper AgriTech Products Data
// Structured per Vesper categories

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
  isVesper?: boolean
}

export const categories = [
  {
    id: 'lawn-mower',
    name: 'Lawn Mower',
    nameCn: '园林机器人',
    description: 'Remote control robotic lawn mowers for steep slopes and large lawns',
    icon: 'lawn-mower'
  },
  {
    id: 'precision-agriculture',
    name: 'Precision Agriculture',
    nameCn: '精准农业',
    description: 'Advanced auto-steering systems including AF718, AF305, and ISOBUS terminal',
    icon: 'precision-agriculture'
  },
  {
    id: 'precision-spraying',
    name: 'Precision Agriculture Solutions',
    nameCn: '精准农业解决方案',
    description: 'Precision spraying solutions including VS100 Spray Control System',
    icon: 'precision-spraying'
  },
  {
    id: 'land-leveling',
    name: 'Land Leveling System',
    nameCn: '土地整平系统',
    description: 'GPS-controlled land leveling systems for sustainable agriculture',
    icon: 'land-leveling'
  },
  {
    id: 'machine-control',
    name: 'Machine Control',
    nameCn: '机械控制',
    description: 'Intelligent guidance systems for construction and mining equipment',
    icon: 'machine-control'
  }
  // agricultural-robotics hidden until Lanjiang products are ready
]

export const products: Product[] = [
  // =====================
  // Lawn Robots
  // =====================
  {
    id: 'vesper-s1-4wd-50',
    code: 'S1 4WD 50°',
    name: 'Remote Control Lawn Mower — 119% Slope (Grip Tread)',
    nameCn: 'S1 4WD 50° 遥控割草机器人',
    description: 'Sit on your porch. Grab the controller. Watch the S1 4WD conquer 50° (119% Grade) slopes while you stay cool in the shade. 3.94" obstacle clearance, 1000W traction, and a 21" deck with 1985W peak cutting power — the S1 rips through 51" tall grass, wet patches, and dense weeds that defeat every other mower. From the first spring mow to the last fall cleanup: discharge, mulch, bag, and a 931 CFM leaf-shredding vacuum with 70 L collection bag.',
    descriptionCn: 'S1 4WD 50° 遥控割草机器人 — 119% 坡度全轮驱动，10cm 越障能力，53cm 割草幅宽，1985W 峰值切割功率，碎叶吸尘一体。',
    category: 'lawn-mower',
    categoryName: 'Lawn Mower',
    tagline: 'Remember the joy of RC cars as a kid? We brought that feeling back to your lawn.',
    features: [
      '50° (119%) slope, 10 cm obstacle clearance',
      '53 cm deck, 1985W peak cutting power',
      '2000 ㎡/h coverage (3× faster)',
      'Runtime up to 2.25h (18Ah) / 1.5h (12Ah)',
      'Discharge, Mulch, Bag + Leaf-Shredding Vacuum',
      '4-Motor AWD, FOC torque control, 5ms response'
    ],
    whyReasons: [
      'All-Wheel Beast Drive tackles 50° (119% Grade) slopes — where other mowers stall, the S1 4WD keeps climbing',
      '10 cm obstacle clearance plus aggressive grip tread tires crush tree roots, exposed rocks, and uneven ground without losing momentum',
      '1985W peak cutting power with 8.13 N·m torque chews through 1.3 m tall, matted, wet grass without bogging down',
      'Multi-season yard care: discharge, mulch, bag, and a 931 CFM leaf-shredding vacuum — replaces mower, rake, and blower in one machine',
      'No RTK setup, no app pairing, no fuel — pick up the remote and mow in seconds, from up to 400 m away',
      'Engineered by former DJI experts, built with aircraft-grade aluminum body and DC06 deep-draw steel deck for years of heavy use'
    ],
    specsGroups: [
      {
        title: 'Performance',
        specs: {
          'Max Slope': '50° (119% Grade)',
          'Obstacle Clearance': '10 cm',
          'Cutting Width': '53 cm (21")',
          'Peak Cutting Power': '1985 W',
          'Cutting Torque': '8.13 N·m',
          'Max Tall Grass Cut': '130 cm',
          'Top Speed': '1.5 m/s',
          'Cutting Efficiency': '2000 ㎡/hr (3× coverage)'
        }
      },
      {
        title: 'Power & Battery',
        specs: {
          'Battery': '56V automotive-grade LiFePO₄',
          'Battery Capacity': '12Ah (3000 ㎡) / 18Ah (4500 ㎡)',
          'Cycle Life': '1500+ cycles (3× industry average)',
          'Runtime (12Ah)': 'Up to 1.5 hours',
          'Runtime (18Ah)': 'Up to 2.25 hours',
          'Charging Time (600W)': '~70 min (12Ah) / ~90 min (18Ah)',
          'Drive': '4-Motor AWD, 4× independent brushless, 1000W traction output',
          'Control': 'FOC torque control, electronic braking, 5ms response'
        }
      },
      {
        title: 'Build & Safety',
        specs: {
          'Chassis': 'High-clearance aluminum alloy (aircraft-grade)',
          'Deck Material': 'DC06 deep-draw stamped steel',
          'Tires': '12mm non-directional tread teeth, semi-solid TPU',
          'Weight': '64 kg',
          'Remote Control': 'DJI-grade, 5ms response, 400m range',
          'Safety': '4 ultrasonic sensors + front bumper, tilt/roll auto-stop',
          'Vacuum Suction': '931 CFM, 70 L collection bag',
          'Modes': 'Discharge, Mulch, Bag, Leaf Shredding Vacuum',
          'Warranty': '24-month (main unit, remote, battery)'
        }
      }
    ],
    specifications: {
      'Max Slope': '50° (119% Grade)',
      'Drive': '4WD (4-Motor AWD)',
      'Cutting Width': '53 cm',
      'Peak Cutting Power': '1985 W',
      'Coverage per Charge': 'Up to 4500 ㎡ (18Ah)',
      'Runtime': 'Up to 2.25h (18Ah) / 1.5h (12Ah)',
      'Battery': '56V LiFePO₄, 1500+ cycles',
      'Remote Range': '400 m (DJI-grade)',
      'Weight': '64 kg',
      'Modes': 'Discharge / Mulch / Bag / Vacuum'
    },
    faqs: [
      { question: 'What is the difference between the 50° Grip Tread and 40° Wide Wheel editions?', answer: 'Both use the same 4-Motor AWD platform, 53 cm deck, and 1985W peak power. The 50° Grip Tread edition uses aggressive tread tires for maximum slope climbing on 50° (119% grade) terrain. The 40° Wide Wheel edition uses wider TPU tires for a larger contact patch — preferred for soft soil, mud, and customers who want extra stability.' },
      { question: 'How long does the battery last and what is the maximum mowing area?', answer: 'Powered by 56V LiFePO₄ batteries with 1500 cycles — 3× the industry average. The 18Ah battery runs up to 2h 15m and covers up to 4500 ㎡ per charge. The 12Ah runs up to 1h 30m and covers 3000 ㎡. Charging from a 600W charger takes ~90 min (18Ah) and ~70 min (12Ah).' },
      { question: 'What safety features protect the operator and bystanders?', answer: 'The S1 has 4 ultrasonic sensors that detect obstacles, people, and pets — slowing or stopping the machine and blades on approach. A front bumper adds an impact buffer. Tilt and roll-over sensors automatically stop the blades if the unit tips beyond a safe angle.' },
      { question: 'Is it controlled only by a remote, and how far does it reach?', answer: 'Yes — operated entirely by the included remote control. Signal range reaches up to 400 m. For large areas, one-touch straight-line and one-touch turning functions are available. For safety and visual range, 100 m is the recommended working distance.' },
      { question: 'What mowing modes are available?', answer: 'Three primary modes: Mulching (cuts clippings into fine fragments that fertilize the lawn), Bagging (collects clippings in a rear bag for easy disposal), and Rear Discharge (expels clippings out the back for quick cleanup). The 4-in-1 add-on adds the leaf-shredding vacuum.' },
      { question: 'What maintenance does the S1 require?', answer: 'Routine maintenance is limited to blade replacement and machine cleaning. There is no oil, no spark plugs, no fuel filter. LiFePO₄ batteries need only a top-up charge every 3 months during long-term storage to stay above 70%.' }
    ],
    applications: [
      'Steep Slopes (up to 50°)',
      'Waterfront Grass',
      'Narrow Side Yards',
      'Dense Woods',
      'Muddy Wet Patches',
      'Exposed Tree Roots',
      'Roadside Lawn Strips',
      'Tall & Wet Grass (up to 1.3m)',
      'Fall Leaf Cleanup'
    ],
    learnMoreCards: [
      {
        title: 'All-Wheel Beast Drive',
        description: '4-Motor AWD with 4× independent brushless motors delivers 1000W of traction output. Combined with 12mm grip-tread tires, the S1 4WD maintains grip on 50° slopes, wet grass, and loose soil — terrain that defeats walk-behind and ride-on mowers.',
        image: '/images/vesper/remote.webp'
      },
      {
        title: '1985W Peak Cutting Power',
        description: '8.13 N·m of cutting torque chews through 1.3 m tall grass, wet matted patches, and tough weeds without stalling. The high-lift blade creates strong airflow that stands grass up for a clean, even cut on the first pass.',
        image: '/images/vesper/tall-grass.webp'
      },
      {
        title: 'Multi-Season Yard Care',
        description: 'Switch between Discharge, Mulch, Bag, and the 931 CFM leaf-shredding vacuum. The 70 L collection bag turns autumn leaves into fine mulch in one pass — replace the rake, blower, and chipper with a single machine.',
        image: '/images/vesper/vacuum.webp'
      },
      {
        title: 'Engineered Like a Tank',
        description: 'Aircraft-grade aluminum chassis paired with DC06 deep-draw stamped steel deck stands up to commercial-duty use. Modular, service-friendly design — replace blades, batteries, and key parts in minutes with no specialized tools.',
        image: '/images/vesper/aluminum.webp'
      },
      {
        title: 'Ready in Seconds',
        description: 'No RTK base station to set up, no app to pair, no fuel to mix. Pick up the DJI-grade remote and the S1 connects in under 5 seconds. Mow from up to 400 m away — from the porch, the shade, or the office window.',
        image: '/images/vesper/no-rtk.webp'
      },
      {
        title: 'Local AU Support',
        description: 'Local repair hubs in NSW and Victoria, 2-year warranty on the main unit, remote, and battery, and 30-day return policy. Vesper AU is engineered by former DJI experts and supported by a local team that responds within 2 business days.',
        image: '/images/vesper/local-repair.webp'
      }
    ],
    gallery: [
      '/images/products/vesper-s1-4wd-50.webp',
      '/images/vesper/s1-4wd-50/g1.webp',
      '/images/vesper/s1-4wd-50/g2.webp',
      '/images/vesper/s1-4wd-50/g3.webp',
      '/images/vesper/s1-4wd-50/g4.webp',
      '/images/vesper/s1-4wd-50/g5.webp',
      '/images/vesper/s1-4wd-50/g6.webp',
      '/images/vesper/s1-4wd-50/g7.webp',
      '/images/vesper/s1-4wd-50/g8.webp',
      '/images/vesper/s1-4wd-50/g9.webp',
      '/images/vesper/s1-4wd-50/g10.webp'
    ],
    image: '/images/products/vesper-s1-4wd-50.webp',
    inStock: true,
    isBestSeller: true,
    isNew: true,
    isVesper: true
  },
  {
    id: 'vesper-s1-4wd-40',
    code: 'S1 4WD 40°',
    name: 'Remote Control Lawn Mower — 85% Slope (Wide Wheel)',
    nameCn: 'S1 4WD 40° 遥控割草机器人',
    description: 'The S1 4WD Wide Wheel Edition climbs 40° (85% Grade) slopes with a wider TPU contact patch and bold straight-tread pattern for stronger grip on steeper lawns, damp grass, and soft ground. Same 4-Motor AWD platform, 21" deck, 1985W peak cutting power, and 3.94" obstacle clearance as the 50° — with the sweet-spot tire for everyday steep terrain.',
    descriptionCn: 'S1 4WD 40° 遥控割草机器人 — 85% 坡度宽幅轮胎版，更强抓地力，53cm 割草幅宽，1985W 峰值功率，10cm 越障能力。',
    category: 'lawn-mower',
    categoryName: 'Lawn Mower',
    tagline: 'Remember the joy of RC cars as a kid? We brought that feeling back to your lawn.',
    features: [
      '40° (85%) slope, 10 cm obstacle clearance',
      '53 cm deck, 1985W peak cutting power',
      '2000 ㎡/h coverage, 3× faster',
      'Runtime up to 2.25h (18Ah) / 1.5h (12Ah)',
      'Wide TPU Tread Wheels for max grip',
      'Discharge, Mulch, Bag + Leaf-Shredding Vacuum'
    ],
    whyReasons: [
      'Wide TPU tread tires deliver a wider contact patch and puncture-free durability — added stability on 40° (85% Grade) slopes without sacrificing agility',
      '10 cm obstacle clearance plus 4-Motor AWD crushes exposed tree roots, rocks, and uneven ground without losing momentum',
      '1985W peak cutting power with 8.13 N·m torque chews through 1.3 m tall, matted, wet grass on the first pass',
      'Multi-season yard care: 4-in-1 mode (discharge, mulch, bag, vacuum) replaces the mower, rake, and blower in one machine',
      'No RTK setup, no app pairing, no fuel — pick up the DJI-grade remote and mow in seconds from up to 400 m away',
      'Aircraft-grade aluminum body, DC06 deep-draw steel deck, and modular design for years of commercial-duty mowing'
    ],
    specsGroups: [
      {
        title: 'Performance',
        specs: {
          'Max Slope': '40° (85% Grade)',
          'Obstacle Clearance': '10 cm',
          'Cutting Width': '53 cm (21")',
          'Peak Cutting Power': '1985 W',
          'Cutting Torque': '8.13 N·m',
          'Max Tall Grass Cut': '130 cm',
          'Top Speed': '1.5 m/s',
          'Cutting Efficiency': '2000 ㎡/hr'
        }
      },
      {
        title: 'Power & Battery',
        specs: {
          'Battery': '56V automotive-grade LiFePO₄',
          'Battery Capacity': '12Ah (3000 ㎡) / 18Ah (4500 ㎡)',
          'Cycle Life': '1500+ cycles (3× industry average)',
          'Runtime (12Ah)': 'Up to 1.5 hours',
          'Runtime (18Ah)': 'Up to 2.25 hours',
          'Charging Time (600W)': '~70 min (12Ah) / ~90 min (18Ah)',
          'Drive': '4-Motor AWD, 4× independent brushless, 1000W traction output',
          'Control': 'FOC torque control, electronic braking, 5ms response'
        }
      },
      {
        title: 'Build & Safety',
        specs: {
          'Chassis': 'Aircraft-grade aluminum alloy',
          'Deck Material': 'DC06 deep-draw stamped steel',
          'Tires': 'Wide TPU tread wheels, puncture-free',
          'Weight': '64 kg',
          'Remote Control': 'DJI-grade, 5ms response, 400m range',
          'Safety': '4 ultrasonic sensors + front bumper, tilt/roll auto-stop',
          'Vacuum Suction': '931 CFM, 70 L collection bag',
          'Modes': 'Discharge, Mulch, Bag, Leaf Shredding Vacuum',
          'Warranty': '24-month (main unit, remote, battery)'
        }
      }
    ],
    specifications: {
      'Max Slope': '40° (85% Grade)',
      'Drive': '4WD (4-Motor AWD, Wide TPU Tires)',
      'Cutting Width': '53 cm',
      'Peak Cutting Power': '1985 W',
      'Coverage per Charge': 'Up to 4500 ㎡ (18Ah)',
      'Runtime': 'Up to 2.25h (18Ah) / 1.5h (12Ah)',
      'Battery': '56V LiFePO₄, 1500+ cycles',
      'Remote Range': '400 m (DJI-grade)',
      'Weight': '64 kg',
      'Modes': 'Discharge / Mulch / Bag / Vacuum'
    },
    faqs: [
      { question: 'How is the 40° Wide Wheel edition different from the 50° model?', answer: 'Both use the same 4-Motor AWD platform, 53 cm deck, and 1985W peak power. The 40° Wide Wheel edition is tuned for slightly less extreme slopes and uses wider TPU tread tires for a larger contact patch — preferred for soft soil, mud, and customers who want extra stability at the cost of maximum slope rating.' },
      { question: 'What is the difference between the 50° Grip Tread and 40° Wide Wheel editions?', answer: 'Both use the same 4-Motor AWD platform, 53 cm deck, and 1985W peak power. The 50° Grip Tread edition uses aggressive tread tires for maximum slope climbing on 50° (119% grade) terrain. The 40° Wide Wheel edition uses wider TPU tires for a larger contact patch — preferred for soft soil, mud, and customers who want extra stability.' },
      { question: 'How long does the battery last and what is the maximum mowing area?', answer: 'Powered by 56V LiFePO₄ batteries with 1500 cycles — 3× the industry average. The 18Ah battery runs up to 2h 15m and covers up to 4500 ㎡ per charge. The 12Ah runs up to 1h 30m and covers 3000 ㎡.' },
      { question: 'What safety features protect the operator and bystanders?', answer: 'The S1 has 4 ultrasonic sensors that detect obstacles, people, and pets — slowing or stopping the machine and blades on approach. A front bumper adds an impact buffer. Tilt and roll-over sensors automatically stop the blades if the unit tips beyond a safe angle.' },
      { question: 'Is it controlled only by a remote, and how far does it reach?', answer: 'Yes — operated entirely by the included remote control. Signal range reaches up to 400 m. For safety and visual range, 100 m is the recommended working distance.' },
      { question: 'What mowing modes are available?', answer: 'Three primary modes: Mulching, Bagging, and Rear Discharge. The 4-in-1 add-on adds the 931 CFM leaf-shredding vacuum for fall cleanup.' }
    ],
    applications: [
      'Steep Slopes (up to 40°)',
      'Waterfront Grass',
      'Narrow Side Yards',
      'Dense Woods',
      'Muddy Wet Patches',
      'Exposed Tree Roots',
      'Roadside Lawn Strips',
      'Tall & Wet Grass (up to 1.3m)',
      'Fall Leaf Cleanup'
    ],
    learnMoreCards: [
      {
        title: 'Wide TPU Tread Wheels',
        description: 'Wider contact patch for maximum grip on 40° (85% Grade) slopes, soft soil, and wet grass. Puncture-free TPU construction stands up to rocks, thorns, and rough terrain that would flat a pneumatic tire.',
        image: '/images/vesper/remote.webp'
      },
      {
        title: '1985W Peak Cutting Power',
        description: '8.13 N·m of cutting torque chews through 1.3 m tall grass, wet matted patches, and tough weeds without stalling. High-lift blade creates strong airflow for a clean, even cut on the first pass.',
        image: '/images/vesper/tall-grass.webp'
      },
      {
        title: 'Multi-Season Yard Care',
        description: 'Switch between Discharge, Mulch, Bag, and the 931 CFM leaf-shredding vacuum. The 70 L collection bag turns autumn leaves into fine mulch in one pass.',
        image: '/images/vesper/vacuum.webp'
      },
      {
        title: 'Engineered Like a Tank',
        description: 'Aircraft-grade aluminum chassis paired with DC06 deep-draw stamped steel deck stands up to commercial-duty use. Modular, service-friendly design — replace blades, batteries, and key parts in minutes.',
        image: '/images/vesper/steel-deck.webp'
      },
      {
        title: 'Ready in Seconds',
        description: 'No RTK base station, no app pairing, no fuel. Pick up the DJI-grade remote and the S1 connects in under 5 seconds. Mow from up to 400 m away.',
        image: '/images/vesper/no-rtk.webp'
      },
      {
        title: 'Local AU Support',
        description: 'Local repair hubs in NSW and Victoria, 2-year warranty on the main unit, remote, and battery, and 30-day return policy. Support team responds within 2 business days.',
        image: '/images/vesper/local-repair.webp'
      }
    ],
    gallery: [
      '/images/products/vesper-s1-4wd-40.webp',
      '/images/vesper/s1-4wd-40/g1.webp',
      '/images/vesper/s1-4wd-40/g2.webp',
      '/images/vesper/s1-4wd-40/g3.webp',
      '/images/vesper/s1-4wd-40/g4.webp',
      '/images/vesper/s1-4wd-40/g5.webp',
      '/images/vesper/s1-4wd-40/g6.webp',
      '/images/vesper/s1-4wd-40/g7.webp',
      '/images/vesper/s1-4wd-40/g8.webp',
      '/images/vesper/s1-4wd-40/g9.webp',
      '/images/vesper/s1-4wd-40/g10.webp'
    ],
    image: '/images/products/vesper-s1-4wd-40.webp',
    inStock: true,
    isBestSeller: true,
    isNew: true,
    isVesper: true
  },
  // Precision Agriculture
  // =====================
  {
    id: 'af718',
    code: 'AF718',
    name: 'Autosteering System',
    nameCn: '自动转向系统',
    description: 'The AF718 is Vesper\'s next-generation high-performance autosteering system. Powered by an advanced computing platform, it significantly enhances accuracy and efficiency across diverse farming operations.',
    descriptionCn: 'AF718前沿 — 开创智慧农业新未来。基于先进计算平台的高性能自动转向系统，显著提升多样化农业作业的精度和效率。',
    category: 'precision-agriculture',
    categoryName: 'Precision Agriculture',
    tagline: 'AF718 Frontier — Pioneering the Future of Smart Farming',
    features: [
      'COLLABORATIVE',
      'EFFICIENT',
      'STABLE',
      'SECURE',
      'ACCURATE',
      'COMPATIBLE',
      'UPGRADABLE'
    ],
    whyReasons: [
      'High-performance processor and robust motor system support heavy-duty work and long-duration continuous operation',
      'AI expansion interfaces enable seamless integration of advanced intelligent algorithms and modules',
      'High-precision navigation with automatic path planning and real-time obstacle adjustment',
      'Complete precision agriculture ecosystem supporting spraying, seeding, fertilizing, and more',
      'Multi-machine collaboration enables synchronized operations across multiple vehicles in the same field',
      'Centered on the AF718, supports diverse functions and flexible application across different farmland environments'
    ],
    specsGroups: [
      {
        title: 'GNSS Receiver',
        specs: {
          'Satellite Positioning Frequencies': 'BDS: B1I, B2I, B3I, B1C, B2a, B2b; GPS: L1C/A, L2P(Y)/L2C, L5; GLONASS: G1, G2; Galileo: E1, E5a, E5b, E6; QZSS: L1, L2, L5; L-Band: Supported',
          'Differential Corrections': 'Satellite-Based and Ground-Based, full AllyLink Service compatibility',
          'Radio Protocols': 'TRIMATLK, TRIMMARK3, TRANSEOT, SP, CSS and other mainstream protocols',
          'Ingress Protection': 'IP67'
        }
      },
      {
        title: 'Tablet Display',
        specs: {
          'Screen': '12.1 inches',
          'Resolution': '1280 × 800',
          'Brightness': '750 nits',
          'RAM & ROM': '6 + 64GB'
        }
      },
      {
        title: 'Motor',
        specs: {
          'Type': 'High-torque electric motor',
          'Control Angle': '±40°',
          'Working Speed': '0-50 km/h',
          'Operating Temp': '-20°C to 70°C',
          'Power Supply': '12V DC'
        }
      }
    ],
    specifications: {
      'Positioning Accuracy': '±2.5 cm (centimeter-level)',
      'Working Speed': '0-50 km/h',
      'Control Angle': '±40°',
      'Display': '12.1 inch touchscreen, 1280×800, 750 nits',
      'RAM & ROM': '6 + 64GB',
      'GNSS Receiver': 'Multi-constellation, multi-frequency, IP67',
      'Operating Temp': '-20°C to 70°C'
    },
    faqs: [
      { question: 'What vehicles is AF718 compatible with?', answer: 'AF718 is compatible with most agricultural tractors and heavy machinery including John Deere, Case IH, New Holland, and other major brands. It supports diverse farming applications from plowing to harvesting.' },
      { question: 'Does it require internet connectivity?', answer: 'No, AF718 uses GNSS satellite positioning and does not require internet for basic operation. Multi-machine collaboration can even exchange data without network connectivity.' },
      { question: 'What satellite systems does AF718 support?', answer: 'AF718 supports BDS (B1I/B2I/B3I/B1C/B2a/B2b), GPS (L1C/A/L2P/L2C/L5), GLONASS (G1/G2), Galileo (E1/E5a/E5b/E6), QZSS (L1/L2/L5), and L-Band.' },
      { question: 'Can AF718 be upgraded with AI features?', answer: 'Yes, AF718 comes with AI expansion interfaces enabling seamless integration of advanced intelligent algorithms. The AN-V100 AI Visual Guidance module supports real-time crop boundary detection and autonomous row following.' }
    ],
    applications: [
      'Multi-Machine Collaboration',
      'Smart Path Planning',
      'AI Visual Guidance',
      'Implement Guidance',
      'Auto-Steering Control',
      'Fleet Management'
    ],
    learnMoreCards: [
      {
        title: 'Powerful Hardware Platform',
        description: 'Equipped with a high-performance processor and robust motor system, the AF718 supports heavy-duty work and long-duration continuous operation. Its powerful hardware not only ensures stability but also provides a solid foundation for future upgrades and multi-machine collaboration.',
        image: '/images/af718/Powerful-Hardware-Platform-1.png'
      },
      {
        title: 'Future-Ready AI Expansion',
        description: 'The device comes with AI expansion interfaces, enabling seamless integration of advanced intelligent algorithms and modules. Whether for optimizing multi-machine coordination, monitoring crop health, or providing automated decision support, the AF718 is ready to upgrade to meet the evolving demands of modern agriculture.',
        image: '/images/af718/Future-Ready-AI-Expansion.png'
      },
      {
        title: 'Seamless Data Integration and Transfer',
        description: 'The Vesper software ecosystem enables smooth data exchange across AIAgripro, AIFarm, and AIFMS. It maintains compatibility with other major brands and also supports integration with the xFarm platform, helping users meet agricultural subsidy compliance requirements.',
        image: '/images/af718/Seamless-Data-Integration-and-Transfer.png'
      },
      {
        title: 'Smarter Navigation & Operation',
        description: 'With high-precision navigation and intelligent operation algorithms, the AF718 can automatically plan paths, accurately identify work areas, and adjust in real time. Even in complex terrains or obstacle-dense environments, it ensures precise, safe, and efficient operations.',
        image: '/images/af718/Smarter-Navigation-Operation.png'
      },
      {
        title: 'Collaborative Machine Operations',
        description: 'Moving beyond traditional standalone work, it enables multiple tractors and machines to operate collaboratively in the field. Tasks, progress, and work paths are shared in real time, and even without network connectivity, vehicles can exchange data seamlessly, ensuring smooth coordination and stronger team performance.',
        image: '/images/af718/Collaborative-Machine-Operations.png'
      },
      {
        title: 'One System, Multiple Scenarios',
        description: 'Centered on the AF718, Vesper has built a complete precision agriculture ecosystem. With this core hardware as the foundation, the system supports diverse functions such as spraying, seeding, and fertilizing, and can be flexibly applied across different farmland environments and operational scenarios.',
        image: '/images/af718/One-System-Multiple-Scenarios.png'
      }
    ],
    gallery: [
      '/images/products/af718-main.png'
    ],
    image: '/images/products/af718-main.png',
    inStock: true,
    isBestSeller: true,
    isNew: true
  },
  {
    id: 'af305',
    code: 'AF305',
    name: 'Automated Steering System',
    nameCn: '自动转向系统',
    description: 'AF305 delivers high accuracy, smart path planning, and broad equipment compatibility to boost field efficiency and simplify operations.',
    descriptionCn: 'AF305 提供高精度、智能路径规划和广泛的设备兼容性，提升田间作业效率。',
    category: 'precision-agriculture',
    categoryName: 'Precision Agriculture',
    tagline: 'An Advanced Steering Solution for Precision Agriculture',
    features: [
      'Advanced GNSS positioning',
      'Auto-steering control',
      'Easy installation (20 min setup)',
      'ISOBUS compatible',
      'Terrain compensation',
      '±2.5 cm accuracy'
    ],
    whyReasons: [
      'The AF305 Automated Steering System uses a high-torque motor control design, combined with a self-developed control algorithm, achieving ±2.5 cm pass-to-pass accuracy',
      'Supports multiple vehicle types with easy 20-minute installation and setup',
      'ISOBUS-compatible for seamless integration with agricultural implements',
      'Advanced correction services provide reliable positioning even in challenging environments',
      'Worry-free autosteering with terrain compensation and intelligent path planning'
    ],
    specsGroups: [
      {
        title: 'GNSS Receiver',
        specs: {
          'RTK Accuracy (RMS)': 'Horizontal: 8 mm + 1 ppm, Vertical: 15 mm + 1 ppm',
          'Initialization Time': '<5 s (typical), <10 s (reliable)',
          'Constellation': 'BDS, GPS, GLONASS, Galileo, QZSS, SBAS, L-Band'
        }
      },
      {
        title: 'Tablet Display',
        specs: {
          'Screen': '10.1 inches, 1280×800, 750 nits',
          'System': '8-core, 2 GHz, 6 GB RAM, 64 GB storage',
          'Electrical': 'Power Consumption ≤ 12 W, DC 7–36V',
          'Protection': 'IP67',
          'Operating Temp': '–20°C to +70°C'
        }
      }
    ],
    specifications: {
      'Accuracy': '±2.5 cm (pass-to-pass)',
      'RTK Accuracy': '8 mm + 1 ppm (H) / 15 mm + 1 ppm (V)',
      'Initialization': '<5 s (typical)',
      'Display': '10.1 inch, 1280×800, 750 nits',
      'Protection': 'IP67',
      'Operating Temp': '–20°C to +70°C'
    },
    faqs: [
      { question: 'Does this system support satellite differential mode for high accuracy without an internet connection?', answer: 'Yes, this feature is available. Our receivers can be equipped with different models of GNSS boards, one of which can support broadcasting differential corrections via satellite, achieving accuracy similar to network or radio base station corrections even without internet connectivity.' },
      { question: 'Does the system support ISOBUS?', answer: 'Yes. Vesper has obtained AEF certification. The system supports UT and TC (Task Control). Note: The TC function requires a paid activation, while the UT function is available for free.' },
      { question: 'Does the system have terrain compensation for operating on sloped land?', answer: 'Yes. The GNSS receiver is equipped with a high-precision gyroscope for accurate attitude measurement, and the software includes a slope correction function to compensate for terrain variations during operation.' }
    ],
    learnMoreCards: [
      {
        title: 'Easy To Use',
        description: 'The AF305 is designed for simplicity — quick 20-minute setup with intuitive controls that minimize operator training time and get you into the field faster.',
        image: '/images/af305/Easy-To-Use.png'
      },
      {
        title: 'Automated and Smart Control',
        description: 'Self-developed control algorithm with high-torque motor delivers precise automated steering, reducing operator fatigue and improving field efficiency.',
        image: '/images/af305/Automated-and-Smart-Control-1.png'
      },
      {
        title: 'Extensive (ISOBUS) Compatibility',
        description: 'Full ISOBUS compliance enables seamless communication between the AF305 terminal and a wide range of agricultural implements and tractor brands.',
        image: '/images/af305/Extensive-ISOBUS-Compatibility-1.png'
      },
      {
        title: 'Advanced Correction Services',
        description: 'Supports satellite-based and ground-based differential corrections with full AllyLink Service compatibility for dynamic centimeter-level accuracy worldwide.',
        image: '/images/af305/ppp-AR.jpg'
      },
      {
        title: 'Worry-Free Autosteering',
        description: 'Built-in terrain compensation, obstacle detection, and intelligent path planning ensure precise, safe operation even in complex field conditions.',
        image: '/images/af305/Worry-Free-Autosteering-1.png'
      }
    ],
    gallery: ['/images/products/af305-main.png'],
    image: '/images/products/af305-main.png',
    inStock: true,
    isBestSeller: true,
    isNew: false
  },
  {
    id: 'isobus',
    code: 'ISOBUS',
    name: 'Terminal',
    nameCn: '终端',
    description: 'Empower your implements with a certified ISOBUS terminal featuring a 12.1" sunlight-readable touchscreen, built-in high-precision GNSS guidance, and seamless compatibility with major agricultural equipment.',
    descriptionCn: '通过 AEF 认证的 ISOBUS 终端，配备 12.1 英寸阳光可读触摸屏、内置高精度 GNSS 导航，兼容主流农机设备。',
    category: 'precision-agriculture',
    categoryName: 'Precision Agriculture',
    tagline: 'A one-stop ISOBUS solution for smart implements — fully compatible with mainstream agricultural equipment',
    features: [
      'AEF certified',
      'ISOBUS compliant',
      'Multi-brand compatibility',
      'UT and TC support',
      'Built-in GNSS guidance',
      '12.1" sunlight-readable touchscreen'
    ],
    whyReasons: [
      'One-stop ISOBUS solution fully compatible with mainstream agricultural equipment, empowering universal terminal operations across mixed-brand fleets',
      '12.1-inch high-brightness touchscreen provides clear visibility even in direct sunlight, with intuitive interface for reduced operator training',
      'Built-in high-precision GNSS guidance eliminates the need for separate navigation displays',
      'AEF-certified ISOBUS compliance ensures reliable UT and TC functionality with any ISOBUS-compatible implement',
      'Highly expandable — supports future upgrades and integration with precision agriculture ecosystem'
    ],
    specifications: {
      'Certification': 'AEF',
      'Display': '12.1 inch, 1280×800, 750 nits, IP67',
      'System': '8-core, 2 GHz, 2 GB RAM, 32 GB Storage, Android 12.0',
      'Power': '≤ 12 W, DC 7–36V',
      'Interfaces': 'RS232×2, RS485×1, CAN×2, USB 2.0×1, DI×2, DO×2',
      'Protocol': 'ISOBUS (ISO 11783)'
    },
    specsGroups: [
      {
        title: 'T120 Tablet',
        specs: {
          'Display': '12.1 inches, 1280×800, 750 nits',
          'Weight': '≤ 1.75 kg',
          'Ingress Protection': 'IP67',
          'Operating Temp': '–20°C to +70°C',
          'System': '8-core, 2 GHz, 2 GB RAM, 32 GB Storage, Android 12.0',
          'Power Consumption': '≤ 12.0 W',
          'Supply Voltage': 'DC 7–36 V'
        }
      },
      {
        title: 'Data Interfaces',
        specs: {
          'Serial': 'RS232 ×2, RS485 ×1',
          'CAN': 'CAN ×2',
          'USB': 'USB 2.0 ×1',
          'Digital I/O': 'DI ×2, DO ×2',
          'Power Output': '12V DC OUT ×1',
          'Camera Input': '4 channels (analog)'
        }
      }
    ],
    faqs: [
      { question: 'What is the core function of the ISOBUS system, and what problems does it solve in agriculture?', answer: 'ISOBUS (ISO 11783) standardizes communication between tractors and implements from different manufacturers. It enables interoperability, unified display and control through a single in-cab terminal, eliminating the need for multiple proprietary monitors and simplifying operator workflow.' },
      { question: 'What visualization controls does the ISOBUS VT/UT function provide?', answer: 'The VT (Virtual Terminal) or UT (Universal Terminal) displays and controls the implement interface inside the cab. It automatically detects connected ISOBUS-compatible implements and provides a standardized user interface for monitoring and controlling implement functions.' },
      { question: 'What is the role of the Task Controller (TC) module in ISOBUS-based operations?', answer: 'The Task Controller (TC) enables automated documentation and variable rate application by managing task data exchange between the farm management system and the implement. It records as-applied maps, tracks job progress, and supports prescription-based variable rate control.' }
    ],
    learnMoreCards: [
      {
        title: '12.1" High-Brightness Touchscreen',
        description: 'Large sunlight-readable display ensures operators can clearly view implement data, guidance lines, and controls in all lighting conditions.',
        image: '/images/isobus/12.1-High-Brightness-Touchscreen.jpg'
      },
      {
        title: 'Flexible ISOBUS Compatibility',
        description: 'Works seamlessly with ISOBUS-compatible implements from all major manufacturers, eliminating brand lock-in and simplifying mixed-fleet management.',
        image: '/images/isobus/Flexible-ISOBUS-Compatibility.jpg'
      },
      {
        title: 'Free Integrated Guidance',
        description: 'Built-in GNSS guidance provides navigation capabilities without the need for additional hardware, reducing total system cost and installation complexity.',
        image: '/images/isobus/Free-Integrated-Guidance.jpg'
      },
      {
        title: 'Highly Expandable',
        description: 'Modular design supports future upgrades including section control, variable rate application, and integration with the Vesper precision agriculture ecosystem.',
        image: '/images/isobus/Highly-Expandable.jpg'
      },
      {
        title: 'Tillage and Soil Preparation',
        description: 'Optimize tillage operations with precise implement tracking and automated section control for consistent soil preparation across the field.',
        image: '/images/isobus/TILLAGE-AND-SOIL-PREPARATION-1.png'
      },
      {
        title: 'Accurate Planting',
        description: 'Achieve uniform seed spacing and depth control with ISOBUS-enabled planters, reducing seed waste and maximizing emergence rates.',
        image: '/images/isobus/PRECISION-PLANTING.png'
      },
      {
        title: 'Precise Spraying',
        description: 'Enable precision spraying with automatic section control, reducing chemical overlap and ensuring consistent application across the entire field.',
        image: '/images/isobus/EFFICIENT-SPRAYING.png'
      },
      {
        title: 'Efficient Harvesting',
        description: 'Monitor yield data, moisture levels, and harvesting parameters in real time for data-driven decision making and optimized harvest operations.',
        image: '/images/isobus/HARVESTING.png'
      }
    ],
    gallery: ['/images/products/isobus-main.png'],
    image: '/images/products/isobus-main.png',
    inStock: true,
    isBestSeller: false,
    isNew: false
  },
  {
    id: 'vs100',
    code: 'VS100',
    name: 'Spray Control System',
    nameCn: '喷洒控制系统',
    description: 'VS100 offers 98% spraying accuracy, GNSS-based flow control, section automation, and ISOBUS support for efficient, traceable crop protection.',
    descriptionCn: 'VS100 提供 98% 的喷洒精度、基于 GNSS 的流量控制、分段自动化和 ISOBUS 支持。',
    category: 'precision-spraying',
    categoryName: 'Precision Agriculture Solutions',
    tagline: 'The VS100 Smart Spray Control System utilizes advanced satellite navigation to deliver precise pest and weed management',
    features: [
      'Precision spraying',
      'Section control (up to 16 sections)',
      'Flow rate monitoring',
      '98% accuracy',
      'Real-time monitoring',
      'ISOBUS support',
      'GNSS-based flow control'
    ],
    whyReasons: [
      'Utilizes advanced satellite navigation and control technology to deliver precise pest and weed management, reducing chemical waste by up to 15%',
      'Section control with up to 16 individual sections ensures precise application, eliminating overlaps and skips even in irregularly shaped fields',
      'Visualized operation interface provides real-time spray data including pressure, flow rate, and coverage maps for complete traceability',
      'High compatibility with major sprayer brands and ISOBUS implements, with easy expansion for additional precision agriculture functions',
      'Reapplication control prevents double-spraying of treated areas, saving chemicals and protecting crop health'
    ],
    specsGroups: [
      {
        title: 'GNSS Antenna',
        specs: {
          'Size': 'Φ 152 × 62.2 mm',
          'Weight': '≤ 400 g',
          'GPS': 'L1/L2/L5',
          'BDS': 'B1/B2/B3',
          'GLONASS': 'L1/L2/L3',
          'GALILEO': 'E1/E5a/E5b/E6',
          'QZSS': 'L1/L2/L5/L6',
          'IRNSS': 'L5',
          'L-Band': 'Supported'
        }
      },
      {
        title: 'Tablet Display',
        specs: {
          'Display': '10.1 inch',
          'IP Rating': 'IP67'
        }
      }
    ],
    specifications: {
      'Spray Accuracy': '98% (±2% flow deviation)',
      'Section Control': 'Up to 16 sections',
      'GNSS Antenna': 'Φ 152 mm, multi-constellation',
      'Display': '10.1 inch, IP67',
      'Spray Width': '3-10 m'
    },
    faqs: [
      { question: 'What is the VS100 and what are its core functions?', answer: 'The VS100 is an intelligent spray control system that integrates GNSS positioning, sensors, and electromechanical-hydraulic control. It enables precision section control, automatic flow adjustment based on vehicle speed, and real-time monitoring of spraying parameters for efficient crop protection.' },
      { question: 'How does the VS100 achieve precise spraying? What is its accuracy?', answer: 'VS100 uses a closed-loop control algorithm to adjust spray flow based on vehicle speed and GNSS position. It maintains flow deviation within ±2% and supports up to 16 independent sections, ensuring precise application with minimal overlap or missed areas.' },
      { question: 'How does the VS100 help reduce chemical usage and protect the environment?', answer: 'VS100 supports automatic section control and intelligent reapplication prevention, eliminating overlaps and skips. This minimizes pesticide waste and environmental impact while ensuring complete crop coverage. Real-time data logging supports regulatory compliance and sustainable farming practices.' }
    ],
    learnMoreCards: [
      {
        title: 'Precision Spraying With Section Control',
        description: 'Up to 16 individually controlled sections ensure precise chemical application, automatically shutting off in overlap zones to prevent waste and crop damage.',
        image: '/images/vs100/Precision-Spraying-With-Section-Control-4.png'
      },
      {
        title: 'Visualized Operation Interface',
        description: 'Real-time display of spray pressure, flow rate, coverage area, and section status on an intuitive touchscreen interface for complete operational awareness.',
        image: '/images/vs100/Visualized-Operation-Interface.png'
      },
      {
        title: 'Reapplication Control',
        description: 'Smart tracking prevents double-spraying of previously treated areas, saving chemicals and protecting crops from over-application damage.',
        image: '/images/vs100/Reapplication-Control.png'
      },
      {
        title: 'High Compatibility and Easy Expansion',
        description: 'Works with major sprayer brands and ISOBUS-compatible equipment. Modular design supports future upgrades to meet evolving precision agriculture needs.',
        image: '/images/vs100/Precision-Spraying-With-Section-Control-3.png'
      },
      {
        title: 'Row Crops',
        description: 'Optimized for row crop applications including corn, soybeans, cotton, and wheat, with precise nozzle control matched to row spacing.',
        image: '/images/vs100/ROW-CROPS.png'
      },
      {
        title: 'Specialty Crops',
        description: 'Adaptable spraying parameters for specialty crops including vineyards, orchards, and vegetable production, ensuring appropriate coverage for each crop type.',
        image: '/images/vs100/SPECIALTY-CROPS.png'
      },
      {
        title: 'Large-Scale Farms',
        description: 'Designed for high-efficiency operations across large acreages, with automated documentation and reporting for regulatory compliance and farm management.',
        image: '/images/vs100/LARGE-SCALE-FARMS.png'
      },
      {
        title: 'Environmental Protection Projects',
        description: 'Precision application reduces chemical drift and runoff, supporting sustainable farming practices and environmental stewardship goals.',
        image: '/images/vs100/ENVIRONMENTAL-PROTECTION-PROJECTS.png'
      }
    ],
    gallery: ['/images/products/vs100-main.png'],
    image: '/images/products/vs100-main.png',
    inStock: true,
    isBestSeller: true,
    isNew: false
  },

  // =====================
  // Land Leveling System
  // =====================
  {
    id: 'w20',
    code: 'W20',
    name: 'Land Leveling System',
    nameCn: '土地整平系统',
    description: 'W20 delivers ≤2.5 cm leveling accuracy with terrain compensation — ideal for farming, reclamation, and site preparation.',
    descriptionCn: 'W20 提供 ≤2.5 cm 的整平精度和地形补偿功能，适用于农业、土地复垦和场地整备。',
    category: 'land-leveling',
    categoryName: 'Land Leveling System',
    tagline: 'The W20 is a GNSS-based smart land leveling system designed to replace inefficient manual methods',
    features: [
      'STABLE PERFORMANCE',
      'USER-FRIENDLY DESIGN',
      'UPGRADED ALGORITHMS',
      'SMART OPERATION',
      'QUICK HEIGHT CALIBRATION',
      'TERRAIN SURVEY & DESIGN'
    ],
    whyReasons: [
      'Developed by Vesper, the W20 Intelligent GNSS Land Leveling System is a high-precision alternative to traditional laser leveling',
      'Compatible with land levelers, scrapers, bulldozers, and graders, offering precise guidance and automated blade control for optimal performance',
      'Minimizes operator fatigue and skill requirements, ensuring accurate results in farmland leveling and paddy field transformation',
      'Ideal for land reclamation, site preparation, and roadbed work where high surface flatness is essential',
      'Improves soil moisture retention, enables precise irrigation, and reduces input waste for significantly enhanced field productivity'
    ],
    specifications: {
      'Accuracy': '≤2.5 cm',
      'Control': 'GNSS RTK / Laser',
      'Display': '10.1 inch, 1280×800, 750 nits',
      'Controller': 'NMC101 (single) / NMC114 (dual)',
      'Protection': 'IP67',
      'Operating Temp': '–20°C to +60°C'
    },
    specsGroups: [
      {
        title: 'Tablet',
        specs: {
          'Display': '10.1 inches, 1280×800, 750 nits, 10-point multi-touch',
          'Physical Buttons': '4',
          'System': '8-core, 2 GHz, 2 GB RAM, 32 GB storage, Android 12.0',
          'Communication': 'CAN ×2, RS232 ×2, RS485 ×1',
          'Connectivity': '4G (Dual SIM), Wi-Fi, Bluetooth, GNSS'
        }
      },
      {
        title: 'GNSS Antenna',
        specs: {
          'GPS': 'L1/L2/L5',
          'BDS': 'B1/B2/B3',
          'GLONASS': 'L1/L2/L3',
          'GALILEO': 'E1/E5a/E5b/E6',
          'QZSS': 'L1/L2/L5/L6',
          'IRNSS': 'L5',
          'SBAS': 'L1/L5',
          'L-Band': 'Supported'
        }
      },
      {
        title: 'Single-Control Controller (NMC101)',
        specs: {
          'Model': 'NMC101',
          'Communication': 'CAN ×1',
          'Operating Voltage': 'DC 12V (9–36V)',
          'Signal Inputs': '2 analog inputs (0–5V)',
          'Control Outputs': '2 switch signal outputs (PWM supported)',
          'Output Power': '≤ 40 W',
          'Protection Rating': 'IP67',
          'Operating Temp': '–20°C to +60°C',
          'Storage Temp': '–40°C to +70°C',
          'Dimensions': '81 × 112 × 33 mm',
          'Weight': '~320 g'
        }
      },
      {
        title: 'Dual/Multiple-Control Controller (NMC114)',
        specs: {
          'Model': 'NMC114',
          'Communication': 'RS232 ×1, RS485 ×1, CAN ×2',
          'Power Supply': 'DC 12V (6–36V), Max 12A @ 12V',
          'Control Outputs': '8 channels (PWM supported)',
          'Signal Inputs': '8 channels (voltage/current/resistance)',
          'Output Power': '≤ 144 W',
          'Protection Rating': 'IP67',
          'Operating Temp': '–20°C to +60°C',
          'Storage Temp': '–40°C to +70°C',
          'Dimensions': '138 × 119 × 37 mm',
          'Weight': '~237 g'
        }
      }
    ],
    faqs: [
      { question: 'What is the W20 system and what agricultural problems does it solve?', answer: 'The W20 is a GNSS-based smart land leveling system designed to replace inefficient manual methods. It improves soil moisture retention, enables precise irrigation, reduces input waste, and significantly enhances field productivity and leveling efficiency.' },
      { question: 'What is the leveling accuracy of the W20 and can it handle complex terrain?', answer: 'W20 uses dynamic compensation and RTK-based positioning to achieve ≤2.5 cm accuracy in both horizontal and slope modes. It automatically detects terrain elevation and adjusts in real time, ensuring uniform leveling across complex terrains.' },
      { question: 'How user-friendly is the W20 system? Is it easy to operate?', answer: 'W20 features an intuitive touchscreen interface and supports multiple control methods including remote handsets and physical buttons. The hardware is easy to install and disassemble, rated IP67 for durability in tough outdoor conditions.' },
      { question: 'What is the difference between the single control version and the dual control version?', answer: 'The single control version is only suitable for shovels with one control cylinder. The dual control version is suitable for shovels with up to two control cylinders.' }
    ],
    learnMoreCards: [
      {
        title: 'Efficient 3D Land Leveling Made Simple',
        description: 'Advanced 3D terrain modeling enables automated grading plans that transform uneven fields into precisely leveled surfaces with minimal operator input.',
        image: '/images/w20_cards/Efficient-3D-Land-Leveling-Made-Simple-1.png'
      },
      {
        title: 'Intelligent Soil Unloading to Reduce Costs',
        description: 'Smart algorithms calculate optimal soil cut-and-fill volumes, minimizing machine passes and reducing fuel consumption and operational costs.',
        image: '/images/w20_cards/Intelligent-Soil-Unloading-to-Reduce-Costs.png'
      },
      {
        title: 'Multiple Slope Modes for Easy Operation',
        description: 'Pre-configured slope templates for common field types — flat plane, single slope, and dual slope — make setup fast and operation intuitive.',
        image: '/images/w20_cards/Multiple-Slope-Modes-for-Easy-Operation.png'
      },
      {
        title: 'Highly Adaptable for Diverse Applications',
        description: 'From paddy field transformation to large-scale land reclamation and construction site preparation, the W20 adapts to varied terrain and project requirements.',
        image: '/images/w20_cards/Highly-Adaptable-for-Diverse-Applications.png'
      },
      {
        title: 'Strong Signal, Wide Coverage',
        description: 'Multi-constellation GNSS receiver with dual antenna design ensures stable positioning even in challenging environments with partial sky obstruction.',
        image: '/images/w20_cards/Strong-Signal-Wide-Coverage.png'
      }
    ],
    gallery: ['/images/products/w20-main.png'],
    image: '/images/products/w20-main.png',
    inStock: true,
    isBestSeller: false,
    isNew: false
  },

  // =====================
  // Agricultural Robots
  // =====================
  {
    id: 'aries300n',
    code: 'Aries300N',
    name: 'Orchard Spraying Robot',
    nameCn: '果园喷洒机器人',
    description: 'Aries300N Smart Sprayer delivers GNSS-guided, hybrid spraying for orchards. Ensures full coverage, cuts labor, and works smarter with Vesper.',
    descriptionCn: 'Aries300N 智能喷雾机器人提供 GNSS 导航、混合动力的果园喷洒方案，确保全面覆盖、减少人工。',
    category: 'agricultural-robotics',
    categoryName: 'Agricultural Robots',
    tagline: 'A hybrid-powered orchard spraying robot combining GNSS navigation, autonomous driving, and obstacle avoidance',
    features: [
      'Autonomous navigation',
      'Hybrid power (Gasoline-Electric)',
      'Air-assisted spraying',
      'Night mode operation',
      '3-10m spray width',
      'GNSS-guided precision'
    ],
    whyReasons: [
      'Combines GNSS navigation, autonomous driving, obstacle avoidance, and intelligent operation — goodbye to manual driving in orchards',
      'Robust design with stable performance in challenging terrain, slopes, and dense orchard environments',
      'Reliable operation with cost-effective efficiency — reduces labor costs by up to 60% compared to manual spraying',
      'Flexible mode switching between autonomous and manual operation for diverse orchard layouts and spray requirements',
      'Hybrid gasoline-electric power system enables extended runtime up to 8 hours with 300L tank capacity'
    ],
    specsGroups: [
      {
        title: 'Aries300N Specifications',
        specs: {
          'Dimensions': '2200 × 1200 × 1000 mm',
          'Weight': '450 kg',
          'Tank Capacity': '300 L',
          'Spray Width': '3–10 m',
          'Atomization': '100–500 μm',
          'Nozzles': '6–8',
          'Power': 'Hybrid (Gasoline-Electric)',
          'Runtime': '8 hours',
          'Charging Time': '3 hours'
        }
      }
    ],
    specifications: {
      'Dimensions': '2200×1200×1000 mm',
      'Weight': '450 kg',
      'Tank Capacity': '300L',
      'Spray Width': '3-10 m',
      'Atomization': '100-500 μm',
      'Power': 'Hybrid (Gasoline-Electric)',
      'Runtime': '8 hours'
    },
    faqs: [
      { question: 'What type of equipment is Aries300N and where is it best used?', answer: 'Aries300N is an intelligent tracked orchard spraying robot that integrates GNSS navigation and autonomous driving. It is ideal for precision spraying in standardized orchards, vineyards, and forestry operations where consistent coverage and reduced labor are critical.' },
      { question: 'How does Aries300N ensure precision spraying and effective coverage?', answer: 'Aries300N uses a pressure-sending and air-assisted dual spraying system, with 6–8 nozzles producing atomization between 100–500 μm. It achieves a spray width of 3–10 meters, ensuring thorough coverage across diverse orchard layouts and tree spacings.' },
      { question: 'What control modes does Aries300N support? Can it be managed remotely?', answer: 'Aries300N supports fully autonomous, remote-controlled, and manual driving modes. Operators can monitor and adjust spraying parameters, track progress, and switch modes remotely, giving maximum flexibility for different operational requirements.' }
    ],
    learnMoreCards: [
      {
        title: 'Autonomous Operation, Goodbye to Manual Driving',
        description: 'Fully autonomous navigation with GNSS guidance and obstacle avoidance eliminates the need for skilled operators, ensuring consistent spraying patterns orchard-wide.',
        image: '/images/aries300n/Autonomous-Operation-Goodbye-to-Manual-Driving.png'
      },
      {
        title: 'Robust Design, Stable Performance',
        description: 'Heavy-duty chassis with all-terrain capability handles steep orchard slopes and uneven ground, maintaining stable spraying performance in challenging conditions.',
        image: '/images/aries300n/Robust-Design-Stable-Performance-1.png'
      },
      {
        title: 'Reliable Operation, Cost-Effective Efficiency',
        description: 'Hybrid power system ensures full-day operation without refueling, while air-assisted spraying technology delivers uniform coverage with minimal chemical waste.',
        image: '/images/aries300n/Reliable-Operation-Cost-Effective-Efficiency.png'
      },
      {
        title: 'Flexible Mode Switching',
        description: 'Seamlessly switch between fully autonomous, remote-controlled, and manual driving modes to adapt to different orchard layouts, tree spacing, and spray requirements.',
        image: '/images/aries300n/Flexible-Mode-Switching.png'
      }
    ],
    gallery: ['/images/products/aries300n-main.png'],
    image: '/images/products/aries300n-main.png',
    inStock: true,
    isBestSeller: true,
    isNew: false
  },
  {
    id: 'taurus80e',
    code: 'Taurus80E',
    name: 'Smart Lawn Mowing Robot',
    nameCn: '智能割草机器人',
    description: 'Autonomous Electric Mowing Robot for Professional Operations. 24/7 working capability with slope handling and low noise operation.',
    descriptionCn: '专业作业的自主电动割草机器人，支持 24/7 全天候作业、坡地作业和低噪音运行。',
    category: 'agricultural-robotics',
    categoryName: 'Agricultural Robots',
    tagline: 'Autonomous Electric Mowing for Professional Operations',
    features: [
      'Autonomous navigation',
      'Electric powered (48V Lithium)',
      'Low noise operation',
      '24/7 working',
      'Slope capability'
    ],
    specsGroups: [
      { title: 'Performance', specs: { 'Cutting Width': '800 mm', 'Speed': '0-6 km/h', 'Runtime': '8 hours' }},
      { title: 'Battery', specs: { 'Power': '48V Lithium', 'Charging Time': '3 hours', 'Runtime': '8 hours' }}
    ],
    specifications: {
      'Power': '48V Lithium',
      'Cutting Width': '800 mm',
      'Speed': '0-6 km/h',
      'Runtime': '8 hours',
      'Charging Time': '3 hours'
    },
    image: '/images/products/80e-1.webp',
    inStock: true,
    isBestSeller: true,
    isNew: false
  },

  // =====================
  // Machine Control
  // =====================
  {
    id: 'egs101',
    code: 'EGS101',
    name: 'Intelligent Excavator Guidance System',
    nameCn: '智能挖掘机引导系统',
    description: 'EGS101 Grade Control System delivers real-time excavator guidance with grading accuracy within 3 cm — ideal for trenching, slopes, and land leveling.',
    descriptionCn: 'EGS101 坡度控制系统提供实时挖掘机引导，整平精度 ≤3 cm，适用于开沟、坡面和土地平整作业。',
    category: 'machine-control',
    categoryName: 'Machine Control',
    tagline: 'Works seamlessly with a wide range of excavator models, providing precise real-time guidance for digging and grading',
    features: [
      'Grade control',
      'Depth display',
      'Slope matching',
      '2D/3D control',
      'GNSS + Laser sensors',
      '±3 cm accuracy'
    ],
    whyReasons: [
      'Works seamlessly with a wide range of excavator models, providing precise real-time guidance for digging depth control and slope matching',
      'Combines GNSS and laser sensors for accurate 2D and 3D grade control in all working conditions',
      'Reduces over-digging by up to 80%, saving time on backfill and material costs',
      'Intuitive 7-inch display shows real-time bucket position relative to target grade, eliminating the need for grade checkers',
      'Quick installation and calibration — move the system between machines in under 30 minutes'
    ],
    specifications: {
      'Accuracy': '±2.5 cm',
      'Display': '7 inch tablet',
      'Sensors': 'Dual-frequency GNSS + IMU',
      'Constellation': 'GPS, BeiDou, GLONASS',
      'Power': '12V/24V DC',
      'Protection': 'IP67'
    },
    specsGroups: [
      {
        title: 'Tablet Display',
        specs: {
          'Display': '7 inch, 1280×800',
          'Protection': 'IP67',
          'Power Supply': 'DC 12V/24V',
          'Operating Temp': '–20°C to +70°C'
        }
      }
    ],
    faqs: [
      { question: 'What is the EGS101 and what is its main purpose?', answer: 'EGS101 is an intelligent grade control system for excavators, designed to monitor bucket elevation, slope, and orientation in real time. It is widely used for precision excavation tasks requiring accurate depth and slope control, such as trenching, grading, and foundation work.' },
      { question: 'What is the grading accuracy of the EGS101, and how is it achieved?', answer: 'EGS101 achieves a grading accuracy within ±2.5 cm. It uses dual-frequency GNSS (supporting GPS, BeiDou, GLONASS) combined with high-sensitivity IMU sensors to provide real-time bucket position and orientation data, enabling precise depth and slope control.' },
      { question: 'What are the typical application scenarios for EGS101?', answer: 'EGS101 is ideal for trenching, land leveling, canal/road/pond slope grading, and embankment construction. It ensures surface uniformity, enhances construction quality, and significantly reduces the need for manual grade checking and rework.' }
    ],
    learnMoreCards: [
      {
        title: 'Land Leveling',
        description: 'Achieve precise finish grades for building pads, parking lots, and agricultural land with real-time guidance that eliminates guesswork and reduces rework.',
        image: '/images/egs101/Land-Leveling.png'
      },
      {
        title: 'Straight-Line Guidance',
        description: 'Maintain accurate trench alignment for utility installation, drainage ditches, and foundation excavation with visual guidance indicators on the in-cab display.',
        image: '/images/egs101/1012-scaled.png'
      },
      {
        title: 'Slope Grading',
        description: 'Precisely cut slopes for embankments, waterways, and road shoulders with automated depth control that matches the target slope in real time.',
        image: '/images/egs101/Slope-Grading.png'
      }
    ],
    gallery: ['/images/products/egs101-main.png'],
    image: '/images/products/egs101-main.png',
    inStock: true,
    isBestSeller: false,
    isNew: false
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