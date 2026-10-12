
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
//mostrarSeccion
function mostrarSeccion(idSeccion){
  ocultarSecciones();
  activaSeccion(idSeccion);
}