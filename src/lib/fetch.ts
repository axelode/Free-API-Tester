import Axios from "axios";
import { useState } from "react";

const fetchAPI = () => {
    const [result, setResult] = useState();
    const [isLoading, setIsloading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);

    const fetch = async (url: string, method: string) => {
        setIsloading(true);
        try {
            const response = await Axios({
                method,
                url
            });

            setResult(response.data);
            setIsloading(false);
        } catch (error) {
            console.log(error);
            setIsError(true);
            setIsloading(false);
        }
    };

    return { fetch, isLoading, isError, result };
};

export default fetchAPI;