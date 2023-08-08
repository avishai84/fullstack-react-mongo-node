import React from 'react'
import useFetch from '../hooks/useFetch';

type Animals = {
    name:string;
    src:string;
    location:string;
}
  
type AnimalsArray = {dataAnimals:Array<Animals>};    

const Animals = ():JSX.Element => {

    const {responseData, error, isLoading, refetchData} = useFetch<AnimalsArray>('http://localhost:3002/api/data');

    
    if (isLoading) {
      return <div>Loading...</div>;
    }
    if (error) {
      return <div>Error: {error as string}</div>;
    }

    const animalList = responseData?.dataAnimals.map((animal) => {
        return (
            <div key={animal.name} style={{ flex: "0 0 33.33%", padding: "10px" }}>
            {/* Replace the content below with your desired album rendering */}
            <img loading="lazy" src={animal.src} alt={animal.name} style={{ width: "100%", height: "auto" }} />
            <p>{animal.location}</p>
          </div>
        );
    })
    // create a flex grid of 3x3 with the albumList

  return(<div style={{ display: "flex", flexWrap: "wrap" }}>
    {animalList}
  </div>);
};

export default Animals;
