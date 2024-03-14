const loginSucess = {
  email: 'admin@admin.com',
  password: 'secret_admin'
}

const loginErroEmailNotExist = {
  password: 'secret_admin'
}

const loginErroEmailErroFormat = {
  email: 'admin',
  password: 'secret_admin'
}

const loginErroPasswordInvalid= {
  email: 'admin@admin.com',
  password: 'secr'
}

const loginErroPasswordNotExist= {
  email: 'admin@admin.com',
}

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlhdCI6MTcxMDQzODk0Nn0.S7aBrInCu6YNtxBJeXxWKwE9duNkOd87L0ymjLQ22oo"

export { loginSucess, token }