export interface LearnMoreCard {
  title: string
  description: string
  imagePattern: string
}

const my108Cards: LearnMoreCard[] = [
  {
    title: 'Genuine Philips Imported Lamp Tubes',
    description: 'Only the highest standards deliver real results. Every {brand} MY-108 uses authentic Philips 365nm UVA lamp tubes — imported from the Netherlands — with built-in attractant granules for superior mosquito and fly elimination.',
    imagePattern: '/detail/feature_section_01.jpg',
  },
  {
    title: 'Flip-Top Cover — Tool-Free Maintenance',
    description: 'Changing glue boards has never been easier. This upgraded flip-top design lets you access the interior in seconds — no tools required. Simply flip open, replace the board, and snap shut.',
    imagePattern: '/detail/feature_section_02.jpg',
  },
  {
    title: 'Fire-Resistant Aluminum Alloy Lamp Holder',
    description: 'Custom-designed flame-retardant aluminum alloy frame. Don\'t take chances with electrical safety — {brand} uses certified fire-resistant materials that exceed commercial safety standards.',
    imagePattern: '/detail/feature_section_03.jpg',
  },
  {
    title: 'High-Performance Adhesive Board',
    description: 'Once they land, there\'s no escape. Premium eco-friendly glue board with UV-resistant coating delivers lasting adhesion. Anti-oxidation formula maintains full trapping power for up to 3 months.',
    imagePattern: '/detail/feature_section_04.jpg',
  },
]

const my208Cards: LearnMoreCard[] = [
  {
    title: 'Safety Flame-Retardant and Ultra-Stable',
    description: 'Customized Flame-Retardant Aluminum Alloy Lamp Holder. To maximize the efficiency output of the lamp tube, the previous holder\'s power factor was 0.65, but this time we have achieved 0.9.',
    imagePattern: '/detail/feature_card_01.jpg',
  },
  {
    title: 'V0-Grade Flame-Retardant ABS + Aluminum Alloy',
    description: 'Both ends use V0-grade flame-retardant ABS. The housing is made of aluminum alloy. Poor-quality lamp holders lead to many after-sales issues. Without flame retardancy, fire hazards are even more dangerous.',
    imagePattern: '/detail/feature_card_02.jpg',
  },
  {
    title: 'Multi-Layer Thickened Strong Adhesive Waterproof Glue',
    description: 'One touch, flies stick instantly. To ensure that attracted insects have no way back, we have applied a special glue with one layer on top of another.',
    imagePattern: '/detail/feature_card_03.jpg',
  },
  {
    title: 'Multiple Power Options — MY-208 & MY-216',
    description: 'MY-208 (8W, T5 8W×1, ≤60m²) and MY-216 (16W, T5 8W×2, ≤120m²). Both operate at 220V/50Hz with genuine 365nm UVA wavelength and fit standard 31×12cm adhesive boards.',
    imagePattern: '/detail/feature_card_04.jpg',
  },
]

const my330Cards: LearnMoreCard[] = [
  {
    title: 'Blind Selection, Avoid Traps — Big Brands Work Better',
    description: '30W Large-scale Commercial Mosquito and Fly Trap. When you don\'t know which to choose, pick the industry leader. MY-330 delivers powerful, reliable performance for demanding commercial environments.',
    imagePattern: '/detail/feature_card_01.jpg',
  },
  {
    title: 'Dual Philips T8 15W Imported Lamp Tubes',
    description: 'Equipped with two genuine Philips T8 15W imported tubes (30W total) — the most powerful configuration in the {brand} lineup. The enlarged 600mm body delivers wider coverage and significantly stronger insect attraction.',
    imagePattern: '/detail/feature_card_02.jpg',
  },
  {
    title: 'Upgraded Electronic Ballast — Safe & Stable',
    description: 'Built with a high-quality electronic ballast (220-240V, 50/60Hz) for reliable, long-term operation. Non-flame-retardant ballasts are a known fire hazard — real cases prove the danger. {brand} prioritizes safety.',
    imagePattern: '/detail/feature_card_03.jpg',
  },
  {
    title: 'Commercial-Grade Coverage for Large Spaces',
    description: 'With 30W dual-tube power and an enlarged body design, the MY-330 effectively covers up to 200m². Ideal for restaurant kitchens, hotel lobbies, school canteens, food processing plants, and commercial facilities.',
    imagePattern: '/detail/feature_card_04.jpg',
  },
  {
    title: 'Product Parts and Installation Guide',
    description: 'Comprehensive parts diagram: UV light tubes, power ballast/control board, flip-up casing, glue board tray, and mounting hardware. Everything clearly labeled for quick setup and easy maintenance.',
    imagePattern: '/detail/feature_card_05.jpg',
  },
  {
    title: 'Step-by-Step Installation Guide',
    description: 'Step 1: Determine position, drill 5mm holes (height 1.8-2.5m). Step 2: Insert wall plugs and tighten screws (leave ~5mm exposed). Step 3: Hang the machine. Step 4: Place glue boards, close casing, connect to power.',
    imagePattern: '/detail/feature_card_06.jpg',
  },
]

const defaultCards: LearnMoreCard[] = [
  {
    title: 'Genuine Philips Imported Lamp Tubes',
    description: 'Every unit uses authentic Philips 365nm UVA tubes imported from the Netherlands. The specific wavelength is scientifically tailored for maximum mosquito and fly attraction, with built-in attractant particles for enhanced elimination.',
    imagePattern: '/main/方图-8W.webp',
  },
  {
    title: 'Patented "Big Mouth" Structure Design',
    description: 'The scientifically engineered wide-aperture structure increases the insect contact and capture area. More entry points mean more insects trapped — a proven design trusted by commercial clients worldwide.',
    imagePattern: '/main/主图1.webp',
  },
  {
    title: 'Eco-Friendly Strong Adhesive Board',
    description: 'Our glue boards use premium eco-friendly adhesive with a special insect-attracting coating. Anti-oxidation and UV-resistant formula maintains full adhesion for up to 3 months — far longer than standard boards.',
    imagePattern: '/main/1.webp',
  },
  {
    title: 'Fire-Resistant Safety Components',
    description: 'Key internal components are manufactured with fire-resistant materials, eliminating potential fire hazards. This exceeds standard safety requirements for commercial electrical appliances.',
    imagePattern: '/main/白底800.webp',
  },
  {
    title: 'Tool-Free Maintenance Design',
    description: 'Flip-up covers, slide-out trays, and quick-release mechanisms make glue board replacement and interior cleaning fast and effortless. Designed for high-turnover commercial environments.',
    imagePattern: '/main/白底4.webp',
  },
  {
    title: 'Multi-Scenario Commercial Deployment',
    description: 'From restaurant kitchens to hotel lobbies, food factories to office spaces — {brand} products are trusted across diverse industries. Wall-mounted, free-standing, or pole-mounted installation options available.',
    imagePattern: '/main/4.webp',
  },
]

export const learnMoreCardsByProduct: Record<string, LearnMoreCard[]> = {
  'my-108': my108Cards,
  'my-208': my208Cards,
  'my-330': my330Cards,
}

export function getLearnMoreCards(productId: string, brandName: string): LearnMoreCard[] {
  const cards = learnMoreCardsByProduct[productId]
  if (cards) {
    return cards.map(card => ({
      ...card,
      description: card.description.replace(/\{brand\}/g, brandName),
    }))
  }
  return defaultCards.map(card => ({
    ...card,
    description: card.description.replace(/\{brand\}/g, brandName),
  }))
}
