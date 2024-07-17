export interface Helado {
    id: string | null,
    sabor: string,
    tipo: 'agua' | 'crema',
    precio: number,
    peso_aprox: number,
}