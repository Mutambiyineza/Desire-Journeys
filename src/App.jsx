import {useEffect,useState} from 'react';
import {J} from './data.js';
import {Header,Footer} from './Layout.jsx';
import Home from './Home.jsx';
import Journey from './Journey.jsx';
import Booking from './Booking.jsx';
function useHash(){
  const read=()=>location.hash.slice(1)||'home';
  const [h,setH]=useState(read);
  useEffect(()=>{const f=()=>setH(read());addEventListener('hashchange',f);return()=>removeEventListener('hashchange',f)},[]);
  return h;
}
export default function App(){
  const h=useHash();
  const [pref,setPref]=useState({}); // values carried over from the hero search
  const journey=h.startsWith('journey-')&&J.find(x=>'journey-'+x.id===h);
  const booking=h.startsWith('book');
  useEffect(()=>{
    if(journey||booking||h==='home') return scrollTo(0,0);
    const el=document.getElementById(h);
    if(el) el.scrollIntoView(); else scrollTo(0,0);
  },[h]);
  const search=q=>{setPref({j:q.j||undefined,date:q.date,adults:q.n});location.hash=q.j?'book-'+q.j:'book'};
  return(<>
    <Header active={journey||booking?'':h}/>
    <main>{journey?<Journey j={journey}/>:booking?<Booking key={h} init={pref} id={h.slice(5)}/>:<Home onSearch={search}/>}</main>
    <Footer/>
  </>);
}
