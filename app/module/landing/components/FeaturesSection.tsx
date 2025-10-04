import { Award, CheckCircle, Globe, Video } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Expert Instructors',
      description: 'Learn from industry professionals with years of experience',
      color: 'from-violet-500 to-purple-500'
    },
    {
      icon: <Video className="w-6 h-6" />,
      title: 'HD Video Lessons',
      description: 'High-quality video content for better learning experience',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: 'Certification',
      description: 'Get recognized certificates upon course completion',
      color: 'from-emerald-500 to-teal-500'
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: 'Lifetime Access',
      description: 'Access your courses anytime, anywhere, forever',
      color: 'from-orange-500 to-amber-500'
    }
  ];

  return (
    <section className="py-20 px-4 bg-slate-900/50">
      <div className="container mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Why Choose Our Platform?
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Everything you need to succeed in your learning journey
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-2xl p-6 hover:border-violet-500/50 transition group"
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4 text-white group-hover:scale-110 transition`}>
                {feature.icon}
              </div>
              <h3 className="text-white text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;