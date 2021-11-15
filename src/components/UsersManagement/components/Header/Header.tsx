import {FC} from 'react';
import {IItem} from "~/services/getUserItems";
import logout from '../../../../services/logout';
import itemHasReusedEmail from "~/utils/itemHasReusedEmail";
import itemHasWrongEmail from "~/utils/itemHasWrongEmail";

import './header-style.scss';

interface IHeader {
  items: Array<IItem>;
  username: string;
}

const Header: FC<IHeader> = ({items, username}) => {
  const wrongEmails = items.filter(item =>
    itemHasWrongEmail(item) || itemHasReusedEmail(item, items)
  );

  return (
    <div className={`header ${wrongEmails.length === 0 && 'success'}`}>
      <div className='user-section'>
        <button onClick={logout}>{`Logout ${username}`}</button>
      </div>
      <h1>{`${wrongEmails.length} Emails are wrong`}</h1>
      <span className='text-center'>Email validator to protect your company from bad registrations</span>
    </div>
  )
};

export default Header;
