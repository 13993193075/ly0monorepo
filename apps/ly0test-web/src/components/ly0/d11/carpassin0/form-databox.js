import handles from '../../../common/table/with-table/handles.js'
import hdlsSupplement from './handles.js'

function getFormDataBox(scopeThis) {
  return {
    find: {
      fieldsValue: {},
      hdlSubmit: handles.findSubmit_withMessage,
    },
    doc: {
      fieldsValue: {},
      srcPrefix: '',
    },
    passin: {
      fieldsValue: {},
      hdlSubmit: hdlsSupplement.passinSubmit,
      srcPrefix: '',
      upload: '',
    },
    passout: {
      fieldsValue: {},
      hdlSubmit: hdlsSupplement.passoutSubmit,
      srcPrefix: '',
      upload: '',
    },
  }
}

export default {
  getFormDataBox,
}
