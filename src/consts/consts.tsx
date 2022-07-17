import {ru} from "date-fns/locale";
import {IOptions} from "../services/interface/interface";

const baseUrl: string = 'https://norma.nomoreparties.space/api/';
const wssUrl: string = 'wss://norma.nomoreparties.space/orders';

const checkResponse = (res: Response) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
};

const orderTime = (createdAt: string, formatDistance: any) => {
    const orderDate = new Date(Date.parse(createdAt));
    const orderTime = orderDate.toLocaleTimeString().slice(0, -3);
    const timeInterval = formatDistance(
        new Date(),
        orderDate,
        {locale: ru}
    );
    return `${timeInterval} назад, ${orderTime} i-GMT+3`;
}

const getCookie = (name: string) => {
    const matches = document.cookie.match(
        new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
    );
    return matches ? decodeURIComponent(matches[1]) : undefined
};

const getUserInfo = () => {
    return fetchWithRefresh(`${baseUrl}auth/user`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `${getCookie('accessToken')}`
        }
    })
}

const updateUserInfo = (userEmail: string, userName: string) => {
    return fetchWithRefresh(`${baseUrl}auth/user`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `${getCookie('accessToken')}`
        },
        body: JSON.stringify({
            'email': `${userEmail}`,
            'name': `${userName}`
        })
    })
}

const getToken = () => {
    const refreshToken = localStorage.getItem('refreshToken');

    return fetch(`${baseUrl}auth/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'token': `${refreshToken}`
        })
    })
        .then(checkResponse)
        .then((refreshData) => {
            if (!refreshData.success) {
                return Promise.reject(refreshData)
            }

            localStorage.setItem('refreshToken', refreshData.refreshToken)
            document.cookie = `accessToken=${refreshData.accessToken}`;
            return refreshData;
        })
        .catch((err) => {
            console.log(`Что-то пошло не так: ${err}`);
        })
};

const fetchWithRefresh = async (url: string, options: IOptions) => {
    try {
        const res = await fetch(url, options);
        return await checkResponse(res);
    } catch (err) {
        if (err === 'Ошибка 403') {
            const refreshData = await getToken();

            options.headers.authorization = refreshData.accessToken;

            const res = await fetch(url, options);
            return await checkResponse(res);
        } else {
            return Promise.reject(err);
        }
    }
};

export { baseUrl, wssUrl, orderTime, checkResponse, getCookie, getUserInfo, updateUserInfo }