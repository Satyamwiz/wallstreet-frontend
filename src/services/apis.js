import {axiosAuthInstance, axiosNoAuthInstance} from "./axiosInstance";

const userService = {
    loginUser: (loginData) => {
        return axiosNoAuthInstance.post("/auth/token/login/", loginData)
        .then(res => res.data)
        .catch(err => {
            throw err.response
        })
    },
    logoutUser: () => {
        return axiosAuthInstance.post("/auth/token/logout/")
        .then(res => res.data)
        .catch(err => {
            throw err.response
        })
    },
    registerUser: (registerData) => {
        return axiosNoAuthInstance.post("/auth/users/", registerData)
        .then(res => res.data)
        .catch(err => {
            throw err.response
        })
    }
}

const newsService = {
    getNews: () => {
        return axiosNoAuthInstance.get("/news/")
        .then(res => res.data)
        .catch(err => {
            throw err.response
        })
    },
    getNewsDetail: (id) => {
        return axiosNoAuthInstance.get(`/news/${id}`)
        .then(res => res.data)
        .catch(err => {
            throw err.response
        })
    }
}

const stockService = {
    getStocks: () => {
        return axiosAuthInstance.get("/stocks/")
        .then(res => res.data)
        .catch(err => {
            throw err.response
        })
    },
    getStockDetail: (id) => {
        return axiosAuthInstance.get(`/stocks/${id}`)
        .then(res => res.data)
        .catch(err => {
            throw err.response
        })
    },
    buyStock: (id, buyOrderData) => {
        return axiosAuthInstance.post(`/stocks/buy/${id}`, buyOrderData)
        .then(res => res.data)
        .catch(err => {
            throw err.response
        })
    },
    sellStock: (id, sellOrderData) => {
        return axiosAuthInstance.post(`/stocks/sell/${id}`, sellOrderData)
        .then(res => res.data)
        .catch(err => {
            throw err.response
        })
    },
    getQuantity: (id) => {
        return axiosAuthInstance.get(`/availablequantity/${id}`)
        .then(res => res.data)
        .catch(err => {
            throw err.response
        })
    }
}

const portfolioService = {
    getPortfolio: () => {
        return axiosAuthInstance.get("/portfolio/")
        .then(res => res.data)
        .catch(err => {
            throw err.response
        })
    },
    getCash: () => {
        return axiosAuthInstance.get("/cash/")
        .then(res => res.data)
        .catch(err => {
            throw err.response
        })
    },
    getTransactions: () => {
        return axiosAuthInstance.get("/transactions/")
        .then(res => res.data)
        .catch(err => {
            throw err.response
        })
    }
}

const marketService = {
    checkMarketStatus: () => {
        return axiosNoAuthInstance.get("/market/")
        .then(res => res.data)
        .catch(err => {
            throw err.response
        })
    }
}

export {userService, newsService, stockService, portfolioService, marketService};