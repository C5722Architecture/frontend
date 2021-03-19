
import { getBmi }  from './service';
import { notification } from 'antd';
import { routerRedux } from 'dva/router';
import { encrypt } from '@utils/CryptoJS';

export default {
    namespace: 'bmi',
    state: {
        isError: false,
        bmiList:[
            {
                "height":161,
                "weight":81,
                "bmi":1,
                "id":1,
            },
            {
                "height":181,
                "weight":91,
                "bmi":1.2,
                "id":2,
            },
            {
                "height":175,
                "weight":60,
                "bmi":1.4,
                "id":3,
            },
        ],
        current_BMI:{},
    },
    effects: {
        *getBmi({ payload }, { call, put }) {
            const { status, data } = yield call(getBmi, payload);
            if (status === 0) {
                yield put({
                    type: 'save',
                    payload: {
                        current_BMI: data
                    }
                });
            } else {
                yield put({
                    type: 'save',
                    payload: {
                        isError: true
                    }
                });
                notification.error({
                    message: 'weight or height error',
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
