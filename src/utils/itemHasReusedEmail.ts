import {IItem} from "~/services/getUserItems";

const itemHasReusedEmail = (item: IItem, itemList: Array<IItem>) => {
  const reusedItems = itemList.filter((listItem) => (
    listItem.email === item.email
  ))

  return reusedItems.length > 1;
};

export default itemHasReusedEmail;
