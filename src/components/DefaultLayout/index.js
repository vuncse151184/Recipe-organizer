import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import SearchFilter from '../SearchFilter'

const DefaultLayout = ({ children }) => {
    return (
        <div>
            <Header />
            <SearchFilter />
            {children}
            <Footer />
        </div>
    )
}

export default DefaultLayout
