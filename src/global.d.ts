declare enum QuestionDifficulty {
  simple,
  medium,
  hard,
}

/** input args[], expected output   */
declare type TestCase = [any[], any]

declare interface QuestionConfig {
  /** leetcode id */
  id: string | number
  category: string
  desc: string
  /** description of how I resolve question */
  comment?: string
  solutions: {
    default: Function
    [strategy: string]: Function
  }
  testCase: TestCase[]
}
