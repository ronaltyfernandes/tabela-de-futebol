const mapStatusHTTP = {
  successful: 200,
  postOk: 201,
  invalidData: 400,
  invalidPost: 401,
  notFound: 404,
  conflict: 422,
};

const message = {
  finished: 'Finished',
  ok: 'ok',
  invalidTeamId: 'There is no team with such id!',
  duplicate: 'It is not possible to create a match with two equal teams',
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
