import {randomUUID} from 'node:crypto';
import {J,money} from '../src/data.js';

const BOOKINGS_EMAIL='mutadisi2@gmail.com';

function respond(res,status,payload){
  return res.status(status).json(payload);
}

function readText(value,maxLength,required=false){
  if(value==null&&!required) return '';
  if(typeof value!=='string') return null;
  const text=value.trim();
  return text.length<=maxLength&&(!required||text.length>0)?text:null;
}

export default async function handler(req,res){
  if(req.method!=='POST') return respond(res,405,{error:'Use POST to submit a booking.'});

  const body=req.body;
  if(!body||typeof body!=='object'||Array.isArray(body)) return respond(res,400,{error:'Invalid booking details.'});

  const journeyId=readText(body.journeyId,40,true);
  const journey=J.find(item=>item.id===journeyId);
  const date=readText(body.date,10);
  const name=readText(body.name,120,true);
  const email=readText(body.email,254,true);
  const phone=readText(body.phone,40,true);
  const whatsapp=readText(body.whatsapp,40);
  const country=readText(body.country,100,true);
  const stay=readText(body.stay,40,true);
  const transport=readText(body.transport,60,true);
  const budget=readText(body.budget,60,true);
  const activities=readText(body.activities,1000);
  const dietary=readText(body.dietary,500);
  const requests=readText(body.requests,2000);
  const adults=body.adults;
  const children=body.children;

  if(!journey||date===null||name===null||email===null||phone===null||whatsapp===null
    ||country===null||stay===null||transport===null||budget===null
    ||activities===null||dietary===null||requests===null
    ||!Number.isInteger(adults)||adults<1||adults>20
    ||!Number.isInteger(children)||children<0||children>20
    ||(date&&!/^\d{4}-\d{2}-\d{2}$/.test(date))
    ||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
    return respond(res,400,{error:'Some booking details are missing or invalid. Please review them and try again.'});
  }

  const apiKey=process.env.RESEND_API_KEY;
  const from=process.env.BOOKING_FROM_EMAIL;
  if(!apiKey||!from) return respond(res,500,{error:'Booking email is not configured yet. Please contact us directly.'});

  const reference=`DJ-${randomUUID().slice(0,8).toUpperCase()}`;
  const price=money(journey.price*(adults+children*.5));
  const text=[
    `BOOKING REQUEST ${reference}`,
    '',
    `Journey: ${journey.name}`,
    `Destination: ${journey.dest}`,
    `Duration: ${journey.dur}`,
    `Travel date: ${date||'Flexible'}`,
    `Adults: ${adults}`,
    `Children: ${children}`,
    `Estimated price: ${price}`,
    '',
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    `WhatsApp: ${whatsapp||phone}`,
    `Country: ${country}`,
    '',
    `Accommodation: ${stay}`,
    `Transport: ${transport}`,
    `Budget: ${budget}`,
    `Activities: ${activities||'-'}`,
    `Dietary requirements: ${dietary||'-'}`,
    `Special requests: ${requests||'-'}`
  ].join('\n');

  let response;
  try{
    response=await fetch('https://api.resend.com/emails',{
      method:'POST',
      headers:{Authorization:`Bearer ${apiKey}`,'Content-Type':'application/json'},
      body:JSON.stringify({
        from,
        to:[BOOKINGS_EMAIL],
        reply_to:email,
        subject:`Booking request ${reference}: ${journey.name}`,
        text
      })
    });
  }catch(error){
    console.error('Unable to reach Resend for booking delivery.',error);
    return respond(res,502,{error:'We could not send your booking email. Please try again.'});
  }

  if(!response.ok){
    console.error('Resend rejected booking email.',{status:response.status});
    return respond(res,502,{error:'We could not send your booking email. Please try again.'});
  }

  return respond(res,200,{reference,sentTo:BOOKINGS_EMAIL});
}
