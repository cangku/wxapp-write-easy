// 以插件的形式使用
let hello = requirePlugin('doctorwork');
hello();

// 以npm形式使用
const wxr = require("@unofficial/utils/dist/http/wx").default;


// mock get
for(let i = 0; i < 11; i++) {
    wxr.get('https://healthapp-pre.doctorwork.com/mobile/v1/vaccine/getVaccineList?openId=oQJr94yEjc_s5oIn-ZnOa_Rmtupw&vaccineType=0')
        .then(res => {
            console.log(i, res);
        })
        .catch(res => {
            console.log('error', res);
        })
}

Page({})