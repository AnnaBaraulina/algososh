import {
    circleItem,
    circleContent,
    circleSmall,
    stateChanging,
    stateDefault,
    stateModified,
    addToHeadButton,
    addToTailButton,
    addByIndexButton,
    deleteByIndexButton,
    deleteFromHeadButton,
    deleteFromTailButton,
    inputIndex,
    inputValue
} from '../variables';

import { SHORT_DELAY_IN_MS } from '../../src/constants/delays';

const getDataFromCircle = (array) => {
    cy.get(circleItem).then((item) => {
      cy.get(item)
        .children()
        .each((el) => {
          array.push(el.text().trim());
        });
    });
  };
  
  describe("Проверка визуализации 'Связанный список'", () => {
    beforeEach(() => {    
      cy.visit("/list");
    });
  
    it("Дефолтное состояние страницы корректно", () => {
      cy.get(inputValue).should("have.value", "");
      cy.get(inputIndex).should("have.value", "");
      cy.get(addToHeadButton).should("be.disabled");
      cy.get(addToTailButton).should("be.disabled");
      cy.get(deleteFromHeadButton).should("not.be.disabled");
      cy.get(deleteFromTailButton).should("not.be.disabled");
      cy.get(addByIndexButton).should("be.disabled");
      cy.get(deleteByIndexButton).should("be.disabled");
    });
  
    it("Удаление элемента из head корректно", () => {
      let circleData = [];
      getDataFromCircle(circleData);
      cy.get(deleteFromHeadButton).should("not.be.disabled");
      cy.get(deleteFromHeadButton).click();
      cy.get(deleteFromHeadButton)
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("loader"));
      cy.get(circleContent).then((item) => {
        cy.get(item[0])
          .children()
          .then((item) => {
            cy.get(item[1]).children().should("have.text", "");
          });
      });
      cy.get(circleContent).then((item) => {
        cy.get(item[0])
          .find(circleSmall)
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains(stateChanging));
        cy.get(item[0])
          .find(circleSmall)
          .children()
          .should("have.text", circleData[0]);
      });
      cy.wait(SHORT_DELAY_IN_MS);
    });
  
    it("Удаление элемента из tail корректно", () => {
      let circleData = [];
      getDataFromCircle(circleData);
      cy.get(deleteFromTailButton).should("not.be.disabled");
      cy.get(deleteFromTailButton).click();
      cy.get(deleteFromTailButton)
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("loader"));
      cy.get(circleContent).then((item) => {
        cy.get(item[circleData.length - 1])
          .children()
          .then((item) => {
            cy.get(item[1]).children().should("have.text", "");
          });
      });
      cy.get(circleContent).then((item) => {
        cy.get(item[circleData.length - 1])
          .find(circleSmall)
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains(stateChanging));
        cy.get(item[circleData.length - 1])
          .find(circleSmall)
          .children()
          .should("have.text", circleData[circleData.length - 1]);
      });
      cy.wait(SHORT_DELAY_IN_MS);
    });
  
    it("Добавление элемента в head корректно", () => {
      const number = "1";
      cy.get(inputValue).type(number);
      cy.get(addToHeadButton).should("not.be.disabled");
      cy.get(addToHeadButton).click();
      cy.get(addToHeadButton)
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("loader"));
      cy.get(circleContent).then((item) => {
        cy.get(item[0])
          .find(circleSmall)
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains(stateChanging));
        cy.get(item[0]).find(circleSmall).children().should("have.text", number);
      });
      cy.wait(SHORT_DELAY_IN_MS);
      cy.get(circleItem).then((item) => {
        cy.get(item[0])
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains(stateModified));
        cy.get(item[0]).children().should("have.text", number);
      });
      cy.wait(SHORT_DELAY_IN_MS);
      cy.get(circleItem).then((item) => {
        cy.get(item[0])
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains(stateDefault));
      });
    });
  
    it("Добавление элемента в tail корректно", () => {
      const number = "1";
      let circleData = [];
      getDataFromCircle(circleData);
      cy.get(inputValue).type(number);
      cy.get(addToTailButton).should("not.be.disabled");
      cy.get(addToTailButton).click();
      cy.get(addToTailButton)
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("loader"));
      cy.get(circleContent).then((item) => {
        cy.get(item[circleData.length - 1])
          .find(circleSmall)
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains(stateChanging));
        cy.get(item[circleData.length - 1])
          .find(circleSmall)
          .children()
          .should("have.text", number);
      });
      cy.wait(SHORT_DELAY_IN_MS);
      cy.get(circleItem).then((item) => {
        cy.get(item[circleData.length])
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains(stateModified));
        cy.get(item[circleData.length]).children().should("have.text", number);
      });
      cy.wait(SHORT_DELAY_IN_MS);
      cy.get(circleItem).then((item) => {
        cy.get(item[circleData.length])
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains(stateDefault));
      });
    });
  
    it("Удаление элемента по индексу корректно", () => {
      let circleData = [];
      getDataFromCircle(circleData);
      let index = 1;
      cy.get(inputIndex).type(index);
      cy.get(deleteByIndexButton).should("not.be.disabled");
      cy.get(deleteByIndexButton).click();
      cy.get(deleteByIndexButton)
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("loader"));
      cy.get(circleItem).then((item) => {
        cy.get(item[0])
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains(stateChanging));
        cy.wait(SHORT_DELAY_IN_MS);
      });
      cy.get(circleItem).then((item) => {
        cy.get(item[0])
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains(stateChanging));
        cy.get(item[1])
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains(stateChanging));
        cy.wait(SHORT_DELAY_IN_MS);
      });
      cy.get(circleItem).then((item) => {
        cy.get(item[0])
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains(stateChanging));
        cy.get(item[1])
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains(stateDefault));
        cy.get(item[1]).children().should("have.text", "");
      });
      cy.get(circleContent).then((item) => {
        cy.get(item[index])
          .find(circleSmall)
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains(stateChanging));
        cy.get(item[1])
          .find(circleSmall)
          .children()
          .should("have.text", circleData[index]);
      });
      cy.wait(SHORT_DELAY_IN_MS);
      cy.get(inputIndex).should("have.text", "");
      cy.get(deleteByIndexButton).should("be.disabled");
    });
  
    it("Добавление элемента по индексу корректно", () => {
      let circleData = [];
      getDataFromCircle(circleData);
      let index = 1;
      let number = "1";
      cy.get(inputIndex).type(index);
      cy.get(inputValue).type(number);
      cy.get(addByIndexButton).should("not.be.disabled");
      cy.get(addByIndexButton).click();
      cy.get(addByIndexButton)
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains("loader"));
      cy.wait(SHORT_DELAY_IN_MS);
      cy.get(circleContent).then((item) => {
        cy.get(item[0])
          .find(circleSmall)
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains(stateChanging));
        cy.get(item[0]).find(circleSmall).children().should("have.text", number);
        cy.get(item[0])
          .find(`[class*=${stateDefault}]`)
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains(stateDefault));
      });
      cy.wait(SHORT_DELAY_IN_MS);
      cy.get(circleContent).then((item) => {
        cy.get(item[0])
          .find(`[class*=${stateChanging}]`)
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains(stateChanging));
        cy.get(item[1])
          .find(`[class*=${stateDefault}]`)
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains(stateDefault));
        cy.get(item[1])
          .find(circleSmall)
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains(stateChanging));
        cy.get(item[1]).find(circleSmall).children().should("have.text", number);
      });
      cy.wait(SHORT_DELAY_IN_MS);
      cy.get(circleItem).then((item) => {
        cy.get(item[1])
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains(stateModified));
      });
      cy.wait(SHORT_DELAY_IN_MS);
      cy.get(circleItem).then((item) => {
        cy.get(item[1])
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains(stateDefault));
      });
      cy.get(inputIndex).should("have.text", "");
      cy.get(inputValue).should("have.text", "");
      cy.get(addByIndexButton).should("be.disabled");
    });
  });