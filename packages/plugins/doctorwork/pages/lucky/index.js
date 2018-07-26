Page({

    /**
     * 页面的初始数据
     */
    data: {
        href: 'plugin-private://wxa55012c93c6aae46/pages/lucky/detail',
        isPlugin: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        if (/^__plugin__/.test(this.route)) {
            this.setData({ isPlugin: true });
        }
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    },

    /**
     * @description 以页面形式引用时跳转详情页
     * @example <button bindtap="forward" data-url="plugin-private://APPID/pages/lucky/detail">返回</button>
     */
    forward({ target: { dataset: { url } } }) {
        url = url.replace('plugin-private://\w*', '/doctorwork');
        wx.navigateTo({
            url
        });
    }
})