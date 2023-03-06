<template>
  <CForm class="align-items-start form-block">
    <CFormInput
        name="vue-dadata-input"
        id="ActNumber"
        label="Номер акта"
        placeholder="12665"
        v-model.trim="state.actNumber"
        @change="v$.actNumber.$touch"
        :valid="v$.actNumber.$dirty && !v$.actNumber.$error"
        :invalid="v$.actNumber.$dirty && v$.actNumber.$error"
    />
    <CFormInput
        type="date"
        id="DateOfSigning"
        label="Дата подписания договора"
        v-model.trim="state.dateOfSigning"
        @change="v$.dateOfSigning.$touch"
        :valid="v$.dateOfSigning.$dirty && !v$.dateOfSigning.$error"
        :invalid="v$.dateOfSigning.$dirty && v$.dateOfSigning.$error"
    />
    <CFormInput
        id="Performer"
        label="Исполнитель ФИО ИП"
        placeholder="Иванов Иван Иванович (Пекарня у дома)"
        v-model.trim="state.performer"
        @change="v$.performer.$touch"
        :valid="v$.performer.$dirty && !v$.performer.$error"
        :invalid="v$.performer.$dirty && v$.performer.$error"
    />
    <CFormInput
        id="ServiceName"
        label="Наименование услуги"
        placeholder="Организация ... работ"
        v-model.trim="state.serviceName"
        @change="v$.serviceName.$touch"
        :valid="v$.serviceName.$dirty && !v$.serviceName.$error"
        :invalid="v$.serviceName.$dirty && v$.serviceName.$error"
    />
    <CFormInput
        type="number"
        id="CostOfWork"
        label="Стоимость работ в рублях"
        placeholder="555"
        v-model.trim="state.costOfWork"
        @change="v$.costOfWork.$touch"
        :valid="v$.costOfWork.$dirty && !v$.costOfWork.$error"
        :invalid="v$.costOfWork.$dirty && v$.costOfWork.$error"
    />
    <CFormInput
        type="file"
        id="UploadLogo"
        accept="image/*"
        label="Загрузите логотип компании"
        v-model.trim="state.uploadLogo"
        @change="v$.uploadLogo.$touch"
        @input="addNormalImg"
        :valid="v$.uploadLogo.$dirty && !v$.uploadLogo.$error"
        :invalid="v$.uploadLogo.$dirty && v$.uploadLogo.$error"
    />
  </CForm>
</template>

<script setup>
import { CForm, CFormInput } from "@coreui/vue"
import useVuelidate from "@vuelidate/core"
import { onMounted, reactive, watch } from "vue"
import { required, minValue, numeric } from "@vuelidate/validators"
import { useFormStore } from "../store.js"
import getFileBlob from "../composables/getFileBlob.js"
import { wordsRuEnNumber } from "../composables/validation.js"

const { AddOrChangePartForm } = useFormStore()

const emit = defineEmits(['isValid'])

//Валидируемые объекты
const state = reactive({
  actNumber: '',
  dateOfSigning: '',
  performer: '',
  serviceName: '',
  costOfWork: '',
  uploadLogo: '',
})

const blobs = reactive({
  uploadLogoBlob: null,
})

// Валидация даты
const dateValidation = (value) => {
  let dateSelected = new Date(value)
  if (dateSelected.getFullYear() > 2023){
    return false
  }
  return dateSelected.getFullYear() >= 2000;
}

//Правила валидации
const rules = {
  actNumber: { required, wordsRuEnNumber },
  dateOfSigning: { required, dateValidation },
  performer: { required, wordsRuEnNumber },
  serviceName: { required, wordsRuEnNumber },
  costOfWork: { required, minValue: minValue(0), numeric },
  uploadLogo: { required },
}

//Валидация объектов
const v$ = useVuelidate(rules, state)


//Преобразование изображений в Blob формат
const addNormalImg = (event) => {
  // v$._value.uploadLogo.$touch(event)
  getFileBlob(event).then((data) => {
    blobs.uploadLogoBlob = data
    const copyState = state
    AddOrChangePartForm(0, Object.assign(copyState, blobs))
  })
}

//Проверка на валидность всей формы этого компонента и запись в state
watch(v$, () => {
  v$._value.$forceUpdate

  if (!v$._value.$invalid) {
    let objectDate = new Date(state.dateOfSigning)
    const copyState = {}
    Object.assign(copyState, state)
    copyState.dateOfSigning = objectDate.toLocaleDateString()
    AddOrChangePartForm(0, Object.assign(copyState, blobs))
    emit('isValid', true)
  } else emit('isValid', false)
})

</script>

<style scoped>

</style>
