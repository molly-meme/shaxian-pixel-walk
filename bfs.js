// bfs.js
function bfsNearest(start, targets) {
  // 简单的 BFS 实现，待失物支线阶段完善
  const queue = [{ ...start, path: [{ ...start }] }];
  const visited = new Set([`${start.gx},${start.gy}`]);
  while (queue.length > 0) {
    const cur = queue.shift();
    for (const t of targets) {
      if (cur.gx === t.gx && cur.gy === t.gy) return { target: t, path: cur.path };
    }
    for (const [dx, dy] of [[0,1],[0,-1],[1,0],[-1,0]]) {
      const nx = cur.gx + dx, ny = cur.gy + dy;
      const k = `${nx},${ny}`;
      if (!visited.has(k) && isWalkable(nx, ny)) {
        visited.add(k);
        queue.push({ gx: nx, gy: ny, path: [...cur.path, { gx: nx, gy: ny }] });
      }
    }
  }
  return null;
}