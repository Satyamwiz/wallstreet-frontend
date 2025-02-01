const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/api/order_data', (req, res) => {
    const orderStatuses = ['pending', 'canceled', 'completed'];
    const companies = ['Google', 'Dropbox', 'Spotify'];
    const randomStatus = orderStatuses[Math.floor(Math.random() * orderStatuses.length)];
    const randomCompany = companies[Math.floor(Math.random() * companies.length)];
    const orderPrice = Math.floor(Math.random() * 1000) + 1; // Random price between 1 and 1000
    const quantity = Math.floor(Math.random() * 100) + 1; // Random quantity between 1 and 100
    const order_type = ['delivery', 'SL', 'intraday'];
    const buy_sell = ['buy', 'sell'];
    const ammout = Math.floor(Math.random() * 1000) + 1; // Random price between 1 and 1000

    const data = {
            id: uuidv4(),
            order_price: orderPrice,
            order_status: randomStatus,
            avg_price: randomStatus === 'completed' ? orderPrice : null,
            quantity: quantity,
            time: new Date().toISOString(),
            company_id: randomCompany,
            user_id: uuidv4(),
            order_type: order_type[Math.floor(Math.random() * order_type.length)],
            buy_sell: buy_sell[Math.floor(Math.random() * buy_sell.length)],    
            ammout: ammout
    };
    res.json(data);
});

app.post('/api/place_order', (req, res) => {
    const { order_price, order_status, quantity, company_id, user_id, order_type, buy_sell } = req.body;

    const data = {
            id: uuidv4(),
            order_price: order_price,
            order_status: order_status,
            avg_price: order_status === 'completed' ? order_price : null,
            quantity: quantity,
            time: new Date().toISOString(),
            company_id: company_id,
            user_id: user_id,
            order_type: order_type,
            buy_sell: buy_sell
    };
    res.json(data);
});

app.get('/api/company_data', (req, res) => {
    const companyNames = ['Google', 'Dropbox', 'Spotify', 'Amazon', 'Microsoft', 'Apple'];
    const companies = [];

    const randomLength = Math.floor(Math.random() * companyNames.length) + 1;

    for (let i = 0; i < randomLength; i++) {
        const randomName = companyNames[Math.floor(Math.random() * companyNames.length)];
        const company = {
            name: randomName,
            exchange_symbol: randomName.slice(0, 4).toUpperCase(),
            market_price: (Math.random() * 1000).toFixed(2),
            one_day_high: (Math.random() * 1000).toFixed(2),
            one_week_high: (Math.random() * 1000).toFixed(2),
            opening_price: (Math.random() * 1000).toFixed(2),
            closing_price: (Math.random() * 1000).toFixed(2),
            volume_traded: Math.floor(Math.random() * 1000000),
            volume_available: Math.floor(Math.random() * 10000000)
        };
        companies.push(company);
    }

    res.json(companies);
});

app.get('/api/position_data', (req, res) => {
    const positionStatuses = ['open', 'closed'];
    const orderStatuses = ['pending', 'completed'];
    const companies = ['Google', 'Dropbox', 'Spotify'];
    const randomPositionStatus = positionStatuses[Math.floor(Math.random() * positionStatuses.length)];
    const randomOrderStatus = orderStatuses[Math.floor(Math.random() * orderStatuses.length)];
    const randomCompany = companies[Math.floor(Math.random() * companies.length)];
    const shares = Math.floor(Math.random() * 100) + 1; // Random shares between 1 and 100
    const openPrice = (Math.random() * 1000).toFixed(2); // Random open price between 0 and 1000
    const gainLoss = randomPositionStatus === 'closed' ? (Math.random() * 200 - 100).toFixed(2) : null; // Random gain/loss between -100 and 100 if closed

    const data = {
        position_id: uuidv4(),
        position_status: randomPositionStatus,
        order_status: randomOrderStatus,
        gain_loss: gainLoss,
        company: randomCompany,
        shares: shares,
        open_price: openPrice
    };
    res.json(data);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});