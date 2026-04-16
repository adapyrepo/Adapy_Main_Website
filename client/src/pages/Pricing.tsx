import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  User,
  Wrench,
  Store,
  FileText,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import { useSEO } from "@/hooks/use-seo";

const equipmentOptions = [
  "Wheelchair Lift",
  "Wheelchair Ramp",
  "Transfer Seat",
  "Hand Controls",
  "Pedal Extensions",
  "Steering Aids",
  "Left Foot Accelerator",
  "Wheelchair Securement System",
  "Scooter Lift",
  "Roof-Mounted Carrier",
  "Lowered Floor Conversion",
  "Other",
];

const vehicleTypes = [
  "Sedan",
  "SUV",
  "Minivan",
  "Full-Size Van",
  "Pickup Truck",
  "Commercial Vehicle",
  "Other",
];

const vehicleYears = [
  "2027", "2026", "2025", "2024", "2023", "2022", "2021",
  "2020", "2019", "2018", "2017", "2016", "2015", "2014",
  "2013", "2012", "2011", "2010", "2000-2009",
];

const howDidYouHear = [
  "Google Search",
  "Social Media",
  "Dealer Referral",
  "Friend or Family",
  "Trade Show or Event",
  "Online Article or Blog",
  "Other",
];

const steps = [
  { id: 1, label: "Contact Info", icon: User },
  { id: 2, label: "Your Vehicle & Equipment", icon: Wrench },
  { id: 3, label: "Dealer & Details", icon: Store },
  { id: 4, label: "Review & Submit", icon: FileText },
];

export default function Pricing() {
  useSEO({ title: "Adapy Pricing — Plans for Drivers, Dealers, and Fleets", description: "Custom pricing for individual drivers, mobility dealers, and NEMT fleets. Get a tailored quote for your vehicle or operation.", path: "/pricing" });
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [stepErrors, setStepErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    company: "",
    vehicle_type: "",
    vehicle_year_optional: "",
    vehicle_make_model_optional: "",
    equipment: [] as string[],
    equipment_other: "",
    _umber_of__ehicles: "",
    do_you_currently_work_with_a_mobility_dealer_required: "",
    _ealer__ame__conditional_: "",
    dealer_location: "",
    timeline_optional: "",
    how_did_you_hear_about_adapy_optional: "",
    anything_else_we_should_know: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (stepErrors[field]) {
      const updated = { ...stepErrors };
      delete updated[field];
      setStepErrors(updated);
    }
  };

  const toggleEquipment = (item: string) => {
    const current = formData.equipment;
    const updated = current.includes(item)
      ? current.filter((e) => e !== item)
      : [...current, item];
    setFormData({ ...formData, equipment: updated });
    if (stepErrors["equipment"]) {
      const errs = { ...stepErrors };
      delete errs["equipment"];
      setStepErrors(errs);
    }
  };

  const validateStep = (step: number): boolean => {
    const errors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.first_name.trim()) errors.first_name = "Required";
      if (!formData.last_name.trim()) errors.last_name = "Required";
      if (!formData.email.trim()) errors.email = "Required";
      if (!formData.phone.trim()) errors.phone = "Required";
    }

    if (step === 2) {
      if (!formData.vehicle_type) errors.vehicle_type = "Required";
      if (formData.equipment.length === 0) errors.equipment = "Select at least one";
    }

    if (step === 3) {
      if (!formData.do_you_currently_work_with_a_mobility_dealer_required) errors.do_you_currently_work_with_a_mobility_dealer_required = "Required";
    }

    setStepErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((s) => Math.min(s + 1, 4));
    }
  };

  const prevStep = () => {
    setStepErrors({});
    setCurrentStep((s) => Math.max(s - 1, 1));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError("");
    try {
      const equipmentList = formData.equipment.join(", ") +
        (formData.equipment_other ? `, ${formData.equipment_other}` : "");

      const response = await fetch(
        "https://omffhncmajcazsthtccn.supabase.co/functions/v1/api-lead-submit/customquote",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            _form_slug: "customquote",
            _api_key: "cd6003df2595f76b42ab4f200dd4d6a7da7d79a4728bdc6c845618b95cf88ffe",
            first_name: formData.first_name,
            last_name: formData.last_name,
            email: formData.email,
            phone: formData.phone,
            company: formData.company || "",
            vehicle_year_optional: formData.vehicle_year_optional || "",
            vehicle_make_model_optional: formData.vehicle_make_model_optional || "",
            _umber_of__ehicles: formData._umber_of__ehicles || "",
            adaptive_equipment: equipmentList,
            do_you_currently_work_with_a_mobility_dealer_required: formData.do_you_currently_work_with_a_mobility_dealer_required,
            _ealer__ame__conditional_: formData._ealer__ame__conditional_ || "",
            dealer_location: formData.dealer_location || "",
            timeline_optional: formData.timeline_optional || "",
            how_did_you_hear_about_adapy_optional: formData.how_did_you_hear_about_adapy_optional || "",
            anything_else_we_should_know: formData.anything_else_we_should_know || "",
          }),
        },
      );

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || "Something went wrong.");
      }

      setShowConfirmation(true);
      if (data.redirect_url) {
        window.setTimeout(() => {
          window.location.href = data.redirect_url;
        }, 2000);
      }
    } catch (error) {
      setSubmitError(
        error instanceof TypeError
          ? "Network request failed. Please try again."
          : error instanceof Error
            ? error.message
            : "Something went wrong.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-3 rounded-xl border ${stepErrors[field] ? "border-red-400" : "border-black/10"} focus:border-[#0071e3] focus:outline-none bg-white text-black`;

  const labelClass = "block text-sm font-bold text-black mb-2";

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-foreground font-sans selection:bg-black selection:text-white">
      <div className="absolute top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      <section className="pt-32 pb-12 px-6 bg-black text-white text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Get Your Custom Quote
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Tell us about your vehicle and equipment needs. We'll build a personalized quote and send it to you.
          </p>
        </motion.div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-12 px-4">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isComplete = currentStep > step.id;
              return (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                        isComplete
                          ? "bg-[#0071e3] text-white"
                          : isActive
                            ? "bg-black text-white"
                            : "bg-black/10 text-black/40"
                      }`}
                    >
                      {isComplete ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        <Icon className="w-5 h-5" />
                      )}
                    </div>
                    <span
                      className={`text-xs mt-2 font-medium whitespace-nowrap ${
                        isActive ? "text-black" : isComplete ? "text-[#0071e3]" : "text-black/40"
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div
                      className={`flex-1 h-[2px] mx-3 mt-[-18px] ${
                        currentStep > step.id ? "bg-[#0071e3]" : "bg-black/10"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-12 border border-black/[0.05] shadow-sm">
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-2xl font-bold text-black mb-2">Your Contact Information</h2>
                    <p className="text-black/60">We'll use this to send you your custom quote.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className={labelClass}>First Name *</label>
                      <input
                        data-testid="input-quote-first-name"
                        type="text"
                        placeholder="First Name"
                        value={formData.first_name}
                        onChange={(e) => handleChange("first_name", e.target.value)}
                        className={inputClass("first_name")}
                      />
                      {stepErrors.first_name && <p className="text-red-500 text-xs mt-1">{stepErrors.first_name}</p>}
                    </div>
                    <div>
                      <label className={labelClass}>Last Name *</label>
                      <input
                        data-testid="input-quote-last-name"
                        type="text"
                        placeholder="Last Name"
                        value={formData.last_name}
                        onChange={(e) => handleChange("last_name", e.target.value)}
                        className={inputClass("last_name")}
                      />
                      {stepErrors.last_name && <p className="text-red-500 text-xs mt-1">{stepErrors.last_name}</p>}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className={labelClass}>Email Address *</label>
                      <input
                        data-testid="input-quote-email"
                        type="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        className={inputClass("email")}
                      />
                      {stepErrors.email && <p className="text-red-500 text-xs mt-1">{stepErrors.email}</p>}
                    </div>
                    <div>
                      <label className={labelClass}>Phone Number *</label>
                      <input
                        data-testid="input-quote-phone"
                        type="tel"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        className={inputClass("phone")}
                      />
                      {stepErrors.phone && <p className="text-red-500 text-xs mt-1">{stepErrors.phone}</p>}
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Company Name (optional)</label>
                    <input
                      data-testid="input-quote-company"
                      type="text"
                      placeholder="Company Name (Optional)"
                      value={formData.company}
                      onChange={(e) => handleChange("company", e.target.value)}
                      className={inputClass("company")}
                    />
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-2xl font-bold text-black mb-2">Your Vehicle & Equipment</h2>
                    <p className="text-black/60">Tell us about your vehicle and what adaptive equipment you use or need.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className={labelClass}>Vehicle Type *</label>
                      <div className="relative">
                        <select
                          data-testid="select-vehicle-type"
                          value={formData.vehicle_type}
                          onChange={(e) => handleChange("vehicle_type", e.target.value)}
                          className={`${inputClass("vehicle_type")} appearance-none pr-10`}
                        >
                          <option value="">Select vehicle type</option>
                          {vehicleTypes.map((v) => (
                            <option key={v} value={v}>{v}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-black/40 pointer-events-none" />
                      </div>
                      {stepErrors.vehicle_type && <p className="text-red-500 text-xs mt-1">{stepErrors.vehicle_type}</p>}
                    </div>
                    <div>
                      <label className={labelClass}>Vehicle Year (optional)</label>
                      <div className="relative">
                        <select
                          data-testid="select-vehicle-year"
                          value={formData.vehicle_year_optional}
                          onChange={(e) => handleChange("vehicle_year_optional", e.target.value)}
                          className={`${inputClass("vehicle_year_optional")} appearance-none pr-10`}
                        >
                          <option value="">Select...</option>
                          {vehicleYears.map((y) => (
                            <option key={y} value={y}>{y}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-black/40 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Vehicle Make & Model (optional)</label>
                    <input
                      data-testid="input-vehicle-make-model"
                      type="text"
                      placeholder="Vehicle Make & Model (optional)"
                      value={formData.vehicle_make_model_optional}
                      onChange={(e) => handleChange("vehicle_make_model_optional", e.target.value)}
                      className={inputClass("vehicle_make_model_optional")}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Number of Vehicles</label>
                    <div className="relative">
                      <select
                        data-testid="select-num-vehicles"
                        value={formData._umber_of__ehicles}
                        onChange={(e) => handleChange("_umber_of__ehicles", e.target.value)}
                        className={`${inputClass("_umber_of__ehicles")} appearance-none pr-10`}
                      >
                        <option value="">Select...</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-black/40 pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Adaptive Equipment *</label>
                    <p className="text-black/50 text-sm mb-3">Select all that apply</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {equipmentOptions.map((item) => {
                        const selected = formData.equipment.includes(item);
                        return (
                          <button
                            key={item}
                            data-testid={`button-equipment-${item.toLowerCase().replace(/\s+/g, "-")}`}
                            type="button"
                            onClick={() => toggleEquipment(item)}
                            className={`px-4 py-3 rounded-xl text-sm font-medium border transition-all text-left ${
                              selected
                                ? "bg-[#0071e3] text-white border-[#0071e3]"
                                : "bg-[#f5f5f7] text-black border-black/10 hover:border-black/20"
                            }`}
                          >
                            {item}
                          </button>
                        );
                      })}
                    </div>
                    {stepErrors.equipment && <p className="text-red-500 text-xs mt-2">{stepErrors.equipment}</p>}
                  </div>
                  {formData.equipment.includes("Other") && (
                    <div>
                      <label className={labelClass}>Please specify other equipment</label>
                      <input
                        data-testid="input-equipment-other"
                        type="text"
                        placeholder="Describe your equipment"
                        value={formData.equipment_other}
                        onChange={(e) => handleChange("equipment_other", e.target.value)}
                        className={inputClass("equipment_other")}
                      />
                    </div>
                  )}
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-2xl font-bold text-black mb-2">Dealer & Additional Details</h2>
                    <p className="text-black/60">Help us understand your current setup and how we can best serve you.</p>
                  </div>
                  <div>
                    <label className={labelClass}>Do you currently work with a mobility dealer? *</label>
                    <div className="flex gap-4">
                      {["Yes", "No"].map((opt) => (
                        <button
                          key={opt}
                          data-testid={`button-has-dealer-${opt.toLowerCase()}`}
                          type="button"
                          onClick={() => handleChange("do_you_currently_work_with_a_mobility_dealer_required", opt)}
                          className={`px-6 py-3 rounded-xl font-medium border transition-all ${
                            formData.do_you_currently_work_with_a_mobility_dealer_required === opt
                              ? "bg-black text-white border-black"
                              : "bg-[#f5f5f7] text-black border-black/10 hover:border-black/20"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                    {stepErrors.do_you_currently_work_with_a_mobility_dealer_required && <p className="text-red-500 text-xs mt-2">{stepErrors.do_you_currently_work_with_a_mobility_dealer_required}</p>}
                  </div>
                  {formData.do_you_currently_work_with_a_mobility_dealer_required === "Yes" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className={labelClass}>Mobility Dealer Name</label>
                        <input
                          data-testid="input-dealer-name"
                          type="text"
                          placeholder="Name of your mobility dealer"
                          value={formData._ealer__ame__conditional_}
                          onChange={(e) => handleChange("_ealer__ame__conditional_", e.target.value)}
                          className={inputClass("_ealer__ame__conditional_")}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Mobility Dealer Location</label>
                        <input
                          data-testid="input-dealer-location"
                          type="text"
                          placeholder="Mobility Dealer Location"
                          value={formData.dealer_location}
                          onChange={(e) => handleChange("dealer_location", e.target.value)}
                          className={inputClass("dealer_location")}
                        />
                      </div>
                    </div>
                  )}
                  <div>
                    <label className={labelClass}>Timeline (optional)</label>
                    <div className="relative">
                      <select
                        data-testid="select-timeline"
                        value={formData.timeline_optional}
                        onChange={(e) => handleChange("timeline_optional", e.target.value)}
                        className={`${inputClass("timeline_optional")} appearance-none pr-10`}
                      >
                        <option value="">Select timeline</option>
                        <option value="Immediately">Immediately</option>
                        <option value="Within 1 month">Within 1 month</option>
                        <option value="1-3 months">1-3 months</option>
                        <option value="3-6 months">3-6 months</option>
                        <option value="Just exploring">Just exploring</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-black/40 pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>How did you hear about Adapy? (optional)</label>
                    <div className="relative">
                      <select
                        data-testid="select-how-heard"
                        value={formData.how_did_you_hear_about_adapy_optional}
                        onChange={(e) => handleChange("how_did_you_hear_about_adapy_optional", e.target.value)}
                        className={`${inputClass("how_did_you_hear_about_adapy_optional")} appearance-none pr-10`}
                      >
                        <option value="">Select one</option>
                        {howDidYouHear.map((h) => (
                          <option key={h} value={h}>{h}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-black/40 pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Anything else we should know?</label>
                    <textarea
                      data-testid="textarea-notes"
                      value={formData.anything_else_we_should_know}
                      onChange={(e) => handleChange("anything_else_we_should_know", e.target.value)}
                      placeholder="Questions, special requirements, or anything else..."
                      className={`${inputClass("anything_else_we_should_know")} min-h-[100px]`}
                    />
                  </div>
                </motion.div>
              )}

              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  <div>
                    <h2 className="text-2xl font-bold text-black mb-2">Review Your Information</h2>
                    <p className="text-black/60">Please confirm everything looks correct before submitting.</p>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-[#f5f5f7] rounded-2xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-black flex items-center gap-2">
                          <User className="w-4 h-4 text-[#0071e3]" /> Contact Info
                        </h3>
                        <button
                          data-testid="button-edit-step-1"
                          type="button"
                          onClick={() => setCurrentStep(1)}
                          className="text-[#0071e3] text-sm font-medium hover:underline"
                        >
                          Edit
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div><span className="text-black/50">Name:</span> <span className="text-black font-medium">{formData.first_name} {formData.last_name}</span></div>
                        <div><span className="text-black/50">Email:</span> <span className="text-black font-medium">{formData.email}</span></div>
                        <div><span className="text-black/50">Phone:</span> <span className="text-black font-medium">{formData.phone}</span></div>
                        {formData.company && <div><span className="text-black/50">Company:</span> <span className="text-black font-medium">{formData.company}</span></div>}
                      </div>
                    </div>

                    <div className="bg-[#f5f5f7] rounded-2xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-black flex items-center gap-2">
                          <Wrench className="w-4 h-4 text-[#0071e3]" /> Vehicle & Equipment
                        </h3>
                        <button
                          data-testid="button-edit-step-2"
                          type="button"
                          onClick={() => setCurrentStep(2)}
                          className="text-[#0071e3] text-sm font-medium hover:underline"
                        >
                          Edit
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div><span className="text-black/50">Vehicle:</span> <span className="text-black font-medium">{formData.vehicle_type}{formData.vehicle_year_optional ? ` (${formData.vehicle_year_optional})` : ""}</span></div>
                        {formData.vehicle_make_model_optional && <div><span className="text-black/50">Make/Model:</span> <span className="text-black font-medium">{formData.vehicle_make_model_optional}</span></div>}
                        {formData._umber_of__ehicles && <div><span className="text-black/50">Vehicles:</span> <span className="text-black font-medium">{formData._umber_of__ehicles}</span></div>}
                      </div>
                      <div className="mt-4">
                        <span className="text-black/50 text-sm">Equipment: </span>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {formData.equipment.map((e) => (
                            <span key={e} className="px-3 py-1 bg-[#0071e3]/10 text-[#0071e3] rounded-full text-xs font-medium">
                              {e}
                            </span>
                          ))}
                          {formData.equipment_other && (
                            <span className="px-3 py-1 bg-[#0071e3]/10 text-[#0071e3] rounded-full text-xs font-medium">
                              {formData.equipment_other}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#f5f5f7] rounded-2xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-black flex items-center gap-2">
                          <Store className="w-4 h-4 text-[#0071e3]" /> Dealer & Details
                        </h3>
                        <button
                          data-testid="button-edit-step-3"
                          type="button"
                          onClick={() => setCurrentStep(3)}
                          className="text-[#0071e3] text-sm font-medium hover:underline"
                        >
                          Edit
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div><span className="text-black/50">Has dealer:</span> <span className="text-black font-medium">{formData.do_you_currently_work_with_a_mobility_dealer_required}</span></div>
                        {formData._ealer__ame__conditional_ && <div><span className="text-black/50">Dealer:</span> <span className="text-black font-medium">{formData._ealer__ame__conditional_}</span></div>}
                        {formData.dealer_location && <div><span className="text-black/50">Location:</span> <span className="text-black font-medium">{formData.dealer_location}</span></div>}
                        {formData.timeline_optional && <div><span className="text-black/50">Timeline:</span> <span className="text-black font-medium">{formData.timeline_optional}</span></div>}
                        {formData.how_did_you_hear_about_adapy_optional && <div><span className="text-black/50">Heard from:</span> <span className="text-black font-medium">{formData.how_did_you_hear_about_adapy_optional}</span></div>}
                      </div>
                      {formData.anything_else_we_should_know && (
                        <div className="mt-4 text-sm">
                          <span className="text-black/50">Notes:</span>
                          <p className="text-black font-medium mt-1">{formData.anything_else_we_should_know}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-center justify-between mt-10 pt-8 border-t border-black/[0.05]">
              {currentStep > 1 ? (
                <button
                  data-testid="button-prev-step"
                  type="button"
                  onClick={prevStep}
                  className="flex items-center gap-2 px-6 py-3 text-black/60 font-medium hover:text-black transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
              ) : (
                <div />
              )}

              {currentStep < 4 ? (
                <button
                  data-testid="button-next-step"
                  type="button"
                  onClick={nextStep}
                  className="flex items-center gap-2 px-8 py-3 bg-black text-white rounded-full font-bold hover:bg-black/80 transition-all"
                >
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  data-testid="button-submit-quote"
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-8 py-3 bg-[#0071e3] text-white rounded-full font-bold hover:bg-[#0077ed] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>Submit Quote Request <ArrowRight className="w-4 h-4" /></>
                  )}
                </button>
              )}
            </div>

            {submitError && (
              <p data-testid="text-submit-error" className="text-sm text-red-600 text-center mt-4">{submitError}</p>
            )}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {showConfirmation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[300] flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl p-8 md:p-12 max-w-lg w-full text-center shadow-2xl"
            >
              <div className="w-20 h-20 rounded-full bg-[#0071e3]/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-[#0071e3]" />
              </div>
              <h2 className="text-3xl font-bold text-black mb-4">
                Quote Request Received!
              </h2>
              <p className="text-black/60 text-lg mb-3">
                Thank you, {formData.first_name}! Our team is reviewing your information and will send you a personalized quote soon.
              </p>
              <p className="text-black/50 text-sm mb-8">
                You'll receive your quote at <strong className="text-black">{formData.email}</strong> within 1-2 business days.
              </p>
              <button
                data-testid="button-confirmation-close"
                type="button"
                onClick={() => {
                  setShowConfirmation(false);
                  window.location.href = "/";
                }}
                className="px-8 py-3 bg-black text-white rounded-full font-bold hover:bg-black/80 transition-all"
              >
                Back to Home
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
