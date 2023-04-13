<script setup>
  import { useUserStore } from '@/store/modules/user'
  import { toLoginRoute } from '@/utils/routes'
  import { translateTitle } from '@/utils/i18n'
  import { User } from '@element-plus/icons-vue'

  const route = useRoute()
  const router = useRouter()

  const userStore = useUserStore()
  const { avatar, username } = storeToRefs(userStore)
  const { logout } = userStore

  const active = ref(false)

  const handleVisibleChange = (val) => {
    active.value = val
  }
  const handleCommand = async (command) => {
    switch (command) {
      case 'logout':
        await logout()
        console.log('aaaaaaaaaaaa')
        localStorage.removeItem('yes-ums-token')
        await router.push(toLoginRoute(route.fullPath))
        break
      case 'personalCenter':
        await router.push('/setting/personalCenter')
        break
    }
  }
</script>

<template>
  <el-dropdown @command="handleCommand" @visible-change="handleVisibleChange">
    <span class="avatar-dropdown">
      <el-avatar class="user-avatar" :src="avatar" />
      <div class="user-name">
        <span class="hidden-xs-only">{{ username }}</span>
        <!-- <yes-icon
          class="yes-dropdown"
          :class="{ 'yes-dropdown-active': active }"
          icon="arrow-down-s-line"
        /> -->
        <yes-icon
          class="yes-dropdown"
          :class="{ 'yes-dropdown-active': active }"
          icon="arrow-down-s-line"
        />
      </div>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="personalCenter">
          <!-- <yes-icon icon="user-line" /> -->
          <el-icon size="16"><user /></el-icon>
          <span>{{ translateTitle('个人中心') }}</span>
        </el-dropdown-item>
        <el-dropdown-item command="logout">
          <yes-icon icon="logout-circle-r-line" />
          <span>{{ translateTitle('退出登录') }}</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style lang="scss" scoped>
  .avatar-dropdown {
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: center;
    justify-items: center;

    .user-avatar {
      width: 40px;
      height: 40px;
      margin-left: 15px;
      cursor: pointer;
      border-radius: 50%;
    }

    .user-name {
      position: relative;
      display: flex;
      align-content: center;
      align-items: center;
      height: 40px;
      margin-left: 6px;
      line-height: 40px;
      cursor: pointer;

      [class*='ri-'] {
        margin-left: 0 !important;
      }
    }
  }
</style>
