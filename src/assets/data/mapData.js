//本地数据存储
export const mapData = {
    viewer: null,
    map: null,
    screenShow: false,

    viewListInfo: {
        map0: null,
        map1: null,
        map2: null,
        map3: null,
    },
    earthAtNight: null,//拉帘图层
    earthAtNightLine: null,//拉帘样式
    screenData: {},
    showMapType: 0, //页面位置
    spatialOrientation: null, //空间定位图层
    viewLayers: {},
    overlyName: [],
    setTileLayer: null,
    queryLocat: [],
    cageLayer: [],
    imgageIdArr: [],//添加图片id
    resultImg: [], //成果展示图层
    mapType: null, //地图类型
};