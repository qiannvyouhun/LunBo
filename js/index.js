//绘制页面结构：
var html = '<div class="slider" id="slider">'
  + '<div class="slide"><img src="img/b5.png" alt=""></div>'
  + '<div class="slide"><img src="img/b1.png" alt=""></div>'
  + '<div class="slide"><img src="img/b2.png" alt=""></div>'
  + '<div class="slide"><img src="img/b3.png" alt=""></div>'
  + '<div class="slide"><img src="img/b4.png" alt=""></div>'
  + '<div class="slide"><img src="img/b5.png" alt=""></div>'
  + '<div class="slide"><img src="img/b1.png" alt=""></div>'
  + '</div>'
  + '<span id="left"><</span>'
  + '<span id="right">></span>'
  + '<ul class="nav" id="navs">'
  + '<li>1</li>'
  + '<li>2</li>'
  + '<li>3</li>'
  + '<li>4</li>'
  + '<li>5</li>'
  + '</ul>';
$('#box').html(html);

//获取所有元素：
var slides = document.getElementsByClassName('slide');
var navs = document.getElementById('navs').children;
var left = document.getElementById("left");
var right = document.getElementById("right");

//设置元素的索引值 全局索引
var index = 0;

//图片数组的长度  5
len = slides.length - 2;

// 左边的点击事件
function Last() {
  if (index == 0) {//显示的是第一张
    $('#slider').animate({ left: '+=' + 1200 }, 1000, function () {
      $('#slider').css('left', -1200 * len);
    })
    setBtn(len - 1);
    index = len - 1;
  }
  else {
    $('#slider').animate({ left: '+=' + 1200 }, 1000);
    setBtn(index - 1);
    index--;
  }
}

// 右边的点击事件
function Next() {
  if (index == len - 1) {//显示的是最后一张
    $('#slider').animate({ left: '-=' + 1200 }, 1000, function () {
      $('#slider').css('left', -1200);
    })
    setBtn(0);
    index = 0;
  }
  else {
    $('#slider').animate({ left: '-=' + 1200 }, 1000);
    setBtn(index + 1);
    index++;
  }
}

// 显示圆点事件
function setBtn(idx) {
  for (var i = 0; i < navs.length; i++) {
    if (i == idx) {
      navs[idx].setAttribute("class", "active");
    }
    else {
      navs[i].removeAttribute("class", "active");
    }
  }
}

// 点击圆点事件
for (var i = 0; i < len; i++) {
  (function (j) {
    navs[j].onclick = function () {
      if (j - index > 0) {
        $('#slider').animate({ left: '-=' + 1200 * (j - index) }, 1000);
      }
      else if (j - index < 0) {
        $('#slider').animate({ left: '+=' + 1200 * (index - j) }, 1000);
      }
      else {
        return true;
      }
      setBtn(j);
      index = j;
    }
  })(i)
}

// 鼠标移入:清除定时器
$('#box').mouseover(function () {
  left.style.opacity = "0.6";
  right.style.opacity = "0.6";
  clearInterval(timer);
})

// 鼠标移出:开启器定时器
$('#box').mouseout(function () {
  left.style.opacity = "0";
  right.style.opacity = "0";
  timer = setInterval(Next, 3000);
})

// 自动轮播
function autoPlay() {
  timer = setInterval(function () {
    Next();
  }, 3000);
}

// 绑定事件
$('#left').click(Last);
$('#right').click(Next);
setBtn(0);
autoPlay();
