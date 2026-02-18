import React, { useRef, useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import emailjs from "@emailjs/browser";
import { toast, Toaster } from "sonner";
import { useTranslations } from "../../i18n/utils";

export default function HomeFooter({
  className = "text-secondary",
  buttonClass = "lightPink",
  language = "es",
}) {
  const t = useTranslations(language);
  const formSchema = useFormSchema(t);
  const formRef = useRef(null);

  function useFormSchema(t) {
    return useMemo(
      () =>
        z.object({
          firstName: z.string().min(2, t("form.firstName.error")),
          lastName: z.string().min(2, t("form.lastName.error")),
          company: z.string().min(2, t("form.company.error")),
          phone: z
            .string()
            .min(10, t("form.phone.error"))
            .refine(
              (val) => !val || /^\+?[\d\s-]{10,}$/.test(val),
              t("form.phone.error")
            ),
          email: z.string().email(t("form.email.error")),
          title: z.string().min(2, t("form.title.error")),
          message: z.string().min(10, t("form.message.error")),
        }),
      []
    );
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      company: "",
      phone: "",
      email: "",
      title: "",
      message: "",
    },
    mode: "onSubmit",
  });

  const onSubmit = async (data) => {
    if (!formRef.current) return;
    try {
      await emailjs.sendForm(
        import.meta.env.PUBLIC_EMAILJS_SERVICE_ID,
        import.meta.env.PUBLIC_EMAILJS_TEMPLATE_ID,
        formRef.current,
        { publicKey: import.meta.env.PUBLIC_EMAILJS_PUBLIC_KEY }
      );
      toast.success(t("footer.form.success.title.success"), {
        description: t("footer.form.success"),
      });
      reset();
    } catch {
      toast.error(t("footer.form.success.title.fail"), {
        description: t("footer.form.error"),
      });
    }
  };

  const inputClasses =
    "w-full bg-transparent border-b border-brown/50 py-2 text-xl lg:text-3xl text-primary focus:outline-none focus:border-brown transition-colors placeholder:text-transparent";
  const labelClasses = "text-xl lg:text-3xl font-semibold text-brown/70 mb-2 block";
  const errorClasses = "text-sm lg:text-xl text-red-900 mt-1 absolute";

  return (
    <div className="w-full mt-7 mb-7 lg:mt-0 lg:mb-0 z-50">
      <Toaster client:idle />

      <form
        ref={formRef}
        onSubmit={handleSubmit(onSubmit)}
        className={`w-full mx-auto p-4 ${className}`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          {/* First Name */}
          <div className="relative">
            <label className={labelClasses}>{t("form.firstNameLabel")}</label>
            <input
              {...register("firstName")}
              className={inputClasses}
            />
            {errors.firstName && (
              <p className={errorClasses}>{errors.firstName.message}</p>
            )}
          </div>

          {/* Last Name */}
          <div className="relative">
            <label className={labelClasses}>{t("form.lastNameLabel")}</label>
            <input
              {...register("lastName")}
              className={inputClasses}
            />
            {errors.lastName && (
              <p className={errorClasses}>{errors.lastName.message}</p>
            )}
          </div>

          {/* Company Name */}
          <div className="relative">
            <label className={labelClasses}>{t("form.companyLabel")}</label>
            <input
              {...register("company")}
              className={inputClasses}
            />
            {errors.company && (
              <p className={errorClasses}>{errors.company.message}</p>
            )}
          </div>

          {/* Phone Number */}
          <div className="relative">
            <label className={labelClasses}>{t("form.phoneLabel")}</label>
            <input
              {...register("phone")}
              className={inputClasses}
            />
            {errors.phone && ( // Phone is optional in schema but good to have error field ready if schema changes
              <p className={errorClasses}>{errors.phone.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="relative">
            <label className={labelClasses}>{t("form.emailLabel")}</label>
            <input
              {...register("email")}
              className={inputClasses}
            />
            {errors.email && (
              <p className={errorClasses}>{errors.email.message}</p>
            )}
          </div>

          {/* Title */}
          <div className="relative">
            <label className={labelClasses}>{t("form.titleLabel")}</label>
            <input
              {...register("title")}
              className={inputClasses}
            />
            {errors.title && (
              <p className={errorClasses}>{errors.title.message}</p>
            )}
          </div>

          {/* Comments - Full Width */}
          <div className="col-span-1 md:col-span-2 relative mt-4">
            <label className={labelClasses}>{t("form.commentsLabel")}</label>
            <textarea
              {...register("message")}
              rows={1}
              className={`${inputClasses} resize-none`}
              onInput={(e) => {
                e.target.style.height = "auto";
                e.target.style.height = e.target.scrollHeight + "px";
              }}
            />
            {errors.message && (
              <p className={errorClasses}>{errors.message.message}</p>
            )}
          </div>
        </div>

        {/* Hidden inputs are not strictly necessary if EmailJS template is updated to use new field names: 
            firstName, lastName, company, phone, email, title, message. 
        */}

        <div className="flex justify-end mt-12">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`rounded-full px-12 py-3 lg:px-16 lg:py-4 bg-[#4A4135] text-[#E8E0D5] text-xl lg:text-4xl font-medium hover:bg-[#3d352b] transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? t("form.sending") : t("form.button")}
          </button>
        </div>
      </form>
    </div>
  );
}
