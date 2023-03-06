<template>
  <CNav variant="tabs" role="tablist" class="w-100 justify-content-center">
    <CNavItem>
      <CNavLink
          href="javascript:void(0);"
          :active="tabPaneActiveKey === 1"
          :class="{'text-success': valid[0]}"
          @click="() => {tabPaneActiveKey = 1}"
      >
        О выполненных услугах
      </CNavLink>
    </CNavItem>
    <CNavItem>
      <CNavLink
          href="javascript:void(0);"
          :disabled="disabled[0]"
          :active="tabPaneActiveKey === 2"
          :class="{'text-success': valid[1]}"
          @click="() => {tabPaneActiveKey = 2}"
      >
        Об исполнителе
      </CNavLink>
    </CNavItem>
    <CNavItem>
      <CNavLink
          href="javascript:void(0);"
          :disabled="disabled[1]"
          :active="tabPaneActiveKey === 3"
          :class="{'text-success': valid[2]}"
          @click="() => {tabPaneActiveKey = 3}"
      >
        О заказчике
      </CNavLink>
    </CNavItem>
  </CNav>
  <CTabContent class="mt-4">
    <CTabPane role="tabpanel" aria-labelledby="home-tab" :visible="tabPaneActiveKey === 1">
      <CContainer>
        <CRow class="justify-content-center">
          <CCol xs="12" sm="10" md="8" lg="6" xl="4">
            <FormPartFirst @is-valid="(data)=>{validate(data, 1)}"/>
          </CCol>
        </CRow>
      </CContainer>
    </CTabPane>
    <CTabPane role="tabpanel" aria-labelledby="profile-tab" :visible="tabPaneActiveKey === 2">
      <CContainer>
        <CRow class="justify-content-center">
          <CCol xs="12" sm="10" md="8" lg="6" xl="4">
            <FormPartSecond @is-valid="(data)=>{validate(data, 2)}"/>
          </CCol>
        </CRow>
      </CContainer>
    </CTabPane>
    <CTabPane role="tabpanel" aria-labelledby="contact-tab" :visible="tabPaneActiveKey === 3">
      <CContainer>
        <CRow class="justify-content-center">
          <CCol xs="12" sm="10" md="8" lg="6" xl="4">
            <FormPartThird @is-valid="(data)=>{validate(data, 3)}"/>
          </CCol>
        </CRow>
      </CContainer>
    </CTabPane>
    <CContainer style="margin-top: 20px">
      <CRow class="justify-content-center">
        <CCol xs="12" sm="10" md="8" lg="6" xl="4">
          <p v-if="countValid === 0" class="fw-light">Заполните все поля для перехода к следующему пункту</p>
          <CButton v-else-if="validAll" color="secondary" class="mt-4 mb-5" @click="sendPdf">Отправить документ
          </CButton>
          <p v-else-if="countValid < valid.length" class="fw-light">
            Заполнено ({{ countValid }} из {{ valid.length }} пунктов)
            <a
                v-if="tabPaneActiveKey !== countValid+1"
                href="javascript:void(0);"
                class="link-info"
                @click="() => {tabPaneActiveKey = countValid+1}"
            >
              перейдите к следующему</a>
          </p>
        </CCol>
      </CRow>
    </CContainer>
  </CTabContent>
</template>

<script setup>
import { CNav, CTabContent, CTabPane, CNavItem, CNavLink, CCol, CRow, CContainer, CButton } from "@coreui/vue"
import { reactive, ref } from "vue"
import FormPartFirst from "./components/FormPartFirst.vue"
import FormPartSecond from "./components/FormPartSecond.vue"
import FormPartThird from "./components/FormPartThird.vue"
import { pdf } from "./composables/generatePdf.js"
import { useFormStore } from "./store.js"
import axios from "axios"


const tabPaneActiveKey = ref(1)
const valid = reactive([false, false, false])
const disabled = reactive([true, true])
const countValid = ref(0)
const validAll = ref(false)

const store = useFormStore()

const sendPdf = async () => {
  const pdfFile = pdf(store.getForm)
  pdfFile.open()
  pdfFile.getBase64((data) => {
    axios.post('http://80.78.240.28:3000/',
        {
          mailTo: store.getForm.emailClient,
          file: data,
        },
    )
        .then(() => {
          alert("Сообщение отправлено!")
          setTimeout(() => location.reload(), 1000)
        })
        .catch(() => {
          alert("Ошибка сервера!")
        })
  })
}

function validate(validData, validItem) {
  if (validItem === 1 && validData) {
    valid[0] = true
    disabled[0] = false
    countValid.value = 1
    isValidAll()
  } else if (validItem === 2 && validData) {
    valid[1] = true
    disabled[1] = false
    countValid.value = 2
    isValidAll()
  } else if (validItem === 3 && validData) {
    valid[2] = true
    countValid.value = 3
    isValidAll()
  } else {
    valid[validItem - 1] = false
    countValid.value = 0
    isValidAll()
  }
}

function isValidAll() {
  let counterValid = 0
  for (let isValid of valid) {
    if (isValid) counterValid++
  }
  validAll.value = counterValid === valid.length
}
</script>


<style lang="scss">
@import "../../app/index";

#app {
  color: $color1;
}
</style>
