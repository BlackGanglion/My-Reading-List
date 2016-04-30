'use strict'

const URL = "http://bestcoder.hdu.edu.cn/contests/contest_showproblem.php?cid=694&pid=1001";
const RE = /(\?|\&)([^=]+)\=([^&]+)/g; // (?/&)(cid)=(694)
let paramsObject = {};

URL.replace(RE, (match, p1, p2, p3) => {
  console.log(match, p1, p2, p3);
  paramsObject[p2] = p3;
});

console.log(paramsObject);
