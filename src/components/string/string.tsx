import { ChangeEvent, FC, FormEvent, useState}from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { ElementTypes } from "../../types/element-states";
import { DELAY_IN_MS } from "../../constants/delays";
import style from './string.module.css';

export const swap = (
  value: ElementTypes[],
  firstItem: number,
  secondItem: number
) => {
  return ([value[firstItem], value[secondItem]] = [
    value[secondItem],
    value[firstItem],
  ])
}

export const swapReverse = (array: string) => {
  const newArray = array.split('');
  const end = newArray.length - 1;
  const mid = Math.ceil(newArray.length / 2);
  for (let i = 0; i < mid; i++) {
    let j = end - i;
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export function setDelay(delay: number) {
  return new Promise<void>((res) => setTimeout(res, delay));
}

export const StringComponent: React.FC = () => {
  const [array, setArray] = useState<Array<ElementTypes>>();
  const [inputValue, setInputValue] = useState('');
  const [loader, setLoader] = useState(false);

  const onChange = ( e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newArray = inputValue.split('').map((letter: string) => {
      return { letter, state: ElementStates.Default};
    });
    setArray(newArray);
    setLoader(true);
    const end = newArray.length - 1;
    const middle = Math.ceil(newArray.length / 2);

    for (let i = 0; i < middle; i++) {
      let j = end - i;
      if ( i !== j) {
        newArray[i].state = ElementStates.Changing;
        newArray[j].state = ElementStates.Changing;
        setArray([...newArray]);
        await setDelay(DELAY_IN_MS);
      }
      swap(newArray, i, j);
      newArray[i].state = ElementStates.Modified;
      newArray[j].state = ElementStates.Modified;

      setArray([...newArray]);
    }
    setLoader(false);
    setInputValue('');
  };


  return (
    <SolutionLayout title="Строка">
     <form className={style.form} onSubmit={onSubmit}>
       <Input value={inputValue} onChange={onChange} maxLength={11} isLimitText/>
       <Button text='развернуть' type='submit' isLoader={loader} disabled={!!!inputValue}/>
     </form>
     <ul className={style.list}>
      {array?.map((item, index) => (
        <Circle letter={item.letter} state={item.state} key={index}/>
      ))}
     </ul>
    </SolutionLayout>
  );
};
