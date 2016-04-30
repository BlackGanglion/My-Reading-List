/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function(word1, word2) {
  var m = word1.length;
  var n = word2.length;

  var dis = [];
  for(var i = 0; i <= m; i++) {
    for(var j = 0; j <= n; j++) {
      if(j === 0) {
        dis.push([i]);
      } else {
        if(i === 0) {
          dis[i].push(j);
        } else {
          if(word1[i - 1] === word2[j - 1]) {
            dis[i].push(dis[i - 1][j - 1]);
          } else {
            dis[i].push(Math.min(dis[i - 1][j - 1] + 1, Math.min(dis[i - 1][j] + 1), Math.min(dis[i][j - 1] + 1)));
          }
        }
      }
    }
  }
  return dis[m][n];
};

console.log(minDistance('ab', 'abc'));
