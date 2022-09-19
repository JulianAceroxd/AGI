let contador=0;
let recargar=1;
$(document).ready(function(){
  

    $('.botons').on('click',function(){
        
         
contador=contador+1;

if(contador>1){
   

}else{
      

    let btn=$('.botons').index(this);
    let doc=$('.id').eq(btn);
    let usu=$('.usu').eq(btn);
    
    let d=doc.val();
    let idu=usu.val();


    const d3={
        id: d,
        id2:idu

    };
    let =url='/ValidarVotos'
    fetch(url,{
     method:'POST',
     headers:{
 
         "content-Type":"application/json",
     },
     body: JSON.stringify(d3),
    })
    .then(Response=>Response.json())
    .then(data=>mostrarDatos2(data))
    .catch(error=>console.log(error))
  
    const mostrarDatos2=(data)=>{
       
  
        if(data.length>0){
alert("YA PARTICIPASTE! PARTICIPA EN LAS DEMAS URNAS.")

        }else{
   
          
   const d2={
       id: d
   };

   let =url='/urnadatos'
   fetch(url,{
    method:'POST',
    headers:{

        "content-Type":"application/json",
    },
    body: JSON.stringify(d2),
   })
   .then(Response=>Response.json())
   .then(data=>mostrarDatos(data))
   .catch(error=>console.log(error))
   const mostrarDatos=(data)=>{





   for(i=0; i<data.length;i++){

 

    var button = ' <form class="for" id="" action="Votos" method="post"><div class="loo"><input   type="submit"value="'+data[i].Opcion+'"  id="eventovt"  name="opcion"/><input type="hidden"value="'+data[i].IdUrna+'"  id="num_parrafos" name="id"/><input type="hidden" value="'+idu+'" name="usuario"></div></form>'
    
    $('#botones'+d ).append(button);
    $('.for').on('click',function(){
       
        alert("TU OPCION SE REGISTRO CORRECTAMENTE!")
       
      });
    
        
    
  
   
}} 






}
}

}

    });
  
});
recargar=recargar+1;