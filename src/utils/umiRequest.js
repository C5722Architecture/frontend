/**
 * request 网络请求工具
 * 更详细的api文档: https://bigfish.alipay.com/doc/api#request
 */
import { extend } from 'umi-request';
import { notification } from 'antd';
import router from 'umi/router';
import { apiPrefix } from '@platformConfig';

const codeMessage = {
    200:'The server successfully returned the requested data. ',
    201:'Create or modify data successfully. ',
    202:'A request has entered the background queue (asynchronous task). ',
    204:'Delete data successfully. ',
    400:'There was an error in the request sent, and the server did not create or modify data. ',
    401:'The user does not have permission (the token, username, password are wrong). ',
    403:'The user is authorized, but access is forbidden. ',
    404:'The request is for a record that does not exist, and the server is not operating. ',
    406:'The requested format is not available. ',
    410:'The requested resource has been permanently deleted and will no longer be available. ',
    422:'When creating an object, a validation error occurred. ',
    500:'An error occurred in the server, please check the server. ',
    502:'Gateway error. ',
    503:'The service is unavailable, the server is temporarily overloaded or maintained. ',
    504:'The gateway has timed out. ',
};
/**
 * 异常处理程序
 */
const errorHandler = error => {
    const { response = {} } = error;
    const errortext = codeMessage[response.status] || response.statusText;
    const { status, url } = response;
    if (status === 401) {
        notification.error({
            message: 'Not logged in or login has expired, please log in again。',
        });
        // @HACK
        /* eslint-disable no-underscore-dangle */
        window.g_app._store.dispatch({
            type: 'login/logout',
        });
        return;
    }
    notification.error({
        message: `Request error ${status}: ${url}`,
        description: errortext,
    });
    // environment should not be used
    if (status === 403) {
        router.push('/exception/403');
        return;
    }
    if (status <= 504 && status >= 500) {
        router.push('/exception/500');
        return;
    }
    if (status >= 404 && status < 422) {
        router.push('/exception/404');
    }
};

/**
 * 配置request请求时的默认参数
 */
const request = extend({
    errorHandler, // 默认错误处理
    credentials: 'include', // 默认请求是否带上cookie
    prefix: apiPrefix,
});
export default request;
