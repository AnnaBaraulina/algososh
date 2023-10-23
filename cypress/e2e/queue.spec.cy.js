import {
  input,
  circleContent,
  circleItem,
  stateChanging,
  stateDefault,
  addButton,
  deleteButton,
  clearButton,
} from "../variables";

import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";

const array = ["1", "2", "3"];

describe('Проверка визуализации структур данных "Очередь"', () => {
  beforeEach(() => {
    cy.visit("/queue");
  });
  const addItem = (value) => {
    cy.get(input).type(value);
    cy.get(addButton).should("not.be.disabled");
    cy.get(addButton).click();
    cy.wait(SHORT_DELAY_IN_MS);
  };
  it("При пустом инпуте кнопка Добавить заблокирована", () => {
    cy.get(input).should("have.value", "");
    cy.get(addButton).should("be.disabled");
  });
  it("Добавление элементов в стек работает корректно", () => {
    cy.get(input).type("1");
    cy.get(addButton).should("not.be.disabled");
    cy.get(addButton).click();
    cy.get(addButton)
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains("loader"));
    cy.get(circleItem).then((item) => {
      cy.get(item[0])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(stateChanging));
    });
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(circleContent).then((item) => {
      cy.get(item[0]).children("div:first").should("have.text", "head");
      cy.get(item[0]).children("div:last").should("have.text", "tail");
    });
    cy.get(circleItem).then((item) => {
      cy.get(item[0])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(stateDefault));
    });
    cy.get(input).should("have.value", "");
    cy.get(addButton).should("be.disabled");
    cy.get(deleteButton).should("not.be.disabled");
    cy.get(clearButton).should("not.be.disabled");

    cy.wait(3000);

    cy.get(input).type("2");
    cy.get(addButton).should("not.be.disabled");
    cy.get(addButton).click();
    cy.get(addButton)
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains("loader"));
    cy.get(circleItem).then((item) => {
      cy.get(item[1])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(stateChanging));
    });
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(circleContent).then((item) => {
      cy.get(item[0]).children("div:first").should("have.text", "head");
      cy.get(item[0]).children("div:last").should("not.have.text", "tail");
      cy.get(item[1]).children("div:last").should("have.text", "tail");
    });
    cy.get(circleItem).then((item) => {
      cy.get(item[1])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(stateDefault));
    });
    cy.get(input).should("have.value", "");
    cy.get(addButton).should("be.disabled");
    cy.get(deleteButton).should("not.be.disabled");
    cy.get(clearButton).should("not.be.disabled");

    cy.wait(3000);

    cy.get(input).type("3");
    cy.get(addButton).should("not.be.disabled");
    cy.get(addButton).click();
    cy.get(addButton)
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains("loader"));
    cy.get(circleItem).then((item) => {
      cy.get(item[2])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(stateChanging));
    });
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(circleContent).then((item) => {
      cy.get(item[0]).children("div:first").should("have.text", "head");
      cy.get(item[1]).children("div:last").should("not.have.text", "tail");
      cy.get(item[2]).children("div:last").should("have.text", "tail");
    });
    cy.get(circleItem).then((item) => {
      cy.get(item[2])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(stateDefault));
    });
    cy.get(input).should("have.value", "");
    cy.get(addButton).should("be.disabled");
    cy.get(deleteButton).should("not.be.disabled");
    cy.get(clearButton).should("not.be.disabled");
  });
  it("Удаление элемента из стека реализовано корректно", () => {
    cy.get(input).should("have.value", "");
    cy.get(addButton).should("be.disabled");
    cy.get(deleteButton).should("be.disabled");
    cy.get(clearButton).should("be.disabled");

    array.map((item) => {
      addItem(item);
    });

    cy.wait(3000);

    cy.get(deleteButton).click();
    cy.get(deleteButton)
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains("loader"));
    cy.get(circleItem).then((item) => {
      cy.get(item[0])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(stateChanging));
    });
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(circleContent).then((item) => {
      cy.get(item[0]).children("div:first").should("not.have.text", "head");
      cy.get(item[1]).children("div:first").should("have.text", "head");
      cy.get(item[2]).children("div:last").should("have.text", "tail");
    });
    cy.get(circleItem).then((item) => {
      cy.get(item[0])
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains(stateDefault));
    });
    cy.get(input).should("have.value", "");
    cy.get(addButton).should("be.disabled");
    cy.get(deleteButton).should("not.be.disabled");
    cy.get(clearButton).should("not.be.disabled");
  });
  it("Поведение кнопки Очистить реализовано корректно", () => {
    cy.get(input).should("have.value", "");
    cy.get(addButton).should("be.disabled");
    cy.get(deleteButton).should("be.disabled");
    cy.get(clearButton).should("be.disabled");

    array.map((item) => {
      addItem(item);
    });

    cy.wait(3000);

    cy.get(clearButton).click();
    cy.get(clearButton)
      .invoke("attr", "class")
      .then((classList) => expect(classList).contains("loader"));
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(input).should("have.value", "");
    cy.get(addButton).should("be.disabled");
    cy.get(deleteButton).should("be.disabled");
    cy.get(clearButton).should("be.disabled");
    cy.get(circleItem).children().nextAll().should("not.exist");
  });
});
