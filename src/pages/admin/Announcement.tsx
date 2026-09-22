import { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Search,
  ChevronDown,
  Megaphone,
  BookOpen,
  AlertTriangle,
  UsersRound,
  CalendarDays,
  Pencil,
  Archive,
  Trash2,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Link as LinkIcon,
  Upload,
  Bell,
  Mail,
  ArrowLeft,
  X,
} from "lucide-react";

import AdminDashboardLayout from "../../components/layout/admin/layout/AdminDashboardLayout";

type AnnouncementStatus =
  | "Published"
  | "Scheduled"
  | "Draft"
  | "Archived";

type Announcement = {
  icon: typeof BookOpen;
  iconBg: string;
  iconColor: string;
  title: string;
  description: string;
  priority: "High" | "Medium" | "Low";
  audience: string;
  recipients: string;
  status: AnnouncementStatus;
  date: string;
  time: string;
};

const announcements: Announcement[] = [
  {
    icon: BookOpen,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
    title: "New Course: Advanced React Development",
    description: "We are excited to launch a new course..",
    priority: "High",
    audience: "All Users",
    recipients: "2,345 recipients",
    status: "Published",
    date: "12/08/2026",
    time: "10:12 am",
  },
  {
    icon: AlertTriangle,
    iconBg: "bg-red-50",
    iconColor: "text-red-400",
    title: "Important: Security Update",
    description:
      "As part of our commitment to security we have..",
    priority: "Medium",
    audience: "All Learners",
    recipients: "2,000 recipients",
    status: "Scheduled",
    date: "02/09/2026",
    time: "10:12 am",
  },
  {
    icon: UsersRound,
    iconBg: "bg-green-50",
    iconColor: "text-green-500",
    title: "New Cohort: Cohort 3 Batch C",
    description:
      "We are excited to launch a new cohort soon..",
    priority: "Low",
    audience: "All Instructors",
    recipients: "200 recipients",
    status: "Draft",
    date: "10/09/2026",
    time: "10:12 am",
  },
  {
    icon: BookOpen,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
    title:
      "Course Completion Certificate now avail..",
    description:
      "Learners can now download the course...",
    priority: "High",
    audience: "All Admins",
    recipients: "20 recipients",
    status: "Archived",
    date: "17/03/2026",
    time: "10:12 am",
  },
  {
    icon: CalendarDays,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-400",
    title: "Webinar: Linkedin Optimization",
    description:
      "Join us for an exclusive webinar on Linkedin....",
    priority: "Medium",
    audience: "All Learners",
    recipients: "2,000 recipients",
    status: "Scheduled",
    date: "19/08/2026",
    time: "10:12 am",
  },
  {
    icon: Megaphone,
    iconBg: "bg-gray-100",
    iconColor: "text-gray-500",
    title: "Maintenance Downtime Notice",
    description:
      "Please note that the LMS will be under maintena...",
    priority: "Low",
    audience: "All Users",
    recipients: "2,345 recipients",
    status: "Published",
    date: "15/04/2026",
    time: "10:12 am",
  },
];

const tabs = [
  "All Announcements",
  "Published",
  "Scheduled",
  "Drafts",
  "Archived",
] as const;

type AnnouncementTab = (typeof tabs)[number];

const priorityStyles = {
  High: "bg-red-100 text-red-500",
  Medium: "bg-orange-100 text-orange-500",
  Low: "bg-blue-100 text-blue-500",
};

const statusStyles = {
  Published: "bg-green-100 text-green-600",
  Scheduled: "bg-blue-100 text-blue-500",
  Draft: "bg-orange-100 text-orange-500",
  Archived: "bg-red-100 text-red-500",
};


function getDisplayedStatus(
  item: Announcement,
  activeTab: AnnouncementTab
): AnnouncementStatus {
  if (activeTab === "All Announcements") {
    return item.status;
  }

  switch (activeTab) {
    case "Published":
      return "Published";

    case "Scheduled":
      return "Scheduled";

    case "Drafts":
      return "Draft";

    case "Archived":
      return "Archived";

    default:
      return item.status;
  }
}

export default function Announcements() {
  const location = useLocation();
  const [activeTab, setActiveTab] =
    useState<AnnouncementTab>("All Announcements");

  const [selected, setSelected] = useState<number[]>([]);

  const [editingAnnouncement, setEditingAnnouncement] =
    useState<Announcement | null>(null);

  const [creatingAnnouncement, setCreatingAnnouncement] =
    useState((location.state as { create?: boolean } | null)?.create === true);

  const [showArchiveModal, setShowArchiveModal] =
    useState(false);

  const [announcementToArchive, setAnnouncementToArchive] =
    useState<Announcement | null>(null);

  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  const [announcementToDelete, setAnnouncementToDelete] =
    useState<Announcement | null>(null);

  const [showEditSuccess, setShowEditSuccess] =
    useState(false);

  /* ==========================================
     EDIT
  ========================================== */

  const handleEditClick = (item: Announcement) => {
    setEditingAnnouncement(item);
    setShowEditSuccess(false);
  };

  const handleBackToAnnouncements = () => {
    setEditingAnnouncement(null);
    setShowEditSuccess(false);
  };

  /* ==========================================
     CREATE
  ========================================== */

  const handleCreateAnnouncement = () => {
    setCreatingAnnouncement(true);
  };

  /* ==========================================
     ARCHIVE
  ========================================== */

  const handleArchiveClick = (item: Announcement) => {
    setAnnouncementToArchive(item);
    setShowArchiveModal(true);
  };

  const handleArchiveConfirm = () => {
    if (!announcementToArchive) return;

    // Backend archive action goes here.

    setShowArchiveModal(false);
    setAnnouncementToArchive(null);
  };

  const handleArchiveCancel = () => {
    setShowArchiveModal(false);
    setAnnouncementToArchive(null);
  };

  /* ==========================================
     DELETE
  ========================================== */

  const handleDeleteClick = (item: Announcement) => {
    setAnnouncementToDelete(item);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    if (!announcementToDelete) return;

    // Backend delete action goes here.

    setShowDeleteModal(false);
    setAnnouncementToDelete(null);
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setAnnouncementToDelete(null);
  };

  /* ==========================================
     CREATE PAGE
  ========================================== */

  if (creatingAnnouncement) {
    return (
      <CreateAnnouncementPage
        onBack={() => setCreatingAnnouncement(false)}
      />
    );
  }

  /* ==========================================
     EDIT PAGE
  ========================================== */

  if (editingAnnouncement) {
    return (
      <EditAnnouncementPage
        announcement={editingAnnouncement}
        onBack={handleBackToAnnouncements}
        onSaved={() => setShowEditSuccess(true)}
        showSuccess={showEditSuccess}
      />
    );
  }

  return (
    <AdminDashboardLayout>
      <div className="min-w-0 w-full bg-white">

        {/* ======================================
            HEADER
        ====================================== */}

        <div
          className="
            flex
            flex-col
            gap-4
            sm:flex-row
            sm:items-start
            sm:justify-between
          "
        >
          <div className="min-w-0">
            <h1 className="text-[17px] font-semibold text-[#087b38]">
              Announcements
            </h1>

            <p className="mt-[7px] text-[12px] text-[#888]">
              Create and manage announcements
            </p>
          </div>

          <div
            className="
              flex
              w-full
              flex-wrap
              items-center
              gap-3
              sm:w-auto
              sm:gap-[24px]
            "
          >
          
          

            <button
              type="button"
              onClick={handleCreateAnnouncement}
              className="
                flex
                h-[45px]
                flex-1
                items-center
                justify-center
                gap-[10px]
                rounded-[11px]
                bg-[#07863d]
                px-[14px]
                text-[14px]
                font-semibold
                text-white
                sm:flex-none
                sm:text-[15px]
              "
            >
              <Megaphone size={17} strokeWidth={1.8} />
              Create Announcement
            </button>
          </div>
        </div>

        {/* ======================================
            TABS
        ====================================== */}

        <div
          className="
            mt-[30px]
            flex
            h-[43px]
            items-start
            gap-6
            overflow-x-auto
            sm:mt-[40px]
            sm:gap-10
          "
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => {
             
                setActiveTab(tab);
                setSelected([]);
              }}
              className={`
                relative
                h-[43px]
                shrink-0
                whitespace-nowrap
                text-[14px]
                font-semibold
                sm:text-[15px]
                ${
                  activeTab === tab
                    ? "text-[#075f2c]"
                    : "text-[#888]"
                }
              `}
            >
              {tab}

              {activeTab === tab && (
                <span
                  className="
                    absolute
                    bottom-0
                    left-0
                    h-[1px]
                    w-full
                    bg-[#087b38]
                  "
                />
              )}
            </button>
          ))}
        </div>

        {/* ======================================
            FILTERS
        ====================================== */}

        <div
          className="
            mt-[25px]
            flex
            flex-wrap
            items-center
            gap-3
            sm:mt-[33px]
            sm:gap-[23px]
          "
        >
          <div
            className="
              flex
              h-[40px]
              w-full
              items-center
              rounded-full
              bg-[#f4f4f4]
              px-[14px]
              sm:w-[269px]
            "
          >
            <Search
              size={16}
              strokeWidth={1.8}
              className="mr-[10px] shrink-0 text-gray-500"
            />

            <input
              type="text"
              placeholder="Search users, courses or lessons..."
              className="
                w-full
                min-w-0
                bg-transparent
                text-[12px]
                outline-none
                placeholder:text-[#888]
              "
            />
          </div>

          <FilterButton label="All Types" />
          <FilterButton label="All Audiences" />
          <FilterButton label="All Priorities" />
          <FilterButton label="All Time" />

          <button
            type="button"
            className="
              flex
              h-[40px]
              items-center
              justify-center
              gap-[8px]
              rounded-[10px]
              border
              border-[#eeeeee]
              bg-white
              px-[12px]
              text-[13px]
              text-[#777]
            "
          >
            Clear filter
            <SlidersHorizontal
              size={15}
              strokeWidth={1.7}
            />
          </button>
        </div>

        {/* ======================================
            TABLE
        ====================================== */}

        <div className="mt-[33px] w-full overflow-x-auto">
          <div className="min-w-[970px]">

            {/* TABLE HEADER */}

            <div
              className="
                grid
                h-[60px]
                grid-cols-[50px_minmax(300px,1fr)_115px_120px_105px_100px_90px]
                items-center
                bg-[#f3f3f3]
              "
            >
              <div className="flex justify-center">
                <button
                  type="button"
                  aria-label="Select all announcements"
                  onClick={() =>
                    setSelected(
                      selected.length === announcements.length
                        ? []
                        : announcements.map((_, i) => i)
                    )
                  }
                  className={`
                    h-[16px]
                    w-[16px]
                    ${
                      selected.length === announcements.length
                        ? "bg-[#087b38]"
                        : "bg-[#dedede]"
                    }
                  `}
                />
              </div>

              <div className="text-[14px] font-semibold text-[#222]">
                Announcements
              </div>

              <div className="text-[14px] font-semibold text-[#222]">
                Priority
              </div>

              <div className="text-[14px] font-semibold text-[#222]">
                Audience
              </div>

              <div className="text-[14px] font-semibold text-[#222]">
                Status
              </div>

              <div className="text-[14px] font-semibold text-[#222]">
                Published
              </div>

              <div className="text-[14px] font-semibold text-[#222]">
                Actions
              </div>
            </div>

            {/* ======================================
                ALL SIX ROWS ALWAYS RENDER
            ====================================== */}

            {announcements.map((item, index) => {
              const Icon = item.icon;

             
              const displayedStatus = getDisplayedStatus(
                item,
                activeTab
              );

              return (
                <div
                  key={index}
                  className="
                    grid
                    min-h-[72px]
                    grid-cols-[50px_minmax(300px,1fr)_115px_120px_105px_100px_90px]
                    items-center
                    border-b
                    border-[#ededed]
                  "
                >
                  {/* CHECKBOX */}

                  <div className="flex justify-center">
                    <button
                      type="button"
                      aria-label={`Select ${item.title}`}
                      onClick={() =>
                        setSelected((prev) =>
                          prev.includes(index)
                            ? prev.filter(
                                (i) => i !== index
                              )
                            : [...prev, index]
                        )
                      }
                      className={`
                        h-[16px]
                        w-[16px]
                        ${
                          selected.includes(index)
                            ? "bg-[#087b38]"
                            : "bg-[#dedede]"
                        }
                      `}
                    />
                  </div>

                  {/* ANNOUNCEMENT */}

                  <div className="flex min-w-0 items-center gap-[11px] pr-3">
                    <div
                      className={`
                        flex
                        h-[44px]
                        w-[44px]
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        ${item.iconBg}
                      `}
                    >
                      <Icon
                        size={20}
                        strokeWidth={1.5}
                        className={item.iconColor}
                      />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-[14px] font-semibold text-[#222]">
                        {item.title}
                      </p>

                      <p className="mt-[2px] truncate text-[12px] text-[#777]">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* PRIORITY */}

                  <div>
                    <span
                      className={`
                        inline-flex
                        h-[40px]
                        min-w-[98px]
                        items-center
                        justify-center
                        rounded-full
                        px-[17px]
                        text-[13px]
                        font-medium
                        ${priorityStyles[item.priority]}
                      `}
                    >
                      {item.priority}
                    </span>
                  </div>

                  {/* AUDIENCE */}

                  <div className="leading-[17px]">
                    <p className="text-[13px] font-semibold text-[#222]">
                      {item.audience}
                    </p>

                    <p className="text-[12px] text-[#777]">
                      {item.recipients}
                    </p>
                  </div>
 

                  <div>
                    <span
                      className={`
                        inline-flex
                        h-[40px]
                        min-w-[97px]
                        items-center
                        justify-center
                        rounded-full
                        px-[15px]
                        text-[13px]
                        font-medium
                        ${statusStyles[displayedStatus]}
                      `}
                    >
                      {displayedStatus}
                    </span>
                  </div>

                  {/* DATE */}

                  <div className="leading-[17px]">
                    <p className="text-[13px] font-medium text-[#222]">
                      {item.date}
                    </p>

                    <p className="text-[11px] text-[#777]">
                      {item.time}
                    </p>
                  </div>

                  {/* ACTIONS */}

                  <div className="flex items-center gap-[12px]">

                    {/* EDIT */}

                    <button
                      type="button"
                      onClick={() => handleEditClick(item)}
                      className="
                        text-[#3784ff]
                        transition-transform
                        hover:scale-110
                      "
                      aria-label="Edit announcement"
                    >
                      <Pencil
                        size={17}
                        strokeWidth={1.7}
                      />
                    </button>

                    {/* ARCHIVE */}

                    <button
                      type="button"
                      onClick={() =>
                        handleArchiveClick(item)
                      }
                      className="
                        text-[#f6a51b]
                        transition-transform
                        hover:scale-110
                      "
                      aria-label="Archive announcement"
                    >
                      <Archive
                        size={17}
                        strokeWidth={1.7}
                      />
                    </button>

                    {/* DELETE */}

                    <button
                      type="button"
                      onClick={() =>
                        handleDeleteClick(item)
                      }
                      className="
                        text-[#ff4545]
                        transition-transform
                        hover:scale-110
                      "
                      aria-label="Delete announcement"
                    >
                      <Trash2
                        size={17}
                        strokeWidth={1.7}
                      />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ======================================
            FOOTER
        ====================================== */}

        <div
          className="
            flex
            flex-col
            gap-4
            py-[25px]
            sm:flex-row
            sm:items-center
            sm:justify-between
            sm:py-[31px]
          "
        >
          <p className="text-[13px] text-[#777]">
            Showing 1 to 6 of 100 Announcements
          </p>

          <div className="flex flex-wrap items-center gap-2">
            <PaginationButton>
              <ChevronLeft size={16} />
            </PaginationButton>

            <PaginationButton active>
              1
            </PaginationButton>

            <PaginationButton>2</PaginationButton>
            <PaginationButton>3</PaginationButton>

            <PaginationButton>
              <ChevronRight size={16} />
            </PaginationButton>

            <PaginationButton>10</PaginationButton>

            <button
              type="button"
              className="
                flex
                h-[32px]
                items-center
                gap-[8px]
                rounded-[8px]
                border
                border-[#d4d4d4]
                bg-white
                px-[10px]
                text-[12px]
                text-[#333]
              "
            >
              Last page
              <ChevronDown size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* ======================================
          ARCHIVE MODAL
      ====================================== */}

      {showArchiveModal && (
        <ConfirmationModal
          type="archive"
          onConfirm={handleArchiveConfirm}
          onCancel={handleArchiveCancel}
        />
      )}

      {/* ======================================
          DELETE MODAL
      ====================================== */}

      {showDeleteModal && (
        <ConfirmationModal
          type="delete"
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      )}
    </AdminDashboardLayout>
  );
}

/* =====================================================
   CREATE ANNOUNCEMENT PAGE
===================================================== */

function CreateAnnouncementPage({
  onBack,
}: {
  onBack: () => void;
}) {
  const [title, setTitle] = useState(
    "New Course: Advanced React Development"
  );

  const [message, setMessage] = useState(
    "We are Pleased to announce the creation of a newcourse in web development, Advanced React Development. This course will go a long way in strengthening"
  );

  const [priority, setPriority] =
    useState<Announcement["priority"]>("High");

  const [audience, setAudience] =
    useState("All Users");

  const [selectedUser, setSelectedUser] =
    useState("");

  const [selectedCohort, setSelectedCohort] =
    useState("");

  const [selectedCourse, setSelectedCourse] =
    useState("");

  const [publishDate, setPublishDate] =
    useState("August 12, 2026");

  const [publishTime, setPublishTime] =
    useState("10:00");

  const [inAppNotification, setInAppNotification] =
    useState(true);

  const [emailNotification, setEmailNotification] =
    useState(true);

  const [successType, setSuccessType] =
    useState<"created" | "saved" | null>(null);

  const handleCreate = () => {
    // Backend create action goes here.
    setSuccessType("created");
  };

  const handleSaveForLater = () => {
    // Backend draft/save action goes here.
    setSuccessType("saved");
  };

  const handleBackToDashboard = () => {
    setSuccessType(null);
    onBack();
  };

  const handleViewAnnouncement = () => {
    setSuccessType(null);
    onBack();
  };

  const handleContinueEditing = () => {
    setSuccessType(null);
  };

  return (
    <AdminDashboardLayout>
      <div className="w-full min-w-0 bg-white">

        {/* HEADER */}

        <div className="flex items-start gap-4">
          <button
            type="button"
            onClick={onBack}
            aria-label="Back to announcements"
            className="
              mt-[2px]
              flex
              h-[38px]
              w-[38px]
              shrink-0
              items-center
              justify-center
              rounded-full
              border
              border-[#e5e5e5]
              bg-white
              text-[#555]
              transition
              hover:bg-[#f5f5f5]
            "
          >
            <ArrowLeft size={17} />
          </button>

          <div>
            <h1 className="text-[20px] font-semibold text-[#087b38]">
              Create Announcement
            </h1>

            <p className="mt-[7px] text-[12px] text-[#888]">
              Create a new announcement to inform and engage users in the platform
            </p>

            <div className="mt-[25px] flex items-center gap-[17px] text-[14px]">
              <button
                type="button"
                onClick={onBack}
                className="font-semibold text-[#087b38]"
              >
                Announcements
              </button>

              <ChevronRight
                size={18}
                className="text-[#333]"
              />

              <span className="font-semibold text-[#333]">
                Create Announcements
              </span>
            </div>
          </div>
        </div>

        {/* MAIN FORM */}

        <div
          className="
            mt-[35px]
            grid
            grid-cols-1
            gap-[25px]
            xl:grid-cols-[minmax(0,1.35fr)_minmax(360px,1fr)]
          "
        >
          {/* DETAILS */}

          <section
            className="
              rounded-[12px]
              border
              border-[#eeeeee]
              bg-white
              p-[25px]
              shadow-[0_1px_3px_rgba(0,0,0,0.03)]
            "
          >
            <SectionTitle number="1">
              Announcement Details
            </SectionTitle>

            <div className="mt-[28px] space-y-[23px]">

              <div>
                <label
                  htmlFor="create-announcement-title"
                  className="mb-[9px] block text-[13px] font-medium text-[#333]"
                >
                  Title <span className="text-[#ff6b6b]">*</span>
                </label>

                <input
                  id="create-announcement-title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="
                    block
                    w-full
                    rounded-[9px]
                    border
                    border-[#dcdcdc]
                    bg-white
                    px-[15px]
                    py-[13px]
                    text-[13px]
                    text-[#333]
                    outline-none
                    focus:border-[#087b38]
                    focus:ring-1
                    focus:ring-[#087b38]
                  "
                />
              </div>

              <div>
                <label
                  htmlFor="create-announcement-message"
                  className="mb-[9px] block text-[13px] font-medium text-[#333]"
                >
                  Message <span className="text-[#ff6b6b]">*</span>
                </label>

                <textarea
                  id="create-announcement-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={6}
                  className="
                    block
                    w-full
                    resize-y
                    rounded-[9px]
                    border
                    border-[#dcdcdc]
                    bg-white
                    px-[15px]
                    py-[13px]
                    text-[13px]
                    leading-[21px]
                    text-[#333]
                    outline-none
                    focus:border-[#087b38]
                    focus:ring-1
                    focus:ring-[#087b38]
                  "
                />
              </div>

              <div>
                <label className="mb-[9px] block text-[13px] font-medium text-[#333]">
                  Attachments (optional)
                </label>

                <div
                  className="
                    flex
                    h-[138px]
                    flex-col
                    items-center
                    justify-center
                    rounded-[9px]
                    border
                    border-dashed
                    border-[#d3d3d3]
                    bg-white
                  "
                >
                  <Upload
                    size={20}
                    strokeWidth={1.5}
                    className="text-[#61bc87]"
                  />

                  <span className="mt-[10px] text-[11px] text-[#d0d0d0]">
                    Click to Upload or drag and drop PNG, Pdf, PPT, Docx, XLS JPG or SVG (max. 10mb)
                  </span>
                </div>
              </div>

              <div>
                <label className="mb-[9px] block text-[13px] font-medium text-[#333]">
                  Add a link
                </label>

                <div
                  className="
                    flex
                    h-[43px]
                    items-center
                    gap-[12px]
                    rounded-[9px]
                    border
                    border-[#dcdcdc]
                    px-[15px]
                  "
                >
                  <LinkIcon
                    size={16}
                    className="text-[#777]"
                  />

                  <input
                    type="url"
                    placeholder="www.truemindsinnovations.com"
                    className="
                      w-full
                      bg-transparent
                      text-[13px]
                      outline-none
                      placeholder:text-[#d5d5d5]
                    "
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="create-announcement-priority"
                  className="mb-[9px] block text-[13px] font-medium text-[#333]"
                >
                  Priority
                </label>

                <select
                  id="create-announcement-priority"
                  value={priority}
                  onChange={(e) =>
                    setPriority(
                      e.target.value as Announcement["priority"]
                    )
                  }
                  className="
                    block
                    w-full
                    rounded-[9px]
                    border
                    border-[#dcdcdc]
                    bg-white
                    px-[15px]
                    py-[13px]
                    text-[13px]
                    text-[#333]
                    outline-none
                    focus:border-[#087b38]
                    focus:ring-1
                    focus:ring-[#087b38]
                  "
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            </div>
          </section>

          {/* RIGHT COLUMN */}

          <div className="flex min-w-0 flex-col gap-[25px]">

            {/* AUDIENCE */}

            <section
              className="
                rounded-[12px]
                border
                border-[#eeeeee]
                bg-white
                p-[25px]
              "
            >
              <SectionTitle number="2">
                Audience and Visibility
              </SectionTitle>

              <div className="mt-[28px] space-y-[15px]">
                {[
                  "All Users",
                  "Specific Users",
                  "Specific Cohorts",
                  "Specific Courses",
                ].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setAudience(item)}
                    className="flex items-center gap-[10px] text-left"
                  >
                    <span
                      className={`
                        flex
                        h-[15px]
                        w-[15px]
                        items-center
                        justify-center
                        rounded-[2px]
                        border
                        ${
                          audience === item
                            ? "border-[#087b38] bg-[#087b38]"
                            : "border-[#999] bg-white"
                        }
                      `}
                    >
                      {audience === item && (
                        <span className="text-[11px] font-bold text-white">
                          ✓
                        </span>
                      )}
                    </span>

                    <span className="text-[13px] text-[#444]">
                      {item}
                    </span>
                  </button>
                ))}
              </div>

              <div className="mt-[22px] space-y-[17px]">
                <CreateSelect
                  label="Select Users"
                  value={selectedUser}
                  onChange={setSelectedUser}
                  options={[
                    "Select User",
                    "Instructor",
                    "Learner",
                    "Admin",
                  ]}
                />

                <CreateSelect
                  label="Select Cohorts"
                  value={selectedCohort}
                  onChange={setSelectedCohort}
                  options={[
                    "Search and select",
                    "Cohort 1",
                    "Cohort 2",
                    "Cohort 3",
                  ]}
                />

                <CreateSelect
                  label="Select Courses"
                  value={selectedCourse}
                  onChange={setSelectedCourse}
                  options={[
                    "Search and select",
                    "Advanced React Development",
                    "Web Development",
                    "UI/UX Design",
                  ]}
                />
              </div>
            </section>

            {/* PUBLISHING */}

            <section
              className="
                rounded-[12px]
                border
                border-[#eeeeee]
                bg-white
                p-[25px]
              "
            >
              <SectionTitle number="3">
                Publishing Settings
              </SectionTitle>

              <div className="mt-[28px] space-y-[19px]">

                <div>
                  <label
                    htmlFor="create-publish-date"
                    className="mb-[9px] block text-[13px] font-medium text-[#333]"
                  >
                    Publish Date
                  </label>

                  <input
                    id="create-publish-date"
                    type="text"
                    value={publishDate}
                    onChange={(e) =>
                      setPublishDate(e.target.value)
                    }
                    className="
                      block
                      h-[43px]
                      w-full
                      rounded-[9px]
                      border
                      border-[#dcdcdc]
                      bg-white
                      px-[15px]
                      text-[13px]
                      text-[#333]
                      outline-none
                      focus:border-[#087b38]
                    "
                  />
                </div>

                <div>
                  <label
                    htmlFor="create-publish-time"
                    className="mb-[9px] block text-[13px] font-medium text-[#333]"
                  >
                    Publish Time
                  </label>

                  <input
                    id="create-publish-time"
                    type="time"
                    value={publishTime}
                    onChange={(e) =>
                      setPublishTime(e.target.value)
                    }
                    className="
                      block
                      h-[43px]
                      w-full
                      rounded-[9px]
                      border
                      border-[#dcdcdc]
                      bg-white
                      px-[15px]
                      text-[13px]
                      text-[#333]
                      outline-none
                      focus:border-[#087b38]
                    "
                  />
                </div>

                <div className="space-y-[18px]">
                  <NotificationToggle
                    icon={<Bell size={18} />}
                    title="Send in-app notification"
                    description="Show notification in users dashboard"
                    enabled={inAppNotification}
                    onChange={() =>
                      setInAppNotification(
                        (previous) => !previous
                      )
                    }
                  />

                  <NotificationToggle
                    icon={<Mail size={18} />}
                    title="Send email Notification"
                    description="Send email to selected audience"
                    enabled={emailNotification}
                    onChange={() =>
                      setEmailNotification(
                        (previous) => !previous
                      )
                    }
                  />
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* ACTION BUTTONS */}

        {!successType && (
          <div
            className="
              mt-[25px]
              flex
              flex-col-reverse
              gap-[13px]
              border-t
              border-[#eeeeee]
              pt-[25px]
              sm:flex-row
              sm:justify-end
            "
          >
            <button
              type="button"
              onClick={onBack}
              className="
                h-[45px]
                rounded-[9px]
                px-[30px]
                text-[14px]
                font-semibold
                text-[#222]
                transition
                hover:text-[#087b38]
              "
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSaveForLater}
              className="
                h-[45px]
                rounded-[9px]
                border
                border-[#222]
                bg-white
                px-[30px]
                text-[14px]
                font-semibold
                text-[#222]
                transition
                hover:bg-[#f7f7f7]
              "
            >
              Save for Later
            </button>

            <button
              type="button"
              onClick={handleCreate}
              className="
                flex
                h-[45px]
                items-center
                justify-center
                gap-[8px]
                rounded-[9px]
                bg-[#087b38]
                px-[30px]
                text-[14px]
                font-semibold
                text-white
                transition
                hover:bg-[#066b30]
              "
            >
              <Megaphone size={16} />
              Create Announcement
            </button>
          </div>
        )}
      </div>

      {/* SUCCESS MODAL */}

      {successType && (
        <CreateSuccessModal
          type={successType}
          onBackToDashboard={handleBackToDashboard}
          onViewAnnouncement={handleViewAnnouncement}
          onContinueEditing={handleContinueEditing}
        />
      )}
    </AdminDashboardLayout>
  );
}

/* =====================================================
   CREATE SELECT
===================================================== */

function CreateSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <div>
      <label className="mb-[9px] block text-[13px] font-medium text-[#333]">
        {label}
      </label>

      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="
            block
            h-[43px]
            w-full
            appearance-none
            rounded-[9px]
            border
            border-[#dcdcdc]
            bg-white
            px-[15px]
            text-[13px]
            text-[#555]
            outline-none
            focus:border-[#087b38]
            focus:ring-1
            focus:ring-[#087b38]
          "
        >
          {options.map((option, index) => (
            <option
              key={option}
              value={index === 0 ? "" : option}
            >
              {option}
            </option>
          ))}
        </select>

        <ChevronDown
          size={15}
          className="
            pointer-events-none
            absolute
            right-[14px]
            top-1/2
            -translate-y-1/2
            text-[#333]
          "
        />
      </div>
    </div>
  );
}

/* =====================================================
   CREATE SUCCESS MODAL
===================================================== */

function CreateSuccessModal({
  type,
  onBackToDashboard,
  onViewAnnouncement,
  onContinueEditing,
}: {
  type: "created" | "saved";
  onBackToDashboard: () => void;
  onViewAnnouncement: () => void;
  onContinueEditing: () => void;
}) {
  const created = type === "created";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/45 px-[20px]">
      <div className="w-full max-w-[540px] rounded-[20px] bg-white px-[40px] py-[48px] shadow-2xl sm:px-[60px]">

        <div className="flex justify-center">
          <div className="flex h-[76px] w-[76px] items-center justify-center rounded-full border-[2px] border-[#087b38]">
            <CheckSuccessIcon />
          </div>
        </div>

        <h2
          className="
            mt-[30px]
            text-center
            text-[30px]
            font-bold
            tracking-[-0.7px]
            text-[#222]
            sm:text-[34px]
          "
        >
          {created
            ? "Announcement Created"
            : "Announcement Saved"}
        </h2>

        <p
          className="
            mx-auto
            mt-[24px]
            max-w-[420px]
            text-center
            text-[16px]
            leading-[23px]
            text-[#888]
          "
        >
          {created ? (
            <>
              The new announcement has been created and can be managed from the announcement page.
            </>
          ) : (
            <>
              The new announcement has been saved as draft and can be managed from the announcement page.
            </>
          )}
        </p>

        <div
          className="
            mt-[40px]
            flex
            flex-col
            gap-[12px]
            sm:flex-row
            sm:justify-center
            sm:gap-[20px]
          "
        >
          <button
            type="button"
            onClick={onBackToDashboard}
            className="
              h-[52px]
              rounded-[9px]
              border
              border-[#d4d4d4]
              bg-white
              px-[22px]
              text-[14px]
              font-semibold
              text-[#222]
              transition
              hover:bg-[#f7f7f7]
              sm:min-w-[180px]
            "
          >
            Back to dashboard
          </button>

          {created ? (
            <button
              type="button"
              onClick={onViewAnnouncement}
              className="
                h-[52px]
                rounded-[9px]
                bg-[#087b38]
                px-[22px]
                text-[14px]
                font-semibold
                text-white
                transition
                hover:bg-[#066b30]
                sm:min-w-[180px]
              "
            >
              View Announcement
            </button>
          ) : (
            <button
              type="button"
              onClick={onContinueEditing}
              className="
                h-[52px]
                rounded-[9px]
                bg-[#087b38]
                px-[22px]
                text-[14px]
                font-semibold
                text-white
                transition
                hover:bg-[#066b30]
                sm:min-w-[180px]
              "
            >
              Continue Editing
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* =====================================================
   CHECK SUCCESS ICON
===================================================== */

function CheckSuccessIcon() {
  return (
    <svg
      width="42"
      height="42"
      viewBox="0 0 42 42"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M10 21.5L17.2 28.5L32 13.5"
        stroke="#087b38"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* =====================================================
   EDIT ANNOUNCEMENT PAGE
===================================================== */

function EditAnnouncementPage({
  announcement,
  onBack,
  onSaved,
  showSuccess,
}: {
  announcement: Announcement;
  onBack: () => void;
  onSaved: () => void;
  showSuccess: boolean;
}) {
  const [title, setTitle] =
    useState(announcement.title);

  const [message, setMessage] =
    useState(announcement.description);

  const [priority, setPriority] =
    useState<Announcement["priority"]>(
      announcement.priority
    );

  const [audience, setAudience] =
    useState(announcement.audience);

  const [publishDate, setPublishDate] =
    useState(announcement.date);

  const [publishTime, setPublishTime] =
    useState("10:12");

  const [inAppNotification, setInAppNotification] =
    useState(true);

  const [emailNotification, setEmailNotification] =
    useState(true);

  return (
    <AdminDashboardLayout>
      <div className="w-full min-w-0 bg-white">

        {/* HEADER */}

        <div className="flex items-start gap-4">
          <button
            type="button"
            onClick={onBack}
            aria-label="Back to announcements"
            className="
              mt-[2px]
              flex
              h-[38px]
              w-[38px]
              shrink-0
              items-center
              justify-center
              rounded-full
              border
              border-[#e5e5e5]
              bg-white
              text-[#555]
              transition
              hover:bg-[#f5f5f5]
            "
          >
            <ArrowLeft size={17} />
          </button>

          <div>
            <h1 className="text-[20px] font-semibold text-[#087b38]">
              Edit Announcement
            </h1>

            <div className="mt-[7px] flex items-center gap-2 text-[12px]">
              <button
                type="button"
                onClick={onBack}
                className="text-[#888] hover:text-[#087b38]"
              >
                Announcements
              </button>

              <span className="text-[#aaa]">/</span>

              <span className="text-[#333]">
                Edit Announcements
              </span>
            </div>
          </div>
        </div>

        {/* SUCCESS MESSAGE */}

        {showSuccess && (
          <div
            className="
              mt-[25px]
              flex
              items-center
              justify-between
              rounded-[10px]
              border
              border-green-200
              bg-green-50
              px-[18px]
              py-[14px]
              text-[13px]
              text-[#087b38]
            "
          >
            <span>
              Announcement changes saved successfully
            </span>

            <button
              type="button"
              onClick={onBack}
              aria-label="Close success message"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* MAIN FORM */}

        <div
          className="
            mt-[35px]
            grid
            grid-cols-1
            gap-[25px]
            xl:grid-cols-[minmax(0,1.35fr)_minmax(360px,1fr)]
          "
        >
          {/* DETAILS */}

          <section
            className="
              rounded-[12px]
              border
              border-[#eeeeee]
              bg-white
              p-[25px]
              shadow-[0_1px_3px_rgba(0,0,0,0.03)]
            "
          >
            <SectionTitle number="1">
              Announcement Details
            </SectionTitle>

            <div className="mt-[28px] space-y-[23px]">

              <div>
                <label
                  htmlFor="edit-announcement-title"
                  className="mb-[9px] block text-[13px] font-medium text-[#333]"
                >
                  Title
                </label>

                <input
                  id="edit-announcement-title"
                  type="text"
                  value={title}
                  onChange={(e) =>
                    setTitle(e.target.value)
                  }
                  autoComplete="off"
                  className="
                    block
                    w-full
                    rounded-[9px]
                    border
                    border-[#dcdcdc]
                    bg-white
                    px-[15px]
                    py-[13px]
                    text-[13px]
                    text-[#333]
                    outline-none
                    transition
                    focus:border-[#087b38]
                    focus:ring-1
                    focus:ring-[#087b38]
                  "
                  placeholder="Enter announcement title"
                />
              </div>

              <div>
                <label
                  htmlFor="edit-announcement-message"
                  className="mb-[9px] block text-[13px] font-medium text-[#333]"
                >
                  Message
                </label>

                <textarea
                  id="edit-announcement-message"
                  value={message}
                  onChange={(e) =>
                    setMessage(e.target.value)
                  }
                  rows={9}
                  className="
                    block
                    w-full
                    resize-y
                    rounded-[9px]
                    border
                    border-[#dcdcdc]
                    bg-white
                    px-[15px]
                    py-[13px]
                    text-[13px]
                    leading-[21px]
                    text-[#333]
                    outline-none
                    transition
                    focus:border-[#087b38]
                    focus:ring-1
                    focus:ring-[#087b38]
                  "
                  placeholder="Write your announcement..."
                />
              </div>

              <div>
                <label className="mb-[9px] block text-[13px] font-medium text-[#333]">
                  Attachments
                </label>

                <div
                  className="
                    flex
                    min-h-[100px]
                    w-full
                    items-center
                    justify-center
                    rounded-[9px]
                    border
                    border-dashed
                    border-[#cfcfcf]
                    bg-[#fafafa]
                  "
                >
                  <button
                    type="button"
                    className="
                      flex
                      items-center
                      gap-[9px]
                      text-[13px]
                      font-medium
                      text-[#087b38]
                    "
                  >
                    <Upload size={17} />
                    Upload attachment
                  </button>
                </div>
              </div>

              <button
                type="button"
                className="
                  flex
                  items-center
                  gap-[8px]
                  text-[13px]
                  font-medium
                  text-[#087b38]
                "
              >
                <LinkIcon size={16} />
                Add a link
              </button>

              <div>
                <label
                  htmlFor="edit-announcement-priority"
                  className="mb-[9px] block text-[13px] font-medium text-[#333]"
                >
                  Priority
                </label>

                <select
                  id="edit-announcement-priority"
                  value={priority}
                  onChange={(e) =>
                    setPriority(
                      e.target.value as Announcement["priority"]
                    )
                  }
                  className="
                    block
                    w-full
                    rounded-[9px]
                    border
                    border-[#dcdcdc]
                    bg-white
                    px-[15px]
                    py-[13px]
                    text-[13px]
                    text-[#333]
                    outline-none
                    focus:border-[#087b38]
                    focus:ring-1
                    focus:ring-[#087b38]
                  "
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            </div>
          </section>

          {/* RIGHT COLUMN */}

          <div className="flex min-w-0 flex-col gap-[25px]">

            {/* AUDIENCE */}

            <section
              className="
                rounded-[12px]
                border
                border-[#eeeeee]
                bg-white
                p-[25px]
                shadow-[0_1px_3px_rgba(0,0,0,0.03)]
              "
            >
              <SectionTitle number="2">
                Audience and Visibility
              </SectionTitle>

              <div className="mt-[25px]">
                <p className="text-[13px] font-medium text-[#333]">
                  Who should receive this announcement?
                </p>

                <div className="mt-[15px] grid grid-cols-1 gap-[10px]">
                  <AudienceOption
                    label="All Users"
                    selected={audience === "All Users"}
                    onClick={() =>
                      setAudience("All Users")
                    }
                  />

                  <AudienceOption
                    label="Specific Users"
                    selected={
                      audience === "Specific Users"
                    }
                    onClick={() =>
                      setAudience("Specific Users")
                    }
                  />

                  <AudienceOption
                    label="Specific Cohorts"
                    selected={
                      audience === "Specific Cohorts"
                    }
                    onClick={() =>
                      setAudience("Specific Cohorts")
                    }
                  />

                  <AudienceOption
                    label="Specific Courses"
                    selected={
                      audience === "Specific Courses"
                    }
                    onClick={() =>
                      setAudience("Specific Courses")
                    }
                  />
                </div>

                <div className="mt-[23px] space-y-[18px]">
                  <div>
                    <label
                      htmlFor="edit-select-cohort"
                      className="mb-[8px] block text-[12px] font-medium text-[#444]"
                    >
                      Select Cohort
                    </label>

                    <select
                      id="edit-select-cohort"
                      className="
                        block
                        w-full
                        rounded-[9px]
                        border
                        border-[#dcdcdc]
                        bg-white
                        px-[13px]
                        py-[12px]
                        text-[13px]
                        text-[#555]
                        outline-none
                        focus:border-[#087b38]
                        focus:ring-1
                        focus:ring-[#087b38]
                      "
                    >
                      <option>Select cohort</option>
                      <option>Cohort 1</option>
                      <option>Cohort 2</option>
                      <option>Cohort 3</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="edit-select-course"
                      className="mb-[8px] block text-[12px] font-medium text-[#444]"
                    >
                      Select Course
                    </label>

                    <select
                      id="edit-select-course"
                      className="
                        block
                        w-full
                        rounded-[9px]
                        border
                        border-[#dcdcdc]
                        bg-white
                        px-[13px]
                        py-[12px]
                        text-[13px]
                        text-[#555]
                        outline-none
                        focus:border-[#087b38]
                        focus:ring-1
                        focus:ring-[#087b38]
                      "
                    >
                      <option>Select course</option>
                      <option>
                        Advanced React Development
                      </option>
                      <option>Web Development</option>
                      <option>UI/UX Design</option>
                    </select>
                  </div>
                </div>
              </div>
            </section>

            {/* PUBLISHING */}

            <section
              className="
                rounded-[12px]
                border
                border-[#eeeeee]
                bg-white
                p-[25px]
                shadow-[0_1px_3px_rgba(0,0,0,0.03)]
              "
            >
              <SectionTitle number="3">
                Publishing Settings
              </SectionTitle>

              <div className="mt-[25px] grid gap-[18px] sm:grid-cols-2">

                <div>
                  <label
                    htmlFor="edit-publish-date"
                    className="mb-[8px] block text-[12px] font-medium text-[#444]"
                  >
                    Publish Date
                  </label>

                  <input
                    id="edit-publish-date"
                    type="text"
                    value={publishDate}
                    onChange={(e) =>
                      setPublishDate(e.target.value)
                    }
                    className="
                      block
                      w-full
                      rounded-[9px]
                      border
                      border-[#dcdcdc]
                      bg-white
                      px-[13px]
                      py-[12px]
                      text-[13px]
                      text-[#333]
                      outline-none
                      focus:border-[#087b38]
                      focus:ring-1
                      focus:ring-[#087b38]
                    "
                  />
                </div>

                <div>
                  <label
                    htmlFor="edit-publish-time"
                    className="mb-[8px] block text-[12px] font-medium text-[#444]"
                  >
                    Publish Time
                  </label>

                  <input
                    id="edit-publish-time"
                    type="time"
                    value={publishTime}
                    onChange={(e) =>
                      setPublishTime(e.target.value)
                    }
                    className="
                      block
                      w-full
                      rounded-[9px]
                      border
                      border-[#dcdcdc]
                      bg-white
                      px-[13px]
                      py-[12px]
                      text-[13px]
                      text-[#333]
                      outline-none
                      focus:border-[#087b38]
                      focus:ring-1
                      focus:ring-[#087b38]
                    "
                  />
                </div>
              </div>

              <div className="mt-[25px] space-y-[12px]">
                <p className="text-[13px] font-medium text-[#333]">
                  Notifications
                </p>

                <NotificationToggle
                  icon={<Bell size={18} />}
                  title="In-app notification"
                  description="Notify users inside the platform"
                  enabled={inAppNotification}
                  onChange={() =>
                    setInAppNotification(
                      (previous) => !previous
                    )
                  }
                />

                <NotificationToggle
                  icon={<Mail size={18} />}
                  title="Email notification"
                  description="Send this announcement through email"
                  enabled={emailNotification}
                  onChange={() =>
                    setEmailNotification(
                      (previous) => !previous
                    )
                  }
                />
              </div>
            </section>
          </div>
        </div>

        {/* ACTION BUTTONS */}

        {!showSuccess && (
          <div
            className="
              mt-[25px]
              flex
              flex-col-reverse
              gap-[13px]
              border-t
              border-[#eeeeee]
              pt-[25px]
              sm:flex-row
              sm:justify-end
            "
          >
            <button
              type="button"
              onClick={onBack}
              className="
                h-[45px]
                rounded-[9px]
                border
                border-[#d4d4d4]
                bg-white
                px-[30px]
                text-[14px]
                font-semibold
                text-[#444]
                transition
                hover:bg-[#f7f7f7]
              "
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={onSaved}
              className="
                h-[45px]
                rounded-[9px]
                bg-[#087b38]
                px-[30px]
                text-[14px]
                font-semibold
                text-white
                transition
                hover:bg-[#066b30]
              "
            >
              Save Changes
            </button>
          </div>
        )}

        {showSuccess && (
          <div className="mt-[20px] flex justify-end">
            <button
              type="button"
              onClick={onBack}
              className="
                flex
                items-center
                gap-[8px]
                text-[13px]
                font-medium
                text-[#087b38]
              "
            >
              <ArrowLeft size={15} />
              Back to Announcements
            </button>
          </div>
        )}
      </div>
    </AdminDashboardLayout>
  );
}

/* =====================================================
   SECTION TITLE
===================================================== */

function SectionTitle({
  number,
  children,
}: {
  number: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-[12px]">
      <div
        className="
          flex
          h-[30px]
          w-[30px]
          items-center
          justify-center
          rounded-full
          bg-[#087b38]
          text-[13px]
          font-semibold
          text-white
        "
      >
        {number}
      </div>

      <h2 className="text-[17px] font-semibold text-[#222]">
        {children}
      </h2>
    </div>
  );
}

/* =====================================================
   AUDIENCE OPTION
===================================================== */

function AudienceOption({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex
        h-[55px]
        items-center
        gap-[12px]
        rounded-[9px]
        border
        px-[15px]
        text-left
        transition
        ${
          selected
            ? "border-[#087b38] bg-[#f2faf5]"
            : "border-[#dddddd] bg-white"
        }
      `}
    >
      <span
        className={`
          flex
          h-[18px]
          w-[18px]
          items-center
          justify-center
          rounded-full
          border
          ${
            selected
              ? "border-[#087b38]"
              : "border-[#aaa]"
          }
        `}
      >
        {selected && (
          <span className="h-[9px] w-[9px] rounded-full bg-[#087b38]" />
        )}
      </span>

      <span className="text-[13px] font-medium text-[#333]">
        {label}
      </span>
    </button>
  );
}

/* =====================================================
   NOTIFICATION TOGGLE
===================================================== */

function NotificationToggle({
  icon,
  title,
  description,
  enabled,
  onChange,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  enabled: boolean;
  onChange: () => void;
}) {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        rounded-[10px]
        border
        border-[#eeeeee]
        px-[16px]
        py-[14px]
      "
    >
      <div className="flex items-center gap-[12px]">
        <div className="text-[#087b38]">
          {icon}
        </div>

        <div>
          <p className="text-[13px] font-semibold text-[#333]">
            {title}
          </p>

          <p className="mt-[2px] text-[11px] text-[#888]">
            {description}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onChange}
        aria-label={`Toggle ${title}`}
        className={`
          relative
          h-[24px]
          w-[43px]
          rounded-full
          transition
          ${
            enabled
              ? "bg-[#087b38]"
              : "bg-[#d5d5d5]"
          }
        `}
      >
        <span
          className={`
            absolute
            top-[3px]
            h-[18px]
            w-[18px]
            rounded-full
            bg-white
            shadow-sm
            transition-all
            ${
              enabled
                ? "left-[22px]"
                : "left-[3px]"
            }
          `}
        />
      </button>
    </div>
  );
}

/* =====================================================
   CONFIRMATION MODAL
===================================================== */

function ConfirmationModal({
  type,
  onConfirm,
  onCancel,
}: {
  type: "archive" | "delete";
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const isDelete = type === "delete";

  return (
    <div
      className="
        fixed
        inset-0
        z-[100]
        flex
        items-center
        justify-center
        bg-black/40
        px-4
      "
    >
      <div
        className="
          w-full
          max-w-[600px]
          rounded-[24px]
          bg-white
          px-[35px]
          py-[42px]
          shadow-2xl
          sm:px-[60px]
          sm:py-[50px]
        "
      >
        <div className="flex justify-center">
          {isDelete ? (
            <svg
              width="70"
              height="84"
              viewBox="0 0 70 84"
              fill="none"
            >
              <path
                d="
                  M32.5 7
                  L5 55
                  C2.5 59.5 5.8 65 11 65
                  H59
                  C64.2 65 67.5 59.5 65 55
                  L37.5 7
                  C36.4 5.1 33.6 5.1 32.5 7Z
                "
                stroke="#FF4A4A"
                strokeWidth="1.2"
                fill="white"
              />

              <path
                d="M35 25V43"
                stroke="#FF4A4A"
                strokeWidth="1.2"
                strokeLinecap="round"
              />

              <circle
                cx="35"
                cy="52"
                r="1.4"
                fill="#FF4A4A"
              />
            </svg>
          ) : (
            <svg
              width="70"
              height="84"
              viewBox="0 0 70 84"
              fill="none"
            >
              <path
                d="
                  M35 3
                  C35 3 18 16 5 17
                  V38
                  C5 57 16 72 35 81
                  C54 72 65 57 65 38
                  V17
                  C52 16 35 3 35 3Z
                "
                stroke="#FF4A4A"
                strokeWidth="1.2"
                fill="white"
              />

              <path
                d="
                  M28 30
                  C29 25 33 22 39 22
                  C46 22 51 26 51 32
                  C51 38 47 41 42 44
                  C38 46 36 48 36 53
                "
                stroke="#FF4A4A"
                strokeWidth="1.2"
                strokeLinecap="round"
              />

              <circle
                cx="36"
                cy="62"
                r="1.3"
                fill="#FF4A4A"
              />
            </svg>
          )}
        </div>

        <h2
          className="
            mt-[20px]
            text-center
            text-[34px]
            font-black
            leading-none
            tracking-[-1px]
            text-[#222]
            sm:text-[38px]
          "
        >
          Are You Sure?
        </h2>

        <p
          className="
            mx-auto
            mt-[28px]
            max-w-[430px]
            text-center
            text-[16px]
            leading-[24px]
            text-[#888]
            sm:text-[17px]
          "
        >
          {isDelete ? (
            <>
              You are about to permanently delete
              <br />
              announcement. Deleted items cannot be
              <br />
              recovered!
            </>
          ) : (
            <>
              You are about to archive the announcements.
              <br />
              Archived items can be recovered!
            </>
          )}
        </p>

        <div
          className="
            mt-[45px]
            flex
            flex-col
            gap-[16px]
            sm:flex-row
            sm:justify-center
            sm:gap-[32px]
          "
        >
          <button
            type="button"
            onClick={onConfirm}
            className="
              h-[62px]
              w-full
              rounded-[10px]
              border
              border-[#cfcfcf]
              bg-white
              px-[25px]
              text-[16px]
              font-semibold
              text-[#222]
              transition
              hover:bg-[#f7f7f7]
              sm:w-[200px]
            "
          >
            {isDelete
              ? "Yes, Delete!"
              : "Yes, Archive!"}
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="
              h-[62px]
              w-full
              rounded-[10px]
              bg-[#087b38]
              px-[25px]
              text-[16px]
              font-semibold
              text-white
              transition
              hover:bg-[#066b30]
              sm:w-[200px]
            "
          >
            No, Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

/* =====================================================
   FILTER BUTTON
===================================================== */

function FilterButton({
  label,
}: {
  label: string;
}) {
  return (
    <button
      type="button"
      className="
        flex
        h-[40px]
        min-w-[113px]
        flex-1
        items-center
        justify-between
        gap-[18px]
        rounded-[10px]
        border
        border-[#eeeeee]
        bg-white
        px-[12px]
        text-[13px]
        text-[#777]
        sm:flex-none
      "
    >
      {label}

      <ChevronDown
        size={15}
        strokeWidth={1.7}
      />
    </button>
  );
}

/* =====================================================
   PAGINATION BUTTON
===================================================== */

function PaginationButton({
  children,
  active = false,
}: {
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      className={`
        flex
        h-[32px]
        min-w-[32px]
        items-center
        justify-center
        rounded-[8px]
        border
        bg-white
        text-[12px]
        ${
          active
            ? "border-[#73a9ff] text-[#3985ff]"
            : "border-[#d4d4d4] text-[#333]"
        }
      `}
    >
      {children}
     </button>
  );
}