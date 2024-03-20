import axios from "axios";

export default axios.create( {
    //baseUrel : 'https://jsonplaceholder.typicode.com/
    baseURL : 'http://85.159.71.66:8080/api',
    headers: {
        "Content-Type": "application/json"
    }
});