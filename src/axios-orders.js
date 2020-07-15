import axios from 'axios';
const instance=axios.create({
    baseURL:'https://my-burger-react-fb4cd.firebaseio.com/'
});

export default instance;