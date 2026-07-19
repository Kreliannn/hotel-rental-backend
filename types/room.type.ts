export interface roomInterfaceInput {
    category: string,
    amenities: string[],
    price: number,
    discount: number,
    image: string,
    description: string,
    images: string[],
    status: string,
    maintenance: string,
    housekeeping: string[],
    maxHead : number
}

export interface roomInterface extends roomInterfaceInput {
    _id : string,
}
