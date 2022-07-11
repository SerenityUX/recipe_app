import axios from "axios"

const getImage = async (data: FormData): Promise<[string, any]> => {
    type ImageResponse = { image: string }
	return axios.post<ImageResponse>(
      "https://xxm8-77n0-ua23.n7.xano.io/api:lSOVAmsS/upload/image", 
      data, 
      { 
        headers: { 
          "content-type": "multipart/form-data" 
        } 
    })
      .then( res => [res.data.image, undefined] as [string, any] )
      .catch( err => [undefined, err] )
}

export default getImage
