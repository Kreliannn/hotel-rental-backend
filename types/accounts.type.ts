export interface accountInterfaceInput {
    name: string,
    permisions: string[],
    username: string,
    password: string,
}

export interface accountInterface extends accountInterfaceInput {
    _id : string,
}