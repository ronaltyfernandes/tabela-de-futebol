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
  /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });

});
