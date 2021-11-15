import { employees } from '../data';

let items = [];

export const updateItem = (item) => {
  if (items.some(i => i.id === item.id)) {
    items[items.indexOf(items.find(i => i.id === item.id))] = item;
  } else {
    items.push(item);
  }
};

export const getItems = () => {
  return employees.map((userItem) => {
    const updatedItem = items.find(({ id }) => id === userItem.id);

    return {
      ...(updatedItem || userItem),
    };
  })
};



