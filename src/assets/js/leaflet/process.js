/**
 * @Description: 流线加载
 * @author mengfanbo
 * @date 2019/7/16
 */
import * as L from 'leaflet'
var canvas; //画布
//主函数
export const buildVector = function (that, type, data) {

    var map = that.mapData.map;
    //主流程开始
    //各种定义和参数
    var lon_min, lat_min, x_kuadu, y_kuadu, ni, nj;
    var grid = []; //定义经纬度网格数组
    var particles = []; //存放粒子数组
    var PARTICLE_MULTIPLIER = 1 / 50; //粒子数量参数，默认1/300，可以根据实际调
    var max_age = 100; //定义粒子的最大运动次数
    //没有风的情况
    var NULL_WIND_VECTOR = [NaN, NaN, null];
    var min_color = 1; // 风速为0使用的颜色
    var max_color = 10; // 风速最大使用的颜色
    var linewidth = 0.1; //定义粒子粗细,默认1.5
    var FRAME_RATE = 35, //定义每秒执行的次数35
        FRAME_TIME = 1000 / FRAME_RATE; // desired frames per second
    var galpha = 0.92; //定义透明度，透明度越大，尾巴越长0.92
    //存放颜色的数组
    var colorScale = ["rgb(44, 62, 80)", "rgb(30, 59, 107)", "rgb(27, 106, 122)", "rgb(30, 148, 116)", "rgb(22, 173, 35)", "rgb(131,176,17)", "rgb(193,196,15)", "rgb(230,129,14)", "rgb(255,12,8)"];
    //粒子动画的速度，为参数乘以屏幕的像素密度开三次方
    //如果不支持像素密度，就乘以1,
    //默认0.0005
    var vscale = 0.008; //粒子动画的速度
    if ('ocean_current' === type) { //海流效果
        PARTICLE_MULTIPLIER = 1 / 80; //粒子数量参数
        linewidth = 3; //定义粒子粗细
        FRAME_RATE = 40; //定义每秒执行的次数
        galpha = 0.98; //定义透明度，透明度越大，尾巴越长
        vscale = 0.04; //粒子动画的速度
        // colorScale = ["rgb(44, 62, 80)", "rgb(93, 109, 126)", "rgb(178, 186, 187)", "rgb(213, 219, 219)", "rgb(242, 243, 244)", "rgb(255,255,255)"];

        colorScale = ["rgb(255,255,255)"];


    }


    var animationLoop; //定义动画
    //第一步生成经纬度网格///////////////////////////////////////////////////surface-currents
    // $.getJSON(url, function (data) {
    setTimeout(function () {
        buildGrid(data);
        map.fire("moveend");
    }, 100)
    // })
    //第二步生成插值网格//////////////////////////////////////
    var columns = []; //存放插值网格数组
    var start = Date.now();
    var bwidth = map.getSize().x,
        bheight = map.getSize().y;
    var bx = 0,
        by = 0;
    var projection = {};
    var mbounds = map.getBounds();
    var now_bounds = {
        east: deg2rad(mbounds._northEast.lng),
        west: deg2rad(mbounds._southWest.lng),
        north: deg2rad(mbounds._northEast.lat),
        south: deg2rad(mbounds._southWest.lat),
        height: bheight,
        width: bwidth
    }
    var mapArea = (now_bounds.south - now_bounds.north) * (now_bounds.west - now_bounds.east);
    var velocityScale = vscale * Math.pow(mapArea, 0.4);

    var isValue = function isValue(x) {
        return x !== null && x !== undefined;
    };
    var mercY = function mercY(lat) {
        return Math.log(Math.tan(lat / 2 + Math.PI / 4));
    };

    var project = function project(lat, lon, windy) {
        // both in radians, use deg2rad if neccessary
        var ymin = mercY(windy.south);
        var ymax = mercY(windy.north);
        var xFactor = windy.width / (windy.east - windy.west);
        var yFactor = windy.height / (ymax - ymin);
        var y = mercY(deg2rad(lat));
        var x = (deg2rad(lon) - windy.west) * xFactor;
        var y = (ymax - y) * yFactor; // y points south
        return [x, y];
    };
    //第三步初始化生成粒子///////////////////////////////////
    var randomize = function (o) {
        // UNDONE: this method is terrible
        var x, y;
        var safetyNet = 0;
        do {
            x = Math.round(Math.floor(Math.random() * bwidth));
            y = Math.round(Math.floor(Math.random() * bheight));
        } while (field(x, y)[2] === null && safetyNet++ < 30);
        o.x = x;
        o.y = y;
        return o;
    };

    function field(x, y) {
        var column = columns[Math.round(x)];
        return column && column[Math.round(y)] || NULL_WIND_VECTOR;
    }


    //////////////////////
    //第四步,定义每次粒子的变化
    var colorStyles = windIntensityColorScale(min_color, max_color);
    var buckets = colorStyles.map(function () {
        return [];
    });

    function windIntensityColorScale(min, max) {

        colorScale.indexFor = function (m) {
            // map velocity speed to a style
            return Math.max(0, Math.min(colorScale.length - 1, Math.round((m - min) / (max - min) * (colorScale.length - 1))));
        };
        return colorScale;
    }

    //第五步,初始化画布，并画粒子
    canvas = L.DomUtil.create("canvas", "can");
    canvas.height = bheight;
    canvas.width = bwidth;
    //    var wind_pane = map.getPane("markerPane");
    //    //    canvas.style.background = "red";
    //    wind_pane.appendChild(canvas);
    var animated = map.options.zoomAnimation && L.Browser.any3d;
    //添加下面的class之后，图层可以随着地图缩放变化
    L.DomUtil.addClass(canvas, 'leaflet-zoom-' + (animated ? 'animated' : 'hide'));
    //把画布添加到overlayPane图层中
    map._panes.overlayPane.appendChild(canvas);
    var fadeFillStyle = "rgba(0, 0, 0, 0.97)";
    var g = canvas.getContext("2d");
    g.lineWidth = linewidth;
    g.fillStyle = fadeFillStyle;
    g.globalAlpha = 0.6;
    map.on("zoomanim", function (e) {
        var scale = map.getZoomScale(e.zoom);
        var bound = map.getBounds();
        var yun_lat1 = bound._northEast.lat;
        var yun_lon1 = bound._northEast.lng;
        var yun_lat2 = bound._southWest.lat;
        var yun_lon2 = bound._southWest.lng;
        var new_position = map.latLngToLayerPoint([yun_lat1, yun_lon2]);
        var offset = L.Layer ? map._latLngToNewLayerPoint(map.getBounds().getNorthWest(), e.zoom, e.center) : map.getCenterOffset(e.center).multiplyBy(-scale).subtract(map.getMapPanePos());
        L.DomUtil.setTransform(canvas, offset, scale);
    })
    map.on("moveend", function () {
        window.cancelAnimationFrame(animationLoop);
        bwidth = map.getSize().x,
            bheight = map.getSize().y;
        g.clearRect(0, 0, bwidth, bheight);
        canvas.height = bheight;
        canvas.width = bwidth;
        var bound = map.getBounds();
        var yun_lat1 = bound._northEast.lat;
        var yun_lon1 = bound._northEast.lng;
        var yun_lat2 = bound._southWest.lat;
        var yun_lon2 = bound._southWest.lng;
        var new_position = map.latLngToLayerPoint([yun_lat1, yun_lon2]);
        L.DomUtil.setPosition(canvas, new_position);
        bulid_grid();
        create_new_lizi();
        setTimeout(function () {
            var then = Date.now();
            (function frame() {
                animationLoop = requestAnimationFrame(frame);
                var now = Date.now();
                var delta = now - then;
                if (delta > FRAME_TIME) {
                    then = now - delta % FRAME_TIME;
                    evolve();
                    draw();
                }
            })();
        }, 200)

    });

    //主流程结束


    function buildGrid(data, callback) {
        var builder = createBuilder(data);
        var header = builder.header;
        lon_min = header.lo1; //小的经度
        lat_min = header.la1; // the grid's origin (e.g., 0.0E, 90.0N)
        //小纬度
        x_kuadu = header.dx; //x方向的跨度
        y_kuadu = header.dy; // distance between grid points (e.g., 2.5 deg lon, 2.5 deg lat)
        //y方向的跨度
        ni = header.nx; //x方向的总数
        nj = header.ny; //y方向的总数
        //        date = new Date(header.refTime);
        //        date.setHours(date.getHours() + header.forecastTime);
        //
        //        // Scan mode 0 assumed. Longitude increases from lon_min, and latitude decreases from lat_min.
        //        // http://www.nco.ncep.noaa.gov/pmb/docs/grib2/grib2_table3-4.shtml
        var p = 0;
        var isContinuous = Math.floor(ni * x_kuadu) >= 360;
        //x方向的跨度乘以x方向的数量是否大于360
        for (var j = nj - 1; j >= 0; j--) {
            var row = [];
            for (var i = 0; i < ni; i++, p++) {
                row[i] = builder.data(p);
            }
            if (isContinuous) {
                // For wrapped grids, duplicate first column as last column to simplify interpolation logic
                row.push(row[0]);
            }
            grid[j] = row;
        }
        //grid是一个三维数组
        //第一纬表示行数
        //第二纬表示列数
        //第三纬表示每一个网格点的uv
    };

    function interpolateColumn(x) {
        var column = [];
        //画布上的每两个像素是一个格点
        for (var y = 0; y <= bheight; y += 2) {
            var coord = invert(x, y, now_bounds);
            //求出每一个格点所对应的经纬度
            if (coord) {
                var λ = coord[0], //经度
                    φ = coord[1]; //纬度
                //监测经度是不是数字
                if (isFinite(λ)) {
                    var wind = interpolate(λ, φ);
                    //每一个格点的uv和风速大小
                    if (wind) {
                        wind = distort(projection, λ, φ, x, y, velocityScale, wind, now_bounds);
                        //wind 表示粒子x方向的像素速度，y方向上的像素速度和风速
                        column[y + 1] = column[y] = wind;
                    }
                }
            }
        }
        //相邻两个格点用相同的速度
        columns[x + 1] = columns[x] = column;
    }

    function invert(x, y, windy) {
        var mapLonDelta = windy.east - windy.west; //经度跨度
        var worldMapRadius = windy.width / rad2deg(mapLonDelta) * 360 / (2 * Math.PI);
        var mapOffsetY = worldMapRadius / 2 * Math.log((1 + Math.sin(windy.south)) / (1 - Math.sin(windy.south)));
        var equatorY = windy.height + mapOffsetY;
        var a = (equatorY - y) / worldMapRadius;

        var lat = 180 / Math.PI * (2 * Math.atan(Math.exp(a)) - Math.PI / 2);
        var lon = rad2deg(windy.west) + x / windy.width * rad2deg(mapLonDelta);
        return [lon, lat];
    };

    function deg2rad(deg) {
        return deg / 180 * Math.PI;
    };

    function rad2deg(ang) {
        return ang / (Math.PI / 180.0);
    };

    function floorMod(a, n) {
        return a - n * Math.floor(a / n);
    };

    function interpolate(λ, φ) {
        //如果风场网格数据不存在，就不执行
        if (!grid) return null;
        //λ, φ分别是每个网格点的经度和纬度
        var i = floorMod(λ - lon_min, 360) / x_kuadu; // calculate longitude index in wrapped range [0, 360)
        //lat_min应该是上面的纬度，大的一个
        var j = (lat_min - φ) / y_kuadu; // calculate latitude index in direction +90 to -90
        //计算网格点在从上到下，从左到右，以最小刻度为0的第几个经纬度格点上
        var fi = Math.floor(i), //格点的上一行
            ci = fi + 1; //格点的下一行
        var fj = Math.floor(j), //格点的前一列
            cj = fj + 1; //格点的后一列
        var row;
        if (row = grid[fj]) {
            var g00 = row[fi];
            var g10 = row[ci];
            if (isValue(g00) && isValue(g10) && (row = grid[cj])) {
                var g01 = row[fi];
                var g11 = row[ci];
                //计算出格点周围4个点
                if (isValue(g01) && isValue(g11)) {
                    // All four points found, so interpolate the value.
                    return bilinearInterpolateVector(i - fi, j - fj, g00, g10, g01, g11);
                }
            }
        }
        return null;
    };

    function bilinearInterpolateVector(x, y, g00, g10, g01, g11) {
        //y表示格点距离上一个经纬度格点的距离
        //x表示格点距离前一个经纬度给点的距离
        var rx = 1 - x;
        var ry = 1 - y;
        var a = rx * ry,
            b = x * ry,
            c = rx * y,
            d = x * y;
        var u = g00[0] * a + g10[0] * b + g01[0] * c + g11[0] * d;
        var v = g00[1] * a + g10[1] * b + g01[1] * c + g11[1] * d;
        return [u, v, Math.sqrt(u * u + v * v)];
        //返回格点插值出来u和v还有速度
    };

    function distort(projection, λ, φ, x, y, scale, wind, windy) {
        //projection是一个空的对象
        // λ, φ格点的经纬度
        //x, y格点所在的像素点
        //格点的风向风速
        //windy
        //scale 一个参数，每次粒子运动的距离
        var u = wind[0] * scale;
        var v = wind[1] * scale;
        var d = distortion(projection, λ, φ, x, y, windy);

        // Scale distortion vectors by u and v, then add.
        wind[0] = d[0] * u + d[2] * v;
        wind[1] = d[1] * u + d[3] * v;
        return wind;
    };

    function distortion(projection, λ, φ, x, y, windy) {
        var τ = 2 * Math.PI;
        var H = Math.pow(10, -5.2);
        var hλ = λ < 0 ? H : -H;
        var hφ = φ < 0 ? H : -H;

        var pλ = project(φ, λ + hλ, windy);
        var pφ = project(φ + hφ, λ, windy);

        // Meridian scale factor (see Snyder, equation 4-3), where R = 1. This handles issue where length of 1º λ
        // changes depending on φ. Without this, there is a pinching effect at the poles.
        var k = Math.cos(φ / 360 * τ);
        return [(pλ[0] - x) / hλ / k, (pλ[1] - y) / hλ / k, (pφ[0] - x) / hφ, (pφ[1] - y) / hφ];
    };

    function bulid_grid() {
        columns = []; //存放插值网格数组
        start = Date.now();
        bx = 0,
            by = 0;
        projection = {};
        mbounds = map.getBounds();
        now_bounds = {
            east: deg2rad(mbounds._northEast.lng),
            west: deg2rad(mbounds._southWest.lng),
            north: deg2rad(mbounds._northEast.lat),
            south: deg2rad(mbounds._southWest.lat),
            height: bheight,
            width: bwidth
        }
        mapArea = (now_bounds.south - now_bounds.north) * (now_bounds.west - now_bounds.east);
        velocityScale = vscale * Math.pow(mapArea, 0.4);
        batchInterpolate();
    }

    function create_new_lizi() {
        particles.length = 0;
        var particleCount = Math.round(bwidth * bheight * PARTICLE_MULTIPLIER);
        //计算粒子的数量
        for (var i = 0; i < particleCount; i++) {
            particles.push(randomize({
                age: Math.floor(Math.random() * max_age)
            }));
        }
    }

    function batchInterpolate() {
        while (bx < bwidth) {
            interpolateColumn(bx);
            bx += 2;
            if (Date.now() - start > 10000) {
                //MAX_TASK_TIME) {
                setTimeout(batchInterpolate, 25); //如果粒子生成时间大于1秒了，就不再生成
                return;
            }
        }
    }

    function evolve() {
        //清除风点数组
        buckets.forEach(function (bucket) {
            bucket.length = 0;
        });
        //particles是存放所有点的数组
        particles.forEach(function (particle) {
            //如果粒子运行的次数大于设定的最大次数
            //重新随机粒子的位置，并把次数定义成0
            if (particle.age > max_age) {
                randomize(particle).age = 0;
            }
            var x = particle.x;
            var y = particle.y;
            var v = field(x, y); // vector at current position
            var m = v[2];
            if (m === null) {
                //如果没有速度,就让age是最大值，重新随机点
                particle.age = max_age; // particle has escaped the grid, never to return...
            } else {
                var xt = x + v[0];
                var yt = y + v[1];
                if (field(xt, yt)[2] !== null) {
                    // Path from (x,y) to (xt,yt) is visible, so add this particle to the appropriate draw bucket.
                    particle.xt = xt;
                    particle.yt = yt;
                    buckets[colorStyles.indexFor(m)].push(particle);
                } else {
                    // Particle isn't visible, but it still moves through the field.
                    particle.x = xt;
                    particle.y = yt;
                }
            }
            particle.age += 1;
        });
    }

    function draw() {
        // Fade existing particle trails.
        var prev = "lighter";
        g.globalCompositeOperation = "destination-in";
        g.fillRect(0, 0, bwidth, bheight);
        g.globalCompositeOperation = prev;
        g.globalAlpha = galpha;

        // Draw new particle trails.
        //buckets是把风点按照不同颜色分级，分成的数组
        //数组的每一项是一个对象，
        buckets.forEach(function (bucket, i) {
            if (bucket.length > 0) {
                g.beginPath();
                g.strokeStyle = colorStyles[i];
                bucket.forEach(function (particle) {
                    g.moveTo(particle.x, particle.y);
                    g.lineTo(particle.xt, particle.yt);
                    particle.x = particle.xt;
                    particle.y = particle.yt;
                });
                g.stroke();
            }
        });
    }
}

function createBuilder(data) {
    var uComp = null,
        vComp = null,
        scalar = null;
    //从这里判断出，数据中的这两个参数，必须是固定的，否则会不执行
    data.forEach(function (record) {
        switch (record.header.parameterCategory + "," + record.header.parameterNumber) {
            case "1,2":
            case "2,2":
                uComp = record;
                break;
            case "1,3":
            case "2,3":
                vComp = record;
                break;
            default:
                scalar = record;
        }
    });
    return createWindBuilder(uComp, vComp);
};

function createWindBuilder(uComp, vComp) {
    var uData = uComp.data,
        vData = vComp.data;
    return {
        header: uComp.header,
        //recipe: recipeFor("wind-" + uComp.header.surface1Value),
        data: function data(i) {
            return [uData[i], vData[i]];
        }
    };
};

export const removeCanvas = function (el) {
    // var parent = el.parentNode;
    // if (parent) { parent.remove(el); }
    // L.DomUtil.addClass(el, 'hiddenClass');
    canvas && canvas.isConnected && el._panes.overlayPane.removeChild(canvas);
}
