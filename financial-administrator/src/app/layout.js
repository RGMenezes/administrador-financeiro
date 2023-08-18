"use client";
import { SessionProvider } from 'next-auth/react';
import "./global.css";

export default function RootLayout({children}){
    return(
        <html lang="pt-br">
            <body suppressHydrationWarning={true}>
                <SessionProvider > 
                    {children}
                </SessionProvider>
            </body>
        </html>
    );
};