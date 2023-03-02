export const vueMaskPhone = (value) => {
  const x = value.replace(/\D/g, "").match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,4})/)

  if (!x[2] && x[1] !== "") {
    return x[1] === "8" ? x[1] : "8" + x[1]
  }
  return !x[3] ? x[1] + x[2] : x[1] + "(" + x[2] + ") " + x[3] + (x[4] ? "-" + x[4] : "")

}
