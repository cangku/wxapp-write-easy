(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (factory((global.index = {})));
}(this, (function (exports) { 'use strict';

    function __extends(d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    /**
     * basic type
     * null undefined array object string boolean
     * @param value value to be checked
     * @returns boolean
     */
    var _a = ['Function', 'Null', 'Undefined', 'Array', 'Object', 'Boolean', 'String', 'Symbol', 'URLSearchParams'].map(function (type) {
        return function (value) {
            return Object.prototype.toString.call(value).indexOf(type) !== -1;
        };
    }),
        isFunction = _a[0],
        isNull = _a[1],
        isUndefined = _a[2],
        isArray = _a[3],
        isObject = _a[4],
        isBoolean = _a[5],
        isString = _a[6],
        isSymbol = _a[7],
        isURLSearchParams = _a[8];
    var basicType = {
        isArray: isArray,
        isBoolean: isBoolean,
        isFunction: isFunction,
        isNull: isNull,
        isObject: isObject,
        isString: isString,
        isSymbol: isSymbol,
        isURLSearchParams: isURLSearchParams,
        isUndefined: isUndefined
    };

    /*
     * @Author: unofficial
     * @Date: 2018-08-09 17:52:16
     * @Last Modified by: unofficial
     * @Last Modified time: 2018-08-10 17:18:59
     *
     * get post etc. 方法
     */
    var Adapter = /** @class */function () {
        function Adapter() {
            this.interceptors = {
                request: null,
                response: null
            };
        }
        /**
         *
         * @param param 初始化请求，配置拦截器，基础配置
         */
        Adapter.prototype.setup = function (_a) {
            var interceptors = _a.interceptors;
            if (interceptors.request) {
                this.interceptors.request = interceptors.request;
            }
            if (interceptors.response) {
                this.interceptors.response = interceptors.response;
            }
        };
        /**
         *
         * @param config 请求入口
         */
        Adapter.prototype.request = function (config) {
            var _this = this;
            var conf = config;
            if (isFunction(this.interceptors.request)) {
                conf = this.interceptors.request(config);
            }
            var response = function (response) {
                if (isFunction(_this.interceptors.response)) {
                    response = _this.interceptors.response(response);
                }
                return response;
            };
            return this._request(conf).then(response)["catch"](response);
        };
        // disable-next-line:no-_request
        Adapter.prototype._request = function (config) {
            return new Promise();
        };
        return Adapter;
    }();
    ["get", "post"].forEach(function (method) {
        Adapter.prototype[method] = function (url, data, options) {
            if (data === void 0) {
                data = {};
            }
            if (options === void 0) {
                options = {};
            }
            return this.request({
                data: data,
                method: method.toLocaleUpperCase(),
                url: url
            });
        };
    });

    var XhrAdapter = /** @class */function (_super) {
        __extends(XhrAdapter, _super);
        function XhrAdapter() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * 设置请求头
         *
         * @param key header key
         * @param value header value
         */
        XhrAdapter.prototype._setRequestHeader = function (key, value) {
            var xhr = this.r;
            xhr.setRequestHeader(key, value);
        };
        /**
         * 响应头内容格式转换
         *
         * @param headers headers: string => json
         */
        XhrAdapter.prototype._getAllResponseHeaders = function (headers) {
            var headerMap = {};
            if (!headers) {
                return headerMap;
            }
            headers.trim().split(/[\r\n]+/).forEach(function (line) {
                var parts = line.toLocaleLowerCase().split(': ');
                var header = parts.shift().replace(/^\w|-\w/g, function (v) {
                    return v.toLocaleUpperCase();
                });
                var value = parts.join(': ');
                headerMap[header] = value;
            });
            return headerMap;
        };
        return XhrAdapter;
    }(Adapter);

    var Xhr = /** @class */function (_super) {
        __extends(Xhr, _super);
        function Xhr() {
            return _super.call(this) || this;
        }
        Xhr.prototype._request = function (requestParams) {
            var _this = this;
            // 初始化
            this.r = new XMLHttpRequest();
            var p;
            var pCallback = {
                resolve: function (data) {},
                reject: function (data) {}
            };
            p = new Promise(function (resolve, reject) {
                pCallback.resolve = resolve;
                pCallback.reject = reject;
            });
            var xhr = this.r;
            var url = requestParams.url,
                data = requestParams.data,
                _a = requestParams.method,
                method = _a === void 0 ? 'GET' : _a,
                dataType = requestParams.dataType,
                responseType = requestParams.responseType,
                _b = requestParams.async,
                async = _b === void 0 ? true : _b,
                _c = requestParams.success,
                success = _c === void 0 ? function success() {} : _c,
                _d = requestParams.fail,
                fail = _d === void 0 ? function fail() {} : _d,
                _e = requestParams.complete,
                complete = _e === void 0 ? function complete() {} : _e;
            var header = requestParams.header;
            xhr.open(method, url, async);
            // header 信息存在
            if (isObject(header)) {
                Object.keys(header).forEach(function (key) {
                    key = key.replace(/^\w|-\w/g, function (v) {
                        return v.toLocaleUpperCase();
                    });
                    _this._setRequestHeader(key, header[key]);
                });
            } else {
                header = {};
            }
            // 默认content-type
            if (!header['Content-Type']) {
                header['Content-Type'] = 'application/json';
            }
            xhr.onreadystatechange = function () {
                // 3 响应头部都已经接收到，响应体开始接收但未完成
                // 4 请求响应已经完全接收
                if (xhr.readyState !== 4) {
                    return;
                }
                var response = Object.create(null);
                var func;
                response.header = _this._getAllResponseHeaders(xhr.getAllResponseHeaders());
                response.statusCode = xhr.status;
                if (header['Content-Type'] && /application\/json/.test(header['Content-Type'])) {
                    try {
                        response.data = JSON.parse(xhr.responseText);
                    } catch (e) {
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
                [func, complete].forEach(function (funcName) {
                    funcName(response);
                });
                // callback by promise
                var promiseFunc;
                switch (func.name) {
                    case 'success':
                        promiseFunc = pCallback.resolve;
                        break;
                    case 'fail':
                        promiseFunc = pCallback.reject;
                        break;
                }
                promiseFunc(response);
            };
            if (['POST', 'PUT'].includes(method)) {
                xhr.send(data);
            } else {
                xhr.send();
            }
            return p;
        };
        Xhr.prototype.abort = function () {
            var xhr = this.r;
            xhr.abort();
        };
        return Xhr;
    }(XhrAdapter);
    var xhr = new Xhr();

    var Wxr = /** @class */function (_super) {
        __extends(Wxr, _super);
        function Wxr() {
            return _super.call(this) || this;
        }
        Wxr.prototype._request = function (requestParams) {
            var p;
            var pCallback = {
                resolve: function (data) {},
                reject: function (data) {}
            };
            p = new Promise(function (resolve, reject) {
                pCallback.resolve = resolve;
                pCallback.reject = reject;
            });
            var url = requestParams.url,
                data = requestParams.data,
                _a = requestParams.method,
                method = _a === void 0 ? "GET" : _a,
                dataType = requestParams.dataType,
                responseType = requestParams.responseType,
                _b = requestParams.success,
                success = _b === void 0 ? function success() {} : _b,
                _c = requestParams.fail,
                fail = _c === void 0 ? function fail() {} : _c,
                _d = requestParams.complete,
                complete = _d === void 0 ? function complete() {} : _d;
            var header = requestParams.header;
            // header 信息存在
            if (isObject(header)) {
                Object.keys(header).forEach(function (key) {
                    key = key.replace(/^\w|-\w/g, function (v) {
                        return v.toLocaleUpperCase();
                    });
                    header[key] = header[key];
                });
            } else {
                header = {
                    "Content-Type": "application/json"
                };
            }
            this.requestTask = wx.request({
                data: data,
                dataType: dataType,
                header: header,
                method: method,
                responseType: responseType,
                url: url,
                success: function (data) {
                    success(data);
                    pCallback.resolve(data);
                },
                fail: function (data) {
                    fail(data);
                    pCallback.reject(data);
                },
                complete: function (data) {
                    complete(data);
                }
            });
            return p;
        };
        Wxr.prototype.abort = function () {
            if (this.requestTask) {
                this.requestTask.abort();
            }
        };
        return Wxr;
    }(Adapter);
    var wxr = new Wxr();

    var utils = {
        basicType: basicType,
        wxr: wxr,
        xhr: xhr
    };

    exports.utils = utils;
    exports.default = utils;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
