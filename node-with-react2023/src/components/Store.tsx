import React, {useEffect, useState} from 'react'
import useFetch from '../hooks/useFetch';
import DeleteItem from './DeleteItem';
import styles from '../style.module.css';

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
        const capitalize = item?.charAt(0)!.toUpperCase()!+item?.slice(1);
        return (
            <li key={_id} className={styles.li}>
            <p>{capitalize}</p>
            <p>${price}</p>
            <DeleteItem item={item} _id={_id} onItemDeleteResponse={(data) => deleteResponseData(data)}/>
          </li>
        );
    })
  
  return(<div>
     <ul className={styles.ul}>{storeList}</ul>
  </div>);
};

export default Store;
