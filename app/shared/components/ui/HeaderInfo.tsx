import { X } from 'lucide-react';

type BreadcrumbItem = {
  label: string;
  href?: string;
};

interface CourseGridHeaderProps {
  title?: string;
  breadcrumb?: BreadcrumbItem[];
}

const HeaderInfo = ({ title = "Name__Name", breadcrumb = [] }: CourseGridHeaderProps) => {
  return (
    <div className="relative bg-gradient-to-r from-violet-900/50 via-purple-900/50 to-slate-900 py-16 px-4">
      {/* Nút đóng */}
      <button className="absolute top-4 right-4 w-10 h-10 bg-slate-700/50 backdrop-blur-xl border border-slate-600 rounded-full flex items-center justify-center hover:bg-violet-600/50 transition">
        <X className="w-5 h-5 text-white" />
      </button>

      {/* Nội dung */}
      <div className="container mx-auto text-center">
        {/* Tiêu đề */}
        <h1 className="text-3xl lg:text-4xl font-bold text-white mb-3">{title}</h1>

        {/* Breadcrumb */}
        <div className="flex items-center justify-center gap-2 text-slate-400">
          {breadcrumb.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              {item.href ? (
                <a href={item.href} className="hover:text-violet-400 transition">{item.label}</a>
              ) : (
                <span className="font-medium">{item.label}</span>
              )}
              {index < breadcrumb.length - 1 && (
                <div className="w-2 h-0.5 bg-violet-400"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeaderInfo;
