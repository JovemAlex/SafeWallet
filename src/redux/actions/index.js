// Coloque aqui suas actions
export const USER_EMAIL = 'USER_EMAIL';

export function emailValue(payload) {
  return {
    type: USER_EMAIL,
    payloaduser: payload,
  };
}

export default emailValue;
