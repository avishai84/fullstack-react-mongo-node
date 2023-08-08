import React from 'react'
import useFetch from '../hooks/useFetch';

type DataFromFetch = {
    albumId: number;
    id: number;
    thumbnailUrl:string;
    title: string;
    url: string;
    };

type AlbumArray = {data:Array<DataFromFetch>};    

const Albums = ():JSX.Element => {

    const {responseData, error, isLoading, refetchData} = useFetch<AlbumArray>('http://localhost:3002/api/albums');
   
    if (isLoading) {
      return <div>Loading...</div>;
    }
    if (error) {
      return <div>Error: {error as string}</div>;
    }

    const albumList = responseData?.data.map((album) => {
        return (
            <div key={album.id} style={{ flex: "0 0 33.33%", padding: "10px" }}>
            {/* Replace the content below with your desired album rendering */}
            <img loading="lazy" src={album.thumbnailUrl} alt={album.title} style={{ width: "100%", height: "auto" }} />
            <p>{album.title}</p>
          </div>
        );
    })
    // create a flex grid of 3x3 with the albumList

  return(<div style={{ display: "flex", flexWrap: "wrap" }}>
    {albumList}
  </div>);
};

export default Albums;
