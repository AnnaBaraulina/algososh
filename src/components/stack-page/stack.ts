interface IStack<T> {
    push: (item: T) => void;
    pop: () => void;
    clear: () => void;
    peak: () => T | null;
    getSize: () => number;
    getElements: () => T[];
}

class Stack<T> implements IStack<T> {
    private container: T[] = [];
  
    push = (item: T): void => {
      this.container.push(item);
    };
  
    pop = (): void => {
      if (this.getSize()) {
        this.container.pop();
      }
    };
  
    peak = (): T | null => {
      if (this.container.length) {
        return this.container[this.container.length - 1];
      } else {
        return null;
      }
    };
  
    getSize = () => this.container.length;
  
    getElements = () => this.container;
  
    clear = () => {
      this.container = [];
    };
  }
  
  export const stack = new Stack<string>();