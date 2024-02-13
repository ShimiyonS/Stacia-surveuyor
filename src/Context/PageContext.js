import React, { createContext, useEffect, useState } from 'react'

const PageContext = createContext();

const PageContextProvider = ({ children }) => {
    const [pageName, setPageName] = useState('Dashboard');

    

    return(
        <PageContext.Provider
            value={{
                pageName, setPageName
            }}
        >
            {children}
        </PageContext.Provider>
    )
}

export { PageContext, PageContextProvider };


