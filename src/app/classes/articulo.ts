export class Articulo {

    // Atributos & variables
    private uid: string;
    private nombre: string;
    private ingredientes: string;
    private alergenos: string;
    private precio: number;
    private uidAsador: string;

    // Constructor
    constructor(uid: string, nombre:string, ingredientes: string, alergenos: string, precio: number, uidAsador: string){
        this.uid = uid;
        this.nombre = nombre;
        this.ingredientes = ingredientes;
        this.alergenos = alergenos;
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

    public getIngredientes(): string{
        return this.ingredientes;
    }

    public getAlergenos(): string{
        return this.alergenos;
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

    public setIngredientes(ingredientes: string){
        this.ingredientes = ingredientes;
    }

    public setAlergenos(alergenos: string){
        this.alergenos = alergenos;
    }

    public setPrecio(precio: number){
        this.precio = precio;
    }


}
