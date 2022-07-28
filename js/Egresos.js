class Egresos extends Dato{
    static contadorEgresos = 0;

    constructor(descripcion, valor){
        super(descripcion, valor);
        this._idEgresos = ++Egresos.contadorEgresos;
    }
    get id(){
        return this._idEgresos;
    }
}