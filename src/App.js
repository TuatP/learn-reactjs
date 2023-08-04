import './App.css';
import React, { useState, useEffect } from 'react';
import ShoppingCart from './components/ShoppingCart';
import { Routes, Route, Router } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home';
import ProductDetail from './components/ProductDetail';
import Contact from './components/Contact';
import About from './components/About';
import AddCategory from './admin/components/categories/AddCategory';
import ListCategory from './admin/components/categories/ListCategory';

import HomeAdmin from './admin/HomeAdmin';
import HomeUser from './user/HomeUser';
import AddProduct from './admin/components/products/AddProduct';
import ListProduct from './admin/components/products/ListProduct';
import Register from './components/Register';
import Login from './components/Login';


export const ProductContext = React.createContext();

//create products 
const products = [
	{
		id: 1,
		name: "iPhone 14 Pro Max",
		description: "As part of our efforts to reach carbon neutrality by 2030, iPhone 14 Pro and iPhone 14 Pro Max do not include a power adapter or EarPods. Included in the box is a USB‑C to Lightning Cable that supports fast charging and is compatible with USB‑C power adapters and computer ports",
		price: 640,
		image: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1662655662/Croma%20Assets/Communication/Mobiles/Images/261979_oq7vjv.png?tr=w-600",
		used: "The display has rounded corners that follow a beautiful curved design, and these corners are within a standard rectangle. When measured as a standard rectangular shape, the screen is 5.42 inches (iPhone 13 mini), 6.06 inches (iPhone 13, iPhone 14), 6.12 inches (iPhone 14 Pro), 6.68 inches (iPhone 14 Plus), or 6.69 inches (iPhone 14 Pro Max) diagonally. Actual viewable area is less. Available space is less and varies due to many factors. A standard configuration uses approximately 12GB to 17GB of space, including iOS 16 with its latest features and Apple apps that can be deleted. Apple apps that can be deleted use about 4.5GB of space, and you can download them back from the App Store. Storage capacity subject to change based on software version, settings, and iPhone mode"
	},
	{
		id: 2,
		name: "iPhone 12",
		description:
			"As part of our efforts to reach carbon neutrality by 2030, iPhone 13 and iPhone 13 mini do not include a power adapter or EarPods. Included in the box is a USB‑C to Lightning Cable that supports fast charging and is compatible with USB‑C power adapters and computer ports.",
		price: 229,
		image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTywixcMyTkWTN8eGHRapoEkqKqCKJN4NTw--7ql5uW_pKZkFfjzYIBjwQW7b4QNrOo_3PzjJmAhIIvXa9MZ0yDBiMiCRpTgA&usqp=CAE",
		used: 'Apple Trade In makes it easy to get credit towards the purchase of your next iPhone. Simply answer a few questions about your device. Based on what you tell us, we’ll provide an estimated trade-in value. If you pay monthly, we’ll apply the value as instant credit to lower the monthly payments of your new iPhone. If you pay in full, we’ll credit your payment method after we receive your trade-in. If it’s not eligible for credit, you can recycle it for free.'
	},
	{
		id: 3,
		name: "iPhone 13 Promax",
		description:
			"As part of our efforts to reach carbon neutrality by 2030, iPhone 12 does not include a power adapter or EarPods. Included in the box is a USB‑C to Lightning Cable that supports fast charging and is compatible with USB‑C power adapters and computer port",
		price: 99,
		image: "https://www.apple.com/newsroom/images/product/iphone/standard/Apple_iphone13_hero_09142021_inline.jpg.slideshow-xlarge_2x.jpg",
		used: "All iPhone models are world phones, so you can use them almost anywhere. Whether you are a GSM or CDMA network customer, you can roam internationally on GSM networks in over 200 countries or regions around the world. If you financed your iPhone with your wireless carrier, contact them to verify that you can roam internationally."

	},
	{
		id: 4,
		name: "iPhone 13 Mini",
		description:
			"As part of our efforts to reach carbon neutrality by 2030, iPhone 13 Mini do not include a power adapter or EarPods. Included in the box is a USB‑C to Lightning Cable that supports fast charging and is compatible with USB‑C power adapters and computer ports.",
		price: 119,
		image: "https://product.hstatic.net/1000300544/product/iphone-13-mini-starlight-select-2021_3435f3d569b84b3086787a3c0a490585.png",
		used: "An iPhone purchased from apple.com(Opens in a new window) is unlocked. Once your new iPhone is activated, it remains unlocked, which means you can use it with any network that provides service for iPhone. The exception is when you buy an iPhone with an AT&T Installment Plan. It will be locked to AT&T and will only work on the AT&T network for the term of your Installment Plan agreement."
	},
	{
		id: 5,
		name: "SAMSUNG Galaxy S23 Ultra",
		description:
			"in an online feature here on our website, and on our social media. This week’s smartphone photograph is by Ryder Magsalin using a Samsung Galaxy S23 Ultra",
		price: 600,
		image: "https://cdn2.cellphones.com.vn/x358,webp,q100/media/catalog/product/s/2/s23-ultra-den.png",
		used: "Looking for a cheap Galaxy S23 Ultra for sale? Buying used saves you money, but figuring out where to buy can be tricky. Skip the sketchy auction sites and forget about retail. Swappa is the safest and easiest way to get used Galaxy S23 Ultra deals in 2023. Swappa has a huge selection of used tech to choose from, making it easy to find the perfect price, storage size and condition"

	},
	{
		id: 6,
		name: "SAMSUNG Galaxy S22 Ultra",
		description:
			"Factory Unlocked Android Smartphone, 128GB, 8K Camera, Brightest Display Screen, S Pen, Long Battery Life, Fast 4nm Processor, US Version, 2022, Phantom Black",
		price: 550,
		image: "https://m.media-amazon.com/images/I/61U6oC65TTL._AC_UF894,1000_QL80_.jpg",
		used: "8K SUPER STEADY VIDEO: Shoot videos that rival how epic your life is with stunning 8K recording, the highest recording resolution available on a smartphone; Video captured is effortlessly smooth, thanks to Auto Focus Video Stabilization on Galaxy S22 Ultra.Form_factor : Smartphone"
	},
	{
		id: 7,
		name: "SAMSUNG Galaxy J7 Prime",
		description:
			"Super Retina XDR display ProMotion technology For phones using iOS 12.4 or later Availability of 5G and LTE data ",
		price: 100,
		image: "https://images.samsung.com/is/image/samsung/sg-feature-galaxy-j7-prime-g610-172648710?$FB_TYPE_B_JPG$",
		used: "8K SUPER STEADY VIDEO: Shoot videos that rival how epic your life is with stunning 8K recording, the highest recording resolution available on a smartphone; Video captured is effortlessly smooth, thanks to Auto Focus Video Stabilization on Galaxy S22 Ultra.Form_factor : Smartphone"
	},
	{
		id: 8,
		name: "Oppo F21 Pro 5G",
		description:
			"6.43 inch (16.33cm) FHD+ AMOLED Punch-hole Display (Rainbow Spectrum, 8GB RAM, 128 Storage) with No Cost EMI/Additional Exchange Offers",
		price: 590,
		image: "https://m.media-amazon.com/images/I/71XcMiRMC1L.jpg",
		used: 'Apple Trade In makes it easy to get credit towards the purchase of your next iPhone. Simply answer a few questions about your device. Based on what you tell us, we’ll provide an estimated trade-in value. If you pay monthly, we’ll apply the value as instant credit to lower the monthly payments of your new iPhone. If you pay in full, we’ll credit your payment method after we receive your trade-in. If it’s not eligible for credit, you can recycle it for free.'
	},
	{
		id: 9,
		name: "Oppo Reno5",
		description:
			"Android 11, upgradable to Android 12, ColorOS 12 Octa-core (1x2.4 GHz Kryo 475 Prime & 1x2.2 GHz Kryo 475 Gold & 6x1.8 GHz Kryo 475 Silver)",
		price: 499,
		image: "https://cdn.tgdd.vn/Products/Images/42/220438/oppo-reno5-trang-600x600-1-600x600.jpg",
		used: 'Apple Trade In makes it easy to get credit towards the purchase of your next iPhone. Simply answer a few questions about your device. Based on what you tell us, we’ll provide an estimated trade-in value. If you pay monthly, we’ll apply the value as instant credit to lower the monthly payments of your new iPhone. If you pay in full, we’ll credit your payment method after we receive your trade-in. If it’s not eligible for credit, you can recycle it for free.'
	}, {
		id: 10,
		name: "Oppo 2",
		description:
			"Android 11, upgradable to Android 12, ColorOS 12 Octa-core (1x2.4 GHz Kryo 475 Prime & 1x2.2 GHz Kryo 475 Gold & 6x1.8 GHz Kryo 475 Silver)",
		price: 4900,
		image: "https://cdn.tgdd.vn/Products/Images/42/220438/oppo-reno5-trang-600x600-1-600x600.jpg",
		used: 'Apple Trade In makes it easy to get credit towards the purchase of your next iPhone. Simply answer a few questions about your device. Based on what you tell us, we’ll provide an estimated trade-in value. If you pay monthly, we’ll apply the value as instant credit to lower the monthly payments of your new iPhone. If you pay in full, we’ll credit your payment method after we receive your trade-in. If it’s not eligible for credit, you can recycle it for free.'
	}
];

function App() {
	const [search, setSearch] = useState('')
	console.log(search)
	const [cartsVisibilty, setcartsVisibilty] = useState(false)
	const [productsInCart, setproductsInCart] =
		useState((JSON.parse(
			localStorage.getItem('shopping-cart')
		)
		) || []
		);

	useEffect(() => {
		localStorage.setItem('shopping-cart', JSON.stringify(productsInCart))
	}, [productsInCart])


	const addProductToCart = (prod) => {
		const oldCart = [...productsInCart];
		const findItem = oldCart.find((item) => {
			return item.product.id === prod.id;
		});

		if (findItem) {
			findItem.count += 1;
		} else {
			const cartItem = {
				product: prod,
				count: 1,
			};
			oldCart.push(cartItem);
		}
		setproductsInCart(oldCart);
	}

	//remove Product
	const onProductRemove = (product) => {
		setproductsInCart((oldState) => {
			const productsIndex = oldState.findIndex((item) => item.id === product.id);
			if (productsIndex !== -1) {
				oldState.splice(productsIndex, 1)
			}
			return [...oldState];
		})
	}


	const onQuantityChange = (prod, change) => {
		const oldCart = [...productsInCart];
		const index = oldCart.findIndex((item) => item === prod);

		if (change) {
			oldCart[index].count += 1;
		} else if (oldCart[index].count > 1) {
			oldCart[index].count -= 1;
		} else if (oldCart[index].count === 1) {
			alert('Quantity product min is 1')
		}
		setproductsInCart(oldCart);
	}

	const contextValue = {
		setSearch, setcartsVisibilty, productsInCart
	}

	//
	return (
		<ProductContext.Provider value={contextValue}>
		<div className="App">
			<ShoppingCart
				visibilty={cartsVisibilty}
				onClose={() => setcartsVisibilty(false)}
				onQuantityChange={onQuantityChange}
				onProductRemove={onProductRemove}
				productsInCart={productsInCart}
			/>
			<Routes>
				<Route path='/admin' element={<HomeAdmin />}>
					<Route index path='category/add' element={< AddCategory />} />
					<Route path='category/list' element={< ListCategory />} />
					<Route path='product/add' element={< AddProduct />} />
					<Route path='product/list' element={< ListProduct />} />
					<Route path='category/:id' element={< AddCategory />} />

				</Route>
				<Route path='/user' element={<HomeUser />}>
				    <Route path="register" element={<Register />} />
					<Route path="login" element={<Login />} />
					<Route path='contact' element={<Contact />} />
					<Route path="about" element={<About />} />
					<Route path="products" element={<Home products={products} search={search} addProductToCart={addProductToCart} />} />
					<Route path="products/:id" element={<ProductDetail products={products} addProductToCart={addProductToCart} />} />
				</Route>
			</Routes>
		</div>
		</ProductContext.Provider>
	);
}

export default App;
