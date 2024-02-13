'use client'
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export const checkLoginStatus = (setIsLoggedIn: any, redirectToLogin: boolean = false, router: any = undefined) => {
    const apiEndpoint = "http://subra.ics.forth.gr:3000/api/auth/token";

    fetch(apiEndpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            access_token: Cookies.get('token'),
        }),
    })
        .then(async (response) => {
            if (response.ok) {
                let responseJSON = await response.json();
                if (responseJSON.loggedin) {
                    setIsLoggedIn(true);
                } else {
                    if (redirectToLogin && router !== undefined) {
                        router.push('/login?message="Please login to access this page."');
                    }
                }
            } else {
                console.error("Login failed. Status: " + response.status);
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}
