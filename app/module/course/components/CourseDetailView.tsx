import { useQueryClient } from '@tanstack/react-query';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle, ChevronDown, ChevronUp, Clock,
  FileText, HelpCircle,
  Loader2,
  Play
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import type { CourseStudentData, LessonInfo, QuizInfo } from '~/module/course/types/course';
import { formatDuration } from '~/module/course/types/course';
import { enrollmentService } from '~/module/student/services/EnrollmentApi';
import { useToast } from '~/shared/hooks/useToast';

interface CourseDetailViewProps {
  courseData: CourseStudentData;
}

const CourseDetailView = ({ courseData }: CourseDetailViewProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState('Overview');
  const [expandedSections, setExpandedSections] = useState<number[]>([0]);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<LessonInfo | null>(null);
  const [expandedLessons, setExpandedLessons] = useState<Set<string>>(new Set());
  const [isCompleting, setIsCompleting] = useState(false);

  const tabs = ['Overview', 'Notes', 'FAQ'];

  const { course, enrollment, chapters } = courseData;

  // Parse objectives into learning points (split by semicolon or newline)
  const learningPoints = useMemo(() => {
    if (!course.objectives) return [];
    return course.objectives
      .split(/[;\n]/)
      .map(point => point.trim())
      .filter(point => point.length > 0);
  }, [course.objectives]);

  // Parse requirements into list (split by semicolon or newline)
  const requirements = useMemo(() => {
    if (!course.requirements) return [];
    return course.requirements
      .split(/[;\n]/)
      .map(req => req.trim())
      .filter(req => req.length > 0);
  }, [course.requirements]);

  // Format last accessed date
  const lastAccessedText = useMemo(() => {
    if (!enrollment.lastAccessed) return 'Never';
    const date = new Date(enrollment.lastAccessed);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }, [enrollment.lastAccessed]);

  // Sort chapters by sortOrder and filter published ones
  const sortedChapters = useMemo(() => {
    return [...chapters]
      .filter(ch => ch.isPublished)
      .sort((a, b) => a.sortOrder - b.sortOrder);
  }, [chapters]);

  // Get all lessons from all chapters, sorted by chapter order and lesson sortOrder
  const allLessons = useMemo(() => {
    const lessons: LessonInfo[] = [];
    sortedChapters.forEach(chapter => {
      const chapterLessons = chapter.lessons
        .filter(lesson => lesson.isPublished)
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .map(lesson => ({ ...lesson, chapterSortOrder: chapter.sortOrder }));
      lessons.push(...chapterLessons);
    });
    return lessons;
  }, [sortedChapters]);

  // Get next lesson
  const nextLesson = useMemo(() => {
    if (!selectedLesson) return null;
    const currentIndex = allLessons.findIndex(lesson => lesson.id === selectedLesson.id);
    if (currentIndex >= 0 && currentIndex < allLessons.length - 1) {
      return allLessons[currentIndex + 1];
    }
    return null;
  }, [selectedLesson, allLessons]);


  // Handle complete and next
  const handleCompleteAndNext = async () => {
    if (!selectedLesson || !courseData.enrollment) return;

    setIsCompleting(true);

    try {
      // Call API to mark lesson as completed
      await enrollmentService.completeLesson(selectedLesson.id);

      toast.success('Đã đánh dấu bài học hoàn thành!');

      // Invalidate course data to refresh progress
      queryClient.invalidateQueries({ queryKey: ['course-student', courseData.course.id] });

      // Move to next lesson if available
      if (nextLesson) {
        setSelectedLesson(nextLesson);
        // Expand the chapter containing next lesson
        const chapterIndex = sortedChapters.findIndex(ch =>
          ch.lessons.some(l => l.id === nextLesson.id)
        );
        if (chapterIndex !== -1) {
          setExpandedSections(prev =>
            prev.includes(chapterIndex) ? prev : [...prev, chapterIndex]
          );
        }
        setActiveTab('Overview');

        // Scroll to top of video player
        setTimeout(() => {
          const videoPlayer = document.querySelector('.aspect-video');
          if (videoPlayer) {
            videoPlayer.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      } else {
        // If no next lesson, show completion message
        toast.success('Chúc mừng! Bạn đã hoàn thành tất cả các bài học trong khóa học này!');
      }
    } catch (error: any) {
      console.error('Error completing lesson:', error);
      toast.error(error?.message || 'Không thể đánh dấu bài học hoàn thành. Vui lòng thử lại.');
    } finally {
      setIsCompleting(false);
    }
  };

  // Get quiz from selected lesson (quizzes are already in the lesson data)
  const quizData = useMemo<QuizInfo | null>(() => {
    if (!selectedLesson) return null;

    // Check if lesson has quizzes array
    if (selectedLesson.quizzes && selectedLesson.quizzes.length > 0) {
      // Get first published quiz from lesson.quizzes array
      const publishedQuizzes = selectedLesson.quizzes.filter(q => q.isPublished);
      return publishedQuizzes.length > 0 ? publishedQuizzes[0] : selectedLesson.quizzes[0];
    }
    return null;
  }, [selectedLesson]);

  // Set first lesson with videoUrl as default selected lesson
  useEffect(() => {
    if (!selectedLesson && allLessons.length > 0) {
      const firstVideoLesson = allLessons.find(lesson => lesson.videoUrl);
      if (firstVideoLesson) {
        setSelectedLesson(firstVideoLesson);
        // Expand the chapter containing this lesson
        const chapterIndex = sortedChapters.findIndex(ch =>
          ch.lessons.some(l => l.id === firstVideoLesson.id)
        );
        if (chapterIndex !== -1) {
          setExpandedSections([chapterIndex]);
        }
      } else if (allLessons.length > 0) {
        // If no video lesson, select first lesson anyway
        setSelectedLesson(allLessons[0]);
        setExpandedSections([0]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allLessons.length, sortedChapters.length]);

  // Handle lesson click
  const handleLessonClick = (lesson: LessonInfo, chapterIndex: number) => {
    setSelectedLesson(lesson);
    // Expand the chapter if not already expanded
    if (!expandedSections.includes(chapterIndex)) {
      setExpandedSections(prev => [...prev, chapterIndex]);
    }
    // Toggle lesson expansion to show quiz
    setExpandedLessons(prev => {
      const newSet = new Set(prev);
      if (newSet.has(lesson.id)) {
        newSet.delete(lesson.id);
      } else {
        newSet.add(lesson.id);
      }
      return newSet;
    });
    // Switch to Overview tab to show lesson content
    setActiveTab('Overview');
  };

  // Prevent context menu (right click)
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    return false;
  };

  // Prevent opening links in new tabs
  const handleLinkClick = (e: React.MouseEvent) => {
    // Prevent Ctrl+Click, Middle click, Shift+Click
    if (e.ctrlKey || e.metaKey || e.button === 1 || e.shiftKey) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  };

  // Prevent keyboard shortcuts that open new tabs
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Prevent Ctrl+T, Ctrl+N, Ctrl+W, etc.
    if ((e.ctrlKey || e.metaKey) && (e.key === 't' || e.key === 'n' || e.key === 'w')) {
      e.preventDefault();
      return false;
    }
  };

  // Get lesson type icon
  const getLessonTypeIcon = (type: number) => {
    switch (type) {
      case 1: // Video
        return <Play className="w-4 h-4" />;
      case 2: // Article
        return <FileText className="w-4 h-4" />;
      case 3: // Quiz
        return <HelpCircle className="w-4 h-4" />;
      case 4: // Assignment
        return <BookOpen className="w-4 h-4" />;
      default:
        return <Play className="w-4 h-4" />;
    }
  };

  // Convert YouTube URL to embed format
  const convertToEmbedUrl = (url: string): string => {
    if (!url) return '';

    // If already embed URL, return as is (but ensure it's https)
    if (url.includes('youtube.com/embed/') || url.includes('youtu.be/embed/')) {
      return url.replace('http://', 'https://');
    }

    let videoId = '';
    let timeParam = '';

    // Extract video ID from different YouTube URL formats
    // Format 1: https://www.youtube.com/watch?v=VIDEO_ID
    // Format 2: https://youtube.com/watch?v=VIDEO_ID
    // Format 3: https://youtu.be/VIDEO_ID
    // Format 4: https://m.youtube.com/watch?v=VIDEO_ID
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/v\/)([^&\n?#]+)/,
      /youtube\.com\/embed\/([^&\n?#]+)/
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        videoId = match[1];
        break;
      }
    }

    // Extract time parameter (t=123s or t=1m23s)
    const timeMatch = url.match(/[?&]t=(\d+)([smh]?)/);
    if (timeMatch) {
      let seconds = parseInt(timeMatch[1]);
      const unit = timeMatch[2];

      // Convert to seconds if needed
      if (unit === 'm') {
        seconds *= 60;
      } else if (unit === 'h') {
        seconds *= 3600;
      }

      timeParam = seconds.toString();
    }

    // If we found a video ID, create embed URL
    if (videoId) {
      let embedUrl = `https://www.youtube.com/embed/${videoId}`;

      // Add time parameter if exists
      if (timeParam) {
        embedUrl += `?start=${timeParam}`;
      } else {
        // Add ?rel=0 to disable related videos
        embedUrl += '?rel=0';
      }

      return embedUrl;
    }

    // If no match, return original URL (might be other video platform)
    return url;
  };

  const toggleSection = (index: number) => {
    setExpandedSections(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div
      className="min-h-screen select-none"
      onContextMenu={handleContextMenu}
      onKeyDown={handleKeyDown}
      style={{
        userSelect: 'none',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none'
      }}
    >
      <style>{`
        /* Prevent context menu and text selection */
        .course-content * {
          -webkit-user-select: none !important;
          -moz-user-select: none !important;
          -ms-user-select: none !important;
          user-select: none !important;
        }
        
        /* Prevent drag and drop */
        .course-content * {
          -webkit-user-drag: none !important;
          -khtml-user-drag: none !important;
          -moz-user-drag: none !important;
          -o-user-drag: none !important;
          user-drag: none !important;
        }
        
        /* Disable right click on iframe */
        iframe {
          pointer-events: auto;
        }
      `}</style>
      <div className="max-w-7xl mx-auto px-4 py-8 course-content">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Course Content */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800 rounded-2xl border border-slate-700 shadow-lg p-6 sticky top-8">
              {/* Back Button */}
              <button
                onClick={() => navigate('/student')}
                className="flex items-center gap-2 text-violet-400 hover:text-violet-300 font-semibold mb-6 transition"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Course
              </button>

              {/* Course Title */}
              <h1 className="text-2xl font-bold text-white mb-4">
                {course.title}
              </h1>

              {/* Progress */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-green-400">
                    {enrollment.progressPercentage}% Complete
                  </span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-violet-600 to-purple-600 h-2 rounded-full transition-all"
                    style={{ width: `${enrollment.progressPercentage}%` }}
                  />
                </div>
              </div>

              {/* Last Activity */}
              <p className="text-sm text-slate-400 mb-6">
                Last activity: {lastAccessedText}
              </p>

              {/* Course Sections */}
              <div className="space-y-3">
                {sortedChapters.map((chapter, index) => (
                  <div key={chapter.id} className="border border-slate-700 rounded-xl overflow-hidden">
                    {/* Section Header */}
                    <button
                      onClick={() => toggleSection(index)}
                      className="w-full bg-slate-900/50 px-4 py-3 flex items-center justify-between hover:bg-slate-900 transition"
                    >
                      <div className="text-left flex-1">
                        <p className="text-xs text-slate-400 mb-1">Section {chapter.sortOrder}</p>
                        <h3 className="font-bold text-white text-sm">{chapter.title}</h3>
                      </div>
                      {expandedSections.includes(index) ? (
                        <ChevronUp className="w-5 h-5 text-slate-400 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                      )}
                    </button>

                    {/* Section Content */}
                    {expandedSections.includes(index) && chapter.lessons.length > 0 && (
                      <div className="p-4 space-y-2 bg-slate-900/30">
                        {chapter.lessons
                          .filter(lesson => lesson.isPublished)
                          .sort((a, b) => a.sortOrder - b.sortOrder)
                          .map((lesson) => {
                            const isActive = selectedLesson?.id === lesson.id;
                            const isExpanded = expandedLessons.has(lesson.id);
                            // Get all quizzes for this lesson (prioritize published ones)
                            const lessonQuizzes = lesson.quizzes && lesson.quizzes.length > 0
                              ? lesson.quizzes
                                .filter(q => q.isPublished)
                                .sort((a, b) => a.sortOrder - b.sortOrder)
                              : [];

                            return (
                              <div key={lesson.id} className="space-y-2">
                                <div
                                  onClick={() => handleLessonClick(lesson, index)}
                                  className={`flex items-center justify-between p-3 rounded-lg transition cursor-pointer ${isActive
                                      ? 'bg-violet-600/20 border border-violet-500/50'
                                      : 'hover:bg-slate-700/50'
                                    }`}
                                >
                                  <div className="flex items-center gap-3 flex-1">
                                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${lesson.completed ? 'bg-green-500' : isActive ? 'bg-violet-500' : 'bg-slate-600'
                                      }`}>
                                      {lesson.completed ? (
                                        <CheckCircle className="w-3 h-3 text-white" />
                                      ) : isActive ? (
                                        <Play className="w-3 h-3 text-white" />
                                      ) : null}
                                    </div>
                                    <span className={`text-sm font-medium ${isActive ? 'text-violet-300' : 'text-slate-300'
                                      }`}>
                                      {lesson.title}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    {getLessonTypeIcon(lesson.type)}
                                    <span className="text-xs text-slate-400">
                                      {formatDuration(lesson.duration)}
                                    </span>
                                  </div>
                                </div>

                                {/* Quiz Info Cards - Show all quizzes below lesson when expanded */}
                                {isExpanded && lessonQuizzes.length > 0 && (
                                  <div className="ml-8 space-y-3">
                                    {lessonQuizzes.map((quiz) => (
                                      <div key={quiz.id} className="bg-slate-800/80 rounded-lg border border-slate-700 p-4 space-y-3">
                                        <div className="flex items-center gap-2 mb-2">
                                          <HelpCircle className="w-4 h-4 text-violet-400" />
                                          <h4 className="text-sm font-semibold text-white">{quiz.title}</h4>
                                        </div>

                                        {quiz.description && (
                                          <p className="text-xs text-slate-400">{quiz.description}</p>
                                        )}

                                        <div className="grid grid-cols-2 gap-2 text-xs">
                                          <div className="flex items-center gap-1">
                                            <Clock className="w-3 h-3 text-slate-500" />
                                            <span className="text-slate-400">{quiz.timeLimit} phút</span>
                                          </div>
                                          <div className="flex items-center gap-1">
                                            <HelpCircle className="w-3 h-3 text-slate-500" />
                                            <span className="text-slate-400">{quiz.questionCount} câu</span>
                                          </div>
                                          <div className="flex items-center gap-1">
                                            <CheckCircle className="w-3 h-3 text-slate-500" />
                                            <span className="text-slate-400">{quiz.passingScore}% đạt</span>
                                          </div>
                                          <div className="flex items-center gap-1">
                                            <BookOpen className="w-3 h-3 text-slate-500" />
                                            <span className="text-slate-400">{quiz.totalPoints} điểm</span>
                                          </div>
                                        </div>

                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            navigate(`/student/quiz/${quiz.id}/attempt`);
                                          }}
                                          className="w-full bg-gradient-to-r from-violet-600 to-purple-600 text-white px-4 py-2 rounded-lg text-xs font-semibold hover:shadow-violet-500/50 transition flex items-center justify-center gap-2"
                                        >
                                          <Play className="w-3 h-3" />
                                          Bắt đầu làm bài
                                        </button>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                      </div>
                    )}
                    {expandedSections.includes(index) && chapter.lessons.length === 0 && (
                      <div className="p-4 bg-slate-900/30">
                        <p className="text-sm text-slate-400">No lessons available</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Content - Video & Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Player */}
            <div
              className="bg-slate-800 rounded-2xl border border-slate-700 shadow-lg overflow-hidden"
              onContextMenu={handleContextMenu}
              onClick={handleLinkClick}
            >
              {selectedLesson && selectedLesson.videoUrl ? (
                <div
                  className="relative aspect-video bg-black select-none"
                  onContextMenu={handleContextMenu}
                  onAuxClick={handleLinkClick}
                >
                  {selectedLesson.videoUrl.includes('youtube.com') || selectedLesson.videoUrl.includes('youtu.be') ? (
                    <iframe
                      src={convertToEmbedUrl(selectedLesson.videoUrl)}
                      className="w-full h-full pointer-events-auto"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      title={selectedLesson.title}
                      frameBorder="0"
                      sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                      style={{ pointerEvents: 'auto' }}
                    />
                  ) : (
                    <video
                      src={selectedLesson.videoUrl}
                      controls
                      className="w-full h-full"
                      controlsList="nodownload noplaybackrate"
                      onContextMenu={handleContextMenu}
                      disablePictureInPicture
                      disableRemotePlayback
                    >
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
              ) : selectedLesson ? (
                quizData ? (
                  // Quiz Type - Show quiz if lesson has quizzes
                  <div className="relative min-h-[400px] bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-8">
                    <div className="w-full max-w-2xl">
                      <div className="text-center mb-8">
                        <div className="w-20 h-20 bg-violet-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <HelpCircle className="w-10 h-10 text-violet-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">{quizData.title}</h3>
                        {quizData.description && (
                          <p className="text-slate-300 mb-4">{quizData.description}</p>
                        )}
                      </div>

                      <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6 mb-6">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="flex items-center gap-3">
                            <Clock className="w-5 h-5 text-violet-400" />
                            <div>
                              <p className="text-sm text-slate-400">Thời gian</p>
                              <p className="text-white font-semibold">{quizData.timeLimit} phút</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <HelpCircle className="w-5 h-5 text-violet-400" />
                            <div>
                              <p className="text-sm text-slate-400">Số câu hỏi</p>
                              <p className="text-white font-semibold">{quizData.questionCount} câu</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-green-400" />
                            <div>
                              <p className="text-sm text-slate-400">Điểm đạt</p>
                              <p className="text-white font-semibold">{quizData.passingScore}%</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <BookOpen className="w-5 h-5 text-amber-400" />
                            <div>
                              <p className="text-sm text-slate-400">Tổng điểm</p>
                              <p className="text-white font-semibold">{quizData.totalPoints} điểm</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="text-center">
                        <button
                          onClick={() => navigate(`/student/quiz/${quizData.id}/attempt`)}
                          className="bg-gradient-to-r from-violet-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg hover:shadow-violet-500/50 transition flex items-center gap-3 mx-auto"
                        >
                          <Play className="w-5 h-5" />
                          Bắt đầu làm bài
                        </button>
                      </div>
                    </div>
                    ) : (
                    <div className="text-center">
                      <div className="w-20 h-20 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                        <HelpCircle className="w-10 h-10 text-slate-400" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">{selectedLesson.title}</h3>
                      <p className="text-slate-400 mb-4">Quiz chưa được xuất bản hoặc không tồn tại</p>
                      {selectedLesson.content && (
                        <div className="text-slate-300 text-left max-h-96 overflow-y-auto p-4 bg-slate-900/50 rounded-lg">
                          <div dangerouslySetInnerHTML={{ __html: selectedLesson.content }} />
                        </div>
                      )}
                    </div>
                    )
                  </div>
                ) : (
                  // Article or Assignment Type
                  <div className="relative aspect-video bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="w-20 h-20 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                        {getLessonTypeIcon(selectedLesson.type)}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">{selectedLesson.title}</h3>
                      <p className="text-slate-400 mb-4">
                        {selectedLesson.type === 2 ? 'Article Content' :
                          selectedLesson.type === 4 ? 'Assignment' :
                            'No video available'}
                      </p>
                      {selectedLesson.content && (
                        <div
                          className="text-slate-300 text-left max-h-96 overflow-y-auto p-4 bg-slate-900/50 rounded-lg"
                          onContextMenu={handleContextMenu}
                          onClick={(e) => {
                            // Prevent opening links in new tabs
                            const target = e.target as HTMLElement;
                            const link = target.closest('a');
                            if (link) {
                              handleLinkClick(e);
                              e.preventDefault();
                              e.stopPropagation();
                            }
                          }}
                          onAuxClick={(e) => {
                            // Prevent middle click
                            if (e.button === 1) {
                              e.preventDefault();
                              e.stopPropagation();
                            }
                          }}
                        >
                          <div
                            dangerouslySetInnerHTML={{
                              __html: selectedLesson.content.replace(
                                /<a\s+([^>]*?)>/gi,
                                (match, attrs) => {
                                  // Remove target="_blank" and add target="_self"
                                  const cleanAttrs = attrs
                                    .replace(/target\s*=\s*["']?[^"'\s]+["']?/gi, '')
                                    .replace(/rel\s*=\s*["']?[^"'\s]+["']?/gi, '');
                                  return `<a ${cleanAttrs} target="_self" rel="noopener noreferrer">`;
                                }
                              )
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )
              ) : (
                <div className="relative aspect-video bg-gradient-to-br from-slate-900 to-slate-800">
                  <img
                    src={course.thumbnailUrl || 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80'}
                    alt={course.title}
                    className="w-full h-full object-cover opacity-60"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80';
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-white text-lg mb-2">Select a lesson to start learning</p>
                      <p className="text-slate-400 text-sm">Choose a lesson from the sidebar</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Lesson Title */}
              {selectedLesson && (
                <div className="p-4 border-t border-slate-700">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <h2 className="text-xl font-bold text-white">{selectedLesson.title}</h2>
                      <div className="flex items-center gap-4 mt-2 text-sm text-slate-400">
                        <span className="flex items-center gap-1">
                          {getLessonTypeIcon(selectedLesson.type)}
                          {selectedLesson.type === 1 ? 'Video' :
                            selectedLesson.type === 2 ? 'Article' :
                              selectedLesson.type === 3 ? 'Quiz' :
                                selectedLesson.type === 4 ? 'Assignment' : 'Lesson'}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {formatDuration(selectedLesson.duration)}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={handleCompleteAndNext}
                      disabled={isCompleting || !courseData.enrollment}
                      className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition shadow-lg whitespace-nowrap ${nextLesson && !isCompleting
                          ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:from-violet-700 hover:to-purple-700 hover:shadow-violet-500/50'
                          : 'bg-slate-700 text-slate-300 hover:bg-slate-600 cursor-not-allowed'
                        }`}
                    >
                      {isCompleting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Đang xử lý...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-5 h-5" />
                          {nextLesson ? 'Hoàn thành và tiếp theo' : 'Đánh dấu hoàn thành'}
                          {nextLesson && <ArrowRight className="w-4 h-4" />}
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Tabs */}
            <div className="bg-slate-800 rounded-2xl border border-slate-700 shadow-lg overflow-hidden">
              <div className="flex border-b border-slate-700">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 px-6 py-4 font-semibold transition ${activeTab === tab
                        ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white'
                        : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
                      }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="p-8">
                {activeTab === 'Overview' && (
                  <div className="space-y-8">
                    {/* About This Course */}
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-2">
                        About this course
                      </h2>
                      <p className="text-slate-300">
                        {course.shortDescription}
                      </p>
                    </div>

                    {/* Description */}
                    <div>
                      <h3 className="text-xl font-bold text-white mb-4">
                        Description
                      </h3>
                      <div className="text-slate-300 leading-relaxed space-y-4">
                        {course.description.split('\n\n').map((paragraph, index) => (
                          <p key={index}>{paragraph}</p>
                        ))}
                      </div>
                    </div>

                    {/* What You'll Learn */}
                    <div>
                      <h3 className="text-xl font-bold text-white mb-4">
                        What You'll Learn
                      </h3>
                      <ul className="space-y-3">
                        {learningPoints.map((point, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <CheckCircle className="w-4 h-4 text-green-400" />
                            </div>
                            <span className="text-slate-300">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Requirements */}
                    {requirements.length > 0 && (
                      <div>
                        <h3 className="text-xl font-bold text-white mb-4">
                          Requirements
                        </h3>
                        <ul className="space-y-3">
                          {requirements.map((requirement, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-slate-500 rounded-full flex-shrink-0 mt-2" />
                              <span className="text-slate-300">{requirement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Target Audience */}
                    {course.targetAudience && (
                      <div>
                        <h3 className="text-xl font-bold text-white mb-4">
                          Target Audience
                        </h3>
                        <p className="text-slate-300 leading-relaxed">
                          {course.targetAudience}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'Notes' && (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Clock className="w-10 h-10 text-slate-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">No notes yet</h3>
                    <p className="text-slate-400">Start taking notes to remember important points</p>
                  </div>
                )}

                {activeTab === 'FAQ' && (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Clock className="w-10 h-10 text-slate-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">No FAQs available</h3>
                    <p className="text-slate-400">Check back later for frequently asked questions</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailView;