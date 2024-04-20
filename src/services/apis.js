import {axiosAuthInstance, axiosNoAuthInstance} from "./axiosInstance";

const userService = {
    loginUser: (loginData) => {
        return axiosNoAuthInstance.post("/auth/token/login/", loginData)
        .then(res => res.data)
        .catch(err => {
            console.clear()
            throw err.response
            console.clear()
        })
    },
    logoutUser: () => {
        return axiosAuthInstance.post("/auth/token/logout/")
        .then(res => res.data)
        .catch(err => {
            console.clear()
            throw err.response
            console.clear()
        })
    },
    registerUser: (registerData) => {
        return axiosNoAuthInstance.post("/auth/users/", registerData)
        .then(res => res.data)
        .catch(err => {
            console.clear()
            throw err.response
            console.clear()
        })
    }
}

const newsService = {
    getNews: () => {
        return axiosNoAuthInstance.get("/news/")
        .then(res => res.data)
        .catch(err => {
            console.clear()
            throw err.response
            console.clear()
        })
    },
    getNewsDetail: (id) => {
        return axiosNoAuthInstance.get(`/news/${id}`)
        .then(res => res.data)
        .catch(err => {
            console.clear()
            throw err.response
            console.clear()
        })
    }
}

const stockService = {
    getStocks: () => {
        return axiosAuthInstance.get("/stocks/")
        .then(res => res.data)
        .catch(err => {
            console.clear()
            throw err.response
            console.clear()
        })
    },
    getStockDetail: (id) => {
        return axiosAuthInstance.get(`/stocks/${id}`)
        .then(res => res.data)
        .catch(err => {
            console.clear()
            throw err.response
            console.clear()
        })
    },
    buyStock: (id, buyOrderData) => {
        return axiosAuthInstance.post(`/stocks/buy/${id}`, buyOrderData)
        .then(res => res.data)
        .catch(err => {
            console.clear()
            throw err.response
            console.clear()
        })
    },
    sellStock: (id, sellOrderData) => {
        return axiosAuthInstance.post(`/stocks/sell/${id}`, sellOrderData)
        .then(res => res.data)
        .catch(err => {
            console.clear()
            throw err.response
            console.clear()
        })
    },
    getQuantity: (id) => {
        return axiosAuthInstance.get(`/availablequantity/${id}`)
        .then(res => res.data)
        .catch(err => {
            console.clear()
            throw err.response
            console.clear()
        })
    }
}

const portfolioService = {
    getPortfolio: () => {
        return axiosAuthInstance.get("/portfolio/")
        .then(res => res.data)
        .catch(err => {
            console.clear()
            throw err.response
            console.clear()
        })
    },
    getCash: () => {
        return axiosAuthInstance.get("/cash/")
        .then(res => res.data)
        .catch(err => {
            console.clear()
            throw err.response
            console.clear()
        })
    },
    getTransactions: () => {
        return axiosAuthInstance.get("/transactions/")
        .then(res => res.data)
        .catch(err => {
            console.clear()
            throw err.response
            console.clear()
        })
    }
}

const marketService = {
    checkMarketStatus: () => {
        return axiosNoAuthInstance.get("/market/")
        .then(res => res.data)
        .catch(err => {
            console.clear()
            throw err.response
            console.clear()
        })
    }
}

const ipoService = {
    getIpos: () => {
        return axiosAuthInstance.get("/ipos/")
        .then(res => res.data)
        .catch(err => {
            console.clear()
            throw err.response
            console.clear()
        })
    },
    subscribeIpo: (id, ipoSubscribeData) => {
        return axiosAuthInstance.post(`/ipos/subscribe/${id}`, ipoSubscribeData)
        .then(res => res.data)
        .catch(err => {
            console.clear()
            throw err.response
            console.clear()
        })
    }
}

const rankService = {
    getRankings: () => {
        return axiosNoAuthInstance.get('/ranking/')
        .then(res => res.data)
        .catch(err => {
            console.clear()
            throw err.response
            console.clear()
        })
    }
}

export {userService, newsService, stockService, portfolioService, marketService, ipoService, rankService};