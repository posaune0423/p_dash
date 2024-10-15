export const detectiOS = () => {
  if (typeof navigator === 'undefined') {
    return false
  }

  const toMatch = [/iPhone/i, /iPad/i, /iPod/i]

  return toMatch.some((toMatchItem) => {
    return RegExp(toMatchItem).exec(navigator.userAgent)
  })
}

export const detectAndroid = () => {
  if (typeof navigator === 'undefined') {
    return false
  }
  const toMatch = [/Android/i, /webOS/i, /BlackBerry/i, /Windows Phone/i]

  return toMatch.some((toMatchItem) => {
    return RegExp(toMatchItem).exec(navigator.userAgent)
  })
}

export const detectMobile = () => {
  return detectiOS() || detectAndroid()
}
