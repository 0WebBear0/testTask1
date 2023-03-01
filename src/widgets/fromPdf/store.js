import { defineStore } from 'pinia'

export const useFormStore = defineStore('counter', {
    state: () => ({
        form: [{},{},{}],
    }),
    getters: {
        getForm: (state) => {
            const helperObject = {}
            for (let i = 0; i < state.form.length; i++) {
                Object.assign(helperObject, state.form[i])
            }
            return helperObject
        },
    },
    actions: {
        AddOrChangePartForm(index, formPart) {
            this.form[index] = formPart
        },
        deletePartForm(index,formPart) {
            this.form.splice(index, 1)
        },
    },
})
