import React from 'react'
import { useSelector } from 'react-redux'

export const Profile = () => {
    const user = useSelector(state => state.user.user)

    return (
        <div>
            
        </div>
    )
}