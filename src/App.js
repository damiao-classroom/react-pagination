import React, { useState, useEffect } from 'react';
import Posts from './components/Posts/Posts.js'
import Paginations from './components/Pagination/Pagination.js'
import axios from 'axios'
import './App.css';

const App = () =>  {
  
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const [perPageNumber, setPerPageNumber] = useState(3)

  useEffect(() => {
    const requestPosts = async () => {
      setLoading(true);
      const res = await axios.get('http://localhost:3001/posts', { params: { currentPage, perPageNumber } } )
      console.log(res)
      setPosts(res.data.content)
      setTotalPage(res.data.totalPage)
      setLoading(false);
    }
    // 调用请求
    requestPosts()
  }, [currentPage, perPageNumber])
  
  const requestPostsByPage = (v) => {
    if(v !== '…'){
      // 边界处理
      if( v === 0 || v > totalPage) return;
      setCurrentPage(v)
    }
  }

  return (
    <div className="container">
      <h1 className="my-posts-title">我的文章</h1>
      <Posts posts={posts} loading={loading} />
      <Paginations totalPage={totalPage} currentPage={currentPage} requestPostsByPage={requestPostsByPage}/>
    </div>
  );
}

export default App;
