import url from './urlRequest';
// import axios from 'axios';
const apiKey = ''; // Insert API key here.
/// Usar react axios para hacer peticiones al servidor 


const Post = {
  search(id) {
    return fetch(`${url}/course/${id}`, {
      headers: {
        Authorization: `${apiKey}`
      }
    }).then(response => {
      return response.json();
    })
  }
};

export default Post;
