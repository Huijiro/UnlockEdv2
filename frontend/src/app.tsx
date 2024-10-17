import '@/bootstrap';
import '@/css/app.css';
import React from 'react';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Welcome from '@/Pages/Welcome';
import Dashboard from '@/Pages/Dashboard';
import Login from '@/Pages/Auth/Login';
import ResetPassword from '@/Pages/Auth/ResetPassword';
import ProviderPlatformManagement from '@/Pages/ProviderPlatformManagement';
import { AuthProvider } from '@/AuthContext';
import Consent from '@/Pages/Auth/Consent';
import MyCourses from '@/Pages/MyCourses';
import MyProgress from '@/Pages/MyProgress';
import CourseCatalog from '@/Pages/CourseCatalog';
import ProviderUserManagement from '@/Pages/ProviderUserManagement';
import Error from '@/Pages/Error';
import ResourcesManagement from '@/Pages/ResourcesManagement';
import UnauthorizedNotFound from '@/Pages/Unauthorized';
import AdminManagement from '@/Pages/AdminManagement.tsx';
import StudentManagement from '@/Pages/StudentManagement.tsx';
import { checkDefaultFacility, checkExistingFlow, useAuth } from '@/useAuth';
import { UserRole } from '@/common';
import Loading from './Components/Loading.tsx';
import AuthenticatedLayout from './Layouts/AuthenticatedLayout.tsx';

const WithAuth: React.FC = () => {
    return (
        <AuthProvider>
            <Outlet />
        </AuthProvider>
    );
};

const AdminOnly: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useAuth();
    if (!user) {
        return;
    }
    if (user.role === UserRole.Admin) {
        return <div>{children}</div>;
    } else {
        return <UnauthorizedNotFound which="unauthorized" />;
    }
};

function WithAdmin() {
    return (
        <AuthProvider>
            <AdminOnly>
                <Outlet />
            </AdminOnly>
        </AuthProvider>
    );
}

const router = createBrowserRouter([
    {
        path: '/',
        element: <Welcome />,
        errorElement: <Error />
    },
    {
        path: '/login',
        element: <Login />,
        errorElement: <Error />,
        loader: checkExistingFlow
    },
    {
        path: '/',
        element: <WithAuth />,
        children: [
            {
                path: '',
                element: <AuthenticatedLayout />,
                children: [
                    {
                        path: '/dashboard',
                        element: <Dashboard />,
                        errorElement: <Error />
                    },
                    {
                        path: '/consent',
                        element: <Consent />,
                        errorElement: <Error />
                    },
                    {
                        path: '/my-courses',
                        element: <MyCourses />,
                        errorElement: <Error />
                    },
                    {
                        path: '/my-progress',
                        element: <MyProgress />,
                        errorElement: <Error />
                    },
                    {
                        path: '/course-catalog',
                        element: <CourseCatalog />,
                        errorElement: <Error />
                    }
                ]
            },
            {
                path: '/reset-password',
                element: <ResetPassword />,
                errorElement: <Error />,
                loader: checkDefaultFacility
            }
        ]
    },
    {
        path: '/',
        element: <WithAdmin />,
        children: [
            {
                path: '',
                element: <AuthenticatedLayout />,
                children: [
                    {
                        path: '/dashboard',
                        element: <Dashboard />,
                        errorElement: <Error />
                    },
                    {
                        path: '/student-management',
                        element: <StudentManagement />,
                        errorElement: <Error />
                    },
                    {
                        path: '/admin-management',
                        element: <AdminManagement />,
                        errorElement: <Error />
                    },
                    {
                        path: '/resources-management',
                        element: <ResourcesManagement />,
                        errorElement: <Error />
                    },
                    {
                        path: '/provider-platform-management',
                        element: <ProviderPlatformManagement />,
                        errorElement: <Error />
                    },
                    {
                        path: '/provider-users/:providerId',
                        element: <ProviderUserManagement />,
                        errorElement: <Error />
                    },
                    {
                        path: '*',
                        element: <UnauthorizedNotFound which="notFound" />
                    }
                ]
            }
        ]
    },
    {
        path: '/error',
        element: <Error />
    }
]);

export default function App() {
    if (import.meta.hot) {
        import.meta.hot.dispose(() => router.dispose());
    }

    return <RouterProvider router={router} fallbackElement={<Loading />} />;
}
