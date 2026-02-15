import dataRequest from '../../../../utils/data-request.js'
let ly0session = dataRequest.ly0sessionLoad()

function getFieldsValue_init() {
  return {
    find: {
      _id: null,
      id_dataunit: ly0session.dataunit._id,
      id_carpark: ly0session.user.id_carpark ? ly0session.user.id_carpark : null,
      carplate: '', // ����
      timein_start: null, // ����ʱ�� ��
      timein_end: null, // ����ʱ�� ֹ
      timeout_start: null, // �뿪ʱ�� ��
      timeout_end: null, // �뿪ʱ�� ֹ
    },
    doc: {
      _id: null,
      id_carpark: null,
      carpark_name: '',
      carplate: '', // ����
      carwithin: false, //�Ƿ��ڳ�
      expiryfrom: null, // ��Ч����ʼ����
      expiryto: null, // ��Ч�ڽ�ֹ����
      timein: null, //����ʱ��
      timeout: null, //�뿪ʱ��
      picturein: '', //�����ͼ
      pictureout: '', //�뿪��ͼ
      id_pricing: null,
      pricing_name: '',
      price: 0, //�Ʒ�
      price0: 0,
      fee: 0, //����
      fee0: 0,
      note: '', //��ע
    },
    passin: {
      id_carpark: null,
      carplate: '', // ����
      carwithin: false, //�Ƿ��ڳ�
      expiryfrom: null, // ��Ч����ʼ����
      expiryto: null, // ��Ч�ڽ�ֹ����
      timein: null, //����ʱ��
      picturein: '', //�����ͼ
    },
    passout: {
      id_carpark: null,
      carpark_name: '',
      carplate: '', // ����
      carwithin: false, //�Ƿ��ڳ�
      expiryfrom: null, // ��Ч����ʼ����
      expiryto: null, // ��Ч�ڽ�ֹ����
      timein: null, //����ʱ��
      timeout: null, //�뿪ʱ��
      picturein: '', //�����ͼ
      pictureout: '', //�뿪��ͼ
      id_pricing: null,
      pricing_name: '',
      price: 0, //�Ʒ�
      price0: 0,
      fee: 0, //����
      fee0: 0,
      note: '', //��ע
      id_carpassin: null,
    },
  }
}

export default {
  getFieldsValue_init,
  ly0session,
  srcPrefix: dataRequest.srcPrefix, // ͼƬsrcǰ׺
  upload: dataRequest.upload, // �ϴ�·��
  upload_carplate: dataRequest.upload_carplate,
}
