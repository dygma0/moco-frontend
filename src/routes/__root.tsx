import {createRootRoute, Outlet} from '@tanstack/react-router'
import {Sidebar} from '../components/Sidebar'

export const Route = createRootRoute({
    component: RootComponent,
})

function RootComponent() {
    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <Sidebar/>

            {/* Main content */}
            <div className="flex-1 overflow-auto">
                <Outlet/>
            </div>
        </div>
    )
}
