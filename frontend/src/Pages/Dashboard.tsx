import { useAuth } from '@/useAuth';
import { UserRole } from '@/common';
import StudentDashboard from './StudentDashboard';
import AdminDashboard from './AdminDashboard';

export default function Dashboard() {
    const { user } = useAuth();
    if (!user) {
        return;
    }

    if (user.role === UserRole.Student) {
        return <StudentDashboard />;
    } else {
        return <AdminDashboard />;
    }
}
