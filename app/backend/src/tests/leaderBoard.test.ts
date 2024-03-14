import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';
import Teams from '../database/models/TeamsModel';
import Maches from '../database/models/Maches';

import {mapStatusHTTP, message} from '../utils/mapStatusHttp'

import { allTeamsMockForLeaderBoard } from './mocks/mockTeams'
import { mockAllMaches } from './mocks/mockMatches'
import { mockAllLeaderBoard, mockAwayLeaderBoard, mockHomeLeaderBoard } from './mocks/mockeLeaderBoard'



import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando a rota leaderboard', () => {
  beforeEach(function () { sinon.restore(); });

  it('testando retorno de todos os jogos na rota /leaderboard', async () => {
    sinon.stub(Teams, 'findAll').resolves(allTeamsMockForLeaderBoard as any);
    sinon.stub(Maches, 'findAll').resolves(mockAllMaches as any);

    const httpReponse = await chai.request(app).get('/leaderboard').send(mockAllLeaderBoard);    

    expect(httpReponse.status).to.equal(mapStatusHTTP.successful);
    expect(httpReponse.body).to.deep.equal(mockAllLeaderBoard);
  });

  it('testando retorno de todos os jogos na rota /leaderboard/home', async () => {
    sinon.stub(Teams, 'findAll').resolves(allTeamsMockForLeaderBoard as any);
    sinon.stub(Maches, 'findAll').resolves(mockAllMaches as any);

    const httpReponse = await chai.request(app).get('/leaderboard/home').send(mockHomeLeaderBoard);    

    expect(httpReponse.status).to.equal(mapStatusHTTP.successful);
    expect(httpReponse.body).to.deep.equal(mockHomeLeaderBoard);
  });

  it('testando retorno de todos os jogos na rota /leaderboard/away', async () => {
    sinon.stub(Teams, 'findAll').resolves(allTeamsMockForLeaderBoard as any);
    sinon.stub(Maches, 'findAll').resolves(mockAllMaches as any);

    const httpReponse = await chai.request(app).get('/leaderboard/away').send(mockAwayLeaderBoard);    

    expect(httpReponse.status).to.equal(mapStatusHTTP.successful);
    expect(httpReponse.body).to.deep.equal(mockAwayLeaderBoard);
  });
 
});
