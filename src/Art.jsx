import {useId} from 'react';
import volcano from './assets/volcano.jpg';import savanna from './assets/savanna.jpg';import lake from './assets/lake.jpg';import city from './assets/city.jpg';import forest from './assets/forest.jpg';
const IMG={volcano,savanna,lake,city,forest};
const ALT={volcano:'Volcano above farmland in Rwanda',savanna:'Zebras and a safari vehicle in Akagera',lake:'Lake Kivu shoreline and lodge',city:'Kigali city centre',forest:'Canopy walkway above Nyungwe forest'};
// Swap the culture illustration for a photo by adding src/assets/culture.jpg and importing it into IMG.
export default function Art({k}){
  const id='g'+useId().replace(/:/g,'');
  if(IMG[k]) return <img className="art" src={IMG[k]} alt={ALT[k]}/>;
  return(<svg className="art" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Rwandan culture scene">
    <defs><linearGradient id={id} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ffe3a8"/><stop offset="1" stopColor="#fff6e2"/></linearGradient></defs>
    <rect width="400" height="300" fill={`url(#${id})`}/><circle cx="200" cy="120" r="70" fill="#FCB436" opacity=".85"/>
    <g fill="#32180F"><path d="M120 258c0-50 20-70 40-70s40 20 40 70z"/><path d="M220 258c0-40 18-60 36-60s36 20 36 60z"/></g>
    <path d="M0 258h400v42H0z" fill="#32180F"/>
    {Array.from({length:10},(_,n)=>(<g key={n}><path d={`M${n*40} 258l20 24 20-24z`} fill="#FCB436"/><path d={`M${n*40+20} 300l20-18 20 18z`} fill="#fff"/></g>))}
  </svg>);
}
