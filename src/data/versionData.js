/**
 * 多版本支持数据
 * 每个版本包含：版本号、描述、对应游戏模式列表
 */
export const versionData = [
  {
    version: '1.8',
    label: '经典怀旧版本',
    description: '兼容性最佳，PvP 核心版本',
    color: '#E53935',
    modes: [
      '起床战争 · 经典',
      '竞技场决斗',
      '技巧练习',
      '击退大乱斗'
    ]
  },
  {
    version: '1.20',
    label: '现代化版本',
    description: '全新机制，丰富探索体验',
    color: '#7C4DFF',
    modes: [
      '经验起床 · Modern',
      '空岛战争',
      '2B2T'
    ]
  },
  {
    version: '1.21',
    label: '最新版本',
    description: '高版本专属竞技玩法',
    color: '#43A047',
    modes: [
      '竞技场决斗（水晶PvP）',
      '竞技场决斗（重锤）',
      '高版本专属内容'
    ]
  }
]