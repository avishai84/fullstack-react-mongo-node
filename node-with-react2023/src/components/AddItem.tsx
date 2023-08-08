import React, {useEffect, useState, useRef} from 'react'


type ItemProps = {
    item:string;
    price: number;
    };
type ResponseReqProps = {
     acknowledged: boolean,
     insertedId: string
    };
type StoreChildProps = {
    children: React.ReactNode;
    onItemAdded: (response: ResponseReqProps) => void;
}

const AddItem:React.FC<StoreChildProps> = ({children, onItemAdded}):JSX.Element => {
    const [item, setItem] = useState<ItemProps | null>(null);
    const [responseReq, setResponseReq] = useState<ResponseReqProps | null>(null); // response from server
    const [errorReq, setErrorReq] = useState<string | null>(null); // response from server
    const priceRef = useRef<HTMLInputElement>(null);
    const itemRef = useRef<HTMLInputElement>(null);

    const handleItem = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        // check for empty fields
        if(itemRef.current?.value === '' || priceRef.current?.value === '') return;
        e.preventDefault(); 
        setItem({item: itemRef.current?.value as string, price: parseInt(priceRef.current?.value as string)});
        itemRef.current!.value = '';
        priceRef.current!.value = '';
    }; 

    useEffect(() => {
        if(item === null) return;
        fetch('http://localhost:3002/addItem', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Network response was not ok  ${response.statusText}` );
            }
            return response.json(); // Parse the JSON data from the response
        })
        .then((response) => {
            // Handle the data returned by the server
            setResponseReq(response);
            onItemAdded(response);
        })
        .catch((error) => {
            console.error('Error: ', error);
            setErrorReq(error.message);
        });
    }, [item]);



  return(<div style={{ display: "flex"}}>

        <label>Item
            <input type="text" ref={itemRef} placeholder='item name'/>
        </label>
        <label>Price
            <input type="number" ref={priceRef} placeholder='price'/>
        </label>
        <div><button onClick={handleItem}> Add Item</button></div>
    {children}
  </div>);
};

export default AddItem;
