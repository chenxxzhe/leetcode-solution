const desc = `
给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。

有效字符串需满足：

左括号必须用相同类型的右括号闭合。
左括号必须以正确的顺序闭合。
注意空字符串可被认为是有效字符串。

示例 1:

输入: "()"
输出: true

示例 2:

输入: "()[]{}"
输出: true

示例 3:

输入: "(]"
输出: false
示例 4:

输入: "([)]"
输出: false
示例 5:

输入: "{[]}"
输出: true

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/valid-parentheses
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
`

const config: QuestionConfig = {
  id: 20,
  desc,
  category: 'algorithm',
  solutions: {
    default(s: string): boolean {
      const len = s.length
      if (!len) { return true}
      if (len % 2 !== 0) { return false }
      const stack: string[] = []
      const map: Record<string, string> = {')': '(', '}': '{', ']': '['}
      const isLeft = (str: string) => ['(', '[', '{'].includes(str)
      for (let i = 0; i < len; i++) {
        const str = s[i]
        if (isLeft(str)) { stack.push(str) }
        else if (stack.pop() !== map[str] ) { return false }
      }
      return !stack.length
    },
    
  },
  testCase: [
    [[''], true],
    [['['], false],
    [['(('], false],
    [['()'], true],
    [['()[]{}'], true],
    [['(]'], false],
    [['([)]'], false],
    [['{[]}'], true],
  ],
  comment: 'use queue to check',
}

export default config
