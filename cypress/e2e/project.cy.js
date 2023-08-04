import { currentData, RioForecastData, RioSearchData } from '../mocks/dataMock';
import { fetchMock } from '../mocks/fetchMock';

const PROJECT_URL = 'http://localhost:5173';

describe('iChoveu Project test', () => {
  Cypress.on('window:before:load', (win) => {
    cy.stub(win, 'fetch').callsFake(fetchMock).as('fetch');
    cy.stub(win, 'alert').callsFake(() => { }).as('alert');
  });

  beforeEach(() => {
    cy.visit(PROJECT_URL);
  });

  describe('1. Implemente a função searchCities', () => {
    it('Verifica se o endpoint está correto', () => {
      cy.get('#search-input').type('Rio');
      cy.get('#search-button').click();

      cy.get('@fetch').then((fetch) => {
        const firstCall = fetch.args[0][0];
        expect(firstCall).to.match(/^http:\/\/api\.weatherapi\.com\/v1\/search\.json/);
        expect(firstCall).to.include('q=Rio');
      });
    });

    it('Verifica se a página exibe um alerta quando não encontra nenhuma cidade', () => {
      cy.get('#search-input').type('Riacho de fevereiro');
      cy.get('#search-button').click();

      cy.get('@alert').should('have.been.calledWith', 'Nenhuma cidade encontrada');
    });
  });

  describe('2. Implemente a função getWeatherByCity', () => {
    it('Verifica se o endpoint está correto', () => {
      cy.get('#search-input').type('Rio');
      cy.get('#search-button').click();

      cy.get('@fetch')
        .then((fetch) => {
          RioSearchData.forEach((city) => {
            expect(fetch).to.have.been.calledWithMatch(
              new RegExp(`^http:\/\/api\.weatherapi\.com\/v1\/current\.json.*q=${city.url}`),
            );
          });
        });
    });
  });

  describe('3. Liste as cidades retornadas pela API', () => {
    it('Verifica se a lista de cidades é exibida corretamente', () => {
      cy.get('#search-input').type('Rio');
      cy.get('#search-button').click();

      cy.get('#cities').children().should('have.length', RioSearchData.length);

      cy.get('#cities').children().each((city, index) => {
        const expectedData = currentData[RioSearchData[index].url];
        cy.wrap(city)
          .should('contain', RioSearchData[index].name)
          .should('contain', RioSearchData[index].country)
          .should('contain', expectedData.current.temp_c)
          .should('contain', expectedData.current.condition.text);
      });
    });
  });

  describe('4.  Adicione um botão para ver a previsão de 3 dias de uma cidade', () => {
    it('Verifica se o botão é exibido corretamente', () => {
      cy.get('#search-input').type('Rio');
      cy.get('#search-button').click();

      cy.get('#cities').children().each((city) => {
        cy.wrap(city).find('button')
          .should('be.visible')
          .should('contain', 'Ver previsão');
      });
    });

    it('Verifica se é exibido as informações da previsão do tempo da cidade', () => {
      cy.get('#search-input').type('Rio');
      cy.get('#search-button').click();

      cy.get('#cities').children().first().find('button').click();

      cy.get('#weekdays')
        .should('be.visible')
        .children().each((day, index) => {
          const expectedData = RioForecastData.forecast.forecastday[index];
          cy.wrap(day)
            .should('contain', expectedData.day.maxtemp_c)
            .should('contain', expectedData.day.mintemp_c)
            .should('contain', expectedData.day.condition.text);
        });
    });
  });
});
