const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '37349806-fbd17cc6692905f34ac659bee';

export const getImages = (textSearch, page) => {
    return fetch(`${BASE_URL}?key=${API_KEY}&q=${textSearch}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`)
};
