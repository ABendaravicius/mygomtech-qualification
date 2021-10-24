import { FC } from 'react';
import { Routes } from "~/constants";
import { IItem } from "~/services/getUserItems";
import FilterTab from "./components/FilterTab"
import itemIsOld from "~/utils/itemIsOld";
import itemHasReusedEmail from "~/utils/itemHasReusedEmail";
import itemHasWrongEmail from "~/utils/itemHasWrongEmail";

import './filter-style.scss';

interface IFilter {
  items: Array<IItem>;
}

const Filter: FC<IFilter> = ({items}) => {
  const wrongItemsCount = items.filter(itemHasWrongEmail).length;
  const reusedItemsCount = items.filter((item) => itemHasReusedEmail(item, items)).length;
  const oldItemsCount = items.filter(itemIsOld).length;

  return (
    <div className="filter">
      <FilterTab title="All" count={items.length} path={Routes.Users}/>
      <FilterTab title="Wrong" count={wrongItemsCount} path={Routes.Wrong}/>
      <FilterTab title="Reused" count={reusedItemsCount} path={Routes.Reused}/>
      <FilterTab title="Old" count={oldItemsCount} path={Routes.Old}/>
    </div>
  );
};

export default Filter;
