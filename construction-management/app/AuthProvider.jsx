"use client"
import { api } from '@/convex/_generated/api';
import { useUser } from '@stackframe/stack';
import { useMutation } from 'convex/react';
import React, { useEffect, useState } from 'react'
import { UserContext } from './_context/UserContext';

function AuthProvider({ children }) {
    // 1. Define feedback state
    const [feedback, setFeedback] = useState({
        timberType: '',
        rating: 0,
        comment: '',
        quantity: 0 // Add quantity field
    });
    const user = useUser();
    const addFeedback = useMutation(api.feedback.addFeedback);

    // 2. Proper feedback submission function
    const AddNewFeedback = async() => {
        if (!user || !feedback.timberType) return;
        
        try {
            const result = await addFeedback({
                timberType: feedback.timberType,
                rating: feedback.rating,
                comment: feedback.comment, 
                quantity: feedback.quantity,
                buyerName: user?.name || '',
                buyerContact: user?.email || '',
            });
            console.log('Feedback submitted:', result);
        } catch (error) {
            console.error('Failed to submit feedback:', error);
        }
    }

    // 3. Only submit when both user and feedback exist
    useEffect(() => {
        if (user && feedback.timberType) {
            AddNewFeedback();
        }
    }, [feedback, user])

    // 4. Provide feedback state and setter to children
    return (
        <div>
            <UserContext.Provider value={{ feedback, setFeedback }}>
            {children}
            </UserContext.Provider>
        </div>
    )
}

export default AuthProvider