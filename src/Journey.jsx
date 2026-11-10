import {money} from './data.js';
import Art from './Art.jsx';
export default function Journey({j}){
  return(<>
  <div className="dhero"><Art k={j.k}/><div className="wrap"><h1 style={{fontSize:'clamp(2.2rem,6vw,4rem)'}}>{j.name}</h1><p>{j.dest} · {j.dur}</p></div></div>
  <div className="wrap dlayout"><div>
    <h2>Overview</h2><p className="lead" style={{maxWidth:'62ch'}}>{j.over}</p>
    <h2 style={{marginTop:36,fontSize:'1.7rem'}}>Highlights</h2><ul className="hl">{j.hl.map(h=><li key={h}>{h}</li>)}</ul>
    <h2 style={{fontSize:'1.7rem',marginBottom:14}}>Itinerary</h2>
    {j.it.map((d,i)=>(<details key={i} open={i===0}><summary>{j.it.length>1?`Day ${i+1}: `:''}{d[0]}</summary><p>{d[1]}</p></details>))}
  </div>
  <aside className="side"><div className="meta">From</div><div className="price" style={{fontSize:'2rem'}}>{money(j.price)}<span className="meta"> / person</span></div>
    <p className="meta" style={{margin:'8px 0 18px'}}>{j.dur}. Placeholder price.</p>
    <a className="btn btn-gold" style={{display:'block',textAlign:'center'}} href={`#book-${j.id}`}>Book This Journey</a></aside></div></>);
}
