var startx = 0, starty = 0;//手指按下的坐标
var movex = 0, movey = 0;//手指移动的坐标
var X = 0, Y = 0;//移动坐标与初始坐标的差值
var N = 4;//蛇总长度
var animate = null
var repeat = null
//蛇头的对象
var snakehead = {
  x: 0,
  y: 0,
  color: "#ff0000",
  //蛇头的宽高
  w: 20,
  h: 20
}
var windowWidth = 0;
var windowHeight = 0;
var snakebody = [];
//食物
var food = {
  x: 0,
  y: 0,
  color: ""
};
//方向
var direction = null;
var snakeDirction = "right";
Page({
  data: {
    mes: "",
    mes1: ""
  },
  restart: function () {
    this.setData({ mes: "", mes1: "" })
    snakehead.x = 0;
    N = 4;
    snakehead.y = 0;
    snakebody = [];
    repeat = setInterval(animate, 500);
  },
  canvasStart: function (e) {
    startx = e.touches[0].x;
    starty = e.touches[0].y;
    console.log("(" + startx + "," + starty + ")");
  },
  canvasMove: function (e) {
    movex = e.touches[0].x;
    movey = e.touches[0].y;
    //console.log("移动时的坐标(" + movex + "," + movey + ")");
    X = movex - startx;
    Y = movey - starty;
    //判断移动方向
    if (Math.abs(X) > Math.abs(Y) && X > 0) {
      direction = "right";
      console.log("right");
    } else if (Math.abs(X) > Math.abs(Y) && X < 0) {
      direction = "left";
      console.log("left");
    } else if (Math.abs(X) < Math.abs(Y) && Y > 0) {
      direction = "down";
      console.log("down");
    } else {
      console.log('up');
      direction = "up";
    }
  },
  canvasEnd: function (e) {
    snakeDirction = direction;
  },
  onReady: function (e) {
    var that = this;
    var context = wx.createCanvasContext('snakeCanvas');
    wx.getSystemInfo({
      success: function (res) {
        windowWidth = res.windowWidth;
        windowHeight = res.windowHeight;
      },
    })
    function newfood() {
      food.x = Math.floor(Math.random() * windowWidth);
      food.y = Math.floor(Math.random() * windowHeight);
      if (food.x % 20 != 0 || food.y % 20 != 0) { food.x -= food.x % 20; food.y -= food.y % 20; }
      food.color = "#FF1493";
    }
    newfood();
    function eat() {
      if (Math.abs(snakehead.x - food.x) < 10 && Math.abs(snakehead.y - food.y) < 10) {
        newfood();
        N++;
      }
      if (snakehead.x > windowWidth || snakehead.x < 0 || snakehead.y < 0 || snakehead.y > windowHeight) { console.log("gameover"); return false; }
      else return true;
    }
    //画动图像
    animate = function () {
      if (!eat()) {
        clearInterval(repeat); that.setData({
          mes: "游戏结束", mes1:
            "重新开始"
        })
      };
      snakebody.push({
        x: snakehead.x,
        y: snakehead.y,
        w: 20,
        h: 20,
        color: "#00ff00"
      });
      if (snakebody.length > N) {
        snakebody.shift();
      }
      switch (snakeDirction) {
        case "right":
          snakehead.x += 20;
          break;
        case "left":
          snakehead.x -= 20;
          break;
        case "down":
          snakehead.y += 20;
          break;
        case "up":
          snakehead.y -= 20;
          break;
      }
      //绘制食物
      //获取页面尺寸
      context.setFillStyle(food.color);
      context.fillRect(food.x, food.y, snakehead.w, snakehead.h);

      context.setFillStyle(snakehead.color);//填充颜色
      //绘制蛇头
      context.fillRect(snakehead.x, snakehead.y, snakehead.w, snakehead.h);

      //绘制身体
      for (var i = 0; i < snakebody.length; i++) {
        context.setFillStyle(snakebody[i].color);
        //console.log(snakebody[i].color);
        context.fillRect(snakebody[i].x, snakebody[i].y, snakebody[i].w, snakebody[i].h);
      }
      context.draw();
    }
    repeat = setInterval(animate, 500);
  }

})