declare enum QuestionDifficulty {
  simple = 'simple',
  medium = 'medium',
  hard = 'hard',
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
  /** Global object which will be injected to solution function, only accept string */
  global?: Record<string, string>
  solutions: {
    default: Function
    [strategy: string]: Function
  }
  /** [args, expect] */
  testCase: TestCase[]
  /** handle test case */
  beforeSolution?: (testCase: any[]) => any[]
  /** handle output */
  afterSolution?: (output: any) => any
}

/** test case running result */
declare interface TestResult {
  input: any[]
  output: any
  expect: any
  // ms
  duration: number
}
