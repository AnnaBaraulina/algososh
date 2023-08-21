import { ChangeEvent, FormEvent, useState, FC} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import style  from './fibonacci-page.module.css';
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { setDelay } from "../../utils/set-delay";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";




const fibonacci = (n: number): number[] => {
  let arr: number[] = [1, 1];
  for ( let i = 2; i < n + 1; i++) {
    arr.push(arr[i - 2] + arr[i - 1]);
  }
  return arr;
};

export const FibonacciPage: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [loader, setLoader] = useState(false);
  const [array, setArray] = useState<Array<number>>();

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setInputValue(evt.target.value)
  };

  const onSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setLoader(true);
    const data = fibonacci(Number(inputValue));
    for (let i = 0; i < data.length; i++) {
      await setDelay(SHORT_DELAY_IN_MS);
      setArray(data.slice(0, i + 1));
    }
    setInputValue('');
    setLoader(false);
  }


  return (
    <SolutionLayout title="Последовательность Фибоначчи">
     <form className={style.form} onSubmit={onSubmit}>
      <Input type='number' onChange={onChange} value={inputValue} min={1} max={19}/>
      <Button text='рассчитать' isLoader={loader} type='submit' disabled={!!!inputValue || Number(inputValue) > 19 || Number(inputValue) < 1}/>
     </form>
     <ul className={style.list}>
      {array?.map((item, index) => {
        return <Circle letter={String(item)} index={index} key={index}/>
      })}
     </ul>
    </SolutionLayout>
  );
};
