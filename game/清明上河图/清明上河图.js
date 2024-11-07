window.onload = function () {
    let p1 = new Ping()
    p1.init("ul", 3)
    document.getElementById("newGameBtn").onclick = function () {
        p1.init("ul", 3)
    }
}
function Ping() {
    this.oUl = null;
    this.aLi = null;
    this.len = 0;
    this.oLi = null;
    this.num = 0;
    this.zIndex = 2;
    this.arr = [];
}
Ping.prototype.init = function (id, num) {
    this.oUl = document.querySelector(id);
    this.oUl.innerHTML = this.sheng(num);
    this.aLi = this.oUl.querySelectorAll("li");
    this.len = this.aLi.length;
    this.num = num;


    this.oLi = this.aLi[this.len - 1];
    this.oLi.className = 'active';
    this.ding();
    this.click();



}
//判断合并
Ping.prototype.he = function () {
    let arr1 = [];
    let arr2 = [];
    let n = 0;
    for (let i = 0; i < this.len; i++) {
        arr1.push(this.aLi[i].index)
        arr2.push(this.arr[i][2])
    }
    for (let i = 0; i < this.len; i++) {
        if (arr1[i] == arr2[i])
            n += 1;
    }
    if (n == this.len) {
        alert("恭喜你，游戏胜利！")
        complete(1);
         window.location.href = '/h5web/MapSelect.html';
    }
}




//判断移动
Ping.prototype.pan = function (li) {
    let index = li.index;//棋盘格子的位置

    let num = this.oLi.index;//拼图的位置
    //console.log(index)
    //console.log(this.oLi.index)
    //console.log(index % this.num)//3
    if (num % this.num == 0) {
        if (index + this.num == num || index - this.num == num || index - 1 == num) {

            return true;
        }

    } else if (num % this.num == this.num - 1) {
        if (index + this.num == num || index - 3 == num || index + 1 == num) {
            return true;
        }

    } else {
        if (index + this.num == num || index - this.num == num || index - 1 == num || index + 1 == num) {
            return true;
        }
        return false;
    }



}
//移动
Ping.prototype.move = function (li) {
    if (this.pan(li)) {
        li.style.left = this.arr[this.oLi.index][0] + "px";
        li.style.top = this.arr[this.oLi.index][1] + "px";
        this.oLi.style.left = this.arr[li.index][0] + "px";
        this.oLi.style.top = this.arr[li.index][1] + "px";
        [this.oLi.index, li.index] = [li.index, this.oLi.index];
        this.he();

    }
}
//点击
Ping.prototype.click = function () {
    let This = this;
    for (let i = 0; i < this.len; i++) {
        this.aLi[i].onclick = function () {
            this.style.zIndex = this.zIndex++;
            //console.log(this);
            This.move(this);
        }
    }
}
//定位
Ping.prototype.ding = function () {
    let arr1 = [];
    let arrA = [];
    for (let i = 0; i < this.len; i++) {
        arr1.push([this.aLi[i].offsetLeft, this.aLi[i].offsetTop, i]);
        arrA.push([this.aLi[i].offsetLeft, this.aLi[i].offsetTop, i]);
    }
    this.arr = arrA;
    //随机
    let arr2 = [];
    for (let i = 0; i < this.len - 1; i++) {
        arr2.push(arr1[i]);
    }
    arr2.sort(function (a, b) {
        return Math.random() - 0.5;

    });
    arr2.push(arr1[this.len - 1]);
    let arr3 = [];
    let a = 0;
    for (let i = 0; i < this.len; i++) {
        arr3.push(arr2[i][2]);
    }
    for (let i = 0; i < this.len; i++) {
        let b = arr3[i];
        for (let j = i; j < this.len; j++) {
            let c = arr3[j];
            if (b > c) {
                a += 1;

            }
        }
    }
    if (a % 2 == 0) {
        // console.log("加油")
    } else {
        //  console.log("危")
        this.ding();
        return false;
    }
    arr1 = arr2;
    for (let i = 0; i < this.len; i++) {
        this.aLi[i].style.position = "absolute";
        this.aLi[i].style.left = arr1[i][0] + "px";
        this.aLi[i].style.top = arr1[i][1] + "px";
        this.aLi[i].index = arr1[i][2];
        this.aLi[i].style.margin = 0;
        this.aLi[i].style.backgroundSize = this.num * 200 + "px";
        this.aLi[i].style.backgroundPosition = -(i % this.num) * 200 + "px " + -Math.floor(i / this.num) * 200 + "px";
    }
}
Ping.prototype.sheng = function (num) {
    this.oUl.style.width = num * 2 + num * 200 + "px";
    this.oUl.style.height = num * 2 + num * 200 + "px";

    let n = num * num;
    let str = "";
    for (let i = 0; i < n; i++) {
        str += "<li></li>";
    }

    return str;
}
