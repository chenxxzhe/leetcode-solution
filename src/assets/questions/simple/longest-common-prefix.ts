const desc = `
编写一个函数来查找字符串数组中的最长公共前缀。

如果不存在公共前缀，返回空字符串 ""。

示例 1:

输入: ["flower","flow","flight"]
输出: "fl"
示例 2:

输入: ["dog","racecar","car"]
输出: ""
解释: 输入不存在公共前缀。
说明:

所有输入只包含小写字母 a-z 。
`

const config: QuestionConfig = {
  id: 14,
  desc,
  category: 'algorithm',
  solutions: {
    default(strs: string[]): string {
      // find the shortest
      const sorted = strs.sort((a, b) => b.length - a.length)
      let shortest = (sorted.pop() || '').split('')
      // use shortest string to match
      sorted.some((s) => {
        shortest.some((m, i) => {
          if (m !== s[i]) {
            shortest = shortest.slice(0, i)
            return true
          }
        })
        if (shortest.length === 0) {
          return true
        }
      })
      return shortest.join('')
    },
    /** use ascii order character */
    asciiSort(strs: string[]): string {
      if (strs.length === 0) { return ''}
      // will sort string in ascii order
      const sorted = strs.sort()
      const start = sorted[0]
      const end = sorted[sorted.length - 1]
      // only compare start and end will get the right answer
      let index
      const len = end.length - 1
      const foundDiff = start.split('').some((str, i) => {
        if ( i > len || str !== end[i]) {
          index = i
          return true
        }
      })
      return foundDiff ? start.substring(0, index) : start
    },
  },
  testCase: [
    [[['flower','flow','flight']], 'fl'],
    [[[]], ''],
    [[['flower','flow','flight', 'faaaa']], 'f'],
  ],
  comment: '使用运算方式, 搬运数字, 而不是使用字符串的方法.',
}

export default config
