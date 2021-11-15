import {IItem} from "~/services/getUserItems";

const itemHasWrongEmail = (item: IItem) => {
  const validEmail = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
  return !validEmail.test(item.email);
};

export default itemHasWrongEmail;
