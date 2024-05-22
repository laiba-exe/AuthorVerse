import React, { useState, useEffect, createContext} from "react";

import {Routes, Route } from 'react-router-dom';
import app from "./firebase/Firebase";
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import HomePage from "./pages/homepage/HomePage";
import BooksPage from "./pages/bookspage/BooksPage";
import CartPage from "./pages/cartpage/CartPage";
import BookDetailsPage from "./pages/bookdetailspage/BookDetails";
import Login from "./pages/loginpage/Login";
import SignUp from "./pages/signup-page/Signup";
import ScrollToTop from "./components/util/ScrollToTop";
import SearchPage from "./pages/searchpage/SearchPage";
import Footer from "./components/layouts/footer/Footer";
import AboutUs from "./pages/aboutuspage/AboutUs";
import AuthorsPage from "./pages/authorspage/AuthorsPage";
import AuthorDetailsPage from "./pages/authorsdetails/AuthorsDetailsPage";

import AuthorDashboard from "./pages/authordashboard/AuthorDashboard";


export const UserContext = createContext({});
export const CartContext = createContext({});

const App = () => {
    const auth = getAuth(app);

    const [authenticatedUser, setAuthenticatedUser] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    

    useEffect(() => {
        onAuthStateChanged( auth, (user) => {
            if(user) {
                setAuthenticatedUser(user);
            } else {
                setAuthenticatedUser(null)
            }
        })
    })

    useEffect(() => {
        let total = 0;
        cartItems.forEach((item) => {
            total = total + parseInt(item.price);
        })

        setTotalAmount(total);
    },[cartItems])

    return(
        <ScrollToTop>
            <UserContext.Provider value = {authenticatedUser}>
                <CartContext.Provider value={{cartItems, totalAmount, setCartItems}}>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/books" element={<BooksPage />} />
                        <Route path="/cart" element={<CartPage />} />
                        <Route path="/search" element={<SearchPage />} />
                        <Route path="/book-details/:id" element={<BookDetailsPage/>} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/footer" element={<Footer />} />
                        <Route path="/aboutus" element={<AboutUs />} />
                        <Route path="/authorspage" element={<AuthorsPage />} />
                        <Route path="/authors/:authorId" element={<AuthorDetailsPage />} />
                        <Route path="/author-dashboard" element={<AuthorDashboard />} /> 
                        {/* <PrivateRoute path="/author-dashboard" element={<AuthorDashboard />} isAuthenticated={authenticatedUser !== null}  /> */}


                    </Routes> 
                </CartContext.Provider>
            </UserContext.Provider>
        </ScrollToTop>
    )
}

export default App;