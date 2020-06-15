const desc = `
判断一个整数是否是回文数。回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。

示例 1:

输入: 121
输出: true

示例 2:

输入: -121
输出: false
解释: 从左向右读, 为 -121 。 从右向左读, 为 121- 。因此它不是一个回文数。

示例 3:

输入: 10
输出: false
解释: 从右向左读, 为 01 。因此它不是一个回文数。

进阶:
你能不将整数转为字符串来解决这个问题吗？
`

const config: QuestionConfig = {
  id: 9,
  desc,
  category: 'algorithm',
  solutions: {
    default(x: number): boolean {
      // only math, compare reversed number and raw number
      if (x < 0) { return false }
      let raw = x
      let reverse = 0
      while (raw > 0) {
        reverse = reverse * 10 + raw % 10
        raw = (raw / 10) | 0
      }
      return reverse === x
    },
    strCompare(x: number): boolean {
      if (x < 0) { return false }
      const str = x.toString()
      return str.split('').reverse().join('') === str
    },
  },
  testCase: [
    [[121], true],
    [[-121], false],
    [[10], false],
    [[1], true],
  ],
  comment: '回文最简单直接就是翻转再看是否相等',
}

export default config
