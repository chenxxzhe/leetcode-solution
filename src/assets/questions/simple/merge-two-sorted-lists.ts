const desc = `
将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。 ListNode 已经实现, 可以全局使用
 
示例：

输入：1->2->4, 1->3->4
输出：1->1->2->3->4->4

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/merge-two-sorted-lists
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
`

class ListNode {
  val: number
  next: ListNode | null
  static from(arr: number[] | null): ListNode | null {
    if (!arr || arr.length === 0) return null 
    const head = new ListNode(arr[0])
    let cur: ListNode = head
    for (let i = 0; i < arr.length - 1; i++) {
      cur.next = new ListNode(arr[i+1])
      cur = cur.next      
    }
    return head
  }
  constructor(val?: number, next?: ListNode | null) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
  }
  toArray(): any[] {
    const ret: any[] = []
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let node: ListNode | null = this
    while(node) {
      ret.push(node.val)
      node = node.next
    }
    console.log(ret)
    return ret
  }
}

const config: QuestionConfig = {
  id: 21,
  desc,
  category: 'algorithm',
  global: {ListNode: `class ListNode {
    static from(arr) {
      if (!arr || arr.length === 0) return null 
      const head = new ListNode(arr[0])
      let cur = head
      for (let i = 0; i < arr.length - 1; i++) {
        cur.next = new ListNode(arr[i+1])
        cur = cur.next      
      }
      return head
    }
    constructor(val, next) {
      this.val = (val===undefined ? 0 : val)
      this.next = (next===undefined ? null : next)
    }
    toArray() {
      const ret = []
      let node = this
      while(node) {
        ret.push(node.val)
        node = node.next
      }
      return ret
    }
  }`},
  beforeSolution(testCaseList: number[][]): any[] {
    return testCaseList.map(ListNode.from)
  },
  afterSolution(list: ListNode | null) {
    console.log('after', list)
    return list?.toArray() ?? null
  },
  solutions: {
    default(l1: ListNode | null, l2: ListNode | null): ListNode | null {
      if (!l1 && !l2) return null
      const head = new ListNode()
      let cur: ListNode = null!
      while(l1 || l2) {
        cur = cur ? (cur.next = new ListNode()) : head
        if (l1 && !l2) {
          cur.val = l1.val
          l1 = l1.next
        } else if (l2 && !l1) {
          cur.val = l2.val
          l2 = l2.next
        } else if (l1!.val < l2!.val) {
          cur.val = l1!.val
          l1 = l1!.next
        } else {
          cur.val = l2!.val
          l2 = l2!.next
        }
      }
      return head
    },
    baseOriginNode(l1: ListNode | null, l2: ListNode | null): ListNode | null {
      if (!l1 || !l2) return l1 || l2 || null
      let head = l1
      let parent: ListNode | null = null
      while(l1 && l2) {
        if (l2.val > l1.val) { 
          parent = l1
          l1 = l1.next
        } else {
          const secondNext: ListNode | null = l2.next
          if (!parent) { head = l2 }
          else { parent.next = l2 }
          l2.next = l1
          parent = l2    
          l2 = secondNext
        }
      }
      if (l2) { parent!.next = l2 }
      return head
    },
    // recursion(l1: ListNode | null, l2: ListNode | null): ListNode | null {

    // },
    // arraySort(l1: ListNode | null, l2: ListNode | null): ListNode | null {

    // },
    // cursor(l1: ListNode | null, l2: ListNode | null): ListNode | null {

    // },
  },
  testCase: [
    [[[1,2,4], [1,3,4]], [1,1,2,3,4,4]],
    [[null, null], null],
  ],
  comment: '链表可以基于自身转移节点引用, 从而避免创建开销',
}

export default config
