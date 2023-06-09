<script setup>
  import { useRoutesStore } from '@/store/modules/routes'
  import variables from '@lib/styles/variables/variables.scss'

  defineProps({
    layout: {
      type: String,
      default: 'horizontal',
    },
  })

  const routesStore = useRoutesStore()
  const { getActiveMenu: activeMenu, getRoutes: routes } =
    storeToRefs(routesStore)
</script>

<template>
  <div class="yes-header">
    <div class="yes-main">
      <el-row :gutter="20">
        <el-col :span="6">
          <ums-logo />
        </el-col>
        <el-col :span="18">
          <div class="right-panel">
            <el-menu
              v-if="'horizontal' === layout"
              :active-text-color="variables['menu-color-active']"
              :background-color="variables['menu-background']"
              :default-active="activeMenu.data"
              menu-trigger="hover"
              mode="horizontal"
              popper-append-to-body
              style="width: 100%"
              :text-color="variables['menu-color']"
            >
              <template v-for="(item, index) in routes">
                <ums-menu
                  v-if="item.meta && !item.meta.hidden"
                  :key="index + item.name"
                  :item="item"
                  :layout="layout"
                />
              </template>
            </el-menu>
            <ums-error-log />
            <ums-lock />
            <ums-search />
            <ums-notice />
            <ums-full-screen />
            <ums-language />
            <ums-theme />
            <ums-refresh />
            <ums-avatar />
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .yes-header {
    display: flex;
    align-items: center;
    justify-items: flex-end;
    height: $base-header-height;
    background: $base-menu-background;

    .yes-main {
      padding: 0 $base-padding 0 $base-padding;

      .right-panel {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        height: $base-header-height;

        :deep() {
          .el-sub-menu__icon-more {
            margin-top: #{math.div($base-header-height - 20, 2)} !important;
          }

          > .el-menu--horizontal.el-menu {
            > .el-sub-menu > .el-sub-menu__title {
              padding-right: 0;

              > .el-sub-menu__icon-arrow {
                position: relative !important;
                //margin-top: #{math.div($base-header-height - 11, 2)} !important;
                margin-top: -5px !important;
                margin-right: 0;
                margin-left: 30px;
              }
            }

            > .el-menu-item {
              .el-tag {
                position: relative !important;
                margin-top: 0 !important;
                margin-right: -20px;
                margin-left: 25px;
              }

              .yes-dot {
                float: right;
                margin-top: #{math.div($base-header-height - 6, 2)} + 1;
              }

              @media only screen and (max-width: 1199px) {
                .el-tag {
                  display: none;
                }
              }
            }
          }

          .el-menu {
            &.el-menu--horizontal {
              display: flex;
              align-items: center;
              justify-content: flex-end;
              width: 100%;
              height: $base-header-height;
              border-bottom: 0 solid transparent !important;

              .el-menu-item,
              .el-sub-menu__title {
                height: #{math.div($base-header-height, 1.3)};
                padding: 0 $base-padding;
                line-height: #{math.div($base-header-height, 1.3)};
              }

              > .el-menu-item,
              > .el-sub-menu {
                height: $base-header-height;
                line-height: $base-header-height;

                .el-sub-menu__icon-arrow {
                  float: right;
                  margin-top: #{math.div($base-menu-item-height - 16, 2)};
                }

                > .el-sub-menu__title {
                  display: flex;
                  align-items: flex-start;
                  height: $base-header-height;
                  line-height: $base-header-height;
                }
              }
            }

            [class*='ri-'] {
              margin-left: 0;
              color: var(--el-color-white);
              cursor: pointer;
            }

            .el-sub-menu,
            .el-menu-item {
              i {
                color: inherit;
              }

              &.is-active {
                border-bottom: 0 solid transparent;

                .el-sub-menu__title {
                  border-bottom: 0 solid transparent;
                }
              }
            }

            .el-menu-item {
              &.is-active {
                background: var(--el-color-primary) !important;
              }
            }
          }

          .user-name {
            color: var(--el-color-white);
          }

          .user-name + i {
            color: var(--el-color-white);
          }

          [class*='ri-'] {
            margin-left: $base-margin;
            color: var(--el-color-white);
            cursor: pointer;
          }

          button {
            svg {
              margin-right: 0;
              color: var(--el-color-white);
              cursor: pointer;
              fill: var(--el-color-white);
            }
          }
        }
      }
    }
  }
</style>

<!--由于element-plus
bug使用popper-append-to-body=false会导致多级路由无法显示，故所有菜单必须生成至body下，样式必须放到body下-->
<style lang="scss">
  @mixin menuActiveHover {
    &:hover,
    &.is-active {
      i {
        color: var(--el-color-white) !important;
      }

      color: var(--el-color-white) !important;
      background: var(--el-color-primary) !important;

      .el-sub-menu__title {
        i {
          color: var(--el-color-white) !important;
        }

        color: var(--el-color-white) !important;
        background: var(--el-color-primary) !important;
      }
    }
  }

  .el-popper {
    .el-menu--horizontal {
      height: #{math.div($base-header-height, 1.3)};
      border-bottom: 0 solid transparent !important;

      @media only screen and (max-width: 1199px) {
        .el-tag {
          display: none;
        }
      }

      .el-tag {
        position: absolute;
        right: 20px;
        margin-top: 0 !important;
      }

      .yes-dot {
        position: absolute;
        right: 20px;
        margin-top: 0 !important;
      }

      .el-menu-item,
      .el-sub-menu {
        height: #{math.div($base-header-height, 1.3)};
        line-height: #{math.div($base-header-height, 1.3)};
        @include menuActiveHover;

        i {
          color: inherit;
        }

        .el-sub-menu__icon-arrow {
          float: right;
        }

        .el-sub-menu__title {
          height: #{math.div($base-header-height, 1.3)};
          line-height: #{math.div($base-header-height, 1.3)};
          @include menuActiveHover;
        }
      }
    }
  }
</style>
