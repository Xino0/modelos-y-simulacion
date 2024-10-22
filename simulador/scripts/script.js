import { Itamaraca } from "./itamaraca.js";
import { poissonApproxNormal, distribucionBinomial, distribucionExponencial } from "./distribuciones.js";

const d = document;
const $form = d.getElementById("formularioSimulacion");
const $tabla = d.querySelector(".tablaResultado");

let tiempoMinimo = [];

function obtenerDatos(){
    let cantidadMeses = $form.meses.value,
    lambda = parseFloat($form.vacunasPorMes.value),
    npa = new Itamaraca({ N:1, s0:Math.random(), s1:Math.random(), s2:Math.random(), xrn:1.971 }),
    porcentaje = 0.005 //0.5%
    return {cantidadMeses:cantidadMeses, lambda:lambda, numeroPseudoAleatorio:npa, porcentaje:porcentaje}
}


function llenarTabla(){
    let totalVacunados = 0
    let totalGraves = 0;
    const $tbody = d.querySelector("table tbody");
    let formato = "";
    let exponencial = 0
    const datos = obtenerDatos();
    for(let i = 0; i < datos.cantidadMeses; i++){
        let poisson = poissonApproxNormal(datos.lambda, datos.numeroPseudoAleatorio);
        let binomial = distribucionBinomial(poisson, datos.porcentaje, datos.numeroPseudoAleatorio)
        for(let i = 0; i < binomial; i++){
            exponencial += distribucionExponencial(10, datos.numeroPseudoAleatorio);
        }
        formato += `
        <tr>
            <td>${i+1}</td>
            <td>${poisson}</td>
            <td>${binomial}</td>
            <td>${(exponencial /= binomial).toFixed(2)}</td>
        `
        totalVacunados += poisson
        totalGraves += binomial;
        tiempoMinimo.push(exponencial);
        d.getElementById("totalVaccinated").innerText = totalVacunados;
        d.getElementById("totalSevereCases").innerText = totalGraves;
        d.getElementById("percentageSevereCases").innerText = `${((totalGraves*100)/totalVacunados).toFixed(2)}%`
        d.getElementById("minTime").innerText = Math.min(...tiempoMinimo).toFixed(2)
    }
    $tbody.innerHTML = formato;
}


d.addEventListener("submit", function(e){
    e.preventDefault();
    llenarTabla();
    $tabla.classList.remove("oculto");
    d.querySelector(".summary").classList.remove("oculto")
})



