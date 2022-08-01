// variable de etiqueta select
const selectDivisas = document.querySelector('#selectDivisas');

async function getMonedas() {
    try {
        const res = await fetch("https://mindicador.cl/api");
        let monedas = []
        monedas = await res.json();
        console.log(monedas);
        
        
        // const dolar =  document.querySelector('#dolar');
        // dolar.innerHTML = monedas.dolar.codigo;

        // const euro = document.querySelector('#euro');
        // euro.innerHTML = monedas.euro.codigo;
        

        selectDivisas.innerHTML += `<option selected>Seleccione moneda</option>
        <option value="${monedas.dolar.valor}"> ${monedas.dolar.codigo}</option>, 
        <option value="${monedas.euro.valor}"> ${monedas.euro.codigo}</option>
        `;


        // let selectTemplate = '';
        // for (let moneda of monedas) {
        //     selectTemplate += `<option value="${moneda.dolar.valor}> ${moneda.dolar.codigo}</option>`;
        // }
        // selectDivisas.innerHTML = selectTemplate;
        
    
    } catch (e) {
        alert(e.message);
    }

}
getMonedas();


btnBuscar.addEventListener("click", () => {
    const clpValue = document.querySelector('#clpValue').value; //valor ingresado en clp
    console.log(clpValue);
    
    const resultado = document.querySelector('#resultado'); //donde se muestra la conversion final
    
    // valor ingresado multiplicado por el valor de la divisa y se guarda en variable
    let convert = clpValue * parseFloat(selectDivisas.value);

    resultado.innerHTML = 'CLP$ ' + convert.toFixed(2);
    // toFixed (2) para que muestre como resultado solo 2 decimales
    

});


// Grafico myChart
async function getMonedasPorFecha() {
    const endpoint = "https://mindicador.cl/api/dolar"; 
    const res = await fetch(endpoint);
    const monedas = await res.json();
    return monedas;
}

function prepararConfiguracionParaLaGrafica(monedas) {
    // Creamos las variables necesarias para el objeto de configuración const tipoDeGrafica = "line";
    const tipoDeGrafica = "line";
    const fechas = monedas.serie.map((moneda) => moneda.fecha); 
    const titulo = "Historial valor Dolar";
    const colorDeLinea = "red";
    const valores = monedas.serie.map((moneda) => {
    const valor = moneda.valor;
    return Number(valor); 
    });


    // Creamos el objeto de configuración usando las variables anteriores
    const config = { 
        type: tipoDeGrafica, 
        data: {
            labels: fechas,
            datasets: [
                {
                    label: titulo,
                    backgroundColor: colorDeLinea,
                    data: valores
                    } 
                ]
            } 
        };
        return config; 
}

async function renderGrafica() {
    const monedas = await getMonedasPorFecha();
    const config = prepararConfiguracionParaLaGrafica(monedas); 
    const chartDOM = document.getElementById("myChart");
    new Chart(chartDOM, config);
    }

renderGrafica();


// async function getAndCreateDataToChart() { 
//     const res = await fetch("https://mindicador.cl/api/dolar"); 
//     const dolares = await res.json();
//     console.log(dolares)
    
//     const labels = dolares.serie.map((dolar) => { 
//         return dolar.fecha;
//     });

//     const data = dolares.serie.map((dolar) => {
//         const valor = dolar.valor.split(" ")[1]; 
//         return Number(valor);
//     });

//     const datasets = [ 
//         {
//             label: "Valor Dolar",
//             borderColor: "rgb(255, 99, 132)", 
//             data
//          } 
//     ];
//     return { labels, datasets }; 
// }


//     async function renderGrafica() {
//         const data = await getAndCreateDataToChart(); 
//         const config = {
//             type: "line",
//             data 
//         };
//         const myChart = document.getElementById("myChart");
//         myChart.style.backgroundColor = "white";
//         new Chart(myChart, config);

//     }

// renderGrafica();