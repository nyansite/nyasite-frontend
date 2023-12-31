import { FilmIcon } from "@heroicons/react/24/outline";

export default function POST() {
    return (
        <main className="flex flex-col w-full items-center">
            <div className="flex w-10/12 justify-center items-center">
                <div className="flex items-center justify-center w-36 h-48 border border-gray-300 rounded-xl">
                    <div className="flex flex-col items-center">
                        <FilmIcon className="h-32 w-32 text-gray-500" />
                        <a href="./post/video" className="text_b w-32 hover:w-32"><div>上传视频</div></a>
                    </div>
                </div>
            </div>
        </main>
    )
}