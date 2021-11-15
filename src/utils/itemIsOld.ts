import {IItem} from "~/services/getUserItems";

const dateDifference = {
  inDays: (d1: Date, d2: Date) =>
    (d2.getTime() - d1.getTime())/(24*3600*1000),
};

const itemIsOld = (item: IItem) => {
  const currentDate = new Date();
  const itemDate = new Date(item.createdAt);

  return dateDifference.inDays(itemDate, currentDate) > 30;
};

export default itemIsOld;