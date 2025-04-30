import './style.css'

export const metadata = {
    title: 'Admin | Edusm',
    description: 'Online Learning platform',
};

export default function adminLayout({ children }: { children: React.ReactNode }) {

    return (
        <>
            {children}
        </>
    );
}
