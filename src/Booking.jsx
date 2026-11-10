import {useState} from 'react';
import {J,money} from './data.js';
import Art from './Art.jsx';
const WHATSAPP='250789806163';
const STEPS=['Journey','Date & travelers','Your details','Preferences','Review'];
const DEF={j:'gorilla',date:'',adults:2,kids:0,name:'',email:'',phone:'',country:'',wa:'',stay:'Mid-range',trans:'Private vehicle',budget:'Flexible',extra:'',diet:'',req:''};
const Sel=({id,label,v,set,opts})=>(<div><label htmlFor={id}>{label}</label><select id={id} value={v} onChange={e=>set(e.target.value)}>{opts.map(o=><option key={o}>{o}</option>)}</select></div>);
export default function Booking({init,id}){
  const [B,setB]=useState({...DEF,...init,j:id||init.j||DEF.j});
  const [step,setStep]=useState(1);const [err,setErr]=useState('');const [ref,setRef]=useState('');
  const [sending,setSending]=useState(false);const [sentTo,setSentTo]=useState('');
  const set=k=>v=>setB(b=>({...b,[k]:v}));
  const j=J.find(x=>x.id===B.j)||J[0];
  const price=money(j.price*(B.adults+B.kids*.5));
  const T=(k,label,extra={})=>(<div className={extra.full?'full':''}><label htmlFor={'b'+k}>{label}</label><input id={'b'+k} value={B[k]} onChange={e=>set(k)(e.target.value)} {...extra.p}/></div>);
  const N=(k,label,min)=>(<div><label htmlFor={'b'+k}>{label}</label><input id={'b'+k} type="number" min={min} max="20" value={B[k]} onChange={e=>set(k)(Math.max(min,+e.target.value||min))}/></div>);
  function check(){
    if(step!==3) return '';
    if(!B.name.trim()) return 'Enter your full name.';
    if(!/^\S+@\S+\.\S+$/.test(B.email)) return 'Enter a valid email address.';
    if(!B.phone.trim()) return 'Enter a phone number.';
    if(!B.country.trim()) return 'Enter your country.';
    return '';
  }
  async function sendBooking(){
    setSending(true);setErr('');
    try{
      const response=await fetch('/api/bookings',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
          journeyId:B.j,
          date:B.date,
          adults:B.adults,
          children:B.kids,
          name:B.name,
          email:B.email,
          phone:B.phone,
          whatsapp:B.wa,
          country:B.country,
          stay:B.stay,
          transport:B.trans,
          budget:B.budget,
          activities:B.extra,
          dietary:B.diet,
          requests:B.req
        })
      });
      let result;
      try{
        result=await response.json();
      }catch{
        throw new Error('The booking service returned an invalid response. Please try again.');
      }
      if(!response.ok) throw new Error(result.error||'We could not send your booking. Please try again.');
      if(!result.reference||!result.sentTo) throw new Error('The booking service returned an invalid response. Please try again.');
      setRef(result.reference);setSentTo(result.sentTo);scrollTo(0,0);
    }catch(error){
      setErr(error instanceof Error?error.message:'We could not send your booking. Please try again.');
    }finally{
      setSending(false);
    }
  }
  function next(){
    const e=check();setErr(e);if(e)return;
    if(step<5){setStep(step+1);return}
    void sendBooking();
  }
  if(ref){
    return(<div className="bk" style={{textAlign:'center'}}><h1 style={{fontSize:'clamp(2.2rem,6vw,3.6rem)'}}>Your Journey Starts Here.</h1>
      <p className="lead" style={{margin:'14px auto'}}>Thank you! Your booking request has been sent to {sentTo}. The Desire Journeys team will contact you shortly to confirm availability and finalize your trip.</p>
      <div className="ref">{ref}</div>
      <div className="panel sum" style={{textAlign:'left'}}><div><span className="meta">Journey</span><b>{j.name}</b></div><div><span className="meta">Travel date</span><b>{B.date||'Flexible'}</b></div><div><span className="meta">Contact</span><b>{B.email} · {B.phone}</b></div></div>
      <div className="ctas" style={{justifyContent:'center',marginTop:24}}><a className="btn btn-dark" href="#journeys">Back to Journeys</a>
        <a className="btn btn-line" href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent('Hello, my booking reference is '+ref)}`}>Contact Us on WhatsApp</a></div>
      </div>);
  }
  return(<div className="bk"><h1 style={{fontSize:'clamp(2rem,5vw,3rem)'}}>Book a Journey</h1>
    <div className="prog" aria-label={`Step ${step} of 5`}>{STEPS.map((l,i)=><span key={l} className={i<step?'on':''} title={l}/>)}</div>
    <p className="meta">Step {step} of 5: {STEPS[step-1]}</p>
    <div className="panel" style={{marginTop:12}}>
      {step===1&&<><h2 style={{fontSize:'1.6rem'}}>Choose your journey</h2>
        <div className="mini" style={{marginTop:16}}><div className="art"><Art k={j.k}/></div><div><h3>{j.name}</h3><div className="meta">{j.dest} · {j.dur}</div><div className="price">From {money(j.price)} / person</div></div></div>
        <div><label htmlFor="bj">Change journey</label><select id="bj" value={B.j} onChange={e=>set('j')(e.target.value)}>{J.map(x=><option key={x.id} value={x.id}>{x.name}</option>)}</select></div></>}
      {step===2&&<><h2 style={{fontSize:'1.6rem'}}>When and who</h2><div className="f" style={{marginTop:16}}>
        <div className="full"><label htmlFor="bdate">Preferred travel date</label><input id="bdate" type="date" value={B.date} onChange={e=>set('date')(e.target.value)}/></div>
        {N('adults','Adults',1)}{N('kids','Children',0)}</div><p className="meta" style={{marginTop:12}}>Total travelers: {B.adults+B.kids}</p></>}
      {step===3&&<><h2 style={{fontSize:'1.6rem'}}>Your details</h2><div className="f" style={{marginTop:16}}>
        {T('name','Full name',{full:1,p:{autoComplete:'name'}})}{T('email','Email',{p:{type:'email'}})}{T('phone','Phone number',{p:{type:'tel'}})}{T('country','Country')}{T('wa','WhatsApp (if different)',{p:{type:'tel'}})}</div></>}
      {step===4&&<><h2 style={{fontSize:'1.6rem'}}>Preferences <span className="meta">(optional)</span></h2><div className="f" style={{marginTop:16}}>
        <Sel id="bstay" label="Accommodation" v={B.stay} set={set('stay')} opts={['Budget','Mid-range','Luxury']}/>
        <Sel id="btrans" label="Transportation" v={B.trans} set={set('trans')} opts={['Private vehicle','Shared transfers','Self-drive']}/>
        <Sel id="bbudget" label="Budget range" v={B.budget} set={set('budget')} opts={['Under $1,000','$1,000 to $2,500','Over $2,500','Flexible']}/>
        {T('extra','Additional activities')}{T('diet','Dietary requirements',{full:1})}
        <div className="full"><label htmlFor="breq">Special requests</label><textarea id="breq" value={B.req} onChange={e=>set('req')(e.target.value)}/></div></div></>}
      {step===5&&<><h2 style={{fontSize:'1.6rem'}}>Your Journey</h2><div className="sum" style={{marginTop:14}}>
        {[['Journey',j.name],['Destination',j.dest],['Travel date',B.date||'Flexible'],['Travelers',`${B.adults} adult${B.adults>1?'s':''}${B.kids?`, ${B.kids} child${B.kids>1?'ren':''}`:''}`],['Options',`${B.stay} stay, ${B.trans}, budget: ${B.budget}`],['Estimated price',`${price} (estimate; final quote confirmed by our team)`]].map(r=><div key={r[0]}><span className="meta">{r[0]}</span><b style={{textAlign:'right'}}>{r[1]}</b></div>)}</div></>}
      {err&&<p className="err" role="alert">{err}</p>}
      <div className="row">{step>1?<button className="btn btn-line" onClick={()=>{setErr('');setStep(step-1)}}>Back</button>:<span/>}
        <button className={`btn ${step===5?'btn-gold':'btn-dark'}`} onClick={next} disabled={sending}>{sending?'Sending…':step===5?'Send Booking Request':'Continue'}</button></div>
    </div></div>);
}
