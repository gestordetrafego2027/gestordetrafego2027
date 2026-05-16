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

## Variáveis Supabase suportadas em cada template

- `{{ .ConfirmationURL }}` — link único de ação
- `{{ .Token }}` — código OTP (se preferir mostrar)
- `{{ .Email }}` — destinatário
- `{{ .SiteURL }}` — URL do site (Site URL configurada)
- `{{ .Data }}` — metadados (raw_user_meta_data); use `{{ .Data.full_name }}`

## Subject (Assunto) sugerido para cada template

| Template | Subject |
|---|---|
| confirm-signup | Confirme seu acesso à House Mazzutti |
| magic-link | Seu link de acesso à House Mazzutti |
| recovery | Redefinição de senha — House Mazzutti |
| change-email | Confirme seu novo email — House Mazzutti |
| invite | Você foi convidado para a House Mazzutti |
