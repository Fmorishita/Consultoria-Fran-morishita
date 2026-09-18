'use client';

import { useId, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from './Icon';
import { consentText, subjectGroups, successMessage } from '@/content/form';
import { contact, whatsappUrl } from '@/content/facts';
import { ui } from '@/content/microcopy';
import { track } from '@/lib/analytics';

type Errors = Partial<Record<string, string>>;

/**
 * Formulario único. Una columna, tipos de input y autocomplete correctos,
 * errores en línea anunciados con aria-live y áreas táctiles de 44 px.
 *
 * Si el envío falla, el usuario ve las alternativas de contacto sin perder
 * nada de lo que escribió: el formulario nunca se limpia ante un error.
 */
export function ContactForm({ compact = false }: { compact?: boolean }) {
  const pathname = usePathname();
  const baseId = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [errors, setErrors] = useState<Errors>({});
  const [failure, setFailure] = useState<string | null>(null);
  const started = useRef(false);

  const fid = (name: string) => `${baseId}-${name}`;

  const onFirstInput = () => {
    if (started.current) return;
    started.current = true;
    track('form_start', { location: pathname });
  };

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === 'sending') return;
    setState('sending');
    setErrors({});
    setFailure(null);

    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form)) as Record<string, string>;
    payload.origen = pathname;
    payload.consentimiento = form.consentimiento.checked ? 'on' : '';

    try {
      const res = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = (await res.json().catch(() => null)) as
        | { ok: boolean; error?: string; fields?: Errors }
        | null;

      if (res.ok && json?.ok) {
        track('form_submit_success', { location: pathname });
        setState('done');
        form.reset();
        return;
      }

      if (res.status === 422 && json?.fields) {
        setErrors(json.fields);
        setState('idle');
        track('form_submit_error', { location: pathname, reason: 'validation' });
        // Lleva el foco al primer campo con error.
        const first = Object.keys(json.fields)[0];
        form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
        return;
      }

      throw new Error(json?.error ?? `http_${res.status}`);
    } catch (e) {
      track('form_submit_error', { location: pathname, reason: String(e).slice(0, 60) });
      setFailure(ui.formErrorHelp);
      setState('error');
    }
  }

  if (state === 'done') {
    return (
      <div
        role="status"
        className="border border-blue/25 bg-blue/[0.04] p-6 sm:p-8"
      >
        <Icon name="check" className="h-7 w-7 text-blue" strokeWidth={2} />
        <p className="mt-4 text-step-2 font-semibold text-ink">{successMessage}</p>
        <p className="mt-3 text-step--1 text-slate">
          Si necesita atención inmediata, puede escribirnos por WhatsApp o llamar al{' '}
          {contact.phoneDisplay}.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary">
            <Icon name="messageCircle" className="h-4 w-4" />
            {ui.writeWhatsapp}
          </a>
          <a href={contact.phoneHref} className="btn-secondary">
            <Icon name="phone" className="h-4 w-4" />
            {ui.call}
          </a>
        </div>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} onInput={onFirstInput} noValidate className="space-y-5">
      {/* Trampa para bots. Invisible y fuera del recorrido de teclado. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={fid('referencia')}>Referencia</label>
        <input id={fid('referencia')} type="text" name="referencia" tabIndex={-1} autoComplete="off" />
      </div>

      <Field
        id={fid('nombre')}
        name="nombre"
        label={ui.fieldName}
        autoComplete="name"
        required
        error={errors.nombre}
      />
      <Field
        id={fid('empresa')}
        name="empresa"
        label={ui.fieldCompany}
        autoComplete="organization"
        required
        error={errors.empresa}
      />
      <Field
        id={fid('cargo')}
        name="cargo"
        label={ui.fieldRole}
        autoComplete="organization-title"
        required
        error={errors.cargo}
      />
      <Field
        id={fid('correo')}
        name="correo"
        label={ui.fieldEmail}
        type="email"
        inputMode="email"
        autoComplete="email"
        required
        error={errors.correo}
      />
      <Field
        id={fid('telefono')}
        name="telefono"
        label={ui.fieldPhone}
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        required
        error={errors.telefono}
      />

      <div>
        <Label htmlFor={fid('asunto')} required>
          {ui.fieldSubject}
        </Label>
        <select
          id={fid('asunto')}
          name="asunto"
          required
          defaultValue=""
          aria-invalid={errors.asunto ? true : undefined}
          aria-describedby={errors.asunto ? `${fid('asunto')}-error` : undefined}
          className={`mt-1.5 min-h-[48px] w-full border bg-white px-3 py-3 text-step-0 text-ink ${
            errors.asunto ? 'border-blue' : 'border-line'
          }`}
        >
          <option value="" disabled>
            {ui.fieldSubjectPlaceholder}
          </option>
          {/* optgroup real: los encabezados no son seleccionables. */}
          {subjectGroups.map((group) => (
            <optgroup key={group.label} label={group.label}>
              {group.options.map((option) => (
                <option key={option} value={`${group.label}: ${option}`}>
                  {option}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
        <FieldError id={`${fid('asunto')}-error`} message={errors.asunto} />
      </div>

      <div>
        <Label htmlFor={fid('descripcion')}>{ui.fieldMessage}</Label>
        <textarea
          id={fid('descripcion')}
          name="descripcion"
          rows={compact ? 3 : 5}
          className="mt-1.5 w-full border border-line bg-white px-3 py-3 text-step-0 text-ink"
        />
      </div>

      <div>
        <div className="flex gap-3">
          <input
            id={fid('consentimiento')}
            name="consentimiento"
            type="checkbox"
            required
            aria-invalid={errors.consentimiento ? true : undefined}
            aria-describedby={errors.consentimiento ? `${fid('consentimiento')}-error` : undefined}
            className="mt-1 h-5 w-5 shrink-0 accent-[#0F4C81]"
          />
          <label htmlFor={fid('consentimiento')} className="text-step--1 leading-relaxed text-slate">
            {consentText.replace(
              'Aviso y Política de Privacidad de Treu Legal & Business',
              'AVISO_LINK',
            ).split('AVISO_LINK').flatMap((part, i) =>
              i === 0
                ? [part]
                : [
                    <Link key="link" href="/privacidad/" className="text-blue underline underline-offset-2">
                      Aviso y Política de Privacidad de Treu Legal &amp; Business
                    </Link>,
                    part,
                  ],
            )}{' '}
            <span className="text-slate">({ui.required})</span>
          </label>
        </div>
        <FieldError id={`${fid('consentimiento')}-error`} message={errors.consentimiento} />
      </div>

      <div className="pt-1">
        <button type="submit" disabled={state === 'sending'} className="btn-primary w-full sm:w-auto">
          {state === 'sending' ? ui.sending : ui.sendRequest}
        </button>
      </div>

      {/* Fallo de envío: alternativas sin perder lo escrito. */}
      {state === 'error' && (
        <div role="alert" className="border border-blue/30 bg-paper p-5">
          <p className="flex items-center gap-2 text-step-0 font-semibold text-ink">
            <Icon name="circleAlert" className="h-5 w-5 text-blue" />
            {ui.formErrorTitle}
          </p>
          <p className="mt-2 text-step--1 text-slate">{failure}</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary">
              <Icon name="messageCircle" className="h-4 w-4" />
              {ui.whatsapp}
            </a>
            <a href={contact.phoneHref} className="btn-secondary">
              <Icon name="phone" className="h-4 w-4" />
              {contact.phoneDisplay}
            </a>
            <a href={`mailto:${contact.email}`} className="btn-secondary">
              <Icon name="mail" className="h-4 w-4" />
              {contact.email}
            </a>
          </div>
        </div>
      )}
    </form>
  );
}

function Label({
  htmlFor,
  required,
  children,
}: {
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="block text-step--1 font-medium text-ink">
      {children}
      {required && <span className="ml-1 font-normal text-slate">({ui.required})</span>}
    </label>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  return (
    <p id={id} aria-live="polite" className="mt-1.5 min-h-[1.25rem] text-step--1 text-blue">
      {message}
    </p>
  );
}

function Field({
  id,
  name,
  label,
  type = 'text',
  inputMode,
  autoComplete,
  required,
  error,
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  inputMode?: 'text' | 'email' | 'tel';
  autoComplete?: string;
  required?: boolean;
  error?: string;
}) {
  return (
    <div>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <input
        id={id}
        name={name}
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`mt-1.5 min-h-[48px] w-full border bg-white px-3 py-3 text-step-0 text-ink ${
          error ? 'border-blue' : 'border-line'
        }`}
      />
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}
