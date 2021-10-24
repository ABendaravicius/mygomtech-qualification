import {FC, useEffect, useState} from 'react';
import {IItem} from "~/services/getUserItems";
import ItemIcon from './components/ItemIcon';
import updateItem from '../../../../services/updateItem';
import Modal from 'react-modal';

import './list-style.scss';

interface IList {
  items: Array<IItem>,
  itemUpdate: any,
}

interface IUpdateModal {
  item: IItem,
  itemUpdate: any,
}

const UpdateModal: FC<IUpdateModal> = ({ item, itemUpdate}) => {
  const [showModal, setShowModal] = useState(false);
  const [newEmail, setNewEmail] = useState('');

  const handleUpdate = async () => {
    if (newEmail !== '') {
      try {
        await updateItem({
          ...item,
          email: newEmail,
        });
        setNewEmail(newEmail);
        itemUpdate(item.id, newEmail);
        setShowModal(false);
      }
      catch(error) {
        //error
        console.log(error);
      }
    }
  };

  return (
    <>
      <button className="update" onClick={() => setShowModal(true)}>
        Update Password
      </button>
      <Modal
        className="modal"
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        ariaHideApp={false}
        contentLabel="Example Modal"
      >
        <h1>Update Email</h1>
        <input
          placeholder="New email"
          value={newEmail}
          className="input"
          onChange={(event) => setNewEmail(event.target.value)} 
        />
        <div className="pt-12px text-center">
          <button
            className="button"
            onClick={handleUpdate}
            disabled={newEmail === ''}
          >
            Change
          </button>
          <button className="button ml-12px" onClick={() => {
            setShowModal(false)
          }}>
            Cancel
          </button>
        </div>
      </Modal>
    </>
  );
}

const List: FC<IList> = ({items, itemUpdate}) => {
  const [itemList, setItemList] = useState(items);

  const onItemUpdate = (itemId, newEmail) => {
    items.find(i => i.id === itemId).email = newEmail;
    setItemList([...items]);
    itemUpdate(items);
  }

  return (
    <ul className="list">
      {
        items.map((item) => (
          <li className="item" key={item.id}>
            <ItemIcon name={item.name}/>
            <div>
              <div className="title">
                {item.name}
              </div>
              <div className="description">
                {item.email}
              </div>
            </div>
            <UpdateModal item={item} itemUpdate={onItemUpdate}/>
          </li>
        ))
      }
    </ul>
  );
}

export default List;
