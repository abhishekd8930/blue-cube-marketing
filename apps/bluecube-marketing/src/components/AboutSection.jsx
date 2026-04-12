import React from 'react';
import { Award, Scissors, Users } from 'lucide-react';

export default function AboutSection() {
  const features = [
    {
      icon: <Scissors className="w-6 h-6 text-blue-900" />,
      title: "Master Craftsmanship",
      description: "Every stitch is executed with precision, bringing together decades of experience and modern technology."
    },
    {
      icon: <Award className="w-6 h-6 text-blue-900" />,
      title: "Uncompromising Quality",
      description: "From fabric selection to the final pressing, our quality control ensures perfection in every garment."
    },
    {
      icon: <Users className="w-6 h-6 text-blue-900" />,
      title: "Generational Expertise",
      description: "Powered by the celebrated heritage of Sri Raghavendra Fashions, a name synonymous with trust in Bangalore."
    }
  ];

  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in opacity-0" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-sm font-semibold text-blue-900 uppercase tracking-widest mb-3">Our Heritage</h2>
          <p className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 tracking-tight">
            Powered by the expertise of <br className="hidden sm:block"/>
            <span className="text-blue-600">Sri Raghavendra Fashions</span>
          </p>
          <p className="text-lg text-gray-600 font-light leading-relaxed">
            Blue Cube isn't just a label; it is a commitment to excellence. Born from the rich manufacturing legacy of Bangalore's most trusted name, we bring enterprise-grade garment production to the modern market.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 mt-12 animate-fade-in opacity-0" style={{ animationDelay: '0.4s' }}>
          {features.map((feature, idx) => (
            <div key={idx} className="bg-gray-50 p-8 rounded-2xl hover:bg-gray-100 transition-colors group">
              <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 font-light leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
