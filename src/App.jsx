import React,{useState} from 'react'
import axios from 'axios'
import './App.css'

export default function App() {
  const [article,setarticle] = useState([]);
  const [quary,setquary] = useState('election');
  const [loading,setloading] = useState(false)
  const [error, seterror] = useState(null)

  const handleclick=async()=>{
    setloading(true); 
    seterror(null);
    try{
      let response = await axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${quary}&api-key=B8AoGg3aLlN6k0GIefhrXGkBeYmVJcZ1`)
      setarticle(response.data.response.docs)
      console.log(response.data.response.docs)
    }catch(err){
      seterror('ther is an error in fetching data')
    }finally{
      setloading(false)
    }
  }


  if(loading)return <div>Loading.....</div>
  if(error) return <div>{error}</div>
  return (
    <div className='app'>
      <input
      className='input'
      placeholder='enter topic of interest'
      value={quary}
      onChange={(e)=>setquary(e.target.value)}
      />
      <button className='button' onClick={handleclick}>Search</button>
      <div className='results'>
        <h1>Search Results</h1>
        <ul className='article-list'>
          {article.length >0 ?(
            article.map((item)=>(
              <li key={item._id} className='article-item'>
                <h2>{item.headline.main}</h2>
                <p>{item.snippet}</p>
                <a className='read-more' href={item.web_url}>read more</a>
                <h6 className='pub-date'>{item.pub_date}</h6>
              </li>
            ))
          ):(
            <p>no articles found.</p>
          )}
        </ul>
      </div>
    </div>
  )
}
