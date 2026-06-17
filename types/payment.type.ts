   


export interface paymentInterfaceInput {
    date: string,
    amount: number,
    receivedBy: string,
}

export interface paymentInterface extends paymentInterfaceInput {
    _id : string,
}