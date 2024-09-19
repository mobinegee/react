import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../../component/Header/Header";
import Navbar from "../../component/Navbar/Navbar";
import Footer from "../../component/footer/footer";
import styles from './styles.module.css';

export default function Search() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const { resultsearch } = useParams(); 
    const [status , setstatus] = useState(200);

    async function getAllProducts() {
        try {
            const response = await fetch(
                `https://backendreact.vercel.app/api/products/search?name=${resultsearch}`,
                {
                    method: "GET",
                }
            );

            // if (!response.ok) {
            //     throw new Error(
            //         `Error fetching data! HTTP Status: ${response.status}`
            //     );
            // }

            const result = await response.json();
            setProducts(result);
            setError(null); // reset error if successful
        } catch (error) {
            setError("Error fetching products. Please try again later.");
            console.error("Error fetching products:", error);
        }
    }

    useEffect(() => {
        getAllProducts();
    }, [resultsearch]);

    console.log('resultsearch =>', resultsearch);

    return (
        <div className={styles.container}>
            <Header />
            <Navbar />
            <main className={styles.content}>
                <div className={styles.productgrid}>
                    {products.length > 0 ? (
                        products.map((product) => (
                            <div className={styles.productcard} key={product.id}>
                                <img
                                    src={`${product.image_url}`}
                                    alt={product.name}
                                />
                                <div className={styles.productcardinfo}>
                                    <h3>
                                        {product.name.length > 30
                                            ? product.name.substring(0, 30) + "..."
                                            : product.name}
                                    </h3>
                                    <p style={{ direction: 'rtl' }}>
                                        {Number(product.price).toLocaleString()} تومان
                                    </p>
                                    <Link to={`/react/Product/${product.id}`}>بیشتر</Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        !error && (
                            <h4 className={styles.notproduct}>
                                برای جستجوی {resultsearch} چیزی یافت نشد
                            </h4>
                        )
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}
