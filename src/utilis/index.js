
export const prexixesList = ["mr", "ms", "mrs", "miss", "dr", ""]
export const generList = ["male", "female", "other"]
export const handleChangePrefix = (titlePrefix) => {
  if (!titlePrefix) return
  const defailtPrefix = ""
  const prefixe = titlePrefix.toLowerCase()
  // title: string("mr", "ms", "mrs", "miss", "dr", "")
  const prefixesObj = {
    "mr": "Sr.",
    "ms": "Srta.",
    "mrs": "Sra.",
    "miss": "Sra.",
    "dr": "Dr.",
  }


  return prefixesObj[prefixe] || defailtPrefix
}

