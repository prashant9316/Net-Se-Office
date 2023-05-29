import { useUser } from "hooks/User";
import { useRouter } from "next/router";
import React, { useEffect } from 'react';

const PublicRoute = ({ children }) => {
    const {loading, user, isAdmin} = useUser();
    const router = useRouter();
    useEffect(() => {
        if(user && isAdmin){
            router.push('/admin')
        } else if(user && !isAdmin){
            router.push('/')
        }
    }, [loading, user, router])


    return <>{children}</>
}

export default PublicRoute