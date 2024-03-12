import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';
import Teams from '../database/models/TeamsModel';
import {mapStatusHTTP, message} from '../utils/mapStatusHttp'

import { allTeamsMock } from './mocks/mockTeams'

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando a rota teams', () => {
  beforeEach(function () { sinon.restore(); });

  it('testando retorno do findAll para a lista de produtos', async () => {
    // const mockFindOneReturn = Product.build(mockProductsList);

    sinon.stub(Teams, 'findAll').resolves(allTeamsMock as any);
    
    const httpReponse = await chai.request(app).get('/teams').send(allTeamsMock);    

    expect(httpReponse.status).to.equal(mapStatusHTTP.successful);
    expect(httpReponse.body).to.deep.equal(allTeamsMock);

  });

  it('testando retorno do findById para a lista de produtos', async () => {

    sinon.stub(Teams, 'findByPk').resolves(allTeamsMock[1] as any);
    
    const httpReponse = await chai.request(app).get('/teams/1').send(allTeamsMock);    

    expect(httpReponse.status).to.equal(mapStatusHTTP.successful);
    expect(httpReponse.body).to.deep.equal(allTeamsMock[1]);

  });
 
});
