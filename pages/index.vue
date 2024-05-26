<script setup lang="ts">
import { ref } from 'vue'
import * as z from 'zod'

const name = ref('')

const schema =  z.object({
    username: z.string({
            required_error:"必须填写用户名"
        }).min(2, {
            message:"用户名至少2个字符"
        }),
    password: z.string({
            required_error:"必须填写密码"
        }).min(6, {
            message:"密码至少6个字符"
        })

})

function submit() {
    alert(`Hello, ${name.value}!`)
}
</script>
<template>
    <AutoForm
        :schema="schema" 
        :field-config="{
            username:{
                label:'Username',
                inputProps:{
                    type: 'text',
                    placeholder: 'Username',
                }
            }
        }"
        @submit.prevent="submit"
     />
</template>