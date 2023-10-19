import {
  stateChanging,
  stateDefault,
  stateModified,
  circleItem,
} from "../variables";

import { DELAY_IN_MS } from "../../src/constants/delays";

describe("Проверка визуализации разворота строки", () => {
  beforeEach(() => {
    cy.visit("/recursion");
  });
  it("Поле ввода пустое, Развернуть заблокирована", () => {
    cy.get("input").as("input");
    cy.get("button").last().as("button");
    cy.get("@input").should("have.value", "");
    cy.get("@button").should("be.disabled");
  });
  it("Визуализация работает корректно", () => {
    cy.get("input").as("input");
    cy.get("button").last().as("button");
    cy.get("@input").type("hello");
    cy.get("@button").should("not.be.disabled");
    cy.get("@button").click();
    cy.get("@button")
      .invoke("attr", "class")
      .then((className) => expect(className).contains("loader"));

    cy.get(circleItem).as("circle");
    cy.get("@circle").then((item) => {
      cy.get(item[0])
        .invoke("attr", "class")
        .then((className) => expect(className).contains(stateChanging));
      cy.get(item[0]).children().should("have.text", "h");

      cy.get(item[1])
        .invoke("attr", "class")
        .then((className) => expect(className).contains(stateDefault));
      cy.get(item[1]).children().should("have.text", "e");

      cy.get(item[2])
        .invoke("attr", "class")
        .then((className) => expect(className).contains(stateDefault));
      cy.get(item[2]).children().should("have.text", "l");

      cy.get(item[3])
        .invoke("attr", "class")
        .then((className) => expect(className).contains(stateDefault));
      cy.get(item[3]).children().should("have.text", "l");

      cy.get(item[4])
        .invoke("attr", "class")
        .then((className) => expect(className).contains(stateChanging));
      cy.get(item[4]).children().should("have.text", "o");
    });

    cy.wait(DELAY_IN_MS);

    cy.get("@circle").then((item) => {
      cy.get(item[0])
        .invoke("attr", "class")
        .then((className) => expect(className).contains(stateModified));
      cy.get(item[0]).children().should("have.text", "o");

      cy.get(item[1])
        .invoke("attr", "class")
        .then((className) => expect(className).contains(stateChanging));
      cy.get(item[1]).children().should("have.text", "e");

      cy.get(item[2])
        .invoke("attr", "class")
        .then((className) => expect(className).contains(stateDefault));
      cy.get(item[2]).children().should("have.text", "l");

      cy.get(item[3])
        .invoke("attr", "class")
        .then((className) => expect(className).contains(stateChanging));
      cy.get(item[3]).children().should("have.text", "l");

      cy.get(item[4])
        .invoke("attr", "class")
        .then((className) => expect(className).contains(stateModified));
      cy.get(item[4]).children().should("have.text", "h");
    });

    cy.wait(DELAY_IN_MS);

    cy.get("@circle").then((item) => {
      cy.get(item[0])
        .invoke("attr", "class")
        .then((className) => expect(className).contains(stateModified));
      cy.get(item[0]).children().should("have.text", "o");

      cy.get(item[1])
        .invoke("attr", "class")
        .then((className) => expect(className).contains(stateModified));
      cy.get(item[1]).children().should("have.text", "l");

      cy.get(item[2])
        .invoke("attr", "class")
        .then((className) => expect(className).contains(stateModified));
      cy.get(item[2]).children().should("have.text", "l");

      cy.get(item[3])
        .invoke("attr", "class")
        .then((className) => expect(className).contains(stateModified));
      cy.get(item[3]).children().should("have.text", "e");

      cy.get(item[4])
        .invoke("attr", "class")
        .then((className) => expect(className).contains(stateModified));
      cy.get(item[4]).children().should("have.text", "h");
    });

    cy.wait(DELAY_IN_MS);

    cy.get("@input").should("have.value", "");
    cy.get("@button").should("be.disabled");
  });
});
