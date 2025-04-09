const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Menu = require('./models/Menu');
const Item = require('./models/Item');
const cors = require('cors');
const bodyParser = require('body-parser');

dotenv.config();

const corsOptions = {
    origin: 'https://mern-menu-app.netlify.app', 
    methods: ['GET', 'POST'],
    credentials: true,
};


const PORT = process.env.PORT||5000;
mongoose
  .connect("mongodb+srv://dipin89433:Su5bQWnqqsCjYEsP@cluster0.wflp5ug.mongodb.net/menu?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const app = express();

app.use(cors(corsOptions));
app.use(express.json());

app.get('/api/get_menu', (req, res) => {
    Menu.find().select('name')
        .then(menus => res.status(200).json(menus))
        .catch(err => res.status(500).json({ error: err.message }));
    console.log('Fetched_menus')
});

app.get('/api/get_menu_items/:menu_id', (req, res) => {
    const menuId = req.params.menu_id;
    Item.find({ menu: menuId })
        .then(items => res.status(200).json(items))
        .catch(err => res.status(500).json({ error: err.message }));
    console.log('Fetched_items')
});


app.post('/api/add_menu_category', (req, res) => {
    const { menu_name, menu_description } = req.body;
    const menu = new Menu({ name: menu_name, description: menu_description });
    menu.save()
        .then(() => res.status(201).json({ message: 'Menu category added successfully' }))
        .catch(err => res.status(500).json({ error: err.message }));
});


app.post('/api/add_menu_item', (req, res) => {
    const { item_name, item_description, item_price, menu_id } = req.body;
    const item = new Item({ name: item_name, description: item_description, price: item_price, menu: menu_id });
    item.save()
        .then(() => res.status(201).json({ message: 'Menu item category added successfully' }))
        .catch(err => res.status(500).json({ error: err.message }));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
