import React, { useState, useMemo } from 'react'
import { ArrowLeft, Search, SlidersHorizontal, ChevronDown } from 'lucide-react'
import PopularCourseCard from './PopularCourseCard'

export interface CourseItem {
  id: string
  title: string
  category: 'Coding' | 'Design' | 'Business' | 'Marketing' | 'Personal Development'
  bannerUrl: string
  outline: string[]
  instructor: {
    name: string
    role: string
    company: string
    avatarUrl: string
    rating: number
  }
}

const defaultCoursesList: CourseItem[] = [
  {
    id: 'graphic-design-fundamentals',
    title: 'Graphic Design Fundamentals',
    category: 'Design',
    bannerUrl: '/courses/graphic-design.jpg',
    outline: [
      'Design Principles & Visual Hierarchy',
      'Typography & Font Pairing',
      'Colour Theory',
      'Social Media & Marketing Design',
    ],
    instructor: {
      name: 'Grace Johnson',
      role: 'Senior Visual Designer',
      company: 'Canva',
      avatarUrl: '/avatars/aduname-elizabeth.png',
      rating: 4.9,
    },
  },
  {
    id: 'uiux-design-masterclass',
    title: 'UI/UX Design Masterclass',
    category: 'Design',
    bannerUrl: '/courses/uiux-masterclass.jpg',
    outline: [
      'Introduction to UX Design',
      'User Research & Personas',
      'User Flows & Information Architecture',
      'Wireframing',
    ],
    instructor: {
      name: 'Grace Johnson',
      role: 'Senior Visual Designer',
      company: 'Canva',
      avatarUrl: '/avatars/aduname-elizabeth.png',
      rating: 4.9,
    },
  },
  {
    id: 'affinity-designer-essentials',
    title: 'Affinity Designer Essentials',
    category: 'Design',
    bannerUrl: '/courses/affinity-designer.jpg',
    outline: [
      'Getting Started with Affinity Designer',
      'Vector & Raster Workflows',
      'Shapes, Paths & Curves',
      'Typography & Layout',
    ],
    instructor: {
      name: 'Grace Johnson',
      role: 'Senior Visual Designer',
      company: 'Canva',
      avatarUrl: '/avatars/aduname-elizabeth.png',
      rating: 4.9,
    },
  },
  {
    id: 'professional-video-editing',
    title: 'Professional Video Editing',
    category: 'Design',
    bannerUrl: '/courses/video-editing.jpg',
    outline: [
      'Video Editing Fundamentals',
      'Storytelling & Visual Narrative',
      'Timeline & Cutting Techniques',
      'Colour Correction & Grading',
    ],
    instructor: {
      name: 'Grace Johnson',
      role: 'Senior Visual Designer',
      company: 'Canva',
      avatarUrl: '/avatars/aduname-elizabeth.png',
      rating: 4.9,
    },
  },
  {
    id: 'fullstack-web-development',
    title: 'Fullstack Web Development with React & Node',
    category: 'Coding',
    bannerUrl: '/courses/course-1.png',
    outline: [
      'Modern JavaScript & TypeScript ES6+',
      'React Components & State Management',
      'REST APIs & Backend Architectures',
      'Database Modeling & Authentication',
    ],
    instructor: {
      name: 'Grace Johnson',
      role: 'Senior Visual Designer',
      company: 'Canva',
      avatarUrl: '/avatars/kenneth-michael.png',
      rating: 4.9,
    },
  },
  {
    id: 'digital-marketing-growth',
    title: 'Growth Marketing & Strategy Essentials',
    category: 'Marketing',
    bannerUrl: '/courses/course-2.png',
    outline: [
      'Customer Acquisition Funnels',
      'SEO & Content Strategy',
      'Paid Ads Campaign Optimization',
      'Analytics & Data-Driven Growth',
    ],
    instructor: {
      name: 'Grace Johnson',
      role: 'Senior Visual Designer',
      company: 'Canva',
      avatarUrl: '/avatars/aduname-elizabeth.png',
      rating: 4.9,
    },
  },
]

interface AllCoursesCatalogProps {
  onBack: () => void
  onEnrollCourse?: (course: CourseItem) => void
}

const categories = ['All', 'Coding', 'Design', 'Business', 'Marketing', 'Personal Development'] as const

const AllCoursesCatalog: React.FC<AllCoursesCatalogProps> = ({ onBack, onEnrollCourse }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Design')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'Most Popular' | 'Highest Rated' | 'Newest'>('Most Popular')
  const [sortOpen, setSortOpen] = useState(false)

  const filteredCourses = useMemo(() => {
    return defaultCoursesList.filter((course) => {
      const matchCategory = selectedCategory === 'All' || course.category === selectedCategory
      const matchSearch =
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.outline.some((item) => item.toLowerCase().includes(searchQuery.toLowerCase()))
      return matchCategory && matchSearch
    })
  }, [selectedCategory, searchQuery])

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Go Back button */}
      <div>
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-200 bg-white text-neutral-800 text-sm font-medium hover:bg-neutral-50 transition shadow-2xs cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span>Go back</span>
        </button>
      </div>

      {/* Header and Search/Sort controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">All Courses</h1>
          <p className="text-sm text-neutral-400 mt-1">Expand your skills. Build your future.</p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Search */}
          <div className="flex items-center bg-white border border-neutral-200 rounded-full px-4 py-2.5 w-full sm:w-80 shadow-2xs">
            <Search size={16} className="text-neutral-400 mr-2.5 shrink-0" />
            <input
              type="text"
              placeholder="Search courses, skills, or instructors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-sm text-neutral-700 placeholder-neutral-400 outline-none w-full"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setSortOpen(!sortOpen)}
              className="flex items-center justify-between gap-2.5 px-4 py-2.5 bg-white border border-neutral-200 rounded-full text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition shadow-2xs cursor-pointer w-full"
            >
              <div className="flex items-center gap-2">
                <SlidersHorizontal size={15} className="text-neutral-500" />
                <span>
                  Sort By: <span className="font-bold text-neutral-900">{sortBy}</span>
                </span>
              </div>
              <ChevronDown size={15} className="text-neutral-400" />
            </button>

            {sortOpen && (
              <>
                <div className="fixed inset-0 z-20" onClick={() => setSortOpen(false)} />
                <div className="absolute right-0 mt-2 w-48 bg-white border border-neutral-100 rounded-2xl shadow-xl py-2 z-30">
                  {(['Most Popular', 'Highest Rated', 'Newest'] as const).map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => {
                        setSortBy(option)
                        setSortOpen(false)
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm transition ${
                        sortBy === option ? 'bg-[#EBF5EE] text-[#057834] font-bold' : 'text-neutral-600 hover:bg-neutral-50'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Browse by Category */}
      <div className="pt-2">
        <h2 className="text-base font-bold text-neutral-900 mb-3">Browse by Category</h2>
        <div className="flex items-center gap-6 overflow-x-auto pb-2 scrollbar-none border-b border-neutral-100">
          {categories.map((category) => {
            const isActive = selectedCategory === category
            return (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`relative pb-3 text-sm font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  isActive ? 'text-[#057834]' : 'text-neutral-400 hover:text-neutral-700'
                }`}
              >
                {category}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#057834] rounded-full" />
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Courses Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 pt-2">
          {filteredCourses.map((course) => (
            <PopularCourseCard
              key={course.id}
              title={course.title}
              bannerUrl={course.bannerUrl}
              outline={course.outline}
              instructor={course.instructor}
              onEnroll={() => onEnrollCourse?.(course)}
            />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center bg-white rounded-3xl border border-neutral-100">
          <p className="text-base font-bold text-neutral-700">No courses found in this category</p>
          <p className="text-sm text-neutral-400 mt-1">Try searching for another skill or category.</p>
        </div>
      )}
    </div>
  )
}

export default AllCoursesCatalog
