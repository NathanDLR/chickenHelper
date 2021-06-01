import { IonDatetime } from "@ionic/angular";

export class Pedido {

    // Atributos & Variables
    private uid: string;
    private hora: IonDatetime;
    private concepto: string;
    private cliente: string;
    private info: string;
    private total: number;
    private conceptoNombres: string;

    // Constructor
    constructor(uid: string, hora: IonDatetime, concepto: string, cliente: string, info: string, total: number, conceptoNombres: string){
        this.uid = uid;
        this.hora = hora;
        this.concepto = concepto;
        this.cliente = cliente;
        this.info = info;
        this.total = total;
        this.conceptoNombres = conceptoNombres;
    }


}
