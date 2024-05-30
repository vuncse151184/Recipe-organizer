import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

const DefaultLayout = ({ children }) => {
    return (
        <div>
            <Header />
            <div style={{ paddingTop: 100 }}>{children}</div>
            <Footer />
        </div>
    )
}

export default DefaultLayout
