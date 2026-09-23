
import { useRef } from 'react';
import Reveal from './common/Reveal';

const Github = ({ size = 18, className = "" }: { size?: number; className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
);

const Behance = ({ size = 18, className = "" }: { size?: number; className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 1.202.992 1.99 2.188 1.99.76 0 1.39-.362 1.692-1.02l3.875.059zm-6.91-4H20.6c-.136-1.108-.896-1.83-1.97-1.83-1.136 0-1.92.76-2.006 1.83zM7.17 11.4c1.032.17 1.82.87 1.82 2.1 0 1.71-1.337 2.5-3.194 2.5H2V7.5h3.46c1.696 0 2.96.71 2.96 2.18 0 .9-.5 1.55-1.25 1.72zM4.16 9.3v1.67h1.16c.598 0 .976-.257.976-.84 0-.6-.394-.83-.973-.83H4.16zm1.285 4.9c.647 0 1.06-.28 1.06-.91 0-.618-.4-.9-1.06-.9H4.16V14.2h1.284z" />
    </svg>
);

const Folder = ({ size = 18, className = "" }: { size?: number; className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
);

const Linkedin = ({ size = 18, className = "" }: { size?: number; className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.74a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26z" />
    </svg>
);

const Instagram = ({ size = 18, className = "" }: { size?: number; className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
);

const Team = () => {
    const scrollRef = useRef<HTMLDivElement>(null);


    interface Socials {
        github?: string;
        linkedin?: string;
        instagram?: string;
    }

    interface Name {
        id: string;
        title: string;
        img: string;
        name: string;
        socials?: Socials;
    }

    const name: Name[] = [
        {
            id: 'daniel',
            title: 'Emmanuel Daniel',
            img: "/daniel.png",
            name: 'Graphics Design',
            socials: {
                linkedin: 'https://www.linkedin.com/in/emmanuel-daniel-9082b8404?utm_source=share_via&utm_content=profile&utm_medium=member_android,',
                instagram: 'https://www.instagram.com/emmadan.tech?igsi=bjZvbm9iNXFvOG0x)',
            },

        },

    ];

    const uiux: Name[] = [
        {
            id: 'alika david',
            title: 'Alika David',
            img: "/david.png",
            name: 'Product Designer',
            socials: {
                github: 'https://www.behance.net/alikadavid',
                linkedin: 'www.dribbble.com/davidalika,',
                instagram: 'www.instagram.com/thedavidalika',
            },

        },
        {
            id: 'Product Designer',
            title: 'Madumezia Ifeoma',
            img: "/ifeoma.png",
            name: 'Product Designer',
            socials: {
                github: 'www.behance.net/ifeomamadueme',
                linkedin: 'www.linkedin.com/in/madumezia-ifeoma-anwuli,',
                instagram: 'www.instagram.com/ifyveny?igsi=bHE0d2ttMDA1ZXBo',
            },

        },
        {
            id: 'Product Designer',
            title: 'Nduaguba Marcellus ',
            img: "/marcel.png",
            name: 'Product Designer',
            socials: {
                github: 'www.behance.net/nduagubamarcel,',
                linkedin: 'www.linkedin.com/in/marcellusnduaguba',
                instagram: 'www.instagram.com/creativemcn',
            },

        },
        {
            id: 'Product Designer',
            title: 'Abubakar Mahmoud',
            img: "/abubakar.jpg",
            name: 'Product Designer',
            socials: {
                github: 'www.behance.net/abubakarmahmoud',
                instagram: 'www.instagram.com/bhadboy_jav?igsi=Ymd3M2ZiZWl0d2Vj&utm_source=qr',
            },

        },

    ];

    const frontend: Name[] = [
        {
            id: 'prince-obi',
            title: 'Prince Egenti Obi',
            img: "/prince obi.png",
            name: 'Frontend Developer',
            socials: {
                github: 'https://github.com/prince-obiajulu-dev',
                linkedin: 'https://ng.linkedin.com/in/princeobiajuludev',
                instagram: 'https://princeobiajuludev.vercel.app',
            },

        },
        {
            id: 'frontend-development',
            title: 'Ejiofor Joshua Izuchukwu',
            img: "/ejifor.jpg",
            name: 'Frontend Developer',
            socials: {
                github: 'https://github.com/Joshbill-pixel',
                linkedin: 'https://www.linkedin.com/in/ejiofor-joshua-43734426b',
                instagram: 'https://my-personal-portfolio-ejiofor-joshua.vercel.app/',
            },

        },
        {
            id: 'frontend Development',
            title: ' Glory Asuquo Bassey',
            img: "/glory.jpg",
            name: 'Frontend Developer',
            socials: {
                github: 'https://github.com/glowrie5',
                instagram: 'https://dulcet-valkyrie-e564db.netlify.app/',
            },

        },
        {
            id: 'frontend Development',
            title: 'Tochukwu Joshua Ozo-Osiedo',
            img: "/toch.jpg",
            name: 'Frontend Develer',
            socials: {
                github: 'https://github.com/Tochukwu-001',
                linkedin: 'https://www.linkedin.com/in/tochukwu-ozo-osiedo',

            },

        },
        {
            id: 'frontend Development',
            title: 'Chioma Bello',
            img: "/james.jpg",
            name: 'Frontend Developer',
            socials: {
                github: 'https://github.com/sarahamos',
                linkedin: 'https://linkedin.com/in/sarahamos',
                instagram: 'https://instagram.com/sarahamos',
            },
        },

    ];

    const backend: Name[] = [
        {
            id: 'sarah-amos',
            title: 'Sarah Amos',
            img: "/james.jpg",
            name: 'Graphics Design',
            socials: {
                github: 'https://github.com/sarahamos',
                linkedin: 'https://linkedin.com/in/sarahamos',
                instagram: 'https://instagram.com/sarahamos',
            },

        },
        {
            id: 'frontend-development',
            title: 'James Okafor',
            img: "/james.jpg",
            name: 'Frontend Development',
            socials: {
                github: 'https://github.com/sarahamos',
                linkedin: 'https://linkedin.com/in/sarahamos',
                instagram: 'https://instagram.com/sarahamos',
            },

        },
        {
            id: 'backend-development',
            title: 'Ada Nwachukwu',
            img: "/james.jpg",
            name: 'Backend Development',

        },
        {
            id: 'product-management-1',
            title: 'Emeka Uche',
            img: "/james.jpg",
            name: 'Product Management',

        },
        {
            id: 'product-management-2',
            title: 'Chioma Bello',
            img: "/james.jpg",
            name: 'UI/UX Design',

        },
        {
            id: 'product-management-3',
            title: 'Tunde Adeyemi',
            img: "/james.jpg",
            name: 'Data Science',

        },
    ];

    return (
        <section className="w-full max-w-7xl mx-auto rounded-2xl bg-white px-4 sm:px-6 py-12 overflow-hidden">
            {/* Header */}
            <Reveal animation="slide-down" delay={100}>
                <div className="flex w-full items-center text-center justify-center gap-4 mb-16 md:px-5">
                    <div className="max-w-3xl">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                            The People Behind the <span className="text-primary">Project</span>
                        </h2>
                        <p className="text-sm sm:text-base text-gray-500 mt-2 leading-relaxed">
                            From the first wireframe to the final line of code, every part of Talent Faculty has been shaped by a team committed to learning, creating and building better.
                        </p>
                    </div>
                </div>
            </Reveal>

            {/* Graphics Designers */}
            <div className="mb-14">
                <Reveal animation="slide-left" delay={150}>
                    <div className="mb-5 flex items-center gap-3">
                        <span className="w-2.5 h-6 rounded-full bg-primary inline-block"></span>
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Graphics Designers</h2>
                    </div>
                </Reveal>

                <Reveal animation="slide-up" delay={250}>
                    <div
                        ref={scrollRef}
                        className="flex gap-5 overflow-x-auto scroll-smooth py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                    >
                        {name.map((path) => (
                            <article
                                key={path.id}
                                data-card
                                className="shrink-0 w-[280px] sm:w-[320px] rounded-2xl border border-gray-100 overflow-hidden shadow-xs hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer group"
                            >
                                <div className="h-[460px] w-full relative overflow-hidden bg-gray-100">
                                    <img
                                        src={path.img}
                                        alt={path.title}
                                        loading="lazy"
                                        className="w-full h-full absolute top-0 left-0 object-cover group-hover:scale-108 transition-transform duration-500"
                                    />

                                    {/* bottom gradient */}
                                    <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

                                    <div className="p-4 flex items-end justify-between absolute bottom-0 inset-x-0">
                                        <div className="flex flex-col">
                                            <h3 className="font-bold text-white text-base sm:text-lg group-hover:text-emerald-300 transition-colors">
                                                {path.title}
                                            </h3>
                                            <p className="text-xs sm:text-sm text-emerald-400 font-medium mt-0.5">
                                                {path.name}
                                            </p>
                                        </div>

                                        {path.socials && (
                                            <div className="flex items-center gap-2.5 shrink-0">
                                                {path.socials.github && (
                                                    <a
                                                        href={path.socials.github}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        onClick={(e) => e.stopPropagation()}
                                                        aria-label={`${path.title} on GitHub`}
                                                        className="text-white/80 hover:text-white hover:scale-120 transition-all p-1"
                                                    >
                                                        <Behance size={18} />
                                                    </a>
                                                )}
                                                {path.socials.linkedin && (
                                                    <a
                                                        href={path.socials.linkedin}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        onClick={(e) => e.stopPropagation()}
                                                        aria-label={`${path.title} on LinkedIn`}
                                                        className="text-white/80 hover:text-white hover:scale-120 transition-all p-1"
                                                    >
                                                        <Linkedin size={18} />
                                                    </a>
                                                )}
                                                {path.socials.instagram && (
                                                    <a
                                                        href={path.socials.instagram}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        onClick={(e) => e.stopPropagation()}
                                                        aria-label={`${path.title} on Instagram`}
                                                        className="text-white/80 hover:text-white hover:scale-120 transition-all p-1"
                                                    >
                                                        <Instagram size={18} />
                                                    </a>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </Reveal>
            </div>

            {/* UI/UX Designers */}
            <div className="mb-14">
                <Reveal animation="slide-left" delay={150}>
                    <div className="mb-5 flex items-center gap-3">
                        <span className="w-2.5 h-6 rounded-full bg-primary inline-block"></span>
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">UI/UX Designers</h2>
                    </div>
                </Reveal>

                <Reveal animation="slide-up" delay={250}>
                    <div
                        className="flex gap-5 overflow-x-auto scroll-smooth py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                    >
                        {uiux.map((path) => (
                            <article
                                key={path.id}
                                data-card
                                className="shrink-0 w-[280px] sm:w-[320px] rounded-2xl border border-gray-100 overflow-hidden shadow-xs hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer group"
                            >
                                <div className="h-[460px] w-full relative overflow-hidden bg-gray-100">
                                    <img
                                        src={path.img}
                                        alt={path.title}
                                        loading="lazy"
                                        className="w-full h-full absolute top-0 left-0 object-cover group-hover:scale-108 transition-transform duration-500"
                                    />

                                    {/* bottom gradient */}
                                    <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

                                    <div className="p-4 flex items-end justify-between absolute bottom-0 inset-x-0">
                                        <div className="flex flex-col">
                                            <h3 className="font-bold text-white text-base sm:text-lg group-hover:text-emerald-300 transition-colors">
                                                {path.title}
                                            </h3>
                                            <p className="text-xs sm:text-sm text-emerald-400 font-medium mt-0.5">
                                                {path.name}
                                            </p>
                                        </div>

                                        {path.socials && (
                                            <div className="flex items-center gap-2.5 shrink-0">
                                                {path.socials.github && (
                                                    <a
                                                        href={path.socials.github}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        onClick={(e) => e.stopPropagation()}
                                                        aria-label={`${path.title} on GitHub`}
                                                        className="text-white/80 hover:text-white hover:scale-120 transition-all p-1"
                                                    >
                                                        <Behance size={18} />
                                                    </a>
                                                )}
                                                {path.socials.linkedin && (
                                                    <a
                                                        href={path.socials.linkedin}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        onClick={(e) => e.stopPropagation()}
                                                        aria-label={`${path.title} on LinkedIn`}
                                                        className="text-white/80 hover:text-white hover:scale-120 transition-all p-1"
                                                    >
                                                        <Linkedin size={18} />
                                                    </a>
                                                )}
                                                {path.socials.instagram && (
                                                    <a
                                                        href={path.socials.instagram}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        onClick={(e) => e.stopPropagation()}
                                                        aria-label={`${path.title} on Instagram`}
                                                        className="text-white/80 hover:text-white hover:scale-120 transition-all p-1"
                                                    >
                                                        <Instagram size={18} />
                                                    </a>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </Reveal>
            </div>

            {/* Frontend Developers */}
            <div className="mb-14">
                <Reveal animation="slide-left" delay={150}>
                    <div className="mb-5 flex items-center gap-3">
                        <span className="w-2.5 h-6 rounded-full bg-primary inline-block"></span>
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Frontend Developers</h2>
                    </div>
                </Reveal>

                <Reveal animation="slide-up" delay={250}>
                    <div
                        className="flex gap-5 overflow-x-auto scroll-smooth py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                    >
                        {frontend.map((path) => (
                            <article
                                key={path.id}
                                data-card
                                className="shrink-0 w-[280px] sm:w-[320px] rounded-2xl border border-gray-100 overflow-hidden shadow-xs hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer group"
                            >
                                <div className="h-[460px] w-full relative overflow-hidden bg-gray-100">
                                    <img
                                        src={path.img}
                                        alt={path.title}
                                        loading="lazy"
                                        className="w-full h-full absolute top-0 left-0 object-cover group-hover:scale-108 transition-transform duration-500"
                                    />

                                    {/* bottom gradient */}
                                    <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

                                    <div className="p-4 flex items-end justify-between absolute bottom-0 inset-x-0">
                                        <div className="flex flex-col">
                                            <h3 className="font-bold text-white text-base sm:text-lg group-hover:text-emerald-300 transition-colors">
                                                {path.title}
                                            </h3>
                                            <p className="text-xs sm:text-sm text-emerald-400 font-medium mt-0.5">
                                                {path.name}
                                            </p>
                                        </div>

                                        {path.socials && (
                                            <div className="flex items-center gap-2.5 shrink-0">
                                                {path.socials.github && (
                                                    <a
                                                        href={path.socials.github}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        onClick={(e) => e.stopPropagation()}
                                                        aria-label={`${path.title} on GitHub`}
                                                        className="text-white/80 hover:text-white hover:scale-120 transition-all p-1"
                                                    >
                                                        <Github size={18} />
                                                    </a>
                                                )}
                                                {path.socials.linkedin && (
                                                    <a
                                                        href={path.socials.linkedin}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        onClick={(e) => e.stopPropagation()}
                                                        aria-label={`${path.title} on LinkedIn`}
                                                        className="text-white/80 hover:text-white hover:scale-120 transition-all p-1"
                                                    >
                                                        <Linkedin size={18} />
                                                    </a>
                                                )}
                                                {path.socials.instagram && (
                                                    <a
                                                        href={path.socials.instagram}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        onClick={(e) => e.stopPropagation()}
                                                        aria-label={`${path.title} on Instagram`}
                                                        className="text-white/80 hover:text-white hover:scale-120 transition-all p-1"
                                                    >
                                                        <Folder size={18} />
                                                    </a>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </Reveal>
            </div>

            {/* Backend Developers */}
            <div className="mb-14">
                <Reveal animation="slide-left" delay={150}>
                    <div className="mb-5 flex items-center gap-3">
                        <span className="w-2.5 h-6 rounded-full bg-primary inline-block"></span>
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Backend Developers</h2>
                    </div>
                </Reveal>

                <Reveal animation="slide-up" delay={250}>
                    <div
                        className="flex gap-5 overflow-x-auto scroll-smooth py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                    >
                        {backend.map((path) => (
                            <article
                                key={path.id}
                                data-card
                                className="shrink-0 w-[280px] sm:w-[320px] rounded-2xl border border-gray-100 overflow-hidden shadow-xs hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer group"
                            >
                                <div className="h-[460px] w-full relative overflow-hidden bg-gray-100">
                                    <img
                                        src={path.img}
                                        alt={path.title}
                                        loading="lazy"
                                        className="w-full h-full absolute top-0 left-0 object-cover group-hover:scale-108 transition-transform duration-500"
                                    />

                                    {/* bottom gradient */}
                                    <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

                                    <div className="p-4 flex items-end justify-between absolute bottom-0 inset-x-0">
                                        <div className="flex flex-col">
                                            <h3 className="font-bold text-white text-base sm:text-lg group-hover:text-emerald-300 transition-colors">
                                                {path.title}
                                            </h3>
                                            <p className="text-xs sm:text-sm text-emerald-400 font-medium mt-0.5">
                                                {path.name}
                                            </p>
                                        </div>

                                        {path.socials && (
                                            <div className="flex items-center gap-2.5 shrink-0">
                                                {path.socials.github && (
                                                    <a
                                                        href={path.socials.github}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        onClick={(e) => e.stopPropagation()}
                                                        aria-label={`${path.title} on GitHub`}
                                                        className="text-white/80 hover:text-white hover:scale-120 transition-all p-1"
                                                    >
                                                        <Github size={18} />
                                                    </a>
                                                )}
                                                {path.socials.linkedin && (
                                                    <a
                                                        href={path.socials.linkedin}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        onClick={(e) => e.stopPropagation()}
                                                        aria-label={`${path.title} on LinkedIn`}
                                                        className="text-white/80 hover:text-white hover:scale-120 transition-all p-1"
                                                    >
                                                        <Linkedin size={18} />
                                                    </a>
                                                )}
                                                {path.socials.instagram && (
                                                    <a
                                                        href={path.socials.instagram}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        onClick={(e) => e.stopPropagation()}
                                                        aria-label={`${path.title} on Instagram`}
                                                        className="text-white/80 hover:text-white hover:scale-120 transition-all p-1"
                                                    >
                                                        <Instagram size={18} />
                                                    </a>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </Reveal>
            </div>
        </section>
    );
};

export default Team;

