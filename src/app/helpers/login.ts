'use client'
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export const checkLoginStatus = (setIsLoggedIn: any, redirectToLogin: boolean = false, router: any = undefined) => {
    const apiEndpoint = "http://localhost:3000/api/auth/token";

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

export function parseJwt (token: string|undefined) {
    var base64Url = token?.split('.')[1];
    var base64 = base64Url?.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64? base64 : '').split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}
