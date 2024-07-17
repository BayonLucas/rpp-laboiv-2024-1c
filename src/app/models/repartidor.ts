import { Pais } from "./pais";

export interface Repartidor {
    id: string | null,
    dni: string,
    nombre: string,
    edad: string,
    capTransporte: string,
    paisOrigen: Pais,
    unidadPropia: boolean
}