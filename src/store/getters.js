const getters = {
    mapUrl: state => state.app.mapUrl,
    imgUrl: state => state.app.imgUrl,
    geoserverUrl: state => state.app.geoserverUrl,
    workingArea: state => state.app.workingArea,
    systematicName: state => state.app.systematicName,
    sysImage: state => state.app.sysImage,

    drawCoordinate: state => state.draw.drawCoordinate,
    chartTitle: state => state.chart.chartTitle,
    patternState: state => state.map.patternState,
    baseMap: state => state.map.baseMap,
    screenData: state => state.map.screenData,
    curtainState: state => state.map.curtainState,
    curtainLayers: state => state.map.curtainLayers,

}
export default getters