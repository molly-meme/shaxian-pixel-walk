// astar.js
function isWalkable(gx, gy) {
  if (gx < 0 || gy < 0 || gx >= GRID_W || gy >= GRID_H) return false;
  
  // 检查是否在建筑内部（入口除外）
  for (const z of ZONES) {
    const b = z.bounds;
    if (gx >= b.gx && gx < b.gx + b.gw && gy >= b.gy && gy < b.gy + b.gh) {
      if (gx === z.entrance.gx && gy === z.entrance.gy) return true;
      return false;
    }
  }
  return true;
}

function heuristic(a, b) {
  return abs(a.gx - b.gx) + abs(a.gy - b.gy);
}

function astar(start, goal) {
  const key = (p) => `${p.gx},${p.gy}`;
  const open = [{ ...start, g: 0, f: heuristic(start, goal), parent: null }];
  const closed = new Map();

  while (open.length > 0) {
    open.sort((a, b) => a.f - b.f);
    const current = open.shift();

    if (current.gx === goal.gx && current.gy === goal.gy) {
      const path = [];
      let node = current;
      while (node) { path.unshift({ gx: node.gx, gy: node.gy }); node = node.parent; }
      return path;
    }

    closed.set(key(current), current);

    const dirs = [[0,1],[0,-1],[1,0],[-1,0]];
    for (const [dx, dy] of dirs) {
      const nx = current.gx + dx, ny = current.gy + dy;
      if (!isWalkable(nx, ny)) continue;
      const nk = `${nx},${ny}`;
      if (closed.has(nk)) continue;

      const g = current.g + 1;
      const existing = open.find(n => n.gx === nx && n.gy === ny);
      if (existing) {
        if (g < existing.g) { existing.g = g; existing.f = g + heuristic({gx:nx,gy:ny}, goal); existing.parent = current; }
      } else {
        open.push({ gx: nx, gy: ny, g, f: g + heuristic({gx:nx,gy:ny}, goal), parent: current });
      }
    }
  }
  return [];
}