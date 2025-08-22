<!-- <template>
  <QLayout view="lHh Lpr lFf">
    <QPageContainer>
      <QPage class="q-pa-md flex flex-center">
        <QCard class="q-pa-lg" style="width: 400px">
          <QCardSection>
            <div class="text-h6">Login</div>
          </QCardSection>

          <QCardSection>
            <QForm @submit.prevent="handleLogin">
              <QInput v-model="email" label="Email" type="email" required />
              <QInput v-model="username" label="Username" required class="q-mt-md" />
              <QBtn label="Login" type="submit" color="primary" class="q-mt-md full-width" />
            </QForm>
          </QCardSection>
        </QCard>
      </QPage>
    </QPageContainer>
  </QLayout>
</template>


<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../../stores/userStore'
import { QBtn, QCard, QCardSection, QForm, QInput, QLayout, QPage, QPageContainer } from 'quasar'

const email = ref('')
const username = ref('')
const router = useRouter()
const userStore = useUserStore()

function handleLogin() {
  userStore.login(username.value, email.value)
  router.push('/stepper')
}
</script> -->

<template>
  <QLayout view="lHh Lpr lFf">
    <QPageContainer>
      <QPage class="q-pa-md flex flex-center">
        <QCard class="q-pa-lg" style="width: 400px">
          <QCardSection>
            <div class="text-h6">Login</div>
          </QCardSection>

          <QCardSection>
            <QForm @submit.prevent="handleLogin">
              <QInput
                v-model="email"
                label="Email"
                type="email"
                required
              />

              <QInput
                v-model="password"
                :type="isPasswordVisible ? 'text' : 'password'"
                label="Password"
                required
                class="q-mt-md"
              >
                <template #append>
                  <QIcon
                    :name="isPasswordVisible ? 'visibility' : 'visibility_off'"
                    class="cursor-pointer"
                    style="font-size: 18px; color: #666;"
                    @click="togglePasswordVisibility"
                  />
                </template>
              </QInput>

              <QBtn
                label="Login"
                type="submit"
                color="primary"
                class="q-mt-md full-width"
              />
            </QForm>

            <div v-if="userStore.loginError" class="text-negative q-mt-sm">
              {{ userStore.loginError }}
            </div>
          </QCardSection>
        </QCard>
      </QPage>
    </QPageContainer>
  </QLayout>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/userStore'
import {
  QBtn,
  QCard,
  QCardSection,
  QForm,
  QInput,
  QLayout,
  QPage,
  QPageContainer,
  QIcon
} from 'quasar'

const email = ref('')
const password = ref('')
const isPasswordVisible = ref(false)

const router = useRouter()
const userStore = useUserStore()

function togglePasswordVisibility() {
  isPasswordVisible.value = !isPasswordVisible.value
}

function handleLogin() {
  userStore.login(email.value, password.value)
  if (userStore.isAuthenticated) {
    router.push('/stepper')
  }
}
</script>
