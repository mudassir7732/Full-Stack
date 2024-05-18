import { useEffect } from "react";
import axios from 'axios';

const ShopifyPage = () => {

    useEffect(() => {
        handleAPI();
    }, [])

    const handleAPI = async () => {
        await axios.get('http://localhost:5000/getdata')
            .then((res) => {
                console.log(res?.data, ' = data')
            })
            .catch((err) => {
                console.log(err, ' = Error')
            })
    }

    return (
        <div>
            Shopify Page
        </div>
    )
}
export default ShopifyPage;