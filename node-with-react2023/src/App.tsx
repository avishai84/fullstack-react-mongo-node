import React, {useState} from 'react';
import Albums from './components/Albums';
import Animals from './components/Animals';
import Store from "./components/Store";
import AddItem from "./components/AddItem";

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

  // const handleDeleteItem = (response: ResponseReqProps) => {
  //   // Do something with the response data
  //   setResponseReq(response);
  // };

    return(<div >
      <h1>Node with React</h1>
      <AddItem onItemAdded={handleItemAdded}>
          <Store onItemAddedResponse={responseReq} />
      </AddItem>
    
    </div>
  );
}

export default App;
