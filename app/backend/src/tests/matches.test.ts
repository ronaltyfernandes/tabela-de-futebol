import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';
import Matches from '../database/models/Maches';
import Teams from '../database/models/TeamsModel';
import {mapStatusHTTP, message} from '../utils/mapStatusHttp'
import { token } from './mocks/mockLogin'

import { mockAllMaches, mockCreatedMatche, mockInProgressFalse } from './mocks/mockMatches'
import { allTeamsMockForLeaderBoard } from './mocks/mockTeams'


import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando a rota teams', () => {
  beforeEach(function () { sinon.restore(); });

  it('testando retorno do findAll para a lista de matches', async () => {

    sinon.stub(Matches, 'findAll').resolves(mockAllMaches as any);
    
    const httpReponse = await chai.request(app).get('/matches').send(mockAllMaches);    

    expect(httpReponse.status).to.equal(mapStatusHTTP.successful);
    expect(httpReponse.body).to.deep.equal(mockAllMaches);

  });

  it('testando retorno do finish para a lista de matches', async () => {
    sinon.stub(Matches, 'update').resolves([1] as any);
    
    const httpReponse = await chai.request(app)
    .patch(`/matches/42/finish`)
    .set('authorization', `baerer ${token}`);

    expect(httpReponse.status).to.equal(mapStatusHTTP.successful);    
    expect(httpReponse.body).to.deep.equal({message:`${message.finished}`});
  });

  it('testando retorno do ERRO em finish para a lista de matches', async () => {
    sinon.stub(Matches, 'update').resolves([0] as any);
    
    const httpReponse = await chai.request(app)
    .patch(`/matches/42/finish`)
    .set('authorization', `baerer ${token}`);

    expect(httpReponse.status).to.equal(mapStatusHTTP.invalidData);    
    expect(httpReponse.body).to.deep.equal({message:`${message.notFond}`});
  });

  it('testando retorno em updateGoals para a lista de matches', async () => {
    sinon.stub(Matches, 'update').resolves([1] as any);
    
    const httpReponse = await chai.request(app)
    .patch(`/matches/1`)
    .set('authorization', `baerer ${token}`)
    .send({
      "homeTeamGoals": 3,
      "awayTeamGoals": 1
    })

    expect(httpReponse.status).to.equal(mapStatusHTTP.successful);    
    expect(httpReponse.body).to.deep.equal({message:`${message.ok}`});
  });

  it('testando retorno em updateGoals para a lista de matches', async () => {
    sinon.stub(Matches, 'update').resolves([0] as any);
    
    const httpReponse = await chai.request(app)
    .patch(`/matches/1`)
    .send({
      "homeTeamGoals": 3,
      "awayTeamGoals": 1
    })
    .set('authorization', `baerer ${token}`)

    expect(httpReponse.status).to.equal(mapStatusHTTP.invalidData);    
    expect(httpReponse.body).to.deep.equal({message:`${message.notFond}`});
  });
 
  it('testando retorno em createMatch para a lista de matches', async () => {
    const dataFindOne = Matches.build(mockCreatedMatche);

    sinon.stub(Matches, 'create').resolves(dataFindOne as any);
    
    const httpReponse = await chai.request(app)
    .post(`/matches`)
    .send({
      "homeTeamId": 16,
      "awayTeamId": 8, 
      "homeTeamGoals": 2,
      "awayTeamGoals": 2
    })
    .set('authorization', `baerer ${token}`)

    expect(httpReponse.status).to.equal(mapStatusHTTP.postOk);    
    expect(httpReponse.body).to.deep.equal(mockCreatedMatche);
  });

  it('testando retorno em get matchInProgress para a lista de matches', async () => {
    sinon.stub(Teams, 'findAll').resolves( allTeamsMockForLeaderBoard as any);
    sinon.stub(Matches, 'findAll').resolves(mockAllMaches as any);
    
    const httpReponse = await chai.request(app)
    .get(`/matches?inProgress=false`)
    
    expect(httpReponse.status).to.equal(mapStatusHTTP.successful);    
    expect(httpReponse.body).to.deep.equal(mockInProgressFalse);
  });
});
