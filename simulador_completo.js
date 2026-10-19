
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

//Creditos precargados----------------
let credito1={
              cedula:1712345678,
              nombre:"Juan",
              apellido:"Pérez",
              monto:3000,
              tasa:15,
              plazo:1,
              cuota:287.50
}
creditos.push(credito1);
let credito2={
              cedula:1723456789,
              nombre:"María",
              apellido:"Gómez",
              monto:5000,
              tasa:14,
              plazo:2,
              cuota:237.50
}
creditos.push(credito2);
let credito3={
              cedula:1734567890,
              nombre:"Carlos",
              apellido:"Ramírez",
              monto:1500,
              tasa:16,
              plazo:0.5,
              cuota:290.00
}
creditos.push(credito3);


//Funciones Parametros----------------
//ocultar secciones
function ocultarSecciones(){
  desactivaSeccion("parametros")
  desactivaSeccion("clientes")
  desactivaSeccion("creditos")
  desactivaSeccion("listaCreditos")
  desactivaSeccion("contacto")
}
//mostrar seccion
function mostrarSeccion(idSeccion){
  ocultarSecciones();
  activaSeccion(idSeccion);
}
//guardar tasa
function guardarTasa(){
  let cmpTasa=recuperarCajaTexto("tasaInteres");
  tasaInteres=parseInt(cmpTasa);
  if(tasaInteres<10||tasaInteres>20){
    mostrarMensajeTasa("La tasa debe estar entre 10% y 20%");
  }else{
    mostrarMensajeTasa("Tasa configurada correctamente: "+tasaInteres+"%");
  }
  return tasaInteres;
}


//Funciones Clientes----------------
//guardar cliente
function guardarCliente(){
  let cedula=recuperarInt("cedula");
  let nombre=recuperarCajaTexto("nombre");
  let apellido=recuperarCajaTexto("apellido");
  let ingresos=recuperarInt("ingresos");
  let egresos=recuperarInt("egresos");
  let email=recuperarCajaTexto("email");
  let clienteEncontrado=buscarCliente(cedula);
  if(clienteEncontrado==null){
  let cliente={cedula,
              nombre,
              apellido,
              ingresos,
              egresos,
              email
              }
  clientes.push(cliente);
  }else{
    clienteEncontrado.nombre=nombre;
    clienteEncontrado.apellido=apellido;
    clienteEncontrado.ingresos=ingresos;
    clienteEncontrado.egresos=egresos;
    clienteEncontrado.email=email;
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
          "<td>"+clientes[i].email+"</td>"+
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
  clienteSeleccionado=buscarCliente(cedula);
  if(clienteSeleccionado !=null){
    mostrarContenidoCajaText("cedula",clienteSeleccionado.cedula);
    mostrarContenidoCajaText("nombre",clienteSeleccionado.nombre);
    mostrarContenidoCajaText("apellido",clienteSeleccionado.apellido);
    mostrarContenidoCajaText("ingresos",clienteSeleccionado.ingresos);
    mostrarContenidoCajaText("egresos",clienteSeleccionado.egresos);
    mostrarContenidoCajaText("email",clienteSeleccionado.email);
  }
}
//limpiar
function limpiar(){
    mostrarContenidoCajaText("cedula","");
    mostrarContenidoCajaText("nombre","");
    mostrarContenidoCajaText("apellido","");
    mostrarContenidoCajaText("ingresos","");
    mostrarContenidoCajaText("egresos","");
    mostrarContenidoCajaText("email","");
}


//Funciones Creditos----------------
//buscar Cliente para Credito
function buscarClienteCredito(){
  let cedula=document.getElementById("buscarCedulaCredito");
  let valorCedula=cedula.value;
  let cliente=buscarCliente(valorCedula);
  clienteSeleccionado=cliente;
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
  let valorCedula=recuperarCajaTexto("buscarCedulaCredito");
  let cliente=buscarCliente(valorCedula);
  let disponible=cliente.ingresos-cliente.egresos;
  let capacidPago=capacidadDePago(disponible).toFixed(2);
  //Total a pagar
  montoCalculado=recuperarFloat("montoCredito");
  plazoCalculado=recuperarInt("plazoCredito");
  let intereses=interes(montoCalculado,tasaInteres,plazoCalculado);
  let totalAPagar=totalPagar(montoCalculado,intereses)
  //Cuota mensual
  cuotaCalculada=calcularCuotaMensual(totalAPagar,plazoCalculado).toFixed(2);
  //Resultado del Credito
  let colorResultado1=document.getElementById("resultadoCredito");
  let colorResultado2=document.getElementById("resultadoAprobacion");
  let resultCredito=aprobarCredito(Number(capacidPago),Number(cuotaCalculada));
  if(resultCredito==true){
  mostrarTexto("resultadoAprobacion", " APROVADO")
  colorResultado1.className="aprobado";
  colorResultado2.className="resultadoAprobado";
  }if(resultCredito==false){
  mostrarTexto("resultadoAprobacion"," RECHAZADO")
  colorResultado1.className="rechazado";
  colorResultado2.className="resultadoRechazado";
  }
  //Mostrar en pantalla resultados
  mostrarMensajeDiv("resultadoCredito",'<h3>Datos del Credito</h3>'+
  '<p><strong>Capacidad de Pago: </strong>'+capacidPago+'</p>'+
  '<p><strong>Total a pagar: </strong>'+totalAPagar+'</p>'+
  '<p><strong>Cuota Mensual: </strong>'+cuotaCalculada+'</p>'+
  '<p><strong>Plazo: </strong>'+(plazoCalculado*12)+' meses</p>');
  //Habilitar o deshabilitar el botón
  if (resultCredito==true){
    document.getElementById("Asignar crédito").disabled = false;
  }
  if (resultCredito==false){
    document.getElementById("Asignar crédito").disabled = true;
  }
}
//Solicitar Credito
function solicitarCredito(){
  let credito={
    cedula: clienteSeleccionado.cedula,
    nombre: clienteSeleccionado.nombre,
    apellido: clienteSeleccionado.apellido,
    monto: montoCalculado,
    tasa: tasaInteres,
    plazo: plazoCalculado,
    cuota: cuotaCalculada
  }
  creditos.push(credito);
  alert("Credito asignado correctamente")
}


//Funciones Lista Creditos---------------
//Buscar Creditos
function buscarCreditos(cedula){
  let creditosEncontrados=[];
  for(let i=0; i<creditos.length;i++){
    if(creditos[i].cedula==cedula){
      creditosEncontrados.push(creditos[i]) ;
    }
  }
  return creditosEncontrados;
}
//Pintar Creditos
function pintarCreditos(creditos){
  let contenidoTabla="";
  for (let i=0;i<creditos.length;i++){
    contenidoTabla+="<tr>"+
        "<td>"+creditos[i].cedula+"</td>"+
        "<td>"+creditos[i].nombre+"</td>"+
        "<td>"+creditos[i].apellido+"</td>"+
        "<td>"+creditos[i].monto+"</td>"+
        "<td>"+creditos[i].tasa+"%"+"</td>"+
        "<td>"+(creditos[i].plazo*12)+" meses"+"</td>"+
        "<td>"+creditos[i].cuota+"</td>"+
        "<td><button>Eliminar</button></td>"+
      "</tr>"
  }
  mostrarContenidoHtml("tablaCreditos",contenidoTabla);
}
//Buscar credito de cliente
function buscarCreditosCliente(){
  let cedula=recuperarCajaTexto("buscarCedulaListado");
  let clienteCredito=buscarCreditos(cedula);
  pintarCreditos(clienteCredito);
}