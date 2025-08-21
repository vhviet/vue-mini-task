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
import { useUserStore } from '../stores/userStore'
import { QBtn, QCard, QCardSection, QForm, QInput, QLayout, QPage, QPageContainer } from 'quasar'

const email = ref('')
const username = ref('')
const router = useRouter()
const userStore = useUserStore()

function handleLogin() {
  userStore.login(username.value, email.value)
  router.push('/stepper')
}
</script>
