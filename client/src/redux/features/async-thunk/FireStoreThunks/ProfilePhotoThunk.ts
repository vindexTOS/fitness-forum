import { ThunkDispatch, createAsyncThunk } from '@reduxjs/toolkit'
import { storage } from '../../../../firebase/firebase'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { getPhotoUrl } from '../../slice/FireBaseSlices/ProfilePhotoSlice'
interface photoThunk {
  image: File | null
  dispatch: ThunkDispatch<any, any, any>
}

export const FireBasePhotoThunk = createAsyncThunk(
  'photo/firebase',
  async (val: photoThunk) => {
    if (val.image) {
      const storageRef = ref(storage, `forum/` + val.image.name)

      try {
        const snapshot = await uploadBytesResumable(storageRef, val.image)
        const downloadURL = await getDownloadURL(snapshot.ref)
        val.dispatch(getPhotoUrl(downloadURL))
        //   setLoading(false)
        console.log(downloadURL)
        //   removeImgFromHtml()
      } catch (error) {
        console.log(error)
        console.log('ერრორ')
      }
    }
  },
)
