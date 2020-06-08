const type = [
  "token",
  "isloading",
]

const obj = {}

type.forEach(item => {
  obj[item] = (state, option) => {
    state[item] = option
  }
})

export default obj
