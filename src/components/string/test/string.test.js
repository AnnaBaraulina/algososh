import { swapReverse } from "../string";

describe('Тестирование алгоритма разворота строки', () => {
    test('Строка с четным количеством символов развернута корректно', () => {
        expect(swapReverse('утро')).toEqual(['о', 'р', 'т', 'у']);
    });
    test('Строка с нечетным количеством символов развернута корректно', () => {
        expect(swapReverse('кошка')).toEqual(['а', 'к', 'ш', 'о', 'к']);
    });
    test('Строка с одним символом развернута корректно', () => {
        expect(swapReverse('а')).toEqual(['а']);
    });
    test('Пустая строка развернута корректно', () => {
        expect(swapReverse('')).toEqual([]);
    });
});