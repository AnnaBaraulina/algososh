import { SHORT_DELAY_IN_MS } from '../../src/constants/delays';
import { circleItem } from '../variables';

describe('Проверка визуализации алгоритма Фибоначчи', () => {
    beforeEach(() => {    
      cy.visit('/fibonacci');
    });
  
    it('Поле ввода пустое, кнопка Рассчитать заблокирована', () => {
      cy.get('input').as('input');
      cy.get('button').last().as('button');
      cy.get('@input').should('have.value', '');
      cy.get('@button').should('be.disabled');
    });
  
    it('Визуализация Фибоначчи работает корректно', () => {
      cy.get('input').as('input');
      cy.get('button').last().as('button');
      cy.get('@input').type(4);
      cy.get('@button').click();
      cy.get('@button')
        .invoke('attr', 'class')
        .then((className) => expect(className).contains('loader'));
  
      cy.get(circleItem).as('circle');
      cy.get('@circle').then((item) => {
        cy.get(item[0]).children().should('have.text', '1');
      });
      cy.wait(SHORT_DELAY_IN_MS);
  
      cy.get('@circle').then((item) => {
        cy.get(item[0]).children().should('have.text', '1');
        cy.get(item[1]).children().should('have.text', '1');
      });
      cy.wait(SHORT_DELAY_IN_MS);
  
      cy.get('@circle').then((item) => {
        cy.get(item[0]).children().should('have.text', '1');
        cy.get(item[1]).children().should('have.text', '1');
        cy.get(item[2]).children().should('have.text', '2');
      });
      cy.wait(SHORT_DELAY_IN_MS);
  
      cy.get('@circle').then((item) => {
        cy.get(item[0]).children().should('have.text', '1');
        cy.get(item[1]).children().should('have.text', '1');
        cy.get(item[2]).children().should('have.text', '2');
        cy.get(item[3]).children().should('have.text', '3');
      });
      cy.wait(SHORT_DELAY_IN_MS);
  
      cy.get('@circle').then((item) => {
        cy.get(item[0]).children().should('have.text', '1');
        cy.get(item[1]).children().should('have.text', '1');
        cy.get(item[2]).children().should('have.text', '2');
        cy.get(item[3]).children().should('have.text', '3');
        cy.get(item[4]).children().should('have.text', '5');
      });
      cy.wait(SHORT_DELAY_IN_MS);
  
      cy.get('@input').should('have.value', '');
      cy.get('@button').should('be.disabled');
    });
  });