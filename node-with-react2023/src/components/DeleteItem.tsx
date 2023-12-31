import React from 'react';
import styles from '../style.module.css';

type DeleteItemProps = {
    acknowledged: boolean;
    deletedCount: number;
    error?: string;
};
type ItemProps = {
  _id: string;
  item?:string;
  onItemDeleteResponse: (data:DeleteItemProps) => typeof data;
};

const DeleteItem = ({ _id, onItemDeleteResponse, item }: ItemProps): JSX.Element => {
 
    const handleDelete = () => {
        fetch(`http://localhost:3002/deleteItem/${_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {

          if (!response.ok) {
            throw new Error(`Network response was not ok ${response.statusText} ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
        // Log the response from the server
          onItemDeleteResponse(data);
         
          // You can handle the response here, e.g., show a success message or update the UI.
        })
        .catch((error) => {
          console.error('Error:', error);
          // Handle the error, e.g., show an error message to the user.
          onItemDeleteResponse({acknowledged:false, deletedCount:0, error:error.message});
        });
    };
    const capitalize = item?.charAt(0)!.toUpperCase()!+item?.slice(1);
    return (
      <div>
        <button className={styles.button_red} onClick={handleDelete}>Delete {capitalize}</button>
      </div>
    );
  };
  
  export default DeleteItem;
