function Leer() {
    const city = document.getElementById("input").value;
    const key='';
    const api_url=`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`
    buscar(api_url);
}

function buscar(api_url){

      fetch(api_url)
      .then(data => {
        return data.json()
      }).then(resultado=>{
          const coord=resultado;
           function temp1({name,main:{temp:calor}})
           {
             return `En la ciudad de ${name}` + `<br/> La temperatura es de: ${calor} Celsius`;
           }

           function whois({name,main:{temp:calor}})
           {
             
             return `${name} es ${calor} Celsius`;
           }


           console.log(temp1 (coord));
           document.getElementById("lista").innerHTML=temp1(coord);

      });

      fetch(api_url)
      .then(data => {
        return data.json()
      }).then(resultado1=>{
          const coord=resultado1;
          
           function viento({wind:{speed:velocidad}})
           {
             return `El viento es de: ${velocidad} metros/hora`;
           }
  
           function whois({wind:{speed:velocidad}})
           {
             
             return ` ${velocidad} metros/hora`;
           }

           console.log(viento (coord));
           document.getElementById("lista1").innerHTML=viento(coord);

      });
}


