import os
OUT='/Users/angelomazzutti/Desktop/gestordetrafego2027/docs/shop-confeccao/prompts'

# A luz mudou de "high-key com fill generoso" para uma razão de 3:1.
#
# O problema do rosto achatado não era a POSIÇÃO da luz — já havia um softbox à
# esquerda. Era "high-key", "gentle fill" e "very soft shadow": as três levantam
# a sombra até sumir, e sem sombra não há relevo, poro nem osso. Pele sem
# modelado lê como cera.
#
# Baixar o fill para cerca de 3:1 devolve um lado de sombra ao rosto sem custar
# a cor da peça: a fonte segue grande e difusa, o balanço de branco segue neutro
# e o f/8 segue cobrindo o caimento. Sombra continua suave — sombra dura
# quebraria o padrão de catálogo e a linguagem limpa da casa.
#
# Um setup só para os 32 planos. Trocar de luz entre o plano largo e o corte de
# detalhe criaria duas peças com cor diferente na mesma página de produto.
STUDIO=("Professional e-commerce fashion catalog photo. Seamless light cool-gray studio backdrop (approx. #CDCDD0), "
 "large softbox key about 45 degrees to the left of camera with a modest fill opposite it, roughly a 3:1 ratio, "
 "so the garment stays evenly and accurately lit while the face keeps a soft shadow side that models the cheekbone "
 "and reveals skin texture; shadows stay soft, never hard. Neutral color-accurate white balance. "
 "Shot on full-frame camera, 85mm lens, f/8, eye-level to chest-level camera height, "
 "tack-sharp focus on the fabric texture, matte skin with visible pores, no smoothing.")
CLOSE=("CRITICAL: absolutely no text, no letters, no logos, no labels, no brand tags visible, no watermark, no graphic overlays, no icons. "
 "Plain garment exactly as described, correct anatomy, five fingers per hand.")

MODELS={
 'A':("Modelo A (P01, P02, P03, P04, P07, P09)",
      "a Caucasian Brazilian man in his early 30s, athletic-lean build, medium-length dark brown wavy hair swept back with volume, "
      "short groomed beard with moustache, defined eyebrows, serious calm expression",
      "{TATTOO_A}", "both forearms covered with dense full-sleeve tattoos (generic ornamental and figurative designs, no readable lettering)"),
 'C':("Modelo C (P05, P06, P08)",
      "a Caucasian Brazilian man in his late 30s, muscular athletic build with strong arms, short black hair neatly styled up and back, "
      "dark moustache and short chin beard, confident neutral expression",
      "", ""),
 'D':("Modelo D (mockups P05 e P09)",
      "a young Black man in his early 20s, tall and slim, very short buzzed hair, clean-shaven, neutral calm expression",
      "", ""),
}

def model_txt(k):
    m=MODELS[k]; t=m[1]
    if k=='A': t+=", "+m[3]
    return t

P={}
P['P01']=dict(title="P01 — Oversized Suedine Peruano 300g", model='A', color_default='off-white',
 garment=("an oversized boxy t-shirt in heavyweight 300gsm suedine knit (52% cotton / 48% polyester) with a soft brushed peach-finish, matte velvety surface, "
  "{COR}, dropped shoulders with the shoulder seam falling on the upper arm, wide short sleeves ending just above the elbow, "
  "crew neck with a medium-width ribbed collar, straight hem slightly below the hip, dense opaque fabric that holds a boxy volume"),
 bottom="matching white knit shorts with a black drawstring hanging at the front",
 colors="OFF (off-white), BGE/ARE (areia), CHU (chumbo) — conferir cartela no dossiê P04",
 shots=[
  ("F1 — Hero 3/4 com mão no peito","Foto principal (1ª do print e 1ª miniatura)",
   "Three-quarter view, body turned slightly to the camera's right, head turned and eyes looking off-camera to the camera's left. "
   "His right hand rests flat on the upper chest with fingers slightly spread, a black braided leather bracelet on that wrist; left arm hangs relaxed. "
   "Framing from the top of the head to mid-thigh, subject centered, small headroom.","4:5"),
  ("F2 — Detalhe gola, ombro caído e manga","2ª foto e 2ª miniatura",
   "Tight detail crop: from the lips and beard down to the lower chest, focused on the collar ribbing, the dropped shoulder seam and the wide sleeve on the camera's left side. "
   "His left hand pinches and slightly pulls the sleeve hem near the elbow, tattooed forearm entering the frame from below. "
   "Macro-level sharpness on the brushed velvety texture.","4:5"),
  ("F3 — Frontal com mãos nos bolsos","3ª foto e 3ª miniatura",
   "Near-frontal view with a very slight turn, looking straight into the camera, head subtly tilted. Both hands tucked into the shorts pockets, thumbs out, "
   "a black leather bracelet on the left wrist. The boxy hem sits over the shorts waistband with the drawstring visible. Framing from the head to mid-thigh.","4:5"),
  ("F4 — Corpo inteiro frontal","4ª miniatura (baixa resolução — leitura aproximada)",
   "Full frontal standing pose, feet hip-width apart, arms hanging naturally at the sides, looking straight at the camera. "
   "Framing from the head to just below the knees, showing the full oversized silhouette over the matching shorts.","4:5"),
 ])
P['P02']=dict(title="P02 — Oversized Algodão Penteado 185g", model='A', color_default='black',
 garment=("an oversized t-shirt in 185gsm 100% combed cotton jersey, {COR}, relaxed boxy fit with dropped shoulders, wide short sleeves ending above the elbow, "
  "thin ribbed crew neck, straight hem at the hip, smooth matte cotton surface"),
 bottom="light-wash blue jeans",
 colors="PRT (preto), BCO (branco)",
 shots=[
  ("F1 — Frontal braços soltos","Foto principal",
   "Frontal view, standing relaxed with arms hanging at the sides, looking straight at the camera. Framing from the head to upper thigh, subject centered.","4:5"),
  ("F2 — 3/4 com braço cruzado","2ª foto",
   "Three-quarter view, torso turned to the camera's left, head lowered with eyes looking down and to the side. One forearm crosses in front of the waist holding the other arm at the wrist. "
   "Shows the dropped shoulder and the width of the sleeve. Framing from the head to upper thigh.","4:5"),
  ("F3 — Mockup de personalização (versão HMZT)","3ª foto — no original é a arte promocional do fornecedor ('SEU LOGO AQUI'). Aqui vira base lisa para aplicar arte HMZT depois",
   "Frontal view, arms relaxed, looking at the camera, torso square to the lens so the whole front panel of the t-shirt is flat and unobstructed, ready for a print to be composited later. "
   "Framing from the chin to upper thigh so the chest area is large in frame.","4:5"),
 ])
P['P03']=dict(title="P03 — Pima Cotton 165g", model='A', color_default='dark chocolate brown',
 garment=("a regular fit t-shirt in lightweight 165gsm 100% pima cotton jersey, {COR}, smooth silky surface with a subtle natural sheen, "
  "set-in shoulders, fitted short sleeves ending mid-bicep, narrow ribbed crew neck sitting close to the neck, straight double-stitched hem at the hip"),
 bottom="light-wash blue jeans with ripped distressing on the thighs",
 colors="PRT, OFF, BGE, CAP (capuccino), CZC (cinza claro), MRR (marrom — cor das fotos), MAR, VRD",
 shots=[
  ("F1 — Hero mão na gola","Foto principal e 1ª miniatura",
   "Near-frontal view, looking straight into the camera with a slight head tilt. His left arm is raised with the elbow out to the side and the hand touching the collar near the base of the neck, "
   "a black leather bracelet on that wrist; the other arm hangs relaxed. Framing from the head to upper thigh.","4:5"),
  ("F2 — Olhar baixo ajustando a manga","2ª foto e 2ª miniatura",
   "Three-quarter view, head bowed with eyes looking down at his arm. His right hand crosses the body and pinches the hem of the left sleeve, "
   "the left arm bent across the torso, a black bracelet on the left wrist and a silver ring on the left hand. Framing from the head to upper thigh.","4:5"),
  ("F3 — Frontal mãos nos bolsos da frente","3ª foto e 3ª miniatura",
   "Frontal view, looking straight at the camera, shoulders square. Both hands rest at the front jeans pockets with fingertips hooked in, "
   "a black bracelet on the left wrist and a ring on the left hand. Framing from the head to upper thigh.","4:5"),
  ("F4 — Variação de cor (mesma pose da F1)","5ª miniatura — peça em tom terracota/capuccino",
   "Same pose as the hero shot: near-frontal, left hand touching the collar near the neck with elbow out, looking at the camera. Framing from the head to upper thigh.","4:5"),
 ], color_override={'F4 — Variação de cor (mesma pose da F1)':'warm terracotta-capuccino brown'})
P['P04']=dict(title="P04 — Suedine Peruano 300g Regular Fit", model='A', color_default='pale blush nude beige',
 garment=("a regular fit t-shirt in heavyweight 300gsm suedine knit (52% cotton / 48% polyester), {COR}, velvety matte brushed surface that looks like soft suede, "
  "structured body that holds its shape without clinging, set-in shoulders, straight short sleeves ending mid-bicep with a turned double-stitched hem, "
  "medium-width ribbed crew neck, straight hem at the hip, fully opaque"),
 bottom="black slim trousers",
 colors="PRT, OFF, BGE (provável nude das fotos), MRR, MAR — confirmar cartela (dossiê P04)",
 shots=[
  ("F1 — Frontal braços soltos","Foto principal e 1ª miniatura",
   "Frontal view, standing straight with arms relaxed at the sides, looking straight into the camera, a black leather bracelet on the left wrist. Framing from the head to upper thigh.","4:5"),
  ("F2 — Detalhe gola e punho","2ª foto e 2ª miniatura",
   "Tight detail crop from the lips and beard down to the mid chest, off-center to the camera's right to show the collar ribbing, the shoulder seam and the turned sleeve hem on his left arm, "
   "with the tattooed forearm just entering the frame. Macro-level sharpness on the brushed suede-like texture.","4:5"),
  ("F3 — Frontal plano aberto","3ª miniatura",
   "Frontal view, arms relaxed, looking at the camera, wider framing from the head to just above the knees, showing the black trousers.","4:5"),
  ("F4 — 3/4 tocando a barra","3ª foto e 4ª miniatura",
   "Three-quarter view, body turned to the camera's left, face toward the camera. His left hand fingertips lightly touch the hem at the side, a black bracelet on that wrist. "
   "Framing from the head to upper thigh.","4:5"),
  ("F5 — Lateral","5ª miniatura (baixa resolução — leitura aproximada)",
   "Strong three-quarter to side view, body turned about 60 degrees to the camera's right, face turned back toward the camera, arms relaxed. Framing from the head to upper thigh.","4:5"),
 ])
P['P05']=dict(title="P05 — Chinese Heavyweight 300g", model='C', color_default='jet black',
 garment=("a regular fit heavyweight t-shirt in 300gsm two-ply 100% cotton jersey, {COR}, dense substantial fabric with a subtle satin sheen, "
  "straight structured body that does not cling, set-in shoulders, short sleeves ending mid-bicep, structured ribbed crew neck, double-stitched straight hem at the hip"),
 bottom="black jeans",
 colors="PRT, CZA (cinza), MAR, OFF",
 shots=[
  ("F1 — Hero frontal segurando a barra","Foto principal e 1ª miniatura",
   "Near-frontal view with a slight turn to the camera's left, chin slightly lowered, looking straight into the camera. His right hand loosely grips the front hem of the t-shirt, the left arm hangs relaxed. "
   "Framing from the head to upper thigh.","4:5"),
  ("F2 — 3/4","2ª foto e 2ª miniatura",
   "Three-quarter view, body turned to the camera's right, face toward the camera, arms relaxed at the sides with hands slightly curled. Framing from the head to upper thigh.","4:5"),
  ("F3 — Costas","3ª foto e 3ª miniatura",
   "Back view, standing straight with arms relaxed, head turned very slightly to his left so part of the ear and cheek show. Clean seamless back panel of the t-shirt, no center seam. "
   "Framing from the head to upper thigh.","4:5"),
  ("F4 — Mockup de personalização (versão HMZT)","4ª miniatura — no original é a arte promocional do fornecedor sobre peça off-white; aqui vira base lisa para arte HMZT",
   "Frontal view, hands in the pockets of black trousers, looking at the camera, torso square to the lens so the whole front panel is flat and unobstructed for compositing a print later. "
   "Framing from the head to upper thigh.","4:5"),
 ], model_override={'F4 — Mockup de personalização (versão HMZT)':'D'}, color_override={'F4 — Mockup de personalização (versão HMZT)':'off-white'},
 extra_variants=[("F5 — Oversized (variante não fotografada)","Não existe no print — a malha também vem em oversized (dossiê P05)",
   "Same studio. Frontal view, arms relaxed, looking at the camera. The t-shirt is the OVERSIZED cut of the same fabric: dropped shoulders, wide sleeves to the elbow, boxy body falling below the hip. "
   "Framing from the head to upper thigh.","4:5")])
P['P06']=dict(title="P06 — Chinese Cotton 160g", model='C', color_default='off-white',
 garment=("a regular fit t-shirt in lightweight 160gsm 100% combed cotton jersey, {COR}, smooth surface with a slight satin sheen, "
  "set-in shoulders, fitted short sleeves ending mid-bicep with double hem, narrow 2x1 ribbed crew neck, straight double-stitched hem at the hip"),
 bottom="black jeans",
 colors="PRT, MAR, VML (verde militar), AZC (azul celeste), OFF",
 shots=[
  ("F1 — Hero puxando a barra","Foto principal e 1ª miniatura",
   "Near-frontal view, looking straight into the camera. His left hand pinches and slightly pulls the front hem near the waist, showing the light soft drape; the right arm hangs relaxed. "
   "Framing from the head to upper thigh.","4:5"),
  ("F2 — 3/4 mão no bolso, olhar lateral","2ª foto e 2ª miniatura",
   "Three-quarter view, body turned to the camera's left, head turned and eyes looking off-camera to the right. His right hand is tucked into the front jeans pocket, the other arm relaxed. "
   "Framing from the head to upper thigh.","4:5"),
  ("F3 — Detalhe gola e ombro","3ª foto e 3ª miniatura",
   "Tight detail crop from the nose and moustache down to the mid chest, showing the narrow ribbed collar, the shoulder seam and the double sleeve hem on the camera's right side. "
   "Macro-level sharpness on the smooth cotton jersey.","4:5"),
  ("F4 — Costas","4ª miniatura",
   "Back view, standing straight, arms relaxed at the sides, head facing forward. Clean back panel. Framing from the head to upper thigh.","4:5"),
 ])
P['P07']=dict(title="P07 — Cotton Peruano 220g com Elastano", model='A', color_default='black',
 garment=("a regular fit t-shirt in 220gsm cotton jersey with 4% elastane, {COR}, smooth fabric with a subtle satin sheen that follows the body without being tight, "
  "set-in shoulders, short sleeves hugging the arm and ending mid-bicep with a double hem, narrow ribbed crew neck, straight double-stitched hem at the hip"),
 bottom="black jeans",
 colors="PRT, OFF, BGE (provável nude da 5ª miniatura), MAR, BDO, VML",
 shots=[
  ("F1 — Hero 3/4","Foto principal e 1ª miniatura",
   "Three-quarter view, body turned to the camera's left, face toward the camera with a slight head tilt, a fine silver chain necklace just visible at the collar. "
   "Arms relaxed, the far hand slightly curled at the hem. Framing from the head to upper thigh.","4:5"),
  ("F2 — Detalhe gola e manga","2ª foto e 2ª miniatura",
   "Tight detail crop from the lips down to the mid chest, off-center to show the narrow collar, the shoulder seam and the double sleeve hem on the camera's right, "
   "with a thin silver chain necklace and a tattooed forearm just entering the frame.","4:5"),
  ("F3 — Frontal leve 3/4","3ª foto e 3ª miniatura",
   "Near-frontal view turned slightly to the camera's right, looking into the camera, arms relaxed, one hand lightly touching the side hem. Framing from the head to upper thigh.","4:5"),
  ("F4 — Macro da malha","3ª foto do 2º print — close de textura ocupando o quadro",
   "Extreme close-up of the fabric only, filling the entire frame: flat jersey knit surface with visible fine knit loops and a subtle satin sheen, soft raking light from the left to reveal the texture. "
   "No person visible.","1:1"),
  ("F5 — Variação de cor","4ª/5ª miniatura — peça nude/rosé com calça preta",
   "Frontal view, arms relaxed, looking at the camera. Framing from the head to upper thigh.","4:5"),
 ], color_override={'F5 — Variação de cor':'pale nude pink beige'})
P['P08']=dict(title="P08 — Egyptian Cotton 50/1 com Elastano", model='C', color_default='ivory off-white',
 garment=("a regular fit t-shirt in fine 170gsm extra-long-staple cotton jersey (50/1 yarn) with 8.5% elastane, {COR}, very smooth silky surface with a subtle natural sheen, "
  "fluid drape following the torso, set-in shoulders, fitted short sleeves ending mid-bicep with a double hem, flat smooth 2x1 rib crew neck, flat inner seams, straight hem at the hip"),
 bottom="black jeans",
 colors="OFF, BDO (bordô), BGE, PRT, VML, LAR (laranja), VRD",
 shots=[
  ("F1 — Frontal plano aberto","Foto principal e 1ª miniatura",
   "Straight frontal view, standing still, arms hanging at the sides with hands loosely closed, looking straight into the camera. "
   "Wider framing from the head to mid-thigh with generous space around the figure.","4:5"),
  ("F2 — Detalhe gola e ombro","2ª foto e 2ª miniatura",
   "Tight detail crop from the lips and moustache down to the mid chest, off-center to show the smooth flat collar, the shoulder seam and the double sleeve hem on the camera's right. "
   "Macro-level sharpness showing the ultra-smooth silky surface.","4:5"),
  ("F3 — Costas","3ª foto e 3ª miniatura",
   "Back view, standing straight, arms relaxed at the sides, head facing forward. Smooth clean back panel draping over the shoulder blades. Framing from the head to upper thigh.","4:5"),
  ("F4 — 3/4 mão no bolso","4ª miniatura (baixa resolução — leitura aproximada)",
   "Three-quarter view, body turned to the camera's right, looking at the camera, one hand in the front jeans pocket, the other arm relaxed. Framing from the head to upper thigh.","4:5"),
 ])
P['P09']=dict(title="P09 — Suedine Light", model='A', color_default='warm caramel camel tan',
 garment=("a regular fit t-shirt in lightweight suedine knit, {COR}, soft velvety matte brushed surface, relaxed straight fit, set-in shoulders, "
  "straight short sleeves ending mid-bicep, medium ribbed crew neck, straight hem at the hip"),
 bottom="faded black distressed jeans",
 colors="BGE (caramelo das fotos?), PRT, AZB (azul bebê), LAR, VRD",
 shots=[
  ("F1 — Hero 3/4 enrolando a manga","Foto principal e 1ª miniatura",
   "Three-quarter view, body turned to the camera's left, head turned toward the camera with a direct gaze. His right hand crosses the body and pinches the hem of the left sleeve near the bicep; "
   "a thin silver chain bracelet on the right wrist. Framing from the head to upper thigh.","4:5"),
  ("F2 — Detalhe gola e ombro","2ª foto e 2ª miniatura",
   "Tight detail crop from the beard down to the mid chest, off-center to show the ribbed collar, the shoulder seam and the sleeve hem on the camera's right, "
   "with a tattooed forearm just entering the frame. Macro-level sharpness on the soft brushed surface.","4:5"),
  ("F3 — Mockup de personalização (versão HMZT)","3ª foto — no original é a arte promocional do fornecedor sobre peça off-white em modelo negro; aqui vira base lisa para arte HMZT",
   "Frontal view, both hands in the pockets of black trousers, looking at the camera, torso square to the lens so the whole front panel is flat and unobstructed for compositing a print later. "
   "The t-shirt is slightly relaxed with dropped shoulders. Framing from the head to upper thigh.","4:5"),
 ], model_override={'F3 — Mockup de personalização (versão HMZT)':'D'}, color_override={'F3 — Mockup de personalização (versão HMZT)':'off-white'})

BEH={'P01': 'Fabric and construction: heavy 300gsm suedine with real weight and body — the boxy volume stands away from the torso and falls in a few soft, rounded vertical folds, never clinging or rippling. The dropped shoulder seam sits well down the upper arm and the wide sleeves hold an open tube shape. The brushed peach-finish surface absorbs light (fully matte, zero shine) with a faint soft nap visible at the edges and folds. Medium ribbed collar, flat and firm, keeping a clean round shape. Tonal double-needle topstitching at sleeve hems and bottom hem; the hem hangs straight and heavy with no flare. Movement: the weight makes the fabric respond slowly — where a hand touches or pulls, it forms broad soft tension folds rather than sharp creases.', 'P02': 'Fabric and construction: medium-light 185gsm combed cotton jersey — soft and pliable, the oversized body collapses gently at the dropped shoulders and forms several relaxed vertical folds; wide sleeves drape open with a slight natural fall. Smooth matte cotton surface. Thin ribbed collar about 1.5 cm, lying flat. Tonal double-needle topstitching at sleeve and bottom hems. Movement: light fabric that reacts easily to the pose, with natural soft wrinkles at the elbow crease and where arms cross.', 'P03': 'Fabric and construction: lightweight 165gsm 100% pima cotton jersey — fluid and soft, draping close to the body with fine, small folds at the waist and sleeves; light catches a subtle silky sheen along the fold ridges. No elastane: a few realistic soft creases at the inner elbow and lower back are natural. Narrow reinforced ribbed collar, lying flat against the neck; shoulder-to-shoulder internal tape keeps the shoulder line clean and straight. Tonal double-needle hems at sleeves and an invisible double hem at the bottom, hanging straight. Movement: the fabric follows every gesture — when the arm lifts, the side of the body gently pulls with thin diagonal tension folds.', 'P04': 'Fabric and construction: heavy 300gsm suedine knit with real weight — the structured regular body holds its own shape, side seams hang perfectly vertical and the fabric forms only a few broad, soft folds; it does not cling to the chest or stomach. Sleeves stand as clean tubes ending in a turned double-stitched hem. The brushed velvety surface is fully matte like soft suede, with a gentle nap that softens the edges of folds. Firm medium ribbed collar keeping a perfect round shape; shoulder-to-shoulder internal tape; reinforced tonal seams. Movement: slow and weighty — where a hand touches the hem, the fabric bends in a thick rounded fold instead of wrinkling.', 'P05': 'Fabric and construction: dense heavyweight 300gsm two-ply cotton jersey — the body stands slightly off the torso and falls in crisp, broad folds; the fabric looks substantial and holds its volume. A subtle satin sheen appears only on highlights of the folds. Structured 2x1 ribbed collar, thicker than usual, ring-knit with no front seam, holding a firm round neckline. Wide shoulder-to-shoulder internal tape, chain-stitch seams, tonal double-needle hems at sleeves and bottom. Anti-torsion finish: side seams run perfectly straight down the body, no twisting. Movement: heavy and stable — when a hand grips the hem, the fabric forms one thick fold with the rest of the body staying smooth.', 'P06': 'Fabric and construction: light 160gsm combed cotton jersey — soft and airy, it drapes and moves easily, forming small natural folds at the waist and under the arms; slight satin sheen on the smooth surface. Narrow 2x1 ribbed collar, ring-knit with no visible front seam. Shoulder-to-shoulder internal reinforcement, chain-stitch seams, tonal double-needle hems at sleeves and bottom. Anti-torsion finish: side seams hang perfectly vertical. Movement: responsive fabric — where the hand pulls the hem, fine tension lines radiate up toward the chest.', 'P07': 'Fabric and construction: medium-weight 220gsm cotton jersey with 4% elastane — it follows the shape of the chest and shoulders with gentle tension, smooth and nearly wrinkle-free, recovering its shape instantly; sleeves hug the biceps without squeezing. Subtle satin sheen on the smooth surface. Narrow reinforced ribbed collar lying flat and snug; shoulder-to-shoulder internal tape; reinforced seams; tonal double-needle sleeve hems and an invisible double bottom hem hanging straight. Movement: supple and elastic — the fabric moves with the body, stretching smoothly over the shoulders and relaxing back without bagging.', 'P08': 'Fabric and construction: fine lightweight 170gsm jersey spun from 50/1 extra-long-staple cotton with 8.5% elastane — fluid and silky, it drapes like a fine knit and gently skims the chest, shoulders and arms without creases. Very smooth, even surface with a subtle natural sheen. Flat, smooth 2x1 rib collar (no ribbed texture visible), lying perfectly flat. Flat inner seams, shoulder-to-shoulder reinforcement, double-needle hems at sleeves and bottom. Movement: very fluid and elastic — the fabric flows with the body and settles back into a clean line.', 'P09': 'Fabric and construction: lightweight suedine knit — soft and fluid, it drapes with gentle relaxed folds and moves easily with the body. The brushed velvety surface is matte with a faint soft nap, absorbing light with no shine. Medium ribbed collar lying flat; reinforced tonal seams; straight sleeves with clean hems; pre-shrunk fabric keeping a neat regular shape. Movement: light and airy — where the hand pulls the sleeve, soft rounded folds form around the fingers.'}
FIT={'P01': 'Oversized fit: the body falls below the hip, chest very loose and boxy, shoulder seam dropped onto the upper arm, sleeves ending just above the elbow. ', 'P02': 'Oversized fit: the body falls at or just below the hip, loose and boxy through the chest, shoulder seam dropped onto the upper arm, wide sleeves ending above the elbow. ', 'P05': 'Fit on the model (size M on a 1.84 m, 84 kg man, regular cut): body length 72 cm ending at the hip, chest width 54 cm, shoulder 46 cm with the seam on the shoulder point, sleeve 18 cm ending mid-bicep. '}
FIT_REG='Fit on the model (size M on a 1.84 m, 84 kg man): body length 72 cm ending at the hip, chest width 54 cm giving 2–4 cm of relaxed ease, shoulder width 46 cm with the shoulder seam sitting exactly on the shoulder point, sleeve length 18 cm ending mid-bicep. '

def build(pk, d):
    lines=[f"# Fluxo de prompts — {d['title']}\n",
     f"> Dossiê e ficha: pastas [`dossies/`](../dossies/) e [`catalogo/`](../catalogo/) · Método e configuração: [README](README.md)\n",
     f"**Cores disponíveis:** {d['colors']} — os prompts vêm na cor das fotos originais; para outra cor, troque só o termo de cor (indicado em cada foto)\n",
     "**Ordem de geração:** gere a F1 primeiro. Quando aprovada, use-a como **imagem de referência** nas demais (mesmo rosto, mesma peça, mesma luz).\n",
     *(["**Tatuagens (Modelo A):** para modelo sem tatuagem, apague do prompt o trecho `both forearms covered with dense full-sleeve tattoos (...)`.\n"] if d['model']=='A' else [])]
    shots=list(d['shots'])+d.get('extra_variants',[])
    for name,src,pose,ar in shots:
        mk=d.get('model_override',{}).get(name,d['model'])
        col=d.get('color_override',{}).get(name,d['color_default'])
        garment=d['garment'].replace('{COR}',col)
        if name.startswith('F4 — Macro'):
            body=(f"{STUDIO} {pose} The fabric is 220gsm cotton jersey with 4% elastane, {col}: tight even single-jersey loops from 30/1 extra-long-staple cotton yarn, smooth face with a subtle satin sheen catching the raking light, slightly lifted by the elastane stretch, no pilling, no loose fibers. {CLOSE}")
        else:
            fitt=FIT.get(pk,FIT_REG)
            if 'Oversized (variante' in name:
                fitt="Oversized fit (size M): body length 76 cm below the hip, chest width 59 cm, dropped shoulder 56 cm, wide sleeves 25 cm ending near the elbow. "
            body=(f"{STUDIO} The model is {model_txt(mk)}. He wears {garment}, {'' if any(w in garment.lower() for w in ('pants','trousers','joggers','sweatpants')) else 'tucked out, '}paired with {d.get('bottom_override',{}).get(name, d['bottom'] if mk!='D' else 'black trousers')}. "
                  f"{BEH[pk]} {fitt}{pose} {CLOSE}")
        lines.append(f"\n## {name}\n\n- **Origem no print:** {src}\n- **Modelo:** {MODELS[mk][0].split(' (')[0]} · **Cor:** `{col}` · **Formato:** {ar}\n")
        if 'Mockup' in name:
            lines.append("- ⚠️ Não reproduzimos a arte do fornecedor. Gere a peça **lisa** e aplique a arte HMZT depois (Photoshop/mockup) — IA embaralha texto.\n")
        lines.append(f"\n```text\n{body}\n```\n")
    open(f"{OUT}/{pk}-prompts.md",'w').write('\n'.join(lines))

import json,glob
DATA=os.path.join(os.path.dirname(os.path.abspath(__file__)),'data')
for f in sorted(glob.glob(os.path.join(DATA,'P*.json'))):
    j=json.load(open(f,encoding='utf-8')); pr=j['prompt']; pk=j['pk']
    if pr.get('model')=='custom':
        MODELS['X_'+pk]=('Modelo próprio ('+pk+')',pr.get('model_desc',''),'','')
        mk='X_'+pk
    else: mk=pr.get('model','A')
    P[pk]=dict(title=pk+' — '+j['nome'].replace('Camiseta ','',1), model=mk, color_default=pr['color_default'],
               garment=pr['garment'], bottom=pr.get('bottom',''), colors=pr.get('colors',''),
               shots=[tuple(x[:4]) for x in pr['shots']],
               color_override={x[0]:x[4] for x in pr['shots'] if len(x)>4 and x[4]},
               bottom_override={x[0]:x[5] for x in pr['shots'] if len(x)>5 and x[5]})
    BEH[pk]=pr.get('behavior','')
    FIT[pk]=(pr.get('fit','').rstrip()+' ') if pr.get('fit') else ''
if __name__=='__main__':
    for k,d in P.items(): build(k,d)
print(sorted(os.listdir(OUT)))
