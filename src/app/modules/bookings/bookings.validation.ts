import { z } from 'zod';

const isFutureDate = (dateStr: string): boolean => {
    const today = new Date();
    const date = new Date(dateStr);
    return date > today;
  };

export const bookingValidation = z.object({
  body: z.object({
    carId: z.string({ required_error: 'Car ID is required' }),
    date: z
      .string({ required_error: 'Date is required' })
      .regex(/^\d{4}-\d{2}-\d{2}$/, {
        message: 'Date must be in yyyy-mm-dd format',
      })
      .refine(isFutureDate, { message: 'Date must be in the future' }),
    startTime: z
      .string()
      .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
        message: 'Start time must be in 24-hour format (HH:mm)',
      })
      .refine((time) => time.length === 5, {
        message: 'Start time must be in the format HH:mm',
      }),
  }),
});
