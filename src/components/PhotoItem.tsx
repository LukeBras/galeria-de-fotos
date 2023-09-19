type Props = {
    url:string;
    name:String;
}

export const PhotoItem= ({url,name}:Props)=>{
    return(
        <div className="bg-[#3d3f43] rounded-md p-3 ">
            <img className="max-w-full w-full h-[200px] block mb-3 rounded-md" src={url} />
            <h1>{name}</h1>
        </div>
    )
}