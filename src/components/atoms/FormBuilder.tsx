// import { useForm, FormProvider, useFormContext } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useFormStore } from '../../store/form.store';
// import { generateSchema } from '../../shema/zod';
// import type { FormModel } from '../../types';
// import type { FieldConfig } from '@/types/form';
// import { z } from 'zod';

// interface FormBuilderProps<T extends FormModel> {
//   model: T; // Truyền config vào đây nếu muốn override, hoặc dùng store
//   onSubmit: (data: z.infer<ReturnType<typeof generateSchema>>) => void;
// }

// const FieldRenderer = ({ field }: { field: any }) => {
//   const { register, formState: { errors } } = useFormContext();
//   const inputType = field.type === 'email' ? 'email' : field.type === 'number' ? 'number' : 'text';

//   return (
//     <div className="mb-4">
//       <label className="block text-sm font-medium mb-1">{field.label}</label>
//       {field.type === 'select' ? (
//         <select {...register(field.name)} className="w-full p-2 border rounded">
//           <option value="">Chọn...</option>
//           {field.options?.map((opt: any) => (
//             <option key={opt.value} value={opt.value}>{opt.label}</option>
//           ))}
//         </select>
//       ) : field.type === 'checkbox' ? (
//         <input type="checkbox" {...register(field.name)} className="mr-2" />
//       ) : (
//         <input
//           type={inputType}
//           {...register(field.name)}
//           placeholder={field.placeholder}
//           className="w-full p-2 border rounded focus:outline-none focus:ring-2"
//         />
//       )}
//       {errors[field.name] && <p className="text-red-500 text-sm mt-1">{String(errors[field.name]?.message)}</p>}
//     </div>
//   );
// };

// export const FormBuilder = ({ model, onSubmit }: FormBuilderProps<any>) => {
//   const { currentStep, nextStep, prevStep } = useFormStore(); // Sync với store nếu dùng global
//   const schema = generateSchema(model);
//   const methods = useForm({
//     resolver: zodResolver(schema),
//     mode: 'onChange',
//   });
//   const step = model.steps[currentStep];

//   const handleNext = (data: any) => {
//     if (methods.formState.isValid) {
//       nextStep();
//       methods.reset(data); // Sync data qua steps
//     }
//   };

//   return (
//     <FormProvider {...methods}>
//       <form onSubmit={methods.handleSubmit(onSubmit)} className="max-w-md mx-auto p-4">
//         <h2 className="text-lg font-bold mb-4">{step.title}</h2>
//         {step.fields.map((field: FieldConfig) => (
//           <FieldRenderer key={field.name} field={field} />
//         ))}
//         <div className="flex justify-between mt-4">
//           {currentStep > 0 && (
//             <button
//               type="button"
//               onClick={prevStep}
//               className="px-4 py-2 bg-gray-300 rounded"
//             >
//               Trước
//             </button>
//           )}
//           {currentStep < model.steps.length - 1 ? (
//             <button
//               type="button"
//               onClick={methods.handleSubmit(handleNext)}
//               className="px-4 py-2 bg-blue-500 text-white rounded"
//             >
//               Tiếp
//             </button>
//           ) : (
//             <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">
//               Submit
//             </button>
//           )}
//         </div>
//       </form>
//     </FormProvider>
//   );
// };