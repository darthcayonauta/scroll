import logo from './logo.svg';
import './App.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import {useState,useEffect} from 'react';
import { isCompositeComponentWithType } from 'react-dom/test-utils';
import Comment from './componets/Comments';

function App() {

  const [items,setItems] = useState([])
  const [noMore,setNomore] = useState(true)
  const [page,setPage] = useState(2)

  useEffect(()=>{
    const getComments = async ()=>{

      const res = await fetch('https://jsonplaceholder.typicode.com/comments?_page=1&_limit=20');
      const data = await res.json();
      setItems(data)
    };

    getComments()
  },[] )

  const fetchComments= async ()=>{
    const res = await fetch(`https://jsonplaceholder.typicode.com/comments?_page=${page}&_limit=20`);
    const data = await res.json();
    //setItems(data)
    return data;
  }


  const fetchData=  async ()=>{
    const commentsFormServer = await fetchComments();
    setItems([...items, ...commentsFormServer]);
    
    if( commentsFormServer.length ===0 || commentsFormServer.length < 20){
      setNomore(false);
    }

    console.log(commentsFormServer.length)

    setPage( page + 1 );
  }


  return (
    <InfiniteScroll
    dataLength={items.length} //This is important field to render the next data
    next={fetchData}
    hasMore={noMore}
    loader={<h4>Loading...</h4>}
    endMessage={
      <p style={{ textAlign: 'center' }}>
        <b>Yay! You have seen it all</b>
      </p>
    }

  >
    
    {items.map( (item)=>{
      return <Comment key={item.id} item={item}></Comment>
    } )}


  </InfiniteScroll>

    
  );
}

export default App;

//para bajar el componente de scroll infinito y ver documentacion
//https://www.npmjs.com/package/react-infinite-scroll-component