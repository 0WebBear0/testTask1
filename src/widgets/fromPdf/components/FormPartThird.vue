<template>
  <CForm class="align-items-start form-block">
    <CFormInput
        id="NameCompanyClient"
        label="Название компании заказчика"
        placeholder="Компания"
        v-model.trim="state.nameCompanyClient"
        @change="v$.nameCompanyClient.$touch"
        :valid="v$.nameCompanyClient.$dirty && !v$.nameCompanyClient.$error"
        :invalid="v$.nameCompanyClient.$dirty && v$.nameCompanyClient.$error"
    />
    <CFormInput
        type="email"
        id="EmailClient"
        label="Email заказчика"
        placeholder="name@example.com"
        v-model.trim="state.emailClient"
        @change="v$.emailClient.$touch"
        :valid="v$.emailClient.$dirty && !v$.emailClient.$error"
        :invalid="v$.emailClient.$dirty && v$.emailClient.$error"
    />
    <CFormInput
        id="InnClient"
        label="ИНН заказчика"
        placeholder="366300190960"
        v-model.trim="state.innClient"
        @change="v$.innClient.$touch"
        :valid="v$.innClient.$dirty && !v$.innClient.$error"
        :invalid="v$.innClient.$dirty && v$.innClient.$error"
    />
    <CFormInput
        id="KppClient"
        label="КПП заказчика"
        placeholder="770201001"
        v-model.trim="state.kppClient"
        @change="v$.kppClient.$touch"
        :valid="v$.kppClient.$dirty && !v$.kppClient.$error"
        :invalid="v$.kppClient.$dirty && v$.kppClient.$error"
    />
    <InputWithDadata
        v-model="state.addressClient"
        :props-data="{name: 'address3', label: 'Адрес заказчика', placeholder: 'Россия, Татарстан Республика, Казань, Братьев Касимовых Улица, дом 64'}"
        :props-data-name="{valid: v$.addressClient}"
    />
    <CFormInput
        id="ContractorsClient"
        label="Расчетный счет заказчика"
        placeholder="40817810099910004312"
        v-model.trim="state.contractorsClient"
        @change="v$.contractorsClient.$touch"
        :valid="v$.contractorsClient.$dirty && !v$.contractorsClient.$error"
        :invalid="v$.contractorsClient.$dirty && v$.contractorsClient.$error"
    />
    <CFormInput
        id="ContractorsCorporateClient"
        label="Корпоративный счет заказчика"
        placeholder="00000000000000000000"
        v-model.trim="state.contractorsCorporateClient"
        @change="v$.contractorsCorporateClient.$touch"
        :valid="v$.contractorsCorporateClient.$dirty && !v$.contractorsCorporateClient.$error"
        :invalid="v$.contractorsCorporateClient.$dirty && v$.contractorsCorporateClient.$error"
    />
    <CFormInput
        id="NameBankClient"
        label="Наименование банка заказчика"
        placeholder="Российская Финансовая Корпорация"
        v-model.trim="state.nameBankClient"
        @change="v$.nameBankClient.$touch"
        :valid="v$.nameBankClient.$dirty && !v$.nameBankClient.$error"
        :invalid="v$.nameBankClient.$dirty && v$.nameBankClient.$error"
    />
    <CFormInput
        id="BikBankClient"
        label="БИК банка заказчика"
        placeholder="044525974"
        v-model.trim="state.bikBankClient"
        @change="v$.bikBankClient.$touch"
        :valid="v$.bikBankClient.$dirty && !v$.bikBankClient.$error"
        :invalid="v$.bikBankClient.$dirty && v$.bikBankClient.$error"
    />
    <CFormInput
        id="PhoneClient"
        label="Телефон заказчика"
        placeholder="8 000 000 0000"
        v-model.trim="state.phoneClient"
        @change="v$.phoneClient.$touch"
        :valid="v$.phoneClient.$dirty && !v$.phoneClient.$error"
        :invalid="v$.phoneClient.$dirty && v$.phoneClient.$error"
    />
    <CFormInput
        id="NameClient"
        label="ФИО для подписи заказчика"
        placeholder="Иванов Иван Иванович"
        v-model.trim="state.nameClient"
        @change="v$.nameClient.$touch"
        :valid="v$.nameClient.$dirty && !v$.nameClient.$error"
        :invalid="v$.nameClient.$dirty && v$.nameClient.$error"
    />
    <CFormInput
        type="file"
        id="UploadSignatureClient"
        accept="image/*"
        label="Загрузка подписи заказчика"
        v-model.trim="state.uploadSignatureClient"
        @change="v$.uploadSignatureClient.$touch"
        @input="addNormalImgSignature"
        :valid="v$.uploadSignatureClient.$dirty && !v$.uploadSignatureClient.$error"
        :invalid="v$.uploadSignatureClient.$dirty && v$.uploadSignatureClient.$error"
    />
    <CFormInput
        type="file"
        id="UploadSealClient"
        accept="image/*"
        label="Загрузка печати заказчика"
        v-model.trim="state.uploadSealClient"
        @change="v$.uploadSealClient.$touch"
        @input="addNormalImgSeal"
        :valid="v$.uploadSealClient.$dirty && !v$.uploadSealClient.$error"
        :invalid="v$.uploadSealClient.$dirty && v$.uploadSealClient.$error"
    />
  </CForm>
</template>

<script setup>
import { CForm, CFormInput } from "@coreui/vue"
import { reactive, watch } from "vue"
import { email, required } from "@vuelidate/validators"
import useVuelidate from "@vuelidate/core"
import { useFormStore } from "../store.js"
import getFileBlob from "../composables/getFileBlob.js"
import InputWithDadata from "../../../shared/UI/InputWithDadata.vue"

const { AddOrChangePartForm } = useFormStore()

const emit = defineEmits(['isValid'])
//Валидируемые объекты
const state = reactive({
  nameCompanyClient: '',
  emailClient: '',
  innClient: '',
  kppClient: '',
  addressClient: '',
  contractorsClient: '',
  contractorsCorporateClient: '',
  nameBankClient: '',
  bikBankClient: '',
  phoneClient: '',
  nameClient: '',
  uploadSignatureClient: '',
  uploadSealClient: '',
})

const blobs = reactive({
  uploadSignatureClientBlob: null,
  uploadSealClientBlob: null,
})

//Правила валидации
const rules = {
  nameCompanyClient: { required },
  emailClient: { required, email },
  innClient: { required },
  kppClient: { required },
  addressClient: { required },
  contractorsClient: { required },
  contractorsCorporateClient: { required },
  nameBankClient: { required },
  bikBankClient: { required },
  phoneClient: { required },
  nameClient: { required },
  uploadSignatureClient: { required },
  uploadSealClient: { required },
}
//Валидация объектов
const v$ = useVuelidate(rules, state)

//Преобразование изображений в Blob формат
const addNormalImgSeal = (event) => {
  getFileBlob(event).then((data) => {
    blobs.uploadSealClientBlob = data
    const copyState = state
    AddOrChangePartForm(2, Object.assign(copyState, blobs))
  })
}
const addNormalImgSignature = (event) => {
  getFileBlob(event).then((data) => {
    blobs.uploadSignatureClientBlob = data
    const copyState = state
    AddOrChangePartForm(2, Object.assign(copyState, blobs))
  })
}


//Проверка на валидность всей формы этого компонента и запись в state
watch(v$, () => {
  v$._value.$forceUpdate
  if (!v$._value.$invalid) {
    AddOrChangePartForm(2, Object.assign(state, blobs))
    emit('isValid', true)
  }
})
</script>

<style scoped>

</style>
