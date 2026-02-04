"use client";

import { submitContactForm } from "@/app/(home)/contact-us/actions";
import { LoadingButton } from "@/components/ui/button";
import { contactSchema } from "@/lib/schemas/contact";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useRef, useState, useTransition } from "react";
import { toast } from "sonner";

type FieldErrors = Record<string, string>;

interface FloatingInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

function FloatingInput({
  label,
  error,
  className,
  id,
  ...props
}: FloatingInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  return (
    <div className="relative">
      <input
        id={id}
        className={cn(
          "peer w-full bg-transparent border-0 border-b-2 border-border px-0 py-3 text-foreground placeholder-transparent transition-colors focus:outline-none focus:border-primary",
          error && "border-destructive focus:border-destructive",
          className
        )}
        placeholder={label}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          setHasValue(!!e.target.value);
        }}
        onChange={(e) => setHasValue(!!e.target.value)}
        aria-invalid={!!error}
        {...props}
      />
      <label
        htmlFor={id}
        className={cn(
          "absolute left-0 text-muted-foreground transition-all duration-200 pointer-events-none",
          isFocused || hasValue || props.value
            ? "-top-2 text-xs"
            : "top-3 text-base",
          isFocused && "text-primary",
          error && "text-destructive"
        )}
      >
        {label}
      </label>
      {error && <p className="text-destructive text-sm mt-2">{error}</p>}
    </div>
  );
}

interface FloatingTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

function FloatingTextarea({
  label,
  error,
  className,
  id,
  ...props
}: FloatingTextareaProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  return (
    <div className="relative">
      <textarea
        id={id}
        className={cn(
          "peer w-full bg-transparent border-0 border-b-2 border-border px-0 py-3 text-foreground placeholder-transparent transition-colors focus:outline-none focus:border-primary resize-none",
          error && "border-destructive focus:border-destructive",
          className
        )}
        placeholder={label}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          setHasValue(!!e.target.value);
        }}
        onChange={(e) => setHasValue(!!e.target.value)}
        aria-invalid={!!error}
        {...props}
      />
      <label
        htmlFor={id}
        className={cn(
          "absolute left-0 text-muted-foreground transition-all duration-200 pointer-events-none",
          isFocused || hasValue || props.value
            ? "-top-2 text-xs"
            : "top-3 text-base",
          isFocused && "text-primary",
          error && "text-destructive"
        )}
      >
        {label}
      </label>
      {error && <p className="text-destructive text-sm mt-2">{error}</p>}
    </div>
  );
}

export function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const [errors, setErrors] = useState<FieldErrors>({});
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(formData: FormData) {
    setErrors({});

    const rawData = {
      name: formData.get("name")?.toString() || "",
      email: formData.get("email")?.toString() || "",
      phone: formData.get("phone")?.toString() || "",
      subject: formData.get("subject")?.toString() || "",
      message: formData.get("message")?.toString() || "",
    };

    const result = contactSchema.safeParse(rawData);

    if (!result.success) {
      const fieldErrors: FieldErrors = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as string;
        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      }
      setErrors(fieldErrors);
      toast.error("Please fill in all required fields and try again.");
      return;
    }

    startTransition(async () => {
      try {
        const serverResult = await submitContactForm(formData);
        if (serverResult.success) {
          toast.success(serverResult.message);
          formRef.current?.reset();
          setErrors({});
        } else {
          if (serverResult.errors) {
            setErrors(serverResult.errors);
          }
          toast.error(serverResult.message);
        }
      } catch (error) {
        console.error(error);
        toast.error("An unexpected error occurred. Please try again.");
      }
    });
  }

  return (
    <form ref={formRef} action={handleSubmit}>
      <div className="space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <FloatingInput
              id="name"
              name="name"
              type="text"
              label="Name *"
              error={errors.name}
              disabled={isPending}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <FloatingInput
              id="email"
              name="email"
              type="email"
              label="Email *"
              error={errors.email}
              disabled={isPending}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <FloatingInput
              id="phone"
              name="phone"
              type="tel"
              label="Phone"
              error={errors.phone}
              disabled={isPending}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <FloatingInput
              id="subject"
              name="subject"
              type="text"
              label="Subject"
              error={errors.subject}
              disabled={isPending}
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <FloatingTextarea
            id="message"
            name="message"
            label="Message *"
            rows={4}
            error={errors.message}
            disabled={isPending}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="pt-4"
        >
          <LoadingButton
            type="submit"
            size="lg"
            className="w-full md:w-auto px-12"
            isLoading={isPending}
            loadingText="Sending..."
          >
            Send Message
          </LoadingButton>
        </motion.div>
      </div>
    </form>
  );
}
