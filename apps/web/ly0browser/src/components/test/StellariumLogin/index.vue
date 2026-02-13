<template>
  <div class="login-page">
    <div class="login-container">
      <el-card class="login-card">
        <div class="login-form-area">
          <header class="form-header">
            <span class="management-text">管理界面</span>
            <span class="close-icon" @click="handleClose">
              <el-icon><Close /></el-icon>
            </span>
          </header>

          <main class="form-main">
            <h1 class="brand-title">Stellarium</h1>
            <p class="brand-subtitle">企业级数据资产平台</p>

            <div class="otp-section">
              <p class="otp-prompt">We've sent an OTP</p>
              <el-input
                v-model="otpValue"
                placeholder="Enter 5 digital OTP"
                maxlength="5"
                size="large"
                class="otp-input"
              />
              <el-button
                type="danger"
                size="large"
                class="verify-button"
                :disabled="!isOtpValid"
                @click="verifyOtp"
              >
                Verify OTP
              </el-button>
            </div>
          </main>

          <footer class="form-footer">
            <div class="login-methods">
              <span class="login-icon">
                <el-icon><User /></el-icon>
              </span>
              <span class="login-icon active-method">
                <el-icon><Message /></el-icon>
                E-mail / Phone
              </span>
              <span class="login-icon">
                <el-icon><ChatDotSquare /></el-icon>
                WeChat
              </span>
            </div>
          </footer>
        </div>

        <div class="login-ad-area">
          <span class="ad-text">AD</span>
        </div>
      </el-card>

      <div class="footer-info">
        <p>ICP备16001868号-2</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { ElMessage } from 'element-plus';
import { Close, User, Message, ChatDotSquare } from '@element-plus/icons-vue';

// --- 状态管理 ---
const otpValue = ref('');

// --- 计算属性 ---
const isOtpValid = computed(() => {
  // 简单的5位数字验证
  return /^\d{5}$/.test(otpValue.value);
});

// --- 方法 ---
const verifyOtp = () => {
  if (isOtpValid.value) {
    // 实际应用中，这里会发起API请求进行OTP验证
    ElMessage.success(`正在验证 OTP: ${otpValue.value}`);
    // 成功后跳转到主界面
  } else {
    ElMessage.error('请输入有效的5位数字OTP');
  }
};

const handleClose = () => {
  // 实际应用中，可以关闭弹窗或跳转到首页
  ElMessage.info('关闭按钮被点击');
};
</script>

<style scoped>
/* ------------------------------------------- */
/* 整体布局和背景样式 (模仿图片背景) */
/* ------------------------------------------- */
.login-page {
  /* 模仿图片中的深色星空背景 */
  background: radial-gradient(circle at center, #1e1e2d, #14141c);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  /* 模仿图片中的星空点缀效果 */
  position: relative;
}

.login-page::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('data:image/svg+xml;utf8,<svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="0.2" fill="rgba(255, 255, 255, 0.3)" /><circle cx="50" cy="80" r="0.15" fill="rgba(255, 255, 255, 0.4)" /><circle cx="90" cy="30" r="0.25" fill="rgba(255, 255, 255, 0.2)" /><circle cx="30" cy="40" r="0.1" fill="rgba(255, 255, 255, 0.5)" /></svg>');
  background-size: 100px 100px;
  pointer-events: none;
}

.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
}

/* ------------------------------------------- */
/* 核心卡片样式 */
/* ------------------------------------------- */
.login-card {
  width: 900px; /* 相对大一点的卡片宽度 */
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  background-color: #f7f9fd; /* 浅灰色背景 */
  border: none;
}

/* Element Plus 覆盖，移除默认内边距 */
.login-card :deep(.el-card__body) {
  padding: 0;
  display: flex; /* 启用左右分栏 */
}

/* ------------------------------------------- */
/* 左侧表单区域样式 */
/* ------------------------------------------- */
.login-form-area {
  flex: 1;
  padding: 40px 60px;
  min-height: 500px; /* 保证高度，与右侧保持一致 */
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* 使页脚在底部 */
  position: relative;
}

.form-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.management-text {
  font-size: 16px;
  color: #333;
  font-weight: 500;
}

.close-icon {
  font-size: 20px;
  color: #999;
  cursor: pointer;
  position: absolute; /* 绝对定位到卡片右上角 */
  top: 15px;
  right: 15px;
  z-index: 10;
}

.form-main {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center; /* 内容居中 */
  align-items: flex-start;
  padding-bottom: 20px;
}

.brand-title {
  font-size: 32px;
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
}

.brand-subtitle {
  font-size: 14px;
  color: #999;
  margin-bottom: 40px;
}

.otp-section {
  width: 100%;
}

.otp-prompt {
  font-size: 16px;
  font-weight: 500;
  color: #555;
  margin-bottom: 10px;
}

.otp-input {
  margin-bottom: 20px;
}

/* 模仿图片中的粉色按钮 */
.verify-button {
  width: 100%;
  background-color: #e9b3b3; /* 浅粉色 */
  border-color: #e9b3b3;
  color: #fff;
  font-weight: bold;
  transition: background-color 0.3s;
}

.verify-button:hover {
  background-color: #e09999;
  border-color: #e09999;
}

/* ------------------------------------------- */
/* 登录方式页脚样式 */
/* ------------------------------------------- */
.form-footer {
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.login-methods {
  display: flex;
  gap: 20px;
  justify-content: center;
}

.login-icon {
  display: flex;
  align-items: center;
  gap: 5px;
  color: #777;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 4px;
  transition: color 0.3s;
}

.login-icon:hover {
  color: #333;
}

.active-method {
  font-weight: 600;
  color: #333;
  /* 模仿图片中略微突出的样式 */
  /* background-color: #eee; */
}

/* ------------------------------------------- */
/* 右侧广告区域样式 */
/* ------------------------------------------- */
.login-ad-area {
  flex: 1;
  background-color: #ffffff; /* 纯白背景 */
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 80px;
  font-weight: 900;
  color: #222;
  border-left: 1px solid #f0f0f0;
  min-height: 500px;
}

/* ------------------------------------------- */
/* 底部备案信息 */
/* ------------------------------------------- */
.footer-info {
  margin-top: 20px;
}

.footer-info p {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5); /* 浅灰色文字，与背景融合 */
}
</style>
