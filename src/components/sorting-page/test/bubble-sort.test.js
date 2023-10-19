import { Direction } from '../../../types/direction';
import { bubbleSortTest } from '../sorting-page';

describe('Тест сортировки пузырьком', () => {
    test('Сортировка пустого массива по возрастанию осуществляетя корректно', () => {
        expect(bubbleSortTest([], Direction.Ascending)).toEqual([]);
    });
    test('Сортировка пустого массива по убыванию осуществляетя корректно', () => {
        expect(bubbleSortTest([], Direction.Descending)).toEqual([]);
    });
    test('Сортировка массива с одним элементом по возрастанию корректна', () => {
        expect(bubbleSortTest([1], Direction.Ascending)).toEqual([1]);
    });
    test('Сортировка массива с одним элементом по убыванию корректна', () => {
        expect(bubbleSortTest([1], Direction.Descending)).toEqual([1]);
    });
    test('Сортировка массива с несколькими элементами по возрастанию корректна', () => {
        expect(bubbleSortTest([18, 9, 14, 3], Direction.Ascending)).toEqual([3, 9, 14, 18]);
    });
    test('Сортировка массива с несколькими элементами по убыванию корректна', () => {
        expect(bubbleSortTest([2, 12, 7, 9], Direction.Descending)).toEqual([12, 9, 7, 2]);
    });
})