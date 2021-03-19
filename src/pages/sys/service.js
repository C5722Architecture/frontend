import { request } from '@utils';

export function getBmi(payload) {
  return request('/api/bmi', {
    method: 'POST',
    data: {
      ...payload,
    }
  });
}
