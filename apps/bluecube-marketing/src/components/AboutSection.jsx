import React from 'react';
import { Award, Scissors, Users, CheckCircle2 } from 'lucide-react';

export default function AboutSection() {
  const features = [
    {
      icon: <Scissors className="w-6 h-6 text-primary-navy" />,
      title: "Master Craftsmanship",
      description: "Every stitch is executed with precision, bringing together decades of experience and modern technology."
    },
    {
      icon: <Award className="w-6 h-6 text-primary-navy" />,
      title: "Uncompromising Quality",
      description: "From fabric selection to the final pressing, our quality control ensures perfection in every garment."
    },
    {
      icon: <Users className="w-6 h-6 text-primary-navy" />,
      title: "Generational Expertise",
      description: "Powered by the celebrated heritage of Sri Raghavendra Fashions, a name synonymous with trust in Bangalore."
    }
  ];

  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-blue-50/50 rounded-full blur-3xl -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* Text Content */}
          <div className="animate-fade-in">
            <div className="flex items-center gap-x-2 mb-4">
              <span className="w-8 h-px bg-secondary-gold"></span>
              <span className="text-sm font-bold text-secondary-gold uppercase tracking-[0.2em]">Our Heritage</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 font-montserrat tracking-tight mb-8">
              Legacy of <span className="text-primary-navy">Sri Raghavendra Fashions</span>
            </h2>
            
            <p className="text-lg text-gray-600 font-light leading-relaxed mb-10">
              Blue Cube isn't just a label; it's a commitment to excellence. Born from the rich manufacturing legacy of Bangalore's most trusted name, we bring enterprise-grade garment production to the modern market.
            </p>

            <ul className="space-y-4 mb-10">
              {['Established 1998 in Bangalore', 'Over 1 Million Units Exported', 'Sustainable Manufacturing Practices'].map((item, i) => (
                <li key={i} className="flex items-center gap-x-3 text-gray-800 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-secondary-gold" />
                  {item}
                </li>
              ))}
            </ul>

            <button className="inline-flex items-center gap-x-2 py-3 px-6 rounded-sm bg-gray-100 text-gray-800 font-bold hover:bg-gray-200 transition-all text-sm">
              Read More About Us
            </button>
          </div>

          {/* Icon Grid (Preline Style) */}
          <div className="grid sm:grid-cols-2 gap-6 animate-fade-in">
            {features.map((feature, idx) => (
              <div key={idx} className={`p-8 border border-gray-100 rounded-sm hover:shadow-xl hover:border-primary-navy/10 transition-all group ${idx === 2 ? 'sm:col-span-2' : ''}`}>
                <div className="w-12 h-12 bg-blue-50 rounded-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 font-montserrat">{feature.title}</h3>
                <p className="text-gray-600 font-light leading-relaxed text-sm">{feature.description}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
