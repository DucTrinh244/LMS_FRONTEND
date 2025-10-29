// src/components/courses/EditCourse.tsx
import { ChevronLeft } from 'lucide-react';
import type { FC } from 'react';
import type { AddRequestCourseInstructor, Course, CourseEditInstructorRequest } from '~/module/instructor/types/CourseInstructor';

interface EditCourseProps {
  course: Course;
  onBack: () => void;
  onSave: (course: CourseEditInstructorRequest) => void;
}

export const EditCourse: FC<EditCourseProps> = ({ course, onBack, onSave }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={onBack}
            className="p-2 rounded-lg bg-slate-700/50 hover:bg-slate-600 text-slate-300 hover:text-white transition"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold text-white">Edit Course: {course.title}</h1>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <img
                src={course.image || 'https://via.placeholder.com/300x200'}
                alt={course.title}
                className="w-full h-48 object-cover rounded-xl"
              />
            </div>
            <div className="flex flex-col justify-center space-y-3">
              <p className="text-3xl font-bold text-violet-400">${course.price}</p>
              <p className="text-slate-300">{course.students} students enrolled</p>
              <div className="flex items-center gap-1">
                <span className="text-amber-400">Star</span>
                <span className="font-semibold text-white">{course.rating}</span>
                <span className="text-slate-400 text-sm">({course.reviews} reviews)</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <button className="w-full py-3 bg-violet-600 text-white rounded-lg font-medium hover:bg-violet-700 transition">
              Edit Content (Lessons, Quizzes)
            </button>
            <button className="w-full py-3 bg-slate-700 text-white rounded-lg font-medium hover:bg-slate-600 transition">
              Update Pricing & Settings
            </button>
            <button className="w-full py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition">
              Unpublish Course
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-700 flex gap-3">
            <button
              onClick={onBack}
              className="px-6 py-3 bg-slate-700 text-slate-300 rounded-lg font-medium hover:bg-slate-600 transition"
            >
              Back to List
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};