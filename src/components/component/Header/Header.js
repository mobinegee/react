import './header.css';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Header() {
    const navigate = useNavigate();

    function handleSearch(event) {
        // Prevent default form submission
        event.preventDefault();
        const result = event.target.elements.searchInput.value;
        if (result) {
            navigate(`/react/search/${result}`);
        }
        Swal.fire({
            position: "top-center",
            icon: "success",
            title: "با موفقیت انجام شد",
            showConfirmButton: false,
            timer: 1500
        });
    }

    return (
        <div className='header'>
            <div className='namesite'>
                <Link to="/react/">
                    <h1>قدم رو</h1>
                </Link>
                <form onSubmit={handleSearch}>
                    <input
                        name="searchInput"
                        type="text"
                        placeholder='جستجو کنید'
                    />
                    <button type="submit" style={{ display: 'none' }}>Search</button>
                </form>

            </div>
            <div className='shap'>
                <Link to="/react/Card">
                    <img src="https://mobinegee.github.io/react/images/icons8-shopping-cart-100%20(2).png" alt="Cart" />
                </Link>
                <Link to="/react/user">
                    <img src="https://mobinegee.github.io/react/images/icons8-user-96.png" alt="User" />
                </Link>

                {/* <Link to="/"><img src="http://localhost:3000/images/icons8-heart-100.png" alt="Favorites" /></Link> */}
            </div>

        </div>
    );
}
