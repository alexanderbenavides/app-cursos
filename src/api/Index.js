const apiKey = ''; // Insert API key here.
/// Usar react axios para hacer peticiones al servidor 
const Post = {
  search(term) {
    return fetch(`https://jsonplaceholder.typicode.com/posts?userId=${term}`, {
      headers: {
        Authorization: `${apiKey}`
      }
    }).then(response => {
      return response.json();
    })
  }
};

export default Post;
