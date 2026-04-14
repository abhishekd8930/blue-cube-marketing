import React from 'react';
import { Scissors, Award, Users } from 'lucide-react';

export default function AboutSection() {
  const features = [
    {
      icon: <Scissors className="w-5 h-5" />,
      title: "Master Craftsmanship",
      description: "Every stitch is executed with precision, bringing together decades of experience and modern technology."
    },
    {
      icon: <Award className="w-5 h-5" />,
      title: "Uncompromising Quality",
      description: "From fabric selection to the final pressing, our quality control ensures perfection in every garment."
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "Generational Expertise",
      description: "Powered by the celebrated heritage of Sri Raghavendra Fashions, a name synonymous with trust in Bangalore."
    }
  ];

  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Centered Heading Section */}
        <div className="text-center max-w-4xl mx-auto mb-20 animate-fade-in">
          <p className="text-[10px] font-bold text-accent-blue uppercase tracking-[0.4em] mb-6 inline-block py-1 border-b border-accent-blue/20">
            Our Heritage
          </p>
          
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 font-montserrat tracking-tight mb-10 leading-[1.15]">
            Powered by the expertise of <br />
            <span className="text-accent-blue">Sri Raghavendra Fashions</span>
          </h2>
          
          <p className="text-[17px] text-gray-400 font-medium leading-[1.8] max-w-3xl mx-auto">
            Blue Cube isn't just a label; it's a commitment to excellence. Born from the rich manufacturing legacy <br className="hidden md:block" />
            of Bangalore's most trusted name, we bring enterprise-grade garment production to the modern market.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8 animate-fade-in">
          {features.map((feature, idx) => (
            <div key={idx} className="p-10 bg-gray-50/50 rounded-2xl border border-gray-100 hover:bg-white hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.06)] transition-all duration-500 group">
              <div className="w-14 h-14 bg-white shadow-sm border border-gray-100 rounded-xl flex items-center justify-center mb-8 group-hover:bg-accent-blue group-hover:border-accent-blue transition-all duration-500">
                 {React.cloneElement(feature.icon, { className: `w-6 h-6 transition-colors duration-500 text-accent-blue group-hover:text-white` })}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-5 font-montserrat tracking-tight leading-tight">{feature.title}</h3>
              <p className="text-gray-400 font-medium leading-[1.7] text-[15px]">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
