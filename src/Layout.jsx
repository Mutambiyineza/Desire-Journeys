import {useState} from 'react';
import logo from './assets/logo.png';
import {J,D,destinationId} from './data.js';
const NAV=[['home','Home'],['destinations','Destinations'],['journeys','Journeys'],['about','About Us'],['contact','Contact']];
export function Header({active}){
  const [open,setOpen]=useState(false);
  return(<header><div className="pill">
    <a className="logo" href="#home" aria-label="Desire Journeys home"><img src={logo} alt="Desire Journeys logo"/></a>
    <nav id="nav" className={open?'open':''}><ul>{NAV.map(([id,t])=>(<li key={id}><a href={`#${id}`} className={active===id?'on':''} onClick={()=>setOpen(false)}>{t}</a></li>))}</ul></nav>
    <a className="btn btn-gold" href="#book">Book a Journey</a>
    <button className="menu" aria-expanded={open} aria-controls="nav" onClick={()=>setOpen(o=>!o)}>Menu</button>
  </div></header>);
}
export function Footer(){
  const [msg,setMsg]=useState('Get travel inspiration, offers and insider tips from Rwanda');
  return(<footer><div className="wrap">
    <form className="nl" onSubmit={e=>{e.preventDefault();e.target.reset();setMsg('Thanks for subscribing. (Demo: connect to your email service.)')}}>
      <div><b>Adventure awaits</b><small>{msg}</small></div><input type="email" placeholder="Email address" aria-label="Email address" required/><button className="btn btn-gold">Subscribe</button></form>
    <h4>Where is your heart calling you?</h4>
    <div className="tags">{D.map(d=><a key={d[0]} href={`#${destinationId(d[0])}`}>{d[0]}</a>)}</div>
    <div className="cols">
      <div><a className="flogo" href="#home" aria-label="Desire Journeys home"><img src={logo} alt="Desire Journeys"/></a></div>
      <div><b>Journeys</b>{J.map(j=><a key={j.id} href={`#journey-${j.id}`}>{j.name}</a>)}</div>
      <div><b>Company</b><a href="#about">About Us</a><a href="#contact">Contact</a><a href="#book">Book a Journey</a></div>
      <div><b>Get in touch</b><a href="mailto:info@desirejourneys.com">info@desirejourneys.com</a><a href="tel:+250789806163">+250 789 806 163</a><p>Kigali, Rwanda</p></div>
    </div>
    <div className="big" aria-hidden="true">Desire Journeys</div></div></footer>);
}
