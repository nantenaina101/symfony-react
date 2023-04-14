import React, {useState, useEffect} from "react";
import axios from "axios";
export default function ApiUsage() {

    const client = axios.create({
        baseURL: "https://jsonplaceholder.typicode.com/posts" 
    });
    
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [posts, setPost] = useState([]);
    
    /*client.get("?_limit=10").then(response => {
        setPost(response.data)
    })*/
    
    useEffect(() => {
        client.get('').then((response) => {
          //console.log(response);
         setPost(response.data);
      }).catch((error) => {
        console.log(error);
     });
    }, []);
    
    const addPosts = () => {
      client
         .post('', {
            title: title,
            body: body,
         })
          .then((response) => {
             console.log(response.data)
             setPost([response.data, ...posts]);
         });
      setTitle('');
      setBody('');
    };

    const updatePosts = (id) => {
      client
         .put(`${id}`, {
            title: title,
            body: body,
         })
          .then((response) => {
             setPost([response.data, ...posts]);
         });
      setTitle('');
      setBody('');
    };
    
    const deletePost = (id) => {
      client.delete(`${id}`);
      setPost(
         posts.filter((post) => {
            return post.id !== id;
         })
      );
   };

    const filterPost = posts.filter(post => post.id == 6 || post.id == 1 )
    
    return (<div className="posts">
        <h1 style={{color:'green'}}>Add Post</h1>
        <input type="text" name="title" onChange={(e) => { setTitle(e.target.value) }}/>
        <input type="text" name="body" onChange={(e) => { setBody(e.target.value) }}/>
        <button onClick={() => addPosts()}>Ajouter</button>
        <br />
        <br />
        <h2 style={{color:'blue'}}>All Posts 📫</h2>
        {posts.map(post => { return (
        <div className="post-card" key={post.id} data-id={post.id}>
            <h2 className="post-title">{post.title}</h2>
            <p className="post-body">{post.body}</p>
            <div className="button">
                    <button className="delete-btn" onClick={() => { deletePost(post.id) }}>Delete</button>
            </div>
            
            <div className="button">
                <input type="text" name="title" onChange={(e) => { setTitle(e.target.value) }}/>
                <input type="text" name="body" onChange={(e) => { setBody(e.target.value) }}/>
                <button className="update-btn" onClick={()=>{updatePosts(post.id)}}>Update</button>
            </div>

          </div>
        )
        })}
        <br />
        <br />
        <h1>FilterPost</h1>
        {filterPost.map(filter => {
            //console.log(filter)
            return (<div className="post-card" key={filter.id}>
                <h2 className="post-title">{filter.title}</h2>
                <p className="post-body">{filter.body}</p>
            </div>);
        })}
        
    </div>);

}