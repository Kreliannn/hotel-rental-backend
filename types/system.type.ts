export interface systemInterfaceInput {
    systemInfo: string,
    paymentMin: number,
    logo: string,
    systemName: string,
    header: string,
    description: string,
}

export interface systemInterface extends systemInterfaceInput {
    _id: string,
}
