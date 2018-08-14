/*
 * @Author: unofficial 
 * @Date: 2018-08-07 10:46:29 
 * @Last Modified by: unofficial
 * @Last Modified time: 2018-08-10 18:26:34
 * 
 * 请求类 XMLHttpRequest
 */
declare let XMLHttpRequest: any;

import { isObject } from '../basictype';
import XhrAdapter from './adapter/xhrAdapter';

// xhr.request()
// const xhr = new XMLHttpRequest();

// readyState > 3
// xhr.readyState
// xhr.responseText || xhr.response
// xhr.status
// xhr.statusText

// onreadystatechange

// abort()
// getAllResponseHeaders()
// getResponseHeader()
// open()
// send() post/put has body
// setRequestHeader()

interface IRequestParams {
    url: string,
    data?: any,
    header?: any,
    method?: string,
    dataType?: string,
    responseType?: string,
    async?: boolean,
    success?(data: { data: any, errMsg: string, statusCode: number, header: any }): void,
    fail?(data: { data: any, errMsg: string, statusCode: number, header: any }): void,
    complete?(data: { data: any, errMsg: string, statusCode: number, header: any }): void
}

export class Xhr extends XhrAdapter {
    constructor() {
        super();
    }

    public _request(requestParams: IRequestParams): any {
        // 初始化
        this.r = new XMLHttpRequest();
        let p;
        const pCallback = {
            resolve(data: any) { /* empty */ },
            reject(data: any) { /* empty */ }
        };
        p = new Promise((resolve, reject) => {
            pCallback.resolve = resolve;
            pCallback.reject = reject;
        });

        const xhr = this.r;
        const { url, data, method = 'GET', dataType, responseType, async = true, success = function success(): any { /* empty */ }, fail = function fail(): any { /* empty */ }, complete = function complete() { /* empty */ } } = requestParams;
        let { header } = requestParams;
        xhr.open(method, url, async);
        // header 信息存在
        if (isObject(header)) {
            Object.keys(header).forEach(key => {
                key = key.replace(/^\w|-\w/g, v => v.toLocaleUpperCase());
                this._setRequestHeader(key, header[key]);
            })
        } else {
            header = {};
        }
        // 默认content-type
        if (!header['Content-Type']) {
            header['Content-Type'] = 'application/json';
        }

        xhr.onreadystatechange = () => {
            // 3 响应头部都已经接收到，响应体开始接收但未完成
            // 4 请求响应已经完全接收
            if (xhr.readyState !== 4) {
                return;
            }

            const response = Object.create(null);
            let func;
            response.header = this._getAllResponseHeaders(xhr.getAllResponseHeaders());
            response.statusCode = xhr.status;
            if (header['Content-Type'] && /application\/json/.test(header['Content-Type'])) {
                try {
                    response.data = JSON.parse(xhr.responseText);
                } catch(e) {
                    response.data = xhr.responseText;
                }
            } else {
                response.data = xhr.responseText;
            }
            // 
            if (xhr.status === 200) {
                response.errMsg = 'request:ok';
                func = success;
            } else {
                response.errMsg = 'request:fail';
                func = fail;
            }
            // callback
            [func, complete].forEach(funcName => {
                funcName(response);
            });

            // callback by promise
            let promiseFunc;
            switch(func.name) {
                case 'success':
                    promiseFunc = pCallback.resolve;
                    break;
                case 'fail':
                    promiseFunc = pCallback.reject;
                    break;
            }
            promiseFunc(response);
        }
        
        if (['POST', 'PUT'].includes(method)) {
            xhr.send(data);
        } else {
            xhr.send();
        }
        return p;
    }

    public abort() {
        const xhr = this.r;
        xhr.abort();
    }
}
const xhr: any = new Xhr();

export default xhr;