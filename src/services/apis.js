import {axiosAuthInstance, axiosNoAuthInstance} from "./axiosInstance";

const userService = {
    loginUser: () => {
        return axiosNoAuthInstance.post("/auth/token/login/", loginData)
        .then(res => res.data)
        .catch(err => err.response)
    },
    logoutUser: () => {
        return axiosAuthInstance.post("/auth/token/logout/")
        .then(res => res.data)
        .catch(err => err.response)
    },
    registerUser: () => {
        return axiosNoAuthInstance.post("/auth/users/", registerData)
        .then(res => res.data)
        .catch(err => err.response)
    }
}

const newsService = {
    getNews: () => {
        return axiosNoAuthInstance.get("/news/")
        .then(res => res.data)
        .catch(err => err.response)
    },
    getNewsDetail: (id) => {
        return axiosNoAuthInstance.get(`/news/${id}`)
        .then(res => res.data)
        .catch(err => err.response)
    }
}

const stockService = {
    getStocks: () => {
        return axiosAuthInstance.get("/stocks/")
        .then(res => res.data)
        .catch(err => err.response)
    },
    getStockDetail: (id) => {
        return axiosAuthInstance.get(`/stocks/${id}`)
        .then(res => res.data)
        .catch(err => err.response)
    },
    buyStock: (id, buyOrderData) => {
        return axiosAuthInstance.post(`/stocks/buy/${id}`, buyOrderData)
        .then(res => res.data)
        .catch(err => err.response)
    },
    sellStock: (id, sellOrderData) => {
        return axiosAuthInstance.post(`/stocks/sell/${id}`, sellOrderData)
        .then(res => res.data)
        .catch(err => err.response)
    },
    getQuantity: (id) => {
        return axiosAuthInstance.get(`/availablequantity/${id}`)
        .then(res => res.data)
        .catch(err => err.response)
    }
}

const portfolioService = {
    getPortfolio: () => {
        return axiosAuthInstance.get("/portfolio/")
        .then(res => res.data)
        .catch(err => err.response)
    },
    getCash: () => {
        return axiosAuthInstance.get("/cash/")
        .then(res => res.data)
        .catch(err => err.response)
    }
}

export {userService, newsService, stockService, portfolioService};