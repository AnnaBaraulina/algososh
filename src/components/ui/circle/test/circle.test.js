import { Circle } from "../circle";
import TestRenderer from 'react-test-renderer';
import { ElementStates } from "../../../../types/element-states";

describe('тест Circle', () => {
  test('Circle с буквами отрисован корректно', () => {
    const circle = TestRenderer.create(<Circle letter='Text'/>).toJSON();
    expect(circle).toMatchSnapshot();
  });
  test('Circle без букв отрисован корректно', () => {
    const circle = TestRenderer.create(<Circle letter=""/>).toJSON();
    expect(circle).toMatchSnapshot();
  });
  test('Circle с Head отрисован корректно', () => {
    const circle = TestRenderer.create(<Circle head='head'/>).toJSON();
    expect(circle).toMatchSnapshot();
  });
  test('Circle с react-элементом в head отрисован корректно', () => {
    const circle = TestRenderer.create(<Circle head={<Circle/>}/>).toJSON();
    expect(circle).toMatchSnapshot();
  });
  test('Circle с index отрисован корректно', () => {
    const circle = TestRenderer.create(<Circle index={1}/>).toJSON();
    expect(circle).toMatchSnapshot();
  });
  test('Circle с пропом isSmall отрисован корректно', () => {
    const circle = TestRenderer.create(<Circle isSmall/>).toJSON();
    expect(circle).toMatchSnapshot();
  });
  test('Circle в состоянии Default отрисован корректно', () => {
    const circle = TestRenderer.create(<Circle state={ElementStates.Default}/>).toJSON();
    expect(circle).toMatchSnapshot();
  });
  test('Circle в состоянии Modified отрисован корректно', () => {
    const circle = TestRenderer.create(<Circle state={ElementStates.Modified}/>).toJSON();
    expect(circle).toMatchSnapshot();
  });
})