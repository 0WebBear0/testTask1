<template>
  <CForm class="align-items-start form-block">
    <CFormInput
        id="NameCompanyPerformer"
        label="Название компании исполнителя"
        placeholder="Компания"
        v-model.trim="state.nameCompanyPerformer"
        @change="v$.nameCompanyPerformer.$touch"
        :valid="v$.nameCompanyPerformer.$dirty && !v$.nameCompanyPerformer.$error"
        :invalid="v$.nameCompanyPerformer.$dirty && v$.nameCompanyPerformer.$error"
    />
    <CFormInput
        type="email"
        id="EmailPerformer"
        label="Email исполнителя"
        placeholder="name@example.com"
        v-model.trim="state.emailPerformer"
        @change="v$.emailPerformer.$touch"
        :valid="v$.emailPerformer.$dirty && !v$.emailPerformer.$error"
        :invalid="v$.emailPerformer.$dirty && v$.emailPerformer.$error"
    />
    <CFormInput
        id="InnPerformer"
        label="ИНН исполнителя"
        placeholder="366300190960"
        v-model.trim="state.innPerformer"
        @change="v$.innPerformer.$touch"
        :valid="v$.innPerformer.$dirty && !v$.innPerformer.$error"
        :invalid="v$.innPerformer.$dirty && v$.innPerformer.$error"
    />
    <CFormInput
        id="KppPerformer"
        label="КПП исполнителя"
        placeholder="770201001"
        v-model.trim="state.kppPerformer"
        @change="v$.kppPerformer.$touch"
        :valid="v$.kppPerformer.$dirty && !v$.kppPerformer.$error"
        :invalid="v$.kppPerformer.$dirty && v$.kppPerformer.$error"
    />
    <InputWithDadata
        v-model="state.addressPerformer"
        :props-data="{name: 'address2', label: 'Адрес исполнителя', placeholder: 'Россия, Татарстан Республика, Казань, Братьев Касимовых Улица, дом 64'}"
        :props-data-name="{valid: v$.addressPerformer}"
    />
    <CFormInput
        id="ContractorsPerformer"
        label="Расчетный счет исполнителя"
        placeholder="40817810099910004312"
        v-model.trim="state.contractorsPerformer"
        @change="v$.contractorsPerformer.$touch"
        :valid="v$.contractorsPerformer.$dirty && !v$.contractorsPerformer.$error"
        :invalid="v$.contractorsPerformer.$dirty && v$.contractorsPerformer.$error"
    />
    <CFormInput
        id="ContractorsCorporatePerformer"
        label="Корпоративный счет исполнителя"
        placeholder="00000000000000000000"
        v-model.trim="state.contractorsCorporatePerformer"
        @change="v$.contractorsCorporatePerformer.$touch"
        :valid="v$.contractorsCorporatePerformer.$dirty && !v$.contractorsCorporatePerformer.$error"
        :invalid="v$.contractorsCorporatePerformer.$dirty && v$.contractorsCorporatePerformer.$error"
    />
    <CFormInput
        id="NameBankPerformer"
        label="Наименование банка исполнителя"
        placeholder="Российская Финансовая Корпорация"
        v-model.trim="state.nameBankPerformer"
        @change="v$.nameBankPerformer.$touch"
        :valid="v$.nameBankPerformer.$dirty && !v$.nameBankPerformer.$error"
        :invalid="v$.nameBankPerformer.$dirty && v$.nameBankPerformer.$error"
    />
    <CFormInput
        id="BikBankPerformer"
        label="БИК банка исполнителя"
        placeholder="044525974"
        v-model.trim="state.bikBankPerformer"
        @change="v$.bikBankPerformer.$touch"
        :valid="v$.bikBankPerformer.$dirty && !v$.bikBankPerformer.$error"
        :invalid="v$.bikBankPerformer.$dirty && v$.bikBankPerformer.$error"
    />
    <CFormInput
        id="PhonePerformer"
        label="Телефон исполнителя"
        placeholder="8(999) 999-9999"
        v-model.trim="state.phonePerformer"
        @change="v$.phonePerformer.$touch"
        :valid="v$.phonePerformer.$dirty && !v$.phonePerformer.$error"
        :invalid="v$.phonePerformer.$dirty && v$.phonePerformer.$error"
    />
    <CFormInput
        id="NamePerformer"
        label="ФИО для подписи исполнителя"
        placeholder="Иванов Иван Иванович"
        v-model.trim="state.namePerformer"
        @change="v$.namePerformer.$touch"
        :valid="v$.namePerformer.$dirty && !v$.namePerformer.$error"
        :invalid="v$.namePerformer.$dirty && v$.namePerformer.$error"
    />
    <CFormInput
        type="file"
        id="UploadSignaturePerformer"
        accept="image/*"
        label="Загрузка подписи исполнителя"
        v-model.trim="state.uploadSignaturePerformer"
        @change="v$.uploadSignaturePerformer.$touch"
        @input="addNormalImgSignature"
        :valid="v$.uploadSignaturePerformer.$dirty && !v$.uploadSignaturePerformer.$error"
        :invalid="v$.uploadSignaturePerformer.$dirty && v$.uploadSignaturePerformer.$error"
    />
    <CFormInput
        type="file"
        id="UploadSealPerformer"
        accept="image/*"
        label="Загрузка печати исполнителя"
        v-model.trim="state.uploadSealPerformer"
        @change="v$.uploadSealPerformer.$touch"
        @input="addNormalImgSeal"
        :valid="v$.uploadSealPerformer.$dirty && !v$.uploadSealPerformer.$error"
        :invalid="v$.uploadSealPerformer.$dirty && v$.uploadSealPerformer.$error"
    />
  </CForm>
</template>

<script setup>
import { CForm, CFormInput } from "@coreui/vue"
import { reactive, watch } from "vue"
import { required, email, minLength } from "@vuelidate/validators"
import useVuelidate from "@vuelidate/core"
import { useFormStore } from "../store.js"
import getFileBlob from "../composables/getFileBlob.js"
import InputWithDadata from "../../../shared/UI/InputWithDadata.vue"
import { vueMaskPhone } from "../composables/vueMaskPhone.js"

const { AddOrChangePartForm } = useFormStore()
const emit = defineEmits(['isValid'])

//Валидируемые объекты
const state = reactive({
  nameCompanyPerformer: '',
  emailPerformer: '',
  innPerformer: '',
  kppPerformer: '',
  addressPerformer: '',
  contractorsPerformer: '',
  contractorsCorporatePerformer: '',
  nameBankPerformer: '',
  bikBankPerformer: '',
  phonePerformer: '',
  namePerformer: '',
  uploadSignaturePerformer: '',
  uploadSealPerformer: '',
})

const blobs = reactive({
  uploadSignaturePerformerBlob: null,
  uploadSealPerformerBlob: null,
})

//Правила валидации
const rules = {
  nameCompanyPerformer: { required },
  emailPerformer: { required, email },
  innPerformer: { required },
  kppPerformer: { required },
  addressPerformer: { required },
  contractorsPerformer: { required },
  contractorsCorporatePerformer: { required },
  nameBankPerformer: { required },
  bikBankPerformer: { required },
  phonePerformer: { required, minLength: minLength(15) },
  namePerformer: { required },
  uploadSignaturePerformer: { required },
  uploadSealPerformer: { required },
}

//Валидация объектов
const v$ = useVuelidate(rules, state)


//Преобразование изображений в Blob формат
const addNormalImgSeal = (event) => {
  getFileBlob(event).then((data) => {
    blobs.uploadSealPerformerBlob = data
    const copyState = state
    AddOrChangePartForm(1, Object.assign(copyState, blobs))
  })
}
const addNormalImgSignature = (event) => {
  getFileBlob(event).then((data) => {
    blobs.uploadSignaturePerformerBlob = data
    const copyState = state
    AddOrChangePartForm(1, Object.assign(copyState, blobs))
  })
}

//Маска на телефоне
watch(state, () => {
  if (state.phonePerformer) {
    maskPhone(state.phonePerformer)
  }
})

const maskPhone = () => {
  state.phonePerformer = vueMaskPhone(state.phonePerformer)
}

//Проверка на валидность всей формы этого компонента и запись в state
watch(v$, () => {
  v$._value.$forceUpdate
  if (!v$._value.$invalid) {
    AddOrChangePartForm(1, Object.assign(state, blobs))
    emit('isValid', true)
  }
})
</script>

<style scoped>

</style>
