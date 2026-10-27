// pixel.js
const PX = 16;
const GRID_W = 80;
const GRID_H = 45;

function gx2x(gx) { return gx * PX; }
function gy2y(gy) { return gy * PX; }

function pxRect(gx, gy, gw, gh, fillColor, strokeColor) {
  if (fillColor) { fill(fillColor); noStroke(); rect(gx2x(gx), gy2y(gy), gw * PX, gh * PX); }
  if (strokeColor) { noFill(); stroke(strokeColor); strokeWeight(1); rect(gx2x(gx), gy2y(gy), gw * PX, gh * PX); }
}

function pxText(gx, gy, str, size = 12, color = "#FFF") {
  fill(color); noStroke(); textSize(size); textAlign(CENTER, CENTER);
  text(str, gx2x(gx), gy2y(gy));
}