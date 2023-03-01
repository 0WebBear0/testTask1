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
                        <FormPartFirst @is-valid="validate(1)"/>
                    </CCol>
                </CRow>
            </CContainer>
        </CTabPane>
        <CTabPane role="tabpanel" aria-labelledby="profile-tab" :visible="tabPaneActiveKey === 2">
            <CContainer>
                <CRow class="justify-content-center">
                    <CCol xs="12" sm="10" md="8" lg="6" xl="4">
                        <FormPartSecond @is-valid="validate(2)"/>
                    </CCol>
                </CRow>
            </CContainer>
        </CTabPane>
        <CTabPane role="tabpanel" aria-labelledby="contact-tab" :visible="tabPaneActiveKey === 3">
            <CContainer>
                <CRow class="justify-content-center">
                    <CCol xs="12" sm="10" md="8" lg="6" xl="4">
                        <FormPartThird @is-valid="validate(3)"/>
                    </CCol>
                </CRow>
            </CContainer>
        </CTabPane>
        <CContainer style="margin-top: 20px">
            <CRow class="justify-content-center">
                <CCol xs="12" sm="10" md="8" lg="6" xl="4">
                    <p v-if="countValid === 0" class="fw-light">Заполните все поля для перехода к следующему пункту</p>
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
                    <CButton v-if="countValid === 3" color="secondary" class="mt-4 mb-5" @click="sendPdf">Отправить документ</CButton>
                </CCol>
            </CRow>
        </CContainer>
    </CTabContent>
</template>

<script setup>
import {CNav, CTabContent, CTabPane, CNavItem, CNavLink, CCol, CRow, CContainer, CButton} from "@coreui/vue";
import {reactive, ref} from "vue";
import FormPartFirst from "./components/FormPartFirst.vue";
import FormPartSecond from "./components/FormPartSecond.vue";
import FormPartThird from "./components/FormPartThird.vue";
import {pdf} from "./composables/generatePdf.js";
import {useFormStore} from "./store.js"


const tabPaneActiveKey = ref(2)
const valid = reactive([false, false, false])
const disabled = reactive([true, true])
const countValid = ref(0)

const store = useFormStore()

const sendPdf = () => {
    pdf(store.getForm).open()
}

function validate(validItem) {
    if (validItem === 1) {
        valid[0] = true
        disabled[0] = false
        countValid.value = 1
    } else if (validItem === 2) {
        valid[1] = true
        disabled[1] = false
        countValid.value = 2
    } else {
        valid[2] = true
        countValid.value = 3
    }
}
</script>


<style lang="scss">
@import "../../app/index";

#app {
    color: $color1;
}
</style>
