"use client";

import { useState } from "react";
import {
    Eye,
    Play,
    Bell,
    Target,
    Monitor,
    FastForward,
    Download,
    Wifi,
    BookOpen,
    ClipboardList,
    ClipboardCheck,
    Award,
    Clock3,
    MessageSquare,
    Smile,
    Trophy,
    Sun,
    Moon,
    Laptop,
} from "lucide-react";
import DashboardLayout from "../../components/layout/DashboardLayout";


type TabId = "preferences" | "notifications" | "accessibility";

interface ToggleRowProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    checked: boolean;
    onChange: (value: boolean) => void;
}

interface SelectRowProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    value: string;
    options: string[];
    onChange: (value: string) => void;
}

type TextSize = "Small" | "Medium" | "Large";
type Theme = "Light" | "Dark" | "System Default";


function Toggle({
    checked,
    onChange,
}: {
    checked: boolean;
    onChange: (value: boolean) => void;
}) {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            onClick={() => onChange(!checked)}
            className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${checked ? "bg-primary" : "bg-gray-200"
                }`}
        >
            <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform duration-200 ${checked ? "translate-x-5" : "translate-x-0.5"
                    }`}
            />
        </button>
    );
}

function IconBadge({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            {children}
        </div>
    );
}

function ToggleRow({ icon, title, description, checked, onChange }: ToggleRowProps) {
    return (
        <div className="flex items-center justify-between gap-4 px-6 py-4">
            <div className="flex items-start gap-3">
                <IconBadge>{icon}</IconBadge>
                <div>
                    <p className="text-sm font-medium text-gray-900">{title}</p>
                    <p className="mt-0.5 text-sm text-gray-500">{description}</p>
                </div>
            </div>
            <Toggle checked={checked} onChange={onChange} />
        </div>
    );
}

function SelectRow({ icon, title, description, value, options, onChange }: SelectRowProps) {
    return (
        <div className="flex items-center justify-between gap-4 px-6 py-4">
            <div className="flex items-start gap-3">
                <IconBadge>{icon}</IconBadge>
                <div>
                    <p className="text-sm font-medium text-gray-900">{title}</p>
                    <p className="mt-0.5 text-xs text-gray-500">{description}</p>
                </div>
            </div>
            <div className="relative">
                <select
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="cursor-pointer appearance-none rounded-full border border-gray-200 bg-white py-2 md:pl-4 pl-3 pr-5 md:pr-9 text-xs md:text-sm font-medium text-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                    {options.map((opt) => (
                        <option key={opt} value={opt}>
                            {opt}
                        </option>
                    ))}
                </select>
                <svg
                    className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </div>
        </div>
    );
}

function SectionCard({
    title,
    description,
    children,
}: {
    title: string;
    description: string;
    children: React.ReactNode;
}) {
    return (
        <div>
            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
            <p className="mt-1 text-sm text-gray-500">{description}</p>
            <div className="mt-4 divide-y divide-gray-100 rounded-2xl border border-gray-100 bg-white shadow-sm">
                {children}
            </div>
        </div>
    );
}



function PreferencesTab() {
    const [defaultCourseView, setDefaultCourseView] = useState("Course Overview");
    const [autoPlay, setAutoPlay] = useState(true);
    const [resumeLearning, setResumeLearning] = useState(true);
    const [completionReminder, setCompletionReminder] = useState(true);
    const [weeklyGoal, setWeeklyGoal] = useState("5 hours/week");

    const [videoQuality, setVideoQuality] = useState("Auto");
    const [playbackSpeed, setPlaybackSpeed] = useState(true);
    const [downloadOffline, setDownloadOffline] = useState(true);
    const [wifiOnly, setWifiOnly] = useState(false);

    return (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <SectionCard
                title="Learning Preferences"
                description="Customize how you learn & interact with courses"
            >
                <SelectRow
                    icon={<Eye size={18} />}
                    title="Default Course View"
                    description="Choose how you'd like your course to open"
                    value={defaultCourseView}
                    options={["Course Overview", "Continue Learning", "Curriculum"]}
                    onChange={setDefaultCourseView}
                />
                <ToggleRow
                    icon={<Play size={18} />}
                    title="Auto-Play Lessons"
                    description="Automatically play the next lesson when the current one ends"
                    checked={autoPlay}
                    onChange={setAutoPlay}
                />
                <ToggleRow
                    icon={<Bell size={18} />}
                    title="Resume Learning"
                    description="Continue from where you stopped when you return to a course."
                    checked={resumeLearning}
                    onChange={setResumeLearning}
                />
                <ToggleRow
                    icon={<Play size={18} />}
                    title="Course Completion Reminder"
                    description="Remind me about unfinished courses and upcoming deadlines."
                    checked={completionReminder}
                    onChange={setCompletionReminder}
                />
                <SelectRow
                    icon={<Target size={18} />}
                    title="Weekly Learning Goal"
                    description="Set a weekly target for your learning progress"
                    value={weeklyGoal}
                    options={["3 hours/week", "5 hours/week", "10 hours/week", "15 hours/week"]}
                    onChange={setWeeklyGoal}
                />
            </SectionCard>

            <SectionCard
                title="Content Preferences"
                description="Manage how course content is displayed and delivered"
            >
                <SelectRow
                    icon={<Monitor size={18} />}
                    title="Video Quality"
                    description="Select default video quality for lessons"
                    value={videoQuality}
                    options={["Auto", "1080p", "720p", "480p"]}
                    onChange={setVideoQuality}
                />
                <ToggleRow
                    icon={<FastForward size={18} />}
                    title="Playback Speed"
                    description="Choose your default playback speed"
                    checked={playbackSpeed}
                    onChange={setPlaybackSpeed}
                />
                <ToggleRow
                    icon={<Download size={18} />}
                    title="Download Courses for Offline Learning"
                    description="Allow downloaded course to be offline"
                    checked={downloadOffline}
                    onChange={setDownloadOffline}
                />
                <ToggleRow
                    icon={<Wifi size={18} />}
                    title="Download Over Wi-Fi Only"
                    description="Only download courses over Wi-Fi"
                    checked={wifiOnly}
                    onChange={setWifiOnly}
                />
            </SectionCard>
        </div>
    );
}


function NotificationsTab() {
    const [courseUpdates, setCourseUpdates] = useState(true);
    const [assignmentReminders, setAssignmentReminders] = useState(true);
    const [assessmentReminders, setAssessmentReminders] = useState(true);
    const [certificateUpdates, setCertificateUpdates] = useState(true);
    const [learningProgress, setLearningProgress] = useState(true);

    const [courseAnnouncements, setCourseAnnouncements] = useState(true);
    const [instructorMessages, setInstructorMessages] = useState(true);
    const [assignmentFeedback, setAssignmentFeedback] = useState(true);
    const [achievementNotifications, setAchievementNotifications] = useState(true);

    return (
        <div>
            <h1 className="text-lg font-semibold text-gray-900">Notification Settings</h1>
            <p className="mt-1 text-sm text-gray-500">Choose what updates you want to receive</p>

            <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div>
                    <h2 className="text-sm font-semibold text-primary-dark">Email Notifications</h2>
                    <div className="mt-3 divide-y divide-gray-100 rounded-2xl border border-gray-100 bg-white shadow-sm">
                        <ToggleRow
                            icon={<BookOpen size={18} />}
                            title="Course Updates"
                            description="New lessons and course announcements"
                            checked={courseUpdates}
                            onChange={setCourseUpdates}
                        />
                        <ToggleRow
                            icon={<ClipboardList size={18} />}
                            title="Assignment Reminders"
                            description="Reminders about pending assignments"
                            checked={assignmentReminders}
                            onChange={setAssignmentReminders}
                        />
                        <ToggleRow
                            icon={<ClipboardCheck size={18} />}
                            title="Assessment & Quiz Reminders"
                            description="Upcoming or incomplete assessments"
                            checked={assessmentReminders}
                            onChange={setAssessmentReminders}
                        />
                        <ToggleRow
                            icon={<Award size={18} />}
                            title="Certificate Updates"
                            description="Notifications when certificates become available"
                            checked={certificateUpdates}
                            onChange={setCertificateUpdates}
                        />
                        <ToggleRow
                            icon={<Clock3 size={18} />}
                            title="Learning Progress"
                            description="Weekly progress and learning summaries"
                            checked={learningProgress}
                            onChange={setLearningProgress}
                        />
                    </div>
                </div>

                <div>
                    <h2 className="text-sm font-semibold text-primary-dark">Website Notifications</h2>
                    <div className="mt-3 divide-y divide-gray-100 rounded-2xl border border-gray-100 bg-white shadow-sm">
                        <ToggleRow
                            icon={<Bell size={18} />}
                            title="Course announcements"
                            description="Receive updates within the platform"
                            checked={courseAnnouncements}
                            onChange={setCourseAnnouncements}
                        />
                        <ToggleRow
                            icon={<MessageSquare size={18} />}
                            title="Instructor messages"
                            description="Get notified about new messages"
                            checked={instructorMessages}
                            onChange={setInstructorMessages}
                        />
                        <ToggleRow
                            icon={<Smile size={18} />}
                            title="Assignment feedback"
                            description="When feedback or grades are posted"
                            checked={assignmentFeedback}
                            onChange={setAssignmentFeedback}
                        />
                        <ToggleRow
                            icon={<Trophy size={18} />}
                            title="Achievement notifications"
                            description="Badges, milestones, & achievements"
                            checked={achievementNotifications}
                            onChange={setAchievementNotifications}
                        />
                    </div>
                </div>
            </div>
        </div>

    );
}


function SegmentedControl<T extends string>({
    options,
    value,
    onChange,
}: {
    options: T[];
    value: T;
    onChange: (value: T) => void;
}) {
    return (
        <div className="flex items-center gap-2">
            {options.map((opt) => {
                const active = opt === value;
                return (
                    <button
                        key={opt}
                        type="button"
                        onClick={() => onChange(opt)}
                        className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${active
                            ? "border-primary bg-primary text-primary"
                            : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                            }`}
                    >
                        {opt}
                    </button>
                );
            })}
        </div>
    );
}

function AccessibilityTab() {
    const [textSize, setTextSize] = useState<TextSize>("Medium");
    const [highContrast, setHighContrast] = useState(false);
    const [colorBlindSupport, setColorBlindSupport] = useState(false);
    const [reduceMotion, setReduceMotion] = useState(false);
    const [keyboardNav, setKeyboardNav] = useState(true);

    const [theme, setTheme] = useState<Theme>("System Default");
    const [compactMode, setCompactMode] = useState(false);
    const [rememberSidebar, setRememberSidebar] = useState(true);

    const themeIcon: Record<Theme, React.ReactNode> = {
        Light: <Sun size={14} />,
        Dark: <Moon size={14} />,
        "System Default": <Laptop size={14} />,
    };

    return (

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <SectionCard title="Accessibility" description="Make the platform easier to use">
                <div className="flex items-center justify-between gap-4 px-6 py-4">
                    <div>
                        <p className="text-sm font-medium text-gray-900">Text Size</p>
                        <p className="mt-0.5 text-sm text-gray-500">Adjust the size of text across the platform</p>
                    </div>
                    <SegmentedControl<TextSize>
                        options={["Small", "Medium", "Large"]}
                        value={textSize}
                        onChange={setTextSize}
                    />
                </div>

                <div className="flex items-center justify-between gap-4 px-6 py-4">
                    <div>
                        <p className="text-sm font-medium text-gray-900">High Contrast</p>
                        <p className="mt-0.5 text-sm text-gray-500">
                            Increase contrast between text and interface elements.
                        </p>
                    </div>
                    <Toggle checked={highContrast} onChange={setHighContrast} />
                </div>

                <div className="flex items-center justify-between gap-4 px-6 py-4">
                    <div>
                        <p className="text-sm font-medium text-gray-900">Color Blindness Support</p>
                        <p className="mt-0.5 text-sm text-gray-500">Optimize interface colors for improved visibility.</p>
                    </div>
                    <Toggle checked={colorBlindSupport} onChange={setColorBlindSupport} />
                </div>

                <div className="flex items-center justify-between gap-4 px-6 py-4">
                    <div>
                        <p className="text-sm font-medium text-gray-900">Reduce Motion</p>
                        <p className="mt-0.5 text-sm text-gray-500">Minimize animations throughout the dashboard.</p>
                    </div>
                    <Toggle checked={reduceMotion} onChange={setReduceMotion} />
                </div>

                <div className="flex items-center justify-between gap-4 px-6 py-4">
                    <div>
                        <p className="text-sm font-medium text-gray-900">Keyboard Navigation</p>
                        <p className="mt-0.5 text-sm text-gray-500">Enable enhanced keyboard navigation across the platform.</p>
                    </div>
                    <Toggle checked={keyboardNav} onChange={setKeyboardNav} />
                </div>
            </SectionCard>

            <SectionCard title="Appearance" description="Choose how Talent Faculty looks on your device.">
                <div className="flex items-center justify-between gap-4 px-6 py-4">
                    <div>
                        <p className="text-sm font-medium text-gray-900">Theme</p>
                        <p className="mt-0.5 text-xs md:text-sm text-gray-500">Choose how the platform looks</p>
                    </div>
                    <div className="grid grid-cols-1 w-full md:grid-cols-2 items-center gap-2">
                        {(["Light", "Dark", "System Default"] as Theme[]).map((opt) => {
                            const active = opt === theme;
                            return (
                                <button
                                    key={opt}
                                    type="button"
                                    onClick={() => setTheme(opt)}
                                    className={`flex items-center gap-1.5 rounded-full border px-1.5 md:px-3 py-1.5 text-xs md:text-sm font-medium transition-colors ${active
                                        ? "border-primary bg-primary text-white"
                                        : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                                        }`}
                                >
                                    {themeIcon[opt]}
                                    {opt}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="flex items-center justify-between gap-4 px-6 py-4">
                    <div>
                        <p className="text-sm font-medium text-gray-900">Compact Mode</p>
                        <p className="mt-0.5 text-sm text-gray-500">Reduce spacing to display more course information on screen.</p>
                    </div>
                    <Toggle checked={compactMode} onChange={setCompactMode} />
                </div>

                <div className="flex items-center justify-between gap-4 px-6 py-4">
                    <div>
                        <p className="text-sm font-medium text-gray-900">Remember Sidebar State</p>
                        <p className="mt-0.5 text-sm text-gray-500">
                            Keep the sidebar collapsed or expanded based on your last preference.
                        </p>
                    </div>
                    <Toggle checked={rememberSidebar} onChange={setRememberSidebar} />
                </div>
            </SectionCard>
        </div>

    );
}


const TABS: { id: TabId; label: string }[] = [
    { id: "preferences", label: "Preferences" },
    { id: "notifications", label: "Notification Settings" },
    { id: "accessibility", label: "Accessibility" },
];

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState<TabId>("preferences");

    return (
        <DashboardLayout title="Settings" subtitle="Manage your account and preferences">
            <div className="min-h-screen ">
                <div className=" max-w-7xl px-6 py-2 sm:px-8">
                    <nav className="mt-2 flex items-center gap-8 border-b border-gray-200">
                        {TABS.map((tab) => {
                            const active = tab.id === activeTab;
                            return (
                                <button
                                    key={tab.id}
                                    type="button"
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`relative pb-3 text-sm font-medium transition-colors ${active ? "text-primary-dark" : "text-gray-400 hover:text-gray-600"
                                        }`}
                                >
                                    {tab.label}
                                    {active && (
                                        <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-primary-dark" />
                                    )}
                                </button>
                            );
                        })}
                    </nav>

                    <div className="mt-8">
                        {activeTab === "preferences" && <PreferencesTab />}
                        {activeTab === "notifications" && <NotificationsTab />}
                        {activeTab === "accessibility" && <AccessibilityTab />}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}