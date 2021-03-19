import { request } from '@utils';

export function login(payload) {
  return request('/api/login', {
    method: 'POST',
    data: {
      ...payload,
    }
  });
}

// export function login(payload) {
//   return {
//     status: 0,
//   }
// }