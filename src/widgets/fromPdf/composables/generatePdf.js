import {createPdf} from "pdfmake/build/pdfmake";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

var formData = null

pdfMake.vfs = pdfFonts.pdfMake.vfs;
export const pdf = (getForm) => {
    if (Object.keys(getForm).length > 0){
        formData = getForm
    }
    return createPdf(docDefinition("test.pdf"))
}

const docDefinition = () => {
  console.log(formData)
    if (formData !== null){
        return {
            pageSize: 'A4',
            pageOrientation: 'portrait',
            pageMargins: [80, 40, 40, 80],
            content: [
                {
                    alignment: 'right',
                    image: formData.uploadLogoBlob,
                    fit: [100, 100]
                },
                {
                    margin: [0, 5, 0, 0],
                    alignment: 'center',
                    width: '20%',
                    text: 'АКТ № ' + formData.actNumber + ' от ' + formData.dateOfSigning
                },
                {
                    margin: [0, 20, 0, 0],
                    layout: 'noBorders',
                    table: {
                        headerRows: 1,
                        widths: ['auto', '*'],
                        heights: [30, 10],
                        body: [
                            ['Исполнитель:', 'Индивидуальный предприниматель '+ formData.performer],
                            ['Заказчик:', formData.nameCompanyClient],
                        ]
                    }
                },
                {
                    margin: [0, 20, 0, 0],
                    width: '100%',
                    alignment: 'left',
                    text: `${formData.serviceName} — ${formData.costOfWork}`
                },
                {
                    margin: [0, 40, 0, 0],
                    width: '100%',
                    alignment: 'left',
                    text: 'Общая стоимость выполненных работ, оказанных услуг: ' + formData.costOfWork + '₽'
                },
                {
                    margin: [0, 10, 0, 0],
                    width: '100%',
                    alignment: 'left',
                    text: formData.emailPerformer
                },
                {
                    columns: [
                        {
                            width: '50%',
                            margin: [0, 20, 10, 0],
                            table: {
                                headerRows: 1,
                                heights: [10, 0, 0, 0, 0, 0, 0, 0, 0],
                                body: [
                                    [
                                        {
                                            border: [false, false, false, false],
                                            text: 'Исполнитель:'
                                        },
                                        {
                                            border: [false, false, false, false],
                                            text: 'ИП'+ formData.nameCompanyPerformer
                                        },
                                    ],
                                    [
                                        {
                                            border: [false, false, false, false],
                                            text: 'ИНН'
                                        },
                                        {
                                            border: [false, false, false, true],
                                            text: formData.innPerformer
                                        },
                                    ],
                                    [
                                        {
                                            border: [false, false, false, false],
                                            text: 'КПП'
                                        },
                                        {
                                            border: [false, false, false, true],
                                            text: formData.kppPerformer
                                        },
                                    ],
                                    [
                                        {
                                            border: [false, false, false, false],
                                            text: 'Адрес'
                                        },
                                        {
                                            border: [false, false, false, true],
                                            text: formData.addressPerformer
                                        },
                                    ],
                                    [
                                        {
                                            border: [false, false, false, false],
                                            text: 'Р/с'
                                        },
                                        {
                                            border: [false, false, false, true],
                                            text: formData.contractorsPerformer
                                        },
                                    ],
                                    [
                                        {
                                            border: [false, false, false, false],
                                            text: 'К/с'
                                        },
                                        {
                                            border: [false, false, false, true],
                                            text: formData.contractorsCorporatePerformer
                                        },
                                    ],
                                    [
                                        {
                                            border: [false, false, false, false],
                                            text: 'Банк'
                                        },
                                        {
                                            border: [false, false, false, true],
                                            text: formData.nameBankPerformer
                                        },
                                    ],
                                    [
                                        {
                                            border: [false, false, false, false],
                                            text: 'БИК'
                                        },
                                        {
                                            border: [false, false, false, true],
                                            text: formData.bikBankPerformer
                                        },
                                    ],
                                    [
                                        {
                                            border: [false, false, false, false],
                                            text: 'Телефон'
                                        },
                                        {
                                            border: [false, false, false, true],
                                            text: formData.phonePerformer
                                        },
                                    ],
                                ],
                            },
                        },
                        {
                            width: '50%',
                            margin: [0, 20, 10, 0],
                            table: {
                                headerRows: 1,
                                heights: [10, 0, 0, 0, 0, 0, 0, 0, 0],
                                body: [
                                    [
                                        {
                                            border: [false, false, false, false],
                                            text: 'Заказчик:'
                                        },
                                        {
                                            border: [false, false, false, false],
                                            text: formData.nameCompanyClient
                                        },
                                    ],
                                    [
                                        {
                                            border: [false, false, false, false],
                                            text: 'ИНН'
                                        },
                                        {
                                            border: [false, false, false, true],
                                            text: formData.innClient
                                        },
                                    ],
                                    [
                                        {
                                            border: [false, false, false, false],
                                            text: 'КПП'
                                        },
                                        {
                                            border: [false, false, false, true],
                                            text: formData.kppClient
                                        },
                                    ],
                                    [
                                        {
                                            border: [false, false, false, false],
                                            text: 'Адрес'
                                        },
                                        {
                                            border: [false, false, false, true],
                                            text: formData.addressClient
                                        },
                                    ],
                                    [
                                        {
                                            border: [false, false, false, false],
                                            text: 'Р/с'
                                        },
                                        {
                                            border: [false, false, false, true],
                                            text: formData.contractorsClient
                                        },
                                    ],
                                    [
                                        {
                                            border: [false, false, false, false],
                                            text: 'К/с'
                                        },
                                        {
                                            border: [false, false, false, true],
                                            text: formData.contractorsCorporateClient
                                        },
                                    ],
                                    [
                                        {
                                            border: [false, false, false, false],
                                            text: 'Банк'
                                        },
                                        {
                                            border: [false, false, false, true],
                                            text: formData.nameBankClient
                                        },
                                    ],
                                    [
                                        {
                                            border: [false, false, false, false],
                                            text: 'БИК'
                                        },
                                        {
                                            border: [false, false, false, true],
                                            text: formData.bikBankClient
                                        },
                                    ],
                                    [
                                        {
                                            border: [false, false, false, false],
                                            text: 'Телефон'
                                        },
                                        {
                                            border: [false, false, false, true],
                                            text: formData.phoneClient
                                        },
                                    ],
                                ],
                            },
                        }
                    ]
                },
                {
                    columns: [
                        {
                            width: '50%',
                            margin: [0, 20, 10, 0],
                            table: {
                                headerRows: 1,
                                widths: [50, 20, 85],
                                body: [
                                    [
                                        {
                                            border: [false, false, false, true],
                                            text: ''
                                        },
                                        {
                                            alignment: 'center',
                                            border: [false, false, false, false],
                                            text: '/'
                                        },
                                        {
                                            alignment: 'center',
                                            border: [false, false, false, true],
                                            text: formData.namePerformer
                                        },
                                    ],
                                    [
                                        {
                                            border: [false, false, false, false],
                                            text: 'М.П.',
                                            fontSize: 8
                                        },
                                        {
                                            alignment: 'center',
                                            border: [false, false, false, false],
                                            text: ''
                                        },
                                        {
                                            alignment: 'center',
                                            border: [false, false, false, false],
                                            text: 'расшифровка подписи',
                                            fontSize: 6
                                        },
                                    ],
                                ],
                            },
                        },
                        {
                            width: '50%',
                            margin: [0, 20, 0, 0],
                            table: {
                                headerRows: 1,
                                widths: [50, 20, 85],
                                body: [
                                    [
                                        {
                                            border: [false, false, false, true],
                                            text: '',
                                        },
                                        {
                                            alignment: 'center',
                                            border: [false, false, false, false],
                                            text: '/'
                                        },
                                        {
                                            alignment: 'center',
                                            border: [false, false, false, true],
                                            text: formData.nameClient
                                        },
                                    ],
                                    [
                                        {
                                            border: [false, false, false, false],
                                            text: 'М.П.',
                                            fontSize: 8
                                        },
                                        {
                                            alignment: 'center',
                                            border: [false, false, false, false],
                                            text: ''
                                        },
                                        {
                                            alignment: 'center',
                                            border: [false, false, false, false],
                                            text: 'расшифровка подписи',
                                            fontSize: 6
                                        },
                                    ],
                                ],
                            },
                        }
                    ]
                },
                {
                    image: formData.uploadSignaturePerformerBlob,
                    opacity: 0.2,
                    fit: [100, 100],
                    absolutePosition: {x: 70, y: 500}
                },
                {
                    image: formData.uploadSealPerformerBlob,
                    opacity: 0.2,
                    fit: [100, 100],
                    absolutePosition: {x: 70, y: 500}
                },

                {
                    image: formData.uploadSignatureClientBlob,
                    opacity: 0.2,
                    fit: [100, 100],
                    absolutePosition: {x: 300, y: 500}
                },
                {
                    image: formData.uploadSealClientBlob,
                    opacity: 0.2,
                    fit: [100, 100],
                    absolutePosition: {x: 300, y: 500}
                },
            ]
        }
    }
    else {
        return {
            pageSize: 'A4',
            pageOrientation: 'portrait',
            pageMargins: [80, 40, 80, 80],
            content: [
                {
                    margin: [0, 200, 0, 0],
                    alignment: 'center',
                    text: 'Неправильно заполнена форма'
                },
            ]
        }
    }
};
