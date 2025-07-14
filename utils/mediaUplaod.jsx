import { createClient } from "@supabase/supabase-js";

const supabase = createClient(import.meta.env.VITE_SUPERBASE_URL,import.meta.env.VITE_SUPERBASE_KEY);

function MediaUpload(file) {

    const mediaUplaodPromise = new Promise(
        (resolve,reject)=>{
            if(file == null){
                reject("No file selected")
                return
            }

            const timeStamp = new Date().getTime()
            const newName = timeStamp + file.name

            supabase.storage.from("lost").upload(newName,file,{
                upsert:false,
                cacheControl: "3600"
            }).then((result)=>{
                if(result.error){
                    reject(result.error.message)
                    return
                }
                const publicUrl = supabase.storage.from("lost").getPublicUrl(newName).data.publicUrl
                resolve(publicUrl)
                // console.log(publicUrl)
    
            }).catch(()=>{
                reject("Error ocured in supabase connection")
            })
        }
    )

    return mediaUplaodPromise
  
}

export default MediaUpload