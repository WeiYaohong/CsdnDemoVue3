<template>
  <div class="comprehensive-table-container">
    <el-form
      ref="ruleFormRef"
      label-width="120px"
      :model="userData"
      :rules="rules"
      style="width: 60%"
    >
      <el-form-item :label="translateTitle('用户姓名')" prop="name">
        <el-input v-model="userData.name" />
      </el-form-item>
      <el-form-item :label="translateTitle('用户账号')" prop="account">
        <el-input v-model="userData.account" />
      </el-form-item>
      <el-form-item :label="translateTitle('密码')" prop="password">
        <el-input v-model="userData.password" show-password type="password" />
      </el-form-item>
      <el-form-item :label="translateTitle('手机号码')" prop="mobile">
        <el-input v-model="userData.mobile" />
      </el-form-item>
      <el-form-item :label="translateTitle('邮箱地址')" prop="email">
        <el-input v-model="userData.email" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit()">
          {{ translateTitle('保存') }}
        </el-button>
        <el-button @click="resetForm()">{{ translateTitle('重置') }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { translateTitle } from '@/utils/i18n'
  export default defineComponent({
    name: 'Sortable',
    components: {},

    setup() {
      // const $baseConfirm = inject('$baseConfirm')
      const $baseMessage = inject('$baseMessage')
      // 表单校验方法
      const checkAccount = (rule, value, callback) => {
        // const regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im
        const regEn = /[`~!@#$%^&*()_+<>?:"{},./;'[\]]/im
        const regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im
        if (regEn.test(value) || regCn.test(value)) {
          callback(new Error(translateTitle('不能包含特殊字符')))
        } else {
          callback()
        }
      }
      const checkMobile = (rule, value, callback) => {
        const regCN =
          /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
        if (!regCN.test(value)) {
          callback(new Error(translateTitle('手机号格式不正确')))
        } else {
          callback()
        }
      }
      const checkMail = (rule, value, callback) => {
        // const regCN = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/
        const regCN =
          /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/
        if (!regCN.test(value)) {
          callback(new Error(translateTitle('邮箱格式不正确')))
        } else {
          callback()
        }
      }
      const checkPwd = (rule, value, callback) => {
        //大小写字母，数字，特殊字符，长度8-30
        const regPwd = new RegExp(
          '(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^a-zA-Z0-9]).{8,30}'
        )
        //字母，数字，特殊字符，长度8-30
        //const pwdRegex = new RegExp('(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,30}');
        if (!regPwd.test(value)) {
          callback(
            new Error(
              translateTitle(
                '密码复杂度不够(大小写字母，数字，特殊字符，长度8-30)'
              )
            )
          )
        } else {
          callback()
        }
      }

      const state = reactive({
        ruleFormRef: null,
        listLoading: false,
        userData: {
          name: '',
          account: '',
          mobile: '',
          email: '',
          password: '',
        },
        rules: {
          name: [
            {
              required: true,
              message: translateTitle('请输入') + translateTitle('用户姓名'),
              trigger: 'blur',
            },
          ],
          account: [
            {
              required: true,
              message: translateTitle('请输入') + translateTitle('用户账号'),
              trigger: 'blur',
            },
            { validator: checkAccount, trigger: ['blur', 'change'] },
          ],
          mobile: [
            {
              required: true,
              message: translateTitle('请输入') + translateTitle('手机号码'),
              trigger: 'blur',
            },
            { validator: checkMobile, trigger: ['blur', 'change'] },
          ],
          email: [
            {
              required: true,
              message: translateTitle('请输入') + translateTitle('邮箱地址'),
              trigger: 'blur',
            },
            { validator: checkMail, trigger: ['blur', 'change'] },
          ],
          password: [
            {
              required: true,
              message: translateTitle('请输入') + translateTitle('密码'),
              trigger: 'blur',
            },
            { validator: checkPwd, trigger: ['blur', 'change'] },
          ],
          //trigger 说明 blur:失去焦点触发校验,change：值改变时触发
          // { validator: checkMail, trigger:['blur','change'] } 两种情况下都触发
        },
      })

      //  查询数据
      const fetchData = async () => {}
      const onSubmit = () => {
        state['ruleFormRef'].validate((valid) => {
          if (valid) {
            saveUserData()
          }
        })
      }
      const resetForm = () => {
        state.userData = {
          name: '',
          account: '',
          mobile: '',
          email: '',
          password: '',
        }
        state['ruleFormRef'].resetFields()
      }
      const saveUserData = () => {
        $baseMessage(
          translateTitle('操作成功'),
          'success',
          'yes-hey-message-success'
        )
      }

      onMounted(() => {})

      return {
        ...toRefs(state),
        fetchData,
        translateTitle,
        checkAccount,
        checkMobile,
        checkMail,
        checkPwd,
        onSubmit,
        resetForm,
        saveUserData,
      }
    },
  })
</script>
