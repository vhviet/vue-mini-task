<template>
  <QLayout view="lHh Lpr lFf">
    <QPageContainer>
      <QPage class="q-pa-md">
        <!-- Header -->
        <div class="q-mb-md">
          <div v-if="isAuthenticated" class="text-h6">
            👋 Chào mừng {{ username }}
          </div>
          <div v-else class="text-negative">
            ⚠️ Bạn cần đăng nhập để sử dụng đầy đủ chức năng
            <QBtn
              label="Quay về đăng nhập"
              color="primary"
              @click="goToLogin"
              class="q-ml-sm"
            />
          </div>
        </div>

        <!-- Stepper -->
        <QStepper v-model="step" vertical animated>
          <!-- Step 1: User Info -->
          <QStep :name="1" title="Thông tin người dùng" icon="person">
            <QCard class="q-pa-md q-mb-md" bordered>
              <QCardSection>
                <QInput
                  v-model="form.username"
                  label="Tên"
                  autofocus
                  :disable="!isAuthenticated"
                />
                <QInput
                  v-model="form.email"
                  label="Email"
                  type="email"
                  class="q-mt-md"
                  :disable="!isAuthenticated"
                />
                <QOptionGroup
                  v-model="form.gender"
                  :options="genderOptions"
                  type="radio"
                  label="Giới tính"
                  class="q-mt-md"
                  :disable="!isAuthenticated"
                />
                <QInput
                  v-model="form.birthdate"
                  label="Ngày sinh"
                  mask="##-##-####"
                  class="q-mt-md"
                  :disable="!isAuthenticated"
                >
                  <template #append>
                    <QIcon name="event" class="cursor-pointer">
                      <QPopupProxy>
                        <QDate
                          v-model="form.birthdate"
                          mask="DD-MM-YYYY"
                          :max="today"
                        />
                      </QPopupProxy>
                    </QIcon>
                  </template>
                </QInput>
                <QBtn
                  label="Tiếp theo"
                  @click="goNextStep"
                  color="primary"
                  class="q-mt-md"
                />
              </QCardSection>
            </QCard>
          </QStep>

          <!-- Step 2: Product Info -->
          <QStep :name="2" title="Thông tin sản phẩm" icon="shopping_cart">
            <QCard class="q-pa-md q-mb-md" bordered>
              <QCardSection>
                <QSelect
                  v-model="form.product"
                  :options="productOptions"
                  label="Sản phẩm"
                  :disable="!isAuthenticated"
                />
                <div v-if="form.product" class="q-mt-sm">
                  💸 Giá: {{ productPrice }}₫
                </div>

                <QInput
                  v-model.number="form.quantity"
                  label="Số lượng"
                  type="number"
                  class="q-mt-md"
                  :disable="!isAuthenticated"
                />
                <div v-if="form.quantity && form.product" class="q-mt-sm">
                  💰 Tổng tiền: {{ totalPrice }}₫
                </div>

                <div class="row q-col-gutter-sm q-mt-md">
                  <div class="col">
                    <QBtn
                      label="Quay lại"
                      @click="goBackStep"
                      color="grey"
                      flat
                      class="full-width"
                    />
                  </div>
                  <div class="col">
                    <QBtn
                      label="Tiếp theo"
                      @click="step = 3"
                      color="primary"
                      class="full-width"
                    />
                  </div>
                </div>
              </QCardSection>
            </QCard>
          </QStep>

          <!-- Step 3: Confirmation -->
          <QStep :name="3" title="Xác nhận thông tin" icon="check">
            <QCard class="q-pa-md q-mb-md" bordered>
              <QCardSection>
                <div class="q-mb-sm">👤 Tên: {{ form.username }}</div>
                <div class="q-mb-sm">📧 Email: {{ form.email }}</div>
                <div class="q-mb-sm">🚻 Giới tính: {{ form.gender }}</div>
                <div class="q-mb-sm">🎂 Ngày sinh: {{ form.birthdate }}</div>
                <div class="q-mb-sm">📦 Sản phẩm: {{ form.product }}</div>
                <div class="q-mb-sm">🔢 Số lượng: {{ form.quantity }}</div>
                <div class="q-mb-sm">💰 Tổng tiền: {{ totalPrice }}₫</div>
                <div class="row q-col-gutter-sm q-mt-md">
                  <div class="col">
                    <QBtn
                      label="Quay lại"
                      @click="goBackStep"
                      color="grey"
                      flat
                      class="full-width"
                    />
                  </div>
                  <div class="col">
                    <QBtn label="Submit" color="positive" @click="handleSubmit" class="full-width"/>
                  </div>
                </div>
                
              </QCardSection>
            </QCard>
          </QStep>
        </QStepper>
      </QPage>
    </QPageContainer>
  </QLayout>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import {
  QLayout,
  QPageContainer,
  QPage,
  QStepper,
  QStep,
  QCard,
  QCardSection,
  QInput,
  QOptionGroup,
  QSelect,
  QBtn,
  QIcon,
  QPopupProxy,
  QDate,
  useQuasar,
} from "quasar";
import { useUserStore } from "../stores/userStore";

const $q = useQuasar();
const router = useRouter();
const userStore = useUserStore();

const isAuthenticated = computed(() => userStore.isAuthenticated);
const username = computed(() => userStore.username);
const email = computed(() => userStore.email);

const step = ref(1);
const today = new Date().toISOString().split("T")[0];

const form = ref({
  username: username.value || "",
  email: email.value || "",
  gender: "",
  birthdate: "",
  product: "",
  quantity: 0,
});

const genderOptions = [
  { label: "Nam", value: "male" },
  { label: "Nữ", value: "female" },
];

const productOptions = [
  { label: "Laptop", value: "Laptop" },
  { label: "Điện thoại", value: "Phone" },
  { label: "Tai nghe", value: "Headphones" },
];

const productPrices: Record<string, number> = {
  Laptop: 15000000,
  Phone: 8000000,
  Headphones: 2000000,
};

const productPrice = computed(() => productPrices[form.value.product] || 0);
const totalPrice = computed(() => productPrice.value * form.value.quantity);

function goToLogin() {
  router.push("/login");
}

function handleSubmit() {
  userStore.submitForm({
    ...form.value,
    price: productPrice.value,
    total: totalPrice.value,
  });
  $q.notify({ type: "positive", message: "Thông tin đã được lưu!" });
  step.value = 1;
}

function goBackStep() {
  if (step.value > 1) {
    step.value -= 1;
  }
}

function goNextStep() {
  if (0<step.value && step.value < 3) {
    step.value += 1
  }
}
</script>
