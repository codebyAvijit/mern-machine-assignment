const { z } = require("zod");

const registerUserSchema = z
    .object({
        name: z
            .string()
            .trim()
            .min(1, "Name is required")
            .max(25, "Name cannot exceed 25 characters"),

        gender: z.enum(["Male", "Female"], {
            message: "Gender must be Male or Female",
        }),

        dateOfBirth: z
            .string()
            .trim()
            .regex(
                /^\d{2}\/\d{2}\/\d{4}$/,
                "Date of birth must be in dd/mm/yyyy format"
            )
            .refine((value) => {
                const [day, month, year] = value.split("/").map(Number);
                const date = new Date(year, month - 1, day);

                return (
                    date.getFullYear() === year &&
                    date.getMonth() === month - 1 &&
                    date.getDate() === day
                );
            }, "Invalid date of birth")
            .transform((value) => {
                const [day, month, year] = value.split("/").map(Number);
                return new Date(year, month - 1, day);
            }),

        email: z
            .string()
            .trim()
            .refine(
                (value) => !value || z.email().safeParse(value).success,
                "Invalid email address"
            )
            .optional(),

        mobile: z.string().trim().optional(),

        phone: z.string().trim().optional(),

        stateId: z
            .string()
            .trim()
            .min(1, "State is required"),

        city: z
            .string()
            .trim()
            .min(1, "City is required"),

        hobbies: z
            .array(
                z.enum(["Chess", "Cricket", "Football", "Hockey"])
            )
            .optional()
            .default([]),
    })
    .refine(
        (data) => Boolean(data.mobile || data.phone),
        {
            message: "Either mobile or phone is required",
            path: ["mobile"],
        }
    );

module.exports = {
    registerUserSchema,
};