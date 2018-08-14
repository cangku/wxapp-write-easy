/*
 * @Author: unofficial
 * @Date: 2018-08-09 17:52:16
 * @Last Modified by: unofficial
 * @Last Modified time: 2018-08-10 17:18:59
 *
 * get post etc. 方法
 */

declare let Promise: any;

import { isFunction } from '../../basictype';
export default class Adapter {
    
    public interceptors = {
        request: null,
        response: null
    };

    /**
     * 
     * @param param 初始化请求，配置拦截器，基础配置
     */
    public setup({ interceptors }) {
        if (interceptors.request) {
            this.interceptors.request = interceptors.request;
        }

        if (interceptors.response) {
            this.interceptors.response = interceptors.response;
        }
    }

    /**
     * 
     * @param config 请求入口
     */
    public request(config: any) {
        let conf = config;
        if (isFunction(this.interceptors.request)) {
            conf = this.interceptors.request(config);
        }
        const response = response => {
            if (isFunction(this.interceptors.response)) {
                response = this.interceptors.response(response);
            }
            return response;
        };
        return this
            ._request(conf)
            .then(response)
            .catch(response);
    }

    // disable-next-line:no-_request
    public _request(config: any) {
        return new Promise();
    }
}

["get", "post"].forEach((method) => {
    Adapter.prototype[method] = function(url: string, data = {}, options = {}) {
        return this.request({
            data,
            method: method.toLocaleUpperCase(),
            url
        });
    };
});
