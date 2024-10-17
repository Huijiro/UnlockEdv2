import { UserRole } from '@/common';
import Brand from './Brand';
import {
    AcademicCapIcon,
    ArchiveBoxIcon,
    BookOpenIcon,
    BuildingStorefrontIcon,
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon,
    HomeIcon,
    RectangleStackIcon,
    TrophyIcon,
    UsersIcon
} from '@heroicons/react/24/solid';
import { useAuth } from '@/useAuth';
import { Link } from 'react-router-dom';

export default function Navbar({
    isPinned,
    onTogglePin
}: {
    isPinned: boolean;
    onTogglePin: () => void;
}) {
    const user = useAuth();
    return (
        <div className="w-60 min-w-[240px] h-screen flex flex-col justify-start bg-background group">
            <div className="hidden lg:flex self-end py-6 mr-4">
                {isPinned ? (
                    <div
                        className="tooltip tooltip-left"
                        data-tip="Close sidebar"
                    >
                        <ChevronDoubleLeftIcon
                            className="w-4 opacity-0 group-hover:opacity-100 transition-opacity duration=300 cursor-pointer"
                            onClick={onTogglePin}
                        ></ChevronDoubleLeftIcon>
                    </div>
                ) : (
                    <div
                        className="tooltip tooltip-left"
                        data-tip="Lock sidebar open"
                    >
                        <ChevronDoubleRightIcon
                            className="w-4 opacity-0 group-hover:opacity-100 transition-opacity duration=300 cursor-pointer"
                            onClick={onTogglePin}
                        ></ChevronDoubleRightIcon>
                    </div>
                )}
            </div>

            <Link to="/" className="mt-16">
                <Brand />
            </Link>

            <ul className="menu">
                {user.user?.role == UserRole.Admin ? (
                    <>
                        {/* admin view */}
                        <li className="mt-16">
                            <Link to="/dashboard">
                                <HomeIcon className="w-4" /> Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link to="/student-management">
                                <AcademicCapIcon className="h-4" />
                                Students
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin-management">
                                <UsersIcon className="h-4" />
                                <span className="hidden lg:inline">Admins</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/resources-management">
                                <ArchiveBoxIcon className="h-4" />
                                Resources
                            </Link>
                        </li>
                        <li>
                            <Link to="/provider-platform-management">
                                <RectangleStackIcon className="h-4" />
                                Platforms
                            </Link>
                        </li>
                    </>
                ) : (
                    <>
                        {/* student view */}
                        <li className="mt-16">
                            <Link to="/dashboard">
                                <HomeIcon className="w-4" /> Dashboard
                            </Link>
                        </li>
                        <li className="">
                            <Link to="/my-courses">
                                <BookOpenIcon className="w-4" /> My Courses
                            </Link>
                        </li>
                        <li className="">
                            <Link to="/my-progress">
                                <TrophyIcon className="w-4" /> My Progress
                            </Link>
                        </li>
                        <li className="">
                            <Link to="/course-catalog">
                                <BuildingStorefrontIcon className="w-4" />{' '}
                                Course Catalog
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </div>
    );
}
