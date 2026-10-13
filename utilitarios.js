//Navegacion secciones
function activaSeccion(idComponente){
    let componente=document.getElementById(idComponente);
    let valor=componente.classList.add("activa");
}
function desactivaSeccion(idComponente){
    let componente=document.getElementById(idComponente);
    let valor=componente.classList.remove("activa");
}
//----------------------
function recuperarTexto(idComponente){
    let componente=document.getElementById(idComponente);
    return componente;
}

function mostrarMensajeTasa(textoMostrar){
    let cmpMensajeTasa=recuperarTexto("mensajeTasa").innerText=textoMostrar;
}

function recuperarCajaTexto(idComponente){
    let componente;
    let valorIngresado;
    componente=document.getElementById(idComponente);
    valorIngresado=componente.value;
    return valorIngresado;
    }
    
    function recuperarInt(idComponente){
        let valorCaja=recuperaraTexto(idComponente);
        let valorEntero=parseInt(valorCaja);
        return valorEntero;
    }
    function recuperarFloat(idComponente){
        let valorCaja=recuperaraTexto(idComponente);
        let valorFlotante=parseFloat(valorCaja);
        return valorFlotante;
    }
    function mostrarTexto(idComponente,mensaje){
        let componente;
        componente=document.getElementById(idComponente);
        componente.innerText=mensaje;
    }
    function mostrarTextoEnCaja(idComponente,mensaje){
        let componente;
        componente=document.getElementById(idComponente);
        componente.value=mensaje;
    }
    
    function mostrarImagen(idComponente,rutaImagen){
        let componente;
        componente=document.getElementById(idComponente);
        componente.src = rutaImagen;
    
    }