"use server"
export async function UploadCoverFunc(formData) {
	const res = await fetch('https://picui.cn/api/v1/upload', {
        method: 'POST',
        credentials: 'omit',
        body: formData,
    })
	if(res.status == 200){
		return await res.json()
	}else{
		return res.status
	}
}