import { useUser } from "hooks/User";
import { useRouter } from "next/router";
import React, {useEffect} from 'react';

const PrivateProtection = ({ children }) => {
    const {loading, user, isAdmin} = useUser();
    const router = useRouter();
    useEffect(() => {
        if(!loading && !user){
            router.push('/authentication/sign-in/')
        }if(isAdmin && user){
            router.push('/admin')
        }
    }, [loading, user, router])


    return <>{children}</>
}

export default PrivateProtection