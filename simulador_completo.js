
  let clientes=[];
  let creditos = [];

  let tasaInteres = 15;
  let clienteSeleccionado = null;
  let cuotaCalculada = 0;
  let montoCalculado = 0;
  let plazoCalculado = 0;
  let creditoAprobado = false;


//Objetos precargados-----------------
let cliente1={
              cedula:1712345678,
              nombre:"Juan",
              apellido:"Pérez",
              ingresos:1200,
              egresos:500
              }
clientes.push(cliente1);
let cliente2={
              cedula:1723456789,
              nombre:"María",
              apellido:"Gómez",
              ingresos:1500,
              egresos:600
              }
clientes.push(cliente2);
let cliente3={
              cedula:1734567890,
              nombre:"Carlos",
              apellido:"Ramírez",
              ingresos:900,
              egresos:350
              }
clientes.push(cliente3);


//Funciones Parametros----------------
//ocultar secciones
function ocultarSecciones(){
  desactivaSeccion("parametros")
  desactivaSeccion("clientes")
}
//mostrar seccion
function mostrarSeccion(idSeccion){
  ocultarSecciones();
  activaSeccion(idSeccion);
}
//guardar tasa
function guardarTasa(){
  let cmpTasa=recuperarCajaTexto("tasaInteres");
  let tasa=parseInt(cmpTasa);
  if(tasa<10||tasa>20){
    mostrarMensajeTasa("La tasa debe estar entre 10% y 20%");
  }else{
    mostrarMensajeTasa("Tasa configurada correctamente: "+tasa+"%");
  }
}


//Funciones Clientes----------------
//guardar cliente
function guardarCliente(){
  let cedula=recuperarInt("cedula");
  let nombre=recuperarCajaTexto("nombre");
  let apellido=recuperarCajaTexto("apellido");
  let ingresos=recuperarInt("ingresos");
  let egresos=recuperarInt("egresos");
  let clienteEncontrado=buscarCliente(cedula);
  if(clienteEncontrado==null){
  let cliente={cedula,
              nombre,
              apellido,
              ingresos,
              egresos
              }
  clientes.push(cliente);
  }else{
    clienteEncontrado.nombre=nombre;
    clienteEncontrado.apellido=apellido;
    clienteEncontrado.ingresos=ingresos;
    clienteEncontrado.egresos=egresos;
}
pintarClientes();
}
//pintar clientes
function pintarClientes(){
  let contenidoTabla="";
  for( let i=0;i<clientes.length;i++){
    contenidoTabla+="<tr>"+
          "<td>"+clientes[i].cedula+"</td>"+
          "<td>"+clientes[i].nombre+"</td>"+
          "<td>"+clientes[i].apellido+"</td>"+
          "<td>"+clientes[i].ingresos+"</td>"+
          "<td>"+clientes[i].egresos+"</td>"+
          "<td>"+
            `<button onclick="seleccionarCliente('`+clientes[i].cedula+`')">Actualizar</button>`+
            "<button>Eliminar</button>"+
          "</td>"+
        "</tr>"
  }
  mostrarContenidoHtml("tablaClientes",contenidoTabla);
}
//buscar cliente
function buscarCliente(cedula){
  let clienteEncontrado=null;
  for(let i=0;i<clientes.length;i++){
    if(clientes[i].cedula==cedula){
      clienteEncontrado=clientes[i];
      break;
    }
  }
  return clienteEncontrado;
}
//seleccionar cliente
function seleccionarCliente(cedula){
  let clienteSeleccionado=buscarCliente(cedula);
  if(clienteSeleccionado !=null){
    mostrarContenidoCajaText("cedula",clienteSeleccionado.cedula);
    mostrarContenidoCajaText("nombre",clienteSeleccionado.nombre);
    mostrarContenidoCajaText("apellido",clienteSeleccionado.apellido);
    mostrarContenidoCajaText("ingresos",clienteSeleccionado.ingresos);
    mostrarContenidoCajaText("egresos",clienteSeleccionado.egresos);
  }
}
//limpiar
function limpiar(){
    mostrarContenidoCajaText("cedula","");
    mostrarContenidoCajaText("nombre","");
    mostrarContenidoCajaText("apellido","");
    mostrarContenidoCajaText("ingresos","");
    mostrarContenidoCajaText("egresos","");
}


//Funciones Creditos----------------
//buscar Cliente para Credito
function buscarClienteCredito(){
  let cedula=document.getElementById("buscarCedulaCredito");
  let valorCedula=cedula.value;
  let cliente=buscarCliente(valorCedula);
  if(cliente!=null){
    mostrarMensajeDiv("datosClienteCredito",'<h3>Datos del Cliente</h3>'+
    '<p><strong>Cédula: </strong>'+cliente.cedula+'</p>'+
    '<p><strong>Nombre: </strong>'+cliente.nombre+'</p>'+
    '<p><strong>Apellido: </strong>'+cliente.apellido+'</p>'+
    '<p><strong>Ingresos: </strong>'+cliente.ingresos+'</p>'+
    '<p><strong>Egresos: </strong>'+cliente.egresos+'</p>');
  }else{
    mensajeEnParrafo("datosClienteCredito", "Cliente: "+valorCedula+", no encontrado");
  }
}
//calcular Credito
function calcularCredito(){
  //capacidad de pago
  let cedula=document.getElementById("buscarCedulaCredito");
  let valorCedula=cedula.value;
  let cliente=buscarCliente(valorCedula);
  let disponible=cliente.ingresos-cliente.egresos;
  let capacidPago=capacidadDePago(disponible);
  //Total a pagar
  let monto=recuperarFloat("montoCredito");
  let plazoAnios=recuperarInt("plazoCredito");
  let tasa=recuperarInt("tasaCredito");
  let intereses=interes(monto,tasa,plazoAnios);
  let totalAPagar=totalPagar(monto,intereses)
  //Cuota mensual
  let mensual=calcularCuotaMensual(totalAPagar,plazoAnios).toFixed(2);
  //Resultado del Credito
  let resultCredito=aprobarCredito(capacidPago,mensual);
  if(resultCredito==true){
  mostrarTexto("resultadoAprobacion", "CREDITO: APROVADO")
  }if(resultCredito==false){
  mostrarTexto("resultadoAprobacion","CREDITO: RECHAZADO")
  }
}
