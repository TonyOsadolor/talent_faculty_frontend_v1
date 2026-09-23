import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    ChevronLeft,
    Plus,
    MoreVertical,
    GripVertical,
    Trash2,
    Copy,
    Check,
} from "lucide-react";


type QuestionType = "mcq" | "truefalse" | "short";

interface Option {
    id: string;
    text: string;
}

interface Question {
    id: string;
    type: QuestionType;
    text: string;
    points: number;
    options: Option[];
    correctOptionId: string | null;
}

type Step = "settings" | "questions";

let uid = 0;
const nextId = () => `id-${uid++}`;

const TYPE_LABEL: Record<QuestionType, string> = {
    mcq: "Multiple choice",
    truefalse: "True | False",
    short: "Short answer",
};


function Toggle({
    checked,
    onChange,
}: {
    checked: boolean;
    onChange: (v: boolean) => void;
}) {
    return (
        <button
            type="button"
            onClick={() => onChange(!checked)}
            className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${checked ? "bg-green-600" : "bg-gray-300"
                }`}
        >
            <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${checked ? "translate-x-6" : "translate-x-1"
                    }`}
            />
        </button>
    );
}

export default function QuizBuilder() {


    const navigate = useNavigate();

    const [step, setStep] = useState<Step>("settings");

    // Step 1 Ã¢â‚¬â€ quiz settings
    const [quizTitle, setQuizTitle] = useState("");
    const [quizDescription, setQuizDescription] = useState("");
    const [duration, setDuration] = useState("");
    const [passingScore, setPassingScore] = useState("");
    const [attempts, setAttempts] = useState("");
    const [showResult, setShowResult] = useState(true);
    const [allowReview, setAllowReview] = useState(true);

    // Step 2 Ã¢â‚¬â€ questions
    const [questions, setQuestions] = useState<Question[]>([]);
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);

    const handleBack = () => {
        if (step === "questions") {
            setStep("settings");
        } else {
            navigate("/instructor/courses/1");
        }
    };

    const handleContinue = () => {
        setStep("questions");
    };

    const addQuestion = (type: QuestionType) => {
        const base: Question = {
            id: nextId(),
            type,
            text: "",
            points: 1,
            options:
                type === "mcq"
                    ? [
                        { id: nextId(), text: "" },
                        { id: nextId(), text: "" },
                    ]
                    : type === "truefalse"
                        ? [
                            { id: "true", text: "True" },
                            { id: "false", text: "False" },
                        ]
                        : [],
            correctOptionId: null,
        };
        setQuestions((prev) => [...prev, base]);
        setExpandedId(base.id);
    };

    const updateQuestion = (id: string, patch: Partial<Question>) => {
        setQuestions((prev) => prev.map((q) => (q.id === id ? { ...q, ...patch } : q)));
    };

    const updateOptionText = (qId: string, optId: string, text: string) => {
        setQuestions((prev) =>
            prev.map((q) =>
                q.id === qId
                    ? { ...q, options: q.options.map((o) => (o.id === optId ? { ...o, text } : o)) }
                    : q
            )
        );
    };

    const addOption = (qId: string) => {
        setQuestions((prev) =>
            prev.map((q) =>
                q.id === qId ? { ...q, options: [...q.options, { id: nextId(), text: "" }] } : q
            )
        );
    };

    const deleteQuestion = (id: string) => {
        setQuestions((prev) => prev.filter((q) => q.id !== id));
        setOpenMenuId(null);
        if (expandedId === id) setExpandedId(null);
    };

    const duplicateQuestion = (id: string) => {
        setQuestions((prev) => {
            const src = prev.find((q) => q.id === id);
            if (!src) return prev;
            const copy: Question = {
                ...src,
                id: nextId(),
                options: src.options.map((o) => ({ ...o, id: nextId() })),
            };
            const idx = prev.findIndex((q) => q.id === id);
            const next = [...prev];
            next.splice(idx + 1, 0, copy);
            return next;
        });
        setOpenMenuId(null);
    };

    const handleSaveDraft = () => {
        console.log("Saving draft", { quizTitle, quizDescription, duration, passingScore, attempts, showResult, allowReview, questions });
    };

    const handleFinishQuiz = () => {
        console.log("Finishing quiz", { quizTitle, quizDescription, duration, passingScore, attempts, showResult, allowReview, questions });
        navigate("/instructor/activities");
    };

    if (step === "settings") {
        return (
            <div className="max-w-3xl w-full text-black  px-6 py-8">
                <button
                    type="button"
                    onClick={handleBack}
                    className="flex items-center gap-1 text-[13px] text-gray-500 hover:text-gray-700 mb-6"
                >
                    <ChevronLeft size={16} />
                    Back to Activities
                </button>

                <h1 className="text-xl font-bold text-gray-900">Quiz questions</h1>
                <p className="text-[13px] text-gray-500 mt-1 mb-8">
                    Add questions and define answers, points, and grading methods for this quiz.
                </p>

                <div className="flex flex-col gap-6">
                    <div>
                        <label className="block text-[13px] font-semibold text-gray-800 mb-2">
                            Quiz title
                        </label>
                        <input
                            type="text"
                            value={quizTitle}
                            onChange={(e) => setQuizTitle(e.target.value)}
                            placeholder="e.g. UX Research Fundamentals"
                            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-[13px] placeholder:text-black text-black focus:outline-none focus:ring-2 focus:ring-green-600/20 focus:border-green-600"
                        />
                    </div>

                    <div>
                        <label className="block text-[13px] font-semibold text-gray-800 mb-2">
                            Quiz description
                        </label>
                        <textarea
                            value={quizDescription}
                            onChange={(e) => setQuizDescription(e.target.value)}
                            placeholder="Describe what this quiz covers"
                            rows={3}
                            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-[13px] placeholder:text-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-green-600/20 focus:border-green-600"
                        />
                    </div>

                    <div>
                        <label className="block text-[13px] font-semibold text-gray-800 mb-2">
                            Durations
                        </label>
                        <input
                            type="text"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            placeholder="e.g. 15 mins"
                            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-[13px] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600/20 focus:border-green-600"
                        />
                    </div>

                    <div>
                        <label className="block text-[13px] font-semibold text-gray-800 mb-2">
                            Passing score
                        </label>
                        <input
                            type="text"
                            value={passingScore}
                            onChange={(e) => setPassingScore(e.target.value)}
                            placeholder="e.g. 70%"
                            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-[13px] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600/20 focus:border-green-600"
                        />
                    </div>

                    <div>
                        <label className="block text-[13px] font-semibold text-gray-800 mb-2">
                            Attempts
                        </label>
                        <input
                            type="text"
                            value={attempts}
                            onChange={(e) => setAttempts(e.target.value)}
                            placeholder="e.g. 1"
                            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-[13px] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600/20 focus:border-green-600"
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-[13px] text-gray-800">Show result after submission</span>
                        <Toggle checked={showResult} onChange={setShowResult} />
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-[13px] text-gray-800">Allow review after submission</span>
                        <Toggle checked={allowReview} onChange={setAllowReview} />
                    </div>
                </div>

                <div className="flex items-center gap-3 mt-10">
                    <button
                        type="button"
                        onClick={handleBack}
                        className="flex-1 rounded-xl border border-gray-200 px-6 py-2.5 text-[13px] font-semibold text-gray-500 hover:bg-gray-50"
                    >
                        Back
                    </button>
                    <button
                        type="button"
                        onClick={handleContinue}
                        className="flex-1 rounded-xl bg-green-600 px-6 py-2.5 text-[13px] font-semibold text-white hover:bg-green-700 transition-colors"
                    >
                        Continue
                    </button>
                </div>
            </div>
        );
    }


    return (
        <div className="max-w-3xl bg-white  px-6 py-3">
            <button
                type="button"
                onClick={handleBack}
                className="flex items-center gap-1 text-[13px] text-gray-500 hover:text-gray-700 mb-6"
            >
                <ChevronLeft size={16} />
                Back to Activities
            </button>

            <h1 className="text-xl font-bold text-gray-900">Add Questions</h1>
            <p className="text-[13px] text-gray-500 mt-1 mb-6">
                Choose a question type and start building your assessment.
            </p>

            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-2 bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3 mb-6">
                <span className="text-[13px] font-semibold text-gray-700 mr-2">
                    Question : {questions.length}
                </span>
                <button
                    type="button"
                    onClick={() => addQuestion("mcq")}
                    className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-[12px] font-medium text-gray-700 hover:border-green-600 hover:text-green-700"
                >
                    <Plus size={14} />
                    Multiple choice
                </button>
                <button
                    type="button"
                    onClick={() => addQuestion("truefalse")}
                    className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-[12px] font-medium text-gray-700 hover:border-green-600 hover:text-green-700"
                >
                    <Plus size={14} />
                    True | False
                </button>
                <button
                    type="button"
                    onClick={() => addQuestion("short")}
                    className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-[12px] font-medium text-gray-700 hover:border-green-600 hover:text-green-700"
                >
                    <Plus size={14} />
                    Short answer
                </button>
            </div>

            {/* Question list */}
            <div className="flex flex-col">
                {questions.length === 0 && (
                    <p className="text-[13px] text-gray-400 text-center py-10">
                        No questions yet Ã¢â‚¬â€ add one using the buttons above.
                    </p>
                )}

                {questions.map((q, index) => {
                    const isExpanded = expandedId === q.id;
                    return (
                        <div key={q.id} className="border-b border-gray-100 py-4">
                            {/* Header row */}
                            <div className="flex items-center gap-2">
                                <GripVertical size={14} className="text-gray-300 shrink-0" />
                                <button
                                    type="button"
                                    onClick={() => setExpandedId(isExpanded ? null : q.id)}
                                    className="flex-1 flex items-center justify-between text-left"
                                >
                                    <span className="text-[13px] font-semibold text-gray-900">
                                        Question {index + 1}
                                        {!isExpanded && q.text && (
                                            <span className="ml-2 font-normal text-gray-500">
                                                {q.text.length > 60 ? `${q.text.slice(0, 60)}Ã¢â‚¬Â¦` : q.text}
                                            </span>
                                        )}
                                    </span>
                                </button>
                                <span className="text-[11px] font-medium text-gray-500 bg-gray-100 rounded-full px-2.5 py-1 shrink-0">
                                    {TYPE_LABEL[q.type]}
                                </span>
                                <span className="text-[11px] font-medium text-gray-500 shrink-0">
                                    {q.points}pt
                                </span>
                                <div className="relative shrink-0">
                                    <button
                                        type="button"
                                        onClick={() => setOpenMenuId(openMenuId === q.id ? null : q.id)}
                                        className="text-gray-400 hover:text-gray-600 p-1"
                                    >
                                        <MoreVertical size={16} />
                                    </button>
                                    {openMenuId === q.id && (
                                        <div className="absolute right-0 top-8 z-10 w-36 rounded-lg border border-gray-100 bg-white shadow-lg py-1">
                                            <button
                                                type="button"
                                                onClick={() => duplicateQuestion(q.id)}
                                                className="w-full flex items-center gap-2 px-3 py-2 text-[12px] text-gray-700 hover:bg-gray-50"
                                            >
                                                <Copy size={13} />
                                                Duplicate
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => deleteQuestion(q.id)}
                                                className="w-full flex items-center gap-2 px-3 py-2 text-[12px] text-red-600 hover:bg-red-50"
                                            >
                                                <Trash2 size={13} />
                                                Delete
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Expanded editor */}
                            {isExpanded && (
                                <div className="mt-4 pl-6 flex flex-col gap-4">
                                    <div>
                                        <label className="block text-[12px] font-semibold text-gray-700 mb-1.5">
                                            Question Text
                                        </label>
                                        <textarea
                                            value={q.text}
                                            onChange={(e) => updateQuestion(q.id, { text: e.target.value })}
                                            placeholder="Enter your question"
                                            rows={4}
                                            className="w-full rounded-xl border text-black border-gray-200 px-3 py-2 text-[13px] placeholder:text-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-green-600/20 focus:borde-primary"
                                        />
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <label className="text-[12px] font-semibold text-gray-700">Points</label>
                                        <input
                                            type="number"
                                            min={0}
                                            value={q.points}
                                            onChange={(e) =>
                                                updateQuestion(q.id, { points: Number(e.target.value) || 0 })
                                            }
                                            className="w-20 rounded-lg border text-black border-gray-200 px-2 py-1 text-[13px] focus:outline-none focus:ring-2 focus:ring-green-600/20 focus:border-primary"
                                        />
                                    </div>

                                    {(q.type === "mcq" || q.type === "truefalse") && (
                                        <div>
                                            <label className="block text-[12px] font-semibold text-gray-700 mb-1.5">
                                                Answer options
                                            </label>
                                            <div className="flex flex-col gap-2">
                                                {q.options.map((opt) => {
                                                    const isCorrect = q.correctOptionId === opt.id;
                                                    return (
                                                        <div
                                                            key={opt.id}
                                                            className={`flex items-center text-black gap-2 rounded-lg border px-3 py-2 ${isCorrect
                                                                ? "border-primary bg-primary/40"
                                                                : "border-gray-200"
                                                                }`}
                                                        >
                                                            <button
                                                                type="button"
                                                                onClick={() => updateQuestion(q.id, { correctOptionId: opt.id })}
                                                                className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${isCorrect ? "border-primary bg-primary" : "border-gray-300"
                                                                    }`}
                                                            >
                                                                {isCorrect && <Check size={10} className="text-white" />}
                                                            </button>
                                                            {q.type === "truefalse" ? (
                                                                <span className="flex-1 text-[13px] text-gray-800">
                                                                    {opt.text}
                                                                </span>
                                                            ) : (
                                                                <input
                                                                    type="text"
                                                                    value={opt.text}
                                                                    onChange={(e) => updateOptionText(q.id, opt.id, e.target.value)}
                                                                    placeholder="Option text"
                                                                    className="flex-1 text-[13px] bg-transparent focus:outline-none placeholder:text-gray-400"
                                                                />
                                                            )}
                                                            {isCorrect && (
                                                                <span className="text-[11px] font-medium text-primary shrink-0">
                                                                    Correct
                                                                </span>
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                            {q.type === "mcq" && (
                                                <button
                                                    type="button"
                                                    onClick={() => addOption(q.id)}
                                                    className="flex items-center gap-1 text-[12px] font-medium text-primary hover:text-primary mt-2"
                                                >
                                                    <Plus size={13} />
                                                    Add options
                                                </button>
                                            )}
                                        </div>
                                    )}

                                    {q.type === "short" && (
                                        <p className="text-[12px] text-gray-500 italic">
                                            Learners will type a free-text response Ã¢â‚¬â€ no answer options needed.
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            <div className="flex items-center gap-3 mt-8">
                <button
                    type="button"
                    onClick={handleSaveDraft}
                    className="rounded-xl border border-gray-200 px-6 py-2.5 text-[13px] font-semibold text-gray-600 hover:bg-gray-50"
                >
                    Save Draft
                </button>
                <button
                    type="button"
                    onClick={handleFinishQuiz}
                    className="rounded-xl bg-primary px-6 py-2.5 text-[13px] font-semibold text-white hover:bg-green-700 transition-colors"
                >
                    Finish Quiz
                </button>
            </div>
        </div>
    );
}