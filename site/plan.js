"use strict";
// The main plan matches the 2026-10-08 PDF; busy-equipment alternatives are web-only.
const GYM_PLAN = {
  videos: {
    chest: "https://www.bilibili.com/video/BV1cUevzTEb4/",
    row: "https://www.bilibili.com/video/BV1YteEz1ES3/?t=138",
    lat: "https://www.bilibili.com/video/BV1YteEz1ES3/?t=98",
    lateral: "https://www.bilibili.com/video/BV1UN41157u9/",
    triceps: "https://www.bilibili.com/video/BV1fjMyzZEt5/",
    hammer: "https://www.bilibili.com/video/BV1YteEz1ES3/?t=258",
    goblet: "https://www.bilibili.com/video/BV1TT4y1p7YR/",
    rdl: "https://www.bilibili.com/video/BV1u84y1q795/",
    curl: "https://www.bilibili.com/video/BV1Hx4y1Y7TN/",
    calf: "https://www.bilibili.com/video/BV1QG4y1b7kr/",
    deadbug: "https://www.bilibili.com/video/BV1RXdUBiEsa/",
    pullup: "https://www.bilibili.com/video/BV1JjwTzkEw4/",
    incline: "https://www.bilibili.com/video/BV1aa4y1o7XA/",
    shoulder: "https://www.bilibili.com/video/BV1Re411X7Jq/",
    facepull: "https://www.bilibili.com/video/BV1wZ421e7K2/",
    smith: "https://www.bilibili.com/video/BV14x4y147Jw/",
    plank: "https://www.bilibili.com/video/BV14w411V7Yj/",
    warmup: "https://www.bilibili.com/video/BV1Nw411u7t8/",
    stretch: "https://www.bilibili.com/video/BV1qM4m117VH/",
    pushup: "https://www.bilibili.com/video/BV1Qh411s7Sv/",
    dumbbellRow: "https://www.bilibili.com/video/BV1Ci421Q7Gm/",
    cableLateral: "https://www.bilibili.com/video/BV1Qj411h7tS/",
    dumbbellTriceps: "https://www.bilibili.com/video/BV1sM411j76i/",
    cableHammer: "https://www.bilibili.com/video/BV1Zr4y1476U/",
    proneCurl: "https://www.bilibili.com/video/BV1Lr4y1w73U/",
    dumbbellShoulder: "https://www.bilibili.com/video/BV1uw411N7MC/",
    reverseFly: "https://www.bilibili.com/video/BV1Uq1xYkEBo/"
  },
  alternatives: {
    chest: {name:"标准俯卧撑", reps:"10–15次", video:"pushup", cue:"头、躯干、腿保持一条线，不塌腰；下降与推起都控制。", note:"做不到规定次数且保留余力，就改双手撑在稳固高台上的俯卧撑；不用会滑动的凳子。抬高手位是降难度，不是脚垫高。"},
    row: {name:"支撑式单臂哑铃划船", reps:"每侧10–12次", video:"dumbbellRow", cue:"一手撑稳固训练凳，背部稳定，肘拉向髋部，不扭腰甩动。", note:"左右各完成一次才算1组；换边休息10–20秒，双侧完成后按下方时间休息。没有空闲训练凳或不会支撑时，先等原器械。"},
    lat: {name:"器械辅助引体向上", reps:"6–10次", video:"pullup", cue:"助力调到能标准完成且有余力，不踢腿、不耸肩硬拉。", note:"辅助机也忙时换顺序，不用你目前最多3次的徒手引体硬顶训练量；首次请教练确认踏板与助力设置。"},
    lateral: {name:"单臂绳索侧平举", reps:"每侧12–15次", video:"cableLateral", cue:"从很轻阻力开始，身体稳定，肘微屈，不耸肩甩动。", note:"左右各做一次算1组；滑轮最低档仍过重，或不会设置时，等轻哑铃，不勉强替换。"},
    triceps: {name:"轻哑铃颈后臂屈伸", reps:"10–15次", video:"dumbbellTriceps", cue:"轻重量双手握稳，腹部收紧，不反弓腰；肘屈伸，不靠肩甩动。", note:"第一次先请教练确认握法和起落。肩或肘不适、不会安全起落时不要用此替代，等绳索下压。"},
    hammer: {name:"绳索锤式弯举", reps:"10–12次", video:"cableHammer", cue:"低位滑轮配绳索，掌心相对，上臂稳定，腕保持中立。", note:"只在有空闲滑轮和绳索手柄时使用；不借身体后仰拉起。两边都忙时先做其他项。"},
    goblet: {name:"史密斯深蹲", reps:"8–12次", video:"smith", cue:"先检查保护杆与空杆重量，从轻重量试做，不会设置就不要换。", note:"仅在已经学会该动作、确认器械适合时使用；否则用另一只轻哑铃做高脚杯蹲，或等器械。"},
    rdl: {name:"换一对合适的轻哑铃，保留原动作", video:"rdl", keep:true, cue:"换重量后重新试做，臀向后，哑铃贴腿，不追触地。", note:"找不到合适哑铃就先做其他合适的项目，稍后回来。不临时改大重量杠铃硬拉；徒手髋折叠只算技术练习，不等同正式负重组。"},
    curl: {name:"器械俯卧腿弯举", reps:"10–15次", video:"proneCurl", cue:"膝对准机器转轴，垫子靠近脚踝上方，髋贴垫，控制回程。", note:"需要健身房有空闲的俯卧腿弯举机；没有就换顺序后回来。不用哑铃夹脚做临时替代。"},
    calf: {name:"徒手扶墙站姿提踵", reps:"12–15次", video:"calf", cue:"双脚平地、手扶固定支撑，控制上下，顶端短暂停顿。", note:"没有空闲哑铃或支撑位时可用；更轻但不算额外组。不站在松动杠铃片、台阶边缘上。"},
    deadbug: {name:"换空闲垫子或安全区域，做原动作", video:"deadbug", keep:true, cue:"避开器械通道，腰背稳定，缓慢伸展，不为赶时间加速。", note:"死虫式只需安全躺卧空间；没有空间先做其他项，稍后回来，不在通道或别人的训练区铺垫。"},
    pullup: {name:"高位下拉", reps:"8–12次", video:"lat", time:"01:38", cue:"大腿固定垫调稳，肘向下，拉向上胸，不拉到颈后。", note:"这个替代按2组开始；不照搬辅助引体机器的重量数字。两台都忙时先换顺序。"},
    incline: {name:"坐姿器械推胸", reps:"8–12次", video:"chest", cue:"调好座椅，手柄接近胸部高度，肩不耸，背贴垫。", note:"训练凳被占、或不会安全起落哑铃时都可以用。推胸机也忙可改俯卧撑2组×10–15次。", extraVideo:"pushup", extraLabel:"看俯卧撑视频"},
    shoulder: {name:"坐姿哑铃推肩", reps:"8–12次", video:"dumbbellShoulder", cue:"有靠背训练凳，轻重量，背稳定，不反弓腰顶起。", note:"首次请教练核对起落，肩不适就停止；没有空闲训练凳或不会起落时，等器械推肩，不换成倒立或折刀俯卧撑。"},
    facepull: {name:"蝴蝶机反向飞鸟", reps:"12–15次", video:"reverseFly", cue:"胸贴垫，座椅调好，轻重量控制打开，不耸肩、不甩动。", note:"这是本次肩后束训练的替代，不完全等同面拉中的肩外旋。机器不支持反向飞鸟、或不会调节时就等面拉。"},
    smith: {name:"高脚杯深蹲", reps:"8–12次", video:"goblet", cue:"轻哑铃持在胸前，脚掌踩稳，膝随脚尖，不勉强蹲深。", note:"史密斯被占、空杆太重或不会设保护杆时用；若连轻哑铃也取不到，先徒手练技术，再等合适器械。"},
    plank: {name:"死虫式", reps:"每侧6–8次", video:"deadbug", cue:"腰背稳定，慢慢伸对侧手脚；幅度以能控制为准。", note:"垫子不足时可换空闲安全区域。动作本身更换为另一种核心稳定练习，不按平板秒数去做死虫式。"}
  },
  days: {
    wed: {label:"周三", title:"上肢 A", kind:"upper", rows:[
      ["chest","坐姿器械推胸","8–12次","90–120秒","首次调好座椅，肩不耸。"],
      ["row","坐姿绳索划船","10–12次","90–120秒","躯干稳定，不靠腰甩。","02:18"],
      ["lat","高位下拉","10–12次","90–120秒","肘向下拉，不拉到颈后。","01:38"],
      ["lateral","哑铃侧平举","12–15次","60–90秒","先轻重量，不甩动。"],
      ["triceps","绳索三头下压","10–15次","60–90秒","上臂稳定，不用身体压。"],
      ["hammer","哑铃锤式弯举","10–12次","60–90秒","掌心相对，肘贴身。","04:18"]
    ]},
    thu: {label:"周四", title:"下肢 A", kind:"lower", rows:[
      ["goblet","高脚杯深蹲","8–12次","90–120秒","脚掌踩稳，膝随脚尖。"],
      ["rdl","哑铃罗马尼亚硬拉","8–12次","90–120秒","臀向后，哑铃贴腿；不追触地。"],
      ["curl","坐姿腿弯举","10–15次","60–90秒","髋贴垫，控制回程。"],
      ["calf","扶稳站姿提踵","12–15次","60–90秒","先平地自重，双脚扶稳。"],
      ["deadbug","死虫式","每侧6–8次","45–60秒","腰背保持稳定，缓慢伸展。"]
    ]},
    sat: {label:"周六", title:"上肢 B", kind:"upper", rows:[
      ["pullup","器械辅助引体向上","6–10次","90–120秒","加足助力，不踢腿借力。"],
      ["incline","上斜哑铃卧推","8–12次","90–120秒","不会起落先换坐姿推胸。"],
      ["row","坐姿绳索划船","10–12次","90–120秒","躯干稳定，不靠腰甩。","02:18"],
      ["shoulder","坐姿器械推肩","8–12次","90–120秒","背贴垫，不反弓腰。"],
      ["facepull","绳索面拉","12–15次","60–90秒","先轻重量，肩不耸。"],
      ["hammer","哑铃锤式弯举","10–12次","60–90秒","掌心相对，肘贴身。","04:18"]
    ]},
    sun: {label:"周日", title:"下肢 B", kind:"lower", rows:[
      ["smith","史密斯深蹲","8–12次","90–120秒","先核对保护杆，不会则换高脚杯。"],
      ["rdl","哑铃罗马尼亚硬拉","8–12次","90–120秒","臀向后，哑铃贴腿；不追触地。"],
      ["curl","坐姿腿弯举","10–15次","60–90秒","髋贴垫，控制回程。"],
      ["calf","扶稳站姿提踵","12–15次","60–90秒","先平地自重，双脚扶稳。"],
      ["plank","平板支撑","20–30秒","45–60秒","开始塌腰就结束，可先跪姿。"]
    ]}
  }
};
