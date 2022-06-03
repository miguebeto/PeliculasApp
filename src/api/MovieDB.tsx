import axios from "axios";

const movieDB = axios.create({
    baseURL: 'https://api.themoviedb.org/3/movie',
    params: {
        api_key: '2396ecc5d55f20ef7f76c365ac9c9acd',
        language: 'es-ES'
    }
})

export default movieDB