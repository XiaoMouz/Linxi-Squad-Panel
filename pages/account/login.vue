<script setup lang="ts">
import { ref } from "vue";
import * as z from "zod";
import CardHeader from "~/components/ui/card/CardHeader.vue";

definePageMeta({
  layout: "auth",
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: "/",
  },
});
const { signIn } = useAuth();

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
const signInHandler = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  const { error, url } = await signIn({
    username,
    password,
  });
  if (error) {
    haveError.value = true;
    errorMessage.value = error.message || "An error occurred";
  } else {
    // No error, continue with the sign in, e.g., by following the returned redirect:
    return navigateTo(url, { external: true });
  }
};

async function onSubmit(values: Record<string, any>) {
  try {
    const res = await signInHandler({
      username: values.username,
      password: values.password,
    });
    if (!res) {
      haveError.value = true;
      errorMessage.value = "用户名或密码错误";
    }
  } catch {
    haveError.value = true;
    errorMessage.value = "内部错误";
  }
}
</script>
<template>
  <div class="my-auto min-w-[340px] space-y-6">
    <Card>
      <CardHeader>
        <CardTitle>登录</CardTitle>
      </CardHeader>
      <CardContent>
        <Alert variant="destructive" v-if="haveError" class="mb-4">
          <AlertTitle>错误</AlertTitle>
          <AlertDescription>
            {{ "登录失败&nbsp;" + errorMessage }}
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
