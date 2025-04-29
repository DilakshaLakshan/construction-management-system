"use client"
import React, { Suspense } from 'react'
import { ConvexProvider, ConvexReactClient } from "convex/react";

function Provider({children}) {
    const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);
  return (
    <Suspense fallback={<p>Loading...</p>}>
        <ConvexProvider client={convex}>
          
              {children}
          
      
        </ConvexProvider>

        </Suspense>
   
  )
}
export default Provider