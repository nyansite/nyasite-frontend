"use server"
import { headers } from "next/headers";

function get_header() {
	const headersL = headers();
	const JheadersList = {};
	headersL.forEach((v, k) => (JheadersList[k] = v)); //迭代器->JSON
	return JheadersList;
}

export async function UploadAvatar(formData) {
	const resHELLOIMGtoken = await fetch("http://localhost:8000/api/get_HELLOIMG_token", { headers:{cookie:get_header().cookie} })
	if (resHELLOIMGtoken.status != 200) {
		alert("获取图床token出错")
	}
	const token = await resHELLOIMGtoken.text()
	formData.append("token", token)
	const res = await fetch('https://www.helloimg.com/api/v1/upload', {
        method: 'POST',
        credentials: 'omit',
        body: formData,
    })
	if(res.status == 200){
		const resAvatar = await res.json()
		console.log(resAvatar.status)
		if (resAvatar.status == true) {
			var formDataUpload = new FormData()
			formDataUpload.append("avatar",resAvatar.data.links.url)
			const resUpload = await fetch("http://localhost:8000/api/change_avatar",{
				method:"POST",
				credentials: 'omit',
				body:formDataUpload,
				headers:{cookie:get_header().cookie},
			})
			return resUpload.status
		} else {
			return 502
		}
	}else{
		return 502
	}
}

export async function ChangeNameFunc(formData){
	const res = await fetch("http://localhost:8000/api/change_name",{
		method:"POST",
		body:formData,
		headers:{cookie:get_header().cookie},
	})
	return res.status
}



