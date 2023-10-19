describe('Тестирование работоспособности приложения', () => {
    it('Страница алгоритма разворота строки доступна', () => {
        cy.visit('/');
        cy.wait(1000);
        cy.visit('/recursion');
        cy.contains('Строка');
        cy.wait(1000);
    });
    it('Страница алгоритма Фибоначчи доступна', () => {
        cy.visit('/');
        cy.wait(1000);
        cy.visit('/fibonacci');
        cy.wait(1000);
    });
    it('Страница "Стек" доступна', () => {
        cy.visit('/');
        cy.wait(1000);
        cy.visit('/stack');
        cy.contains('Стек');
        cy.wait(1000);
    });
    it('Страница сортировок доступна', () => {
        cy.visit('/');
        cy.wait(1000);
        cy.visit('/sorting');
        cy.contains('Сортировка');
        cy.wait(1000);
    });
    it('Страница Очередь доступна', () => {
        cy.visit('/');
        cy.wait(1000);
        cy.visit('/queue');
        cy.contains('Очередь');
        cy.wait(1000);
    });
    it('Страница Связный список доступна', () => {
        cy.visit('/');
        cy.wait(1000);
        cy.visit('/list');
        cy.contains('Связный список');
        cy.wait(1000);
        cy.visit('/');
    });
});