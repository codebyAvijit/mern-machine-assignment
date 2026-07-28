const { z } = require("zod");

// Indian mobile/contact number:
// exactly 10 digits and must start with 6, 7, 8, or 9
const indianPhoneRegex = /^[6-9]\d{9}$/;

const optionalIndianPhone = z
  .string()
  .trim()
  .refine(
    (value) => !value || indianPhoneRegex.test(value),
    "Enter a valid 10-digit Indian number",
  )
  .optional();

const registerUserSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "Name is required")
      .max(25, "Name cannot exceed 25 characters"),

    gender: z.enum(["Male", "Female"]),

    dateOfBirth: z
      .string()
      .trim()
      .min(1, "Date of birth is required")
      .refine((value) => {
        const date = new Date(value);

        return !Number.isNaN(date.getTime());
      }, "Invalid date of birth")
      .refine((value) => {
        const date = new Date(value);
        const today = new Date();

        return date <= today;
      }, "Date of birth cannot be in the future"),

    email: z
      .string()
      .trim()
      .max(25, "Email cannot exceed 25 characters")
      .refine(
        (value) => !value || z.email().safeParse(value).success,
        "Invalid email address",
      )
      .optional(),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(50, "Password cannot exceed 50 characters"),

    mobile: optionalIndianPhone,

    phone: optionalIndianPhone,

    stateId: z.string().trim().min(1, "State is required"),

    city: z.string().trim().optional(),

    hobbies: z.preprocess(
      (value) => {
        // No hobby selected
        if (!value) {
          return [];
        }

        // Multiple hobbies from FormData
        if (Array.isArray(value)) {
          return value;
        }

        // Single hobby from FormData
        return [value];
      },
      z.array(z.enum(["Chess", "Cricket", "Football", "Hockey"])),
    ),
  })
  .refine((data) => Boolean(data.mobile || data.phone), {
    message: "Either mobile or phone is required",
    path: ["mobile"],
  });

module.exports = {
  registerUserSchema,
};
