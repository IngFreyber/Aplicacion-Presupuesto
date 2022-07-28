const ingresos = []

const egresos = [];

let cargarApp = ()=>{
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();

    
};

let totalIngresos = ()=>{
    let totalIngresos = 0;
    for(let ingreso of ingresos){
        totalIngresos += ingreso.valor;
    }
    return totalIngresos;
};

let totalEgresos = () =>{
    let totalEgresos = 0;
    for( let egreso of egresos){
        totalEgresos += egreso.valor;
    }
    return totalEgresos;
}

let cargarCabecero = () =>{
    let totalPresupuesto = totalIngresos() - totalEgresos();
    let porcentajeEgreso = totalEgresos() / totalIngresos();
       
    document.getElementById('presupuesto').innerHTML = formatoMoneda(totalPresupuesto);
    document.getElementById('porcentaje_egreso').innerHTML = formatoPorcentaje(porcentajeEgreso);
    document.getElementById('ingresos').innerHTML = formatoMoneda(totalIngresos());
    document.getElementById('egresos').innerHTML = formatoMoneda(totalEgresos());

}

const formatoMoneda = (valor) => {
    return valor.toLocaleString('es-co', {style: 'currency', currency: 'cop', minimumFractionDigital:2});

}
const formatoPorcentaje = (valor) => {
    return valor.toLocaleString('es-co', {style: 'percent', minimumFractionDigital:2});

}

const cargarIngresos = ()=>{
    let ingresoHTML ='';
    for(let ingreso of ingresos){
    ingresoHTML += crearIngresosHTML(ingreso)
    }
    document.getElementById('lista-ingresos').innerHTML = ingresoHTML;
}



let crearIngresosHTML = (ingreso) =>{
    let ingresosHTML = `
    <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${ingreso.descripcion}</div>
    <div class="derecha limpiarEstilos">
        <div class="elemento_valor">+${formatoMoneda(ingreso.valor)}</div>
        <div class="elemento_eliminar">
            <button class='elemento_eliminar--btn'>
                <ion-icon name="close-circle-outline" onclick="eliminarIngreso(${ingreso.id})"></ion-icon>
            </button>
        </div>
    </div>
</div>
`;
return ingresosHTML;
}

const eliminarIngreso = (id)=>{
    let indiceEliminar = ingresos.findIndex(ingreso => ingreso.id === id);
    ingresos.splice(indiceEliminar, 1);
    cargarCabecero();
    cargarIngresos();
}

const cargarEgresos = () =>{
    let egresosHTML = '';
    for(let egreso of egresos){
        egresosHTML += crearEgresosHTML(egreso)
    }
    document.getElementById('lista-egresos').innerHTML = egresosHTML;
}

let crearEgresosHTML = (egreso)=>{
    let egresoHTML = `
    <div class="elemento limpiarEstilos"> 
    <div class="elemento_descripcion">${egreso.descripcion}</div>
    <div class="derecha limpiarEstilos">
        <div class="elemento_valor">+${formatoMoneda(egreso.valor)}</div>
        <div class="elemento_porcentaje">${formatoPorcentaje(egreso.valor/totalEgresos())}</div>
            <div class="elemento_eliminar">
                <button class='elemento_eliminar--btn'>
                    <ion-icon name="close-circle-outline" onclick="eliminarEgreso(${egreso.id})"></ion-icon>
                </button>
    </div>
    </div>
    </div>
    `;
    return egresoHTML;
}

const eliminarEgreso = (id)=>{
    let indiceEliminar = egresos.findIndex(egreso => egreso.id === id);
    egresos.splice(indiceEliminar, 1);
    cargarCabecero();
    cargarEgresos();
}

let agregarDato = ()=>{
    let formulario = document.forms['forma'];
    let tipo = formulario['tipo'];
    let descripcion = formulario['descripcion'];
    let valor = formulario['valor'];
    if(descripcion.value !== '' && valor.value !==''){
        if(tipo.value === 'ingreso'){
            ingresos.push( new Ingreso(descripcion.value, +valor.value))
            cargarCabecero();
            cargarIngresos();
        }
    
    else if(tipo.value === 'egreso'){
        egresos.push( new Egresos(descripcion.value, +valor.value))
        cargarCabecero();
        cargarEgresos();
    }
}
}