"use strict";
const keys = ["wed", "thu", "sat", "sun"];
const $ = (selector) => document.querySelector(selector);
const params = new URLSearchParams(location.search);
const weekday = new Intl.DateTimeFormat("en-US", {timeZone:"Asia/Shanghai", weekday:"short"}).format(new Date()).toLowerCase();
const defaults = {mon:"wed",tue:"wed",wed:"wed",thu:"thu",fri:"sat",sat:"sat",sun:"sun"};
let selectedDay = keys.includes(params.get("day")) ? params.get("day") : defaults[weekday] || "wed";
let week = 1;
try {const saved = Number(localStorage.getItem("kb-gym-week")); if([1,2,3,4].includes(saved)) week=saved;} catch {}
let view = ["training","week","guide"].includes(params.get("view")) ? params.get("view") : "training";
let cached = false;
let installPrompt = null;

function text(tag, value, className) {const el=document.createElement(tag); el.textContent=value; if(className)el.className=className; return el;}
function videoLink(key, label, actionName) {const a=text("a",label,"video-link");a.href=GYM_PLAN.videos[key];a.target="_blank";a.rel="noopener noreferrer";a.setAttribute("aria-label",`查看${actionName}动作视频`);return a;}
function updateURL() {const query=new URLSearchParams({day:selectedDay,view}); history.replaceState(null,"",`${location.pathname}?${query}`);}
function showView(next, scroll=true) {
  view=next;
  ["training","week","guide"].forEach(key=>{$(`#${key}-view`).hidden=key!==view;});
  document.querySelectorAll("[data-view]").forEach(button=>{if(button.dataset.view===view)button.setAttribute("aria-current","page");else button.removeAttribute("aria-current");});
  updateURL();
  if(scroll) window.scrollTo(0,0);
}
function listBody(selector, lines, linkKey, label) {const body=$(selector);body.replaceChildren();const ol=document.createElement("ol");lines.forEach(line=>ol.append(text("li",line)));body.append(ol);if(linkKey)body.append(videoLink(linkKey,label,label));}

function renderDay(key) {
  selectedDay=key;
  const day=GYM_PLAN.days[key], upper=day.kind==="upper";
  document.querySelectorAll("[data-day]").forEach(button=>{const active=button.dataset.day===key;button.setAttribute("aria-selected",String(active));button.tabIndex=active?0:-1;});
  $("#training-content").setAttribute("aria-labelledby",`tab-${key}`);
  $("#training-heading").textContent=`${day.label} · ${day.title}`;
  $("#day-context").textContent=keys.includes(weekday)?(key===weekday?"今天的馆内训练":"查看另一训练日"):"今天是操场 / 恢复日，预览下次馆内训练";
  $("#session-time").textContent=`16:00–18:00 · 通常${upper?"17:35":"17:25"}练完`;
  $("#session-note").textContent=week<=2?"每个动作2组，保留3–4次余力。第一次练腿吃力时，蹲和硬拉可各减为1组。":"恢复良好才把第1个动作加至3组，其他仍2组；保留2–3次余力。未满足条件请选第2周。";
  $("#strength-time").textContent=`16:12–${upper?"17:10":"17:05"}`;
  $("#training-week").value=String(week);
  listBody("#warmup-body", upper?[
    "快走或单车5分钟。",
    "肩绕环每方向10次，轻弹力带外旋每侧10次。",
    key==="sat"?"辅助引体先加大助力做2组轻热身。":"首动作做2组轻重量热身，不做累。",
    "后续复合动作开始前，另补1组轻重量热身。"
  ]:[
    "轻松单车5分钟。",
    "踝前移每侧10次，徒手蹲8次，徒手髋折叠8次。",
    "首动作做2组轻重量热身；硬拉开始前另补1组轻热身。"
  ], "warmup", "热身视频");
  const cards=day.rows.map((row,index)=>{
    const [video,name,reps,rest,cue,time]=row;
    const card=document.createElement("article");card.className="exercise-card";
    const top=document.createElement("div");top.className="exercise-top";top.append(text("span",String(index+1).padStart(2,"0"),"exercise-index"),text("h3",name));
    const volume=document.createElement("div");volume.className="exercise-volume";volume.append(text("strong",`${week>=3&&index===0?3:2}组 × ${reps}`));
    const actions=document.createElement("div");actions.className="exercise-actions";actions.append(text("p",cue,"exercise-cue"),videoLink(video,time?`看视频 ${time}`:"看动作视频",name));
    card.append(top,volume,text("p",`组间休息 ${rest}`,"exercise-rest"),actions);return card;
  });
  $("#exercise-list").replaceChildren(...cards);
  $("#cardio-time").textContent=upper?"17:10–17:26":"17:05–17:17";
  listBody("#cardio-body",upper?[
    "17:10–17:22：单车或椭圆机12分钟，保持轻松、能交谈。",
    "17:22–17:26：慢走4分钟，逐渐降速。"
  ]:[
    "17:05–17:13：低阻力单车8分钟；疲劳明显时可跳过。",
    "17:13–17:17：慢走4分钟。跳过单车时，慢走与拉伸顺延提前。"
  ]);
  $("#stretch-time").textContent=upper?"17:26–17:34":"17:17–17:25";
  listBody("#stretch-body",[
    upper?"胸、背阔肌、肩后侧、三头和前臂。":"大腿前侧、后侧、臀、小腿和髋前侧。",
    "每项每侧20–30秒，做1–2轮。轻微牵拉即可，不弹震，不拉到疼痛。"
  ],"stretch","拉伸动作视频");
  updateURL();
}

function renderWeek() {
  const schedule=[
    ["周一","20:00–20:35 · 恢复快走","周日腿酸影响走路时，缩短活动或休息。"],
    ["周二","20:00–20:35 · 操场跑走","慢跑1分钟 + 走90秒，重复6轮。"],
    ["周三","16:00–18:00 · 上肢 A","力量后轻松有氧12分钟，再降速、拉伸。","wed"],
    ["周四","16:00–18:00 · 下肢 A","力量后低阻力单车8分钟，疲劳可跳过。","thu"],
    ["周五","20:00–20:35 · 操场跑走","周四腿酸明显时，改为15–20分钟快走。"],
    ["周六","16:00–18:00 · 上肢 B","力量后轻松有氧12分钟，再降速、拉伸。","sat"],
    ["周日","16:00–18:00 · 下肢 B","力量后低阻力单车8分钟，疲劳可跳过。","sun"]
  ];
  $("#week-list").replaceChildren(...schedule.map(([label,time,note,key])=>{
    const row=document.createElement("article");row.className=`week-row ${key?"gym":""}`;
    const detail=document.createElement("div");detail.append(text("b",`${label} · ${time}`),text("p",note));row.append(detail);
    if(key){const b=text("button","查看");b.setAttribute("aria-label",`查看${label}馆内训练`);b.addEventListener("click",()=>{renderDay(key);showView("training");});row.append(b);}return row;
  }));
}
function updateNetwork() {
  const status=$("#connection-status");
  status.textContent=navigator.onLine?(cached?"训练表已缓存":"在线查看"):(cached?"离线训练表":"已断网");
  status.classList.toggle("offline",!navigator.onLine);
  $("#offline-help").textContent=cached?"这份训练表已缓存；断网仍可查看。B站视频需要联网。浏览器清理缓存后，请重新在线打开。":"首次在线打开后，支持缓存的浏览器会保存这份训练表。视频仍需要网络；没有缓存成功时，请保持联网查看。";
}
document.querySelectorAll("[data-day]").forEach(button=>button.addEventListener("click",()=>renderDay(button.dataset.day)));
$(".day-switch").addEventListener("keydown",event=>{
  if(!["ArrowLeft","ArrowRight","Home","End"].includes(event.key))return;
  event.preventDefault();const i=keys.indexOf(selectedDay);
  const next=event.key==="Home"?0:event.key==="End"?3:(i+(event.key==="ArrowRight"?1:3))%4;
  renderDay(keys[next]);$(`#tab-${keys[next]}`).focus();
});
$("#training-week").addEventListener("change",event=>{week=Number(event.target.value);try{localStorage.setItem("kb-gym-week",String(week));}catch{}renderDay(selectedDay);});
document.querySelectorAll("[data-view]").forEach(button=>button.addEventListener("click",()=>showView(button.dataset.view)));
window.addEventListener("online",updateNetwork);window.addEventListener("offline",updateNetwork);
window.addEventListener("beforeinstallprompt",event=>{event.preventDefault();installPrompt=event;$("#install-button").hidden=false;});
$("#install-button").addEventListener("click",async()=>{if(!installPrompt)return;await installPrompt.prompt();await installPrompt.userChoice;installPrompt=null;$("#install-button").hidden=true;});
window.addEventListener("appinstalled",()=>{$("#install-button").hidden=true;installPrompt=null;});
renderDay(selectedDay);renderWeek();showView(view,false);updateNetwork();
if("serviceWorker" in navigator && ["https:","http:"].includes(location.protocol)){
  navigator.serviceWorker.register("./sw.js",{scope:"./"}).then(()=>navigator.serviceWorker.ready).then(async()=>{
    if("caches" in window){const hit=await caches.match(new URL("./index.html",location.href).href);cached=Boolean(hit);updateNetwork();}
  }).catch(()=>{cached=false;updateNetwork();});
}
