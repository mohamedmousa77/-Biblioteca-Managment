import { Persona } from "./persona-model"

export interface Client {
    Persona: Persona,
    Mail: string,
    telefono: string,
    socio:boolean
}