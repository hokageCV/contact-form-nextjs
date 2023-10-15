import './globals.css';

export const metadata = {
    title: 'Request Handler',
    description: 'Request handler for contact form',
};

export default function RootLayout({ children }) {
    return (
        <html lang='en'>
            <body>{children}</body>
        </html>
    );
}
