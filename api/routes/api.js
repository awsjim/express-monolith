var express = require('express');
var router = express.Router();

/* GET accounts JSON. */
router.get('/accounts', function (req, res, next) {
    res.json([
        {
            account: 350909,
            status: 'Open',
            created: '1/25/2020',
            customer: 'Marilyn Lee',
            balance: '$6,707.77'
        },
        {
            account: 100100,
            status: 'Open',
            created: '7/25/2001',
            customer: 'John Franklin',
            balance: '$21,365.11'
        },
        {
            account: 830123,
            status: 'Closed',
            created: '01/01/2015',
            customer: 'Traci Tekken',
            balance: '$1,001.87'
        },
    ]);
});

/* GET account transactions JSON. */
router.get('/accounts/:account/transactions', function (req, res, next) {
    if (req.params.account === '350909') {
        res.json([
            {
                id: '79135',
                date: '11/20/2023',
                description: 'ATM Withdrawl',
                amount: '- $40.00',
            },
            {
                id: '30978',
                date: '5/01/2022',
                description: 'Tax Refund',
                amount: '+ $707.77',
            },
        ]);
    } else if (req.params.account === '100100') {
        res.json([
            {
                id: '10971',
                date: '11/15/2023',
                description: 'Direct Deposit',
                amount: '+ $2,000.00',
            },
            {
                id: '33677',
                date: '11/01/2023',
                description: 'Direct Deposit',
                amount: '+ $2,000.00',
            },
            {
                id: '99900',
                date: '10/22/2023',
                description: 'Gas',
                amount: '- $78.33',
            },
        ]);
    } else {
        res.json([
            {
                id: '22234',
                date: '11/19/2023',
                description: 'Food',
                amount: '+ $31.03',
            },
            {
                id: '88882',
                date: '11/18/2023',
                description: 'Direct Deposit',
                amount: '+ $1,000.00',
            },
            {
                id: '65002',
                date: '10/22/2023',
                description: 'Gas',
                amount: '- $54.21',
            },
        ]);
    }

});

module.exports = router;
