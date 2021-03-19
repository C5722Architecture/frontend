
import { login }  from './service';
import { notification } from 'antd';
import { routerRedux } from 'dva/router';
import { encrypt } from '@utils/CryptoJS';

export default {
    namespace: 'login',
    state: {
        isError: false
    },
    effects: {
        *login({ payload }, { call, put }) {
            const { password, ...rest } = payload;
            const { status } = yield call(login, { password: encrypt(password), ...rest });
            if (status === 0) {
                sessionStorage.setItem("isLogin", true);
                yield put(routerRedux.push('/sys'));
            } else {
                yield put({
                    type: 'save',
                    payload: {
                        isError: true
                    }
                });
                notification.error({
                    message: 'username or password error',
                });
            }
        },
    },

    reducers: {
        save(state, action) {
            return { ...state, ...action.payload };
        },
    },

};
