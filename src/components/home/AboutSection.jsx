"use client";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Building2, HardHat, ShieldCheck, CheckCircle2 } from "lucide-react";

export function AboutSection() {
    return (<section className="py-20 md:py-28 relative overflow-hidden bg-brand-dark text-white border-t border-brand-teal/20">
      
      {/* Subtle organic architectural background overlay */}
      <div className="absolute inset-0 bg-arch-grid opacity-15 pointer-events-none z-0"/>
      <div className="absolute -top-32 left-1/4 w-96 h-96 bg-brand-teal/10 rounded-full blur-3xl pointer-events-none z-0 animate-pulse-glow"/>
      <div className="absolute -bottom-32 right-1/4 w-96 h-96 bg-brand-accent/10 rounded-full blur-3xl pointer-events-none z-0"/>

      <Container size="wide" className="relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Narrative Column */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-teal/10 border border-brand-teal/30 text-brand-accent mb-5 shadow-sm">
                <Building2 className="w-3.5 h-3.5 text-brand-accent"/>
                <span className="text-[11px] font-black tracking-[0.2em] uppercase">
                  ABOUT US — STRUCTURAL EXCELLENCE & TRUST
                </span>
              </div>

              {/* Main Headline */}
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12] mb-5">
                Building spaces where{" "}
                <span className="text-brand-accent italic block sm:inline font-normal">
                  vision meets execution.
                </span>
              </h2>

              {/* Tagline */}
              <p className="text-lg sm:text-xl font-medium text-slate-200 mb-6 tracking-wide">
                Precision. Integrity. Built for commercial success.
              </p>

              {/* Paragraph */}
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl font-normal">
                At <strong className="text-brand-accent font-semibold">Steelage Construction Ltd.</strong>, we specialize in delivering high-performance commercial environments. From bespoke retail and office interiors to complex restaurant and medical build-outs, we bring technical expertise and unwavering dedication to every project across British Columbia.
              </p>

              {/* 3 Core Pillars Cards */}
              <div className="space-y-4 mb-8 border-t border-brand-teal/20 pt-6">
                
                {/* Pillar 1 */}
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#0B2025]/80 border border-brand-teal/20 transition-all hover:border-brand-teal/40 shadow-md">
                  <div className="w-11 h-11 rounded-xl bg-brand-teal/15 border border-brand-teal/30 flex items-center justify-center shrink-0 text-brand-accent shadow-sm">
                    <HardHat className="w-5 h-5"/>
                  </div>
                  <div>
                    <h4 className="text-xs font-black tracking-wider text-brand-accent uppercase mb-1">
                      EXPERT PROJECT MANAGEMENT
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      Seamless coordination from permitting to final handover, ensuring timelines and budgets are strictly met.
                    </p>
                  </div>
                </div>

                {/* Pillar 2 */}
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#0B2025]/80 border border-brand-teal/20 transition-all hover:border-brand-teal/40 shadow-md">
                  <div className="w-11 h-11 rounded-xl bg-brand-teal/15 border border-brand-teal/30 flex items-center justify-center shrink-0 text-brand-accent shadow-sm">
                    <CheckCircle2 className="w-5 h-5"/>
                  </div>
                  <div>
                    <h4 className="text-xs font-black tracking-wider text-brand-accent uppercase mb-1">
                      UNCOMPROMISING QUALITY
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      Rigorous quality control, premium materials, and master craftsmanship that stands the test of time.
                    </p>
                  </div>
                </div>

                {/* Pillar 3 */}
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#0B2025]/80 border border-brand-teal/20 transition-all hover:border-brand-teal/40 shadow-md">
                  <div className="w-11 h-11 rounded-xl bg-brand-teal/15 border border-brand-teal/30 flex items-center justify-center shrink-0 text-brand-accent shadow-sm">
                    <ShieldCheck className="w-5 h-5"/>
                  </div>
                  <div>
                    <h4 className="text-xs font-black tracking-wider text-brand-accent uppercase mb-1">
                      SAFETY & COMPLIANCE
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      Fully licensed, bonded, and insured. We navigate local building codes and health standards with ease.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Motto */}
            <div className="border-t border-brand-teal/20 pt-5 mt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs font-black tracking-[0.2em] text-slate-300 uppercase">
                  DELIVERING COMMERCIAL EXCELLENCE.
                </p>
                <p className="text-xs font-black tracking-[0.2em] text-brand-accent uppercase">
                  TRUSTED ACROSS THE LOWER MAINLAND.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Interior Photography */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-brand-teal/30 shadow-2xl bg-[#040A0C] p-3 sm:p-4">
              
              {/* Photo Frame Container */}
              <div className="relative w-full h-[480px] sm:h-[540px] rounded-2xl overflow-hidden group">
                <Image src="/images/projects/mucho-burrito-interior.jpg" alt="Steelage Construction - Premium Commercial Build-Out in Surrey BC" fill className="object-cover object-center transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 1024px) 100vw, 45vw" loading="lazy"/>
                
                {/* Natural Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#040A0C]/90 via-[#040A0C]/20 to-transparent"/>
                
                {/* Floating Authenticity Badge */}
                <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-[#040A0C]/85 backdrop-blur-md border border-brand-teal/40 flex items-center gap-2 shadow-lg">
                  <Building2 className="w-4 h-4 text-brand-accent"/>
                  <span className="text-[11px] font-extrabold text-brand-accent uppercase tracking-widest">
                    PREMIUM COMMERCIAL BUILDS
                  </span>
                </div>

                {/* Bottom Overlay Card */}
                <div className="absolute bottom-4 left-4 right-4 p-5 rounded-2xl bg-[#040A0C]/85 backdrop-blur-xl border border-brand-teal/30 shadow-xl">
                  <p className="text-xs font-black text-brand-accent uppercase tracking-wider mb-1">
                    CRAFTING HIGH-PERFORMANCE SPACES
                  </p>
                  <p className="text-xs text-slate-300">
                    Retail, Restaurant & Office build-outs by Steelage Commercial Contractors.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>

      </Container>
    </section>);
}
