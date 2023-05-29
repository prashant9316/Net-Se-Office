import { useUser } from "hooks/User";
import { useRouter } from "next/router";
import React, { useEffect } from 'react';

const AdminProtection = ({ children }) => {
    const {loading, user, isAdmin} = useUser();
    const router = useRouter();
    useEffect(() => {
        if(!loading && !user && !isAdmin){
            router.push('/authentication/sign-in/')
        }
        if(user && !isAdmin){
            router.push('/')
        }
    }, [loading, user, isAdmin, router])
    return <>{children}</>
}

export default AdminProtection