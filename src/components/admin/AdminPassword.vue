<template>
    <div class="login-window">
        <div class="title-bar">
            <span class="title">로그인</span>
            <div class="window-controls">
                <div class="btn minimize"><div class="symbol"></div></div>
                <div class="btn maximize"><div class="symbol"></div></div>
                <div class="btn close"><div class="symbol"></div></div>
            </div>
        </div>
        <input type="password" class="login-input" placeholder="비밀번호를 입력하세요." v-model="password" @keyup.enter="login">
        <button class="login-button" @click="login">로그인</button>
    </div>


</template>

<script setup>
import apiClient from "@/config/apiClient";
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";

const password = ref('')
const errorMessage = ref('')
const router = useRouter()

const login = async () => {
    errorMessage.value = ''
    try {
        const response = await apiClient.post('/auth/login', { password: password.value })
        const token = response.data.accessToken

        localStorage.setItem('admin_token', token)
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

        router.push('/admin/home')
    } catch (error) {
        errorMessage.value = '비밀번호가 일치하지 않습니다.'
    }
}

</script>

<style scoped>
.login-window {
    width: 320px;
    background-color: #c7c7c7;
    border-left: 2px solid #FCFCFC;
    border-top: 2px solid #FCFCFC;
    border-right: 2px solid #2A2A2A;
    border-bottom: 2px solid #2A2A2A;
    font-family: 'Inconsolata', monospace;
    padding: 0;
}

.title-bar {
    background-color: #000080;
    color: white;
    height: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 4px;
}

.title {
    font-size: 14px;
    font-weight: bold;
    padding-left: 4px;
}

.window-controls {
    display: flex;
    gap: 4px;
}

.btn {
    width: 26px;
    height: 22px;
    background-color: #c7c7c7;
    border-left: 2px solid #FCFCFC;
    border-top: 2px solid #FCFCFC;
    border-right: 2px solid #2A2A2A;
    border-bottom: 2px solid #2A2A2A;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: relative;
}

.btn:hover {
    background-color: #b3b3b3;
    border-left: 2px solid #2A2A2A;
    border-top: 2px solid #2A2A2A;
    border-right: 2px solid #FCFCFC;
    border-bottom: 2px solid #FCFCFC;
}

.minimize .symbol {
    width: 12px;
    height: 2px;
    background-color: black;
}

.maximize .symbol {
    width: 12px;
    height: 10px;
    border: 2px solid black;
    border-top-width: 3px;
}

.close .symbol {
    position: relative;
    width: 14px;
    height: 2px;
    background-color: black;
    transform: rotate(45deg);
}
.close .symbol::after {
    content: '';
    position: absolute;
    width: 14px;
    height: 2px;
    background-color: black;
    top: 0;
    left: 0;
    transform: rotate(90deg);
}

.login-input {
    box-sizing: border-box;
    width: calc(100% - 24px);
    margin: 12px;
    padding: 8px;
    font-size: 14px;
    border-left: 2px solid #FCFCFC;
    border-top: 2px solid #FCFCFC;
    border-right: 2px solid #2A2A2A;
    border-bottom: 2px solid #2A2A2A;
    background-color: white;
}

.login-button {
    width: calc(100% - 24px);
    margin: 0 12px 12px;
    padding: 10px;
    background-color: #c7c7c7;
    color: #000;
    font-weight: bold;
    border-left: 2px solid #FCFCFC;
    border-top: 2px solid #FCFCFC;
    border-right: 2px solid #2A2A2A;
    border-bottom: 2px solid #2A2A2A;
    cursor: pointer;
}

.login-button:hover {
    background-color: #b3b3b3;
    border-left: 2px solid #2A2A2A;
    border-top: 2px solid #2A2A2A;
    border-right: 2px solid #FCFCFC;
    border-bottom: 2px solid #FCFCFC;
}
</style>