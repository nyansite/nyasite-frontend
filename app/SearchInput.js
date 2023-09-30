"use client"
import { useState } from 'react'



export default function SearchInput({suggestions}){
    const suggestionsUse = suggestions
    const [inputString,setInputString] = useState('')
    const [suggestionsShow,setSuggestionsShow] = useState([])
    let suggestionsShowList = []
    function addTagbySug(event){
        const index = event.target.dataset.index
        alert(index)
    }
    function handleUpdate(e){
        let i = 0
        let count = 0
        let show = ''
        let inputValueList = e.target.value.split(' ')
        while(count <= 5 && i <= suggestionsUse.length-1){
            // 空格分隔的最后部分默认为新输入部分
            if(suggestionsUse[i].includes(inputValueList.slice(-1))&&inputValueList.slice(-1) != ''){
                show = suggestionsUse[i]
                suggestionsShowList.push(<li key={show}><button onClick={addTagbySug} data-index={show}>{suggestionsUse[i]}</button></li>)
                count++
            }
            i++
        }
        setSuggestionsShow(suggestionsShowList)
        setInputString(e.target.value)
    }
    return(
        <div>
            <div className='taginput'>
                <input value={inputString} onChange={e => handleUpdate(e)} />
                <ul>{suggestionsShow}</ul>
            </div>
            <button>搜索</button>
            
        </div>
    )
}

