import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../../component/Header/Header";
import Navbar from "../../component/Navbar/Navbar";
import Footer from "../../component/footer/footer";
import './productcategory.css'
import LoadingComponent from "../../component/Loading/Loading";
export default function ProductCategory() {
    const [products, setProducts] = useState([]);
    const { category } = useParams();
    const [isloading, setisloading] = useState(true)
    const [noutfound , setnoutfound] = useState(true)
    console.log('productcategory run')

    async function getAllProducts() {
        try {
            const response = await fetch(
                `https://backendreact.vercel.app/api/products/productscategory/${category}`,
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
            setisloading(false)
            setnoutfound(false)

            // Set products to an empty array if no products found
            setProducts(result.length > 0 ? result : []);
        } catch (error) {
            console.error("Error fetching products:", error);
            setProducts([]); // Clear products on error
        }
    }

    useEffect(() => {
        getAllProducts();
    }, [category]);

    console.log(products)
    console.log('productcategory run')

    return (
        <div id="root">
            <Header />
            <Navbar />
            {
                isloading ? (
                    <>
                        <LoadingComponent />

                    </>
                ) : (<>
                    <div className="content">
                        <div className='productgrid'>
                            {noutfound !== true ? (
                                products.map((product) => (
                                    <div className='productcard' key={product.id}>
                                        <img
                                            src={`${product.image_url}`}
                                            alt={product.name}
                                        />
                                        <div className='productcardinfo'>
                                            <h3>
                                                {product.name.length > 5
                                                    ? "..." + product.name.substring(0, 30)
                                                    : product.name.substring(0, 10)}
                                            </h3>
                                            <p style={{ direction: 'rtl' }}>
                                                {Number(product.price).toLocaleString()} تومان
                                            </p>
                                            <Link to={`/react/Product/${product.id}`}>بیشتر</Link>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <h4 className='notproduct'>در حال حاضر موجود نیست</h4>
                            )}
                        </div>
                    </div>
                </>)
            }
            <Footer />
        </div>
    );
}
