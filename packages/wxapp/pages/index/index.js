let myPluginInterface = requirePlugin('doctorwork');
let { hello, getStorage } = myPluginInterface.utils;
hello();
getStorage({
        key: 'haha'
    })
    .then(res => {
        console.log(res);
    })
    .catch(e => {
        throw e;
    })

class Index {
    data = {
        a: 123
    }

    onLoad() {
        hello()
    }

    forward() {
        wx.navigateTo({
            url: '/doctorwork/pages/lucky/index'
        });
    }
}

let pageConfig = Object.create(null);
Object.getOwnPropertyNames(Index.prototype).filter(key => {
    return key ? (pageConfig[key] = Index.prototype[key]) : false;
})

let instance = new Index();
Object.getOwnPropertyNames(instance).filter(key => {
    return key ? (pageConfig[key] = instance[key]) : false;
})

Page(pageConfig);