import React from 'react';
import Header from './header';
import Footer from './footer';

const PageLayout = ({ isLoggedIn, children }: { isLoggedIn: boolean, children: React.ReactNode }) => {
    return (
        <div className="page-layout p-0 h-full w-full">
            <div className='h-full w-full flex flex-col gap-0'>
                <Header isLoggedIn={isLoggedIn} />
                <div className='flex-grow p-0'>
                {children}
                <Footer />
                </div>
            </div>
        </div>
    );
};

export default PageLayout;
