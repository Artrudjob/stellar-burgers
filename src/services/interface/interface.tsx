export interface IIngredients {
    calories: number;
    carbohydrates: number;
    fat: number;
    image: string;
    image_large: string;
    image_mobile: string;
    name: string;
    price: number;
    proteins: number;
    type: string;
    __v: number;
    _id: string;
    uuid: string
}

export interface IOrder {
    createdAt: string;
    ingredients: string[];
    name: string;
    number: number;
    status: string;
    updatedAt: string;
    _id: string;
}

export interface IWsMessages {
    orders: IOrder[];
    total: number;
    totalToday: number
}

export interface IUserData {
    isAuthorization: boolean,
    name: string,
    email: string,
    restorePassword: boolean,
    resetPassword: false,
    message: string
}

export interface IIngredientsData {
    ingredients: IIngredients[];
    loading: boolean;
    error: null | string;
}

export interface IOptions {
    method: string;
    headers: {
        'Content-Type': string;
        'authorization': string;
    }
    body?: string;
}

