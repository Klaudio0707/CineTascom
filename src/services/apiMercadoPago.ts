import axios from 'axios';

export const generatePix = async (
  amount: number,
  description: string,
  email: string
): Promise<string> => {
  try {
    const response = await axios.post(
      'https://api.mercadopago.com/v1/payments',
      {
        transaction_amount: amount,
        description,
        payment_method_id: 'pix',
        payer: { email },
      },
      {
        headers: {
          Authorization: `Bearer TEST-8570529108719028-061915-60c29ca60c21ba91cb90cfd4f29eb200-134166249`, // Use seu token válido
        },
      }
    );

    // Verifica e retorna o QR Code Base64
    const qrCodeBase64 =
      response.data.point_of_interaction?.transaction_data?.qr_code_base64;

    if (!qrCodeBase64) {
      throw new Error('QR Code não encontrado na resposta da API.');
    }

    return qrCodeBase64;
  } catch (error: any) {
    console.error('Erro ao gerar PIX:', error.response?.data || error.message);
    throw new Error('Erro ao gerar o QR Code PIX.');
  }
};

