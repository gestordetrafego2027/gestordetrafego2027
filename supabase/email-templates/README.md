# Email Templates — House Mazzutti

Templates HTML para os 5 emails transacionais do Supabase Auth.
Cole no Dashboard → **Authentication → Email Templates**.

## Configuração do remetente

Em **Authentication → SMTP Settings** (já com SMTP custom ativo):

```
Sender name:  HOUSE MAZZUTTI
Sender email: nao-responda@housemazzutti.com
```

> O nome aparece em CAIXA ALTA no inbox conforme solicitado.

## Templates

| Arquivo | Onde aplicar (Dashboard) |
|---|---|
| `confirm-signup.html` | Confirm signup |
| `magic-link.html` | Magic Link |
| `recovery.html` | Reset Password |
| `change-email.html` | Change Email Address |
| `invite.html` | Invite user |

## ⚠️ Não use `{{ .ConfirmationURL }}`

Os templates deste diretório montam o link **na mão**, com `token_hash`:

```
{{ .SiteURL }}/auth/confirm/?token_hash={{ .TokenHash }}&type=<tipo>&next=<destino>
```

Motivo: `{{ .ConfirmationURL }}` aponta para o `/auth/v1/verify` do Supabase, que
devolve um `?code=` de **PKCE**. Trocar esse code por sessão exige o cookie
`code_verifier` gravado no **mesmo navegador** que pediu a recuperação. Quem pede
no desktop e abre o e-mail no celular recebe
`PKCE code verifier not found in storage` — falha garantida.

`token_hash` + `verifyOtp` não depende de estado prévio: funciona em qualquer
dispositivo. A rota que valida é [`/auth/confirm`](../../src/app/auth/confirm/route.ts).

| Template | `type` | `next` |
|---|---|---|
| recovery | `recovery` | `/login/redefinir/` |
| invite | `invite` | `/login/redefinir/` |
| magic-link | `magiclink` | `/crm/` |
| confirm-signup | `signup` | `/pt/minha-conta/` |
| change-email | *(ainda usa `{{ .ConfirmationURL }}`)* | — |

> `change-email` precisa de dois tokens (`{{ .TokenHash }}` e `{{ .TokenHashNew }}`)
> e continua no fluxo legado — atendido pelo `/auth/callback` de compatibilidade.

## Configuração obrigatória no Dashboard

**Authentication → URL Configuration**

```
Site URL:  https://housemazzutti.com        ← sem barra no final
Redirect URLs:
  https://housemazzutti.com/auth/confirm
  https://housemazzutti.com/auth/confirm/
  https://housemazzutti.com/auth/callback
  https://housemazzutti.com/auth/callback/
  https://housemazzutti.com/**
```

Se a **Site URL** tiver barra no final, o link do e-mail vira
`https://housemazzutti.com//auth/confirm/` e quebra.

## Variáveis Supabase suportadas em cada template

- `{{ .TokenHash }}` — hash do token de uso único (usar este)
- `{{ .SiteURL }}` — URL do site (Site URL configurada)
- `{{ .Token }}` — código OTP de 6 dígitos
- `{{ .Email }}` — destinatário
- `{{ .Data }}` — metadados (raw_user_meta_data); use `{{ .Data.full_name }}`
- `{{ .ConfirmationURL }}` — ❌ evitar (ver acima)

## Subject (Assunto) sugerido para cada template

| Template | Subject |
|---|---|
| confirm-signup | Confirme seu acesso à House Mazzutti |
| magic-link | Seu link de acesso à House Mazzutti |
| recovery | Redefinição de senha — House Mazzutti |
| change-email | Confirme seu novo email — House Mazzutti |
| invite | Você foi convidado para a House Mazzutti |
