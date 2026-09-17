"use client";

import { useEffect, useMemo, useState } from "react";

const AED_MAP_URL = "https://2913800552.github.io/aed-map/";

declare global {
  interface Window {
    __AED_ASSET_ORIGIN__?: string;
  }
}

const assetOrigin = typeof window === "undefined" ? "" : (window.__AED_ASSET_ORIGIN__ ?? "").replace(/\/$/, "");
const assetUrl = (path: string) => `${assetOrigin}${path}`;

const modulePhotos = {
  about: {
    src: assetUrl("/images/aed-public.jpg"),
    alt: "安装在公共建筑外墙上的 AED 设备箱",
    caption: "公共场所中的 AED",
    credit: "5R-MFT / Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:AED_at_Mairie_Voellerdingen.jpg",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
  },
  guide: {
    src: assetUrl("/images/aed-training.jpg"),
    alt: "急救培训中展示 AED 电极片粘贴位置",
    caption: "AED 电极片培训示范",
    credit: "U.S. Navy / Andrew Eder",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:NSA_Souda_Bay_CPR_and_AED_Certification_Course_(8840997).jpg",
    license: "公有领域",
    licenseUrl: "https://creativecommons.org/publicdomain/mark/1.0/",
  },
  health: {
    src: assetUrl("/images/heart-health-generated.jpg"),
    alt: "两位中年人在城市公园中轻松快走",
    caption: "把心脏健康融入日常",
    credit: "",
    sourceUrl: "",
    license: "",
    licenseUrl: "",
  },
} as const;

const healthTopicVisuals: Record<string, { src: string; alt: string }> = {
  smoke: {
    src: assetUrl("/images/health-smoke-v2.png"),
    alt: "阳光窗边烟灰缸中被折断熄灭的香烟",
  },
  food: {
    src: assetUrl("/images/health-diet-v2.png"),
    alt: "由蔬菜、全谷物、豆类和鱼组成的均衡餐盘",
  },
  move: {
    src: assetUrl("/images/health-move-v2.png"),
    alt: "中年人在城市滨水公园中晨跑",
  },
  checkup: {
    src: assetUrl("/images/health-check-v2.png"),
    alt: "在家使用上臂式血压计测量血压",
  },
};

const guideStepVisuals: Record<string, { src: string; alt: string; callout: string; detail: string }> = {
  check: {
    src: assetUrl("/images/guide-check-v2.png"),
    alt: "施救者跪在训练人偶旁轻拍肩部并大声呼喊",
    callout: "轻拍肩部，大声呼喊",
    detail: "确认患者是否有反应",
  },
  call: {
    src: assetUrl("/images/guide-call-v3.png"),
    alt: "施救者用手机呼叫急救并让同伴取得 AED",
    callout: "拨打 120，打开免提",
    detail: "指定他人取得最近的 AED",
  },
  cpr: {
    src: assetUrl("/images/guide-cpr-v2.png"),
    alt: "施救者双手重叠在训练人偶胸部中央进行按压",
    callout: "双手重叠，胸部中央",
    detail: "手臂伸直，持续有力按压",
  },
  pads: {
    src: assetUrl("/images/guide-pads-v2.png"),
    alt: "训练人偶右上胸与左侧胸部粘贴两片 AED 电极片",
    callout: "右上胸＋左侧腋下附近",
    detail: "按电极片图示直接贴在裸露皮肤",
  },
  shock: {
    src: assetUrl("/images/guide-shock-v2.png"),
    alt: "AED 分析和电击时两名施救者双手离开训练人偶",
    callout: "所有人离开患者",
    detail: "确认无人接触后听从设备提示",
  },
};

type ModuleId = "map" | "about" | "guide" | "health";
type ViewId = "home" | ModuleId;

type Topic = {
  id: string;
  index: string;
  icon: string;
  title: string;
  summary: string;
  heading: string;
  paragraphs: string[];
  points: string[];
};

const moduleMeta: Record<ModuleId, { icon: string; title: string; subtitle: string; className: string }> = {
  map: { icon: "位", title: "AED 地图", subtitle: "定位与导航", className: "map" },
  about: { icon: "识", title: "认识 AED", subtitle: "原理与常见疑问", className: "about" },
  guide: { icon: "用", title: "使用说明", subtitle: "跟着步骤行动", className: "guide" },
  health: { icon: "护", title: "健康生活", subtitle: "守护心脏健康", className: "health" },
};

const aboutTopics: Topic[] = [
  {
    id: "what",
    index: "01",
    icon: "AED",
    title: "AED 是什么",
    summary: "认识这台会分析心律的便携式急救设备。",
    heading: "它会先分析，再决定是否建议电击。",
    paragraphs: [
      "AED 的中文名称是自动体外除颤器。它可以分析患者心律，并在检测到需要除颤的心律时给出电击提示。",
      "设备会通过语音、灯光或屏幕文字引导操作，因此经过培训的公众和普通现场施救者都可以在紧急时使用。",
    ],
    points: ["自动分析心律", "只在需要时提示电击", "通过语音逐步引导"],
  },
  {
    id: "when",
    index: "02",
    icon: "判",
    title: "什么时候使用",
    summary: "识别无反应、无正常呼吸等关键表现。",
    heading: "无反应且无正常呼吸时，立即行动。",
    paragraphs: [
      "先确保现场安全，轻拍并呼喊患者。如果患者没有反应、没有正常呼吸或仅有濒死喘息，应立即呼叫 120。",
      "请身边的人尽快取得 AED，同时开始胸外按压。不要为了等待 AED 而延误按压。",
    ],
    points: ["确认现场安全", "判断反应与正常呼吸", "立即呼救并开始按压"],
  },
  {
    id: "questions",
    index: "03",
    icon: "问",
    title: "常见疑问",
    summary: "消除“不敢用、怕用错”的常见顾虑。",
    heading: "跟随设备提示，比犹豫不行动更重要。",
    paragraphs: [
      "AED 不会在任何情况下都放电。设备会自动分析心律，如果不需要电击，就会提示继续胸外按压。",
      "AED 不能替代心肺复苏。施救过程中应按照设备提示，尽量减少胸外按压的中断时间。",
    ],
    points: ["无需电击时不会提示放电", "AED 与 CPR 需要配合", "现场以设备语音为准"],
  },
];

const guideTopics: Topic[] = [
  {
    id: "check",
    index: "01",
    icon: "看",
    title: "确认状态",
    summary: "检查安全、反应与正常呼吸。",
    heading: "先确认现场安全，再快速判断患者状态。",
    paragraphs: ["轻拍患者肩部并大声呼喊。若无反应、无正常呼吸或仅有濒死喘息，应按心脏骤停处理。"],
    points: ["确保现场环境安全", "轻拍呼喊检查反应", "快速观察是否正常呼吸"],
  },
  {
    id: "call",
    index: "02",
    icon: "呼",
    title: "呼叫求助",
    summary: "拨打 120，并明确让人取 AED。",
    heading: "把任务说清楚：一人呼救，一人取 AED。",
    paragraphs: ["请指定一人拨打 120，并让另一人寻找最近的 AED。如果现场只有你，请按 120 调度员指引行动。"],
    points: ["立即拨打 120", "指定人员取 AED", "打开免提听从调度"],
  },
  {
    id: "cpr",
    index: "03",
    icon: "压",
    title: "胸外按压",
    summary: "在胸部中央持续、快速地按压。",
    heading: "在 AED 到达之前，不要停止胸外按压。",
    paragraphs: ["双手重叠放在胸部中央，用力、快速按压，频率约每分钟 100–120 次，并让胸廓在每次按压后充分回弹。"],
    points: ["位置在胸部中央", "频率约 100–120 次/分钟", "尽量减少中断"],
  },
  {
    id: "pads",
    index: "04",
    icon: "贴",
    title: "开机贴片",
    summary: "裸露胸部，按图示粘贴电极片。",
    heading: "打开设备后，只需要跟着语音和图示。",
    paragraphs: ["裸露并擦干胸部。将一片电极片贴在右上胸，另一片贴在左下胸；具体位置以电极片上的图示为准。"],
    points: ["打开 AED 电源", "擦干并裸露胸部", "按电极片图示粘贴"],
  },
  {
    id: "shock",
    index: "05",
    icon: "电",
    title: "分析与电击",
    summary: "无人接触患者，听从设备提示。",
    heading: "分析和电击时，确保没有人接触患者。",
    paragraphs: ["AED 分析心律时暂停接触患者。如果设备建议电击，确认所有人离开患者后执行；随后立即恢复胸外按压。"],
    points: ["大声提醒所有人离开", "按设备提示执行电击", "电击后立即恢复按压"],
  },
];

const healthTopics: Topic[] = [
  {
    id: "smoke",
    index: "01",
    icon: "烟",
    title: "远离烟草",
    summary: "不吸烟，也尽量避免二手烟。",
    heading: "停止烟草暴露，是重要的心血管保护行动。",
    paragraphs: ["烟草使用会增加心血管疾病风险。可以从设定戒烟日期、寻求家人支持或咨询专业戒烟服务开始。"],
    points: ["不吸烟", "避免二手烟", "需要时寻求专业帮助"],
  },
  {
    id: "food",
    index: "02",
    icon: "食",
    title: "均衡饮食",
    summary: "多样、适量，减少盐糖和不健康脂肪。",
    heading: "让天然、少加工的食物成为日常主角。",
    paragraphs: ["增加全谷物、蔬菜、水果、豆类和坚果的比例，并控制盐、游离糖以及饱和脂肪和反式脂肪的摄入。"],
    points: ["食物多样化", "减少高盐高糖食物", "优先选择少加工食物"],
  },
  {
    id: "move",
    index: "03",
    icon: "动",
    title: "规律活动",
    summary: "减少久坐，选择能长期坚持的运动。",
    heading: "规律活动，比偶尔一次高强度运动更可持续。",
    paragraphs: ["从快走、骑行、游泳或其他适合自己的活动开始，循序渐进。已有疾病或运动时出现不适，应先咨询医生。"],
    points: ["减少久坐时间", "循序渐进增加活动", "不适时停止并就医"],
  },
  {
    id: "checkup",
    index: "04",
    icon: "测",
    title: "关注指标",
    summary: "了解血压、血糖、血脂和体重。",
    heading: "看得见的指标，更容易被及时管理。",
    paragraphs: ["定期了解自己的血压、血糖、血脂和体重变化。发现异常时，应咨询专业医疗人员并遵医嘱管理。"],
    points: ["定期测量血压", "关注血糖与血脂", "异常结果及时就医"],
  },
];

type HealthEvidence = {
  metric: string;
  metricUnit: string;
  metricLabel: string;
  title: string;
  intro: string;
  facts: Array<{ value: string; label: string; note: string }>;
  ranges?: Array<{ name: string; reference: string; explanation: string }>;
  actions: string[];
  sources: Array<{ label: string; url: string }>;
};

const healthEvidence: Record<string, HealthEvidence> = {
  smoke: {
    metric: "2–4",
    metricUnit: "倍",
    metricLabel: "吸烟者冠心病和卒中风险",
    title: "远离烟草，是降低心血管风险最直接的行动之一。",
    intro: "烟草会损伤血管内皮、增加血液黏稠和血栓形成倾向。少量吸烟也不是安全的，二手烟同样会增加心脏病和卒中风险。",
    facts: [
      { value: "2–4 倍", label: "冠心病与卒中风险", note: "与不吸烟者相比，吸烟者的风险估计增加至 2–4 倍。" },
      { value: "+25–30%", label: "二手烟与冠心病", note: "不吸烟成年人暴露于二手烟后，冠心病风险增加约 25%–30%。" },
      { value: ">700 万", label: "每年烟草相关死亡", note: "其中超过 160 万人为二手烟暴露的非吸烟者。" },
    ],
    actions: ["设定明确的戒烟日期，并清理家中烟草用品", "避免室内、车内和工作场所的二手烟", "戒烟困难时寻求戒烟门诊或专业医疗帮助"],
    sources: [
      { label: "CDC：吸烟与心血管疾病", url: "https://www.cdc.gov/tobacco/about/cigarettes-and-cardiovascular-disease.html" },
      { label: "WHO：烟草与尼古丁事实", url: "https://www.who.int/news-room/fact-sheets/detail/tobacco" },
    ],
  },
  food: {
    metric: "<5",
    metricUnit: "克/天",
    metricLabel: "WHO 建议成人每日盐摄入",
    title: "少盐、多样、少加工，让日常饮食更靠近心脏需要。",
    intro: "高钠摄入会升高血压，进而增加心血管风险。健康饮食的重点不是短期节食，而是让天然、少加工的食物成为日常主体。",
    facts: [
      { value: "<5 克", label: "成人每日盐摄入", note: "相当于每日钠摄入少于 2000 毫克，约不到一平茶匙盐。" },
      { value: "≥400 克", label: "每日蔬菜和水果", note: "WHO 建议 10 岁以上人群每天至少摄入 400 克蔬菜和水果。" },
      { value: "≥25 克", label: "每日天然膳食纤维", note: "10 岁以上人群可将每日 25 克天然膳食纤维作为参考。" },
    ],
    actions: ["购买食品时查看营养成分表中的钠含量", "少用酱油、腌制品、加工肉和高盐零食", "每餐增加蔬菜，并用全谷物、豆类和坚果丰富食物种类"],
    sources: [
      { label: "WHO：健康饮食", url: "https://www.who.int/news-room/fact-sheets/detail/healthy-diet" },
      { label: "WHO：减少钠摄入", url: "https://www.who.int/news-room/fact-sheets/detail/sodium-reduction" },
    ],
  },
  move: {
    metric: "150–300",
    metricUnit: "分钟/周",
    metricLabel: "成人中等强度有氧活动建议",
    title: "规律活动比偶尔一次高强度运动更容易长期获益。",
    intro: "活动不只指专门锻炼，快走、骑行、家务和通勤都可以计入。重要的是逐步增加，并减少长时间连续久坐。",
    facts: [
      { value: "150–300", label: "分钟中等强度活动", note: "成人每周建议完成 150–300 分钟中等强度有氧活动。" },
      { value: "75–150", label: "分钟高强度活动", note: "也可选择每周 75–150 分钟高强度活动或等量组合。" },
      { value: "≥2 天", label: "肌肉强化活动", note: "每周至少 2 天进行涉及主要肌群的力量活动。" },
    ],
    actions: ["从每天 10–20 分钟快走开始，逐周增加", "久坐期间每 30–60 分钟起身活动", "已有心血管疾病或活动时胸痛、晕厥，应先咨询医生"],
    sources: [
      { label: "WHO：身体活动事实", url: "https://www.who.int/news-room/fact-sheets/detail/physical-activity" },
      { label: "WHO：成人身体活动建议", url: "https://www.who.int/europe/news-room/fact-sheets/item/physical-activity" },
    ],
  },
  checkup: {
    metric: "<120/80",
    metricUnit: "mmHg",
    metricLabel: "成人正常血压常用参考",
    title: "知道自己的数字，才能发现无症状的风险变化。",
    intro: "血压、静息心率和体重是日常较容易追踪的指标。一次异常读数不能替代诊断，应在正确条件下复测，并结合个人疾病与用药情况咨询专业人员。",
    facts: [
      { value: "≥140/90", label: "WHO 高血压诊断界值", note: "在两个不同日期测量均达到该水平，需由专业人员评估。" },
      { value: "60–100", label: "成人静息心率", note: "多数成年人安静状态下每分钟 60–100 次；运动员可能更低。" },
      { value: "18.5–<24", label: "中国成人正常 BMI", note: "BMI 24–<28 为超重，≥28 为肥胖。" },
    ],
    ranges: [
      { name: "血压", reference: "正常参考 <120/80 mmHg", explanation: "不同指南分类略有差异；若多次达到或超过 140/90 mmHg，应及时评估。" },
      { name: "静息心率", reference: "通常 60–100 次/分", explanation: "应在安静、清醒状态测量；药物、发热、压力和运动水平都会影响结果。" },
      { name: "BMI", reference: "中国成人 18.5–<24 kg/m²", explanation: "BMI=体重÷身高²；24–<28 为超重，≥28 为肥胖。" },
    ],
    actions: ["血压测量前安静休息，避免刚运动、饮咖啡或吸烟后立即测量", "记录日期、时间和连续读数，不只看一次结果", "若血压约 180/120 mmHg 或伴胸痛、呼吸困难、神经症状，应立即就医"],
    sources: [
      { label: "WHO：高血压事实", url: "https://www.who.int/news-room/fact-sheets/detail/hypertension" },
      { label: "AHA：成人静息心率", url: "https://www.heart.org/en/healthy-living/exercise-and-physical-activity/fitness-basics/target-heart-rates" },
      { label: "国家卫健委：体重管理指导原则（2024）", url: "https://www.nhc.gov.cn/wjw/ylyjs/202412/b3d40e0141834897808ce6c9dce76a60/files/1736390749000_59785.pdf" },
    ],
  },
};

const topicSets: Partial<Record<ModuleId, Topic[]>> = {
  about: aboutTopics,
  guide: guideTopics,
  health: healthTopics,
};

type AEDPartId = "power" | "screen" | "pads" | "shock";

const aedPartDetails: Array<{
  id: AEDPartId;
  step: string;
  label: string;
  shortLabel: string;
  title: string;
  description: string;
  location: string;
  reading: string[];
  action: string;
  points: string[];
  guideTopic: string;
}> = [
  {
    id: "power",
    step: "01",
    label: "电源与语音",
    shortLabel: "开机",
    title: "打开 AED，立即听从语音提示",
    description: "按下电源键或掀开设备上盖。不同型号外观可能不同，但都会用语音、灯光或图示引导操作。",
    location: "通常位于机身正面或右侧，是带有电源符号的圆形按键。部分 AED 打开上盖后会自动启动。",
    reading: ["按键点亮或设备发出开机提示音", "听到语音后不要反复按电源键", "部分型号会立即提示连接电极片"],
    action: "开机后让一名施救者继续胸外按压，另一名施救者按照语音准备电极片。",
    points: ["不要因不熟悉设备而等待", "让身边的人继续胸外按压", "按设备提示准备电极片"],
    guideTopic: "pads",
  },
  {
    id: "screen",
    step: "02",
    label: "心律分析屏",
    shortLabel: "分析",
    title: "分析心律时，所有人停止接触患者",
    description: "AED 会自动判断是否需要电击。设备分析期间不要触碰或移动患者，以免干扰判断。",
    location: "屏幕通常位于设备正面中央。没有屏幕的型号也会通过指示灯和语音播报分析结果。",
    reading: ["“正在分析”表示暂时停止接触患者", "“建议电击”表示设备已识别到可电击心律", "“不建议电击”时应按语音提示立即恢复按压"],
    action: "听到“正在分析”后清楚喊出“所有人离开”，确认无人触碰患者并等待设备判断。",
    points: ["大声提醒所有人离开患者", "不要自行判断是否需要电击", "等待设备给出明确提示"],
    guideTopic: "shock",
  },
  {
    id: "pads",
    step: "03",
    label: "电极片",
    shortLabel: "贴片",
    title: "裸露并擦干胸部，按图示粘贴电极片",
    description: "一片贴在右上胸，另一片贴在左下胸。具体位置以电极片包装上的图示和设备语音为准。",
    location: "电极片通常放在机身侧面的收纳仓或独立密封袋中，插头连接在设备上或需要插入标记接口。",
    reading: ["包装图示会标明右上胸和左下胸位置", "贴片必须直接贴在裸露、干燥的皮肤上", "儿童、起搏器等特殊情况以设备说明和调度指导为准"],
    action: "撕开包装后按图示贴牢两片电极片，连接好插头，并继续听从设备提示。",
    points: ["必要时剪开衣物并擦干胸部", "贴片应紧密贴合皮肤", "连接线保持牢固，不要反复揭贴"],
    guideTopic: "pads",
  },
  {
    id: "shock",
    step: "04",
    label: "电击按钮",
    shortLabel: "电击",
    title: "确认无人接触后，再按下闪烁的电击键",
    description: "只有设备明确建议电击时才执行。电击后立刻恢复胸外按压，并继续听从 AED 提示。",
    location: "通常是机身正面醒目的红色或橙色按键，并带有闪电符号；全自动型号可能不会设置手动电击键。",
    reading: ["按键闪烁通常表示设备已经充电并等待操作", "只有听到“建议电击”后才准备按下", "全自动 AED 会倒计时并自行放电，应严格保持离开"],
    action: "再次目视确认无人接触患者，大声喊“所有人离开”，按设备提示执行电击并立即恢复胸外按压。",
    points: ["目视确认所有人已经离开", "清楚喊出“所有人离开”", "电击后立即恢复胸外按压"],
    guideTopic: "shock",
  },
];

function AnimatedAEDModel({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <span className="mini-aed-scene" aria-hidden="true">
        <span className="mini-aed-device">
          <b>AED</b>
          <i />
          <em>●</em>
        </span>
      </span>
    );
  }

  return (
    <figure className="aed-model-scene" aria-label="会动的自动体外除颤器立体模型">
      <span className="aed-model-orbit orbit-one" />
      <span className="aed-model-orbit orbit-two" />
      <div className="aed-model-stage">
        <div className="aed-device-wrap">
          <div className="aed-device-model">
            <span className="aed-device-handle" />
            <div className="aed-device-face">
              <div className="aed-device-brand"><strong>AED</strong><span><i />READY</span></div>
              <div className="aed-device-screen">
                <span className="aed-screen-glow" />
                <span className="aed-ecg-wave" />
                <small>ANALYZING</small>
              </div>
              <div className="aed-device-controls">
                <span className="aed-power"><i /></span>
                <span className="aed-shock">⚡</span>
              </div>
              <div className="aed-device-steps"><i /><i /><i /></div>
            </div>
          </div>
        </div>
        <span className="aed-model-cable" />
        <span className="aed-model-pad"><i /></span>
        <span className="aed-model-shadow" />
      </div>
      <figcaption>
        <span><i />动态设备模型</span>
        <strong>自动体外除颤器</strong>
        <small>设备会持续分析心律，并通过语音提示引导现场操作。</small>
      </figcaption>
    </figure>
  );
}

function AEDPartCloseup({ partId }: { partId: AEDPartId }) {
  return (
    <div className={`aed-part-closeup closeup-${partId}`} aria-hidden="true">
      <span className="closeup-grid" />
      <span className="closeup-focus-ring ring-one" />
      <span className="closeup-focus-ring ring-two" />

      {partId === "power" && (
        <div className="power-closeup">
          <span className="closeup-device-edge"><b>AED</b></span>
          <span className="magnified-power"><i /><em>POWER</em></span>
          <span className="closeup-pointer"><i />电源键</span>
        </div>
      )}

      {partId === "screen" && (
        <div className="screen-closeup">
          <div className="magnified-screen">
            <span className="screen-scan-large" />
            <span className="screen-wave-large" />
            <strong>正在分析心律</strong>
            <p>请勿接触患者</p>
          </div>
          <div className="screen-status-row"><span className="active"><i />分析中</span><span><i />等待提示</span></div>
        </div>
      )}

      {partId === "pads" && (
        <div className="pads-closeup">
          <div className="chest-guide">
            <span className="body-head" />
            <span className="body-torso" />
            <span className="placement-pad pad-upper"><i /></span>
            <span className="placement-pad pad-lower"><i /></span>
            <span className="placement-line line-upper" />
            <span className="placement-line line-lower" />
          </div>
          <div className="pad-package"><b>电极片</b><span><i /></span></div>
        </div>
      )}

      {partId === "shock" && (
        <div className="shock-closeup">
          <span className="shock-safety-ring" />
          <span className="magnified-shock"><b>⚡</b><em>SHOCK</em></span>
          <div className="shock-status"><i />建议电击</div>
          <span className="shock-warning">确认无人接触患者</span>
        </div>
      )}

      <span className="closeup-caption">部件镜头特写</span>
    </div>
  );
}

function InteractiveAEDIntro({
  onOpenTopic,
  onOpenGuide,
}: {
  onOpenTopic: (topicId: string) => void;
  onOpenGuide: () => void;
}) {
  const [expandedPartId, setExpandedPartId] = useState<AEDPartId | null>(null);
  const [videoOpen, setVideoOpen] = useState(false);
  const expandedPart = expandedPartId ? aedPartDetails.find((part) => part.id === expandedPartId) ?? null : null;
  const activePart = expandedPart ?? aedPartDetails[0];
  const activePartId = activePart.id;

  useEffect(() => {
    if (!videoOpen && !expandedPartId) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (videoOpen) setVideoOpen(false);
      else setExpandedPartId(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [videoOpen, expandedPartId]);

  const openPart = (partId: AEDPartId) => {
    setExpandedPartId(partId);
  };

  const closePartDetail = () => {
    window.setTimeout(() => setExpandedPartId(null), 0);
  };

  return (
    <>
      <div className="interactive-aed-intro">
        <div className="interactive-intro-heading">
          <div>
            <span className="screen-kicker">AED 交互式设备导览</span>
            <h1>认识一台真正会引导你的 AED。</h1>
          </div>
          <p>选择设备上的 01—04，进入独立的部件特写与使用规则。现场使用时，请始终以 120 调度员和设备语音为准。</p>
        </div>

        <div className="aed-interactive-workbench">
          <section
            className="interactive-model-card"
            aria-label="AED 设备可交互模型"
          >
            <div className="model-card-topline">
              <span><i />设备就绪</span>
              <strong>点击编号进入部件特写</strong>
            </div>

            <div className="interactive-model-canvas">
              <span className="model-halo halo-one" />
              <span className="model-halo halo-two" />
              <div className={`interactive-device is-${activePartId}`}>
                <span className="interactive-device-handle" />
                <div className="interactive-device-face">
                  <div className="interactive-brandline">
                    <strong>AED</strong>
                    <span><i />RESCUE READY</span>
                  </div>

                  <button
                    className="device-hotspot device-display"
                    type="button"
                    aria-label="查看心律分析屏使用规则"
                    aria-pressed={activePartId === "screen"}
                    onClick={() => openPart("screen")}
                  >
                    <span className="display-scan" />
                    <span className="display-wave" />
                    <b>ANALYZING</b>
                    <em onClick={(event) => { event.stopPropagation(); openPart("screen"); }}>02</em>
                  </button>

                  <div className="interactive-control-column">
                    <button
                      className="device-hotspot device-power-button"
                      type="button"
                      aria-label="查看电源与语音提示规则"
                      aria-pressed={activePartId === "power"}
                      onClick={() => openPart("power")}
                    >
                      <i />
                      <em onClick={(event) => { event.stopPropagation(); openPart("power"); }}>01</em>
                    </button>
                    <button
                      className="device-hotspot device-shock-button"
                      type="button"
                      aria-label="查看电击按钮使用规则"
                      aria-pressed={activePartId === "shock"}
                      onClick={() => openPart("shock")}
                    >
                      <b>⚡</b>
                      <em onClick={(event) => { event.stopPropagation(); openPart("shock"); }}>04</em>
                    </button>
                  </div>

                  <div className="device-instruction-strip"><i /><i /><i /></div>
                  <span className="device-speaker"><i /><i /><i /><i /></span>
                </div>
              </div>

              <span className="interactive-cable" />
              <button
                className="device-hotspot interactive-electrode"
                type="button"
                aria-label="查看电极片粘贴规则"
                aria-pressed={activePartId === "pads"}
                onClick={() => openPart("pads")}
              >
                <span><i /></span>
                <em onClick={(event) => { event.stopPropagation(); openPart("pads"); }}>03</em>
              </button>
              <span className="interactive-device-shadow" />
              <div className="model-marker-layer" aria-label="AED 部件编号">
                {aedPartDetails.map((part) => (
                  <button
                    className={`canvas-part-marker marker-${part.id}${part.id === activePartId ? " active" : ""}`}
                    type="button"
                    key={part.id}
                    aria-label={`查看${part.label}特写`}
                    onClick={() => openPart(part.id)}
                  >
                    <b>{part.step}</b>
                    <span>{part.shortLabel}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="model-part-tabs" aria-label="设备部位选择">
              {aedPartDetails.map((part) => (
                <button
                  type="button"
                  key={part.id}
                  className={part.id === activePartId ? "active" : ""}
                  aria-pressed={part.id === activePartId}
                  onClick={() => openPart(part.id)}
                >
                  <b>{part.step}</b>
                  <span>{part.shortLabel}</span>
                </button>
              ))}
            </div>
          </section>

          <aside className="interactive-rule-card" aria-live="polite">
            <div className="rule-card-step"><span>{activePart.step}</span><small>{activePart.label}</small></div>
            <h2>{activePart.title}</h2>
            <p>{activePart.description}</p>
            {expandedPart && (
              <div className="rule-card-location"><strong>位置</strong><span>{activePart.location}</span></div>
            )}
            <ul>
              {(expandedPart ? activePart.reading : activePart.points).map((point) => <li key={point}><i />{point}</li>)}
            </ul>
            <div className="rule-card-note"><i>!</i><span><strong>{expandedPart ? "现场动作" : "紧急情况"}</strong> {expandedPart ? activePart.action : "立即拨打 120，并尽量减少胸外按压中断。"}</span></div>
            <div className="rule-card-actions">
              <button className="video-trigger" type="button" onClick={() => setVideoOpen(true)}><i />观看教学视频</button>
              <button type="button" onClick={onOpenGuide}>查看完整步骤 →</button>
            </div>
          </aside>
        </div>

        <div className="about-topic-rail">
          <div><strong>继续了解 AED</strong><span>选择主题，进入下一层</span></div>
          {aboutTopics.map((topic) => (
            <button type="button" key={topic.id} onClick={() => onOpenTopic(topic.id)}>
              <b>{topic.index}</b><span><strong>{topic.title}</strong><small>{topic.summary}</small></span><i>→</i>
            </button>
          ))}
        </div>
      </div>

      {expandedPart && (
        <div className="part-detail-backdrop" role="presentation" onClick={closePartDetail}>
          <section className="part-detail-page" role="dialog" aria-modal="true" aria-labelledby="part-detail-title" onClick={(event) => event.stopPropagation()}>
            <header className="part-detail-header">
              <button type="button" onClick={closePartDetail}>← 返回完整 AED</button>
              <div className="part-detail-heading"><b>{expandedPart.step}</b><span>{expandedPart.shortLabel} · 部件特写</span></div>
              <button className="part-detail-close" type="button" onClick={closePartDetail} aria-label="关闭部件特写">×</button>
            </header>
            <button className="part-floating-back" type="button" onClick={closePartDetail} aria-label="退出部件特写">
              <span>←</span><strong>退出特写</strong>
            </button>

            <div className="part-detail-body" key={expandedPart.id}>
              <AEDPartCloseup partId={expandedPart.id} />
              <article className="part-detail-copy">
                <div className="part-detail-step"><span>{expandedPart.step}</span><strong>{expandedPart.label}</strong></div>
                <h2 id="part-detail-title">{expandedPart.title}</h2>
                <p className="part-detail-lead">{expandedPart.description}</p>
                <section className="part-location-block">
                  <h3><span>位置</span>先找到它</h3>
                  <p>{expandedPart.location}</p>
                </section>
                <section className="part-reading-block">
                  <h3><span>提示</span>这样理解设备反馈</h3>
                  <ul>{expandedPart.reading.map((item, index) => <li key={item}><b>{String(index + 1).padStart(2, "0")}</b>{item}</li>)}</ul>
                </section>
                <div className="part-action-callout"><span>现场动作</span><p>{expandedPart.action}</p></div>
                <div className="part-detail-actions">
                  <button type="button" onClick={() => setVideoOpen(true)}>观看教学视频</button>
                  <button className="part-next-button" type="button" onClick={onOpenGuide}>进入完整使用步骤 →</button>
                </div>
              </article>
            </div>
          </section>
        </div>
      )}

      {videoOpen && (
        <div className="video-modal-backdrop" role="presentation" onMouseDown={() => setVideoOpen(false)}>
          <section className="video-modal" role="dialog" aria-modal="true" aria-labelledby="video-modal-title" onMouseDown={(event) => event.stopPropagation()}>
            <header>
              <div><span>教学资源</span><h2 id="video-modal-title">AED 标准操作演示</h2></div>
              <button type="button" onClick={() => setVideoOpen(false)} aria-label="关闭教学视频弹窗">×</button>
            </header>
            <div className="video-placeholder">
              <span className="video-play-mark"><i /></span>
              <strong>教学视频预留位</strong>
              <p>后续可接入权威机构的 AED 操作视频，支持本地 MP4、Bilibili 或其他合规视频源。</p>
              <small>推荐比例 16:9 · 建议添加中文字幕与步骤章节</small>
            </div>
            <footer><i />正式发布前，请使用经审核的急救教学内容。</footer>
          </section>
        </div>
      )}
    </>
  );
}

function AboutTopicDetail({
  topic,
  topicIndex,
  onOverview,
  onSelect,
}: {
  topic: Topic;
  topicIndex: number;
  onOverview: () => void;
  onSelect: (topicId: string) => void;
}) {
  const previousTopic = aboutTopics[topicIndex - 1] ?? null;
  const followingTopic = aboutTopics[topicIndex + 1] ?? null;

  return (
    <div className="about-detail-layout">
      <aside className="about-detail-nav" aria-label="认识 AED 主题导航">
        <div><small>认识 AED</small><strong>基础知识</strong></div>
        {aboutTopics.map((item) => (
          <button
            type="button"
            key={item.id}
            className={item.id === topic.id ? "active" : ""}
            onClick={() => onSelect(item.id)}
            aria-current={item.id === topic.id ? "page" : undefined}
          >
            <span>{item.index}</span><b>{item.title}</b><i>→</i>
          </button>
        ))}
        <button className="about-device-return" type="button" onClick={onOverview}>返回设备导览</button>
      </aside>

      <article className="about-detail-copy">
        <span className="about-detail-kicker">AED 知识层 · {topic.index}</span>
        <h1>{topic.heading}</h1>
        {topic.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        <section className="about-key-points">
          <h2>记住这三点</h2>
          <ol>{topic.points.map((point, index) => <li key={point}><span>{String(index + 1).padStart(2, "0")}</span><strong>{point}</strong></li>)}</ol>
        </section>
        <div className="about-detail-actions">
          {previousTopic && <button type="button" onClick={() => onSelect(previousTopic.id)}>← 上一主题</button>}
          {followingTopic ? (
            <button className="about-next-topic" type="button" onClick={() => onSelect(followingTopic.id)}>下一主题 · {followingTopic.title} →</button>
          ) : (
            <button className="about-next-topic" type="button" onClick={onOverview}>完成 · 返回设备导览</button>
          )}
        </div>
      </article>

      <figure className="about-detail-visual">
        <img src={modulePhotos.about.src} alt={modulePhotos.about.alt} decoding="async" />
        <span className="about-visual-index">{topic.index}</span>
        <div><strong>{topic.icon}</strong><p>{topic.title}</p></div>
        <figcaption>公共场所中的 AED 设备</figcaption>
      </figure>
    </div>
  );
}

function GuideHeartGraphic({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "guide-heart-graphic compact" : "guide-heart-graphic"} aria-hidden="true">
      <span className="guide-orbit guide-orbit-one"><i /></span>
      <span className="guide-orbit guide-orbit-two"><i /></span>
      <span className="guide-grid-glow" />
      <div className="guide-heart-core">
        <span className="css-heart" />
        <span className="heart-ecg"><i /></span>
      </div>
      <div className="guide-aed-unit">
        <span>AED</span>
        <i className="guide-aed-screen" />
        <i className="guide-aed-ready" />
      </div>
      <span className="guide-pad guide-pad-one"><i /></span>
      <span className="guide-pad guide-pad-two"><i /></span>
      <span className="guide-art-caption"><i />急救链路已连接</span>
    </div>
  );
}

function GuideOverview({ onSelect }: { onSelect: (topicId: string) => void }) {
  return (
    <div className="guide-overview">
      <section className="guide-hero-panel">
        <div className="guide-hero-copy">
          <span className="guide-kicker"><i />AED 应急操作指南</span>
          <h1>五个步骤，<br /><em>把慌乱变成行动。</em></h1>
          <p>现场不需要一次记住所有内容。先呼救、持续按压，再跟随 AED 的语音提示逐步操作。</p>
          <div className="guide-hero-actions">
            <button type="button" onClick={() => onSelect("check")}>从第一步开始 <span>→</span></button>
          </div>
        </div>
        <GuideHeartGraphic />
      </section>

      <nav className="guide-step-rail" aria-label="AED 五步使用说明">
        <div className="guide-rail-label"><small>操作流程</small><strong>点击任一步骤<br />进入详细教学</strong></div>
        {guideTopics.map((topic) => (
          <button type="button" key={topic.id} onClick={() => onSelect(topic.id)}>
            <span>{topic.index}</span>
            <div><strong>{topic.title}</strong><small>{topic.summary}</small></div>
            <i>→</i>
          </button>
        ))}
      </nav>
    </div>
  );
}

function GuideStepVisual({ topic }: { topic: Topic }) {
  const visual = guideStepVisuals[topic.id];

  return (
    <figure className={`guide-step-visual visual-${topic.id}`}>
      <img className="guide-step-image" src={visual.src} alt={visual.alt} decoding="async" />
      <span className="guide-step-image-shade" aria-hidden="true" />
      <span className="step-visual-index">STEP {topic.index}</span>
      <figcaption className="guide-step-callout"><strong>{visual.callout}</strong><span>{visual.detail}</span></figcaption>
      <div className="step-visual-status"><i /><span>{topic.title}</span></div>
    </figure>
  );
}

function GuideTopicDetail({
  topic,
  topicIndex,
  onOverview,
  onSelect,
}: {
  topic: Topic;
  topicIndex: number;
  onOverview: () => void;
  onSelect: (topicId: string) => void;
}) {
  const previousTopic = guideTopics[topicIndex - 1] ?? null;
  const followingTopic = guideTopics[topicIndex + 1] ?? null;

  return (
    <div className="guide-detail-layout">
      <aside className="guide-detail-nav" aria-label="使用步骤导航">
        <div><small>使用说明</small><strong>五步操作</strong></div>
        {guideTopics.map((item) => (
          <button
            type="button"
            key={item.id}
            className={item.id === topic.id ? "active" : ""}
            onClick={() => onSelect(item.id)}
            aria-current={item.id === topic.id ? "step" : undefined}
          >
            <span>{item.index}</span><b>{item.title}</b><i />
          </button>
        ))}
      </aside>

      <article className="guide-detail-copy">
        <span className="guide-kicker"><i />AED 操作步骤 {topic.index}</span>
        <h1>{topic.heading}</h1>
        {topic.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        <div className="guide-key-points">
          <small>本步骤要点</small>
          <ul>{topic.points.map((point, index) => <li key={point}><span>{String(index + 1).padStart(2, "0")}</span>{point}</li>)}</ul>
        </div>
        <div className="guide-detail-actions">
          <button type="button" onClick={onOverview}>步骤总览</button>
          {previousTopic && <button type="button" onClick={() => onSelect(previousTopic.id)}>← 上一步</button>}
          {followingTopic && <button className="guide-next-step" type="button" onClick={() => onSelect(followingTopic.id)}>下一步 · {followingTopic.title} →</button>}
          {!followingTopic && <button className="guide-next-step" type="button" onClick={onOverview}>完成 · 返回总览</button>}
        </div>
        <p className="guide-detail-disclaimer">AED 型号可能不同；请以现场设备图示、语音提示和 120 调度指引为准。</p>
      </article>

      <aside className="guide-detail-media">
        <GuideStepVisual topic={topic} />
      </aside>
    </div>
  );
}

function HealthOverview({ onSelect }: { onSelect: (topicId: string) => void }) {
  return (
    <div className="health-overview-new">
      <section className="health-hero-new">
        <img src={modulePhotos.health.src} alt={modulePhotos.health.alt} decoding="async" />
        <span className="health-image-wash" />
        <div className="health-hero-copy-new">
          <span className="health-heart-mark" aria-hidden="true"><i /></span>
          <h1>把心脏健康，<br />放进每天的生活。</h1>
          <p>从戒烟、饮食、活动和定期检查开始。选择一项，先做一个能够长期坚持的改变。</p>
          <button type="button" onClick={() => onSelect("move")}>从规律活动开始 <span>→</span></button>
          <div className="health-quick-facts" aria-label="心脏健康行动提示">
            <span><strong>4</strong> 个行动方向</span>
            <span><strong>1</strong> 次选择开始改变</span>
          </div>
        </div>
        <div className="health-ecg-visual" aria-hidden="true"><i /></div>
        <div className="health-hero-tag"><i />每日心脏健康</div>
      </section>

      <nav className="health-topic-grid" aria-label="健康生活主题">
        {healthTopics.map((topic) => {
          const visual = healthTopicVisuals[topic.id];
          return (
            <button type="button" key={topic.id} onClick={() => onSelect(topic.id)}>
              <span className="health-topic-thumb"><img src={visual.src} alt="" decoding="async" /><b>{topic.icon}</b></span>
              <div><small>{topic.index}</small><strong>{topic.title}</strong><p>{topic.summary}</p></div>
              <i>→</i>
            </button>
          );
        })}
      </nav>
    </div>
  );
}

function HealthTopicDetail({
  topic,
  onSelect,
}: {
  topic: Topic;
  onSelect: (topicId: string) => void;
}) {
  const evidence = healthEvidence[topic.id];
  const visual = healthTopicVisuals[topic.id];

  return (
    <div className={`health-data-page health-data-${topic.id}`}>
      <nav className="health-data-nav" aria-label="健康生活主题导航">
        {healthTopics.map((item) => (
          <button
            type="button"
            key={item.id}
            className={item.id === topic.id ? "active" : ""}
            onClick={() => onSelect(item.id)}
            aria-current={item.id === topic.id ? "page" : undefined}
          >
            <span>{item.icon}</span><strong>{item.title}</strong>
          </button>
        ))}
      </nav>

      <div className="health-data-body">
        <section className="health-metric-visual">
          <img className="health-topic-visual-img" src={visual.src} alt={visual.alt} decoding="async" />
          <span className="health-topic-visual-shade" />
          <span className="health-topic-motion-ring ring-one" aria-hidden="true" />
          <span className="health-topic-motion-ring ring-two" aria-hidden="true" />
          <div className="health-primary-metric">
            <strong>{evidence.metric}</strong><em>{evidence.metricUnit}</em>
            <p>{evidence.metricLabel}</p>
          </div>
          <div className="health-visual-caption"><i />权威数据参考</div>
        </section>

        <article className="health-data-content">
          <div className="health-data-heading">
            <span>{topic.icon}</span>
            <div><strong>{topic.title}</strong><h1>{evidence.title}</h1></div>
          </div>
          <p className="health-data-intro">{evidence.intro}</p>

          <section className="health-fact-grid" aria-label="关键数据">
            {evidence.facts.map((fact) => (
              <div key={fact.label}>
                <strong>{fact.value}</strong>
                <h2>{fact.label}</h2>
                <p>{fact.note}</p>
              </div>
            ))}
          </section>

          {evidence.ranges && (
            <section className="health-reference-table">
              <h2>常用指标参考</h2>
              {evidence.ranges.map((range) => (
                <div key={range.name}>
                  <strong>{range.name}</strong><b>{range.reference}</b><p>{range.explanation}</p>
                </div>
              ))}
            </section>
          )}

          <section className="health-action-section">
            <h2>可以从今天开始做</h2>
            <ol>{evidence.actions.map((action, index) => <li key={action}><span>{index + 1}</span>{action}</li>)}</ol>
          </section>

          <footer className="health-source-footer">
            <p>以上为一般成人健康科普参考，不能替代个体诊断或医生建议。</p>
            <div>{evidence.sources.map((source) => <a key={source.url} href={source.url} target="_blank" rel="noreferrer">{source.label} ↗</a>)}</div>
          </footer>
        </article>
      </div>
    </div>
  );
}

export default function Home() {
  const [view, setView] = useState<ViewId>("home");
  const [topicId, setTopicId] = useState<string | null>(null);

  useEffect(() => {
    const syncRoute = () => {
      const [nextView, nextTopic] = window.location.hash.replace("#", "").split("/");
      const validView: ViewId = ["map", "about", "guide", "health"].includes(nextView) ? nextView as ModuleId : "home";
      setView(validView);
      setTopicId(nextTopic || null);
    };
    syncRoute();
    window.addEventListener("hashchange", syncRoute);
    window.addEventListener("popstate", syncRoute);
    return () => {
      window.removeEventListener("hashchange", syncRoute);
      window.removeEventListener("popstate", syncRoute);
    };
  }, []);

  const navigate = (nextView: ViewId, nextTopic: string | null = null) => {
    setView(nextView);
    setTopicId(nextTopic);
    const route = nextView === "home" ? "#home" : `#${nextView}${nextTopic ? `/${nextTopic}` : ""}`;
    window.history.pushState({}, "", route);
  };

  const topics = view === "home" || view === "map" ? [] : topicSets[view] ?? [];
  const currentTopic = useMemo(() => topics.find((topic) => topic.id === topicId) ?? null, [topics, topicId]);
  const currentTopicIndex = currentTopic ? topics.findIndex((topic) => topic.id === currentTopic.id) : -1;

  const goBack = () => {
    if (currentTopic) navigate(view, null);
    else navigate("home");
  };

  return (
    <div className={currentTopic ? "mobile-app-shell detail-open" : "mobile-app-shell"}>
      <header className="app-topbar">
        <button className="app-brand" type="button" onClick={() => navigate("home")} aria-label="返回功能首页">
          <span>AED</span>
          <div><strong>AED 使用平台</strong><small>急救地图与健康助手</small></div>
        </button>
        <nav className="desktop-nav" aria-label="网站主要功能">
          <button type="button" className={view === "home" ? "active" : ""} onClick={() => navigate("home")} aria-current={view === "home" ? "page" : undefined}>首页</button>
          {(["map", "about", "guide", "health"] as ModuleId[]).map((id) => (
            <button type="button" key={id} className={view === id ? "active" : ""} onClick={() => navigate(id)} aria-current={view === id ? "page" : undefined}>
              {id === "map" ? "查找 AED" : moduleMeta[id].title}
            </button>
          ))}
        </nav>
        {view !== "guide" && <a className="call-120" href="tel:120"><small>紧急呼叫</small><strong>120</strong></a>}
      </header>

      <main className="app-stage">
        {view === "home" ? (
          <section className="home-screen" aria-labelledby="home-title">
            <div className="home-heading">
              <div>
                <div className="home-eyebrow">
                  <span className="screen-kicker">AED 公共急救助手</span>
                  <span className="service-status"><i />地图服务已连接</span>
                </div>
                <h1 id="home-title">关键时刻，<em>先找到 AED。</em></h1>
              </div>
              <p>地图查找是核心功能。你也可以继续了解设备、学习使用步骤，或建立更健康的生活方式。</p>
            </div>

            <div className="home-dashboard">
              <article className="primary-map-card">
                <iframe src={AED_MAP_URL} title="可拖动和缩放的 AED 实时地图" loading="eager" allow="geolocation" referrerPolicy="strict-origin-when-cross-origin" />
                <div className="map-preview-shade" />
                <span className="live-map-badge"><i />实时地图 · 可拖动缩放</span>
                <div className="primary-map-copy">
                  <span className="core-badge"><i /> 核心功能</span>
                  <h2>AED 定位与查找</h2>
                  <p>查看附近设备位置，进入地图后可继续查找与导航。</p>
                  <button className="primary-map-action" type="button" onClick={() => navigate("map")}>
                    打开 AED 地图 <span>→</span>
                  </button>
                </div>
              </article>

              <div className="secondary-module-stack">
                {(["about", "guide", "health"] as ModuleId[]).map((id, index) => {
                  const module = moduleMeta[id];
                  const photo = id === "about" ? modulePhotos.about : id === "guide" ? modulePhotos.guide : modulePhotos.health;
                  return (
                    <button className={`home-module-card ${module.className}`} type="button" key={id} onClick={() => navigate(id)}>
                      {id === "about" ? (
                        <AnimatedAEDModel compact />
                      ) : id === "guide" ? (
                        <GuideHeartGraphic compact />
                      ) : photo ? (
                        <span className={`home-module-photo photo-${id}`} aria-hidden="true">
                          <img src={photo.src} alt="" decoding="async" />
                        </span>
                      ) : (
                        <span className={`home-module-icon app-icon-${id}`} aria-hidden="true"><i /></span>
                      )}
                      <span className="home-module-copy"><small>0{index + 2}</small><strong>{module.title}</strong><em>{module.subtitle}</em></span>
                      <span className="home-module-arrow">↗</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="emergency-callout" aria-label="紧急呼叫 120">
              <span className="emergency-callout-icon">!</span>
              <div><strong>发生紧急情况？</strong><p>不要等待页面内容加载，立即联系急救中心。</p></div>
              <a href="tel:120"><span>立即呼叫</span><b>120</b></a>
            </div>
          </section>
        ) : (
          <section key={`${view}-${topicId ?? "overview"}`} className={view === "map" ? "feature-screen map-screen" : "feature-screen"} aria-label={moduleMeta[view].title}>
            <div className="feature-topline">
              <button className="back-button" type="button" onClick={goBack} aria-label="返回上一层">←</button>
              <div className="feature-breadcrumb">
                <span>功能首页</span><i>/</i><strong>{moduleMeta[view].title}</strong>
                {currentTopic && <><i>/</i><b>{currentTopic.title}</b></>}
              </div>
              {view === "map" ? (
                <a className="map-external" href={AED_MAP_URL} target="_blank" rel="noreferrer">全屏打开 <span>↗</span></a>
              ) : (
                <span className="feature-count">
                  {currentTopic ? `${currentTopic.index} / ${String(topics.length).padStart(2, "0")}` : `${String(topics.length).padStart(2, "0")} 个主题`}
                </span>
              )}
            </div>

            {view === "map" ? (
              <div className="full-map-view">
                <iframe src={AED_MAP_URL} title="附近 AED 定位与导航地图" allow="geolocation" referrerPolicy="strict-origin-when-cross-origin" />
                <div className="map-help-pill"><i /><span><strong>急救顺序</strong> 120 → 胸外按压 → AED</span></div>
              </div>
            ) : currentTopic ? (
              view === "guide" ? (
                <GuideTopicDetail
                  topic={currentTopic}
                  topicIndex={currentTopicIndex}
                  onOverview={() => navigate("guide")}
                  onSelect={(nextTopicId) => navigate("guide", nextTopicId)}
                />
              ) : view === "health" ? (
                <HealthTopicDetail
                  topic={currentTopic}
                  onSelect={(nextTopicId) => navigate("health", nextTopicId)}
                />
              ) : (
                <AboutTopicDetail
                  topic={currentTopic}
                  topicIndex={currentTopicIndex}
                  onOverview={() => navigate("about")}
                  onSelect={(nextTopicId) => navigate("about", nextTopicId)}
                />
              )
            ) : view === "about" ? (
              <InteractiveAEDIntro
                onOpenTopic={(nextTopicId) => navigate("about", nextTopicId)}
                onOpenGuide={() => navigate("guide")}
              />
            ) : view === "guide" ? (
              <GuideOverview onSelect={(nextTopicId) => navigate("guide", nextTopicId)} />
            ) : (
              <HealthOverview onSelect={(nextTopicId) => navigate("health", nextTopicId)} />
            )}
          </section>
        )}
      </main>

      <nav className={currentTopic ? "bottom-dock hidden-on-detail" : "bottom-dock"} aria-label="主要功能">
        <button type="button" className={view === "home" ? "active" : ""} onClick={() => navigate("home")} aria-current={view === "home" ? "page" : undefined}><span className="dock-icon dock-home" aria-hidden="true"><i /></span><small>首页</small></button>
        {(["about", "map", "guide", "health"] as ModuleId[]).map((id) => (
          <button type="button" key={id} className={view === id ? `active ${id}` : id} onClick={() => navigate(id)} aria-current={view === id ? "page" : undefined}>
            <span className={`dock-icon dock-${id}`} aria-hidden="true"><i /></span><small>{id === "map" ? "找 AED" : moduleMeta[id].title.replace("AED ", "")}</small>
          </button>
        ))}
      </nav>
    </div>
  );
}
