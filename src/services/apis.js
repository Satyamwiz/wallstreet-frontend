import {axiosAuthInstance, axiosNoAuthInstance} from "../services/axiosInstance.js";
// import axios from "axios";
const userService = {
    loginUser: (loginData) => {
        console.log(loginData);
        
        return axiosNoAuthInstance.post("/auth/login", loginData)
        .then(res => res.data)
        .catch(err => {
            // console.log(err.response)
            // console.clear()
            throw err.response
            // console.clear()
        })
    }
    // logoutUser: () => {
    //     return axiosAuthInstance.post("/auth/token/logout/")
    //     .then(res => res.data)
    //     .catch(err => {
    //         console.clear()
    //         throw err.response
    //         console.clear()
    //     })
    // },
    // registerUser: (registerData) => {
    //     return axiosNoAuthInstance.post("/auth/users/", registerData)
    //     .then(res => res.data)
    //     .catch(err => {
    //         console.clear()
    //         throw err.response
    //         console.clear()
    //     })
    // }
}



const stockService = {
    getStocks: () => {
        return axiosAuthInstance.get("/company/all")
        .then(res => res.data)
        .catch(err => {
            console.clear()
            throw err.response
           
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
        return axiosAuthInstance.post(`/order/buy`, buyOrderData)
        .then(res => res.data)
        .catch(err => {
            console.clear()
            throw err.response
           
        })
    },
    sellStock: (id, sellOrderData) => {
        return axiosAuthInstance.post(`/order/sell`, sellOrderData)
        .then(res => res.data)
        .catch(err => {
            console.clear()
            throw err.response
            
        })
    },
    deleteOrder: (id) => {
        // console.log("working",id);
        const req={order_id:id };
        console.log(req);
        return axiosAuthInstance.post(`/order/delete`,  req)
        .then(res => res.data)
        .catch(err => {
            
            throw err.response
           
        })
    },
    getQuantity: (id) => {
        return axiosAuthInstance.get(`/availablequantity/${id}`)
        .then(res => res.data)
        .catch(err => {
            console.clear()
            throw err.response
            
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
        
        return axiosAuthInstance.get("/portfolio/cash")
        .then(res => res.data)
        .catch(err => {
            console.clear()
            throw err.response
            console.clear()
        })
    },
    getTransactions: () => {
        return axiosAuthInstance.get("/portfolio/completedOrders/")
        .then(res => res.data)
        .catch(err => {
            console.clear()
            throw err.response
            console.clear()
        })
    },
    getPendingTransactions: () => {
        return axiosAuthInstance.get("/portfolio/pendingOrders")
        .then(res => res.data)
        .catch(err => {
            console.clear()
            throw err.response
            
        })
    },

    getholdingdetails: () => {
        return axiosAuthInstance.get("/portfolio/holdingDetail/")
        .then(res => res.data)
        .catch(err => {
            console.clear()
            throw err.response
        }
        )
    }
}

const marketService = {
    checkMarketStatus: () => {
        return axiosNoAuthInstance.get("/market/")
        .then(res => res.data)
        .catch(err => {
            console.clear()
            throw err.response
            
        })
    }
}

// const ipoService = {
//     getIpos: () => {
//         return axiosAuthInstance.get("/ipos/")
//         .then(res => res.data)
//         .catch(err => {
//             console.clear()
//             throw err.response
//             console.clear()
//         })
//     },
//     subscribeIpo: (id, ipoSubscribeData) => {
//         return axiosAuthInstance.post(`/ipos/subscribe/${id}`, ipoSubscribeData)
//         .then(res => res.data)
//         .catch(err => {
//             console.clear()
//             throw err.response
//             console.clear()
//         })
//     }
// }

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

export {userService, stockService, portfolioService, marketService, rankService};