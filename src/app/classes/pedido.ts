import { IonDatetime } from "@ionic/angular";

export class Pedido {

    // Atributos & Variables
    private uid: string;
    private hora: IonDatetime;
    private concepto: string;
    private cliente: string;
    private info: string;
    private total: number;
    private recogido: boolean;
    private cardPayed: boolean;
    private needsConfirmation: boolean;
    private conceptoNombres: string;

    // Constructor
    constructor(uid: string, hora: IonDatetime, concepto: string, cliente: string, info: string, total: number, recogido: boolean, cardPayed: boolean, needsConfirmation: boolean, conceptoNombres: string){
        this.uid = uid;
        this.hora = hora;
        this.concepto = concepto;
        this.cliente = cliente;
        this.info = info;
        this.total = total;
        this.recogido = recogido;
        this.cardPayed = cardPayed;
        this.needsConfirmation = needsConfirmation;
        this.conceptoNombres = conceptoNombres;
    }


}
