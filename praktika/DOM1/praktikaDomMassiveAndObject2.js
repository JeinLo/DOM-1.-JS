//Методы массивов
const array = ['Петр', 'Василий', 'Владислав', 100, true, '1000', 'Владимир']

//Задание 1
const search = 'в'
const persons = []

array.forEach((item) => {
    if (String(item).toLowerCase().startsWith(search.toLowerCase())) {
        persons.push(item)
    }
})
console.log(persons)

//Задание 2
const fullName = persons.map((person) => {
    return person + ' ' + 'Иванов'
})
console.log(fullName)

//Задание 3
fullName.forEach((item) => {
    console.log(item)
})

//Задание 4
const array4 = ['Петр', 'Василий', 'Владислав', 100, true, '1000', 'Владимир']

const firstNonString = array4.find((item) => typeof item !== 'string')
console.log(firstNonString)

//__________________________________________________________________________________________________________________________________________
//__________________________________________________________________________________________________________________________________________
//Деструктуризация объектов
const user = {
    name: 'Иван',
    age: 28,
    contact: {
        email: 'ivan@example.com',
        phone: '+7-123-456-7890',
    },
    address: {
        city: 'Москва',
        street: 'ул. Ленина',
        building: '10',
    },
}

//Задание 1. Извлеките и выведите в консоль имя пользователя и его возраст, используя деструктуризацию.
const { name, age } = user

console.log(name)
console.log(age)

//Задание 2. Извлеките контактные данные пользователя (email и phone), также используя деструктуризацию.
const {
    contact: { email, phone },
} = user

console.log(email)
console.log(phone)

//Задание 3. Извлеките город и улицу из адреса пользователя, присвоив им переменные с другими именами: userCity и userStreet.
const {
    address: { city: userCity, street: userStreet },
} = user

console.log(userCity)
console.log(userStreet)

//Задание 4. Напишите функцию displayUserInfo , которая принимает объект user в качестве аргумента и выводит в консоль строку: "Имя: Иван, Возраст: 28, Город: Москва, Email: ivan@example.com"
function displayUserInfo({ name, age, contact: { email }, address: { city } }) {
    console.log(
        `Имя: ${name}, Возраст: ${age}, Город: ${city}, Email: ${email}`,
    )
}

displayUserInfo(user)

//__________________________________________________________________________________________________________________________________________
//__________________________________________________________________________________________________________________________________________
//Деструктуризация массивов
const productInfo = ['Кресло VILORA', 'серый', 21000, 'в наличии', 'скидка 10%']

//Задание 1.  Извлеките и выведите в консоль название товара и его цену, используя деструктуризацию массива.
const [name, , price] = productInfo

console.log(name)
console.log(price)

//Задание 2.  Извлеките статус наличия и скидку на товар, сохранив их в переменные availability и discount
const [, , , availability, discount] = productInfo

console.log(availability)
console.log(discount)

//Задание 3.  Используя оператор остаточных элементов (...) , соберите все оставшиеся данные (кроме первых двух) в массив otherDetails и выведите его в консоль.
const [, , ...otherDetails] = productInfo

console.log(otherDetails)

//Задание 4.  Напишите функцию displayProductDetails , которая принимает массив productInfo и выводит в консоль сообщение: "Название: Кресло VILORA, Цена: 21000, Статус: в наличии, Скидка: скидка 10%"
function displayProductDetails([name, , price, availability, discount]) {
    console.log(
        `Название: ${name}, Цена: ${price}, Статус: ${availability}, Скидка: ${discount}`,
    )
}

displayProductDetails(productInfo)

//__________________________________________________________________________________________________________________________________________
//__________________________________________________________________________________________________________________________________________
//Работа с многомерными массивами (массивы объектов)
//У вас есть массив объектов, которые представляют товары интернет-магазина:
const products = [
    { id: 1, title: 'Кресло VILORA', price: 21000, stock: true },
    { id: 2, title: 'Диван TULIP', price: 35000, stock: false },
    { id: 3, title: 'Столик MANGO', price: 12000, stock: true },
    { id: 4, title: 'Кровать BALI', price: 40000, stock: true },
    { id: 5, title: 'Стул HUGO', price: 8000, stock: false },
]

//Задача 1. Фильтрация и сортировка товаров.
// 1.Выведите доступные товары.  Используйте метод filter , чтобы создать новый массив availableProducts , который будет содержать только те товары, которые есть в наличии (stock: true). Выведите результат в консоль.
const availableProducts = products.filter((product) => product.stock)

console.log('Доступные товары:', availableProducts)

// 2.Отсортируйте товары по цене.  Используя метод sort, отсортируйте массив products по цене в порядке возрастания и выведите его в консоль.
const sortedByPrice = products.sort((a, b) => a.price - b.price)

console.log('Товары по возрастанию цены:', sortedByPrice)

// 3. Создайте список названий товаров.  Используя метод map , создайте новый массив productNames , содержащий только названия всех товаров, и выведите его в консоль.
const productNames = products.map((product) => product.title)

console.log('Названия товаров:', productNames)

//Задача 2. Подсчет общей стоимости доступных товаров
//Подсчитайте общую стоимость товаров в наличии. Используя методы filter и reduce , посчитайте общую стоимость всех товаров, которые есть в наличии ( stock: true ), и выведите ее в консоль.
const totalAvailableCost = products
    .filter((product) => product.stock)
    .reduce((total, product) => total + product.price, 0)

console.log('Общая стоимость доступных товаров:', totalAvailableCost)

//Задача 3. Найти товар с самой высокой ценой
//Найдите самый дорогой товар. Используйте метод reduce и найдите объект с самым высоким значением price в массиве products . Выведите название и цену этого товара в консоль.
const mostExpensiveProduct = products.reduce((expensive, product) => {
    return product.price > expensive.price ? product : expensive
})

console.log(
    `Самый дорогой товар ${mostExpensiveProduct.title}, его цена ${mostExpensiveProduct.price}`,
)

//Задача 4. Подсчитать количество товаров в наличии и не в наличии
//Установите количество доступных и недоступных товаров. Используйте метод reduce и посчитайте количество товаров в наличии ( stock: true ) и отсутствующих ( stock: false ) в виде объекта { available: x, unavailable: y } Выведите результат в консоль.
const numStockProduct = products.reduce(
    (count, product) => {
        product.stock ? count.available++ : count.unavailable++
        return count
    },
    { available: 0, unavailable: 0 },
)

console.log(numStockProduct)

//Задача 5. Преобразование данных с изменением ключей и вложенных значений
//Создайте новый массив объектов, в котором:
//поле title будет переименовано в productName ;
//цена ( price ) будет пересчитана в долларах (допустим, текущий курс — 100 рублей за доллар);
//категория ( category ), взятая из вложенного объекта  details , будет переименована в  productCategory .
//Затем новый массив выведите в консоль.
const products = [
    {
        id: 1,
        title: 'Кресло VILORA',
        price: 21000,
        details: { category: 'Гостинная' },
        stock: true,
    },
    {
        id: 2,
        title: 'Диван TULIP',
        price: 35000,
        details: { category: 'Гостинная' },
        stock: false,
    },
    {
        id: 3,
        title: 'Столик MANGO',
        price: 12000,
        details: { category: 'Кухня' },
        stock: true,
    },
    {
        id: 4,
        title: 'Кровать BALI',
        price: 40000,
        details: { category: 'Спальня' },
        stock: true,
    },
    {
        id: 5,
        title: 'Стул HUGO',
        price: 8000,
        details: { category: 'Кухня' },
        stock: false,
    },
]

const rate = 100

const result = products.map((product) => {
    return {
        productName: product.title,
        priceUSD: (product.price / rate).toFixed(2),
        productCategory: product.details.category,
    }
})

console.log('Преобразованный массив товаров:', result)
