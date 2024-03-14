import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';
import Users from '../database/models/UsersModel';
import { mapStatusHTTP, message } from '../utils/mapStatusHttp'
import * as JWT from 'jsonwebtoken';

import { mockOneUser } from './mocks/mockUsers'
import { token } from './mocks/mockLogin'

import { loginSucess, loginErroEmailErroFormat, loginErroEmailNotExist ,
  loginErroPasswordInvalid, loginErroPasswordNotExist } from './mocks/mockLogin'


import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando a rota /login', () => {
  beforeEach(function () { sinon.restore(); });

  it('testando retorno da rota com o metodo post para login', async () => {
    const dataFindOne = Users.build(mockOneUser)
    sinon.stub(Users, 'findOne').resolves(dataFindOne as any);
    
    const httpReponse = await chai.request(app)
    .post('/login')
    .send(loginSucess);
    
    expect(httpReponse.status).to.equal(mapStatusHTTP.successful);
    expect(httpReponse.body.token.split('.')[0]).to.be.equal(token.split('.')[0]);

  });

  it('testando ERRO de retorno da rota com o metodo post para login, email invalido', async () => {
    const httpReponse = await chai.request(app)
    .post('/login')
    .send(loginErroEmailErroFormat);
    
    expect(httpReponse.status).to.equal(mapStatusHTTP.invalidPost);
    expect(httpReponse.text).to.equal(`{"message":"${message.invalidEmailOrPassword}"}`)
  });

  it('testando ERRO de retorno da rota com o metodo post para login, email required', async () => {
    const httpReponse = await chai.request(app)
    .post('/login')
    .send(loginErroEmailNotExist);
    
    expect(httpReponse.status).to.equal(mapStatusHTTP.invalidData);
    // expect(httpReponse.text).to.equal(`{"message":"${message.requiredFields}"}`)
  });

  it('testando ERRO de retorno da rota com o metodo post para login, password required', async () => {
    const httpReponse = await chai.request(app)
    .post('/login')
    .send(loginErroPasswordNotExist);
    
    expect(httpReponse.status).to.equal(mapStatusHTTP.invalidData);
    expect(httpReponse.text).to.equal(`{"message":"${message.requiredFields}"}`)
  });

  it('testando retorno da rota /role com metodo get para a lista de users', async () => {
    const dataFindOne = Users.build(mockOneUser);
    const returnValue = {role: dataFindOne.role};
    sinon.stub(Users, 'findOne').resolves(dataFindOne as any);
    
    const httpReponse = await chai.request(app).get('/login/role')
    .set('authorization', `baerer ${token}`)

    expect(httpReponse.status).to.equal(mapStatusHTTP.successful);
    expect(httpReponse.body.role).to.be.equal(mockOneUser.role);
  });

  it('testando retorno da rota /login com metodo post para user Invalido', async () => {
    sinon.stub(Users, 'findOne').resolves(null as any);
    
    const httpReponse = await chai.request(app).post('/login')
    .send(loginSucess);

    expect(httpReponse.status).to.equal(mapStatusHTTP.invalidPost);
    expect(httpReponse.text).to.be.equal('{"message":"Invalid email or password"}');
  });

  it('retrona erro se o token for invalido', async () => {
    sinon.stub(JWT, 'verify').throwsException();

    const httpReponse = await chai.request(app).get('/login/role').set('Authorization', 'invalid_token');

    expect(httpReponse.status).to.equal(mapStatusHTTP.invalidPost);
    expect(httpReponse.body).to.deep.equal({ message: 'Token must be a valid token' });
  })
 
});
