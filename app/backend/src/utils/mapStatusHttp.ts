const mapStatusHTTP = {
  successful: 200,
  invalidData: 400,
  invalidPost: 401,
  notFound: 404,
  conflict: 409,
};

const message = {
  finished: 'Finished',
  ok: 'ok',
  invalidFields: 'Invalid fields',
  requiredFields: 'All fields must be filled',
  invalidEmailOrPassword: 'Invalid email or password',
  invalidPassword: '"password" length must be at least 6 characters long',
  invalidToken: 'Token must be a valid token',
  requiredToken: 'Token not found',
  requiredName: '"name" is required',
  notFond: 'notFond',

};

export { mapStatusHTTP, message };
