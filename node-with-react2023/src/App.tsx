import React, {useState} from 'react';
import Albums from './components/Albums';
import Animals from './components/Animals';
import Store from "./components/Store";
import AddItem from "./components/AddItem";
import styles from './style.module.css';

// type DeleteItemProps = {acknowledged: boolean, deletedCount: number} | string;
type ResponseReqProps = {
  acknowledged: boolean,
  insertedId: string
 };

function App() {
  const [responseReq, setResponseReq] = useState<ResponseReqProps>({acknowledged:false, insertedId:''}); // response from server
  // const [responseReqDelete, setResponseReqDelete] = useState<DeleteItemProps | null>(null);
  const handleItemAdded = (response: ResponseReqProps) => {
    // Do something with the response data
    setResponseReq(response);
  };


    return(
    <div>
      <h1>Update Store</h1>
      <div className={styles.store}>
        <div className={styles.center}>
        <AddItem onItemAdded={handleItemAdded}>
          <Store onItemAddedResponse={responseReq} />
        </AddItem>
      </div>
      </div>
    </div>
  );
}

export default App;
