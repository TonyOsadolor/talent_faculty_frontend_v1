import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, Globe, Eye, Plus, Save, EyeOff } from 'lucide-react'
import { DocumentText, TaskSquare } from "iconsax-react";
import CourseDetailsTab from '../../../components/common/instructor/CourseDetailsTab'
import ModulesLessonsTab from '../../../components/common/instructor/ModulesLessonsTab'

type ActivityType = "assignment" | "quiz" | "pdf" | "link" | "video" | null;

export default function ManageCourse() {

  const [isOpen, setIsOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<ActivityType>(null);

  const openModal = () => setIsOpen(true);
  const navigate = useNavigate()

  const closeModal = () => {
    setIsOpen(false);
    setSelectedType(null);
  };

  const handleContinue = () => {
    if (!selectedType) return;
    const routes: Record<Exclude<ActivityType, null>, string> = {
      assignment: "/instructor/courses/assignment",
      quiz: "/instructor/courses/quiz",
      pdf: "/instructor/courses/pdf",
      link: "/instructor/courses/link",
      video: "/instructor/courses/video",
    };
    navigate(routes[selectedType]);
    closeModal();
  };


  const [activeTab, setActiveTab] = useState('Course details')

  const tabs = ['Course details', 'Modules / lessons', 'Activities', 'Resources']

  return (
    <div className="space-y-8 max-w-[1400px] w-full mx-auto">
      <button
        onClick={() => navigate('/instructor/courses')}
        className="flex items-center gap-2 text-sm font-bold text-gray-900 hover:text-emerald-700 transition-colors"
      >
        <ChevronLeft size={18} />
        Back to Courses
      </button>

          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            <div className="space-y-3 flex-1">
              <div className="flex items-center gap-4">
                <h1 className="text-2xl font-bold text-gray-900">UX Research Fundamentals</h1>
                <div className="flex items-center gap-1.5 px-3 py-1 bg-white border border-emerald-500 rounded-full text-xs font-bold text-emerald-600">
                  <Globe size={14} />
                  Published
                </div>
              </div>
              <p className="text-[15px] text-gray-400">
                Master the core methods of UX research from user interviews to usability testing.
              </p>

              <div className="flex flex-wrap items-center gap-6 text-xs text-gray-400 font-medium">
                <span>10 modules</span>
                <span>36 lessons</span>
                <span>36/36 Published</span>
                <span>updated just now</span>
              </div>

              <div className="flex items-center gap-4 pt-2">
                <div className="h-2 flex-1 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-700 rounded-full w-[93%]" />
                </div>
                <span className="text-xs font-bold text-gray-500 whitespace-nowrap">93% saved</span>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0 max-md:flex-col">
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors max-md:w-full max-md:justify-center">
                <Eye size={16} />
                Preview Course
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors max-md:w-full max-md:justify-center">
                <Save size={16} />
                Save changes
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-orange-50 rounded-lg border border-orange-100 text-sm font-bold text-orange-400 hover:bg-orange-100 transition-colors max-md:w-full max-md:justify-center">
                <EyeOff size={16} />
                Unpublish
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-gray-50 p-1.5 rounded-full md:w-max mt-4 max-md:overflow-x-auto max-md:w-full">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap shrink-0 px-6 py-2.5 rounded-full text-[13px] font-semibold transition-all duration-200 ${activeTab === tab
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === 'Course details' && <CourseDetailsTab />}

          {activeTab === 'Modules / lessons' && <ModulesLessonsTab />}

          {activeTab === 'Activities' && (
            <div className="py-12 text-center text-gray-400 font-medium text-sm">
              <div
                onClick={openModal}
                className="rounded-[20px] border-2 border-dashed border-primary p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50 hover:border-purple-300 transition-colors min-h-[320px]"
              >
                <div className="w-14 h-14 rounded-full bg-primary-light text-primary flex items-center justify-center mb-4 transition-transform hover:scale-105">
                  <Plus size={24} />
                </div>
                <span className="font-bold text-[15px] text-gray-800">
                  Create Activity
                </span>
              </div>

              {/* Modal overlay */}
              {isOpen && (
                <div
                  className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px] px-4"
                  onClick={closeModal}
                >
                  <div
                    className="bg-white rounded-[24px] shadow-xl w-full max-w-xl px-8 py-12"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <h2 className="text-xl font-bold text-gray-900 text-center mb-1">
                      Create an Activity
                    </h2>
                    <p className="text-sm text-black text-center mb-6">
                      Choose an activity type to assess learner progress.
                    </p>

                    <div className="flex flex-col gap-3 mb-6">
                      {/* Assignment option */}
                      <button
                        type="button"
                        onClick={() => setSelectedType("assignment")}
                        className={`flex items-start gap-3 rounded-2xl border p-4 text-left transition-colors ${selectedType === "assignment"
                          ? "border-green-600 bg-green-50/50"
                          : "border-gray-200 hover:border-gray-300"
                          }`}
                      >
                        <div className="w-9 h-9 rounded-lg bg-orange-50 text-orange-500 flex items-center justify-center shrink-0">
                          <DocumentText color='black' size={18} />
                        </div>
                        <div>
                          <p className="font-semibold text-[14px] text-gray-900">
                            Assignment
                          </p>
                          <p className="text-[13px] text-gray-500">
                            Evaluate practical skills through tasks and projects.
                          </p>
                        </div>
                      </button>

                      {/* Quiz option */}
                      <button
                        type="button"
                        onClick={() => setSelectedType("quiz")}
                        className={`flex items-start gap-3 rounded-2xl border p-4 text-left transition-colors ${selectedType === "quiz"
                          ? "border-green-600 bg-green-50/50"
                          : "border-gray-200 hover:border-gray-300"
                          }`}
                      >
                        <div className="w-9 h-9 rounded-lg bg-teal-50 text-teal-500 flex items-center justify-center shrink-0">
                          <TaskSquare color='black' size={18} />
                        </div>
                        <div>
                          <p className="font-semibold text-[14px] text-gray-900">
                            Quiz
                          </p>
                          <p className="text-[13px] text-gray-500">
                            Assess knowledge with timed or untimed quizzes.
                          </p>
                        </div>
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={handleContinue}
                      disabled={!selectedType}
                      className={`w-full rounded-xl py-3 font-semibold text-[14px] text-white transition-colors mb-3 ${selectedType
                        ? "bg-[#0F833C] hover:bg-primary-dark"
                        : "bg-[#0F833C] cursor-not-allowed"
                        }`}
                    >
                      Continue
                    </button>

                    <button
                      type="button"
                      onClick={closeModal}
                      className="w-full text-center text-[13px] font-medium text-gray-500 hover:text-gray-700"
                    >
                      Back to Courses
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'Resources' && (
            <div className="py-12 text-center text-gray-400 font-medium text-sm">
              <div
                onClick={openModal}
                className="rounded-[20px] border-2 border-dashed border-primary p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50 hover:border-primary transition-colors min-h-[320px]"
              >
                <div className="w-14 h-14 rounded-full bg-primary-light text-primary flex items-center justify-center mb-4 transition-transform hover:scale-105">
                  <Plus size={24} />
                </div>
                <span className="font-bold text-[15px] text-gray-800">
                  Create Resources
                </span>
              </div>

              {/* Modal overlay */}
              {isOpen && (
                <div
                  className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px] px-4"
                  onClick={closeModal}
                >
                  <div
                    className="bg-white rounded-[24px] shadow-xl w-full max-w-xl px-8 py-12"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <h2 className="text-xl font-bold text-gray-900 text-center mb-1">
                      Add Resource
                    </h2>
                    <p className="text-sm text-black text-center mb-6">
                      Choose the type of  resource you want to add to this course.
                    </p>

                    <div className="flex flex-col gap-3 mb-6">
                      {/* pdf option */}
                      <button
                        type="button"
                        onClick={() => setSelectedType("pdf")}
                        className={`flex items-start gap-3 rounded-2xl border p-4 text-left transition-colors ${selectedType === "pdf"
                          ? "border-green-600 bg-green-50/50"
                          : "border-gray-200 hover:border-gray-300"
                          }`}
                      >
                        <div className="w-9 h-9 rounded-lg bg-orange-50 text-orange-500 flex items-center justify-center shrink-0">
                          <DocumentText color='black' size={18} />
                        </div>
                        <div>
                          <p className="font-semibold text-[14px] text-gray-900">
                            PDF
                          </p>
                          <p className="text-[13px] text-gray-500">
                            Upload a document
                          </p>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedType("link")}
                        className={`flex items-start gap-3 rounded-2xl border p-4 text-left transition-colors ${selectedType === "link"
                          ? "border-green-600 bg-green-50/50"
                          : "border-gray-200 hover:border-gray-300"
                          }`}
                      >
                        <div className="w-9 h-9 rounded-lg bg-orange-50 text-orange-500 flex items-center justify-center shrink-0">
                          <DocumentText color='black' size={18} />
                        </div>
                        <div>
                          <p className="font-semibold text-[14px] text-gray-900">
                            Link
                          </p>
                          <p className="text-[13px] text-gray-500">
                            Add an external link
                          </p>
                        </div>
                      </button>

                      {/* Video option */}
                      <button
                        type="button"
                        onClick={() => setSelectedType("video")}
                        className={`flex items-start gap-3 rounded-2xl border p-4 text-left transition-colors ${selectedType === "video"
                          ? "border-green-600 bg-green-50/50"
                          : "border-gray-200 hover:border-gray-300"
                          }`}
                      >
                        <div className="w-9 h-9 rounded-lg bg-teal-50 text-teal-500 flex items-center justify-center shrink-0">
                          <TaskSquare color='black' size={18} />
                        </div>
                        <div>
                          <p className="font-semibold text-[14px] text-gray-900">
                            Additional Video
                          </p>
                          <p className="text-[13px] text-gray-500">
                            Add a video resource
                          </p>
                        </div>
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={handleContinue}
                      disabled={!selectedType}
                      className={`w-full rounded-xl py-3 font-semibold text-[14px] text-white transition-colors mb-3 ${selectedType
                        ? "bg-[#0F833C] hover:bg-primary-dark"
                        : "bg-[#0F833C] cursor-not-allowed"
                        }`}
                    >
                      Continue
                    </button>

                    <button
                      type="button"
                      onClick={closeModal}
                      className="w-full text-center text-[13px] font-medium text-gray-500 hover:text-gray-700"
                    >
                      Back to Courses
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
    </div>
  )
}