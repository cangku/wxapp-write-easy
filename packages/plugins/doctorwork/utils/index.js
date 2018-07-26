import initNativeApi from './native-api';
import wxrequest from './wxrequest';

// 初始化原生API
let nativeApi = Object.create(null);
initNativeApi(nativeApi);

// 工具方法
export function hello() {
    console.log('hello');
}

export {
    nativeApi   
}

export default {
    hello,
    ...nativeApi
}