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
          <QStep :name="1" title="Thông tin người dùng" icon="person"  v-bind="getStepStatus(1)">
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
                      <QPopupProxy ref="datePopupRef">
                        <QDate
                          v-model="form.birthdate"
                          mask="DD-MM-YYYY"
                          :max="today"
                          @update:model-value="datePopupRef.hide()"
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
          <QStep :name="2" title="Thông tin sản phẩm" icon="shopping_cart"  v-bind="getStepStatus(2)">
            <QCard class="q-pa-md q-mb-md" bordered>
              <QCardSection>
                <QSelect
                  v-model="form.product"
                  :options="productOptions"
                  label="Sản phẩm"
                  emit-value
                  map-options
                  :disable="!isAuthenticated"
                />
                <div v-if="form.product" class="q-mt-sm">
                  💸 Giá: {{ formatCurrency(productPrice) }}
                </div>

                <QInput
                  v-model.number="form.quantity"
                  label="Số lượng"
                  type="number"
                  :min="1"
                  class="q-mt-md"
                  :disable="!isAuthenticated"
                />
                <div v-if="form.quantity && form.product" class="q-mt-sm">
                  💰 Tổng tiền: {{ formatCurrency(totalPrice) }}
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
                      @click="goNextStep"
                      color="primary"
                      class="full-width"
                    />
                  </div>
                </div>
              </QCardSection>
            </QCard>
          </QStep>

          <!-- Step 3: Confirmation -->
          <QStep :name="3" title="Xác nhận thông tin" icon="check"  v-bind="getStepStatus(3)">
            <QCard class="q-pa-md q-mb-md" bordered>
              <QCardSection>
                <div class="q-mb-sm">👤 Tên: {{ form.username }}</div>
                <div class="q-mb-sm">📧 Email: {{ form.email }}</div>
                <div class="q-mb-sm">🚻 Giới tính: {{ form.gender }}</div>
                <div class="q-mb-sm">🎂 Ngày sinh: {{ form.birthdate }}</div>
                <div class="q-mb-sm">📦 Sản phẩm: {{ form.product }}</div>
                <div class="q-mb-sm">🔢 Số lượng: {{ form.quantity }}</div>
                <div class="q-mb-sm">💰 Tổng tiền: {{ formatCurrency(totalPrice) }}</div>
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
                      label="Submit"
                      color="positive"
                      @click="handleSubmit"
                      class="full-width"
                    />
                  </div>
                </div>
              </QCardSection>
            </QCard>
          </QStep>
        </QStepper>
        <DataTable v-if="formDataStore.entries.length > 0" />
      </QPage>
    </QPageContainer>
  </QLayout>
</template>

<script lang="ts" setup>
import { ref, computed, reactive, toRefs, watch } from "vue";
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
import { useFormDataStore } from "../stores/formData";
import DataTable from "../components/DataTable.vue";

const $q = useQuasar();
const router = useRouter();
const userStore = useUserStore();
  const formDataStore = useFormDataStore()

const isAuthenticated = computed(() => userStore.isAuthenticated);
const username = computed(() => userStore.username);
const email = computed(() => userStore.email);

const step = ref(1);
const datePopupRef = ref();
const today = new Date().toLocaleDateString('en-GB').replace(/\//g, '-')
const submitted = ref(false)

const form = reactive({
  username: username.value || "",
  email: email.value || "",
  gender: "",
  birthdate: today,
  product: "",
  quantity: 0,
});

const { product, quantity } = toRefs(form);

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

const productPrice = computed(() => productPrices[product.value] || 0);
const totalPrice = computed(() => productPrice.value * quantity.value);

function getStepStatus(stepIndex: number) {
  return {
    done: step.value > stepIndex || (submitted.value === true && stepIndex === 3),
    active: step.value === stepIndex,
    disable: step.value < stepIndex
  }
}

function formatCurrency(value: number): string {
  return value.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
}

function goToLogin() {
  router.push("/login");
}

function handleSubmit() {
  const entry = {
    name: form.username,
    email: form.email,
    gender: form.gender,
    birthDate: form.birthdate, 
    product: form.product,
    price: productPrice.value,
    quantity: quantity.value,
    total: totalPrice.value
  }

  formDataStore.addEntry(entry)

  userStore.submitForm(entry)
  submitted.value = true
  $q.notify({ type: 'positive', message: 'Thông tin đã được lưu!', position:'top' })
}

function goBackStep() {
  if (step.value > 1) {
    step.value -= 1;
  }
}

function goNextStep() {
  if (step.value > 0 && step.value < 3) {
    step.value += 1;
  }
}

watch(product, (val) => {
  console.log("Sản phẩm đã chọn:", val);
  console.log("Giá tương ứng:", productPrices[val]);
});
</script>
