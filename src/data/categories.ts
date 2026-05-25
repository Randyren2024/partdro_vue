export interface Category {
  slug: string
  name: string
  nameCn: string
  description: string
  descriptionCn: string
  icon: string
  productCount: number
  hasProducts: boolean
}

export const categories: Category[] = [
  {
    slug: 'cargo-drones',
    name: 'Cargo Drones',
    nameCn: '货运无人机',
    description: 'Heavy-lift multirotor and VTOL drones for logistics, point-to-point delivery, and industrial transport.',
    descriptionCn: '大载重多旋翼和垂起无人机，适用于物流配送、点到点运输及工业搬运。',
    icon: '📦',
    productCount: 1,
    hasProducts: true,
  },
  {
    slug: 'industrial-drones',
    name: 'Industrial Drones',
    nameCn: '工业无人机',
    description: 'Thermal imaging, inspection, search & rescue drones with dual-light cameras and long-range transmission.',
    descriptionCn: '热成像、巡检、搜救无人机，配备双光相机和远距离图传系统。',
    icon: '🏭',
    productCount: 5,
    hasProducts: true,
  },
  {
    slug: 'gasoline-drones',
    name: 'Gasoline Powered Drones',
    nameCn: '燃油动力无人机',
    description: 'Long-endurance gasoline-powered VTOL UAVs for extended missions up to 350km range.',
    descriptionCn: '长航时燃油动力垂起固定翼无人机，最大航程可达 350km。',
    icon: '⛽',
    productCount: 0,
    hasProducts: true,
  },
  {
    slug: 'hydrogen-drones',
    name: 'Hydrogen Drones',
    nameCn: '氢动力无人机',
    description: 'Hydrogen fuel cell powered drones offering extended flight time for industrial applications.',
    descriptionCn: '氢燃料电池动力无人机，为工业应用提供超长续航能力。',
    icon: '🔋',
    productCount: 0,
    hasProducts: true,
  },
  {
    slug: 'payload',
    name: 'Payload & Gimbal',
    nameCn: '载荷云台',
    description: 'Intelligent payload systems and gimbal configurations for professional drone platforms.',
    descriptionCn: '智能载荷系统和云台配置，适配专业无人机平台。',
    icon: '📷',
    productCount: 6,
    hasProducts: true,
  },
  {
    slug: 'firefighting-drones',
    name: 'Firefighting Drones',
    nameCn: '消防无人机',
    description: 'Specialized drones for firefighting and emergency response. Coming soon.',
    descriptionCn: '消防灭火与应急救援专用无人机。敬请期待。',
    icon: '🔥',
    productCount: 0,
    hasProducts: false,
  },
  {
    slug: 'robotics',
    name: 'Robotics',
    nameCn: '机器人',
    description: 'Unmanned ground vehicles and robotic systems. Coming soon.',
    descriptionCn: '无人地面车辆和机器人系统。敬请期待。',
    icon: '🤖',
    productCount: 0,
    hasProducts: false,
  },
]

export function getCategory(slug: string): Category | undefined {
  return categories.find(c => c.slug === slug)
}

export const activeCategories = categories.filter(c => c.hasProducts)
