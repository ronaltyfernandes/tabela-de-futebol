import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';
import Users from '../database/models/UsersModel';
import { mapStatusHTTP, message } from '../utils/mapStatusHttp'

import { mockUsersAll, mockOneUser } from './mocks/mockUsers'
import { loginSucess } from './mocks/mockLogin'


import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando a rota /login', () => {
  beforeEach(function () { sinon.restore(); });

  it('testando retorno da rota com o metodo get para a lista de users', async () => {
    sinon.stub(Users, 'findAll').resolves(mockUsersAll as any);
    
    const httpReponse = await chai.request(app).get('/login');    
    
    expect(httpReponse.status).to.equal(mapStatusHTTP.successful);
    expect(httpReponse.body).to.deep.equal(mockUsersAll);

  });

  // it.only('testando retorno da rota com o metodo post para a lista de users', async () => {
  //   sinon.stub(Users, 'findOne').resolves(mockOneUser as any);
    
  //   const httpReponse = await chai.request(app)
  //   .post('/login')
  //   .send(loginSucess);
  //   console.log(httpReponse.text);
    
  //   // expect(httpReponse.status).to.equal(mapStatusHTTP.successful);
  //   expect(httpReponse.body).to.deep.equal(mockOneUser);

  // });

  // it.only('testando retorno da rota /role com metodo get para a lista de users', async () => {
  //   const returnValue = {role: mockUsersAll[1].role}
  //   sinon.stub(Users, 'findOne').resolves(mockUsersAll[1] as any);
    
  //   const httpReponse = await chai.request(app).get('/login/role')
  //   .set('authorization','token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlhdCI6MTcxMDM0NDQ4Mn0.TImLkyRK2SZ5bAFNsCoBxqFzJZqKMAou9ARCLBfonyk')
  //   .send(returnValue);    

  //   expect(httpReponse.status).to.equal(mapStatusHTTP.successful);
  //   expect(httpReponse.header).to.deep.equal('isso');

  // });
 
});
