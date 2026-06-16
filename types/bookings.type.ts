import { roomInterface } from "./room.type"

export interface bookingInterfaceInput {
    clientName: string,
    clientAddress: string,
    type: string,
    status: string,
    arivalDate: string,
    arivalTime: string,
    room : string
}

export interface bookingInterface  {
    clientName: string,
    clientAddress: string,
    type: string,
    status: string,
    arivalDate: string,
    arivalTime: string,
    room : roomInterface,
}