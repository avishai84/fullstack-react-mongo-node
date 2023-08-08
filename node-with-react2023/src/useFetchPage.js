import React, { useEffect, useState } from "react";

const useFetchPage = (url) => {
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(url); // Use the relative path for the endpoint
                const data = await response.json();
                // const test = await fetch('http://localhost:3002/api/albums');
                // const resTest = await test.json();
                // const response = await fetch('http://localhost:3002/api/data'); // Use the relative path for the endpoint
                // const data = await response.json();
                setData(data)
                setLoading(false);
          
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
                setError(error);
            }
        }
       fetchData()

    }, [url]);

    return {data, isLoading, error}
};

export default useFetchPage;