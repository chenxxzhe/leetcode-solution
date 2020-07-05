const ctx = require.context('.', true, /\.ts$/)

export const questions: Record<string, Record<string, QuestionConfig>> = ctx
  .keys()
  .filter(key => !key.match('./index.ts'))
  .reduce((map, key) => {
    const [difficulty, name] = key.split('/').slice(1)
    if (!map[difficulty]) {
      map[difficulty] = {}
    }
    map[difficulty][name.replace('.ts', '')] = ctx(key).default
    return map
  }, {} as any)

export const getQuestion = (level: QuestionDifficulty, name: string): QuestionConfig => {
  return questions[level][name]
}