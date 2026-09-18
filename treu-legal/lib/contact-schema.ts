import { z } from 'zod';
import { subjectValues } from '@/content/form';

/**
 * Validación del formulario. La obligatoriedad replica la del formulario
 * actual: nombre, empresa, cargo, correo, teléfono y área son obligatorios;
 * la descripción es opcional; el consentimiento es obligatorio.
 */
export const contactSchema = z.object({
  nombre: z.string().trim().min(2, 'Escriba su nombre completo.').max(120),
  empresa: z.string().trim().min(2, 'Escriba el nombre de su empresa.').max(140),
  cargo: z.string().trim().min(2, 'Escriba su cargo.').max(120),
  correo: z.string().trim().toLowerCase().email('Escriba un correo electrónico válido.').max(160),
  telefono: z
    .string()
    .trim()
    .min(8, 'Escriba un teléfono válido.')
    .max(32)
    .regex(/^[+()\d\s.-]+$/, 'Escriba un teléfono válido.'),
  asunto: z.string().refine((v) => subjectValues.includes(v), 'Seleccione el área principal del asunto.'),
  descripcion: z.string().trim().max(4000).optional().default(''),
  consentimiento: z
    .union([z.boolean(), z.literal('on')])
    .transform((v) => v === true || v === 'on')
    .refine((v) => v, 'Es necesario aceptar el tratamiento de datos para enviar la solicitud.'),
  /** Trampa para bots: debe llegar vacía. */
  referencia: z.string().max(0).optional().default(''),
  /** Página desde la que se envió, para saber qué convierte. */
  origen: z.string().max(200).optional().default(''),
});

export type ContactInput = z.input<typeof contactSchema>;
export type ContactData = z.output<typeof contactSchema>;
