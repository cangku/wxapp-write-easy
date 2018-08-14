import Adapter from './adapter';

export default class XhrAdapter extends Adapter {
    public r;

    /**
     * 设置请求头
     * 
     * @param key header key
     * @param value header value
     */
    public _setRequestHeader(key: string, value: string): void {
        const xhr = this.r;
        xhr.setRequestHeader(key, value);
    }

    /**
     * 响应头内容格式转换
     * 
     * @param headers headers: string => json
     */
    public _getAllResponseHeaders(headers: string): any {
        const headerMap: object = {};
        if (!headers) {
            return headerMap;
        }
        headers.trim().split(/[\r\n]+/).forEach(line => {
            const parts = line.toLocaleLowerCase().split(': ');
            const header = parts.shift().replace(/^\w|-\w/g, v => v.toLocaleUpperCase());
            const value = parts.join(': ');
            headerMap[header] = value;
        });
        return headerMap;
    }
}