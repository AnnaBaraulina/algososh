import { Direction } from "../../../types/direction";
import { selectionSortTest } from "../sorting-page";

describe('Тест сортировки выбором', () => {
    test('Сортировка пустого массива по возрастанию осуществляется корретно', () => {
        expect(selectionSortTest([], Direction.Ascending)).toEqual([]);
    });
    test('Сортировка пустого массива по убыванию осуществляется корретно', () => {
        expect(selectionSortTest([], Direction.Descending)).toEqual([]);
    });
    test('Сортировка массива с одним элементом по возрастанию осуществляется корректно', () => {
        expect(selectionSortTest([1], Direction.Ascending)).toEqual([1]);
    });
    test('Сортировка массива с одним элементом по убыванию осуществляется корректно', () => {
        expect(selectionSortTest([1], Direction.Descending)).toEqual([1]);
    });
    test('Сортировка массива из нескольних элементов по возрастанию осуществляется корректно', () => {
        expect(selectionSortTest([7, 5, 10, 22], Direction.Ascending)).toEqual([5, 7, 10, 22]);
    });
    test('Сортировка массива из нескольких элементов по убыванию осуществляется корректно', () => {
        expect(selectionSortTest([5, 12, 2, 35], Direction.Descending)).toEqual([35, 12, 5, 2]);
    });
})