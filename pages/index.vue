<script setup lang="ts">
import { ref } from "vue";
import * as z from "zod";
import { toast } from "@/components/ui/toast";

const schema = z.object({
  username: z
    .string({
      required_error: "必须填写用户名",
    })
    .min(2, {
      message: "用户名至少2个字符",
    }),
  password: z
    .string({
      required_error: "必须填写密码",
    })
    .min(6, {
      message: "密码至少6个字符",
    }),
});

function onSubmit(values: Record<string, any>) {
  toast({
    title: "You submitted the following values:",
    description: h(
      "pre",
      { class: "mt-2 w-[340px] rounded-md bg-slate-950 p-4" },
      h("code", { class: "text-white" }, JSON.stringify(values, null, 2))
    ),
  });
}
</script>
<template>
  <div class="w-2/3 space-y-6">
    <Alert variant="destructive">
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Your session has expired. Please log in again.
      </AlertDescription>
    </Alert>
    <AutoForm
      :schema="schema"
      :field-config="{
        username: {
          label: '用户名',
          inputProps: {
            type: 'text',
            placeholder: '用户名',
          },
        },
        password: {
          label: '密码',
          inputProps: {
            type: 'password',
            placeholder: '密码',
          },
        },
      }"
      @submit="onSubmit"
    >
      <Button type="submit">登录</Button>
    </AutoForm>
  </div>
</template>
