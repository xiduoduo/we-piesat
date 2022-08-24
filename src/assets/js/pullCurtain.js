export const pullCurtain = function () {
    var box = document.getElementById("box")
    var tag = document.getElementById("tag")
    var leftDiv = document.getElementById("left")
    tag.style.left = 'calc(50% - 15px)';
    leftDiv.style.width = '50%';

    //统一定义各个属性的变量值
    var offsetX, //鼠标点击时与tag边框的距离
        clientX, //鼠标点击时与浏览器的距离  设置在box事件内
        tagLeft //鼠标点击时与box的距离

    //默认给tag绑定一个mousedown事件
    tag.onmousedown = function (event) {
        let e = window.event
        offsetX = e.offsetX //表示当鼠标按下时，他在当前元素的x坐标
        box.onmousemove = function (event) {
            let e = window.event;
            //获取盒子距离浏览器的距离
            var boxLeft = box.offsetLeft;
            //获取盒子的宽度
            var boxWith = box.clientWidth;
            clientX = e.clientX
            tagLeft = clientX - boxLeft
            //设置变量 获取左边div的宽度

            // let leftDivWidth = leftDiv.offsetWidth
            // console.log(leftDivWidth);
            //边界条件的判断
            if (tagLeft > 30 && tagLeft < boxWith - 15) {
                tag.style.left = tagLeft - 15 + "px"
                //改变div大小
                // leftDiv.style.width = (tagLeft + 16.5) + "px"
                leftDiv.style.width = tagLeft + "px"
            }
            //判断p标签的显示隐藏
            if (tagLeft < 0) {
                let p1 = document.getElementById("left").children[0]
                p1.style.display = "none"
            }
            if (tagLeft >= 0 && tagLeft <= boxWith) {
                let p1 = document.getElementById("left").children[0]
                let p2 = document.getElementById("right").children[0]
                p1.style.display = "block"
                p2.style.display = "block"
            }
            if (tagLeft > boxWith) {
                let p2 = document.getElementById("right").children[0]
                p2.style.display = "none"
            }
            // console.log(tagLeft);
        }
    }
    //绑定一个当鼠标弹起事件
    // tag.onmouseup = function(event){
    //     box.onmousemove = null
    // }   bug  设置的作用域不对！！！！！！！
    //绑定一个当鼠标弹起事件
    document.onmouseup = function (event) {
        box.onmousemove = null
        // tag.onmousedown = null
    }
    //当窗口大小改变时重新获取boxL，boxR
    window.onresize = function () {
        //获取盒子距离浏览器的距离
        var boxLeft = box.offsetLeft;
        boxLeft = box.offsetLeft
    }
}