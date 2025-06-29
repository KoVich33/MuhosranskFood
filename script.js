document.addEventListener('DOMContentLoaded', function() {
    // Мобильное меню
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');

    mobileMenuBtn.addEventListener('click', function() {
        mainNav.classList.toggle('active');
    });

    // Корзина
    const cartBtn = document.querySelector('.cart-btn');
    const cartOverlay = document.querySelector('.cart-overlay');
    const closeCart = document.querySelector('.close-cart');
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.total-price');
    const cartCount = document.querySelector('.cart-count');
    const checkoutBtn = document.querySelector('.checkout-btn');
    const dishList = document.querySelector('.dish-list');

    let cart = [];

    // Открыть/закрыть корзину
    cartBtn.addEventListener('click', function() {
        cartOverlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });

    closeCart.addEventListener('click', function() {
        cartOverlay.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Данные блюд (в реальном приложении будут приходить с сервера)
    const dishes = [
        /*
        {
            id: 0,
            title: 'title',
            description: 'description',
            price: 0,
            image: 'img/dishes/pizza-margarita.jpg',
            category: 'Пицца'
        },
        */
        {
            id: 1,
            title: 'Карсаслюсьпа',
            description: 'Традиционное блюдо Мухосранска из жареного мяса булюбы с добавлением стружки цезия 133<br> 220г<br>570 Ткал',
            price: 899.999,
            image: 'img/dishes/karsasulpa.png',
            category: 'Первые блюда'
        },

        {
            id: 2,
            title: 'Суп с острым перчиком',
            description: 'Традиционное суп Мухосранска из яиц, сена и острого перца<br>380 г<br>320 ккал',
            price: 450,
            image: 'img/dishes/karsasulpa.png',
            category: 'Первые блюда'
        },
        {
            id: 3,
            title: 'Суп "Мухосранск"',
            description: 'Суп из всего содержимого холодильника и кошачьего корма двухлетней выдержки<br>280 г<br>400 ккал',
            price: 899,
            image: 'img/dishes/karsasulpa.png',
            category: 'Первые блюда'
        },
        {
            id: 4,
            title: 'Яичница "по-мухосрански"',
            description: 'Яичница с добавлением гигиенических средств ухода<br>190 г<br>200 ккал',
            price: 250,
            image: 'img/dishes/karsasulpa.png',
            category: 'Первые блюда'
        },
        {
            id: 5,
            title: 'Куличики из грязи',
            description: 'Куличи из отборной мухосранской грязи с начинкой из коровьей лепешки<br>70 г (3 шт.)<br>270 ккал',
            price: 99,
            image: 'img/dishes/karsasulpa.png',
            category: 'Первые блюда'
        }
    ];

    // Отображение блюд
    function displayDishes() {
        dishList.innerHTML = dishes.map(dish => `
            <div class="dish-card">
                <img src="${dish.image}" alt="${dish.title}" class="dish-image">
                <div class="dish-info">
                    <h3 class="dish-title">${dish.title}</h3>
                    <p class="dish-description">${dish.description}</p>
                    <div class="dish-footer">
                        <span class="dish-price">${dish.price} ₽</span>
                        <button class="add-to-cart" data-id="${dish.id}">В корзину</button>
                    </div>
                </div>
            </div>
        `).join('');

        // Добавление обработчиков для кнопок "В корзину"
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', addToCart);
        });
    }

    // Добавление в корзину
    function addToCart(e) {
        const id = parseInt(e.target.dataset.id);
        const dish = dishes.find(item => item.id === id);
        
        const existingItem = cart.find(item => item.id === id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                ...dish,
                quantity: 1
            });
        }
        
        updateCart();
    }

    // Обновление корзины
    function updateCart() {
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4 class="cart-item-title">${item.title}</h4>
                    <span class="cart-item-price">${item.price} ₽ × ${item.quantity}</span>
                </div>
                <button class="cart-item-remove" data-id="${item.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');

        // Добавление обработчиков для кнопок удаления
        document.querySelectorAll('.cart-item-remove').forEach(button => {
            button.addEventListener('click', removeFromCart);
        });

        // Обновление общей суммы
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = `${total} ₽`;

        // Обновление счетчика в корзине
        const count = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = count;
    }

    // Удаление из корзины
    function removeFromCart(e) {
        const id = parseInt(e.target.closest('button').dataset.id);
        cart = cart.filter(item => item.id !== id);
        updateCart();
    }

    // Оформление заказа
    checkoutBtn.addEventListener('click', function() {
        if (cart.length === 0) {
            alert('Корзина пуста!');
            return;
        }
        
        alert(`Заказ на сумму ${cartTotal.textContent} оформлен! Спасибо за покупку!`);
        cart = [];
        updateCart();
        cartOverlay.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Инициализация приложения
    displayDishes();
});