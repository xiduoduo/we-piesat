import {
    CanvasWindy
} from './Windys';
import $ from 'jquery'
var windycanvas;
//风场流线
export const setWindy = function (data, thisJson) {
    let that = data;
    /**
     *如果处于全球状态就设置为[]（只要有一个角获取不到坐标就表示全球状态，实时计算）
     **/
    var globalExtent = [];
    var showWindy = function () {
        $('#windycanvas').show();
    };
    var hideWindy = function () {
        $('#windycanvas').hide();
    };
    //获取当前三维窗口左上、右上、左下、右下坐标
    var getCesiumExtent = function () {
        var canvaswidth = window.innerWidth,
            canvasheight = window.innerHeight - 50;

        var left_top_pt = new Cesium.Cartesian2(0, 0);
        var left_bottom_pt = new Cesium.Cartesian2(0, canvasheight);
        var right_top_pt = new Cesium.Cartesian2(canvaswidth, 0);
        var right_bottom_pt = new Cesium.Cartesian2(canvaswidth, canvasheight);

        var pick1 = that.mapData.viewer.scene.globe.pick(that.mapData.viewer.camera.getPickRay(left_top_pt), that.mapData.viewer.scene);
        var pick2 = that.mapData.viewer.scene.globe.pick(that.mapData.viewer.camera.getPickRay(left_bottom_pt), that.mapData.viewer.scene);
        var pick3 = that.mapData.viewer.scene.globe.pick(that.mapData.viewer.camera.getPickRay(right_top_pt), that.mapData.viewer.scene);
        var pick4 = that.mapData.viewer.scene.globe.pick(that.mapData.viewer.camera.getPickRay(right_bottom_pt), that.mapData.viewer.scene);
        if (pick1 && pick2 && pick3 && pick4) {
            //将三维坐标转成地理坐标---只需计算左下右上的坐标即可
            var geoPt1 = that.mapData.viewer.scene.globe.ellipsoid.cartesianToCartographic(pick2);
            var geoPt2 = that.mapData.viewer.scene.globe.ellipsoid.cartesianToCartographic(pick3);
            //地理坐标转换为经纬度坐标
            var point1 = [geoPt1.longitude / Math.PI * 180, geoPt1.latitude / Math.PI * 180];
            var point2 = [geoPt2.longitude / Math.PI * 180, geoPt2.latitude / Math.PI * 180];
            // console.log(point1,point2);
            //此时说明extent需要分为东西半球
            if (point1[0] > point2[0]) {
                globalExtent = [point1[0], 180, point1[1], point2[1], -180, point2[0], point1[1], point2[1]];
            } else {
                globalExtent = [point1[0], point2[0], point1[1], point2[1]];
            }
        } else {
            globalExtent = [];
        }
    };
    // 开启监听器--无论对当前地球做的任何操作都会监听到
    let postRender = that.mapData.viewer.scene.postRender.addEventListener(() => {
        getCesiumExtent();
    });
    var refreshTimer = -1;
    var mouse_down = false;
    var mouse_move = false;
    var handler = new Cesium.ScreenSpaceEventHandler(that.mapData.viewer.scene.canvas);
    //鼠标滚动、旋转后是否需要重新生成风场---如果需要，打开以下注释--旋转或者移动到北半球的时候计算会有问题
    handler.setInputAction(function (e) {
        clearTimeout(refreshTimer);
        hideWindy();
        setTimeout(function () {
            windy.extent = globalExtent;
            windy.redraw();
            showWindy();
        }, 200);
    }, Cesium.ScreenSpaceEventType.WHEEL);
    //鼠标左键、右键按下
    handler.setInputAction(function (e) {
        mouse_down = true;
    }, Cesium.ScreenSpaceEventType.LEFT_DOWN);
    handler.setInputAction(function (e) {
        mouse_down = true;
    }, Cesium.ScreenSpaceEventType.RIGHT_DOWN);
    //鼠标移动
    handler.setInputAction(function (e) {
        if (mouse_down) {
            hideWindy();
            mouse_move = true;
        }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    //鼠标左键、右键抬起
    handler.setInputAction(function (e) {
        if (mouse_down && mouse_move) {
            windy.extent = globalExtent;
            windy.redraw();
        }
        showWindy();
        mouse_down = false;
        mouse_move = false;
    }, Cesium.ScreenSpaceEventType.LEFT_UP);
    handler.setInputAction(function (e) {
        if (mouse_down && mouse_move) {
            windy.extent = globalExtent;
            windy.redraw();
        }
        showWindy();
        mouse_down = false;
        mouse_move = false;
    }, Cesium.ScreenSpaceEventType.RIGHT_UP);


    var windy = null,
        windycanvas = null;
    var resizeCanvas = function () {
        if (windycanvas == null) {
            return;
        }
        windycanvas.width = window.innerWidth;
        windycanvas.height = window.innerHeight;
        // console.log(windycanvas.width, windycanvas.height);
        if (windy) {
            windy._resize(windycanvas.width, windycanvas.height);
        }
    };
    windycanvas = document.createElement('canvas');
    windycanvas.setAttribute("id", "windycanvas");
    windycanvas.style.position = 'fixed'
    windycanvas.style["pointer-events"] = "none";
    windycanvas.style["z-index"] = 999;
    windycanvas.style["top"] = 0;
    document.getElementById('cesium').appendChild(windycanvas);
    $.ajax({
        type: "get",
        url: thisJson,
        dataType: "json",
        success: function (response) {
            resizeCanvas();
            window.onresize = resizeCanvas;
            //风场的参数配置，除了canvas/viewer是必传项，其他可以不传，参数含义见windy.js
            var params = {
                viewer: that.mapData.viewer,
                canvas: windycanvas,
                canvasWidth: window.innerWidth,
                canvasHeight: window.innerHeight,
                // speedRate: 5000, //移动速率
                // particlesNumber: 2000, //粒子个数
                // maxAge: 200, //存活时间
                // frameRate: 10,
                // color: '#e04c38', //颜色
                // lineWidth: 1, //线宽

                speedRate: 9000,
                particlesNumber: 7000,
                maxAge: 120,
                frameRate: 10,
                color: '#ffffff',
                lineWidth: 1,
            };
            windy = new CanvasWindy(response, params);
        },
        error: function (errorMsg) {
            console.log("请求数据失败!");
        }
    });
};

export const removeWindy = function () {
    $('#windycanvas') && $('#windycanvas').remove();
};