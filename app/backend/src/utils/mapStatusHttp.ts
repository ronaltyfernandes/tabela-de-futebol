const mapStatusHTTP = {
  successful: 200,
  invalidData: 400,
  notFound: 404,
  conflict: 409,
};

const message = {
  invalidFields: 'Invalid fields',
  requiredFields: 'Some required fields are missing',
  duplicateUser: 'User already registered',
  invalidDisplayValue: '"displayName" length must be at least 8 characters long',
  invalidEmail: '"email" must be a valid email',
  invalidPassword: '"password" length must be at least 6 characters long',
  invalidToken: 'Expired or invalid token',
  requiredToken: 'Token not found',
  requiredName: '"name" is required',
  userDontExist: 'User does not exist',
  notFond: 'notFond',

};

export { mapStatusHTTP, message };
