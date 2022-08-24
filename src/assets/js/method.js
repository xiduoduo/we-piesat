import { buildVector, removeCanvas } from "./leaflet/process"//leaflet 风场
// import { setWindy, removeWindy } from './wind/setWindy'//cesium 风场
import { setWind3D } from '../js/wind_3D/app'//cesium 风场

import * as L from 'leaflet'

import store from '@/store/store'
var workingArea = store.getters.workingArea;
var geoserverUrl = store.getters.geoserverUrl;
// var mapUrl = store.getters.mapUrl;
var imgUrl = store.getters.imgUrl;

//组件点击切换样式
export const dialogInit = function () {
    $('.diolagContItem').click(function (e) {
        $(this).addClass('diolagContItemChecked').siblings().removeClass('diolagContItemChecked');
    })
}

//清除所有图层
export const clearViewer = function (vm) {
    let that = vm;
    let patternState = that.$store.getters.patternState;
    if (patternState) {
        $("#datGui").remove();
        that.mapData.overlyName && that.mapData.overlyName.forEach(e => {
            that.mapData[e] && that.mapData[e].forEach(v => {
                that.mapData.viewer.imageryLayers.remove(v);
            })
        });
        that.mapData.cageLayer.forEach(e => {
            that.mapData.viewer.imageryLayers.remove(that.mapData[e]);
        })

        //清除cesium绘画边框
        that.mapData.viewer && that.mapData.viewer.entities && that.mapData.viewer.entities.removeAll();
        that.mapData.queryLocat.forEach(i => {
            i && that.mapData.viewer.imageryLayers.remove(i);
        })
        that.mapData.overlyName = [];
        that.mapData.viewer && that.mapData.viewer.scene.primitives.removeAll();
    } else {
        that.mapData.overlyName && that.mapData.overlyName.forEach(e => {
            that.mapData[e] && that.mapData[e].forEach(v => {
                that.mapData.map.removeLayer(v);
            })
        });
        that.mapData.cageLayer.forEach(e => {
            that.mapData.map.removeLayer(that.mapData[e]);
        })

        that.mapData.queryLocat.forEach(i => {
            i && that.mapData.map.removeLayer(i);
        })
        that.mapData.resultImg.forEach(i => {
            i && that.mapData.map.removeLayer(i);
        })

        that.mapData.overlyName = [];
        removeCanvas(that.mapData.map);
    }
}

//清除其他图层
export const clearOthers = function (that, item) {
    let patternState = that.$store.getters.patternState;
    if (patternState) {
        that.mapData.viewer.scene.primitives.removeAll();
        that.mapData.overlyName && that.mapData.overlyName.forEach(e => {
            that.mapData[e] && that.mapData[e].forEach(v => {
                v && that.mapData.viewer.imageryLayers.remove(v);
            })
        });
        that.mapData.cageLayer.forEach(e => {
            e != item.name && that.mapData.viewer.imageryLayers.remove(that.mapData[e]);
        })
        that.mapData.imgageIdArr.forEach(e => {
            var getByIdBox = that.mapData.viewer.entities.getById(e);
            e != item.name && that.mapData.viewer.entities.remove(getByIdBox);;
        })
        that.mapData.imgageIdArr = that.mapData.imgageIdArr.filter(e => {
            return e != item.id;
        })
    } else {
        that.mapData.overlyName && that.mapData.overlyName.forEach(e => {
            that.mapData[e] && that.mapData[e].forEach(v => {
                e != item.name && that.mapData.map.removeLayer(v);
            })
        });
        that.mapData.cageLayer.forEach(e => {
            e != item.name && that.mapData.map.removeLayer(that.mapData[e]);
        })
        that.mapData.imgageIdArr.forEach(e => {
            e != item.name && that.mapData.map.removeLayer(that.mapData.cageLayer[e]);
        })
        that.mapData.imgageIdArr = that.mapData.imgageIdArr.filter(e => {
            return e != item.id;
        })
    }
}

//加载图层
export const addLayers = function (that, layers) {
    let patternState = that.$store.getters.patternState;
    if (patternState) {
        return addLayersC(that, layers);
    } else {
        return addLayersL(that, layers);
    }
}

//leaft 加载图层
export const addLayersL = function (that, layers) {
    return L.tileLayer.wms(geoserverUrl + workingArea, {
        layers: layers, //需要加载的图层
        format: 'image/png', //返回的数据格式
        transparent: true,
        crs: L.CRS.EPSG4326,
        // tileSize: 512,
        opacity: 1,
    });
}

//cesium 加载图层
export const addLayersC = function (that, layers) {
    return that.mapData.viewer.imageryLayers.addImageryProvider(new Cesium.WebMapServiceImageryProvider({
        url: geoserverUrl + workingArea,
        layers: layers,
        parameters: {
            transparent: true, // 是否透明
            format: 'image/png', // 返回格式
            srs: 'EPSG:4326',  // 坐标系
            // styles: ''
        }
    }));
}

//添加图片
export const addImage = function (that, path, locat) {
    let url;
    switch (path) {
        case 'SD':
            url = imgUrl + '/SD.png';
            break;
        case 'KD490':
            url = imgUrl + '/KD490.png';
            break;
        case 'CL':
            url = imgUrl + '/CL.jpg';
            break;
        default:
            break
    }
    that.mapData.imgageIdArr.push(that.searchId);
    that.patternState ? addImageC(that, url, locat) : addImageL(that, url, locat)
}

//添加图片cesium
export const addImageC = function (that, url, locat) {
    that.mapData.viewer.entities.add({
        id: that.searchId,
        rectangle: {
            coordinates: Cesium.Rectangle.fromDegrees(locat[1][1], locat[1][0], locat[2][1], locat[2][0]),
            material: url,
        }
    });
}

//添加图片 leaflet
export const addImageL = function (that, url, locat) {
    that.mapData.cageLayer[that.searchId] = new L.layerGroup();
    L.imageOverlay(url, [locat[1], locat[2]]).addTo(that.mapData.cageLayer[that.searchId]);
    that.mapData.cageLayer[that.searchId].addTo(that.mapData.map);
}
//关闭图片
export const closeImgage = function (that) {
    if (that.patternState) {
        let getByIdBox = that.mapData.viewer.entities.getById(that.searchId);
        that.mapData.viewer.entities.remove(getByIdBox);;
    } else {
        that.mapData.cageLayer[that.searchId] && that.mapData.map.removeLayer(that.mapData.cageLayer[that.searchId]);
    }
}
//关闭图层
export const closeLayers = function (that, row, index) {
    let patternState = that.$store.getters.patternState;
    if (patternState) {
        return closeLayersC(that, row, index);
    } else {
        return closeLayersL(that, row, index);
    }
}

//关闭图层 leaflet
export const closeLayersL = function (that, row, index) {
    removeCanvas(that.mapData.map);
    that.mapData.map.removeLayer(that.mapData[that.coverageName][index]);
    that.mapData[row.originName] && that.mapData.map.removeLayer(that.mapData[row.originName]);
    that.mapData.cageLayer = that.mapData.cageLayer.filter(e => {
        return e != row.originName;
    })
}

//关闭图层 cesium
export const closeLayersC = function (that, row, index) {
    that.mapData.viewer.scene.primitives.removeAll();
    that.mapData.viewer.imageryLayers.remove(that.mapData[that.coverageName][index]);
    row.dataName && that.mapData[row.dataName] && that.mapData.viewer.imageryLayers.remove(that.mapData[row.dataName]);

    that.mapData.cageLayer = that.mapData.cageLayer.filter(e => {
        return e != row.dataName;
    })
}

//添加风场
export const addWind = function (that, windUrl, particlesType) {
    let patternState = that.$store.getters.patternState;
    if (patternState) {
        return addWindC(that, windUrl, particlesType);
    } else {
        return addWindL(that, windUrl, particlesType);
    }
}

//leafet风场
export const addWindL = function (that, windUrl, particlesType) {
    that.$api.getJson(windUrl).then(data => {
        buildVector(that, particlesType, data);
    })
}

//cesium风场
export const addWindC = function (that, windUrl, particlesType) {
    // let thisJson = mapUrl + '/json/data.json';
    // setWindy(that, thisJson);

    setWind3D(that.mapData.viewer, windUrl, particlesType);
}



//图形绘制绘制工具
export const drawIng = function (that) {
    let patternState = that.$store.getters.patternState;
    if (patternState) {
        return drawIngC(that);
    } else {
        return drawIngL(that);
    }
}

//leaflet 绘制
export const drawIngL = function (that) {
    that.mapData.map.pm.disableDraw("Rectangle");
    that.mapData.map.pm.setPathOptions({
        color: 'orange',
        opacity: 0.2
        // fill: false,
    });
    that.mapData.map.pm.enableDraw("Rectangle", {
        snappable: false,
        templineStyle: {
            color: 'red',
            fill: false
        },
        snapDistance: 40,
        hintlineStyle: {
            color: 'red',
            fill: false
        }

    });
    that.mapData.map.pm.setLang('zh');
}

//cesium 绘制
export const drawIngC = function (that) {
    that.mapData.viewer.entities.removeAll();
    that.searchForm.area = "";
    var showPointArr = [];
    var activeShapePoints = [];
    var activeShape;
    var floatingPoint;
    var handler = new Cesium.ScreenSpaceEventHandler(that.mapData.viewer.canvas);
    handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK)//移除事件
    //双击鼠标左键清除默认事件
    that.mapData.viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(function (event) {
        if (!handler) {
            andler = new Cesium.ScreenSpaceEventHandler(that.mapData.viewer.scene.canvas);
        }
        that.mapData.viewer.entities.remove();
        handler.destroy();
        handler = null;
    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
    //绘制点
    function createPoint(worldPosition) {
        var point = that.mapData.viewer.entities.add({
            position: worldPosition,
            point: {
                color: Cesium.Color.WHITE,
                pixelSize: 5,
                heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
            }
        });
        return point;
    }
    //初始化为线
    var drawingMode = 'line';
    //绘制图形
    function drawShape(positionData) {
        let objId = Number((new Date()).getTime() + "" + Number(Math.random() * 1000).toFixed(0));
        var shape;
        if (drawingMode == 'line') {
            shape = that.mapData.viewer.entities.add({
                polyline: {
                    positions: positionData,
                    clampToGround: true,
                    width: 3,
                    objId: objId,
                }
            });
        } else if (drawingMode == 'polygon') {
            shape = that.mapData.viewer.entities.add({
                polygon: {
                    hierarchy: positionData,
                    material: new Cesium.ColorMaterialProperty(Cesium.Color.WHITE.withAlpha(0.7)),
                    objId: objId,
                }
            });
        } else if (drawingMode == 'circle') {
            //当positionData为数组时绘制最终图，如果为function则绘制动态图
            var value = typeof positionData.getValue === 'function' ? positionData.getValue(0) : positionData;
            //var start = activeShapePoints[0];
            //var end = activeShapePoints[activeShapePoints.length - 1];
            //var r = Math.sqrt(Math.pow(start.x - end.x, 2) + Math.pow(start.y - end.y, 2));
            //r = r ? r : r + 1;
            shape = that.mapData.viewer.entities.add({
                position: activeShapePoints[0],
                name: 'Blue translucent, rotated, and extruded ellipse with outline',
                type: 'Selection tool',
                objId: objId,
                ellipse: {
                    semiMinorAxis: new Cesium.CallbackProperty(function () {
                        //半径 两点间距离
                        var r = Math.sqrt(Math.pow(value[0].x - value[value.length - 1].x, 2) + Math
                            .pow(value[0].y - value[value.length - 1].y, 2));
                        return r ? r : r + 1;
                    }, false),
                    semiMajorAxis: new Cesium.CallbackProperty(function () {
                        var r = Math.sqrt(Math.pow(value[0].x - value[value.length - 1].x, 2) + Math
                            .pow(value[0].y - value[value.length - 1].y, 2));
                        return r ? r : r + 1;
                    }, false),
                    material: Cesium.Color.BLUE.withAlpha(0.5),
                    outline: true
                }
            });
        } else if (drawingMode == 'rectangle') {
            //当positionData为数组时绘制最终图，如果为function则绘制动态图
            var arr = typeof positionData.getValue === 'function' ? positionData.getValue(0) : positionData;
            shape = that.mapData.viewer.entities.add({
                name: 'Blue translucent, rotated, and extruded ellipse with outline',
                rectangle: {
                    coordinates: new Cesium.CallbackProperty(function () {
                        var obj = Cesium.Rectangle.fromCartesianArray(arr);
                        //if(obj.west==obj.east){ obj.east+=0.000001};
                        //if(obj.south==obj.north){obj.north+=0.000001};
                        return obj;
                    }, false),
                    material: Cesium.Color.ORANGE.withAlpha(0.3),
                    // fill: false,
                    // material: {
                    //       solidColor: {
                    //             color: {
                    //                   rgbaf: [1, 0, 0, 0.39],
                    //             },
                    //       },
                    // },
                    // height: 0, // disables ground clamping, needed for outlines
                    // outline: true,
                    // outlineColor: Cesium.Color.BLUE,
                },
                objId: objId,
            });
        }
        // handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK)//移除事件
        return shape;
    }
    function getCatesian3FromPX(px) {
        var cartesian;
        var ray = that.mapData.viewer.camera.getPickRay(px);
        if (!ray) return null;
        cartesian = that.mapData.viewer.scene.globe.pick(ray, that.mapData.viewer.scene);
        return cartesian;
    }
    //鼠标左键
    handler.setInputAction(function (event) {
        // We use `viewer.scene.pickPosition` here instead of `viewer.camera.pickEllipsoid` so that
        // we get the correct point when mousing over terrain.
        // scene.pickPosition只有在开启地形深度检测，且不使用默认地形时是准确的。
        //var earthPosition = viewer.scene.pickPosition(event.position);

        var earthPosition = getCatesian3FromPX(event.position);
        //经纬度
        var ellipsoid = that.mapData.viewer.scene.globe.ellipsoid;
        var cartographic = ellipsoid.cartesianToCartographic(earthPosition);
        var lat = Cesium.Math.toDegrees(cartographic.latitude);
        var lng = Cesium.Math.toDegrees(cartographic.longitude);
        console.log("lat:" + lat + ",lng:" + lng)

        that.searchForm.area += lat + " " + lng + " , ";


        // `earthPosition` will be undefined if our mouse is not over the globe.
        if (Cesium.defined(earthPosition)) {
            if (activeShapePoints.length === 0) {
                floatingPoint = createPoint(earthPosition);
                activeShapePoints.push(earthPosition);
                var dynamicPositions = new Cesium.CallbackProperty(function () {
                    if (drawingMode === 'polygon') {
                        return new Cesium.PolygonHierarchy(activeShapePoints);
                    }
                    return activeShapePoints;
                }, false);
                activeShape = drawShape(dynamicPositions); //绘制动态图
            }
            activeShapePoints.push(earthPosition);
            showPointArr.push(createPoint(earthPosition));
            console.log('LEFT_CLICK' + activeShapePoints.length);
            if (drawingMode == 'rectangle' && activeShapePoints.length > 2) {
                terminateShape();
            }
        }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    //鼠标移动
    handler.setInputAction(function (event) {
        if (Cesium.defined(floatingPoint)) {
            //var newPosition = viewer.scene.pickPosition(event.endPosition);
            var newPosition = getCatesian3FromPX(event.endPosition);
            if (Cesium.defined(newPosition)) {
                floatingPoint.position.setValue(newPosition);
                activeShapePoints.pop();
                activeShapePoints.push(newPosition);
            }
        }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

    // Redraw the shape so it's not dynamic and remove the dynamic shape.
    function terminateShape() {
        activeShapePoints.pop(); //去除最后一个动态点
        that.searchForm.area ?
            that.searchForm.area = "(" + that.searchForm.area.substring(0, that.searchForm.area.length - 2) + ")" : false;

        if (activeShapePoints.length) {
            drawShape(activeShapePoints); //绘制最终图
        }
        that.mapData.viewer.entities.remove(floatingPoint); //去除动态点图形（当前鼠标点）
        that.mapData.viewer.entities.remove(activeShape); //去除动态图形
        floatingPoint = undefined;
        activeShape = undefined;
        activeShapePoints = [];
    }
    //右键
    handler.setInputAction(function (event) {
        //terminateShape();
        var pick = that.mapData.viewer.scene.pick(event.position);
        if (Cesium.defined(pick) && pick.id) {
            that.mapData.viewer.entities.remove(pick.id);
            /*this.handler.destroy();
            this.handler = null;*/
        }
        showPointArr.forEach(function (item, index) {
            that.mapData.viewer.entities.remove(item);
        })
        showPointArr = [];
        that.searchForm.area = '';
        handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK)//移除事件
    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);

    // var options = [{
    //       text: 'Draw Lines',
    //       onselect: function () {
    //             terminateShape();
    //             drawingMode = 'line';
    //       }
    // }, {
    //       text: 'Draw Polygons',
    //       onselect: function () {
    //             terminateShape();
    //             drawingMode = 'polygon';
    //       }
    // }, {
    //       text: 'Draw Circle',
    //       onselect: function () {
    //             terminateShape();
    //             drawingMode = 'circle';
    //       }
    // }, {
    //       text: 'Draw Rectangle',
    //       onselect: function () {
    //             terminateShape();
    //             drawingMode = 'rectangle';
    //       }
    // }];
    terminateShape();
    drawingMode = 'rectangle';//矩形
    // Sandcastle.addToolbarMenu(options);
    // Zoom in to an area with mountains
    // that.mapData.viewer.camera.lookAt(Cesium.Cartesian3.fromDegrees(-122.2058, 46.1955, 1000.0), new Cesium.Cartesian3(5000.0,
    //       5000.0, 5000.0));
    // that.mapData.viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
    that.mapData.viewer.scene.globe.depthTestAgainstTerrain = true;//开启地形深度检测，如果鼠标指针和点不重合，这个选项设置为true试试。

}

//定位
export const location = function (that, adr) {
    that.$store.getters.patternState ? locationC(adr, that) : locationL(adr, that);
}
export const locationC = function (adr, that) {
    that.mapData.viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(adr.coordinates[1], adr.coordinates[0], adr.magnificationC),//经度、纬度、高度
        orientation: {
            heading: Cesium.Math.toRadians(348.4202942851978),//绕垂直于地心的轴旋转
            pitch: Cesium.Math.toRadians(-89.74026687972041),//绕纬度线旋转
            roll: Cesium.Math.toRadians(0)//绕经度线旋转
        },
        complete: function callback() {
        }
    });
}
export const locationL = function (adr, that) {
    that.mapData.map.setView(adr.coordinates, adr.magnificationL)
}

//增加标注
export const addLabel = function (that, id, name, position) {
    var myIcon = L.divIcon({
        html: "",
        className: 'my-div-icon',
        iconSize: size
    });
    that.patternState ?
        that.mapData.viewer.entities.add({
            id: id,
            name: name,
            position: Cesium.Cartesian3.fromDegrees(position[0], position[1]),
            //点样式
            point: {
                pixelSize: 20,
                color: Cesium.Color.RED,
                outlineColor: Cesium.Color.WHITE,
                outlineWidth: 1
            },
            //立广告牌
            // billboard: {
            //       position : new Cesium.Cartesian3(4.0, 5.0, 6.0),
            //       image: '../../assets/image/icon/temper.png',
            //       // show: true, // default
            //       width: 25, // default: undefined
            //       height: 25 // default: undefined
            // },
            //字体标签样式
            // label: {
            //       text: '',
            //       font: '14pt',
            //       color: Cesium.Color.RED,
            //       style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            //       outlineWidth: 1,
            //       //垂直位置
            //       //verticalOrigin : Cesium.VerticalOrigin.BUTTON,
            //       //中心位置
            //       pixelOffset: new Cesium.Cartesian2(0, 20)
            // }
        }) : L.marker([position[1], position[0]], { icon: myIcon }).addTo(that.mapData.map);;
}
export const removeLavle = function (that, id) {
    if (that.patternState) {
        var getByIdBox = that.mapData.viewer.entities.getById(id);
        that.mapData.viewer.entities.remove(getByIdBox);
    } else {

    }
}
//修改色带
export const changeRibbonClass = function (searchId) {
    if (searchId == '2') {//海面温度
        return { showRibbon: true, name: 'seas_9Ribbon' };
    } else if (searchId == '1' || searchId == '8' || searchId == '5') {//海面风场 云水含量
        return { showRibbon: true, name: 'seas_1Ribbon' };
    } else if (searchId == 'seas_3' || searchId == '4') {//有效波高
        return { showRibbon: true, name: 'seas_3Ribbon' };
    } else if (searchId == 'seas_6') {//海面高度
        return { showRibbon: true, name: 'seas_6Ribbon' };
    } else if (searchId == 'part2_2' || searchId == '6' || searchId == 's3') {//叶绿素浓度 大气水含量
        return { showRibbon: true, name: 'part2_2Ribbon' };
    } else if (searchId == 'zoology6') {//水体光漫衰减系数
        return { showRibbon: true, name: 'part2_5Ribbon' };
    } else if (searchId == 's3') {//海岛植被覆盖率
        return { showRibbon: true, name: 'monitor_7Ribbon' };
    } else if (searchId == 'part2_3') {//悬浮物浓度
        return { showRibbon: true, name: 'part2_3Ribbon' };
    } else if (searchId == 'zoology3') {//海水透明度
        return { showRibbon: true, name: 'part2_4Ribbon' };
    } else {
        return { showRibbon: false, name: '' };
    }
}
//设置色带
export const setRibbonList = function (i) {
    let ribbonList;
    if (i.id == '2') {//海面温度
        ribbonList = ['℃', '34', '30', '29.7', '29.3', '28.8', '28.6', '28.2', '24', '16', '8', '2', '-2'];
    }
    else if (i.id == 'part2_2') {//叶绿素浓度
        ribbonList = ['mg/m^3', '30.0', '18', '9.0', '3.0', '1.0', '0.200', '0.030', '0.023', '0.016'];
    }
    else if (i.id == '6') {//大气水含量
        ribbonList = ['kg/m²', '30.0', '18', '9.0', '3.0', '1.0', '0.200', '0.030', '0.023', '0.016'];
    }
    else if (i.id == '1' || i.id == '8') {//海面风场  海面风速
        ribbonList = ['m/s', '50', '43.68', '38.26', '30.63', '25.35', '20', '15.35', '10', '5.35'];
    }
    else if (i.id == '5') {//云水含量
        ribbonList = ['kg/m²', '50', '43.68', '38.26', '30.63', '25.35', '20', '15.35', '10', '5.35'];
    }
    else if (i.id == 'seas_6') {//海面高度
        ribbonList = ['m', '150', '90', '65.5', '44.5', '20', '-15', '-43', '-71', '-99', '-150'];
    }
    else if (i.id == 'seas_3' || i.id == '4') {//有效波高
        ribbonList = ['m', '150', '90', '65.5', '44.5', '-20', '-15', '-43', '-71', '-99', '-120', '-150'];
    }
    else if (i.id == 'zoology6') {//水体光漫衰减系数
        ribbonList = ['1.2', '1.1', '1.0', '0.9', '0.8', '0.7', '0.6', '0.5', '0.4', '0.3', '0.2', '0.1', '0'];
    }
    else if (i.id == 's3') {//海岛植被覆盖率
        ribbonList = ['1.0', '0.95', '0.85', '0.75', '0.65', '0.55', '0.45', '0.35', '0.25', '0.15', '0.05'];
    }
    else if (i.id == 'part2_3') {//悬浮物浓度
        ribbonList = ['g/m^3', '150', '140', '135', '115', '97', '75', '55', '35', '15', '0'];
    }
    else if (i.id == 'zoology3') {//海水透明度
        ribbonList = ['≥50(m)', '45.0', '40.0', '35.0', '30.0', '25.0', '20.0', '15.0', '10.0', '5.0'];
    }
    return ribbonList;
}
