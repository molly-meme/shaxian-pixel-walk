// data.js
const ZONES = [
  // 左侧
  { id:"basketball", name:"水平篮球馆", bounds:{gx:4,  gy:2,  gw:8,  gh:4}, entrance:{gx:8, gy:6},  color:"#4A4A6A" },
  { id:"track",      name:"田径场",     bounds:{gx:4,  gy:8,  gw:18, gh:26},entrance:{gx:22,gy:20}, color:"#C0392B" },
  // 中左
  { id:"liuyi",      name:"六艺馆",     bounds:{gx:24, gy:20, gw:9,  gh:14},entrance:{gx:24,gy:26}, color:"#5A4A6A" },
  // 中上
  { id:"houji",      name:"厚积楼",     bounds:{gx:36, gy:10, gw:14, gh:5}, entrance:{gx:43,gy:15}, color:"#4A6A4A" },
  { id:"shaoen",     name:"绍恩楼",     bounds:{gx:52, gy:10, gw:12, gh:5}, entrance:{gx:58,gy:15}, color:"#4A6A4A" },
  // 中下
  { id:"jiusi",      name:"九思楼",     bounds:{gx:37, gy:27, gw:11, gh:9}, entrance:{gx:42,gy:27}, color:"#4A6A4A" },
  { id:"sanli",      name:"三立堂",     bounds:{gx:52, gy:27, gw:5,  gh:9}, entrance:{gx:54,gy:27}, color:"#6A5A4A" },
  { id:"gezhi",      name:"格致楼",     bounds:{gx:59, gy:27, gw:10, gh:10},entrance:{gx:64,gy:27}, color:"#4A6A4A" },
  // 右上
  { id:"yuxiu",      name:"毓秀楼",     bounds:{gx:56, gy:2,  gw:10, gh:5}, entrance:{gx:61,gy:7},  color:"#6B5B4A" },
  { id:"ruyuan",     name:"如苑",       bounds:{gx:68, gy:2,  gw:8,  gh:5}, entrance:{gx:72,gy:7},  color:"#6B5B4A" },
  // 右侧
  { id:"guiyuan",    name:"桂苑",       bounds:{gx:70, gy:12, gw:8,  gh:5}, entrance:{gx:70,gy:14}, color:"#6B5B4A" },
  { id:"meiyuan",    name:"梅苑",       bounds:{gx:70, gy:19, gw:8,  gh:5}, entrance:{gx:70,gy:21}, color:"#6B5B4A" },
  { id:"zhuyuan",    name:"竹苑",       bounds:{gx:70, gy:26, gw:8,  gh:5}, entrance:{gx:70,gy:28}, color:"#6B5B4A" },
  // 右下
  { id:"siyuan",     name:"思源厅",     bounds:{gx:70, gy:34, gw:8,  gh:6}, entrance:{gx:70,gy:37}, color:"#6A5A4A" }
];

const START_POS = { gx: 68, gy: 28 };

const ROADS = [
  { path: [{gx:22,gy:6}, {gx:22,gy:34}] }, 
  { path: [{gx:22,gy:26}, {gx:24,gy:26}] },
  { path: [{gx:33,gy:26}, {gx:36,gy:26}] },
  { path: [{gx:35,gy:18}, {gx:66,gy:18}] },
  { path: [{gx:67,gy:6}, {gx:67,gy:37}] },
  { path: [{gx:67,gy:14}, {gx:70,gy:14}] },
  { path: [{gx:67,gy:21}, {gx:70,gy:21}] },
  { path: [{gx:67,gy:28}, {gx:70,gy:28}] },
  { path: [{gx:67,gy:37}, {gx:70,gy:37}] },
  { path: [{gx:66,gy:18}, {gx:67,gy:18}] }
];