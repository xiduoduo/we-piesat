var jsonData = {};
export const DataProcess = {
    loadNetCDF: function (filePath) {
        var data;
        return new Promise(function (resolve) {
            var request = new XMLHttpRequest();
            request.open('GET', filePath);
            request.responseType = 'arraybuffer';

            request.onload = function () {
                var arrayToMap = function (array) {
                    return array.reduce(function (map, object) {
                        map[object.name] = object;
                        return map;
                    }, {});
                }

                var NetCDF = new netcdfjs(request.response);
                data = {};

                var dimensions = arrayToMap(NetCDF.dimensions);
                data.dimensions = {};
                data.dimensions.lon = dimensions['lon'].size;
                data.dimensions.lat = dimensions['lat'].size;
                data.dimensions.lev = dimensions['lev'].size;

                var variables = arrayToMap(NetCDF.variables);
                var uAttributes = arrayToMap(variables['U'].attributes);
                var vAttributes = arrayToMap(variables['V'].attributes);

                data.lon = {};
                data.lon.array = new Float32Array(NetCDF.getDataVariable('lon').flat());
                data.lon.min = Math.min(...data.lon.array);
                data.lon.max = Math.max(...data.lon.array);

                data.lat = {};
                data.lat.array = new Float32Array(NetCDF.getDataVariable('lat').flat());
                data.lat.min = Math.min(...data.lat.array);
                data.lat.max = Math.max(...data.lat.array);

                data.lev = {};
                data.lev.array = new Float32Array(NetCDF.getDataVariable('lev').flat());
                data.lev.min = Math.min(...data.lev.array);
                data.lev.max = Math.max(...data.lev.array);

                data.U = {};
                data.U.array = new Float32Array(NetCDF.getDataVariable('U').flat());
                data.U.min = uAttributes['min'].value;
                data.U.max = uAttributes['max'].value;

                data.V = {};
                data.V.array = new Float32Array(NetCDF.getDataVariable('V').flat());
                data.V.min = vAttributes['min'].value;
                data.V.max = vAttributes['max'].value;

                resolve(data);
            };

            request.send();
        });
    },
    //loadJson end.
    loadData: async function (jsonUrl) {
        // await ;
        return await loadJson(jsonUrl);
    },
    randomizeParticles: function (maxParticles, viewerParameters) {
        var array = new Float32Array(4 * maxParticles);
        for (var i = 0; i < maxParticles; i++) {
            array[4 * i] = Cesium.Math.randomBetween(viewerParameters.lonRange.x, viewerParameters.lonRange.y);
            array[4 * i + 1] = Cesium.Math.randomBetween(viewerParameters.latRange.x, viewerParameters.latRange.y);
            array[4 * i + 2] = Cesium.Math.randomBetween(jsonData.lev.min, jsonData.lev.max);
            array[4 * i + 3] = 0.0;
        }
        return array;
    },
};

//加载json数据
function loadJson(jsonPath) {
    return new Promise(function (resolve) {

        var uComponent = null,
            vComponent = null,
            header = null;

        var request = new XMLHttpRequest();
        request.open('GET', jsonPath);
        request.responseType = 'json';
        request.onload = function () {
            var windData = request.response;
            //var windData = response;
            windData.forEach(function (record) {
                var type = record.header.parameterCategory + "," + record.header.parameterNumber;
                switch (type) {
                    case "2,2":
                        uComponent = record['data'];
                        header = record['header'];
                        break;
                    case "2,3":
                        vComponent = record['data'];
                        break;
                    default:
                        break;
                }
            });

            jsonData.dimensions = {};
            jsonData.dimensions.lon = header['nx'];
            jsonData.dimensions.lat = header['ny'];
            jsonData.dimensions.lev = 1;

            //经度信息
            jsonData.lon = {};
            let lonMin = header['lo1'];
            let lonMax = header['lo2'];
            let lonInterval = header['dx'];
            let lonArr = [];
            for (let i = 0; i < jsonData.dimensions.lon; i++) {
                lonArr[i] = lonMin + i * lonInterval;
            }
            jsonData.lon.array = new Float32Array(lonArr);
            jsonData.lon.min = lonMin;
            jsonData.lon.max = lonMax;

            //纬度信息
            jsonData.lat = {};
            let latMin = header['la2'];
            let latMax = header['la1'];
            let latInterval = header['dy'];
            var latArr = [];
            for (let i = 0; i < jsonData.dimensions.lat; i++) {
                latArr[i] = latMin + i * latInterval;
            }
            jsonData.lat.array = new Float32Array(latArr);
            jsonData.lat.min = latMin;
            jsonData.lat.max = latMax;

            //高度属性默认1
            jsonData.lev = {};
            jsonData.lev.array = new Float32Array([1]);
            jsonData.lev.min = 1;
            jsonData.lev.max = 1;

            jsonData.U = {};
            jsonData.U.array = new Float32Array(uComponent);
            jsonData.U.min = header['uMax'];
            jsonData.U.max = header['uMin'];

            jsonData.V = {};
            jsonData.V.array = new Float32Array(vComponent);
            jsonData.V.min = header['vMax'];
            jsonData.V.max = header['vMin'];

            resolve(jsonData);
        };
        request.send();
    })
}
