//Funciones simulador de Credito---------
//Disponible
function calcularDisponible(ingresos,egresos){
    let disponible=ingresos-egresos;
    if(disponible<0){
        return 0;
    }
    return disponible;
}
//Capacidad de pago
function capacidadDePago(montoDisponible){
    let capacidadPago=(montoDisponible/100)*30;
    return capacidadPago;
}
//Interes simple
function interes(monto,tasa,plazoAnios){
    let interes=plazoAnios*monto*(tasa/100);
    return interes;
}
//Total a pagar
function totalPagar(monto,interes){
    const IMPUESTOS_SOLCA=100;
    let valorTotal=monto+interes+IMPUESTOS_SOLCA;
    return valorTotal;
}
//Cuota mensual
function calcularCuotaMensual(total,plazoAnios){
    let meses=plazoAnios*12;
    let cuotaMensual=total/meses;
    return cuotaMensual;
}
/*Calcula Aprobacion de Credito
  capacidad de pago > cuota mensual == true
  capacidad de pago < cuota mensual == false */
function aprobarCredito(capacidadPago,cuotaMensual){
    if(capacidadPago>cuotaMensual){
        return true;
    }
    return false;
}