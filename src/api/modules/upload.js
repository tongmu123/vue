import axios from 'axios';

let remove = (data) => axios.delete('/api/upload', { params: data });

export default {
	remove,
}
