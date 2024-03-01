import { redirect } from "next/navigation";

export default async function Page({ params }) {
    const id = params.id
    if (isNaN(Number(id))) {
        return redirect("/404")
    }else{
        return redirect("/circle/manage/"+id+"/members")
    }
    
}