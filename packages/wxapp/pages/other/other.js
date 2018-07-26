// var myPluginInterface = requirePlugin('doctorwork')
// myPluginInterface.hello();

Page({
    data: {
        msg: []
    },
    onLoad({ abc }) {
        console.log(abc);
        // wx.redirectTo({
        //     url: 'plugin://doctorwork/lucky'
        // });
    },
    onShareAppMessage(options) {
        let { msg } = this.data;
        console.log(options, msg);
        return {
            title: msg[0].a,
            path: '/pages/index/index'
        }
    },
    msg({ detail: { data } }) {
        console.log(data);
        this.setData({
            msg: data
        });
    },
    toPluginPage() {
        wx.navigateTo({
            url: 'plugin://doctorwork/lucky'
        })
    }
})