import React, { useState, useEffect } from 'react';
import Header from './../../component/Header/Header';
import Navbar from '../../component/Navbar/Navbar';
import Footer from '../../component/footer/footer';
import styles from './styles.module.css';
import { Link, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const Product = () => {
    const [product, setProduct] = useState(null);
    const [products, setProducts] = useState([]);
    const [formattedPrice, setFormattedPrice] = useState('');
    const [descriptionItems, setDescriptionItems] = useState([]);
    const [showCategory, setShowCategory] = useState(false);
    const { id: productId } = useParams();

    useEffect(() => {
        getProductById();
    }, [productId]);

    useEffect(() => {
        if (product) {
            setFormattedPrice(new Intl.NumberFormat('fa-IR').format(product.price));
            setDescriptionItems(product.description.split(','));
        }
    }, [product]);

    async function getProductById() {
        try {
            const response = await fetch(`https://backendreact-avco.onrender.com/api/products/products/${productId}`, {
                method: 'GET',
            });

            if (!response.ok) {
                throw new Error(`Error fetching product! HTTP Status: ${response.status}`);
            }

            const result = await response.json();
            setProduct(result);
            getAllProducts(result.category_id); // Fetch related products based on category
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    }

    async function getAllProducts(categoryId) {
        try {
            const response = await fetch(`https://backendreact-avco.onrender.com/api/products/productscategory/${categoryId}`, {
                method: 'GET',
            });

            if (!response.ok) {
                throw new Error(`Error fetching data! HTTP Status: ${response.status}`);
            }

            const result = await response.json();
            if (result.length > 1) {
                setShowCategory(true);
            }
            setProducts(result.filter((prod) => prod.id !== Number(productId)));
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    const addToCart = () => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingProduct = cart.find((item) => item.id === product.id);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        Swal.fire({
            title: `${product.name} به سبد خرید اضافه شد!`,
            icon: 'success',
            confirmButtonText: 'باشه',
        });
    };

    if (!product) return <div>Loading...</div>;

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <div className={styles.home}>
            <Header />
            <Navbar />
            <div className={styles.container}>
                <div className={styles.productdetails}>
                    <div className={styles.productimage}>
                        <img
                            src={`https://backendreact-avco.onrender.com/uploads/${product.image_url}`}
                            alt={product.name}
                        />
                    </div>
                    <div className={styles.productinfo}>
                        <h1>{product.name}</h1>
                        <ul>
                            {descriptionItems.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                        <p className={styles.price}>قیمت: {formattedPrice} تومان</p>
                        <button className={styles.addtocart} onClick={addToCart}>
                            افزودن به سبد خرید
                        </button>
                    </div>
                </div>
                {showCategory && (
                    <>
                        <h3 className={styles.moshabeh}>محصولات مشابه</h3>
                        <div className={styles.productgrid}>
                            {products.map((product) => (
                                <div className={styles.productcard} key={product.id}>
                                    <img
                                        src={`https://backendreact-avco.onrender.com/uploads/${product.image_url}`}
                                        alt={product.name}
                                    />
                                    <div className={styles.productcardinfo}>
                                        <h3>
                                            {product.name.length > 30
                                                ? `${product.name.substring(0, 30)}...`
                                                : product.name}
                                        </h3>
                                        <Link className={styles.customlink} to={`/react/Product/${product.id}`} onClick={scrollToTop}>
                                            بیشتر
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Product;
