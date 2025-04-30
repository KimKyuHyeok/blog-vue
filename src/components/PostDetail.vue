<template>
    <head>
    </head>
    <div class="board">
        <h1>{{  board?.title }}</h1>
        <div ref="content" v-html="board?.content"></div>
    </div>
</template>

<script setup>
import apiClient from "@/config/apiClient";
import { nextTick, onMounted, ref, watch } from "vue"
import { useRoute } from "vue-router"
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import xml from "highlight.js/lib/languages/xml";
import "highlight.js/styles/github.css";

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('xml', xml);

const route = useRoute()
const board = ref(null)
const content = ref(null)

const fetchBoard = async () => {
    try {
        const boardId = route.params.id

        if (boardId) {
            const response = await apiClient.get('/board/id', {
                params: { id: boardId }
            })
            board.value = response.data
        } else {
            const response = await apiClient.get(`/board/recent`)
            board.value = response.data
        }

        if (board.value?.content) {
            board.value.content = board.value.content.replace(
                /<code>([\s\S]*?)<\/code>/g,
                '<pre><code>$1</code></pre>'
            );
        }

        await nextTick();
        if (content.value) {
            const codeBlocks = content.value.querySelectorAll('pre code');
            codeBlocks.forEach((block) => {
                hljs.highlightElement(block);
            })
        }
    } catch (error) {
        console.error('게시글 조회 실패 : ', error)
    }
}

onMounted(fetchBoard);
watch(() => route.params.id, (newId) => {
    fetchBoard(newId)
});
</script>

<style>
.board {
    flex: 1;
    padding: 20px;
    background: #fff;
    border: 1px solid #ccc;
    border-radius: 12px;
    min-width: 0;
}

.board h1 {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 32px;
    line-height: 1.2;
    color: #222;
    border-bottom: 3px solid #f0f0f0;
    padding-bottom: 16px;
}

.board div[v-html] {
    font-size: 1.25rem;
    line-height: 2;
    color: #333;
}
.board pre {
    background-color: #f5f5f5;
    padding: 10px;
    border-radius: 5px;
    overflow-x: auto;
}

.board pre code {
    background-color: none;
}

pre code {
    white-space: pre-wrap;
    word-break: break-word;
}

</style>

