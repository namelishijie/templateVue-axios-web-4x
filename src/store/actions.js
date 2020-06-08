export default {
  TOKEN(context, option) {
    context.commit("toKen", option)
  },
  ISLOADING(context, option) {
    context.commit("isloading", option)
  }
}