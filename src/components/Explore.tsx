
import { useRef, useState, useEffect } from 'react';
import { ArrowLeft2, ArrowRight2, ArrowRight } from 'iconsax-react';
import Reveal from './common/Reveal';

const LearningPaths = () => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    interface LearningPath {
        id: string;
        title: string;
        image: string;
        courses: number;
        projects: number;
    }

    const learningPaths: LearningPath[] = [
        {
            id: 'product-design',
            title: 'Product Design',
            image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=400&q=80',
            courses: 8,
            projects: 12,
        },
        {
            id: 'frontend-development',
            title: 'Frontend Development',
            image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=400&q=80',
            courses: 10,
            projects: 15,
        },
        {
            id: 'backend-development',
            title: 'Backend Development',
            image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&q=80',
            courses: 8,
            projects: 14,
        },
        {
            id: 'product-management',
            title: 'Product Management',
            image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=400&q=80',
            courses: 6,
            projects: 10,
        },
        {
            id: 'data-analytics',
            title: 'Data & Analytics',
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80',
            courses: 7,
            projects: 11,
        },
    ];

    const steps = [
        {
            id: 0,
            number: '01',
            title: "Sign Up",
            description: "Create your account in seconds and set up your learning goals.",
            animation: "slide-right" as const
        },
        {
            id: 1,
            number: '02',
            title: "Join the Program",
            description: "Choose your preferred learning path guided by expert tutors.",
            animation: "slide-up" as const
        },
        {
            id: 2,
            number: '03',
            title: "Learn & Build",
            description: "Complete lessons, real-world assignments, and collaborative projects.",
            animation: "slide-up" as const
        },
        {
            id: 3,
            number: '04',
            title: "Graduate",
            description: "Receive your certificate and portfolio-ready experience.",
            animation: "slide-left" as const
        },
    ];

    const updateScrollState = () => {
        const el = scrollRef.current;
        if (!el) return;
        setCanScrollLeft(el.scrollLeft > 4);
        setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
    };

    useEffect(() => {
        updateScrollState();
        const el = scrollRef.current;
        if (!el) return;
        el.addEventListener('scroll', updateScrollState);
        window.addEventListener('resize', updateScrollState);
        return () => {
            el.removeEventListener('scroll', updateScrollState);
            window.removeEventListener('resize', updateScrollState);
        };
    }, []);

    const scrollByCard = (direction: 'left' | 'right') => {
        const el = scrollRef.current;
        if (!el) return;
        const card = el.querySelector<HTMLElement>('[data-card]');
        const step = card ? card.offsetWidth + 16 : el.clientWidth * 0.8;
        el.scrollBy({ left: direction === 'left' ? -step : step, behavior: 'smooth' });
    };

    return (
        <section id="Explore" className="w-full max-w-7xl mx-auto rounded-2xl bg-white px-4 sm:px-8 py-10 overflow-hidden">
            {/* Header */}
            <Reveal animation="slide-down" delay={100}>
                <div className="flex items-start justify-between gap-4 mb-8">
                    <div>
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                            Explore Learning Paths
                        </h2>
                        <p className="text-base text-gray-500 mt-1">
                            Choose the path that aligns with your career goals.
                        </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                        <button
                            type="button"
                            onClick={() => scrollByCard('left')}
                            disabled={!canScrollLeft}
                            aria-label="Scroll to previous learning paths"
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-400 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-200 hover:text-gray-700 transition cursor-pointer"
                        >
                            <ArrowLeft2 size={18} color='#555555' variant="Linear" />
                        </button>
                        <button
                            type="button"
                            onClick={() => scrollByCard('right')}
                            disabled={!canScrollRight}
                            aria-label="Scroll to next learning paths"
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-primary text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary-dark transition cursor-pointer"
                        >
                            <ArrowRight2 size={18} color='#f1f5f9' variant="Linear" />
                        </button>
                    </div>
                </div>
            </Reveal>

            {/* Cards Scroll Track */}
            <Reveal animation="slide-up" delay={200}>
                <div
                    ref={scrollRef}
                    className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory mb-16 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden py-2"
                >
                    {learningPaths.map((path) => (
                        <article
                            key={path.id}
                            data-card
                            className="snap-start shrink-0 w-[240px] sm:w-[280px] rounded-2xl border border-gray-100 bg-white overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer group"
                        >
                            <div className="h-36 w-full overflow-hidden bg-gray-100">
                                <img
                                    src={path.image}
                                    alt={path.title}
                                    loading="lazy"
                                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="font-bold text-gray-900 text-base group-hover:text-primary transition-colors">
                                    {path.title}
                                </h3>
                                <p className="text-xs text-gray-500 mt-1.5 flex items-center gap-2">
                                    <span>{path.courses} Courses</span>
                                    <span className="text-gray-300">•</span>
                                    <span>{path.projects} Projects</span>
                                </p>
                            </div>
                        </article>
                    ))}
                </div>
            </Reveal>

            {/* 4 Steps Section */}
            <div className="pt-6">
                <Reveal animation="slide-down" delay={100}>
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                            Your Learning Journey, <span className="text-primary">Four Steps</span>
                        </h2>
                        <p className="text-gray-500 text-sm sm:text-base mt-2">
                            A structured, proven path from your first lesson to industry-ready mastery.
                        </p>
                    </div>
                </Reveal>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                    {steps.map((work, idx) => (
                        <Reveal
                            key={work.id}
                            animation={work.animation}
                            delay={idx * 150}
                            className="h-full"
                        >
                            <div className="group relative bg-[#057834]/5 hover:bg-[#057834]/10 rounded-3xl p-7 border border-[#057834]/10 hover:border-[#057834]/30 transition-all duration-300 hover:-translate-y-2 cursor-pointer h-full flex flex-col justify-between">
                                <div>
                                    <span className="inline-block text-2xl font-black text-primary mb-4 bg-white/80 px-3 py-1 rounded-xl shadow-2xs">
                                        {work.number}
                                    </span>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                                        {work.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        {work.description}
                                    </p>
                                </div>
                                <div className="flex items-center justify-end mt-5 pt-3 border-t border-[#057834]/10">
                                    <ArrowRight size={18} className="text-gray-400 group-hover:text-primary group-hover:translate-x-1.5 transition-all" />
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LearningPaths;
