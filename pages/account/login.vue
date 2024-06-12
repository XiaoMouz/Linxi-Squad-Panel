<script setup lang="ts">
import { ref } from "vue";
import * as z from "zod";
import { toast } from "@/components/ui/toast";
import CardHeader from "~/components/ui/card/CardHeader.vue";

definePageMeta({
  layout: "auth",
});

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

const haveError = ref(false);
const errorMessage = ref("");

function onSubmit(values: Record<string, any>) {
  fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        haveError.value = true;
        throw new Error("登录失败");
      }
    })
    .then((data) => {
      console.log(data);
      console.log("登录成功");
    })
    .catch((error) => {
      console.error(error);
    });
}
</script>
<template>
  <div class="my-auto min-w-[340px] space-y-6">
    <Card>
      <CardHeader>
        <CardTitle>登录</CardTitle>
      </CardHeader>
      <CardContent>
        <Alert variant="destructive" v-if="haveError">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {{ haveError ? "登录失败" : errorMessage }}
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
          <Button class="mt-6" type="submit">登录</Button>
        </AutoForm>
      </CardContent>
    </Card>
  </div>
</template>
