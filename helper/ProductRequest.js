import axios from 'axios';

const ProductRequest = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
});

export default ProductRequest;