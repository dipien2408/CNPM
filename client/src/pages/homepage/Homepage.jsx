import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import "./homepage.css";
import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import PostService from "../../services/PostService";

export default function Homepage() {
  const [posts,setPosts] = useState([]);
  const {search} = useLocation();
  const obj = {};
  if(search) {
    const arr = search.split('?')[1].split('=')
  
    obj[arr[0]] =arr[1];
  }
  
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await PostService.getAll('public',{ page: 1, ...obj});
      console.log(res.data.data)
      setPosts(res.data.data);
    };
    fetchPosts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);
  return (
    <>
      <Header />
      <div className="home">
        <Posts posts={posts} />
        <Sidebar />
      </div>
    </>
  );
}