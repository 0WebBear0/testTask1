<template>
  <div>
    <vue-dadata
        :input-name="propsData.name"
        :classes="{input: 'form-control'}"
        v-model="inputModel"
        @input="$emit('update:modelValue', $event.target.value)"
        token="ba90b98936aa77c4c9712c5f3bdeac5762b463fe">
    </vue-dadata>
  </div>
</template>

<script setup>
import { VueDadata } from 'vue-dadata'
import 'vue-dadata/dist/style.css'
import { onMounted, ref, watch } from "vue"

const props = defineProps(['propsData', 'propsDataName'])
const inputModel = ref('')
const isDirty = ref(false)

watch(props, (data)=> {
  validationStyle()
})
const validationStyle = () => {
  const nameEl =  document.getElementsByName(props.propsData.name)
  // console.log(props.propsDataName.valid)
  console.log(props.propsDataName.valid?.$dirty)
  // console.log(props.propsDataName.valid?.$invalid)
  console.log(isDirty.value)
  if (isDirty.value){
    if (!props.propsDataName.valid.$invalid){
      nameEl[0].classList.remove('is-invalid')
      nameEl[0].classList.add('is-valid')
    }
    else {
      nameEl[0].classList.remove('is-valid')
      nameEl[0].classList.add('is-invalid')
    }
  }
  isDirty.value = true
}
onMounted(()=>{
  validationStyle()
})
</script>

<style scoped>
.suggestions_padding {
  margin-top: 20px;
}
</style>
