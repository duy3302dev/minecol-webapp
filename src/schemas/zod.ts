// import { z } from 'zod';
// import type { FieldConfig, FormModel } from '../types';

// const zodForField = (field: FieldConfig): z.ZodTypeAny => {
//   let schema: z.ZodTypeAny;

//   switch (field.type) {
//     case 'text':
//     case 'email':
//       // Start with the base string schema.
//       let stringSchema = z.string();

//       // Apply the email validation *before* optional/refine.
//       if (field.type === 'email') {
//         stringSchema = stringSchema.email({ message: `${field.label} is invalid` });
//       }

//       // Handle required logic.
//       if (field.required) {
//         // Use .min(1) for required strings instead of refine to preserve type.
//         stringSchema = stringSchema.min(1, { message: `${field.label} is required` });
//         schema = stringSchema;
//       } else {
//         // Allow undefined for optional fields.
//         // Also add .or(z.literal('')) to allow empty strings, which is common with optional form fields.
//         schema = stringSchema.optional().or(z.literal(''));
//       }
//       break;

//     case 'number':
//       schema = z.coerce.number({ error: `${field.label} must be a number` });
//       if (!field.required) {
//         schema = schema.optional().or(z.literal(''));
//       }
//       break;

//     case 'select':
//       schema = z.string().min(1, { message: `${field.label} is required` });
//       break;
//     case 'checkbox':
//       schema = z.boolean();
//       break;
//     case 'date':
//       schema = z.string().min(1, { message: `${field.label} is required` });
//       break;
//     default:
//       schema = z.any();
//   }
//   return schema;
// };

// export const generateSchema = (model: FormModel) => {
//   const fieldsObj = model.steps.flatMap((step) =>
//     step.fields.map((field) => [field.name, zodForField(field)])
//   );
//   return z.object(Object.fromEntries(fieldsObj));
// };
