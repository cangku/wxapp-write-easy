/*
 * @Author: unofficial
 * @Date: 2018-08-07 10:46:29
 * @Last Modified by: unofficial
 * @Last Modified time: 2018-08-10 18:26:04
 *
 * 请求类 wx.request
 */
declare let wx: any;
declare let Promise: any;

import { isObject } from '../basictype';
import Adapter from "./adapter/adapter";

interface IRequestParams {
    url: string;
    data?: any;
    header?: any;
    method?: string;
    dataType?: string;
    responseType?: string;
    async?: boolean;
    success?(data: { data: any, errMsg: string, statusCode: number, header: any }): void;
    fail?(data: { data: any, errMsg: string, statusCode: number, header: any }): void;
    complete?(data: { data: any, errMsg: string, statusCode: number, header: any }): void;
}

export class Wxr extends Adapter {
    public requestTask;
    constructor() {
        super();
    }

    public _request(requestParams: IRequestParams): any {
        let p;
        const pCallback = {
            resolve(data: any) { /* empty */ },
            reject(data: any) { /* empty */ },
        };
        p = new Promise((resolve, reject) => {
            pCallback.resolve = resolve;
            pCallback.reject = reject;
        });

        const { url, data, method = "GET", dataType, responseType, success = function success(): any { /* empty */ }, fail = function fail(): any { /* empty */ }, complete = function complete(): any { /* empty */ } } = requestParams;
        let { header } = requestParams;
        // header 信息存在
        if (isObject(header)) {
            Object.keys(header).forEach((key) => {
                key = key.replace(/^\w|-\w/g, (v) => v.toLocaleUpperCase());
                header[key] = header[key];
            });
        } else {
            header = {
                "Content-Type": "application/json",
            };
        }

        this.requestTask = wx.request({
            data,
            dataType,
            header,
            method,
            responseType,
            url,
            success(data: any) {
                success(data);
                pCallback.resolve(data);
            },
            fail(data: any) {
                fail(data);
                pCallback.reject(data);
            },
            complete(data: any) {
                complete(data);
            },
        });
        return p;
    }

    public abort() {
        if (this.requestTask) {
            this.requestTask.abort();
        }
    }
}
const wxr: any = new Wxr();

export default wxr;
