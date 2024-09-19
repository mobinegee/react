import { Link } from 'react-router-dom'
import './Navbar.css'
export default function Navbar (){
    return(
        <>
        <div className="navbar">
        <Link to="/react/productcategory/man">مردانه</Link>
        <Link to="/react/productcategory/men">زنانه</Link>
  <Link to="/react/productcategory/boy">پسرانه</Link>
  <Link to="/react/productcategory/girl">دخترانه</Link>
  <Link to="/react/productcategory/school">مدرسه</Link>
  <Link to="/react/productcategory/home">خانه</Link>
  <Link to="/react/adminpanel">پنل ادمین</Link>
  <div className="dropdown">
    {/* <button class="dropbtn">Dropdown 
      <i class="fa fa-caret-down"></i>
    </button> */}
    <div className="dropdown-content">
      <div className="header">
        <h2>Mega Menu</h2>
      </div>   
      <div className="row">
        <div className="column">
          <h3>Category 1</h3>
          <Link to="#">Link 1</Link>
          <Link to="#">Link 2</Link>
          <Link to="#">Link 3</Link>
        </div>
        <div className="column">
          <h3>Category 2</h3>
          <Link to="#">Link 1</Link>
          <Link to="#">Link 2</Link>
          <Link to="#">Link 3</Link>
        </div>
        <div className="column">
          <h3>Category 3</h3>
          <Link href="#">Link 1</Link>
          <Link href="#">Link 2</Link>
          <Link href="#">Link 3</Link>
        </div>
      </div>
    </div>
  </div> 
</div>
        </>
    )
}