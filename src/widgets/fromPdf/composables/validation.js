import { helpers } from "@vuelidate/validators"

export const wordsRuEnNumber = helpers.regex(/^[a-zA-Zа-яА-ЯёЁ0-9\s_@,-]*$/)
