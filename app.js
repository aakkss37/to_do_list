const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'))

let todaysListItems = []
let workingListItems = []

const d = new Date()
let day = d.getDay()
let month = d.getMonth();
const daysName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthsName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let todaysDate = `${daysName[day]}, ${d.getDate()} ${monthsName[month]}`

app.get('/', (req, resp) => {

    resp.render('list', {
        listType: todaysDate,
        addedItem: todaysListItems
    })
})

app.get('/work', (req, resp) => {
    resp.render('list', {
        listType: 'Working List',
        addedItem: workingListItems
    });
});

app.post('/', (req, resp) => {


    if (req.body.addItem == "Working") {
        let workItem = req.body.item
        workingListItems.push(workItem)
        resp.redirect('/work')
        console.log(workingListItems)
    }
    else {
        let newItem = req.body.item
        todaysListItems.push(newItem)
        resp.redirect('/')
        console.log(todaysListItems)

    }
})





app.listen(3000, () => {
    console.log('$#$#$#$#$#$# SERVER IS RUNNIN ON PROT 3000 #$#$#$#$#$#$')
})