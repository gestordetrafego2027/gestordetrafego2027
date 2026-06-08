/**
 * Carrega Material Symbols Outlined de forma síncrona — robusta contra
 * falhas de JS. Antes a fonte vinha com media="print" + troca por "all"
 * via onLoad — se qualquer JS travasse antes do dispatch, os ícones
 * viravam o texto literal do glifo ("check", "lightbulb", etc).
 *
 * display=block: navegador ESCONDE o texto até a fonte chegar (~50ms),
 * evita o flash do nome do ícone como string.
 */
export default function NonBlockingStyles() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block"
      />
    </>
  );
}
