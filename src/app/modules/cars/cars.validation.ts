import { z } from 'zod';
const carValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    description: z.string({ required_error: 'Description is required' }),
    color: z.string({ required_error: 'Color is required' }),
    isElectric: z.boolean({ required_error: 'isElectric is required' }),
    features: z.array(z.string(), { required_error: 'Features are required' }),
    pricePerHour: z
      .number({ required_error: 'Price per hour is required' })
      .positive({ message: 'Price per hour must be a positive number' }),
  }),
});

const carUpdateValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    color: z.string().optional(),
    isElectric: z.boolean().optional(),
    features: z.array(z.string()).optional(),
    pricePerHour: z.number().positive().optional(),
  }),
});

const returnValidationSchema = z.object({
  body: z.object({
    bookingId: z.string(),
    endTime: z.string(),
  }),
});
export const carValidation = {
  carValidationSchema,
  carUpdateValidationSchema,
  returnValidationSchema,
};
