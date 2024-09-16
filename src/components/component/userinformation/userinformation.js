


import './userinformarion.css'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


export default function Userinformation() {
    const navigate = useNavigate();

    function exitaccount() {
        Swal.fire({
            title: 'آیا مطمئن هستید؟',
            text: 'با خروج از حساب کاربری تمامی داده‌های شما پاک خواهد شد.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'بله، خارج شو',
            cancelButtonText: 'لغو'
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('authorization');
                Swal.fire(
                    'خارج شدید!',
                    'شما با موفقیت از حساب کاربری خود خارج شدید.',
                    'success'
                );
                localStorage.removeItem('authorization');
                navigate('/react/')            }
        });
        



    }
    return (
        <div className="profile-container">
            <div className="profile-card">
                <img src="images/123.png" class='avatar' alt="" />
                <h1 className="name">mohammad</h1>
                <p className="email">mobin@gmail.com</p>
                <p className="bio"></p>
                <button onClick={exitaccount}>خروج از حساب کاربری</button>
            </div>
        </div >
    )
}