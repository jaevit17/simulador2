
  let clientes = [];
  let creditos = [];

  let tasaInteres = 15;
  let clienteSeleccionado = null;
  let cuotaCalculada = 0;
  let montoCalculado = 0;
  let plazoCalculado = 0;
  let creditoAprobado = false;

  
//Funciones--------------------
// ocultar secciones
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