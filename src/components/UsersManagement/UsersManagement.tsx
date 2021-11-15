import List from './components/List/List';
import useItemsProvider from './useItemsProvider';
import ErrorBlock from '../ErrorBlock';
import Filter from './components/Filter/Filter';
import LoadingScreen from '../LoadingScreen';
import Header from './components/Header/Header';
import {Route, Switch} from "react-router-dom";
import {Routes} from '~/constants';
import itemHasWrongEmail from "~/utils/itemHasWrongEmail";
import itemHasReusedEmail from "~/utils/itemHasReusedEmail";
import itemIsOld from "~/utils/itemIsOld";
import { useUserContext } from '../UserContext';
import React from "react";

const UsersManagement = () => {
  const {
    errorMessage: userProviderErrorMessage,
    isLoading: userDataIsLoading,
    username,
  } = useUserContext();

  const {
    items,
    isLoading,
    errorMessage,
  } = useItemsProvider();

  const forceUpdate : () =>
    void = React.useState()[1].bind(null, {});

  const handleItemUpdate = (items) => {
    forceUpdate();
  }

  if (isLoading || userDataIsLoading) {
    return <LoadingScreen/>
  }

  if (userProviderErrorMessage || errorMessage) {
    return <ErrorBlock error={userProviderErrorMessage || errorMessage}/>
  }

  return (
    <div className="container">
      <Header items={items} username={username} />
      <Filter items={items}/>
      <Switch>
        <Route exact path={Routes.Users}>
          <List items={items} itemUpdate={handleItemUpdate}/>
        </Route>
        <Route path={Routes.Wrong}>
          <List items={items.filter((item) => itemHasWrongEmail(item))} itemUpdate={handleItemUpdate}/>
        </Route>
        <Route path={Routes.Reused}>
          <List items={items.filter((item) => itemHasReusedEmail(item, items))} itemUpdate={handleItemUpdate}/>
        </Route>
        <Route path={Routes.Old}>
          <List items={items.filter((item) => itemIsOld(item))} itemUpdate={handleItemUpdate}/>
        </Route>
      </Switch>
    </div>
  );
};

export default UsersManagement;
