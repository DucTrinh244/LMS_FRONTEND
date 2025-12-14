import { useQuery } from '@tanstack/react-query';
import {
  Award,
  BookOpen,
  CheckCircle,
  ChevronDown,
  ClipboardList,
  Clock,
  Download,
  FileText,
  Heart,
  HelpCircle,
  Play,
  Smartphone,
  Star,
  Users,
  Video,
  X
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import courseDetailData from '~/module/landing/data/courseDetailData.json';
import { courseService } from '~/module/landing/services/CourseApi';
import { useAuth } from '~/shared/hooks/useAuth';
import { useToast } from '~/shared/hooks/useToast';
import { useWishlist } from '~/shared/hooks/useWishlist';

interface Chapter {
  id: string
  title: string
  description: string | null
  sortOrder: number
  isPublished: boolean
}

interface Lesson {
  id: string
  chapterId?: string
  title: string
  content: string
  videoUrl?: string
  duration: number // in minutes
  order: number
  type: number // 1=Video, 2=Article, 3=Quiz, 4=Assignment
  isPreview: boolean
}

interface Quiz {
  id: string
  title: string
  description: string | null
  timeLimit: number
  passingScore: number
  questionCount: number
  totalPoints: number
  isPublished: boolean
}

const CourseDetailContent = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // Fetch course detail from API
  const {
    data: courseDetail,
    isLoading,
    error
  } = useQuery({
    queryKey: ['course-detail', courseId],
    queryFn: () => courseService.getCourseDetail(courseId || ''),
    enabled: !!courseId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2
  });

  // Use API data if available, otherwise fallback to JSON
  const course = courseDetail?.course || {
    ...courseDetailData.course,
    id: courseId || courseDetailData.course.id
  } as {
    id: string
    title: string
    shortDescription: string
    description: string
    objectives: string
    requirements: string
    image: string
    instructorName: string
    instructorAvatar: string
    rating: number
    reviews: number
    students: number
    price: number
    certificateEnabled: boolean
  };

  const chapters: Chapter[] = (courseDetail?.chapters || courseDetailData.chapters).map(chapter => ({
    ...chapter,
    description: chapter.description || null
  }));

  const lessons: Lesson[] = (courseDetail?.lessons || courseDetailData.lessons).map(lesson => ({
    ...lesson,
    chapterId: lesson.chapterId || undefined,
    content: lesson.content || '',
    videoUrl: lesson.videoUrl || undefined
  }));

  const quizzes: Quiz[] = (courseDetail?.quizzes || courseDetailData.quizzes).map(quiz => ({
    ...quiz,
    description: quiz.description || null
  }));

  const toggleSection = (chapterId: string) => {
    setExpandedSections((prev) =>
      prev.includes(chapterId) ? prev.filter((id) => id !== chapterId) : [...prev, chapterId]
    );
  };

  const getTypeIcon = (type: number) => {
    switch (type) {
      case 1: // Video
        return <Video className="w-4 h-4 text-cyan-400" />
      case 2: // Article
        return <FileText className="w-4 h-4 text-indigo-400" />
      case 3: // Quiz
        return <HelpCircle className="w-4 h-4 text-yellow-400" />
      case 4: // Assignment
        return <ClipboardList className="w-4 h-4 text-orange-400" />
      default:
        return <BookOpen className="w-4 h-4 text-purple-400" />
    }
  };

  const getTypeName = (type: number): string => {
    switch (type) {
      case 1:
        return 'Video'
      case 2:
        return 'Article'
      case 3:
        return 'Quiz'
      case 4:
        return 'Assignment'
      default:
        return 'Unknown'
    }
  };

  const getLessonsByChapter = (chapterId: string) => {
    return lessons.filter((lesson) => lesson.chapterId === chapterId).sort((a, b) => a.order - b.order)
  };

  const getLessonsWithoutChapter = () => {
    return lessons.filter((lesson) => !lesson.chapterId).sort((a, b) => a.order - b.order)
  };

  const totalDuration = lessons.reduce((sum, lesson) => sum + lesson.duration, 0)
  const totalLessons = lessons.length
  const totalQuizzes = quizzes.length

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="container mx-auto px-4 py-10 max-w-7xl">
          <div className="text-center text-white py-12">
            <div className="w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p>Đang tải khóa học...</p>
          </div>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="container mx-auto px-4 py-10 max-w-7xl">
          <div className="text-center text-white py-12">
            <p className="text-red-400 mb-4">Không thể tải thông tin khóa học</p>
            <p className="text-slate-400 text-sm">{error instanceof Error ? error.message : 'Có lỗi xảy ra'}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 via-purple-600/20 to-pink-600/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-violet-900/30 via-transparent to-transparent"></div>

        <div className="relative container mx-auto max-w-7xl px-6 py-12">
          <div className="grid lg:grid-cols-5 gap-8 items-start">
            {/* Left Content - Takes more space */}
            <div className="lg:col-span-3 space-y-6">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <span className="hover:text-violet-400 cursor-pointer transition">Home</span>
                <span>/</span>
                <span className="hover:text-violet-400 cursor-pointer transition">Courses</span>
                <span>/</span>
                <span className="text-white">Web Development</span>
              </div>

              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-full">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span className="text-xs font-semibold text-amber-400">BESTSELLER</span>
                </div>

                <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight bg-gradient-to-r from-white via-white to-slate-300 bg-clip-text text-transparent">
                  {course.title}
                </h1>

                <p className="text-lg text-slate-300 leading-relaxed">
                  {course.shortDescription}
                </p>

                {/* Stats Row */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[1, 2, 3, 4].map((star) => (
                        <Star key={star} className="w-4 h-4 text-amber-400 fill-amber-400" />
                      ))}
                      <Star className="w-4 h-4 text-amber-400/30" />
                    </div>
                    <span className="font-bold text-white">{course.rating.toFixed(1)}</span>
                    <span className="text-slate-400 text-sm">({course.reviews.toLocaleString()} reviews)</span>
                  </div>

                  <div className="h-4 w-px bg-slate-700"></div>

                  <div className="flex items-center gap-2 text-slate-300">
                    <Users className="w-4 h-4 text-violet-400" />
                    <span className="font-semibold">{course.students.toLocaleString()}</span>
                    <span className="text-sm text-slate-400">students</span>
                  </div>
                </div>

                {/* Instructor */}
                <div className="flex items-center gap-4 pt-4 pb-2">
                  <img
                    src={course.instructorAvatar}
                    alt={course.instructorName}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-violet-500/30"
                  />
                  <div>
                    <p className="text-sm text-slate-400">Created by</p>
                    <p className="font-semibold text-white text-lg">{course.instructorName}</p>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
                  <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 hover:border-violet-500/50 transition">
                    <BookOpen className="w-5 h-5 text-violet-400 mb-2" />
                    <div className="text-2xl font-bold text-white">{totalLessons}</div>
                    <div className="text-xs text-slate-400">Lessons</div>
                  </div>
                  <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 hover:border-cyan-500/50 transition">
                    <Clock className="w-5 h-5 text-cyan-400 mb-2" />
                    <div className="text-2xl font-bold text-white">{Math.floor(totalDuration / 60)}h</div>
                    <div className="text-xs text-slate-400">Duration</div>
                  </div>
                  <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 hover:border-yellow-500/50 transition">
                    <HelpCircle className="w-5 h-5 text-yellow-400 mb-2" />
                    <div className="text-2xl font-bold text-white">{totalQuizzes}</div>
                    <div className="text-xs text-slate-400">Quizzes</div>
                  </div>
                  <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 hover:border-green-500/50 transition">
                    <Award className="w-5 h-5 text-green-400 mb-2" />
                    <div className="text-2xl font-bold text-white">Yes</div>
                    <div className="text-xs text-slate-400">Certificate</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Video Preview */}
            <div className="lg:col-span-2">
              <div className="sticky top-6">
                <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-2xl shadow-violet-500/10 overflow-hidden">
                  <div className="relative aspect-video bg-gradient-to-br from-violet-900/30 via-purple-900/30 to-slate-900/30 group cursor-pointer" onClick={() => setIsVideoOpen(true)}>
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl shadow-violet-500/50 group-hover:scale-110 transition-all duration-300">
                        <Play className="w-8 h-8 text-violet-600 fill-violet-600 ml-1" />
                      </div>
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1.5 bg-black/50 backdrop-blur-md rounded-lg text-white text-sm font-medium">
                        Preview this course
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-6">
                    <div className="text-center pb-6 border-b border-slate-700/50">
                      <div className="flex items-baseline justify-center gap-2 mb-2">
                        <span className="text-5xl font-bold text-white">
                          {(course.price || 0) === 0 ? 'Free' : `$${(course.price || 0).toLocaleString()}`}
                        </span>
                      </div>
                      {(course.price || 0) > 0 && (
                        <div className="text-slate-400 line-through text-lg">$199.99</div>
                      )}
                      {(course.price || 0) > 0 && (
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/30 rounded-full mt-2">
                          <span className="text-xs font-semibold text-red-400">55% OFF - Limited Time</span>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => {
                        if (isAuthenticated) {
                          navigate(`/checkout/${courseId}`);
                        } else {
                          navigate('/login', { state: { from: `/checkout/${courseId}` } });
                        }
                      }}
                      className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 transition-all duration-300 hover:-translate-y-0.5"
                    >
                      Enroll Now
                    </button>

                    <button
                      onClick={() => {
                        if (!courseId) return;
                        const wasInWishlist = isInWishlist(courseId);
                        toggleWishlist(courseId);
                        toast.success(wasInWishlist ? 'Đã xóa khỏi wishlist' : 'Đã thêm vào wishlist');
                      }}
                      className={`w-full flex items-center justify-center gap-2 px-4 py-3 border rounded-xl transition-all ${courseId && isInWishlist(courseId)
                        ? 'bg-rose-500/20 border-rose-500/50 text-rose-400 hover:bg-rose-500/30'
                        : 'bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-700/50 hover:text-violet-400 hover:border-violet-500/50'
                        }`}
                    >
                      <Heart className={`w-4 h-4 ${courseId && isInWishlist(courseId) ? 'fill-rose-400' : ''}`} />
                      <span className="font-medium">
                        {courseId && isInWishlist(courseId) ? 'In Wishlist' : 'Wishlist'}
                      </span>
                    </button>

                    <div className="space-y-3 pt-4">
                      <p className="text-sm font-semibold text-white mb-3">This course includes:</p>
                      <div className="space-y-2.5">
                        {[
                          { icon: Video, text: `${totalLessons} video lessons` },
                          { icon: Clock, text: `${Math.floor(totalDuration / 60)}h ${totalDuration % 60}m on-demand video` },
                          { icon: Download, text: 'Downloadable resources' },
                          { icon: Smartphone, text: 'Access on mobile and TV' },
                          { icon: Award, text: 'Certificate of completion' }
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-center gap-3 text-slate-300">
                            <item.icon className="w-4 h-4 text-violet-400 flex-shrink-0" />
                            <span className="text-sm">{item.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-7xl px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Content Tabs */}
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden">
              <div className="border-b border-slate-700/50">
                <div className="flex gap-1 p-2">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`px-6 py-3 rounded-lg font-semibold text-sm transition-all ${activeTab === 'overview'
                      ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                      }`}
                  >
                    Overview
                  </button>
                </div>
              </div>

              <div className="p-8 space-y-8">
                {/* Description */}
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                    <div className="w-1 h-8 bg-gradient-to-b from-violet-500 to-purple-500 rounded-full"></div>
                    Course Description
                  </h2>
                  <p className="text-slate-300 leading-relaxed text-base">{course.description}</p>
                </div>

                {/* What you'll learn */}
                {course.objectives && (
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                      <div className="w-1 h-8 bg-gradient-to-b from-violet-500 to-purple-500 rounded-full"></div>
                      What you'll learn
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {course.objectives.split('\n').filter(line => line.trim()).map((objective, index) => (
                        <div key={index} className="flex items-start gap-3 p-4 bg-slate-800/30 rounded-xl border border-slate-700/30 hover:border-violet-500/30 transition">
                          <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-300">{objective.trim()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Requirements */}
                {course.requirements && (
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                      <div className="w-1 h-8 bg-gradient-to-b from-violet-500 to-purple-500 rounded-full"></div>
                      Requirements
                    </h2>
                    <div className="space-y-3">
                      {course.requirements.split('\n').filter(line => line.trim()).map((requirement, index) => (
                        <div key={index} className="flex items-start gap-3 text-slate-300">
                          <div className="w-2 h-2 bg-violet-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span>{requirement.trim()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Course Content */}
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden">
              <div className="p-6 border-b border-slate-700/50 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  <div className="w-1 h-8 bg-gradient-to-b from-violet-500 to-purple-500 rounded-full"></div>
                  Course Content
                </h2>
                <div className="text-sm">
                  <span className="text-slate-400">{totalLessons} lessons</span>
                  <span className="mx-2 text-slate-600">•</span>
                  <span className="text-violet-400 font-semibold">{Math.floor(totalDuration / 60)}h {totalDuration % 60}m</span>
                </div>
              </div>

              <div className="divide-y divide-slate-700/50">
                {/* Lessons grouped by chapters */}
                {chapters
                  .filter(chapter => chapter.isPublished)
                  .sort((a, b) => a.sortOrder - b.sortOrder)
                  .map((chapter) => {
                    const chapterLessons = getLessonsByChapter(chapter.id);
                    const isExpanded = expandedSections.includes(chapter.id);

                    return (
                      <div key={chapter.id}>
                        <button
                          onClick={() => toggleSection(chapter.id)}
                          className="w-full px-6 py-5 flex items-center justify-between hover:bg-slate-800/30 transition-all group"
                        >
                          <div className="flex-1 text-left">
                            <div className="flex items-center gap-3 mb-1">
                              <span className="font-bold text-white text-lg group-hover:text-violet-400 transition">{chapter.title}</span>
                            </div>
                            {chapter.description && (
                              <p className="text-sm text-slate-400 mt-1">{chapter.description}</p>
                            )}
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-sm text-slate-400">{chapterLessons.length} lessons</span>
                            <ChevronDown
                              className={`w-5 h-5 text-slate-400 group-hover:text-violet-400 transition-all duration-300 ${isExpanded ? 'rotate-180' : ''
                                }`}
                            />
                          </div>
                        </button>

                        {isExpanded && (
                          <div className="px-6 py-4 bg-slate-900/50 space-y-2">
                            {chapterLessons.length > 0 ? (
                              chapterLessons.map((lesson) => (
                                <div
                                  key={lesson.id}
                                  className="flex items-center gap-4 p-4 rounded-xl hover:bg-slate-800/50 transition-all group cursor-pointer border border-transparent hover:border-slate-700/50"
                                >
                                  <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0 group-hover:bg-violet-600/20 transition">
                                    {getTypeIcon(lesson.type)}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-white font-medium group-hover:text-violet-400 transition truncate">
                                      {lesson.title}
                                    </p>
                                    <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                                      <span>{getTypeName(lesson.type)}</span>
                                      {lesson.duration > 0 && (
                                        <>
                                          <span>•</span>
                                          <span>{lesson.duration} min</span>
                                        </>
                                      )}
                                      {lesson.isPreview && (
                                        <>
                                          <span>•</span>
                                          <span className="text-green-400 font-medium">Free Preview</span>
                                        </>
                                      )}
                                    </div>
                                  </div>
                                  {lesson.isPreview && (
                                    <Play className="w-4 h-4 text-violet-400" />
                                  )}
                                </div>
                              ))
                            ) : (
                              <div className="text-sm text-slate-400 py-2">Chưa có bài học trong chương này</div>
                            )}
                          </div>
                        )}
                      </div>
                    )
                  })}

                {/* Lessons without chapter */}
                {getLessonsWithoutChapter().length > 0 && (
                  <div>
                    <div className="px-6 py-4 bg-slate-900/30">
                      <span className="font-bold text-white text-lg">Other Lessons</span>
                    </div>
                    <div className="px-6 py-4 bg-slate-900/50 space-y-2">
                      {getLessonsWithoutChapter().map((lesson) => (
                        <div
                          key={lesson.id}
                          className="flex items-center gap-4 p-4 rounded-xl hover:bg-slate-800/50 transition-all group cursor-pointer border border-transparent hover:border-slate-700/50"
                        >
                          <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0 group-hover:bg-violet-600/20 transition">
                            {getTypeIcon(lesson.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-white font-medium group-hover:text-violet-400 transition truncate">
                              {lesson.title}
                            </p>
                            <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                              <span>{getTypeName(lesson.type)}</span>
                              {lesson.duration > 0 && (
                                <>
                                  <span>•</span>
                                  <span>{lesson.duration} min</span>
                                </>
                              )}
                              {lesson.isPreview && (
                                <>
                                  <span>•</span>
                                  <span className="text-green-400 font-medium">Free Preview</span>
                                </>
                              )}
                            </div>
                          </div>
                          {lesson.isPreview && (
                            <Play className="w-4 h-4 text-violet-400" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quizzes */}
                {quizzes.length > 0 && (
                  <div>
                    <div className="px-6 py-4 bg-slate-900/30">
                      <span className="font-bold text-white text-lg">Quizzes & Assessments</span>
                    </div>
                    <div className="px-6 py-4 bg-slate-900/50 space-y-2">
                      {quizzes.map((quiz) => (
                        <div
                          key={quiz.id}
                          className="flex items-center gap-4 p-4 rounded-xl hover:bg-slate-800/50 transition-all group cursor-pointer border border-transparent hover:border-slate-700/50"
                        >
                          <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0 group-hover:bg-yellow-600/20 transition">
                            <HelpCircle className="w-5 h-5 text-yellow-400" />
                          </div>
                          <div className="flex-1">
                            <p className="text-white font-medium group-hover:text-yellow-400 transition">
                              {quiz.title}
                            </p>
                            <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                              <span>{quiz.questionCount} questions</span>
                              <span>•</span>
                              <span>{quiz.totalPoints} points</span>
                              {quiz.timeLimit > 0 && (
                                <>
                                  <span>•</span>
                                  <span>{quiz.timeLimit} min</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Sidebar - Instructor Info */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-6">
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
                <h3 className="text-lg font-bold text-white mb-4">Course Features</h3>
                <div className="space-y-4">
                  {[
                    { icon: Users, label: 'Enrolled', value: `${course.students.toLocaleString()} students` },
                    { icon: Clock, label: 'Duration', value: `${Math.floor(totalDuration / 60)}h ${totalDuration % 60}m` },
                    { icon: BookOpen, label: 'Chapters', value: chapters.length },
                    { icon: Play, label: 'Lessons', value: totalLessons }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between py-3 border-b border-slate-700/30 last:border-0">
                      <div className="flex items-center gap-3 text-slate-300">
                        <item.icon className="w-5 h-5 text-violet-400" />
                        <span className="text-sm">{item.label}</span>
                      </div>
                      <span className="font-bold text-white">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {isVideoOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-2xl border border-slate-700 w-full max-w-4xl overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-slate-700">
              <h3 className="text-xl font-bold text-white">Course Preview</h3>
              <button
                onClick={() => setIsVideoOpen(false)}
                className="w-10 h-10 bg-slate-700/50 rounded-full flex items-center justify-center hover:bg-violet-600/50 transition"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
            <div className="relative aspect-video bg-black">
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Course Demo Video"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetailContent;