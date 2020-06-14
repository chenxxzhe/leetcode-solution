const desc = `
给出一个 32 位的有符号整数，你需要将这个整数中每位上的数字进行反转。

示例 1:

输入: 123
输出: 321
 示例 2:

输入: -123
输出: -321
示例 3:

输入: 120
输出: 21
注意:

假设我们的环境只能存储得下 32 位的有符号整数，则其数值范围为 [−231, 231 − 1]。请根据这个假设，如果反转后整数溢出那么就返回 0。
`

const config: QuestionConfig = {
  id: 7,
  desc,
  category: 'algorithm',
  solutions: {
    default(x: number): number {
      let str = x.toString()
      const neg = str[0] === '-'
      if (neg) {
        str = str.substring(1)
      }
      const rev = + str.split('').reverse().join('')
      if (rev >= Math.pow(2, 31)) { return 0}
      return neg ? - rev :  rev
    },
    move(x: number): number {
      let ret = 0
      while (x !== 0) {
        // every loop push x end-side number to ret
        // ret * 10 move current number award
        // x % 10, push x end-side number
        ret = ret * 10 + x % 10
        // cut end-side
        // x | 0 to round number
        x = (x / 10) | 0
      }
      // check overflow
      return (ret | 0) === ret ? ret : 0
    },
  },
  testCase: [
    [[123], 321],
    [[-123], -321],
    [[1534236469], 0],
  ],
  comment: '使用运算方式, 搬运数字, 而不是使用字符串的方法.',
}

export default config
