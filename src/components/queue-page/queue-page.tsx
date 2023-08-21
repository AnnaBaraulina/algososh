import { ChangeEvent, FC, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import style from "./queue-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { queue } from "./queue";
import { setDelay } from "../../utils/set-delay";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { TAIL, HEAD } from "../../constants/element-captions";

import { ElementStates } from "../../types/element-states";

export const QueuePage: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [loader, setLoader] = useState({
    add: false,
    delete: false,
    clear: false,
  });
  const [array, setArray] = useState<string[]>(queue.getElements());
  const [currIndex, setCurrIndex] = useState<number | null>(null);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const addElement = async () => {
    setLoader({ ...loader, add: true });
    setCurrIndex(queue.getTail());
    await setDelay(SHORT_DELAY_IN_MS);
    queue.enqueue(inputValue);
    setArray([...queue.getElements()]);
    setInputValue("");
    setCurrIndex(null);
    setLoader({ ...loader, add: false });
  };

  const deleteElement = async () => {
    setLoader({ ...loader, delete: true });
    setCurrIndex(queue.getHead());
    await setDelay(SHORT_DELAY_IN_MS);
    queue.dequeue();
    setArray([...queue.getElements()]);
    if (queue.isEmpty()) {
      queue.clear();
    }
    setCurrIndex(null);
    setLoader({ ...loader, delete: false });
  };

  const clearElements = async () => {
    setLoader({ ...loader, clear: true });
    await setDelay(SHORT_DELAY_IN_MS);
    queue.clear();
    setArray([...queue.getElements()]);
    setLoader({ ...loader, clear: false });
  };

  return (
    <SolutionLayout title="Очередь">
      <div className={style.form}>
        <Input
          maxLength={4}
          isLimitText
          onChange={onChange}
          value={inputValue}
          disabled={queue.isFull()}
        />
        <Button
          text="добавить"
          data="add-button"
          type="button"
          isLoader={loader.add}
          onClick={addElement}
          disabled={!!!inputValue || queue.isFull()}
        />
        <Button
          text="удалить"
          data="delete-button"
          type="button"
          isLoader={loader.delete}
          onClick={deleteElement}
          disabled={queue.isEmpty()}
        />
        <Button
          text="очистить"
          data="clear-button"
          type="button"
          onClick={clearElements}
          isLoader={loader.clear}
          disabled={queue.isEmpty()}
        />
      </div>
      <ul className={style.list}>
        {array?.map((element, index) => {
          return (
            <Circle
              key={index}
              index={index}
              letter={element}
              state={
                index === currIndex
                  ? ElementStates.Changing
                  : ElementStates.Default
              }
              head={index === queue.getHead() && !queue.isEmpty() ? HEAD : ""}
              tail={
                index === queue.getTailIndex() && !queue.isEmpty() ? TAIL : ""
              }
            />
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
