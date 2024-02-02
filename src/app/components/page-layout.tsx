import React from 'react';
import Header from './header';
import Footer from './footer';

const PageLayout = ({ isLoggedIn, skipLogin, children, pageName }: { isLoggedIn: boolean, skipLogin: boolean, children: React.ReactNode, pageName: string|undefined }) => {
    return (
        <div className="page-layout p-0 h-full w-full bg-white">
            <div className='h-full w-full flex flex-col gap-0'>
                <Header isLoggedIn={isLoggedIn} skipLogin={skipLogin} pageName={pageName} />
                <div className='flex-grow p-0'>
                {children}
                <Footer />
                </div>
            </div>
        </div>
    );
};

export default PageLayout;
