
let canvas;
let travelPath = [];
let travelProgress = 0;

function setup() {
  canvas = createCanvas(1280, 720);
  canvas.parent("canvas-wrap");
  noSmooth();
  textFont("PingFang SC");
  
  // 初始化玩家位置
  shared.playerPos = { ...START_POS };
}

function draw() {
  if (travelPath.length > 0) {
    // 正在寻路移动
    drawOverview();
    drawTravelPath();
    updateTravel();
  } else {
    // 静止状态
    updateHover();
    drawOverview();
  }
}

// 绘制寻路虚线
function drawTravelPath() {
  if (travelPath.length > 1) {
    push();
    stroke("#FFB84D");
    strokeWeight(3);
    drawingContext.setLineDash([4, 4]);
    beginShape();
    for (const p of travelPath) {
      vertex(gx2x(p.gx), gy2y(p.gy));
    }
    endShape();
    pop();
    drawingContext.setLineDash([]);
  }
}

// 更新移动逻辑
function updateTravel() {
  const idx = floor(travelProgress);
  if (idx < travelPath.length - 1) {
    const a = travelPath[idx];
    const b = travelPath[idx + 1];
    const t = travelProgress - idx;
    shared.playerPos = {
      gx: lerp(a.gx, b.gx, t),
      gy: lerp(a.gy, b.gy, t)
    };
    travelProgress += 0.15; // 移动速度
  } else {
    // 到达终点
    shared.playerPos = { ...travelPath[travelPath.length - 1] };
    travelPath = []; 
    
    // 标记为已访问
    if (hoverZone && !shared.visitedZones.includes(hoverZone.id)) {
      shared.visitedZones.push(hoverZone.id);
    }
    hoverZone = null;
  }
}

function mousePressed() {
  // 只有在没有移动且点到了建筑时才触发
  if (travelPath.length === 0 && hoverZone) {
    console.log("准备前往:", hoverZone.name);
    
    // 计算从当前玩家位置到目标建筑入口的路径
    const path = astar(shared.playerPos, hoverZone.entrance);
    if (path.length > 0) {
      travelPath = path;
      travelProgress = 0;
    } else {
      console.log("找不到路径！");
    }
  }
}