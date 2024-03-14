import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';
import Matches from '../database/models/Maches';
import {mapStatusHTTP, message} from '../utils/mapStatusHttp'

import { mockAllMaches } from './mocks/mockMatches'

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando a rota teams', () => {
  beforeEach(function () { sinon.restore(); });

  it('testando retorno do findAll para a lista de produtos', async () => {
    // const mockFindOneReturn = Product.build(mockProductsList);

    sinon.stub(Matches, 'findAll').resolves(mockAllMaches as any);
    
    const httpReponse = await chai.request(app).get('/matches').send(mockAllMaches);    

    expect(httpReponse.status).to.equal(mapStatusHTTP.successful);
    expect(httpReponse.body).to.deep.equal(mockAllMaches);

  });
 
});
