import { hello } from "../../doctorwork/index";
console.log(hello);
Page({
    data: {
        msg: []
    },
    onLoad({ abc = 'abc' }) {
        debugger;
        console.log('=>', abc);
        hello();
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
    }
})