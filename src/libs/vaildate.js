
let ValidatorMessage = () => {
  return {
    required: field => `${field}不能为空`,
    email: () => '请输入正确的邮箱格式'
  }
}

let ValidatorExtend = {
  // phone: { // 验证手机号
  //   messages: field => {
  //     return field + '必须11位'
  //   },
  //   validate: value => {
  //     return value.length == 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
  //   }
  // }
}

const UpdateDictionary = (Validator, Messages) => {
  Validator.updateDictionary({
    en: {
      messages: {
        ...Messages
      }
    }
  })
}

const Extend = (config, object) => {
  for(var key in object) {
    config.extend(key, {
      getMessage: object[key].messages,
      validate: object[key].validate
    })
  }
}

export default {
  install(Vue, config) {
    UpdateDictionary(config, ValidatorMessage())
    Extend(config, ValidatorExtend)
    Vue.prototype.$ValidatorMessage = param => {
      UpdateDictionary(config, param)
    }
    Vue.prototype.$ValidatorExtend = param => {
      Extend(config, param)
    }
  }
}
