import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "../button";
import TestRenderer from 'react-test-renderer';

describe('Тест Button компонента', () => {
    test('Button с текстом отрисован корректно', () => {
        const button = TestRenderer.create(<Button text='Сортировать'/>).toJSON();
        expect(button).toMatchSnapshot();
    });
    test('Button без текста отрисован корректно', () => {
        const button = TestRenderer.create(<Button text=''/>).toJSON();
        expect(button).toMatchSnapshot();
    });
    test('Button в состоянии disabled отрисован корректно', () => {
        const button = TestRenderer.create(<Button disabled/>).toJSON();
        expect(button).toMatchSnapshot();
    });
    test('Button с индикацией загрузки отрисован корректно', () => {
        const button = TestRenderer.create(<Button isLoader/>).toJSON();
        expect(button).toMatchSnapshot();
    });
    test('Коллбек при клине на Button вызван корректно', () => {
        const onClick = jest.fn();
        render(<Button onClick={onClick}/>);
        const button = screen.getByRole('button');
        fireEvent.click(button);
    })
})
