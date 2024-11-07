// game.js

// 获取游戏进度（从localStorage读取）
let game1 = localStorage.getItem("game1") || 0;
let game2 = localStorage.getItem("game2") || 0;
let game3 = localStorage.getItem("game3") || 0;
let game4 = localStorage.getItem("game4") || 0;
let game5 = localStorage.getItem("game5") || 0;
let game6 = localStorage.getItem("game6") || 0;

// 完成关卡的函数
function complete(i) 
{
  localStorage.setItem(`game${i}`, 1);  // 化0为1并保存到localStorage
}
