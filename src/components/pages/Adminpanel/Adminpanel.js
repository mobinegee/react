import React, { useState } from 'react';
import Swal from 'sweetalert2'; // اضافه کردن SweetAlert2
import Header from "../../component/Header/Header";
import styles from './styles.module.css';
import Navbar from "../../component/Navbar/Navbar";
import Footer from "../../component/footer/footer";

export default function AdminPanel() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image: null,
    category: "",
    stock: "",
  });

  function handleInputChange(event) {
    const { name, value } = event.target;
    setForm(prevForm => ({
      ...prevForm,
      [name]: value
    }));
  }

  function handleImageUpload(event) {
    setForm(prevForm => ({
      ...prevForm,
      image: event.target.files[0]
    }));
  }

  async function onSubmit(event) {
    event.preventDefault();
    console.log("Form data before sending:", form);

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("stock", form.stock);
    formData.append("category_id", form.category || "");
    formData.append("image", form.image);
    formData.append("created_at", new Date().toISOString());
    formData.append("updated_at", new Date().toISOString());

    try {
      // const response = await fetch("https://backendreact.vercel.app/api/products/post", {
      // const response = await fetch("http://localhost:5200/api/products/post", {
        const response = await fetch("https://backendreact.vercel.app/api/products/post", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();

      // نمایش پیغام موفقیت با SweetAlert2
      await Swal.fire({
        title: "محصول با موفقیت ثبت شد!",
        icon: "success",
        confirmButtonText: "باشه",
      });
      console.log(result);

      // Reset form
      setForm({
        name: "",
        description: "",
        price: "",
        image: null,
        category: "",
        stock: "",
      });
    } catch (error) {
      console.error("Error:", error);

      // نمایش پیغام خطا با SweetAlert2
      await Swal.fire({
        title: "خطا در ثبت محصول!",
        text: "لطفاً دوباره تلاش کنید.",
        icon: "error",
        confirmButtonText: "باشه",
      });
    }
  }

  function onReset(event) {
    event.preventDefault();
    setForm({
      name: "",
      description: "",
      price: "",
      image: null,
      category: "",
      stock: "",
    });
  }

  return (
    <>
      <Header />
      <Navbar />
      <div className={styles.maincontent}>
        <div className={styles.container}>
          <form onSubmit={onSubmit}>
            <div className={styles.formgroup}>
              <label htmlFor="name">نام محصول:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleInputChange}
                placeholder="نام محصول خود را وارد کنید"
                required
              />
            </div>

            <div className={styles.formgroup}>
              <label htmlFor="description">توضیحات:</label>
              <input
                type="text"
                id="description"
                name="description"
                value={form.description}
                onChange={handleInputChange}
                placeholder="توضیحات"
                required
              />
            </div>

            <div className={styles.formgroup}>
              <label htmlFor="stock">جنس:</label>
              <input
                type="text"
                id="stock"
                name="stock"
                value={form.stock}
                onChange={handleInputChange}
                placeholder="جنس"
                required
              />
            </div>

            <div className={styles.formgroup}>
              <label htmlFor="price">قیمت:</label>
              <input
                type="number"
                id="price"
                name="price"
                value={form.price}
                onChange={handleInputChange}
                placeholder="قیمت را وارد کنید"
                required
              />
            </div>

            <div className={styles.formgroup}>
              <label htmlFor="image">انتخاب عکس:</label>
              <input
                type="file"
                id="image"
                onChange={handleImageUpload}
                accept="image/*"
                required
              />
            </div>

            <div className={styles.formgroup}>
              <label htmlFor="category">دسته‌بندی:</label>
              <select
                id="category"
                name="category"
                value={form.category}
                onChange={handleInputChange}
                required
              >
                <option value="">یک گزینه انتخاب کنید</option>
                <option value="man">مردانه</option>
                <option value="men">زنانه</option>
                <option value="boy">پسرانه</option>
                <option value="girl">دخترانه</option>
                <option value="school">مدرسه</option>
                <option value="home">خانه</option>
              </select>
            </div>

            <button type="submit" className={styles.submitbtn}>ثبت محصول</button>
            <button type="reset" className={styles.resetbtn} onClick={onReset}>
              بازنشانی
            </button>
          </form>
        </div>
      </div>
      {/* <div className={styles.footer}>
        <Footer />
      </div> */}
    </>
  );
}
