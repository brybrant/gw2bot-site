import Vue from 'vue'

export default () => {
  /*
   * Replace the last whitespace character with a non-breaking space to force
   * a minimum of two orphan words in a given block of text
   *
   * \xA0 = non-breaking space (javascript entity)
   * $1 = capture group 1
  */
  Vue.filter('twoOrphans', text => text.replace(/\s+(\S+$)/, '\xA0$1'))

  /*
   * Convert integer to duration in format "x minutes, y seconds"
  */
  Vue.filter('duration', (number) => {
    const minutes = Math.floor(number / 60)
    if (minutes >= 1) {
      return `${minutes} minutes, ${number % 60} seconds`
    }
    return `${number % 60} seconds`
  })

  /*
   * Round percentages to two decimal places, or 100, or 0.
  */
  Vue.filter('percentage', (number) => {
    if (number >= 99.995) { return '100' }
    if (number < 0.005) { return '0' }
    return number.toFixed(2)
  })

  /*
   * Round might stacks to two decimal places, or 25, or 0.
  */
  Vue.filter('mightStacks', (number) => {
    if (number >= 24.995) { return '25' }
    if (number < 0.005) { return '0' }
    return number.toFixed(2)
  })
}
