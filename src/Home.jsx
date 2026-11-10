import {useState} from 'react';
import {J,D,C,money,TAG} from './data.js';
import Art from './Art.jsx';
import {Pin,Cal,Usr} from './icons.jsx';
const WHY=[['🧭','Local Expertise','Experience Rwanda with people who know it best.'],['🎯','Personalized Journeys','Your journey should reflect your interests, pace and style.'],['🌿','Authentic Experiences','Go beyond the usual tourist experience.'],['🤝','Trusted Service','From planning to your return home, we’re with you every step of the way.'],['🧳','Flexible Travel','Choose a curated journey or create something completely your own.']];
const STEPS=[['Explore','Discover destinations and experiences.'],['Choose','Find a journey that matches your interests.'],['Customize','Tell us how you’d like your trip to look.'],['Journey','We handle the details while you enjoy Rwanda.']];
export function JourneyCard({j}){
  return(<article className="card"><div className="img"><Art k={j.k}/><span className="pb pl">{j.dur}</span><span className="pb pr">{TAG[j.id]}</span></div>
    <div className="body"><h3>{j.name}</h3><div className="loc"><Pin/>{j.dest}</div><p className="meta">{j.desc}</p>
      <div className="pbox"><div className="amt">{money(j.price)} <small>USD / person</small></div><span className="dep"><Cal/>Departures year-round</span></div>
      <a className="btn btn-dark" href={`#journey-${j.id}`}>View Journey</a></div></article>);
}
export default function Home({onSearch}){
  const [q,setQ]=useState({j:'',date:'',n:2});
  const [msg,setMsg]=useState('');
  const up=(k,v)=>setQ(s=>({...s,[k]:v}));
  return(<>
  <section className="hero" id="home"><div className="himg"><Art k="volcano"/></div>
    <div className="wrap hc"><span className="chip"><i/>Now booking journeys for 2027</span><h1>Your Desire. Our Journey.</h1>
      <p className="sub">Explore Rwanda through unforgettable journeys, authentic experiences, and adventures designed around you.</p>
      <div className="ctas"><a className="btn btn-gold" href="#journeys">Explore Journeys</a><a className="btn btn-glass" href="#book">Plan Your Trip</a></div>
      <form className="search" onSubmit={e=>{e.preventDefault();onSearch(q)}}>
        <div className="fld"><Pin/><div><label htmlFor="sd">Where to?</label><select id="sd" value={q.j} onChange={e=>up('j',e.target.value)}><option value="">Choose destination</option>{J.map(j=><option key={j.id} value={j.id}>{j.name}</option>)}</select></div></div>
        <div className="fld"><Cal/><div><label htmlFor="sdt">When are you traveling?</label><input type="date" id="sdt" value={q.date} onChange={e=>up('date',e.target.value)}/></div></div>
        <div className="fld" style={{border:0}}><Usr/><div><label htmlFor="st">Travelers</label><select id="st" value={q.n} onChange={e=>up('n',+e.target.value)}>{[1,2,3,4,5,6].map(n=><option key={n} value={n}>{n} Traveler{n>1?'s':''}</option>)}</select></div></div>
        <button className="btn btn-dark">Find a Journey</button></form></div></section>

  <section id="journeys"><div className="wrap"><div className="st"><h2>Journeys Worth Taking</h2><p className="lead">From mountain adventures to peaceful escapes, discover experiences that make Rwanda unforgettable.</p></div>
    <div className="grid">{J.map(j=><JourneyCard key={j.id} j={j}/>)}</div>
    <p className="meta" style={{marginTop:20,textAlign:'center'}}>Prices are placeholders. Journeys live in src/data.js, ready to be replaced by a CMS or API.</p></div></section>

  <section id="destinations" className="alt"><div className="wrap"><div className="st"><h2>One Country. Countless Journeys.</h2><p className="lead">A small country with volcanoes, savanna, rainforest and lakes, all within a day’s drive of Kigali.</p></div>
    <div className="explore">{D.map(d=><div className="dest" key={d[0]}><Art k={d[2]}/><div className="t"><h3>{d[0]}</h3><p>{d[1]}</p></div></div>)}</div></div></section>

  <section><div className="wrap"><div className="st"><h2>Choose Your Experience</h2></div>
    <div className="cats">{C.map(c=><div className="cat" key={c[1]}><i aria-hidden="true">{c[0]}</i>{c[1]}</div>)}</div></div></section>

  <section className="alt"><div className="wrap"><div className="st"><h2>Why Travelers Choose Desire Journeys</h2><p className="lead">A Rwandan company with local knowledge and a personal approach.</p></div>
    <div className="why">{WHY.map(w=><div key={w[1]}><span className="ic" aria-hidden="true">{w[0]}</span><h3>{w[1]}</h3><p>{w[2]}</p></div>)}</div></div></section>

  <section><div className="wrap"><div className="st"><h2>How It Works</h2></div>
    <div className="steps">{STEPS.map(s=><div className="step" key={s[0]}><h3>{s[0]}</h3><p>{s[1]}</p></div>)}</div></div></section>

  <section id="about" className="alt"><div className="wrap two"><div className="shape"><Art k="forest"/></div>
    <div><h2>Rooted in Rwanda</h2><p className="lead">Desire Journeys is a Rwandan travel company. We plan trips the way we would for friends visiting home: honest advice, good guides and no rushing.</p><p className="lead">Every itinerary can be adjusted to your pace, budget and interests.</p></div></div></section>

  <section id="contact"><div className="wrap two"><div><h2>Want something customized?</h2><p className="lead">Tell us what you have in mind. We reply within one working day.</p>
    <p style={{marginTop:14}}><a className="btn btn-line" href="https://wa.me/250789806163">Chat on WhatsApp</a></p></div>
    <form className="cform" onSubmit={e=>{e.preventDefault();e.target.reset();setMsg('Thanks. Connect this form to email or a backend to receive messages.')}}>
      <div><label htmlFor="cn">Name</label><input id="cn" required/></div><div><label htmlFor="ce">Email</label><input id="ce" type="email" required/></div>
      <div><label htmlFor="cm">Message</label><textarea id="cm" required/></div><button className="btn btn-dark">Send message</button><p className="meta" role="status">{msg}</p></form></div></section>
  </>);
}
