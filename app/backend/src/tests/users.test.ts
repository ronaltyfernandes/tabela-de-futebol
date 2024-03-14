import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';
import Users from '../database/models/UsersModel';
import { mapStatusHTTP, message } from '../utils/mapStatusHttp'

import { mockOneUser } from './mocks/mockUsers'
import { token } from './mocks/mockLogin'

import { loginSucess } from './mocks/mockLogin'


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

  it('testando ERRO de retorno da rota com o metodo post para login', async () => {
    const dataFindOne = Users.build(mockOneUser)
    sinon.stub(Users, 'findOne').resolves(dataFindOne as any);
    
    const httpReponse = await chai.request(app)
    .post('/login')
    .send(loginSucess);
    
    expect(httpReponse.status).to.equal(mapStatusHTTP.notFound);
    expect(httpReponse.body.token.split('.')[0]).to.be.not.equal(token.split('.')[1]);

  });

  it('testando retorno da rota /role com metodo get para a lista de users', async () => {
    const dataFindOne = Users.build(mockOneUser)
    const returnValue = {role: dataFindOne.role}
    sinon.stub(Users, 'findOne').resolves(dataFindOne as any);
    
    const httpReponse = await chai.request(app).get('/login/role')
    .set('authorization', `baerer ${token}`)
    .send(returnValue);    

    expect(httpReponse.status).to.equal(mapStatusHTTP.successful);
    expect(httpReponse.body.role).to.be.equal(mockOneUser.role);
  });
 
});
