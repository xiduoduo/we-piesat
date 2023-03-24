
import store from '@/store/store'
var mapUrl = store.getters.mapUrl;
var imgUrl = store.getters.imgUrl;

export const setDataList = function (type) {
    let listData = [];
    //演示demo
    if (type == 1) {//风场
        listData = [
            /* {
                 isShow: false,
                 dataName: 'MUL_OPER_OWV_L4A_FU_00H_20210222T18_dps_250_20_owv',
                 showWind: true,
                 windUrl: mapUrl + '/json/MUL_OPER_OWV_L4A_FU_06H_20210823T06_dps_250_20_owv.json',
                 layerMap: {
                     1: 'visual_space:MUL_OPER_OWV_L4A_FU_06H_20210523T00_dps_250_20_owv_windSpeed'
                 },
                 particlesType: 'wind',
             },*/
            {
                isShow: false,
                dataName: 'MUL_OPER_OWV_L4A_FU_06H_20210823T06_dps_250_20_owv',
                showWind: true,
                windUrl: mapUrl + '/json/MUL_OPER_OWV_L4A_FU_06H_20210823T06_dps_250_20_owv.json',
                particlesType: 'wind',
            },
            {
                isShow: false,
                //showWind: true,
                dataName: 'MUL_OPER_OWV_L4A_FU_06H_20201108_dps_250_10_owv',
                windUrl: mapUrl + '/json/MUL_OPER_OWV_L4A_FU_06H_20201108_dps_250_10_owv.json',
                layerMap: {
                    1: 'visual_space:MUL_OPER_OWV_L4A_FU_06H_20201108_dps_250_10_owv0geo',
                    2: 'visual_space:MUL_OPER_OWV_L4A_FU_06H_20201108_dps_250_10_owv0windDirShpFile'
                },
                particlesType: 'wind',
            },
            /*{
                isShow: false,
                dataName: 'MUL_OPER_OWV_L4A_FU_06H_20210523T18_dps_250_20_owv',
                showWind: true,
                windUrl: mapUrl + '/json/MUL_OPER_OWV_L4A_FU_06H_20210823T06_dps_250_20_owv.json',
                layerMap: { 1: 'visual_space:MUL_OPER_OWV_L4A_FU_06H_20210523T00_dps_250_20_owv_windSpeed' },
                particlesType: 'wind',
            },*/

            {
                isShow: false,
                dataName: 'MUL_OPER_OWV_L4A_FU_06H_20210823T12_dps_250_20_owv',
                showWind: true,
                windUrl: mapUrl + '/json/MUL_OPER_OWV_L4A_FU_06H_20210823T12_dps_250_20_owv.json',
                particlesType: 'wind',
            },
            {
                isShow: false,
                dataName: 'MUL_OPER_OWV_L4A_FU_06H_20210823T18_dps_250_20_owv',
                showWind: true,
                windUrl: mapUrl + '/json/MUL_OPER_OWV_L4A_FU_06H_20210823T18_dps_250_20_owv.json',
                particlesType: 'wind',
            },
            {
                isShow: false,
                dataName: 'MUL_OPER_OWV_L4A_FU_06H_20210824T00_dps_250_20_owv',
                showWind: true,
                windUrl: mapUrl + '/json/MUL_OPER_OWV_L4A_FU_06H_20210824T00_dps_250_20_owv.json',
                particlesType: 'wind',
            },
            {
                isShow: false,
                dataName: 'MUL_OPER_OWV_L4A_FU_06H_20210823T06_dps_250_20_owv',
                showWind: true,
                windUrl: mapUrl + '/json/MUL_OPER_OWV_L4A_FU_06H_20210823T06_dps_250_20_owv.json',
            },
            {
                isShow: false,
                dataName: 'MUL_OPER_OWV_L4A_FU_06H_20210823T12_dps_250_20_owv',
                showWind: true,
                windUrl: mapUrl + '/json/MUL_OPER_OWV_L4A_FU_06H_20210823T12_dps_250_20_owv.json',
            },
            {
                isShow: false,
                dataName: 'MUL_OPER_OWV_L4A_FU_06H_20210823T18_dps_250_20_owv',
                showWind: true,
                windUrl: mapUrl + '/json/MUL_OPER_OWV_L4A_FU_06H_20210823T18_dps_250_20_owv.json',
            },
            {
                isShow: false,
                dataName: 'MUL_OPER_OWV_L4A_FU_06H_20210824T00_dps_250_20_owv',
                showWind: true,
                windUrl: mapUrl + '/json/MUL_OPER_OWV_L4A_FU_06H_20210824T00_dps_250_20_owv.json',
            },
        ];
    }
    if (type == 'hl1') {// 海流
        listData = [
            {
                isShow: false,
                dataName: 'dt_global_allsat_phy_l4_20130101_20190101',
                showWind: true,
                windUrl: mapUrl + '/json/dt_global_allsat_phy_l4_20130101_20190101.json',
                particlesType: 'ocean_current',
            },
            {
                isShow: false,
                dataName: 'dt_global_allsat_phy_l4_20130401_20190101',
                showWind: true,
                windUrl: mapUrl + '/json/dt_global_allsat_phy_l4_20130401_20190101.json',
                particlesType: 'ocean_current',
            },
            {
                isShow: false,
                dataName: 'dt_global_allsat_phy_l4_20130701_20190101',
                showWind: true,
                windUrl: mapUrl + '/json/dt_global_allsat_phy_l4_20130701_20190101.json',
                particlesType: 'ocean_current',
            },
            {
                isShow: false,
                dataName: 'dt_global_allsat_phy_l4_20131201_20190101',
                showWind: true,
                windUrl: mapUrl + '/json/dt_global_allsat_phy_l4_20131201_20190101.json',
                particlesType: 'ocean_current',
            },
        ]
    }
    if (type == 2) {//海温
        listData = [
            {
                isShow: false,
                dataName: 'MUL_OPER_SST_L4A_FU_12H_20210521T12_dps_050_10_sst',
                layerMap: { 1: 'visual_space:MUL_OPER_SST_L4A_FU_12H_20210521T12_dps_050_10_sst' },
            },
            {
                isShow: false,
                dataName: 'MUL_OPER_SST_L4A_FU_12H_20210521T24_dps_050_10_sst',
                layerMap: { 1: 'visual_space:MUL_OPER_SST_L4A_FU_12H_20210521T24_dps_050_10_sst' },
            },
            {
                isShow: false,
                dataName: 'GF1_PMS1_E121.1_N28.0_20210204_L1A0005453889',
                layerMap: { 1: 'geoserver:GF1_PMS1_E121.1_N28.0_20210204_L1A0005453889' },
            },
        ];
    }
    if (type == 4) {//有效波高
        listData = [];
    }
    if (type == 5) {//云液水含量
        listData = [{
            isShow: false,
            dataName: 'H2B_OPER_SMR_L3_MD_GL_20210524_20210524_01_CL_ASC',
            layerMap: { 1: 'visual_space:H2B_OPER_SMR_L3_MD_GL_20210524_20210524_01_CL_ASC' },
        },
        {
            isShow: false,
            dataName: 'H2B_OPER_SMR_L3_MD_GL_20210524_20210524_01_CL_DES',
            layerMap: { 1: 'visual_space:H2B_OPER_SMR_L3_MD_GL_20210524_20210524_01_CL_DES' },
        }
        ];
    }
    if (type == 6) {//大气水气含量
        listData = [{
            isShow: false,
            dataName: 'H2B_OPER_SMR_L3_MD_GL_20210524_20210524_01_WV_ASC',
            layerMap: { 1: 'visual_space:H2B_OPER_SMR_L3_MD_GL_20210524_20210524_01_WV_ASC' },
        },
        {
            isShow: false,
            dataName: 'H2B_OPER_SMR_L3_MD_GL_20210524_20210524_01_WV_DES',
            layerMap: { 1: 'visual_space:H2B_OPER_SMR_L3_MD_GL_20210524_20210524_01_WV_DES' },
        }
        ];
    }
    if (type == 8) {//海面风速
        listData = [
            {
                isShow: false,
                dataName: 'MUL_OPER_OWV_L4A_FU_06H_20210523T00_dps_250_20_owv_windSpeed',
                layerMap: { 1: 'visual_space:MUL_OPER_OWV_L4A_FU_06H_20210523T00_dps_250_20_owv_windSpeed' },
            },
            {
                isShow: false,
                dataName: 'MUL_OPER_OWV_L4A_FU_06H_20210523T06_dps_250_20_owv_windSpeed',
                layerMap: { 1: 'visual_space:MUL_OPER_OWV_L4A_FU_06H_20210523T06_dps_250_20_owv_windSpeed' },
            },
            {
                isShow: false,
                dataName: 'MUL_OPER_OWV_L4A_FU_06H_20210523T12_dps_250_20_owv_windSpeed',
                layerMap: { 1: 'visual_space:MUL_OPER_OWV_L4A_FU_06H_20210523T12_dps_250_20_owv_windSpeed' },
            },
            {
                isShow: false,
                dataName: 'MUL_OPER_OWV_L4A_FU_06H_20210523T18_dps_250_20_owv_windSpeed',
                layerMap: { 1: 'visual_space:MUL_OPER_OWV_L4A_FU_06H_20210523T18_dps_250_20_owv_windSpeed' },
            }
        ];
    }
    if (type == 'resource1') {//船舶位置监测
        listData = [
            {
                isShow: false,
                dataName: 'GF3_KRN_NSC_012226_E39.9_S29.4_20181206_L2_HV_L20003731299',
                layerMap: { 1: 'visual_space:GF3_KRN_NSC_012226_E39.9_S29.4_20181206_L2_HHHV_L20003731299_4326' },
                adr: {
                    coordinates: [-29.1930, 39.9471],
                    magnificationC: 1295922,
                    magnificationL: 7
                }
            },
            {
                isShow: false,
                dataName: 'ship_GF3_KRN_NSC_012226_E39.9_S29.4_20181206_L2_HV_L20003731299',
                layerMap: { 1: 'visual_space:GF3_KRN_NSC_012226_E39.9_S29.4_20181206_L2_HHHV_L20003731299_ship' },
                adr: {
                    coordinates: [-29.1930, 39.9471],
                    magnificationC: 1295922,
                    magnificationL: 7
                }
            },
            {
                isShow: false,
                dataName: 'GF3_KRN_NSC_012421_E40.1_S28.5_20181219_L2_HV_L20003749157',
                layerMap: { 1: 'visual_space:GF3_KRN_NSC_012421_E40.1_S28.5_20181219_L2_HHHV_L20003749157_4326' },
                adr: {
                    coordinates: [-29.1930, 39.9471],
                    magnificationC: 1295922,
                    magnificationL: 7
                }
            },
            {
                isShow: false,
                dataName: 'ship_GF3_KRN_NSC_012421_E40.1_S28.5_20181219_L2_HV_L20003749157',
                layerMap: { 1: 'visual_space:GF3_KRN_NSC_012421_E40.1_S28.5_20181219_L2_HHHV_L20003749157_ship' },
                adr: {
                    coordinates: [-29.1930, 39.9471],
                    magnificationC: 1295922,
                    magnificationL: 7
                }
            },

            {
                isShow: false,
                dataName: 'GF3_KRN_FSI_012283_E55.0_S23.8_20181210_L2_HV_L20003749160',
                layerMap: { 1: 'visual_space:GF3_KRN_FSI_012283_E55.0_S23.8_20181210_L2_HHHV_L20003749160_4326' },
                adr: {
                    coordinates: [-23.675, 55.12361],
                    magnificationC: 2263965,
                    magnificationL: 9
                }
            },
            {
                isShow: false,
                dataName: 'ship_GF3_KRN_FSI_012283_E55.0_S23.8_20181210_L2_HV_L20003749160',
                layerMap: { 1: 'visual_space:GF3_KRN_FSI_012283_E55.0_S23.8_20181210_L2_HHHV_L20003749160_ship' },
                adr: {
                    coordinates: [-23.675, 55.12361],
                    magnificationC: 2263965,
                    magnificationL: 9
                }
            },
        ];
    }
    if (type == 'zoology3') {//海水透明度
        listData = [
            {
                isShow: false,
                dataName: 'SD',
                id: 'zoology3',
                imgPath: 'SD',
                locat: {
                    1: [0, 100],
                    2: [29.2, 150]
                },
                adr: {
                    coordinates: [20.79, 124.71],
                    magnificationC: 14367348,
                    magnificationL: 4
                }
            }
        ]
    }
    if (type == 'zoology8') {//潮 流监测
        listData = [
            {
                isShow: false,
                dataName: 'CL',
                id: 'zoology8',
                imgPath: 'CL',
                locat: {
                    1: [12.3, 104.7],
                    2: [28.6, 129.9]
                },
                adr: {
                    coordinates: [25, 121.62741991765374],
                    magnificationC: 14367348,
                    magnificationL: 5
                }
            },
        ]
    }
    if (type == 'zoology6') {//水体光漫衰减系数
        listData = [{
            isShow: false,
            dataName: 'KD490',
            id: 'zoology6',
            imgPath: 'KD490',
            locat: {
                1: [0, 100],//左上角坐标
                2: [29.2, 150] // 右下角坐标
            },
            adr: {
                coordinates: [20.79, 124.71],
                magnificationC: 14367348,
                magnificationL: 4
            }
        }]
    }
    if (type == 'zoology1') {//叶绿素浓度
        listData = [
            {
                isShow: false,
                dataName: 'H1C_OPER_OCT_L3B_20210515_20210522_8D_CHL_4KM_10',
                layerMap: { 1: 'visual_space:H1C_OPER_OCT_L3B_20210515_20210522_8D_CHL_4KM_10' },
                adr: {
                    coordinates: [28.01, 121.79],
                    magnificationC: 9744032,
                    magnificationL: 3
                }
            },
            {
                isShow: false,
                dataName: 'H1C_OPER_OCT_L3A_20210523_CHL_4KM_13',
                layerMap: { 1: 'visual_space:H1C_OPER_OCT_L3A_20210523_CHL_4KM_13' },
                adr: {
                    coordinates: [28.01, 121.79],
                    magnificationC: 9744032,
                    magnificationL: 3
                }
            },
            {
                isShow: false,
                dataName: 'H1C_OPER_OCT_L3A_20210524_CHL_4KM_13',
                layerMap: { 1: 'visual_space:H1C_OPER_OCT_L3A_20210524_CHL_4KM_13' },
                adr: {
                    coordinates: [28.01, 121.79],
                    magnificationC: 9744032,
                    magnificationL: 3
                }
            },
        ];
    }
    if (type == 'zoology4') {//溢油遥感监测
        listData = [
            {
                isShow: false,
                dataName: 'oil_spill',
                layerMap: { 1: 'visual_space:oil_spill_zh' },
                adr: {
                    coordinates: [21.7211, 113.64268],
                    magnificationC: 121105,
                    magnificationL: 10
                }
            }
        ];
    }
    if (type == 's2') {//牧场监测
        listData = [
            {
                isShow: false,
                dataName: 'GF6_PMS_E121.0_N27.6_20200130_L1A1119963704-MUX',
                layerMap: { 1: 'visual_space:GF6_PMS_E121.0_N27.6_20200130_L1A1119963704-MUX' },
                adr: {
                    coordinates: [28, 121.09],
                    magnificationC: 605868,
                    magnificationL: 9
                }
            },
            {
                isShow: false,
                dataName: '20200130',
                layerMap: { 1: 'visual_space:20200130' },
                adr: {
                    coordinates: [27.82, 121.16],
                    magnificationC: 121105,
                    magnificationL: 10
                }
            },
            {
                isShow: false,
                dataName: 'GF6_PMS_E121.0_N27.6_20200130_L1A1119963704-MUX_Ortho_ROI',
                layerMap: { 1: 'visual_space:GF6_PMS_E121.0_N27.6_20200130_L1A1119963704-MUX_Ortho_ROI' },
                adr: {
                    coordinates: [27.82, 121.16],
                    magnificationC: 121105,
                    magnificationL: 10
                }
            },
            {
                isShow: false,
                dataName: '养殖网箱专题图1.jpg',
                showImg: true,
                imgType: 1,
                filePath: {
                    1: imgUrl + "/养殖网箱专题图.jpg"
                }
            },
            {
                isShow: false,
                dataName: '养殖网箱专题图2.png',
                showImg: true,
                imgType: 1,
                filePath: {
                    1: imgUrl + "/养殖网箱专题图.png"
                }
            },
        ];
    }
    if (type == 's4') {//海岛变化
        listData = [
            {
                isShow: false,
                dataName: 'GF1_WFV4_E118_N39_20160126_L1A0001771206-resize',
                layerMap: { 1: 'visual_space:GF1_WFV4_E118_N39_20160126_L1A0001771206-resize' },
                adr: {
                    coordinates: [30.32, 122],
                    magnificationC: 81078,
                    magnificationL: 14
                }
            },
            {
                isShow: false,
                dataName: 'GF1_WFV4_E118_N39_20200816_L1A00017712061-resize',
                layerMap: { 1: 'visual_space:GF1_WFV4_E118_N39_20200816_L1A00017712061-resize' },
                adr: {
                    coordinates: [30.32, 122],
                    magnificationC: 81078,
                    magnificationL: 14
                }
            },
            {
                isShow: false,
                dataName: '舟山大鱼山',
                layerMap: { 1: 'visual_space:舟山大鱼山' },
                adr: {
                    coordinates: [30.32, 122],
                    magnificationC: 81078,
                    magnificationL: 14
                }
            },
            {
                isShow: false,
                dataName: '舟山大鱼山_20160126',
                layerMap: { 1: 'visual_space:舟山大鱼山_20160126' },
                adr: {
                    coordinates: [30.32, 122],
                    magnificationC: 81078,
                    magnificationL: 14
                }
            },
            {
                isShow: false,
                dataName: '舟山大鱼山_20200816',
                layerMap: { 1: 'visual_space:舟山大鱼山_20200816' },
                adr: {
                    coordinates: [30.32, 122],
                    magnificationC: 81078,
                    magnificationL: 14
                }
            },
            {
                isShow: false,
                dataName: '舟山大鱼山_20160126_20200816',
                layerMap: { 1: 'visual_space:舟山大鱼山_20160126_20200816' },
                adr: {
                    coordinates: [30.32, 122],
                    magnificationC: 81078,
                    magnificationL: 14
                }
            },
            {
                isShow: false,
                dataName: 'GF1_WFV3_E1212_1621235062605_layer',
                layerMap: { 1: 'visual_space:GF1_WFV3_E1212_1621235062605_layer' },
                adr: {
                    coordinates: [30.32, 121.93],
                    magnificationC: 81078,
                    magnificationL: 14
                }
            },
            {
                isShow: false,
                dataName: '舟山大鱼山_20160126_20200816',
                layerMap: { 1: 'visual_space:舟山大鱼山_20160126_20200816' },
                adr: {
                    coordinates: [30.32, 121.93],
                    magnificationC: 81078,
                    magnificationL: 14
                }
            },
            {
                isShow: false,
                dataName: '20160126期大鱼山及周边岛屿海岛边界图.png',
                showImg: true,
                imgType: 1,
                filePath: {
                    1: imgUrl + "/20160126期大鱼山及周边岛屿海岛边界图.png"
                }
            },
            {
                isShow: false,
                dataName: '20200816期大鱼山及周边岛屿海岛边界图.png',
                showImg: true,
                imgType: 1,
                filePath: {
                    1: imgUrl + "/20200816期大鱼山及周边岛屿海岛边界图.png"
                }
            },
            {
                isShow: false,
                dataName: '20160126-20200816期大鱼山及周边岛屿海岛变化图.png',
                showImg: true,
                imgType: 1,
                filePath: {
                    1: imgUrl + "/20160126-20200816期大鱼山及周边岛屿海岛变化图.png"
                }
            },
            {
                isShow: false,
                dataName: 'GF1_WFV4_E118_N39_20160126_L1A0001771206-resize',
                layerMap: { 1: 'visual_space:GF1_WFV4_E118_N39_20160126_L1A0001771206-resize' },
                adr: {
                    coordinates: [30.32, 121.93],
                    magnificationC: 81078,
                    magnificationL: 14
                }
            },
            {
                isShow: false,
                dataName: 'GF1_WFV4_E118_N39_20200816_L1A00017712061-resize',
                layerMap: { 1: 'visual_space:GF1_WFV4_E118_N39_20200816_L1A00017712061-resize' },
                adr: {
                    coordinates: [30.32, 121.93],
                    magnificationC: 81078,
                    magnificationL: 14
                }
            },
        ];
    }
    if (type == 's3') {//海岛植被变化
        listData = [
            {
                isShow: false,
                dataName: 'vegetationCover1',
                layerMap: { 1: 'visual_space:vegetationCover1' },
                adr: {
                    coordinates: [27.86, 121.09],
                    magnificationC: 121105,
                    magnificationL: 13
                }
            },
            {
                isShow: false,
                dataName: 'vegetationCover8',
                layerMap: { 1: 'visual_space:vegetationCover8' },
                adr: {
                    coordinates: [27.86, 121.09],
                    magnificationC: 121105,
                    magnificationL: 13
                }
            },
            {
                isShow: false,
                dataName: 'vegetationCoverchange',
                layerMap: { 1: 'visual_space:vegetationCoverchange' },
                adr: {
                    coordinates: [27.86, 121.09],
                    magnificationC: 121105,
                    magnificationL: 13
                }
            },
        ];
    }
    if (type == 's1') {//防灾减灾
        listData = [
            {
                isShow: false,
                dataName: '20210711-20210725-02',
                layerMap: { 1: 'visual_space:20210711-20210725-02' },
                adr: {
                    coordinates: [29.12, 121.69],
                    magnificationC: 252306,
                    magnificationL: 10
                }
            },
            {
                isShow: false,
                dataName: 's1b-iw-grd-vh-20210725t215043-20210725t215108-027956-0355e9-002_Calibration_ortho_Db_clip',
                layerMap: { 1: 'visual_space:s1b-iw-grd-vh-20210725t215043-20210725t215108-027956-0355e9-002_Calibration_ortho_Db_clip' },
                adr: {
                    coordinates: [29.12, 121.69],
                    magnificationC: 252306,
                    magnificationL: 10
                }
            },
            {
                isShow: false,
                dataName: '20210711-20210725哨兵与高分三烟花台风局部淹没区-2.png',
                showImg: true,
                imgType: 1,
                filePath: {
                    1: imgUrl + "/20210711-20210725哨兵与高分三烟花台风局部淹没区-2.png"
                }
            },
            {
                isShow: false,
                dataName: '乐清市2020年黑格比台风淹没区',
                layerMap: { 1: 'visual_space:乐清市2020年黑格比台风淹没区' },
                adr: {
                    coordinates: [28.29, 121.04],
                    magnificationC: 9902,
                    magnificationL: 14
                }
            },
            {
                isShow: false,
                dataName: 'GF3_KAS_FSI_020_1621240252417_layer',
                layerMap: { 1: 'visual_space:GF3_KAS_FSI_020_1621240252417_layer' },
                adr: {
                    coordinates: [28.22, 121.10],
                    magnificationC: 103894,
                    magnificationL: 13
                }
            },
            {
                isShow: false,
                dataName: 'GF3_MYN_UFS_021_1621240254234_layer',
                layerMap: { 1: 'visual_space:GF3_MYN_UFS_021_1621240254234_layer' },
                adr: {
                    coordinates: [28.22, 121.10],
                    magnificationC: 103894,
                    magnificationL: 13
                }
            },
            {
                isShow: false,
                dataName: '乐清市2020年黑格比台风淹没区专题图.png',
                showImg: true,
                imgType: 1,
                filePath: {
                    1: imgUrl + "/乐清市2020年黑格比台风淹没区专题图.png"
                }
            },
        ];
    }
    if (type == 'zoology2') {//赤潮监测
        listData = [

            {
                isShow: false,
                dataName: 'T20200427_1',
                layerMap: { 1: 'visual_space:T20200427_1' },
                adr: {
                    coordinates: [29.182, 122.5057],
                    magnificationC: 1106543,
                    magnificationL: 7
                }
            },
            {
                isShow: false,
                dataName: 'T20200513_3',
                layerMap: { 1: 'visual_space:T20200513_3' },
                adr: {
                    coordinates: [29.182, 122.5057],
                    magnificationC: 1106543,
                    magnificationL: 7
                }
            },
            {
                isShow: false,
                dataName: 'VJ20200722_4',
                layerMap: { 1: 'visual_space:VJ20200722_4' },
                adr: {
                    coordinates: [29.182, 122.5057],
                    magnificationC: 1106543,
                    magnificationL: 7
                }
            },
            // {
            //     isShow: false,
            //     dataName: '20200427',
            //     layerMap: { 1: 'visual_space:20200427' },
            // },
            {
                isShow: false,
                dataName: 'T20200427_9',
                layerMap: { 1: 'visual_space:T20200427_9' },
                adr: {
                    coordinates: [29.182, 122.5057],
                    magnificationC: 1106543,
                    magnificationL: 7
                }
            },
            {
                isShow: false,
                dataName: '20200427',
                showImg: true,
                imgType: 1,
                filePath: {
                    1: imgUrl + "/20200427.png",
                }
            },
        ];
    }
    if (type == "zoology5") {//悬浮物浓度
        listData = [
        ]
    }
    if (type == 'resource3') {//建设项目用海监测
        listData = [
            {
                isShow: false,
                dataName: '横沙岛围填海',
                showImg: true,
                imgType: 3,
                filePath: {
                    1: imgUrl + "/横沙岛围填海末期.jpg",
                    2: imgUrl + "/横沙岛围填海基期.jpg",
                }
            },
            {
                isShow: false,
                dataName: '金山围填海',
                showImg: true,
                imgType: 3,
                filePath: {
                    1: imgUrl + "/金山围填海末期.jpg",
                    2: imgUrl + "/金山围填海基期.jpg",
                }
            },
            {
                isShow: false,
                dataName: '20150208期海陆分界线',
                showImg: true,
                imgType: 1,
                filePath: {
                    1: imgUrl + "/js图片1.png",
                }
            },
            {
                isShow: false,
                dataName: '20151122期海陆分界线',
                showImg: true,
                imgType: 1,
                filePath: {
                    1: imgUrl + "/js图片2.png",
                }
            },
            {
                isShow: false,
                dataName: '20150208期-20151122期变化图斑',
                showImg: true,
                imgType: 1,
                filePath: {
                    1: imgUrl + "/js图片3.png",
                }
            },
            {
                isShow: false,
                dataName: '20151122期海陆分界线',
                showImg: true,
                imgType: 1,
                filePath: {
                    1: imgUrl + "/js图片4.png",
                }
            },
            {
                isShow: false,
                dataName: '20170109期海陆分界线',
                showImg: true,
                imgType: 1,
                filePath: {
                    1: imgUrl + "/js图片5.png",
                }
            },
            {
                isShow: false,
                dataName: '20151122期-20151122期变化图斑',
                showImg: true,
                imgType: 1,
                filePath: {
                    1: imgUrl + "/js图片6.png",
                }
            },

        ]
    }
    if (type == 'resource4') {//海岸线变化监测
        listData = [
            {
                isShow: false,
                dataName: '1990年曹妃甸面积',
                showImg: true,
                imgType: 1,
                filePath: {
                    1: imgUrl + "/1990年曹妃甸面积.png",
                }
            },
            {
                isShow: false,
                dataName: '2009年曹妃甸面积',
                showImg: true,
                imgType: 1,
                filePath: {
                    1: imgUrl + "/2009年曹妃甸面积.png",
                }
            },
            {
                isShow: false,
                dataName: '2018年曹妃甸面积',
                showImg: true,
                imgType: 1,
                filePath: {
                    1: imgUrl + "/2018年曹妃甸面积.png",
                }
            },
        ]
    }
    if (type == 'resource2') {//滨海湿地遥感监测
        listData = [
            {
                isShow: false,
                dataName: '滨海湿地遥感监测1',
                showImg: true,
                imgType: 1,
                filePath: {
                    1: imgUrl + "/sd图片1.png",
                }
            },
            {
                isShow: false,
                dataName: '滨海湿地遥感监测2',
                showImg: true,
                imgType: 1,
                filePath: {
                    1: imgUrl + "/sd图片4.png",
                }
            },
            {
                isShow: false,
                dataName: '滨海湿地遥感监测3',
                showImg: true,
                imgType: 1,
                filePath: {
                    1: imgUrl + "/sd图片2.png",
                }
            },
            {
                isShow: false,
                dataName: '滨海湿地遥感监测4',
                showImg: true,
                imgType: 1,
                filePath: {
                    1: imgUrl + "/sd图片3.png",
                }
            },
            {
                isShow: false,
                dataName: '滨海湿地遥感监测5',
                showImg: true,
                imgType: 1,
                filePath: {
                    1: imgUrl + "/sd图片5.png",
                }
            },
            {
                isShow: false,
                dataName: '滨海湿地遥感监测6',
                showImg: true,
                imgType: 1,
                filePath: {
                    1: imgUrl + "/sd图片6.png",
                }
            },
        ]
    }
    if (type == 'typhoon') { //台风监测
        listData = [
            {
                isShow: false,
                dataName: 'CFOSAT_SCA_SSW_ECS_20210722105836',
                showImg: true,
                imgType: 1,
                filePath: {
                    1: imgUrl + "/CFOSAT_SCA_SSW_ECS_20210722105836.jpg",
                }
            },
            {
                isShow: false,
                dataName: 'HY-2B_SCA_SSW_ECS_20210722222918',
                showImg: true,
                imgType: 1,
                filePath: {
                    1: imgUrl + "/HY-2B_SCA_SSW_ECS_20210722222918.jpg",
                }
            },
            {
                isShow: false,
                dataName: 'HY-2B_SCA_SSW_SCS_20210722223402',
                showImg: true,
                imgType: 1,
                filePath: {
                    1: imgUrl + "/HY-2B_SCA_SSW_SCS_20210722223402.jpg",
                }
            },
            {
                isShow: false,
                dataName: 'METOPB_SM_SSW_ECS_20210723100909',
                showImg: true,
                imgType: 1,
                filePath: {
                    1: imgUrl + "/METOPB_SM_SSW_ECS_20210723100909.jpg",
                }
            },
            {
                isShow: false,
                dataName: 'METOPB_SM_SSW_SCS_20210723101837',
                showImg: true,
                imgType: 1,
                filePath: {
                    1: imgUrl + "/METOPB_SM_SSW_SCS_20210723101837.jpg",
                }
            },
            {
                isShow: false,
                dataName: 'METOPA_SM_SSW_ECS_20210724083000',
                showImg: true,
                imgType: 1,
                filePath: {
                    1: imgUrl + "/METOPA_SM_SSW_ECS_20210724083000.jpg",
                }
            },
            {
                isShow: false,
                dataName: 'METOPA_SM_SSW_WPI_20210724083826',
                showImg: true,
                imgType: 1,
                filePath: {
                    1: imgUrl + "/METOPA_SM_SSW_WPI_20210724083826.jpg",
                }
            },
            {
                isShow: false,
                dataName: 'METOPA_SM_SSW_SCS_20210724083933',
                showImg: true,
                imgType: 1,
                filePath: {
                    1: imgUrl + "/METOPA_SM_SSW_SCS_20210724083933.jpg",
                }
            },
            {
                isShow: false,
                dataName: 'HY-2B_SCA_SSW_ECS_20210803214435',
                showImg: true,
                imgType: 1,
                filePath: {
                    1: imgUrl + "/HY-2B_SCA_SSW_ECS_20210803214435.jpg",
                }
            },
            {
                isShow: false,
                dataName: 'HY-2B_SCA_SSW_SCS_20210803214923',
                showImg: true,
                imgType: 1,
                filePath: {
                    1: imgUrl + "/HY-2B_SCA_SSW_SCS_20210803214923.jpg",
                }
            },
            {
                isShow: false,
                dataName: 'HY-2B_SCA_SSW_ECS_20210804215450',
                showImg: true,
                imgType: 1,
                filePath: {
                    1: imgUrl + "/HY-2B_SCA_SSW_ECS_20210804215450.jpg",
                }
            },
            {
                isShow: false,
                dataName: 'HY-2B_SCA_SSW_ECS_20210804220658',
                showImg: true,
                imgType: 1,
                filePath: {
                    1: imgUrl + "/HY-2B_SCA_SSW_ECS_20210804220658.jpg",
                }
            },
            {
                isShow: false,
                dataName: 'HY-2B_SCA_SSW_ECS_20210804220701',
                showImg: true,
                imgType: 1,
                filePath: {
                    1: imgUrl + "/HY-2B_SCA_SSW_ECS_20210804220701.jpg",
                }
            },
            {
                isShow: false,
                dataName: 'HY-2B_SCA_SSW_SCS_20210804221143',
                showImg: true,
                imgType: 1,
                filePath: {
                    1: imgUrl + "/HY-2B_SCA_SSW_SCS_20210804221143.jpg",
                }
            },
            {
                isShow: false,
                dataName: 'HY-2B_SCA_SSW_SCS_20210804221144',
                showImg: true,
                imgType: 1,
                filePath: {
                    1: imgUrl + "/HY-2B_SCA_SSW_SCS_20210804221144.jpg",
                }
            },

            {
                isShow: false,
                dataName: 'HY-2C_SCA_SSW_SCS_20210804145254599',
                showImg: true,
                imgType: 1,
                filePath: {
                    1: imgUrl + "/HY-2C_SCA_SSW_SCS_20210804145254599.jpg",
                }
            },


        ]
    }
    if (type == 'hysy') {//海域使用
        listData = [
            {
                isShow: false,
                dataName: '江苏海域海岛解译6期',
                layerMap: { 1: 'visual_space:江苏海域海岛使用现状解译_第六期' },
                adr: {
                    coordinates: [33.70, 120.99],
                    magnificationC: 1223281,
                    magnificationL: 7
                }
            },
            {
                isShow: false,
                dataName: '南通06期海域使用类型图',
                showImg: true,
                imgType: 1,
                filePath: {
                    1: imgUrl + "/南通海域使用现状_海域使用类型_202011_202012_.jpg",
                }
            },
            {
                isShow: false,
                dataName: '南通市202012影像图',
                showImg: true,
                imgType: 1,
                filePath: {
                    1: imgUrl + "/南通海域影像_202011_202012.jpg",
                }
            },
        ]
    }
    if (type == 'hdzy') {//海岛资源
        listData = [
            {
                isShow: false,
                dataName: '连岛影像',
                layerMap: { 1: 'visual_space:连岛' },
                adr: {
                    coordinates: [34.76, 119.40],
                    magnificationC: 155724,
                    magnificationL: 10
                }
            },
            {
                isShow: false,
                dataName: '连岛解译矢量',
                layerMap: { 1: 'visual_space:连岛解译矢量' },
                adr: {
                    coordinates: [34.76, 119.40],
                    magnificationC: 155724,
                    magnificationL: 10
                }
            },
            {
                isShow: false,
                dataName: '连岛卫星遥感影像图',
                showImg: true,
                imgType: 1,
                filePath: {
                    1: imgUrl + "/连岛卫星遥感影像.jpg",
                }
            },
            {
                isShow: false,
                dataName: '连岛土地覆盖图',
                showImg: true,
                imgType: 1,
                filePath: {
                    1: imgUrl + "/连岛土地覆盖图.jpg",
                }
            },
        ]
    }
    if (type == 'axbh') {//岸线变化
        listData = [
            {
                isShow: false,
                dataName: '南通市202012影像',
                layerMap: { 1: 'visual_space:南通市202011-12' },
                adr: {
                    coordinates: [32.132, 121.5057],
                    magnificationC: 321534,
                    magnificationL: 10
                }
            },
            {
                isShow: false,
                dataName: '南通岸线202010影像',
                layerMap: { 1: 'visual_space:南通岸线变化影像_202009_10' },
                adr: {
                    coordinates: [32.132, 121.5057],
                    magnificationC: 321534,
                    magnificationL: 10
                }
            },
            {
                isShow: false,
                dataName: '南通岸线202012影像',
                layerMap: { 1: 'visual_space:南通岸线变化影像_202011_12' },
                adr: {
                    coordinates: [32.132, 121.5057],
                    magnificationC: 321534,
                    magnificationL: 10
                }
            },
            {
                isShow: false,
                dataName: '江苏省海岸线遥感动态监测_第三期',
                layerMap: { 1: 'visual_space:江苏省海岸线遥感动态监测_第三期' },
                adr: {
                    coordinates: [33.37, 120.30],
                    magnificationC: 1026367,
                    magnificationL: 8
                }
            },
            {
                isShow: false,
                dataName: '南通岸线变化专题图',
                showImg: true,
                imgType: 1,
                filePath: {
                    1: imgUrl + "/南通岸线变化监测_202009_12.jpg",
                }
            },
        ]
    }
    if (type == 'htlc') {//浒苔绿潮监测
        listData = [
        
            {
                isShow: false,
                dataName: '20220624影像_HY1C',
                layerMap: { 1: 'visual_space:2022-06-24HY1C' },
                adr: {
                    coordinates: [34.577, 122.359],
                    magnificationC: 1223281,
                    magnificationL: 7
                }
            },
            {
                isShow: false,
                dataName: '20220624NDVI影像_HY1C',
                layerMap: { 1: 'visual_space:2022-06-24HY1C_NDVI' },
                adr: {
                    coordinates: [34.577, 122.359],
                    magnificationC: 1223281,
                    magnificationL: 7
                }
            },
            {
                isShow: false,
                dataName: '20220624分布范围',
                layerMap: { 1: 'visual_space:20220624HY1C_分布' },
                adr: {
                    coordinates: [34.577, 122.359],
                    magnificationC: 1223281,
                    magnificationL: 7
                }
            },
            {
                isShow: false,
                dataName: '20220624覆盖范围',
                layerMap: { 1: 'visual_space:20220624HY1C_绿潮' },
                adr: {
                    coordinates: [34.577, 122.359],
                    magnificationC: 1223281,
                    magnificationL: 7
                }
            },
            {
                isShow: false,
                dataName: '20220624专题图_近岸影像',
                showImg: true,
                imgType: 1,
                filePath: {
                    1: imgUrl + "/20220624黄海近岸藻类影像图.jpg",
                }
            },
            {
                isShow: false,
                dataName: '20220624专题图_监测图',
                showImg: true,
                imgType: 1,
                filePath: {
                    1: imgUrl + "/20220624黄海藻类监测专题图.jpg",
                }
            },
            {
                isShow: false,
                dataName: '20220624专题图_解译图',
                showImg: true,
                imgType: 1,
                filePath: {
                    1: imgUrl + "/20220624黄海藻类解译专题图.jpg",
                }
            },
            {
                isShow: false,
                dataName: '20220624专题图_黄海影像',
                showImg: true,
                imgType: 1,
                filePath: {
                    1: imgUrl + "/20220624黄海藻类影像图.jpg",
                }
            },

            //-----------------------------------
             {
                isShow: false,
                dataName: 'GF420210619影像',
                layerMap: { 1: 'visual_space:GF4_PMI_E119.8_N35.3_20210619_L1A0000391156_Orth_1' },
                adr: {
                    coordinates: [36.70, 119.99],
                    magnificationC: 1847426,
                    magnificationL: 6
                }
            },
            {
                isShow: false,
                dataName: 'GF420210619NDVI影像',
                layerMap: { 1: 'visual_space:GF4_PMI_E119.8_N35.3_20210619_L1A0000391156_Orth_1.tif_NDVI' },
                adr: {
                    coordinates: [36.70, 119.99],
                    magnificationC: 1847426,
                    magnificationL: 6
                }
            },
            
            {
                isShow: false,
                dataName: '20210619HY1D_分布',
                layerMap: { 1: 'visual_space:20210619HY1D_分布' },
                adr: {
                    coordinates: [35.52, 121.29],
                    magnificationC: 1312638,
                    magnificationL: 7
                }
            },
            {
                isShow: false,
                dataName: '20210619HY1D_绿潮',
                layerMap: { 1: 'visual_space:20210619HY1D_绿潮' },
                adr: {
                    coordinates: [35.52, 121.29],
                    magnificationC: 1312638,
                    magnificationL: 7
                }
            },
            
            {
                isShow: false,
                dataName: '20210619黄海藻类监测专题图',
                showImg: true,
                imgType: 1,
                filePath: {
                    1: imgUrl + "/0619黄海海域藻类卫星遥感监测专题图.jpg",
                }
            },
            {
                isShow: false,
                dataName: '20210619黄海藻类解译专题图',
                showImg: true,
                imgType: 1,
                filePath: {
                    1: imgUrl + "/0619黄海海域藻类卫星遥感解译专题图.jpg",
                }
            },
            {
                isShow: false,
                dataName: '20210619黄海藻类影像图',
                showImg: true,
                imgType: 1,
                filePath: {
                    1: imgUrl + "/0619黄海海域藻类卫星遥感影像图.jpg",
                }
            },
            {
                isShow: false,
                dataName: '20210619黄海近岸藻类影像图',
                showImg: true,
                imgType: 1,
                filePath: {
                    1: imgUrl + "/0619黄海近岸海域藻类卫星遥感影像图.jpg",
                }
            },
            
            {
                isShow: false,
                dataName: '20210619浒苔绿潮',
                showImg: true,
                imgType: 1,
                filePath: {
                    1: imgUrl + "/浒苔绿潮.jpg",
                }
            },

       ]
    }
    if (type == 'htfk') {//浒苔防控工作
        listData = [
            
              {
                  isShow: false,
                  dataName: '20230304影像_Sentinel2',
                  layerMap: { 1: 'visual_space:S2_MSIL1C_20230304T023609_mos1' },
                  adr: {
                      coordinates: [34.577, 122.359],
                      magnificationC: 1223281,
                      magnificationL: 7
                  }
              },
              {
                  isShow: false,
                  dataName: '20230304筏架分布_第12期',
                  layerMap: { 1: 'visual_space:2022-2023年第12期紫菜筏架解译矢量_20230304' },
                  adr: {
                      coordinates: [32.430, 121.423],
                      magnificationC: 411000,
                      magnificationL: 9
                  }
             },
             {
                  isShow: false,
                  dataName: '20230304筏架分布_减少_第12期',
                  layerMap: { 1: 'visual_space:2022-2023年第12期紫菜筏架解译矢量（减少）_20230304' },
                  adr: {
                      coordinates: [32.430, 121.423],
                      magnificationC: 411000,
                      magnificationL: 9
                  }
              },
              {
                  isShow: false,
                  dataName: '20230304筏架分布_增加_第12期',
                  layerMap: { 1: 'visual_space:2022-2023年第12期紫菜筏架解译矢量（增加）_20230304' },
                  adr: {
                      coordinates: [32.430, 121.423],
                      magnificationC: 411000,
                      magnificationL: 9
                  }
              },
              {
                  isShow: false,
                  dataName: '2022-2023年第12期_盐城-南通海域紫菜养殖筏架遥感解译分布图（缩略图）',
                  showImg: true,
                  imgType: 1,
                  filePath: {
                      1: imgUrl + "/2022-2023年第12期_盐城-南通海域紫菜养殖筏架遥感解译分布图（缩略图）.jpg",
                  }
              },
              {
                  isShow: false,
                  dataName: '20230304分布图_第12期',
                  showImg: true,
                  imgType: 1,
                  filePath: {
                      1: imgUrl + "/2022-2023年第12期_盐城-南通海域紫菜养殖筏架遥感解译分布图.jpg",
                  }
              },
            
             {
                 isShow: false,
                 dataName: '20220227影像1_Sentinel2',
                 layerMap: { 1: 'visual_space:S2B_MSIL2A_20220227T023639_N0400_R089_T51SUR_20220227T051223_resampled' },
                 adr: {
                     coordinates: [32.430, 121.423],
                     magnificationC: 411000,
                     magnificationL: 9
                 }
             },
             {
                  isShow: false,
                  dataName: '20220227影像2_Sentinel2',
                  layerMap: { 1: 'visual_space:S2B_MSIL2A_20220227T023639_N0400_R089_T51SUS_20220227T051223_resampled' },
                  adr: {
                      coordinates: [32.430, 121.423],
                      magnificationC: 411000,
                      magnificationL: 9
                  }
             },
             {
                  isShow: false,
                  dataName: '20220302筏架分布_第21期',
                  layerMap: { 1: 'visual_space:2021年第21期紫菜筏架解译矢量' },
                  adr: {
                      coordinates: [32.430, 121.423],
                      magnificationC: 411000,
                      magnificationL: 9
                  }
             },
             {
                 isShow: false,
                 dataName: '20220302分布图_第21期',
                 showImg: true,
                 imgType: 1,
                 filePath: {
                     1: imgUrl + "/2021-2022年第21期_盐城-南通海域紫菜养殖筏架遥感解译分布图.jpg",
                 }
             },
            //---------------------------------------------
            {
                isShow: false,
                dataName: 'S2A20201219影像',
                layerMap: { 1: 'visual_space:S2A_MSIL2A_20201219T024121' },
                adr: {
                    coordinates: [32.70, 121.36],
                    magnificationC: 1223281,
                    magnificationL: 7
                }
            },
            {
                isShow: false,
                dataName: '紫菜筏架10期解译',
                layerMap: { 1: 'visual_space:紫菜筏架_第十期_20201222' },
                adr: {
                    coordinates: [32.70, 121.36],
                    magnificationC: 1223281,
                    magnificationL: 7
                }
            },
            {
                isShow: false,
                dataName: '工作区遥感解译图',
                showImg: true,
                imgType: 1,
                filePath: {
                    1: imgUrl + "/工作区紫菜养殖筏架遥感解译图_第十期_附表格.jpg",
                }
            },
            {
                isShow: false,
                dataName: '浒苔防控',
                showImg: true,
                imgType: 1,
                filePath: {
                    1: imgUrl + "/浒苔防控.jpg",
                }
            },
        ]
    }
    if (type == 'zcfj') {//紫菜筏架
        listData = [

             {
                 isShow: false,
                 dataName: '20220227影像1_Sentinel2',
                 layerMap: { 1: 'visual_space:S2B_MSIL2A_20220227T023639_N0400_R089_T51SUR_20220227T051223_resampled' },
                 adr: {
                     coordinates: [32.430, 121.423],
                     magnificationC: 411000,
                     magnificationL: 9
                 },
                 infoType: 'new'
             },
             {
                  isShow: false,
                  dataName: '20220227影像2_Sentinel2',
                  layerMap: { 1: 'visual_space:S2B_MSIL2A_20220227T023639_N0400_R089_T51SUS_20220227T051223_resampled' },
                  adr: {
                      coordinates: [32.430, 121.423],
                      magnificationC: 411000,
                      magnificationL: 9
                  },
                  infoType: 'new'
             },
             {
                  isShow: false,
                  dataName: '20220302筏架分布_第21期',
                  layerMap: { 1: 'visual_space:2021年第21期紫菜筏架解译矢量' },
                  adr: {
                      coordinates: [32.430, 121.423],
                      magnificationC: 411000,
                      magnificationL: 9
                  },
                  infoType: 'new'
             },
             {
                 isShow: false,
                 dataName: '20220302分布图_第21期',
                 showImg: true,
                 imgType: 1,
                 filePath: {
                     1: imgUrl + "/2021-2022年第21期_盐城-南通海域紫菜养殖筏架遥感解译分布图.jpg",
                 },
                 infoType: 'new'
             },
            //---------------------------------------------
        ]
    }
    return listData;
}
