import { Photo } from "@/types/Photo";
import {storage} from '../libs/firebase';
import {ref,listAll,getDownloadURL, uploadBytes} from 'firebase/storage';
import {v4 as createId} from 'uuid'


export const getAll = async()=>{
    let list:Photo[] = [];

    const imageFolders = ref(storage,'gs://react-gallery-5ed02.appspot.com/Images');
    const photoList = await listAll(imageFolders);

    for(let i in photoList.items){
        let photoUrl = await getDownloadURL(photoList.items[i])


        list.push({
            name:photoList.items[i].name,
            url:photoUrl
        })
    }

    return list
}

export const insert = async(file:File)=>{
    if(['image/jpeg','image.jpg','image.png'].includes(file.type)){

        
        let ramdomName = createId()
        let newFile = ref(storage,`images/${ramdomName}`)
        let upload = await uploadBytes(newFile,file);
        let photoUrl =  await getDownloadURL(upload.ref)
        
        return{
            name:upload.ref.name,
            url: photoUrl
        } as Photo


    }else{
        return new Error('tipo de arquivo não permitido')
    }
}