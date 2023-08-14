import { ChangeEvent, FormEvent, useState }from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { setDelay } from "../../utils/set-delay";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import style from './stack-page.module.css';
import { stack }from './stack';
import { nanoid } from "nanoid";
import { ElementStates } from "../../types/element-states";

export const StackPage: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [loader, setLoader] = useState({ add: false, delete: false, clear: false});
  const [currentInd, setCurrentInd] = useState(0);
  const [array, setArray] = useState<string[]>();

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setInputValue(evt.target.value)
  };

  const addItem = async () => {
    setLoader({...loader, add: true});
    stack.push(inputValue);
    setInputValue('');
    setArray([...stack.getElements()])
    await setDelay(SHORT_DELAY_IN_MS);
    setCurrentInd(currentInd + 1);
    setLoader({...loader, add: false});
  }

  const deleteItem = async () => {
    setLoader({...loader, delete: true});
    setCurrentInd(stack.getSize() - 1);
    await setDelay(SHORT_DELAY_IN_MS);
    stack.pop();
    setArray([...stack.getElements()]);
    setLoader({...loader, delete: false});
  }

  const clearStack = async () => {
    setLoader({...loader, clear: true});
    await setDelay(SHORT_DELAY_IN_MS);
    stack.clear();
    setArray([...stack.getElements()]);
    setCurrentInd(0);
    setLoader({...loader, clear: false});
  }


  return (
    <SolutionLayout title="Стек">
      <form className={style.form}>
        <Input value={inputValue} maxLength={4} isLimitText onChange={onChange}/>
      
          <Button text='добавить' type='submit' data='add-button' isLoader={loader.add} onClick={addItem} disabled={!!!inputValue}/>
          <Button text='удалить' type='submit' data="delete-button" disabled={currentInd === 0} onClick={deleteItem} isLoader={loader.delete}/>
          <Button extraClass={style.button} data="clear-button" text='очистить' type='submit' disabled={currentInd === 0} onClick={clearStack} isLoader={loader.clear}/>
      
      </form>
      <ul className={style.list}>
        {array?.map((item, index) => {
          return (
            <Circle key={nanoid()} index={index} letter={item} state={index === currentInd ? ElementStates.Changing : ElementStates.Default} head={stack.getSize() - 1 === index ? "top" : ""}/>
          )
        })}
      </ul>
    </SolutionLayout>
  );
};
