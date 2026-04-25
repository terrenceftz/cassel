import { Question, YanLing, BloodlineRank } from './types.ts';

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "在深夜的寂静中，你最先听到的是？",
    options: [
      { label: "龙类的低语，如同古老的歌谣", value: "a", weights: { "time_zero": 2, "grim_reaper": 1, "dream_tapir": 2 } },
      { label: "同伴的呼救，在暴风雨中回荡", value: "b", weights: { "eternal_night": 2, "snake": 1, "void_mirror": 1 } },
      { label: "齿轮的转动，命运的钟声响起", value: "c", weights: { "time_zero": 1, "kings_authority": 2, "scythe": 1 } },
      { label: "自由的风声，掠过广褒的大地", value: "d", weights: { "wind_kings_breath": 3, "blue_copper": 1 } },
    ]
  },
  {
    id: 2,
    text: "当绝望的敌人向你扑来，你的选择是？",
    options: [
      { label: "释放燃尽一切的怒火", value: "a", weights: { "kings_authority": 3, "vampire": 2 } },
      { label: "消失在阴影中寻找破绽", value: "b", weights: { "snake": 3, "void_mirror": 3 } },
      { label: "在瞬间终结所有挑战", value: "c", weights: { "time_zero": 3, "grim_reaper": 2, "scythe": 2 } },
      { label: "成为守护身后之人的盾", value: "d", weights: { "eternal_night": 3, "immortal": 2 } },
    ]
  },
  {
    id: 3,
    text: "血脉中流淌的力量，对你而言意味着？",
    options: [
      { label: "宿命的诅咒与孤独", value: "a", weights: { "grim_reaper": 3, "time_zero": 1, "dream_tapir": 1 } },
      { label: "至高无上的权能", value: "b", weights: { "kings_authority": 2, "time_zero": 2, "vampire": 1 } },
      { label: "守护弱小的利剑", value: "c", weights: { "eternal_night": 2, "wind_kings_breath": 1, "immortal": 1 } },
      { label: "开启新世界进化的钥匙", value: "d", weights: { "snake": 2, "wind_kings_breath": 2, "blue_copper": 2 } },
    ]
  },
  {
    id: 4,
    text: "如果世界即将倾覆，你唯一想握住的东西是？",
    options: [
      { label: "复仇的刀柄", value: "a", weights: { "grim_reaper": 2, "scythe": 3 } },
      { label: "挚爱之人的手", value: "b", weights: { "eternal_night": 2, "void_mirror": 2 } },
      { label: "足以支配万物的王座", value: "c", weights: { "kings_authority": 2, "vampire": 2 } },
      { label: "一张通往远方的船票", value: "d", weights: { "wind_kings_breath": 2, "blue_copper": 2 } },
    ]
  },
  {
    id: 5,
    text: "在诺玛的图书馆里，你会被哪一类古籍吸引？",
    options: [
      { label: "《屠龙战术与实战》", value: "a", weights: { "snake": 2, "eternal_night": 1 } },
      { label: "《上古龙族炼金术》", value: "b", weights: { "blue_copper": 3, "vampire": 1 } },
      { label: "《言灵起源：精神领域》", value: "c", weights: { "dream_tapir": 3, "void_mirror": 2 } },
      { label: "《那些消失的混血种文明》", value: "d", weights: { "time_zero": 1, "wind_kings_breath": 1 } },
    ]
  },
  {
    id: 6,
    text: "战场上，你认为哪种姿态最优雅？",
    options: [
      { label: "不动如山的绝对防御", value: "a", weights: { "eternal_night": 3, "immortal": 2 } },
      { label: "超越音速的极速之影", value: "b", weights: { "time_zero": 3, "wind_kings_breath": 2 } },
      { label: "操控精神的幕后主使", value: "c", weights: { "dream_tapir": 3, "void_mirror": 2 } },
      { label: "焚毁一切的狂暴审判", value: "d", weights: { "kings_authority": 2, "grim_reaper": 2 } },
    ]
  },
  {
    id: 7,
    text: "面对未知的黑暗，你下意识的反应是？",
    options: [
      { label: "点燃火焰照亮前路", value: "a", weights: { "kings_authority": 2, "vampire": 1 } },
      { label: "融入阴影静待时机", value: "b", weights: { "void_mirror": 3, "snake": 1 } },
      { label: "闭上眼，用心跳感知全局", value: "c", weights: { "scythe": 3, "snake": 2 } },
      { label: "感到恐惧，转身寻找警察或普通出口", value: "d", weights: { "muggle": 10 } },
    ]
  },
  {
    id: 8,
    text: "当你发现自己拥有超能力时，第一反应是？",
    options: [
      { label: "这才是真正的我", value: "a", weights: { "time_zero": 2, "kings_authority": 2 } },
      { label: "变强，然后复仇", value: "b", weights: { "grim_reaper": 2, "scythe": 2 } },
      { label: "我只是想安静地过平凡的生活", value: "c", weights: { "eternal_night": 2, "immortal": 2 } },
      { label: "天哪，我不是怪物吧？我要去精神病院检查", value: "d", weights: { "muggle": 10 } },
    ]
  },
  {
    id: 9,
    text: "在昂热校长的下午茶时间，你会选择？",
    options: [
      { label: "关于屠龙的历史秘辛", value: "a", weights: { "time_zero": 2, "blue_copper": 1 } },
      { label: "最好的雪茄与美酒", value: "b", weights: { "wind_kings_breath": 2, "vampire": 1 } },
      { label: "沉默地听他讲往事", value: "c", weights: { "grim_reaper": 1, "void_mirror": 1 } },
      { label: "赶紧喝完这杯奇怪的茶，然后去超市兼职", value: "d", weights: { "muggle": 10 } },
    ]
  }
];

export const YAN_LINGS: YanLing[] = [
  {
    id: "muggle",
    name: "无（麻瓜）",
    rank: BloodlineRank.F,
    description: "完全没有龙类血统。体内没有龙类基因的共鸣，无法感知元素的波动。",
    effect: "平淡却安稳的一生。",
    personality: "你是个纯粹的人类，不属于这个残酷的世界。但这或许是你最大的幸运。"
  },
  {
    id: "time_zero",
    name: "时零",
    rank: BloodlineRank.S,
    description: "极度稀有的言灵。能够让使用者进入一个近乎静止的时间流，以极高的速度行动。",
    effect: "在领域内，时间流速减缓至五十分之一。",
    personality: "你是时间的弃儿，也是时间的领路人。在静止的世界里，只有你能触及真实的维度。"
  },
  {
    id: "grim_reaper",
    name: "审判",
    rank: BloodlineRank.S,
    description: "代表着死亡的绝对命令。通过声音或意念引导死神的力量，摧毁领域内的一切目标。",
    effect: "下达必死的指令，无视物理防御的切割。",
    personality: "你的血脉中注定带有毁灭。你是诸神的裁决者，在废墟中睁开冰冷的双眸。"
  },
  {
    id: "dream_tapir",
    name: "梦貘",
    rank: BloodlineRank.S,
    description: "精神系顶级言灵，能将敌人拉入无尽的噩梦迷宫，在精神层面彻底摧毁对手。",
    effect: "制造无法醒来的幻觉，并在幻觉中重构对手的灵魂。",
    personality: "虚幻与现实对你而言没有界限。你是梦境的牧羊人，操控着灵魂最深处的恐惧。"
  },
  {
    id: "kings_authority",
    name: "君焰",
    rank: BloodlineRank.A,
    description: "青铜与火之王一系的顶级言灵。操纵超高热的火焰与爆炸。",
    effect: "产生极高温度的火球与爆破冲击波。",
    personality: "你天生属于战场。火焰是你的呼吸，爆炸是你的心跳，你即便陨落也是最耀眼的火流星。"
  },
  {
    id: "void_mirror",
    name: "冥照",
    rank: BloodlineRank.A,
    description: "通过改变周围的光折射，使使用者和同伴在视觉上完全消失。",
    effect: "构建完美的防御性视觉盲点，实现群体隐匿。",
    personality: "你擅长在阴影中生存。沉默是你的美学，你是游走在世界边缘的幽灵。"
  },
  {
    id: "eternal_night",
    name: "金刚界",
    rank: BloodlineRank.A,
    description: "强化防御的言灵。使用者身体硬度极大提升，并在周围形成斥力领域。",
    effect: "全方位的物理防御与冲击抗性。",
    personality: "你是同伴身前最稳固的堡垒。厚重、沉默、坚硬，你的意志比钢铁更难摧毁。"
  },
  {
    id: "scythe",
    name: "镰鼬",
    rank: BloodlineRank.A,
    description: "增强听觉的言灵，通过声音的波动感知领域内的一切细微动向，建立全知视角。",
    effect: "窃听大地的呼吸，甚至能捕捉到敌人神经元跳动的音频。",
    personality: "世界对你而言没有任何秘密。你聆听风的消息，捕捉每一个微小的背叛。"
  },
  {
    id: "vampire",
    name: "吸血鬼",
    rank: BloodlineRank.B,
    description: "危险的高危言灵，通过汲取周围物质的生命力甚至龙类元素来补充自身。",
    effect: "极速的自愈能力与能量吞噬。",
    personality: "禁忌的力量让你显得有些格格不入。你渴望完整，却总是在吞噬中迷失方向。"
  },
  {
    id: "immortal",
    name: "不朽",
    rank: BloodlineRank.B,
    description: "极大幅度增强身体素质，使肌肉组织变得如金刚石般坚硬，无视物理攻击。",
    effect: "肉身成圣，免疫常规枪炮和刀剑伤害。",
    personality: "你追求力量的纯粹。当你的拳头落下时，神也会感到战栗。"
  },
  {
    id: "wind_kings_breath",
    name: "御风",
    rank: BloodlineRank.B,
    description: "自由掌控空气流动的力量。可用于飞行、侦查或制造真空。",
    effect: "操纵上升气流与风压，形成无形之翼。",
    personality: "你从不安于现状。你是自由的化身，在风的尽头追逐永恒的自由。"
  },
  {
    id: "snake",
    name: "蛇",
    rank: BloodlineRank.B,
    description: "信息处理类的言灵。释放生物电流捕获周围的一切反馈，建立三维感知。",
    effect: "超广领域的感知网，无视障碍物与黑暗。",
    personality: "你通过数据和逻辑看世界。冷漠的分析背后是你对真相近乎偏执的追求。"
  },
  {
    id: "blue_copper",
    name: "青铜",
    rank: BloodlineRank.C,
    description: "感知并操控周围的金属元素，虽不如炼金术高深，但极其泛用。",
    effect: "改变金属形状，在关键时刻将其化作武器。",
    personality: "你脚踏实地，像铁匠一样打磨自己的生活。即使平凡，也有属于自己的锋芒。"
  }
];
