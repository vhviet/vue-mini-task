<template>
  <div class="q-mt-lg">
    <!-- Filter -->
    <div class="row q-col-gutter-md q-mb-md">
  <div class="col-6">
    <QInput
      v-model="minDate"
      type="date"
      label="Ngày sinh từ"
      :max="formatDate(maxBirthDate)"
      :min="formatDate(minBirthDate)"
    />
  </div>
  <div class="col-6">
    <QInput
      v-model="maxDate"
      type="date"
      label="Ngày sinh đến"
      :min="minDate"
      :max="formatDate(maxBirthDate)"
    />
  </div>
  <div class="col-12">
    <QSelect
      v-model="genderFilter"
      :options="genderOptions"
      label="Giới tính"
      multiple
      emit-value
      map-options
    />
  </div>
</div>


    <!-- Table -->
    <QTable
      :rows="filteredEntries"
      :columns="columns"
      row-key="email"
      :no-data-label="'Không có dữ liệu'"
    >
      <template v-slot:body-cell="props">
  <QTd :props="props">
    {{ props.value || '---' }}
  </QTd>
</template>


      <template v-slot:body-cell-actions="props">
         <QTd :props="props">
        <QBtn
          icon="delete"
          color="negative"
          flat
          @click="confirmDelete(props.rowIndex)"
        />
        </QTd>
      </template>
    </QTable>

    <!-- Confirm Delete Dialog -->
    <QDialog v-model="showDialog">
      <QCard>
        <QCardSection>
          <div class="text-h6">Xác nhận xóa</div>
          <div>Bạn có chắc muốn xóa dòng này?</div>
        </QCardSection>
        <QCardActions align="right">
          <QBtn flat label="Hủy" v-close-popup @click="handleCancelDelete"/>
          <QBtn flat label="Xóa" color="negative" @click="deleteEntry" />
        </QCardActions>
      </QCard>
    </QDialog>
  </div>
</template>

<script setup lang="ts">
import { useFormDataStore } from '../stores/formData'
import { QBtn, QCard, QCardActions, QCardSection, QDialog, QInput, QSelect, QTable, QTd, type QTableProps } from 'quasar'
import { ref, computed } from 'vue'


const formData = useFormDataStore()

const minDate = ref('')
const maxDate = ref('')
const genderFilter = ref<string[]>([])


const showDialog = ref(false)
const deleteIndex = ref<number | null>(null)

const confirmDelete = (index: number) => {
  deleteIndex.value = index
  showDialog.value = true
}

const deleteEntry = () => {
  if (deleteIndex.value !== null) {
    formData.deleteEntry(deleteIndex.value)
    showDialog.value = false
  }
}

function handleCancelDelete() {
  showDialog.value = false;
  deleteIndex.value = null;
}

function formatDate(date: Date | null): string {
  return date ? date.toISOString().split('T')[0] : ''
}

const allDates = computed(() =>
  formData.entries
    .map(e => e.birthDate)
    .filter(Boolean)
    .map(d => new Date(d))
)

const minBirthDate = computed(() =>
  allDates.value.length ? allDates.value.reduce((a, b) => (a < b ? a : b)) : null
)

const maxBirthDate = computed(() =>
  allDates.value.length ? allDates.value.reduce((a, b) => (a > b ? a : b)) : null
)

const genderOptions = computed(() => {
  const genders = new Set(formData.entries.map(e => e.gender || '---'))
  return Array.from(genders)
})

const filteredEntries = computed(() => {
  return formData.entries.filter(entry => {
    const birth = entry.birthDate ? new Date(entry.birthDate) : null
    const min = minDate.value ? new Date(minDate.value) : null
    const max = maxDate.value ? new Date(maxDate.value) : null

    const matchDate =
      (!birth || (!min || birth >= min) && (!max || birth <= max))

    const gender = entry.gender || '---'
    const matchGender =
      genderFilter.value.length === 0 || genderFilter.value.includes(gender)

    return matchDate && matchGender
  })
})

const columns: QTableProps['columns'] = [
  { name: 'name', label: 'Tên', field: 'name', align: 'left' },
  { name: 'email', label: 'Email', field: 'email', align: 'left' },
  { name: 'birthDate', label: 'Ngày sinh', field: 'birthDate', align: 'left' },
  { name: 'gender', label: 'Giới tính', field: 'gender', align: 'left' },
  { name: 'product', label: 'Sản phẩm', field: 'product', align: 'left' },
  { name: 'price', label: 'Giá', field: 'price', align: 'right' },
  { name: 'quantity', label: 'Số lượng', field: 'quantity', align: 'right' },
  { name: 'total', label: 'Tổng giá', field: 'total', align: 'right' },
  { name: 'actions', label: 'Actions', field: 'actions', align: 'center' }
]
</script>
