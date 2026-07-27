const { z } = require("zod");

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
            .min(1, "Date of birth is required"),

        email: z
            .string()
            .trim()
            .refine(
                (value) =>
                    !value ||
                    z.email().safeParse(value).success,
                "Invalid email address"
            )
            .optional(),

        mobile: z.string().trim().optional(),

        phone: z.string().trim().optional(),

        stateId: z
            .string()
            .trim()
            .min(1, "State is required"),

        city: z.string().trim().optional(),

        hobbies: z.preprocess(
            (value) => {
                if (!value) {
                    return [];
                }

                if (Array.isArray(value)) {
                    return value;
                }

                return [value];
            },
            z.array(
                z.enum([
                    "Chess",
                    "Cricket",
                    "Football",
                    "Hockey",
                ])
            )
        ),
    })
    .refine(    
        (data) =>
            Boolean(data.mobile || data.phone),
        {
            message:
                "Either mobile or phone is required",
            path: ["mobile"],
        }
    );

module.exports = {
    registerUserSchema,
};