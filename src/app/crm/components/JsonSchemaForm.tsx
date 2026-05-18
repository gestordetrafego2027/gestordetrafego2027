/**
 * JsonSchemaForm — Renderiza um formulário a partir de um JSON Schema
 * simplificado (subset). Usado em lead_service_interests onde cada `service`
 * pode definir `questions_schema` para coletar respostas específicas.
 *
 * Suporte:
 *  - type: "object" no topo, com `properties` e `required`
 *  - tipos primitivos: string, number, integer, boolean
 *  - `enum` (gera <select>)
 *  - `format: "textarea"` (gera <textarea>)
 *  - `description` (texto auxiliar)
 *  - `title` (label)
 *
 * Não-suportado (cai num fallback de JSON cru):
 *  - arrays / nested objects / oneOf / anyOf / $ref
 *
 * Server component (sem state). Os valores vêm de `defaultValues`,
 * tipicamente o conteúdo de `lead_service_interests.answers`.
 *
 * O `namePrefix` define o prefixo dos inputs no FormData. Ex:
 *   namePrefix="answers" => `answers.fieldName`
 */

type JsonValue = string | number | boolean | null | JsonValue[] | { [k: string]: JsonValue }

type PropertySchema = {
  type?: 'string' | 'number' | 'integer' | 'boolean'
  title?: string
  description?: string
  enum?: (string | number)[]
  format?: string
  default?: JsonValue
  minimum?: number
  maximum?: number
}

type ObjectSchema = {
  type?: 'object'
  properties?: Record<string, PropertySchema>
  required?: string[]
  title?: string
  description?: string
}

export type JsonSchema = ObjectSchema | unknown

export default function JsonSchemaForm({
  schema,
  namePrefix = 'answers',
  defaultValues = {},
}: {
  schema: JsonSchema
  namePrefix?: string
  defaultValues?: Record<string, JsonValue>
}) {
  if (!schema || typeof schema !== 'object') {
    return (
      <p className="text-xs text-neutral-400 italic">
        Sem schema definido para este serviço.
      </p>
    )
  }

  const obj = schema as ObjectSchema
  if (obj.type !== 'object' || !obj.properties) {
    return (
      <details className="text-xs">
        <summary className="cursor-pointer text-neutral-500">
          Schema não-objeto — usar JSON manual
        </summary>
        <textarea
          name={namePrefix}
          rows={6}
          defaultValue={JSON.stringify(defaultValues, null, 2)}
          className="w-full mt-2 rounded border border-neutral-300 px-2 py-1 text-xs font-mono"
        />
      </details>
    )
  }

  const required = new Set(obj.required ?? [])
  const entries = Object.entries(obj.properties)

  return (
    <div className="space-y-3">
      {obj.description && (
        <p className="text-xs text-neutral-500">{obj.description}</p>
      )}

      {entries.map(([key, prop]) => {
        const inputName = `${namePrefix}.${key}`
        const label = prop.title ?? key
        const isRequired = required.has(key)
        const dflt = defaultValues[key] ?? prop.default ?? ''

        const labelEl = (
          <span className="text-sm font-medium flex items-center gap-1">
            {label}
            {isRequired && <span className="text-rose-500">*</span>}
          </span>
        )
        const helpEl = prop.description ? (
          <span className="block text-xs text-neutral-500">{prop.description}</span>
        ) : null

        // Enum → select
        if (prop.enum && prop.enum.length > 0) {
          return (
            <label key={key} className="block space-y-1">
              {labelEl}
              <select
                name={inputName}
                defaultValue={String(dflt)}
                required={isRequired}
                className="w-full rounded border border-neutral-300 px-2 py-1 text-sm bg-white"
              >
                {!isRequired && <option value="">—</option>}
                {prop.enum.map((opt) => (
                  <option key={String(opt)} value={String(opt)}>{String(opt)}</option>
                ))}
              </select>
              {helpEl}
            </label>
          )
        }

        // Boolean → checkbox
        if (prop.type === 'boolean') {
          return (
            <label key={key} className="flex items-center gap-2">
              <input
                type="checkbox"
                name={inputName}
                defaultChecked={!!dflt}
                value="true"
              />
              {labelEl}
              {helpEl}
            </label>
          )
        }

        // Number / integer
        if (prop.type === 'number' || prop.type === 'integer') {
          return (
            <label key={key} className="block space-y-1">
              {labelEl}
              <input
                type="number"
                name={inputName}
                defaultValue={String(dflt ?? '')}
                required={isRequired}
                step={prop.type === 'integer' ? 1 : 'any'}
                min={prop.minimum}
                max={prop.maximum}
                className="w-full rounded border border-neutral-300 px-2 py-1 text-sm"
              />
              {helpEl}
            </label>
          )
        }

        // String → textarea ou input
        if (prop.format === 'textarea') {
          return (
            <label key={key} className="block space-y-1">
              {labelEl}
              <textarea
                name={inputName}
                rows={3}
                defaultValue={String(dflt ?? '')}
                required={isRequired}
                className="w-full rounded border border-neutral-300 px-2 py-1 text-sm"
              />
              {helpEl}
            </label>
          )
        }

        return (
          <label key={key} className="block space-y-1">
            {labelEl}
            <input
              type={prop.format === 'email' ? 'email' : prop.format === 'date' ? 'date' : 'text'}
              name={inputName}
              defaultValue={String(dflt ?? '')}
              required={isRequired}
              className="w-full rounded border border-neutral-300 px-2 py-1 text-sm"
            />
            {helpEl}
          </label>
        )
      })}
    </div>
  )
}

/**
 * Helper para usar em server actions: parsa FormData de volta para
 * objeto JSON respeitando o tipo declarado no schema.
 */
export function parseAnswersFromFormData(
  formData: FormData,
  schema: JsonSchema,
  prefix = 'answers',
): Record<string, JsonValue> {
  const obj = schema as ObjectSchema
  const result: Record<string, JsonValue> = {}

  if (!obj || obj.type !== 'object' || !obj.properties) {
    // Fallback — campo único `${prefix}` com JSON cru
    const raw = String(formData.get(prefix) ?? '').trim()
    if (!raw) return {}
    try {
      const parsed = JSON.parse(raw) as JsonValue
      if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
        return parsed as Record<string, JsonValue>
      }
      return {}
    } catch {
      return {}
    }
  }

  for (const [key, prop] of Object.entries(obj.properties)) {
    const v = formData.get(`${prefix}.${key}`)
    if (v === null) {
      if (prop.type === 'boolean') result[key] = false
      continue
    }
    const s = String(v)
    if (prop.type === 'boolean') {
      result[key] = s === 'true' || s === 'on'
    } else if (prop.type === 'number' || prop.type === 'integer') {
      if (s === '') continue
      const n = Number(s)
      result[key] = Number.isFinite(n) ? (prop.type === 'integer' ? Math.trunc(n) : n) : 0
    } else {
      if (s === '') continue
      result[key] = s
    }
  }
  return result
}
