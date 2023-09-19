'use client'

import * as Photos from '../services/photos';
import { useState,useEffect } from 'react';
import { Photo } from '@/types/Photo';
import { PhotoItem } from '@/components/PhotoItem';
import { FormEvent } from 'react';
const Page = ()=>{
     
  const [upLoading,setUpLoading] = useState(false);  
  const [loading,setLoading] = useState(false);
  const [photos,setPhotos] = useState<Photo[]>([])

  useEffect(()=>{
    const getPhotos = async()=>{
        setLoading(true);
        setPhotos(await Photos.getAll());
        setLoading(false);
    }
    getPhotos();
  },[])

  const handleFormSubmit = async (e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const file  = formData.get('image') as File;

    if(file && file.size > 0 ){
        setUpLoading(true);
        let result = await Photos.insert(file)
        setUpLoading(false);

        if(result instanceof Error){
            alert(`${result.name} - ${result.message}`)
        }else{
            let newPhotoList = [...photos];
            newPhotoList.push(result);
            setPhotos(newPhotoList)
        }
    }
  }

    return(
        <div className="bg-[#27282f] text-white min-h-screen">
            <div className="m-auto max-w-5xl p-8">   
                <h1 className="text-center mb-8 text-4xl font-bold">Galeria de Fotos</h1>

                <form className='bg-[#3d3f43] p-4 rounded-lg mb-8' onSubmit={handleFormSubmit} method='POST' action="">
                    <input type="file" name='image' />
                    <input className='bg-[#756df4] border-none text-white pt-2 pb-2 pl-4 pr-4 ml-3 rounded-lg cursor-pointer hover:opacity-90' type="submit" value='Enviar' />
                    {upLoading &&
                        'Enviando...'
                    }
                </form>

                {loading &&
                    <div className='text-center'>
                        <div className='text-[50px] mb-5'>✋</div>
                        <div>Carregando...</div>
                    </div>
                }
                {!loading && photos.length >0 &&
                    <div className='grid grid-cols-4 gap-3'>
                        {photos.map((item,index)=>(
                            <PhotoItem key={index} url={item.url} name={item.name}/>
                        ))}
                    </div>
                }

                {!loading && photos.length===0 &&
                    <div className='text-center'>
                        <div className='text-[50px] mb-5'>😕</div>
                        <div>Não há fotos cadastradas.</div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Page;