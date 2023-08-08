import React, {useEffect, useState} from 'react'
import useFetch from '../hooks/useFetch';
import DeleteItem from './DeleteItem';

type DeleteItemProps = {
  acknowledged: boolean;
  deletedCount: number;
  error?: string;
};
type DataFromStore = {
    _id: string;
    item:string;
    price: number;
    };

type ResponseReqProps = {
      acknowledged: boolean,
      insertedId: string
  };

 type StoreProps = {
  onItemAddedResponse: ResponseReqProps | null;
 }

type MerchArray = {data:Array<DataFromStore>};    

const Store = ({onItemAddedResponse}:StoreProps):JSX.Element => {

    const [deleteResponse, setDeleteResponse] = useState<DeleteItemProps>({acknowledged:false, deletedCount:0}); // response from server
    const {responseData, error, isLoading, refetchData} = useFetch<MerchArray>('http://localhost:3002/store');

    useEffect(() => {
      // console.log("onItemDeleteResponse ", onItemDeleteResponse);

      if(onItemAddedResponse === null || onItemAddedResponse.acknowledged === false) return;
      if(onItemAddedResponse.acknowledged){
        refetchData();
      }
    }, [onItemAddedResponse]);

    useEffect(() => {
 
      if(deleteResponse === null) return;
      if(deleteResponse?.acknowledged){
        refetchData();
      }
    }, [deleteResponse]);


    const deleteResponseData = (data:DeleteItemProps):any => {
     setDeleteResponse(data);
      return data;
    };


    if (isLoading) {
      return <div>Loading...</div>;
    }
    if (error) {
      return <div>Error: {error as string}</div>;
    }

    const storeList = responseData?.data.map((items) => {
        const {_id, item, price} = items;
      
        return (
            <li key={_id} style={{ flex: "0 0 33.33%", padding: "10px" }}>
            <p>{item}</p>
            <p>{price}</p>
            <DeleteItem _id={_id} onItemDeleteResponse={(data) => deleteResponseData(data)}/>
          </li>
        );
    })
  
  return(<div style={{ display: "flex", flexWrap: "wrap" }}>
     <ul>{storeList}</ul>
  </div>);
};

export default Store;
