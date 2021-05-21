export class Oferta {

    // Atributos & Variables
    private uid: string;
    private nombre: string;
    private articulos: string;
    private precio: number;
    private uidAsador: string;

    // Constructor
    constructor(uid: string, nombre: string, articulos: string, precio: number, uidAsador: string){
        this.uid = uid;
        this.nombre = nombre;
        this.articulos = articulos;
        this.precio = precio;
        this.uidAsador = uidAsador;
    }

    // Getters & Setters
    public getUid(): string{
        return this.uid;
    }

    public getNombre(): string{
        return this.nombre;
    }

    public getArticulos(): string{
        return this.articulos;
    }

    public getPrecio(): number{
        return this.precio;
    }

    public getUidAsador(): string{
        return this.uidAsador;
    }

    public setNombre(nombre: string){
        this.nombre = nombre;
    }

    public setArticulos(articulos: string){
        this.articulos = articulos;
    }

    public setPrecio(precio: number){
        this.precio = precio
    }
}
