require = function s(c, o, a) {
function h(e, t) {
if (!o[e]) {
if (!c[e]) {
var r = "function" == typeof require && require;
if (!t && r) return r(e, !0);
if (l) return l(e, !0);
var i = new Error("Cannot find module '" + e + "'");
throw i.code = "MODULE_NOT_FOUND", i;
}
var n = o[e] = {
exports: {}
};
c[e][0].call(n.exports, function(t) {
return h(c[e][1][t] || t);
}, n, n.exports, s, c, o, a);
}
return o[e].exports;
}
for (var l = "function" == typeof require && require, t = 0; t < a.length; t++) h(a[t]);
return h;
}({
BackButton: [ function(t, e, r) {
"use strict";
cc._RF.push(e, "02f299pnbhO45jOb0kdKMQY", "BackButton");
cc.Class({
extends: cc.Component,
properties: {},
start: function() {},
onClick: function(t) {
cc.director.loadScene("StartScreen");
}
});
cc._RF.pop();
}, {} ],
Controls: [ function(t, e, r) {
"use strict";
cc._RF.push(e, "6e756P+3ytOeaDYqAOVGryV", "Controls");
cc.Class({
extends: cc.Component,
properties: {},
start: function() {},
onClick: function(t) {
cc.director.loadScene("Controls");
}
});
cc._RF.pop();
}, {} ],
GameBoard: [ function(t, e, r) {
"use strict";
cc._RF.push(e, "6e6b8beVXVL8bb6adN2iEyo", "GameBoard");
var i = 342, n = 171;
cc.Class({
extends: cc.Component,
properties: {
preview: {
default: null,
type: cc.Node
},
iBlock: {
default: null,
type: cc.Prefab
},
jBlock: {
default: null,
type: cc.Prefab
},
lBlock: {
default: null,
type: cc.Prefab
},
oBlock: {
default: null,
type: cc.Prefab
},
sBlock: {
default: null,
type: cc.Prefab
},
tBlock: {
default: null,
type: cc.Prefab
},
zBlock: {
default: null,
type: cc.Prefab
},
singleI: {
default: null,
type: cc.Prefab
},
singleJ: {
default: null,
type: cc.Prefab
},
singleL: {
default: null,
type: cc.Prefab
},
singleO: {
default: null,
type: cc.Prefab
},
singleS: {
default: null,
type: cc.Prefab
},
singleT: {
default: null,
type: cc.Prefab
},
singleZ: {
default: null,
type: cc.Prefab
},
numLevel: {
default: null,
type: cc.Label
},
numScore: {
default: null,
type: cc.Label
},
numLines: {
default: null,
type: cc.Label
}
},
onLoad: function() {
this.level = 0;
this.score = 0;
this.lines = 0;
this.comboCount = 0;
this.displayStats();
this.blockArray = [ this.iBlock, this.jBlock, this.lBlock, this.oBlock, this.sBlock, this.tBlock, this.zBlock ];
this.typeBlock = [ "i", "j", "l", "o", "s", "t", "z" ];
this.startingX = [ 0, -171, -171, 0, -171, -171, -171 ];
this.startingY = [ 3078, 3249, 3249, 3420, 3249, 3249, 3249 ];
this.rand = Math.floor(7 * Math.random());
this.nextBlock = cc.instantiate(this.blockArray[this.rand]);
this.spawnNewBlock();
this.rLeft = !1;
this.rRight = !1;
this.mDown = !1;
this.timer = 0;
this.directionTimer = 0;
this.moveTimer = 0;
this.dropCount = 0;
this.boardMat = Array.apply(null, Array(20)).map(function() {
return Array.apply(null, Array(10)).map(function() {
return null;
});
});
cc.director.preloadScene("GameOver");
cc.director.preloadScene("WinScreen");
},
setInputControls: function() {
var r = this;
cc.eventManager.addListener({
event: cc.EventListener.KEYBOARD,
onKeyPressed: function(t, e) {
switch (t) {
case cc.KEY.a:
r.rotateLeft();
r.rLeft = !0;
r.directionTimer = 0;
break;

case cc.KEY.s:
r.rotateRight();
r.rRight = !0;
r.directionTimer = 0;
break;

case cc.KEY.left:
if (r.leftCheck()) {
r.moveLeft();
r.mLeft = !0;
r.moveTimer = 0;
}
break;

case cc.KEY.right:
if (r.rightCheck()) {
r.moveRight();
r.mRight = !0;
r.moveTimer = 0;
}
break;

case cc.KEY.down:
r.mDown = !0;
}
},
onKeyReleased: function(t, e) {
switch (t) {
case cc.KEY.a:
r.rLeft = !1;
break;

case cc.KEY.s:
r.rRight = !1;
break;

case cc.KEY.left:
r.mLeft = !1;
break;

case cc.KEY.right:
r.mRight = !1;
break;

case cc.KEY.down:
r.mDown = !1;
}
}
}, r.currentBlock);
},
rotateLeft: function() {
for (var t = this.wallCheck(-90); !t[0]; ) {
"left" == t[1] ? this.currentX += i : "right" == t[1] ? this.currentX -= i : "up" == t[1] && (this.currentY += i);
t = this.wallCheck(-90);
}
this.updatePosition();
this.currentBlock.rotation -= 90;
},
rotateRight: function() {
for (var t = this.wallCheck(90); !t[0]; ) {
"left" == t[1] ? this.currentX += i : "right" == t[1] ? this.currentX -= i : "up" == t[1] && (this.currentY += i);
t = this.wallCheck(90);
}
this.updatePosition();
this.currentBlock.rotation += 90;
},
moveLeft: function() {
this.currentX -= i;
this.updatePosition();
},
moveRight: function() {
this.currentX += i;
this.updatePosition();
},
orientation: function(t) {
switch ((this.currentBlock.rotation + t) % 360) {
case 90:
case -270:
return "right";

case 180:
case -180:
return "down";

case 270:
case -90:
return "left";

case 0:
return "up";
}
},
location: function(t) {
var e, r;
switch (this.currentType) {
case "i":
switch (t) {
case "up":
return [ (e = 9 - this.currentY / i) + "," + ((r = this.currentX / i + 4) - 1), e + "," + r, e + "," + (r + 1), e + "," + (r + 2) ];

case "down":
return [ (e = 10 - this.currentY / i) + "," + ((r = this.currentX / i + 4) - 1), e + "," + r, e + "," + (r + 1), e + "," + (r + 2) ];

case "right":
return [ (e = 9 - this.currentY / i) - 1 + "," + (r = this.currentX / i + 5), e + "," + r, e + 1 + "," + r, e + 2 + "," + r ];

case "left":
return [ (e = 9 - this.currentY / i) - 1 + "," + (r = this.currentX / i + 4), e + "," + r, e + 1 + "," + r, e + 2 + "," + r ];
}
break;

case "j":
e = 9 - (this.currentY - n) / i;
r = (this.currentX + n) / i + 4;
switch (t) {
case "up":
return [ e - 1 + "," + (r - 1), e + "," + (r - 1), e + "," + r, e + "," + (r + 1) ];

case "down":
return [ e + "," + (r - 1), e + "," + r, e + "," + (r + 1), e + 1 + "," + (r + 1) ];

case "right":
return [ e - 1 + "," + (r + 1), e - 1 + "," + r, e + "," + r, e + 1 + "," + r ];

case "left":
return [ e - 1 + "," + r, e + "," + r, e + 1 + "," + r, e + 1 + "," + (r - 1) ];
}
break;

case "l":
e = 9 - (this.currentY - n) / i;
r = (this.currentX + n) / i + 4;
switch (t) {
case "up":
return [ e + "," + (r - 1), e + "," + r, e + "," + (r + 1), e - 1 + "," + (r + 1) ];

case "down":
return [ e + 1 + "," + (r - 1), e + "," + (r - 1), e + "," + r, e + "," + (r + 1) ];

case "right":
return [ e - 1 + "," + r, e + "," + r, e + 1 + "," + r, e + 1 + "," + (r + 1) ];

case "left":
return [ e - 1 + "," + (r - 1), e - 1 + "," + r, e + "," + r, e + 1 + "," + r ];
}
break;

case "o":
return [ (e = 9 - this.currentY / i) + "," + (r = this.currentX / i + 4), e + 1 + "," + r, e + "," + (r + 1), e + 1 + "," + (r + 1) ];

case "s":
e = 9 - (this.currentY - n) / i;
r = (this.currentX + n) / i + 4;
switch (t) {
case "up":
return [ e + "," + (r - 1), e + "," + r, e - 1 + "," + r, e - 1 + "," + (r + 1) ];

case "down":
return [ e + 1 + "," + (r - 1), e + 1 + "," + r, e + "," + r, e + "," + (r + 1) ];

case "right":
return [ e - 1 + "," + r, e + "," + r, e + "," + (r + 1), e + 1 + "," + (r + 1) ];

case "left":
return [ e - 1 + "," + (r - 1), e + "," + (r - 1), e + "," + r, e + 1 + "," + r ];
}
break;

case "t":
e = 9 - (this.currentY - n) / i;
r = (this.currentX + n) / i + 4;
switch (t) {
case "up":
return [ e - 1 + "," + r, e + "," + (r - 1), e + "," + r, e + "," + (r + 1) ];

case "down":
return [ e + "," + (r - 1), e + "," + r, e + "," + (r + 1), e + 1 + "," + r ];

case "right":
return [ e - 1 + "," + r, e + "," + r, e + "," + (r + 1), e + 1 + "," + r ];

case "left":
return [ e - 1 + "," + r, e + "," + (r - 1), e + "," + r, e + 1 + "," + r ];
}
break;

case "z":
e = 9 - (this.currentY - n) / i;
r = (this.currentX + n) / i + 4;
switch (t) {
case "up":
return [ e - 1 + "," + (r - 1), e - 1 + "," + r, e + "," + r, e + "," + (r + 1) ];

case "down":
return [ e + "," + (r - 1), e + "," + r, e + 1 + "," + r, e + 1 + "," + (r + 1) ];

case "right":
return [ e - 1 + "," + (r + 1), e + "," + (r + 1), e + "," + r, e + 1 + "," + r ];

case "left":
return [ e - 1 + "," + r, e + "," + r, e + "," + (r - 1), e + 1 + "," + (r - 1) ];
}
}
},
updatePosition: function() {
this.currentBlock.setPosition(this.currentX / 10, this.currentY / 10);
},
spawnNewBlock: function() {
var t = cc.instantiate(this.blockArray[this.rand]);
this.node.addChild(t);
this.currentX = this.startingX[this.rand];
this.currentY = this.startingY[this.rand];
this.currentType = this.typeBlock[this.rand];
this.currentBlock = t;
this.setInputControls();
this.rand = Math.floor(7 * Math.random());
this.previewNext();
this.updatePosition();
},
previewNext: function() {
this.nextBlock.removeFromParent(!1);
this.nextBlock.destroy();
var t = cc.instantiate(this.blockArray[this.rand]);
this.preview.addChild(t);
t.setPosition(0, -20);
this.nextBlock = t;
},
displayStats: function() {
this.numLevel.string = this.level.toString();
var t = ("" + this.score).length, e = "";
if (7 < t) {
this.score = 9999999;
this.endGame(!0);
} else for (var r = 0; r < 7 - t; r++) e += "0";
this.numScore.string = e + this.score;
this.numLines.string = this.lines.toString();
},
leftCheck: function() {
for (var t = this.location(this.orientation(0)), e = 0; e < t.length; e++) {
var r = t[e], i = Number(r.slice(0, r.indexOf(","))), n = Number(r.slice(r.indexOf(",") + 1, r.length));
if (0 == n || i < 0 || null !== this.boardMat[i][n - 1]) return !1;
}
return !0;
},
rightCheck: function() {
for (var t = this.location(this.orientation(0)), e = 0; e < t.length; e++) {
var r = t[e], i = Number(r.slice(0, r.indexOf(","))), n = Number(r.slice(r.indexOf(",") + 1, r.length));
if (9 == n || i < 0 || null !== this.boardMat[i][n + 1]) return !1;
}
return !0;
},
downCheck: function() {
for (var t = this.location(this.orientation(0)), e = 0; e < t.length; e++) {
var r = t[e], i = Number(r.slice(0, r.indexOf(","))), n = Number(r.slice(r.indexOf(",") + 1, r.length));
if (19 == i || null !== this.boardMat[i + 1][n]) {
for (var s = 0; s < t.length; s++) {
r = t[s];
i = Number(r.slice(0, r.indexOf(",")));
n = Number(r.slice(r.indexOf(",") + 1, r.length));
if (i <= 0) {
this.endGame(!1);
return !1;
}
var c = cc.instantiate(this.singleBlock());
this.node.addChild(c);
(this.boardMat[i][n] = c).setPosition(this.getX(n), this.getY(i));
}
this.currentBlock.removeFromParent(!1);
this.currentBlock.destroy();
this.clearCheck();
this.spawnNewBlock();
this.mDown = !1;
this.rLeft = !1;
return this.rRight = !1;
}
}
return !0;
},
clearCheck: function() {
for (var t = [], e = 0; e < this.boardMat.length; e++) {
for (var r = !0, i = 0; i < this.boardMat[e].length; i++) if (null === this.boardMat[e][i]) {
r = !1;
break;
}
if (r) {
for (i = 0; i < this.boardMat[e].length; i++) {
var n = this.boardMat[e][i];
n.removeFromParent(!1);
n.destroy();
}
t.push(e);
}
}
for (var s = 0; s < t.length; s++) {
for (e = t[s]; 0 <= e; e--) for (i = 0; i < this.boardMat[e].length; i++) if (0 === e || null === this.boardMat[e - 1][i]) this.boardMat[e][i] = null; else {
this.boardMat[e][i] = this.boardMat[e - 1][i];
this.boardMat[e][i].setPosition(this.getX(i), this.getY(e));
this.boardMat[e - 1][i] = null;
}
}
switch (t.length) {
case 1:
this.score += 100 * this.level;
break;

case 2:
this.score += 300 * this.level;
break;

case 3:
this.score += 500 * this.level;
break;

case 4:
this.score += 800 * this.level;
}
this.score += this.dropCount;
this.dropCount = 0;
this.lines += t.length;
9999999 <= this.score && this.endGame(!0);
if (0 < t.length) {
this.score += 50 * this.comboCount * this.level;
this.comboCount++;
} else this.comboCount = 0;
},
getX: function(t) {
return ((t - 4) * i - n) / 10;
},
getY: function(t) {
return -((t - 9) * i - n) / 10;
},
singleBlock: function() {
switch (this.currentType) {
case "i":
return this.singleI;

case "j":
return this.singleJ;

case "l":
return this.singleL;

case "o":
return this.singleO;

case "s":
return this.singleS;

case "t":
return this.singleT;

case "z":
return this.singleZ;
}
},
updateMoveDown: function(t) {
if (this.downCheck()) {
if (t) {
if (.05 <= this.timer) {
this.currentY -= i;
this.dropCount++;
this.timer = 0;
}
} else if (this.timer >= this.currentSpeed) {
this.currentY -= i;
this.timer = 0;
}
} else this.timer = 0;
},
wallCheck: function(t) {
for (var e = this.location(this.orientation(t)), r = 0; r < e.length; r++) {
var i = e[r], n = Number(i.slice(0, i.indexOf(","))), s = Number(i.slice(i.indexOf(",") + 1, i.length));
if (s < 0) return [ !1, "left" ];
if (9 < s) return [ !1, "right" ];
if (19 < n || null !== this.boardMat[n][s]) {
for (var c = [], o = 0; o < e.length; o++) {
var a = e[o];
c.push(Number(a.slice(a.indexOf(",") + 1, a.length)));
}
var h = !0, l = c[0];
for (o = 0; o < c.length; o++) if (c[o] != l) {
h = !1;
break;
}
if (h) return [ !1, "up" ];
c.sort(function(t, e) {
return t - e;
});
return s == c[0] || s == c[1] ? [ !1, "left" ] : [ !1, "right" ];
}
}
return [ !0, "none" ];
},
updateRotateLeft: function() {
if (.45 <= this.directionTimer) {
for (;!this.wallCheck(-90)[0]; ) "left" == this.wallCheck(-90)[1] ? this.currentX += i : "right" == this.wallCheck(-90)[1] && (this.currentX -= i);
this.updatePosition();
this.currentBlock.rotation -= 90;
this.directionTimer = 0;
}
},
updateRotateRight: function() {
if (.45 <= this.directionTimer) {
for (;!this.wallCheck(90)[0]; ) "left" == this.wallCheck(90)[1] ? this.currentX += i : "right" == this.wallCheck(90)[1] && (this.currentX -= i);
this.updatePosition();
this.currentBlock.rotation += 90;
this.directionTimer = 0;
}
},
updateMoveLeft: function() {
if (this.leftCheck()) {
if (.17 <= this.moveTimer) {
this.currentX -= i;
this.moveTimer = 0;
}
} else {
this.mLeft = !1;
this.moveTimer = 0;
}
},
updateMoveRight: function() {
if (this.rightCheck()) {
if (.17 <= this.moveTimer) {
this.currentX += i;
this.moveTimer = 0;
}
} else {
this.mRight = !1;
this.moveTimer = 0;
}
},
update: function(t) {
this.lines <= 0 ? this.level = 1 : 1 <= this.lines && this.lines <= 90 ? this.level = 1 + Math.floor(this.lines / 10) : this.level = 10;
this.displayStats();
this.currentSpeed = (11 - this.level) / 20;
this.timer += t;
if (this.rLeft) {
this.directionTimer += t;
this.updateRotateLeft();
} else if (this.rRight) {
this.directionTimer += t;
this.updateRotateRight();
}
if (this.mLeft) {
this.moveTimer += t;
this.updateMoveLeft();
} else if (this.mRight) {
this.moveTimer += t;
this.updateMoveRight();
}
this.updateMoveDown(this.mDown);
this.updatePosition();
},
endGame: function(t) {
if (t) cc.director.loadScene("WinScreen"); else {
var e = "" + this.score;
cc.sys.localStorage.setItem("score", e);
cc.director.loadScene("GameOver");
}
}
});
cc._RF.pop();
}, {} ],
NewGame: [ function(t, e, r) {
"use strict";
cc._RF.push(e, "2b5bf355kNG4IZE90KSd8IM", "NewGame");
cc.Class({
extends: cc.Component,
properties: {},
onClick: function() {
cc.director.loadScene("GameScreen");
}
});
cc._RF.pop();
}, {} ],
QuitButton: [ function(t, e, r) {
"use strict";
cc._RF.push(e, "fa01fZdfdBGeYGQcrY279nG", "QuitButton");
cc.Class({
extends: cc.Component,
properties: {},
start: function() {},
onClick: function(t) {
cc.director.loadScene("StartScreen");
}
});
cc._RF.pop();
}, {} ],
Score: [ function(t, e, r) {
"use strict";
cc._RF.push(e, "a5730vQKK9CM4Sb0jbEYgbN", "Score");
cc.Class({
extends: cc.Component,
properties: {
label: {
default: null,
type: cc.Label
}
},
onLoad: function() {
var t = cc.sys.localStorage.getItem("score");
cc.sys.localStorage.removeItem("score");
cc.sys.localStorage.clear();
for (var e = ("" + t).length, r = "", i = 0; i < 7 - e; i++) r += "0";
this.label.string = r + t;
}
});
cc._RF.pop();
}, {} ],
StartButton: [ function(t, e, r) {
"use strict";
cc._RF.push(e, "f1b720k4k5Mda+OcAb6uGB+", "StartButton");
cc.Class({
extends: cc.Component,
properties: {},
start: function() {},
onClick: function(t) {
cc.director.loadScene("GameScreen");
}
});
cc._RF.pop();
}, {} ]
}, {}, [ "BackButton", "Controls", "GameBoard", "NewGame", "QuitButton", "Score", "StartButton" ]);