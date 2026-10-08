"use strict";
// Exercise prescriptions and video links match the approved 2026-10-08 PDF.
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
    stretch: "https://www.bilibili.com/video/BV1qM4m117VH/"
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
