import { Award, Calendar, CheckCircle, Download, FileText, Share2 } from 'lucide-react';

const MyCertificatesContent = () => {
  const certificates = [
    {
      id: 1,
      course: 'Wordpress for Beginners - Master Wordpress Quickly',
      instructor: 'Ana Reyes',
      issueDate: '2024-01-10',
      certificateId: 'CERT-2024-001',
      image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=600&q=80'
    },
    {
      id: 2,
      course: 'Build Responsive Real World Websites',
      instructor: 'John Smith',
      issueDate: '2024-01-05',
      certificateId: 'CERT-2024-002',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80'
    },
    {
      id: 3,
      course: 'Complete Python Bootcamp',
      instructor: 'Michael Chen',
      issueDate: '2023-12-20',
      certificateId: 'CERT-2023-045',
      image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=600&q=80'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">My Certificates</h2>
            <p className="text-slate-300">View and download your earned certificates</p>
          </div>
          <div className="flex items-center gap-2 bg-violet-600/20 text-violet-400 px-4 py-2 rounded-lg">
            <Award className="w-5 h-5" />
            <span className="font-semibold">{certificates.length} Certificates</span>
          </div>
        </div>
      </div>

      {/* Certificates Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((certificate) => (
          <div
            key={certificate.id}
            className="group relative bg-slate-800 rounded-xl border border-slate-700 overflow-hidden hover:shadow-lg hover:shadow-violet-500/50 transition"
          >
            {/* Certificate Preview */}
            <div className="relative h-48 bg-gradient-to-br from-violet-900/50 to-purple-900/50 flex items-center justify-center">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=600&q=80')] opacity-20 bg-cover bg-center" />
              <Award className="w-20 h-20 text-violet-400/50" />
              <div className="absolute top-3 right-3">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
            </div>

            {/* Certificate Info */}
            <div className="p-5">
              <div className="mb-3">
                <h4 className="text-white font-bold mb-2 line-clamp-2 group-hover:text-violet-400 transition">
                  {certificate.course}
                </h4>
                <p className="text-sm text-slate-400 mb-1">Instructor: {certificate.instructor}</p>
              </div>

              <div className="space-y-2 mb-4 text-sm">
                <div className="flex items-center gap-2 text-slate-400">
                  <Calendar className="w-4 h-4" />
                  <span>Issued: {new Date(certificate.issueDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <FileText className="w-4 h-4" />
                  <span className="font-mono text-xs">{certificate.certificateId}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-4 border-t border-slate-700">
                <button className="flex-1 bg-gradient-to-r from-violet-600 to-purple-600 text-white px-4 py-2.5 rounded-lg font-semibold hover:shadow-violet-500/50 transition flex items-center justify-center gap-2 text-sm">
                  <Download className="w-4 h-4" />
                  Download
                </button>
                <button className="bg-slate-700 text-slate-300 px-4 py-2.5 rounded-lg font-semibold hover:bg-slate-600 transition">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {certificates.length === 0 && (
        <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-md p-12 text-center">
          <Award className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">No certificates yet</h3>
          <p className="text-slate-400 mb-6">Complete courses to earn certificates!</p>
          <button className="bg-gradient-to-r from-violet-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-violet-500/50 transition">
            Browse Courses
          </button>
        </div>
      )}
    </div>
  );
};

export default MyCertificatesContent;