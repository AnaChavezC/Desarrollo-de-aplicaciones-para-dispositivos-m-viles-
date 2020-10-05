function resetFields(){
    document.getElementById("Input1").value='';
    document.getElementById("Input2").value='';
    document.getElementById("Input3").value='';
    document.getElementById("Input4").value='selecciona';
}

function createR() {
    
    //Guardo los datos capturados usando el id de cada control
    var folio = document.getElementById("Input1").value;
    var nombre = document.getElementById("Input2").value;
    var correo = document.getElementById("Input3").value;
    var actividad = document.getElementById("Input4").value;


    //validaciones
    if (folio.length > 0) {
        //creo un objeto que guarda los datos
        var aspirante = {
            folio, //matricula:id
            nombre,
            correo,
            actividad,
        }

        var lista_aspirantes=JSON.parse(localStorage.getItem("Aspirantes"));

        if(lista_aspirantes==null)
        { 
            var lista_aspirantes = [];
        }
        
        const existe = lista_aspirantes.some(element=>element.folio==folio); 

        if(!existe||document.getElementById("Input1").disabled==true)
        {
            
            if(document.getElementById("Input1").disabled==true)
            {
                var lista_aspirantes=lista_aspirantes.filter(aspirante=>aspirante.folio!=folio);

            }
                
            lista_aspirantes.push(aspirante);
            var temporal = lista_aspirantes.sort((a,b) => a.folio-b.folio);
            localStorage.setItem("Aspirantes", JSON.stringify(temporal));
            
            read();
            resetFields();
            swal("Listo!", "Agregado correctamente", "success");

        }
        else
        {
            swal("Error", "Ya existe ese folio de aspirante","warning");
        }

    } 
    else 
    {
        swal("Error", "Llena todos los campos","warning");
    }

    document.getElementById("Input1").disabled = false;
    
}

function read(){
    document.getElementById("Table1").innerHTML='';
    

    const lista_aspirantes = JSON.parse(localStorage.getItem("Aspirantes"));
    
     
    if(lista_aspirantes)
    {
        lista_aspirantes.forEach((aspirante)=>printRow(aspirante));
    }
}


function printRow(aspirante){
    
    if(aspirante!=null){
        var table = document.getElementById("Table1"); 

        //creamos un nuevo elemento en la tabla en la ultima posicion
        var row = table.insertRow(-1);

        //Insertamos cada una de las celdas/columnas del registro
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        
        //Agregamos la informacion a cada una de las columnas del registro
        cell1.innerHTML = aspirante.folio;
        cell2.innerHTML = aspirante.nombre; 
        cell3.innerHTML = aspirante.correo;
        cell4.innerHTML = aspirante.actividad; 
        cell5.innerHTML = `<button type="button" class="btn btn-danger" onClick="deleteR(${aspirante.folio})">Eliminar</button>`;
        cell6.innerHTML = '<button type="button" class="btn btn-success" onClick="seekR('+aspirante.folio+')">Modificar</button>';
    }
}

function deleteR(folio){
    const lista_aspirantes = JSON.parse(localStorage.getItem("Aspirantes"));
    var temporal=lista_aspirantes.filter(aspirante=>aspirante.folio!=folio);
    localStorage.setItem("Aspirantes", JSON.stringify(temporal));

    if(temporal.length==0)
    { 
        localStorage.removeItem("Aspirantes");
    }
 
    read();
    
}

function seekR(folio){

    const lista_aspirantes = JSON.parse(localStorage.getItem("Aspirantes"));
    var aspirante=lista_aspirantes.filter(aspirante=>aspirante.folio==folio);
    //console.log(aspirante[0]);
    updateR(aspirante[0]);
}

function updateR(aspirante){
    if(aspirante!=null)
    {
        document.getElementById("Input1").value=aspirante.folio;
        document.getElementById("Input1").disabled = true;
        document.getElementById("Input2").value=aspirante.nombre;
        document.getElementById("Input3").value=aspirante.correo;
        document.getElementById("Input4").value=aspirante.actividad;
    }
}


//Para consulta de actividad
function readQ(){
    document.getElementById("Table2").innerHTML='';
    var c = document.getElementById("Input5").value;
  
    const lista_aspirantes = JSON.parse(localStorage.getItem("Aspirantes"));
    var aspirantesC=lista_aspirantes.filter(aspirante=>aspirante.actividad==c);
    if(aspirantesC)
    {
        aspirantesC.forEach((aspirante)=>printRowQ(aspirante));
    }
    //console.log(aspirantesC)

}


function printRowQ(aspirante){

    var table = document.getElementById("Table2"); 
    
    //creamos un nuevo elemento en la tabla en la ultima posicion
    var row = table.insertRow(-1);

    //Insertamos cada una de las celdas/columnas del registro
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    
    //Agregamos la informacion a cada una de las columnas del registro
    cell1.innerHTML = aspirante.folio;
    cell2.innerHTML = aspirante.nombre; 
    cell3.innerHTML = aspirante.correo;
    cell4.innerHTML = aspirante.actividad; 
   
}