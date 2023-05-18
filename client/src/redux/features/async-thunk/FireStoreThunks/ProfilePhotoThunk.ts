import { createAsyncThunk } from '@reduxjs/toolkit'
import { storage } from '../../../../firebase/firebase'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'

interface photoThunk {
  subFolder: string
  image: File | null
}

export const FireBasePhotoThunk = createAsyncThunk(
  'photo/firebase',
  async (val: photoThunk) => {
    if (val.image) {
      const storageRef = ref(storage, `forum/${val.subFolder}` + val.image.name)

      try {
        const snapshot = await uploadBytesResumable(storageRef, val.image)
        const downloadURL = await getDownloadURL(snapshot.ref)
        //   setImgUrl(downloadURL)
        //   setLoading(false)
        console.log('succsess')
        //   removeImgFromHtml()
      } catch (error) {
        console.log(error)
        console.log('ერრორ')
      }
    }
  },
)
