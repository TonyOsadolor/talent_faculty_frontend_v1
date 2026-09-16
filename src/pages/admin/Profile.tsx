import { useState } from "react";
import {
  Mail,
  Phone,
  CalendarDays,
  Pencil,
  Check,
  X,
} from "lucide-react";
import AdminDashboardLayout from "../../components/layout/admin/layout/AdminDashboardLayout";
import profileImage from "../../assets/profilepicture.png";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "Trueminds",
    lastName: "Innovation",
    email: "admin@trueminds.com",
    phone: "+2347040800658",
    bio: "A very passionate and dedicated teacher and motivator.",
  });

  const [savedData, setSavedData] = useState(formData);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setFormData(savedData);
    setIsEditing(false);
  };

  const handleSave = () => {
    setSavedData(formData);
    setIsEditing(false);

    // Later, this is where you can connect your API
    // to save the updated profile.
  };
  return (
    <AdminDashboardLayout>
      <div className="min-h-screen w-full bg-white">
        {/* ================= HEADER ================= */}
        <div className="flex items-start justify-between px-6 md:px-8 lg:px-9 pt-2 pb-7">
          {/* Page Title */}
          <div>
            <h1 className="text-[16px] font-semibold text-[#057834]">
              Profile
            </h1>

            <p className="mt-2 text-[13px] text-[#858585]">
              Manage your personal profile and information
            </p>
          </div>
        </div>cv

        {/* ================= MAIN CONTENT ================= */}
        <div className="px-6 md:px-8 lg:px-9 pb-10">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[200px_minmax(0,1fr)] xl:grid-cols-[200px_minmax(0,1fr)]">

            {/* =====================================================
              LEFT PROFILE CARD
          ====================================================== */}
            <div className="h-fit rounded-[12px] border border-[#e8e8e8] bg-white p-[9px]">

              {/* Card Title */}
              <h2 className="px-[1px] pt-[11px] pb-[15px] text-[16px] font-medium text-[#222]">
                Profile
              </h2>

              {/* Profile Details */}
              <div className="bg-[#f3f9f4] px-4 pt-3 pb-4">

                {/* Profile Image */}
                <div className="flex justify-center">
                  <img
                    src={profileImage}
                    alt="Trueminds Innovation"
                    className="h-[150px] w-[150px] rounded-full object-cover" />
                </div>

                {/* Name */}
                <div className="mt-3 text-center">
                  <h3 className="text-[14px] font-semibold leading-[19px] text-[#222]">
                    Trueminds
                    <br />
                    Innovation
                  </h3>

                  <p className="mt-2 text-[12px] font-medium text-[#f5a400]">
                    Super Admin
                  </p>

                  {/* Online */}
                  <div className="mt-2 flex items-center justify-center gap-1">
                    <span className="h-[8px] w-[8px] rounded-full bg-[#22c55e]" />

                    <span className="text-[11px] text-[#555]">
                      Online
                    </span>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-5 px-[4px] pt-5">

                {/* Email */}
                <div className="flex items-center gap-2">
                  <Mail
                    size={16}
                    strokeWidth={1.7}
                    className="shrink-0 text-[#111]"
                  />

                  <span className="text-[12px] text-[#222]">
                    admin@trueminds.com
                  </span>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-2">
                  <Phone
                    size={16}
                    strokeWidth={1.7}
                    className="shrink-0 text-[#111]"
                  />

                  <span className="text-[12px] text-[#222]">
                    +234 705656 346
                  </span>
                </div>

                {/* Joined */}
                <div className="flex items-center gap-2">
                  <CalendarDays
                    size={16}
                    strokeWidth={1.7}
                    className="shrink-0 text-[#111]"
                  />

                  <span className="text-[12px] text-[#222]">
                    Joined Jan 15, 2025
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-24 px-[4px] pb-[11px]">

                <p className="mb-4 text-[16px] font-medium">
                  Actions
                </p>

                {!isEditing ? (
                  <button
                    type="button"
                    onClick={handleEdit}
                    className="flex h-[35px] w-full items-center justify-center gap-2 rounded-[11px] bg-[#057834] text-[12px] font-medium text-white transition hover:bg-[#04672d]"
                  >
                    <Pencil size={15} />
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex flex-col gap-2">

                    <button
                      type="button"
                      onClick={handleSave}
                      className="flex h-[35px] w-full items-center justify-center gap-2 rounded-[11px] bg-[#057834] text-[12px] font-medium text-white transition hover:bg-[#04672d]"
                    >
                      <Check size={15} />
                      Save Changes
                    </button>

                    <button
                      type="button"
                      onClick={handleCancel}
                      className="flex h-[35px] w-full items-center justify-center gap-2 rounded-[11px] border border-[#d8d8d8] bg-white text-[12px] font-medium text-[#555] transition hover:bg-[#f7f7f7]"
                    >
                      <X size={15} />
                      Cancel
                    </button>

                  </div>
                )}
              </div>
            </div>

            {/* =====================================================
              RIGHT CONTENT
          ====================================================== */}
            <div className="min-w-0 space-y-5">

              {/* =================================================
    PERSONAL INFORMATION
================================================== */}
              <section className="rounded-[24px] border border-[#e9e9e9] bg-white px-5 py-5">

                <h2 className="mb-7 text-[18px] font-semibold text-[#111]">
                  Personal Information
                </h2>

                {/* First + Last Name */}
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                  {/* First Name */}
                  <div>
                    <label className="mb-2 block text-[15px] font-medium text-[#222]">
                      First Name
                    </label>

                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      readOnly={!isEditing}
                      className={`h-[48px] w-full rounded-[8px] border bg-white px-5 text-[15px] outline-none transition ${isEditing
                        ? "border-[#057834] text-[#222]"
                        : "border-[#d3d3d3] text-[#cfcfcf]"
                        }`}
                    />
                  </div>

                  {/* Last Name */}
                  <div>
                    <label className="mb-2 block text-[15px] font-medium text-[#222]">
                      Last Name
                    </label>

                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      readOnly={!isEditing}
                      className={`h-[48px] w-full rounded-[8px] border bg-white px-5 text-[15px] outline-none transition ${isEditing
                        ? "border-[#057834] text-[#222]"
                        : "border-[#d3d3d3] text-[#cfcfcf]"
                        }`}
                    />
                  </div>
                </div>

                {/* Email + Phone */}
                <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">

                  {/* Email */}
                  <div>
                    <label className="mb-2 block text-[15px] font-medium text-[#222]">
                      Email address
                    </label>

                    <div className="relative">
                      <Mail
                        size={17}
                        strokeWidth={1.7}
                        className="absolute left-5 top-1/2 -translate-y-1/2 text-[#cfcfcf]"
                      />

                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        readOnly={!isEditing}
                        className={`h-[48px] w-full rounded-[8px] border bg-white pl-[52px] pr-5 text-[15px] outline-none transition ${isEditing
                          ? "border-[#057834] text-[#222]"
                          : "border-[#d3d3d3] text-[#cfcfcf]"
                          }`}
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="mb-2 block text-[15px] font-medium text-[#222]">
                      Phone Number
                    </label>

                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      readOnly={!isEditing}
                      className={`h-[48px] w-full rounded-[8px] border bg-white px-5 text-[15px] outline-none transition ${isEditing
                        ? "border-[#057834] text-[#222]"
                        : "border-[#d3d3d3] text-[#cfcfcf]"
                        }`}
                    />
                  </div>
                </div>

                {/* Bio */}
                <div className="mt-5">
                  <label className="mb-2 block text-[15px] font-medium text-[#222]">
                    Bio
                  </label>

                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    readOnly={!isEditing}
                    className={`h-[155px] w-full resize-none rounded-[8px] border bg-white px-5 py-4 text-[15px] outline-none transition ${isEditing
                      ? "border-[#057834] text-[#222]"
                      : "border-[#d3d3d3] text-[#cfcfcf]"
                      }`}
                  />
                </div>

              </section>

              {/* =================================================
                ACCOUNT INFORMATION
            ================================================== */}
              <section className="rounded-[24px] border border-[#e9e9e9] bg-white px-5 py-5">

                <h2 className="mb-7 text-[18px] font-semibold text-[#111]">
                  Account Information
                </h2>

                {/* Username */}
                <div>
                  <label className="mb-2 block text-[15px] font-medium text-[#222]">
                    Username
                  </label>

                  <input
                    type="text"
                    value="truemindinno"
                    readOnly
                    className="h-[48px] w-full rounded-[8px] border border-[#d3d3d3] bg-white px-5 text-[15px] text-[#cfcfcf] outline-none"
                  />
                </div>

                {/* Role + Permissions */}
                <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">

                  {/* Role */}
                  <div>
                    <label className="mb-2 block text-[15px] font-medium text-[#222]">
                      Role
                    </label>

                    <div className="flex h-[56px] items-center rounded-[8px] border border-[#a9a9a9] px-5 text-[15px] text-[#555]">
                      Super Admin
                    </div>
                  </div>

                  {/* Permissions */}
                  <div>
                    <label className="mb-2 block text-[15px] font-medium text-[#222]">
                      Permissions
                    </label>

                    <div className="flex h-[56px] items-center rounded-[8px] border border-[#a9a9a9] px-5 text-[15px] text-[#555]">
                      All Permissions
                    </div>
                  </div>

                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </AdminDashboardLayout>

  );
};

export default Profile;