import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../../component/Header/Header";
import Navbar from "../../component/Navbar/Navbar";
import Footer from "../../component/footer/footer";
import styles from './styles.module.css';

export default function Allproducts() {
    const [products, setProducts] = useState([]);
    const { category } = useParams();

    async function getAllProducts() {
        try {
            const response = await fetch(
                `https://backendreact.vercel.app/api/products/getproducts/`,
                {
                    method: "GET",
                }
            );

            if (!response.ok) {
                throw new Error(
                    `Error fetching data! HTTP Status: ${response.status}`
                );
            }

            const result = await response.json();
            setProducts(result);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    }

    useEffect(() => {
        getAllProducts();
    }, [category]); // Fetch products whenever category changes

    return (
        <>
            <Header />
            <Navbar />
            <div className={styles.productgrid}>
                {products.length > 0 ? (
                    products.map((product) => (
                        <div className={styles.productcard} key={product.id}>
                            <img
                                src={`https://backendreact.vercel.app/uploads/${product.image_url}`}
                                alt={product.name}
                            />
                            <div className={styles.productcardinfo}>
                                <h3>
                                    {product.name.length > 5
                                        ?  "..." + product.name.substring(0, 30) 
                                        : product.name.substring(0, 10)}
                                </h3>
                                {/* <p>{product.description}</p> */}
                                <a href={`/Product/${product.id}`}>بیشتر</a>
                            </div>
                        </div>
                    ))
                ) : (
                    <h4 className={styles.notproduct}>در حال حاضر موجود نیست</h4>
                )}
            </div>
            <Footer />
        </>
    );
}
