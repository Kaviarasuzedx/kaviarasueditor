'use client';
import { useEffect, useRef } from 'react';
export type SocialContactCardProps = { platform: string; logo?: {viewBox:string;path:string}; primary?:string; accent?:string; glow?:string; label?:string; url:string };
export default function SocialContactCard({platform,logo,primary,accent,glow,label,url}:SocialContactCardProps){
 const ref=useRef<HTMLDivElement>(null);
 useEffect(()=>{let cancelled=false;let card:HTMLElement|undefined;void import('./card.js').then(()=>{const host=ref.current;if(cancelled||!host)return;const element=document.createElement('social-contact-card') as HTMLElement & {logo?:SocialContactCardProps['logo']};element.logo=logo;for(const [key,value] of Object.entries({platform,primary,accent,glow,label,url})){if(value)element.setAttribute(key,value);}host.replaceChildren(element);card=element;});return()=>{cancelled=true;card?.remove();};},[platform,logo,primary,accent,glow,label,url]);
 return <div ref={ref} style={{minWidth:0,aspectRatio:'16 / 9'}}/>;
}
