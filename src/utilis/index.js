

export const handleChangePrefix = (titlePrefix) => {
  if (!titlePrefix) return
  const defailtPrefix = ""
  const prefixe = titlePrefix.toLowerCase()
  const prefixesObj = {
    "mr": "Sr.",
    "ms": "Srta.",
  }


  return prefixesObj[prefixe] || defailtPrefix
}


export function formatDate(fecha) {
  const meses = [
    'enero',
    'febrero',
    'marzo',
    'abril',
    'mayo',
    'junio',
    'julio',
    'agosto',
    'septiembre',
    'octubre',
    'noviembre',
    'diciembre',
  ];
  const fechaObj = new Date(fecha);
  const dia = fechaObj.getUTCDate();
  const year = fechaObj.getUTCFullYear();
  const mesTexto = meses[fechaObj.getUTCMonth()];

  return `${dia} de ${mesTexto} del ${year}`;
}