(function(root){
  const strokes = [[{x:105,y:345},{x:210,y:75}], [{x:210,y:75},{x:315,y:345}], [{x:147,y:237},{x:273,y:237}]];
  function distance(point, start, end){
    const dx = end.x-start.x, dy = end.y-start.y;
    const fraction = Math.max(0, Math.min(1, ((point.x-start.x)*dx+(point.y-start.y)*dy)/(dx*dx+dy*dy || 1)));
    return Math.hypot(point.x-start.x-fraction*dx, point.y-start.y-fraction*dy);
  }
  function coverage(){
    const samples = strokes.map(([start,end]) => Array.from({length:41}, (_,index) => ({x:start.x+(end.x-start.x)*index/40,y:start.y+(end.y-start.y)*index/40,hit:false})));
    return {
      add(start,end){
        samples.forEach(points => points.forEach(point => { if(distance(point,start,end)<=23) point.hit=true; }));
        const ratios = samples.map(points => points.filter(point=>point.hit).length/points.length);
        return {percent:Math.round(ratios.reduce((sum,ratio)=>sum+ratio,0)/3*100),complete:ratios.every(ratio=>ratio>=.8)};
      }
    };
  }
  const api = {strokes,coverage};
  if(typeof module!=='undefined') module.exports=api;
  else root.LetterPath=api;
})(typeof window!=='undefined'?window:globalThis);

