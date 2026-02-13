import handles from './handles.js'
export default {
    formProps: {
        popup: {
            switch: true,
            visible: false,
            title: '',
        },
        cols: [
            {
                items: [
                    {
                        inputType: 'select',
                        label: '房态',
                        fieldName: 'status_code',
                        item_fieldLabel: 'text',
                        item_fieldValue: 'code',
                        hdlGetItems({scopeThis}) {
                            if (!scopeThis.focus.id_business) {
                                return [
                                    { code: '0', text: '维修' },
                                    { code: '1', text: '空房' },
                                ]
                            } else {
                                return [
                                    { code: '2', text: '入住' },
                                    { code: '3', text: '脏房' },
                                    { code: '4', text: '已打扫' },
                                ]
                            }
                        },
                    },
                ],
            },
        ],
        submit: {
            handle: handles.setStatusSubmit
        }
    },
    formData: {
        id_room: null,
        status_code: '',
    },
}
