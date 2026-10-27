// overview.js
let hoverZone = null;

function updateHover() {
  const gx = mouseX / PX;
  const gy = mouseY / PX;
  hoverZone = ZONES.find(z =>
    gx >= z.bounds.gx && gx < z.bounds.gx + z.bounds.gw &&
    gy >= z.bounds.gy && gy < z.bounds.gy + z.bounds.gh
  ) || null;
}

function drawOverview() {
  background("#2C3E50"); 
  drawRoads();
  for (const z of ZONES) {
    drawIsoBuilding(z);
  }
  drawPlayerMarker(shared.playerPos);
  drawHoverHighlight();
}

function drawRoads() {
  push();
  stroke("#5A6B7C"); strokeWeight(6); noFill();
  for (const r of ROADS) {
    beginShape();
    for (const p of r.path) {
      vertex(gx2x(p.gx), gy2y(p.gy));
    }
    endShape();
  }
  pop();
}

function drawIsoBuilding(z) {
  const x = gx2x(z.bounds.gx);
  const y = gy2y(z.bounds.gy);
  const w = z.bounds.gw * PX;
  const h = z.bounds.gh * PX;
  const depth = 6;

  const c = color(z.color);
  const cTop = lerpColor(c, color(255, 255, 255, 50), 0.3);
  const cRight = lerpColor(c, color(0, 0, 0, 80), 0.5);

  // 顶面
  fill(cTop); noStroke();
  beginShape();
  vertex(x, y); vertex(x + depth, y - depth);
  vertex(x + w + depth, y - depth); vertex(x + w, y);
  endShape(CLOSE);

  // 右侧面
  fill(cRight); noStroke();
  beginShape();
  vertex(x + w, y); vertex(x + w + depth, y - depth);
  vertex(x + w + depth, y + h - depth); vertex(x + w, y + h);
  endShape(CLOSE);

  // 正面
  fill(z.color); noStroke();
  rect(x, y, w, h);

  // 线框
  stroke("#E8E8F0"); strokeWeight(1.5); noFill();
  rect(x, y, w, h);
  beginShape();
  vertex(x, y); vertex(x + depth, y - depth);
  vertex(x + w + depth, y - depth); vertex(x + w, y);
  endShape(CLOSE);
  
  // 已访问高亮
  if (shared.visitedZones.includes(z.id)) {
    stroke("#FFB84D"); strokeWeight(2);
    rect(x, y, w, h);
  }

  // 窗户
  if (z.name.includes("楼") || z.name.includes("苑")) {
    fill("#FFB84D"); noStroke();
    for (let i = 1; i < z.bounds.gw - 1; i += 2) {
      rect(x + i * PX, y + 4, PX * 0.6, PX * 0.8);
    }
  }

  // 田径场特殊处理
  if (z.id === "track") {
    fill("#C0392B"); noStroke();
    ellipse(x + w/2, y + h/2, w - 20, h - 20);
    fill("#27AE60");
    ellipse(x + w/2, y + h/2, w - 50, h - 50);
  }

  // 入口红点
  fill("#FF4D4D"); noStroke();
  ellipse(gx2x(z.entrance.gx), gy2y(z.entrance.gy), 6, 6);

  // 文字
  fill("#FFFFFF"); textAlign(CENTER, CENTER); textSize(12);
  text(z.name, x + w/2, y + h/2);
}

function drawHoverHighlight() {
  if (!hoverZone) return;
  const z = hoverZone;
  const x = gx2x(z.bounds.gx), y = gy2y(z.bounds.gy);
  const w = z.bounds.gw * PX, h = z.bounds.gh * PX;

  noFill(); stroke("#FFB84D"); strokeWeight(2);
  drawingContext.setLineDash([5, 5]);
  rect(x - 4, y - 4, w + 8, h + 8);
  drawingContext.setLineDash([]);

  fill(0, 0, 0, 180); noStroke();
  rect(x + w/2 - 40, y - 30, 80, 20, 4);
  fill("#FFB84D"); textSize(12); textAlign(CENTER, CENTER);
  text("点击前往", x + w/2, y - 20);
}

function drawPlayerMarker(pos) {
  const x = gx2x(pos.gx), y = gy2y(pos.gy);
  const pulse = 1 + sin(frameCount * 0.1) * 0.3;
  fill(47, 107, 255, 80); noStroke();
  ellipse(x, y, 24 * pulse, 24 * pulse);
  fill("#2F6BFF"); stroke("#FFFFFF"); strokeWeight(2);
  ellipse(x, y, 12, 12);
}