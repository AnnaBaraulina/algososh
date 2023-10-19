import { FC, ChangeEvent, useState} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import style from './sorting-page.module.css';
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { ElementStates, SortTypes } from "../../types/element-states";
import { Direction } from "../../types/direction";
import { setDelay } from "../../utils/set-delay";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";




export function randomArr(): SortTypes[] {
  const minLength = 3;
  const maxLength = 17;
  const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
  const array: SortTypes[] = [];
  for (let i = 0; i < length; i++) {
   const randomInt = Math.floor(Math.random() * 101);
   array.push({ index: randomInt, state: ElementStates.Default})
  }
  return array;
}

export const swap = (
  value: SortTypes[],
  firstItem: number,
  secondItem: number
) => {
  return ([value[firstItem], value[secondItem]] = [
    value[secondItem],
    value[firstItem]
  ]);
};

export const swapTest = (
  value: number[],
  firstItem: number,
  secondItem: number
) => {
  return ([value[firstItem], value[secondItem]] = [
    value[secondItem],
    value[firstItem],
  ]);
};

export const selectionSortTest = (
  arr: number[],
  order: Direction
): number[] => {
  const { length } = arr;
  for (let i = 0; i < length - 1; i++) {
    let maxInd = i;
    for (let j = i + 1; j < length; j++) {
      if (
        order === Direction.Ascending
          ? arr[j] < arr[maxInd]
          : arr[j] > arr[maxInd]
      ) {
        maxInd = j;
      }
    }
    swapTest(arr, maxInd, i);
  }
  return arr;
};

export const bubbleSortTest = (arr: number[], order: Direction): number[] => {
  const { length } = arr;
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length - i - 1; j++) {
      if (
        order === Direction.Ascending
          ? arr[j] > arr[j + 1]
          : arr[j] < arr[j + 1]
      ) {
        swapTest(arr, j, j + 1);
      }
    }
  }
  return arr;
};

export const SortingPage: React.FC = () => {
  const [array, setArray] = useState<SortTypes[]>(randomArr());
  const [radioValue, setRadioValue] = useState('selectionSort');
  const [loader, setLoader] = useState({ ascending: false, descending: false, loader: false,});

  const getArray = () => {
    setArray(randomArr());
  }

  const onChange = ( evt: ChangeEvent<HTMLInputElement>) => {
    setRadioValue(evt.target.value)
  };

  const handleSort = (order: Direction) => {
    if (radioValue === 'selectionSort') {
      selectionSort(array, order);
    } else {
      bubbleSort( array, order);
    }
  }

  
  const bubbleSort = async ( array: SortTypes[], order: Direction) => {
    if (order === Direction.Ascending) {
      setLoader({ ...loader, loader: true, ascending: true});
    } else {
      setLoader({ ...loader, loader: true, descending: true})
    }
    const { length } = array;
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length - i - 1; j++) {
        array[j].state = ElementStates.Changing;
        array[j + 1].state = ElementStates.Changing;
        setArray([...array]);
        await setDelay(SHORT_DELAY_IN_MS);
        if(order === Direction.Ascending
          ? array[j].index > array[j + 1].index
          : array[j].index < array[j + 1].index) {
            swap(array, j, j + 1);
          }
          array[j].state = ElementStates.Default;
      }
      array[array.length - i - 1].state = ElementStates.Modified;
      setArray([...array]);
    }
    setLoader({ loader: false, descending: false, ascending: false});
  };




   const selectionSort = async (array: SortTypes[], order: Direction) => {
   if (order === Direction.Ascending) {
    setLoader({ ...loader, loader: true, ascending: true});
   } else {
    setLoader({ ...loader, loader: true, descending: true })
   }
   
   const { length } = array;
   for (let i = 0; i < length; i++) {
    let maxInd = i;
    array[maxInd].state = ElementStates.Changing;
    for (let j = i + 1; j < length; j++) {
      array[j].state = ElementStates.Changing;
      setArray([...array]);
      await setDelay(SHORT_DELAY_IN_MS);

      if(
        order === Direction.Ascending
          ? array[j].index < array[maxInd].index
          : array[j].index > array[maxInd].index
      ) {
        maxInd = j;
        array[j].state = ElementStates.Changing;
        array[maxInd].state = i === maxInd ? ElementStates.Changing : ElementStates.Default
      }
      if ( j !== maxInd ) {
        array[j].state = ElementStates.Default
      }
      setArray([...array]);
    }
    swap(array, maxInd, i);
    array[maxInd].state = ElementStates.Default;
    array[i].state = ElementStates.Modified
    setArray([...array]);
   }
   setLoader({ loader: false, descending: false, ascending: false});
  }


  return (
    <SolutionLayout title="Сортировка массива">
      <div className={style.form}>
        <div className={style.radioButtons}>
          <RadioInput
            label='выбор'
            name='sortType'
            value='selectionSort'
            onChange={onChange}
            disabled={loader.loader}
            defaultChecked
          />
          <RadioInput
           label='пузырек'
           name='sortType'
            value='bubbleSort'
            onChange={onChange}
            disabled={loader.loader}
            

          />
          
        </div>
        <div className={style.buttons}>
          <Button
           text='по возрастанию'
           onClick={() => handleSort(Direction.Ascending)}
           sorting={Direction.Ascending}
           isLoader={loader.ascending}
           disabled={loader.descending}
           extraClass={style.button}
           data='ascending-button'
          />
          <Button
            text='по убыванию'
            onClick={() => handleSort(Direction.Descending)}
            sorting={Direction.Descending}
            isLoader={loader.descending}
            disabled={loader.ascending}
            extraClass={style.button}
            data='descending-button'
          />
          <Button
            text='новый массив'
            onClick={getArray}
            disabled={loader.loader}
            data='new-array-button'
          />
        </div>
      </div>
      <ul className={style.list}>
        {array?.map((item) => {
          return (
            <Column key={item.index} index={item.index} state={item.state}/>
          )
        })}
      </ul>
    </SolutionLayout>
  );
};
