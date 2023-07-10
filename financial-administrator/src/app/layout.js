import "./global.css";

export default function RootLayout({children}){
    return(
        <html lang="pt-br">
            <body suppressHydrationWarning={true}>{children}</body>
        </html>
    );
};