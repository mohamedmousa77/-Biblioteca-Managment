import { Persona } from "./persona-model"

export interface Client {
    Persona: Persona,
    mail: string,
    telefono: string,
    socio:boolean
}