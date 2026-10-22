"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Loader2, Info } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function ServiceInquiryModal({ isOpen, onClose, serviceTitle, serviceDescription }) {
    const [formData, setFormData] = useState({ fullName: "", phone: "", message: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            const response = await fetch("https://formsubmit.co/ajax/info@steelage.ca", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    _subject: `New Service Inquiry: ${serviceTitle}`,
                    fullName: formData.fullName,
                    phone: formData.phone,
                    projectDetails: formData.message || "No details provided",
                    serviceType: serviceTitle
                }),
            });
            if (response.ok) {
                if (typeof window !== "undefined" && typeof window.gtag === "function") {
                    window.gtag("event", "generate_lead", {
                        form_name: "contact_form",
                    });
                }
                setIsSuccess(true);
            } else {
                throw new Error("Submission failed");
            }
        } catch (error) {
            console.error(error);
        }

        setIsSubmitting(false);
        setTimeout(() => {
            setIsSuccess(false);
            onClose();
            setFormData({ fullName: "", phone: "", message: "" });
        }, 3000);
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 20 }} 
                    animate={{ opacity: 1, scale: 1, y: 0 }} 
                    exit={{ opacity: 0, scale: 0.95, y: 20 }} 
                    className="relative w-full max-w-lg bg-white shadow-2xl overflow-hidden"
                >
                    {/* Header */}
                    <div className="bg-[#08171A] text-white p-5 border-b border-white/10 flex items-start justify-between relative">
                        <div className="flex-1 pr-4">
                            <h3 className="text-lg font-extrabold uppercase tracking-tight text-[#D3A15D] mb-1">
                                {serviceTitle || "Inquiry Form"}
                            </h3>
                            {serviceDescription && (
                                <p className="text-xs text-slate-300 leading-relaxed flex items-start gap-1.5">
                                    <Info className="w-3.5 h-3.5 mt-0.5 shrink-0 text-[#C89552]" />
                                    <span>{serviceDescription}</span>
                                </p>
                            )}
                        </div>
                        <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors" aria-label="Close modal">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="p-6">
                        {isSuccess ? (
                            <div className="py-10 text-center">
                                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Send className="w-8 h-8" />
                                </div>
                                <h4 className="text-lg font-bold text-slate-900 uppercase">Request Sent!</h4>
                                <p className="text-sm text-slate-500 mt-2">We will get back to you shortly regarding your {serviceTitle} inquiry.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase text-slate-900 mb-1">
                                        Full Name <span className="text-red-500">*</span>
                                    </label>
                                    <input required type="text" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} className="w-full px-4 py-2 bg-slate-50 border border-slate-300 text-sm focus:outline-none focus:border-[#C89552] focus:ring-1 focus:ring-[#C89552]" placeholder="e.g. John Doe" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-slate-900 mb-1">
                                        Phone Number <span className="text-red-500">*</span>
                                    </label>
                                    <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-2 bg-slate-50 border border-slate-300 text-sm focus:outline-none focus:border-[#C89552] focus:ring-1 focus:ring-[#C89552]" placeholder="e.g. 604-555-0199" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-slate-900 mb-1">
                                        Project Details
                                    </label>
                                    <textarea rows={3} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full px-4 py-2 bg-slate-50 border border-slate-300 text-sm focus:outline-none focus:border-[#C89552] focus:ring-1 focus:ring-[#C89552]" placeholder="Tell us a bit about what you're looking for..." />
                                </div>
                                
                                <Button type="submit" variant="primary" className="w-full bg-gradient-to-r from-[#C89552] to-[#B8803D] border-none py-3 mt-2" disabled={isSubmitting}>
                                    {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : "SUBMIT INQUIRY"}
                                </Button>
                            </form>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
