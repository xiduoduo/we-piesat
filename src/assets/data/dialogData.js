import store from '@/store/store'
var imgUrl = store.getters.imgUrl;

export const dialogData = {
    environmentDiolag: {
        title: '近海海洋环境',
        children: [
            { title: '海面风场', disabled: false, id: '1', name: 'seas_1', switch: false, },
            { title: '海流', disabled: false, id: 'hl1', name: 'seas_11', switch: false, },
            { title: '海面温度', disabled: false, id: '2', name: 'seas_9', switch: false, },
            { title: '海面风速', disabled: false, id: '8', name: 'seas_5', switch: false, },
            { title: '大气水气含量', disabled: false, id: '6', name: 'seas_8', switch: false, },
            { title: '云液水含量', disabled: false, id: '5', name: 'seas_7', switch: false, },
            { title: '有效波高', disabled: false, id: '4', name: 'seas_3', switch: false, },
        ]
    },
    monitorDiolag: {
        title: '海洋资源规划',
        children: [
            { title: '海域使用', disabled: false, id: 'hysy', name: 'hysy', switch: false, },
            { title: '海岛资源', disabled: false, id: 'hdzy', name: 'hdzy', switch: false, },
            { title: '岸线变化', disabled: false, id: 'axbh', name: 'axbh', switch: false, },
            { title: '海洋牧场监测', disabled: false, id: 's2', name: 's2', switch: false, },
            { title: '海岛变化', disabled: false, id: 's4', name: 's4', switch: false, },
            { title: '船舶位置监测', disabled: false, id: 'resource1', name: 'resource1', switch: false },
            { title: '滨海湿地遥感监测', disabled: false, id: 'resource2', name: 'resource2', switch: false },
            { title: '建设项目用海监测', disabled: false, id: 'resource3', name: 'resource3', switch: false },
            { title: '海岸线变化监测', disabled: false, id: 'resource4', name: 'resource4', switch: false },
        ]
    },
    temperatureDiolag: {
        title: '海洋生态监测',
        children: [
            // { title: '紫菜筏架监测', disabled: false, id: 'zcfj', name: 'zcfj', switch: false, },
            { title: '浒苔绿潮监测', disabled: false, id: 'htlc', name: 'htlc', switch: false, },
            { title: '浒苔防控工作', disabled: false, id: 'htfk', name: 'htfk', switch: false, },
            { title: '海岛植被变化', disabled: false, id: 's3', name: 's3', switch: false, },
            { title: '叶绿素浓度', disabled: false, id: 'zoology1', name: 'zoology1', switch: false, },
            { title: '赤潮监测', disabled: false, id: 'zoology2', name: 'zoology2', switch: false, },
            { title: '海水透明度', disabled: false, id: 'zoology3', name: 'zoology3', switch: false, },
            { title: '水体光漫衰减系数', disabled: false, id: 'zoology6', name: 'zoology6', switch: false, },
            { title: '溢油遥感监测', disabled: false, id: 'zoology4', name: 'zoology4', switch: false, },
            { title: '潮流监测', disabled: true, id: 'zoology8', name: 'zoology8', switch: false, },
            { title: '悬浮物浓度', disabled: false, id: 'zoology5', name: 'zoology5', switch: false, },
            { title: '绿潮监测', disabled: true, id: 'zoology7', name: 'zoology7', switch: false, },
        ]
    },
    preventing: {
        title: '防灾减灾',
        children: [
            { title: '防灾减灾', disabled: false, id: 's1', name: 's1', switch: false, },
            { title: '台风监测', disabled: false, id: 'typhoon', name: 's1typhoon', switch: false, },
        ]
    },
    applicationDiolag: {
        title: '可定制服务',
        children: [
            {
                title: '河口水质监测', disabled: false, id: 'customization1', name: 'customization1', switch: false,
                imgType: 3,
                imgData: {
                    1: imgUrl + '/河口悬浮物.png',
                    2: imgUrl + '/河口叶绿素.png',
                }

            },
            {
                title: '红树林监测', disabled: false, id: 'customization2', name: 'customization2', switch: false,
                imgType: 1,
                imgData: {
                    1: imgUrl + '/红树林.png',
                }
            },
            {
                title: '海岸线变迁监测', disabled: false, id: 'customization3', name: 'customization3', switch: false,
                imgType: 3,
                imgData: {
                    1: imgUrl + '/2018影像.png',
                    2: imgUrl + '/1999影像.png',
                }
            },
            {
                title: '围填海遥感监测', disabled: false, id: 'customization4', name: 'customization4', switch: false,
                imgType: 3,
                imgData: {
                    1: imgUrl + '/曹妃甸2018.png',
                    2: imgUrl + '/曹妃甸1999.png',
                }
            },
            {
                title: '近岸违章建筑监测', disabled: false, id: 'customization5', name: 'customization5', switch: false,
                imgType: 3,
                imgData: {
                    1: imgUrl + '/近岸违章对比后时像.png',
                    2: imgUrl + '/近岸违章对比前时像.png',
                }
            },
            {
                title: '近海养殖区监测', disabled: false, id: 'customization6', name: 'customization6', switch: false,
                imgType: 2,
                imgData: {
                    1: imgUrl + '/netCage.png',
                }
            },
            {
                title: '灾情遥感监测', disabled: false, id: 'customization7', name: 'customization7', switch: false,
                imgType: 3,
                imgData: {
                    1: imgUrl + '/2.jpg',
                    2: imgUrl + '/3.jpg',
                }
            },
        ]
    }

}
