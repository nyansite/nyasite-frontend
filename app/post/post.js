'use client'
import React, { useEffect, useState} from "react"
import Uppy from '@uppy/core'
import Tus from "@uppy/tus"
import { Dashboard, DragDrop ,ProgressBar  } from "@uppy/react"
import '@uppy/core/dist/style.min.css';
import '@uppy/dashboard/dist/style.min.css';
import '@uppy/drag-drop/dist/style.min.css';


export function Post_c({PICUItoken}){
    const [uppy] = useState(() => new Uppy({ debug: true, autoProceed: true })
        .use(Tus,{ endpoint: '/api/get-upload-url', chunkSize: 150*1024*1024 }))
    return(
        <main className="flex flex-col w-full items-center">
            <div className="flex flex-col w-10/12 items-center">
                <Dashboard uppy={uppy} plugins={['Tus']} id={"dashboard"}/>
            </div>
        </main>
    )
}