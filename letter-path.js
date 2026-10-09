(function(root){
  const strokes = [[{x:105,y:345},{x:210,y:75}], [{x:210,y:75},{x:315,y:345}], [{x:147,y:237},{x:273,y:237}]];
  function distance(point, start, end){
    const dx = end.x-start.x, dy = end.y-start.y;
    const fraction = Math.max(0, Math.min(1, ((point.x-start.x)*dx+(point.y-start.y)*dy)/(dx*dx+dy*dy || 1)));
    return Math.hypot(point.x-start.x-fraction*dx, point.y-start.y-fraction*dy);
  }
  function coverage(paths=strokes){
    const samples = paths.map(points => {
      const lengths=points.slice(1).map((point,index)=>Math.hypot(point.x-points[index].x,point.y-points[index].y));
      const total=lengths.reduce((sum,length)=>sum+length,0);
      return Array.from({length:41},(_,index)=>{
        let remaining=total*index/40,segment=0;
        while(segment<lengths.length-1 && remaining>lengths[segment])remaining-=lengths[segment++];
        const fraction=Math.min(1,remaining/lengths[segment]);
        return {x:points[segment].x+(points[segment+1].x-points[segment].x)*fraction,y:points[segment].y+(points[segment+1].y-points[segment].y)*fraction,hit:false};
      });
    });
    return {
      add(start,end){
        samples.forEach(points => points.forEach((point,index) => { if(distance(point,start,end)<=(index===0 || index===points.length-1 ? 8 : 12)) point.hit=true; }));
        const ratios = samples.map(points => points.filter(point=>point.hit).length/points.length);
        return {ratios,percent:Math.round(ratios.reduce((sum,ratio)=>sum+ratio,0)/paths.length*100),complete:ratios.every(ratio=>ratio===1)};
      }
    };
  }
  function curve(start,controlFirst,controlSecond,end){
    return Array.from({length:33},(_,index)=>{
      const fraction=index/32,inverse=1-fraction;
      return {x:inverse**3*start.x+3*inverse**2*fraction*controlFirst.x+3*inverse*fraction**2*controlSecond.x+fraction**3*end.x,y:inverse**3*start.y+3*inverse**2*fraction*controlFirst.y+3*inverse*fraction**2*controlSecond.y+fraction**3*end.y};
    });
  }
  const upperB=[{x:170,y:80},{x:215,y:80},...curve({x:215,y:80},{x:325,y:80},{x:325,y:210},{x:215,y:210}).slice(1),{x:125,y:210}];
  const lowerB=[{x:170,y:210},{x:220,y:210},...curve({x:220,y:210},{x:345,y:210},{x:345,y:345},{x:220,y:345}).slice(1),{x:125,y:345}];
  const curvedC=Array.from({length:65},(_,index)=>{
    const angle=(-45-270*index/64)*Math.PI/180;
    return {x:210+120*Math.cos(angle),y:210+135*Math.sin(angle)};
  });
  const bowlD=[{x:125,y:80},{x:190,y:80},...curve({x:190,y:80},{x:350,y:80},{x:350,y:345},{x:190,y:345}).slice(1),{x:125,y:345}];
  const strokesE=[[{x:125,y:80},{x:125,y:345}],[{x:125,y:80},{x:305,y:80}],[{x:125,y:212},{x:275,y:212}],[{x:125,y:345},{x:305,y:345}]];
  const curvedG=Array.from({length:65},(_,index)=>{
    const angle=(-45-315*index/64)*Math.PI/180;
    return {x:210+120*Math.cos(angle),y:210+135*Math.sin(angle)};
  });
  const pathsByLetter={A:strokes,B:[[{x:125,y:80},{x:125,y:345}],upperB,lowerB],C:[curvedC],D:[[{x:125,y:80},{x:125,y:345}],bowlD],E:strokesE,F:strokesE.slice(0,3),G:[curvedG,[{x:330,y:210},{x:235,y:210}]],H:[[{x:125,y:80},{x:125,y:345}],[{x:295,y:80},{x:295,y:345}],[{x:125,y:212},{x:295,y:212}]]};
  pathsByLetter.I=[[{x:210,y:80},{x:210,y:345}],[{x:130,y:80},{x:290,y:80}],[{x:130,y:345},{x:290,y:345}]];
  const hookedJ=[{x:275,y:80},{x:275,y:265},...curve({x:275,y:265},{x:275,y:365},{x:125,y:365},{x:125,y:285}).slice(1)];
  pathsByLetter.J=[hookedJ,[{x:175,y:80},{x:325,y:80}]];
  pathsByLetter.K=[[{x:125,y:80},{x:125,y:345}],[{x:295,y:80},{x:125,y:212}],[{x:125,y:212},{x:295,y:345}]];
  pathsByLetter.L=[[{x:145,y:80},{x:145,y:345}],[{x:145,y:345},{x:280,y:345}]];
  pathsByLetter.M=[[{x:100,y:80},{x:100,y:345}],[{x:100,y:80},{x:210,y:235}],[{x:210,y:235},{x:320,y:80}],[{x:320,y:80},{x:320,y:345}]];
  pathsByLetter.N=[[{x:125,y:80},{x:125,y:345}],[{x:125,y:80},{x:295,y:345}],[{x:295,y:80},{x:295,y:345}]];
  const tildeEnie=Array.from({length:33},(_,index)=>({x:160+100*index/32,y:55-12*Math.sin(2*Math.PI*index/32)}));
  pathsByLetter.Ñ=[[{x:125,y:115},{x:125,y:345}],[{x:125,y:115},{x:295,y:345}],[{x:295,y:115},{x:295,y:345}],tildeEnie];
  const ovalO=Array.from({length:65},(_,index)=>{
    const angle=(-90-360*index/64)*Math.PI/180;
    return {x:210+110*Math.cos(angle),y:210+135*Math.sin(angle)};
  });
  pathsByLetter.O=[ovalO];
  const bowlP=[{x:145,y:80},{x:215,y:80},...curve({x:215,y:80},{x:345,y:80},{x:345,y:220},{x:215,y:220}).slice(1),{x:145,y:220}];
  pathsByLetter.P=[[{x:145,y:80},{x:145,y:345}],bowlP];
  const ovalQ=Array.from({length:65},(_,index)=>{
    const angle=(-90-360*index/64)*Math.PI/180;
    return {x:205+105*Math.cos(angle),y:195+120*Math.sin(angle)};
  });
  pathsByLetter.Q=[ovalQ,[{x:255,y:265},{x:325,y:345}]];
  pathsByLetter.R=[...pathsByLetter.P,[{x:190,y:220},{x:310,y:345}]];
  function forLetter(letter){
    const paths=pathsByLetter[letter];
    if(!paths)throw new Error(`No hay trazado para ${letter}`);
    return {strokes:paths,coverage:()=>coverage(paths)};
  }
  const api = {strokes,coverage,forLetter};
  if(typeof module!=='undefined') module.exports=api;
  else root.LetterPath=api;
})(typeof window!=='undefined'?window:globalThis);
