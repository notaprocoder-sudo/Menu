import React, { useEffect, useState } from 'react';
import './Menu.css';
const Menu = () => {
    const [menus, setMenus] = useState([]);
    const [items, setItems] = useState([]);
    const [activemenu, setactivemenu] = useState(null);
    const [showMenuModal, setShowMenuModal] = useState(false); 
    const [showItemModal, setShowItemModal] = useState(false);
    const [menuName, setMenuName] = useState(''); 
    const [menuDescription, setMenuDescription] = useState(''); 
    const [itemName, setItemName] = useState(''); 
    const [itemDescription, setItemDescription] = useState(''); 
    const [itemPrice, setItemPrice] = useState('');

    useEffect(() => {
        fetch('https://menu-ihk7.onrender.com/api/get_menu')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch menus');
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
                setMenus(data); 
                
            })
            .catch((err) => {
                console.log(err.message)
            });
    }, []);

    const fetchMenuItems = (menuId) => {
        setactivemenu(menuId);
        fetch(`https://menu-ihk7.onrender.com/api/get_menu_items/${menuId}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch menu items');
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
                setItems(data); 
            })
            .catch((err) => {
                console.log(err.message)
            });
    };
    const handleAddCategory = () => {
        setShowMenuModal(true); 
    };
    const handleAddItem = ()=>{
        setShowItemModal(true); 	
    }

    const handleModalSubmit = () => {
        fetch('https://menu-ihk7.onrender.com/api/add_menu_category', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                menu_name: menuName,
                menu_description: menuDescription,
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to add menu category');
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
                setMenus([...menus, { name: menuName, description: menuDescription, _id: data._id }]);
                setShowModal(false); 
                setMenuName(''); 
                setMenuDescription('');
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    const handleItemModalSubmit = () => {
        fetch('https://menu-ihk7.onrender.com/api/add_menu_item', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                menu_id: activemenu,
                item_name: itemName,
                item_description: itemDescription,
                item_price: itemPrice,
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to add menu item');
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
                setItems([...items, { name: itemName, description: itemDescription, price: itemPrice, _id: data._id }]); 
                setShowItemModal(false); 
                setItemName(''); 
                setItemDescription('');
                setItemPrice('');
            })
            .catch((err) => {
                console.log(err.message);
            });
    };


    const handleModalClose = () => {
        setShowMenuModal(false); 
        setShowItemModal(false); 
        setMenuName('');
        setMenuDescription('');
        setItemName('');
        setItemDescription('');
        setItemPrice('');
    };

    const activeMenu = menus.find((menu) => menu._id === activemenu);
    return (
        <div className='menu-container'>
        <div className='hero-section'>
            <h1 className='hero-title'>MENU</h1>
            <p className='hero-tag'>Please take a look at our menu featuring food, drinks, and brunch. If you'd like to place an order, use the "Order Online" button located below the menu.</p>
        </div>

        <div className='menu-listings'>
        {menus.map((menu) => (
                    <div
                        key={menu._id}
                        className={`menu-category ${activemenu === menu._id ? 'active' : ''}`}
                        onClick={() => fetchMenuItems(menu._id)} 
                        style={{ cursor: 'pointer' }} 
                    >
                        <h2 className="menu-category-name">{menu.name}</h2>
                        
                    </div>
                ))}
                <button className="menu-category" onClick={handleAddCategory}>
                    <span className="menu-category-name">ADD</span>
                </button>
        </div>
        {showMenuModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2 className="menu-category-name">Add Menu Category</h2>
                        <input
                            type="text"
                            placeholder="Menu Name"
                            value={menuName}
                            onChange={(e) => setMenuName(e.target.value)}
                        />
                        <textarea
                            placeholder="Menu Description"
                            value={menuDescription}
                            onChange={(e) => setMenuDescription(e.target.value)}
                        ></textarea>
                        <div className="modal-actions">
                            <button onClick={handleModalSubmit}>Submit</button>
                            <button onClick={handleModalClose}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        <div className="menu-items">
                <div className='catalogue'>
                <h1 className='sub-hero-title'>— {activeMenu ? activeMenu.name : 'Select a Menu'} —</h1>
                {activeMenu && (
                        <button className="add-item-btn" onClick={handleAddItem}>
                            <span className="plus-icon">ADD</span>
                        </button>
                    )}
                {items.length > 0 && (
                    <>
                        <ul>
                            {items.map((item) => (
                                <li key={item._id} className='item'>
                                    <div className='name-price'>
                                        <h3 className='item-name'>{item.name}</h3>
                                        <p className='item-price'>${item.price}</p>
                                    </div>
                                    <p className='item-desc'>{item.description}</p>
                                </li>
                            ))}
                        </ul>
                    </>
                )}

                {showItemModal && (
                        <div className="modal">
                            <div className="modal-content">
                                <h2 className="menu-category-name">Add Menu Item</h2>
                                <input
                                    type="text"
                                    placeholder="Item Name"
                                    value={itemName}
                                    onChange={(e) => setItemName(e.target.value)}
                                />
                                <textarea
                                    placeholder="Item Description"
                                    value={itemDescription}
                                    onChange={(e) => setItemDescription(e.target.value)}
                                ></textarea>
                                <input
                                    type="number"
                                    placeholder="Item Price"
                                    value={itemPrice}
                                    onChange={(e) => setItemPrice(e.target.value)}
                                />
                                <div className="modal-actions">
                                    <button onClick={handleItemModalSubmit}>Submit</button>
                                    <button onClick={handleModalClose}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    )}

                <img src="/images/cocktail1.png" alt="cocktail" className='cocktailimg'/>
                <img src="/images/drink1.png" alt="drink" className='drinkimg'/>
                </div>  
            </div>
            <div className='menu-footer'>
                    <div className='footer-block'>
                        <h3 className='name-blue '>CONNECT WITH US</h3>
                        <div className='footer-block-content'>
                        <p className='name-secondary'><span class="material-symbols-outlined">deskphone</span> +91 9567843340</p>
                        <p className='name-secondary'><span class="material-symbols-outlined">mail</span> info@deepnetsoft.com</p>
                        </div>
                        
                    </div>
                    <div className='footer-block'>
                    <img src="/images/Logo.png" alt="Logo" className="logo-image-footer" />
                        <div className='footer-block-content-row'>
                        <p className="name-blue logo-name">DEEP</p>
                        <p className="name-white logo-name">NET</p>
                        <p className="name-secondary logo-name">SOFT</p>
                        </div>
                        <img src="/images/socials.png" alt="Socials" className='social' />
                    </div>
                    <div className='footer-block'>
                    <h3 className='name-blue '>FIND US</h3>
                        <div className='footer-block-content-row'>
                        <p className='name-secondary w-40'><span class="material-symbols-outlined">location_on</span> First floor, Geo infopark, Infopark EXPY, Kakkanad</p>
                        </div>
                    </div>
            </div>
        </div>
        
    );
};

export default Menu;
