import { Outlet } from 'react-router-dom';
import NavBar from '../navbar/navbar';

export const MainLayout = () => {
    return (
        <div style={{margin: "3rem"}}>
            <NavBar/>
            <main>
            <Outlet />
            </main>
            
        </div>
    )
}