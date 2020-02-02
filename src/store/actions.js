export default {
  toKen(context, option) {
    context.commit("toKen", option)
  },
  lang(context, option) {
    context.commit("lang", option)
  },
  isloading(context, option) {
    context.commit("isloading", option)
  }
}